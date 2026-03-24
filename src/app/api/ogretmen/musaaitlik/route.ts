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

    const musaatlikler = await prisma.musaatlik.findMany({
      where: { ogretmenId }
    })

    const availability = musaatlikler.reduce((acc, m) => {
      if (!acc[m.gun]) acc[m.gun] = {}
      acc[m.gun][m.saat] = m.musait
      return acc
    }, {} as Record<string, Record<string, boolean>>)

    return NextResponse.json({ availability })
  } catch (error) {
    console.error("Müsaitlik getirme hatası:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || (session.user.role !== "OGRETMEN" && session.user.role !== "YONETICI")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const ogretmenId = session.user.ogretmenId
    if (!ogretmenId) {
      return NextResponse.json({ error: "Öğretmen bilgisi bulunamadı" }, { status: 400 })
    }

    const { availability } = await req.json() as { availability: Record<string, Record<string, boolean>> }

    // Delete existing availability
    await prisma.musaatlik.deleteMany({
      where: { ogretmenId }
    })

    // Create new availability records
    const records = Object.entries(availability).flatMap(([gun, times]) =>
      Object.entries(times).map(([saat, musait]) => ({
        ogretmenId,
        gun,
        saat,
        musait: musait === true
      }))
    )

    if (records.length > 0) {
      await prisma.musaatlik.createMany({
        data: records
      })
    }

    return NextResponse.json({ message: "Müsaitlik güncellendi" }, { status: 200 })
  } catch (error) {
    console.error("Müsaitlik kaydetme hatası:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
