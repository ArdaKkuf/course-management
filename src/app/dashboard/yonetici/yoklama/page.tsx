import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function YoklamaRaporlariPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "YONETICI") {
    redirect("/dashboard")
  }

  // Get attendance statistics
  const ogrenciler = await prisma.ogrenci.findMany({
    include: {
      user: true,
      yoklamalar: true
    }
  })

  const toplamYoklama = ogrenciler.reduce((acc, o) => acc + o.yoklamalar.length, 0)
  const geldiler = ogrenciler.reduce((acc, o) =>
    acc + o.yoklamalar.filter(y => y.durum === "geldi").length, 0)
  const gelmediler = ogrenciler.reduce((acc, o) =>
    acc + o.yoklamalar.filter(y => y.durum === "gelmedi").length, 0)
  const izinliler = ogrenciler.reduce((acc, o) =>
    acc + o.yoklamalar.filter(y => y.durum === "izinli").length, 0)

  const katilimOrani = toplamYoklama > 0 ? ((geldiler / toplamYoklama) * 100).toFixed(1) : "0"

  // Class-level statistics
  const sinifStatistikleri = Object.entries(
    ogrenciler.reduce((acc, ogrenci) => {
      const key = `${ogrenci.sinif}-${ogrenci.sube}`
      if (!acc[key]) {
        acc[key] = { ogrenci: 0, geldiler: 0, toplam: 0 }
      }
      acc[key].ogrenci++
      acc[key].toplam += ogrenci.yoklamalar.length
      acc[key].geldiler += ogrenci.yoklamalar.filter(y => y.durum === "geldi").length
      return acc
    }, {} as Record<string, { ogrenci: number; geldiler: number; toplam: number }>)
  ).map(([sinif, data]) => ({
    sinif,
    ogrenciSayisi: data.ogrenci,
    toplamYoklama: data.toplam,
    geldiler: data.geldiler,
    katilimOrani: data.toplam > 0 ? ((data.geldiler / data.toplam) * 100).toFixed(1) : "0"
  })).sort((a, b) => a.sinif.localeCompare(b.sinif))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Yoklama Raporları</h1>
        <p className="text-muted-foreground">Devamsızlık istatistikleri</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam Yoklama</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toplamYoklama}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gelenler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{geldiler}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gelmeyenler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{gelmediler}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Katılım Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">%{katilimOrani}</div>
          </CardContent>
        </Card>
      </div>

      {/* Class Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Sınıf Bazlı İstatistikler</CardTitle>
        </CardHeader>
        <CardContent>
          {sinifStatistikleri.length === 0 ? (
            <p className="text-muted-foreground">Henüz yoklama verisi yok.</p>
          ) : (
            <div className="space-y-4">
              {sinifStatistikleri.map((stat) => (
                <div key={stat.sinif} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{stat.sinif.replace('-', '.')} Şubesi</p>
                    <p className="text-sm text-muted-foreground">{stat.ogrenciSayisi} öğrenci</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{stat.geldiler}/{stat.toplamYoklama} yoklama</p>
                    <p className="text-lg font-bold text-blue-600">%{stat.katilimOrani}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
