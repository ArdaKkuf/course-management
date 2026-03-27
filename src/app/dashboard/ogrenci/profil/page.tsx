"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect } from "react"

interface YanlisSoru {
  soru: string
  dogru: string
  secim: string
  tarih: string
  ders: string
}

export default function OgrenciProfilPage() {
  const [yanlisSorular, setYanlisSorular] = useState<YanlisSoru[]>([])
  const [sorularGorunur, setSorularGorunur] = useState(false)

  useEffect(() => {
    // localStorage'dan yanlış soruları yükle
    const savedQuestions = localStorage.getItem('tytQuizYanlislar')
    if (savedQuestions) {
      setYanlisSorular(JSON.parse(savedQuestions))
    }
  }, [])

  const sorulariTemizle = () => {
    localStorage.removeItem('tytQuizYanlislar')
    setYanlisSorular([])
  }

  // Demo data
  const ogrenci = {
    user: { name: "Ahmet Yılmaz", email: "ahmet@email.com" },
    sinif: "11",
    sube: "A",
    veliAdi: "Mehmet Yılmaz",
    veliTelefon: "0555 123 4567",
    etutRandevular: [
      { id: "1", konu: "Matematik - Türev", tarih: "2026-03-26", durum: "onaylandi" },
      { id: "2", konu: "Fizik - Kuvvet", tarih: "2026-03-27", durum: "bekliyor" },
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

      <div className="grid gap-6 md:grid-cols-3">
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

        {/* Sorularım */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white flex justify-between items-center">
              <span>Sorularım</span>
              <span className="text-sm font-normal text-muted-foreground dark:text-gray-400">
                {yanlisSorular.length} soru
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {yanlisSorular.length === 0 ? (
              <p className="text-sm text-muted-foreground dark:text-gray-400 text-center py-4">
                Henüz yanlış sorunuz yok
              </p>
            ) : (
              <div className="space-y-3">
                {yanlisSorular.slice(-5).reverse().map((soru, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                    <p className="text-sm font-medium dark:text-gray-200">{soru.soru}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="text-red-600 dark:text-red-400">
                        Seçimin: {soru.secim}
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        Doğru: {soru.dogru}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">
                      {soru.ders} • {new Date(soru.tarih).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                ))}
                {yanlisSorular.length > 5 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSorularGorunur(true)}
                  >
                    Tümünü Gör ({yanlisSorular.length})
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={sorulariTemizle}
                >
                  Temizle
                </Button>
              </div>
            )}
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

      {/* Tüm Sorular Modal */}
      <Dialog open={sorularGorunur} onOpenChange={setSorularGorunur}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Tüm Yanlış Sorularım ({yanlisSorular.length})</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {yanlisSorular.length === 0 ? (
              <p className="text-sm text-muted-foreground dark:text-gray-400 text-center py-4">
                Henüz yanlış sorunuz yok
              </p>
            ) : (
              yanlisSorular.reverse().map((soru, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3 border dark:border-gray-600">
                  <p className="text-sm font-medium dark:text-gray-200">{soru.soru}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-red-600 dark:text-red-400 font-semibold">
                      Seçimin: {soru.secim}
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      Doğru: {soru.dogru}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-gray-400">
                    {soru.ders} • {new Date(soru.tarih).toLocaleDateString('tr-TR')} • {new Date(soru.tarih).toLocaleTimeString('tr-TR')}
                  </div>
                </div>
              ))
            )}
            {yanlisSorular.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => {
                  sorulariTemizle()
                  setSorularGorunur(false)
                }}
              >
                Tümünü Temizle
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
