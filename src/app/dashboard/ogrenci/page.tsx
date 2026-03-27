"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, BookMarked, CalendarCheck, User, Gamepad2 } from "lucide-react"

export default function OgrenciDashboardPage() {
  const stats = [
    {
      title: "Bekleyen Ödevler",
      value: 5,
      icon: BookMarked,
      href: "/dashboard/ogrenci/odevler",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30"
    },
    {
      title: "Etüt Randevuları",
      value: 2,
      icon: CalendarCheck,
      href: "/dashboard/ogrenci/etut-randevu-al",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    }
  ]

  const yakinanOdevler = [
    { id: 1, baslik: "Türev Problemleri", aciklama: "Sayfa 45-48 arası sorular", sonTarih: "2026-03-30" },
    { id: 2, baslik: "İntegral Test", aciklama: "Konu tekrarı ve test çözümü", sonTarih: "2026-04-02" },
    { id: 3, baslik: "Logaritma Ödevi", aciklama: "Formül ve uygulamalar", sonTarih: "2026-04-05" },
  ]

  const sonRandevular = [
    { id: 1, konu: "Matematik - Türev", tarih: "2026-03-26", durum: "onaylandi" },
    { id: 2, konu: "Fizik - Kuvvet", tarih: "2026-03-27", durum: "bekliyor" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Öğrenci Paneli</h1>
        <p className="text-muted-foreground dark:text-gray-400">Hoş geldiniz</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium dark:text-gray-200">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Hızlı İşlemler</CardTitle>
          <CardDescription className="dark:text-gray-400">Sık kullanılan özelliklere hızlı erişim</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link href="/dashboard/ogrenci/program">
            <Button className="w-full" variant="default">
              <Calendar className="mr-2 h-4 w-4" />
              Ders Programı
            </Button>
          </Link>
          <Link href="/dashboard/ogrenci/etut-randevu-al">
            <Button className="w-full" variant="outline">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Etüt Randevusu Al
            </Button>
          </Link>
          <Link href="/dashboard/ogrenci/odevler">
            <Button className="w-full" variant="outline">
              <BookMarked className="mr-2 h-4 w-4" />
              Ödevlerim
            </Button>
          </Link>
          <Link href="/dashboard/ogrenci/oyunlar">
            <Button className="w-full" variant="outline">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Eğitici Oyunlar
            </Button>
          </Link>
          <Link href="/dashboard/ogrenci/profil">
            <Button className="w-full" variant="outline">
              <User className="mr-2 h-4 w-4" />
              Profilim
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Upcoming Assignments */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Yaklaşan Ödevler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {yakinanOdevler.map((odev) => (
              <div key={odev.id} className="flex justify-between items-center border-b dark:border-gray-700 pb-2">
                <div>
                  <p className="font-medium dark:text-gray-200">{odev.baslik}</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{odev.aciklama}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Son: {odev.sonTarih}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Appointments */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Son Randevular</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sonRandevular.map((randevu) => (
              <div key={randevu.id} className="flex justify-between items-center border-b dark:border-gray-700 pb-2">
                <div>
                  <p className="font-medium dark:text-gray-200">{randevu.konu}</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{randevu.tarih}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  randevu.durum === "onaylandi" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                  randevu.durum === "bekliyor" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {randevu.durum === "onaylandi" ? "Onaylandı" : randevu.durum === "bekliyor" ? "Bekliyor" : "İptal"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
