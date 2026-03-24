import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || (session.user.role !== "OGRETMEN" && session.user.role !== "YONETICI")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const body = await req.json()
    const { baslik, aciklama, sinif, sube, sonTarih } = body

    if (!baslik || !aciklama || !sinif || !sonTarih) {
      return NextResponse.json({ error: "Tüm alanlar zorunludur" }, { status: 400 })
    }

    const ogretmenId = session.user.ogretmenId
    if (!ogretmenId) {
      return NextResponse.json({ error: "Öğretmen bilgisi bulunamadı" }, { status: 400 })
    }

    // Create assignment
    const odev = await prisma.odev.create({
      data: {
        baslik,
        aciklama,
        sinif: `${sinif}${sube === "Tümü" ? "" : `-${sube}`}`,
        sonTarih: new Date(sonTarih),
        ogretmenId
      }
    })

    return NextResponse.json({ message: "Ödev başarıyla oluşturuldu", odev }, { status: 201 })
  } catch (error) {
    console.error("Ödev ekleme hatası:", error)
    return NextResponse.json({ error: "Ödev eklenirken bir hata oluştu" }, { status: 500 })
  }
}
