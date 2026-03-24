"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, CheckCircle, Clock } from "lucide-react"
import { use } from "react"

export default function YoneticiDashboardPage() {
  // Demo data - localStorage'dan gelecek
  const stats = [
    { title: "Toplam Öğrenci", value: 60, icon: Users, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Toplam Öğretmen", value: 12, icon: Users, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-900/30" },
    { title: "Toplam Etüt", value: 45, icon: Calendar, color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-100 dark:bg-purple-900/30" },
    { title: "Ders Programı", value: 24, icon: Clock, color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/30" }
  ]

  const sonEtutler = [
    { id: 1, ogrenci: "Ahmet Yılmaz", konu: "Matematik - Türev", tarih: "2026-03-26", durum: "onaylandi" },
    { id: 2, ogrenci: "Zeynep Kaya", konu: "Fizik - Kuvvet", tarih: "2026-03-27", durum: "bekliyor" },
    { id: 3, ogrenci: "Mehmet Demir", konu: "Kimya - Tepkimeler", tarih: "2026-03-27", durum: "onaylandi" },
    { id: 4, ogrenci: "Ayşe Çelik", konu: "Biyoloji - Hücre", tarih: "2026-03-25", durum: "iptal" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Yönetici Paneli</h1>
        <p className="text-muted-foreground dark:text-gray-400">Dershane yönetim sistemi genel bakış</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-200">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Son Etüt Randevuları</CardTitle>
          <CardDescription className="dark:text-gray-400">En son oluşturulan etüt talepleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sonEtutler.map((etut) => (
              <div key={etut.id} className="flex items-center justify-between border-b dark:border-gray-700 pb-2">
                <div>
                  <p className="font-medium dark:text-gray-200">{etut.ogrenci}</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{etut.konu}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm dark:text-gray-300">{etut.tarih}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded ${
                    etut.durum === "onaylandi" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                    etut.durum === "bekliyor" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {etut.durum === "onaylandi" ? "Onaylandı" : etut.durum === "bekliyor" ? "Bekliyor" : "İptal"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
