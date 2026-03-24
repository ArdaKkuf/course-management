import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ogretmenId = searchParams.get("ogretmenId")

    if (!ogretmenId) {
      return NextResponse.json({ error: "Öğretmen ID gerekli" }, { status: 400 })
    }

    const slots = await prisma.musaatlik.findMany({
      where: {
        ogretmenId,
        musait: true
      },
      select: {
        ogretmenId: true,
        gun: true,
        saat: true
      }
    })

    return NextResponse.json({ slots })
  } catch (error) {
    console.error("Müsaitlik getirme hatası:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
