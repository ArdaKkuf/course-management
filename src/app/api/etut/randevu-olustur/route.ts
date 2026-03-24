import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user || (session.user.role !== "OGRENCI" && session.user.role !== "YONETICI")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const ogrenciId = session.user.ogrenciId
    if (!ogrenciId) {
      return NextResponse.json({ error: "Öğrenci bilgisi bulunamadı" }, { status: 400 })
    }

    const { ogretmenId, gun, saat, konu } = await req.json()

    if (!ogretmenId || !gun || !saat || !konu) {
      return NextResponse.json({ error: "Tüm alanlar zorunludur" }, { status: 400 })
    }

    // Create appointment for next occurrence of the day
    const now = new Date()
    const dayIndex = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"].indexOf(gun)
    const targetDate = new Date(now)
    const currentDay = now.getDay()
    const daysUntil = (dayIndex + 1 - currentDay + 7) % 7 || 7
    targetDate.setDate(now.getDate() + daysUntil)

    const [hours, minutes] = saat.split(":").map(Number)
    targetDate.setHours(hours, minutes, 0, 0)

    const randevu = await prisma.etutRandevu.create({
      data: {
        ogrenciId,
        ogretmenId,
        tarih: targetDate,
        konu,
        durum: "bekliyor"
      }
    })

    return NextResponse.json({
      message: "Randevu talebi oluşturuldu",
      randevu
    }, { status: 201 })
  } catch (error) {
    console.error("Randevu oluşturma hatası:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
