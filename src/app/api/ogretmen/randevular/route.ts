import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ogretmenId = searchParams.get("ogretmenId")

    if (!ogretmenId) {
      return NextResponse.json({ error: "Öğretmen ID gerekli" }, { status: 400 })
    }

    const randevular = await prisma.etutRandevu.findMany({
      where: { ogretmenId },
      include: {
        ogrenci: { include: { user: true } }
      },
      orderBy: { olusturulma: "desc" }
    })

    const formatted = randevular.map(r => ({
      id: r.id,
      ogrenciAd: r.ogrenci.user.name,
      tarih: r.tarih.toISOString(),
      konu: r.konu,
      durum: r.durum
    }))

    return NextResponse.json({ randevular: formatted })
  } catch (error) {
    console.error("Randevu getirme hatası:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || (session.user.role !== "OGRETMEN" && session.user.role !== "YONETICI")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const { id, durum } = await req.json()

    if (!id || !durum) {
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 })
    }

    const randevu = await prisma.etutRandevu.update({
      where: { id },
      data: { durum }
    })

    return NextResponse.json({ randevu })
  } catch (error) {
    console.error("Randevu güncelleme hatası:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
