"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockSinifStats = [
  { sinif: "11-A", ogrenciSayisi: 20, toplamYoklama: 60, geldiler: 55 },
  { sinif: "11-B", ogrenciSayisi: 18, toplamYoklama: 54, geldiler: 48 },
  { sinif: "10-A", ogrenciSayisi: 22, toplamYoklama: 66, geldiler: 62 },
]

const toplamYoklama = 180
const geldiler = 165
const gelmediler = 10
const izinliler = 5
const katilimOrani = ((165 / 180) * 100).toFixed(1)

export default function YoklamaRaporlariPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Yoklama Raporları</h1>
        <p className="text-muted-foreground dark:text-gray-400">Devamsızlık istatistikleri</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400">Toplam Yoklama</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{toplamYoklama}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400">Gelenler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{geldiler}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400">Gelmeyenler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{gelmediler}</div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-400">Katılım Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">%{katilimOrani}</div>
          </CardContent>
        </Card>
      </div>

      {/* Class Statistics */}
      <Card className="dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">Sınıf Bazlı İstatistikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSinifStats.map((stat) => {
              const katilimOrani = ((stat.geldiler / stat.toplamYoklama) * 100).toFixed(1)
              return (
                <div key={stat.sinif} className="flex items-center justify-between border-b dark:border-gray-800 pb-3">
                  <div>
                    <p className="font-medium dark:text-white">{stat.sinif}</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{stat.ogrenciSayisi} öğrenci</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{stat.geldiler}/{stat.toplamYoklama} yoklama</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">%{katilimOrani}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
