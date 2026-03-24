"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OgrenciProfilPage() {
  // Demo data
  const ogrenci = {
    user: { name: "Ahmet Yılmaz", email: "ahmet@email.com" },
    sinif: "11",
    sube: "A",
    veliAdi: "Mehmet Yılmaz",
    veliTelefon: "0555 123 4567",
    etutRandevular: [
      { id: "1", konu: "Matematik - Türev", tarih: "2024-03-28", durum: "onaylandi" },
      { id: "2", konu: "Fizik - Kuvvet", tarih: "2024-03-29", durum: "bekliyor" },
    ]
  }

  const stats = [
    { label: "Sınıf", value: `${ogrenci.sinif}. Sınıf` },
    { label: "Şube", value: `${ogrenci.sube} Şubesi` },
    { label: "Toplam Etüt", value: ogrenci.etutRandevular.length.toString() },
    { label: "Onaylanan Etüt", value: ogrenci.etutRandevular.filter(r => r.durum === "onaylandi").length.toString() }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Profilim</h1>
        <p className="text-muted-foreground dark:text-gray-400">Kişisel bilgileriniz</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Kişisel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Ad Soyad</p>
              <p className="font-medium dark:text-gray-200">{ogrenci.user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Email</p>
              <p className="font-medium dark:text-gray-200">{ogrenci.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Sınıf</p>
              <p className="font-medium dark:text-gray-200">{ogrenci.sinif}. Sınıf {ogrenci.sube} Şubesi</p>
            </div>
            {ogrenci.veliAdi && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Veli Adı</p>
                  <p className="font-medium dark:text-gray-200">{ogrenci.veliAdi}</p>
                </div>
                {ogrenci.veliTelefon && (
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">Veli Telefon</p>
                    <p className="font-medium dark:text-gray-200">{ogrenci.veliTelefon}</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {stats.map((stat) => (
                  <TableRow key={stat.label} className="dark:border-gray-700">
                    <TableCell className="font-medium dark:text-gray-300">{stat.label}</TableCell>
                    <TableCell className="text-right dark:text-gray-200">{stat.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      {ogrenci.etutRandevular.length > 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Son Etüt Randevuları</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Konu</TableHead>
                  <TableHead className="dark:text-gray-300">Tarih</TableHead>
                  <TableHead className="dark:text-gray-300">Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ogrenci.etutRandevular.map((randevu) => (
                  <TableRow key={randevu.id} className="dark:border-gray-700">
                    <TableCell className="dark:text-gray-200">{randevu.konu}</TableCell>
                    <TableCell className="dark:text-gray-300">{new Date(randevu.tarih).toLocaleDateString("tr-TR")}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded ${
                        randevu.durum === "onaylandi"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : randevu.durum === "bekliyor"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {randevu.durum === "onaylandi" ? "Onaylandı" : randevu.durum === "bekliyor" ? "Bekliyor" : "İptal"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
