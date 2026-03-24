import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const teachers = await prisma.ogretmen.findMany({
      include: {
        user: true
      },
      orderBy: {
        user: {
          name: "asc"
        }
      }
    })

    const formatted = teachers.map(t => ({
      id: t.id,
      name: t.user.name,
      brans: t.brans
    }))

    return NextResponse.json({ teachers: formatted })
  } catch (error) {
    console.error("Öğretmenleri getirme hatası:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
