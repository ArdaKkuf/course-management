"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, CalendarPlus, BookOpen, Clock } from "lucide-react"

export default function OgretmenDashboardPage() {
  // Demo data
  const stats = [
    {
      title: "Müsait Saatler",
      value: 12,
      icon: Clock,
      href: "/dashboard/ogretmen/musaaitlik",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Verilen Ödevler",
      value: 24,
      icon: BookOpen,
      href: "/dashboard/ogretmen/odevler",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    }
  ]

  const sonOdevler = [
    { id: 1, baslik: "Türev Problemleri", sinif: "11A", sonTarih: "2024-03-28" },
    { id: 2, baslik: "İntegral Test", sinif: "11B", sonTarih: "2024-03-30" },
    { id: 3, baslik: "Logaritma Ödevi", sinif: "10A", sonTarih: "2024-04-02" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Öğretmen Paneli</h1>
        <p className="text-muted-foreground dark:text-gray-400">Hoş geldiniz</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          <Link href="/dashboard/ogretmen/odev-ekle">
            <Button className="w-full" variant="default">
              <BookOpen className="mr-2 h-4 w-4" />
              Yeni Ödev Ekle
            </Button>
          </Link>
          <Link href="/dashboard/ogretmen/musaaitlik">
            <Button className="w-full" variant="outline">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Müsaitlik Düzenle
            </Button>
          </Link>
          <Link href="/dashboard/ogretmen/ogrenciler">
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Öğrencileri Görüntüle
            </Button>
          </Link>
          <Link href="/dashboard/ogretmen/randevular">
            <Button className="w-full" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Randevu Talepleri
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Assignments */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Son Ödevler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sonOdevler.map((odev) => (
              <div key={odev.id} className="flex justify-between items-center border-b dark:border-gray-700 pb-2">
                <div>
                  <p className="font-medium dark:text-gray-200">{odev.baslik}</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{odev.sinif}. Sınıf</p>
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
    </div>
  )
}
