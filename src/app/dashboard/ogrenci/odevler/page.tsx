"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Odev = {
  id: string
  baslik: string
  aciklama: string
  ogretmen: string
  sonTarih: string
}

export default function OgrenciOdevlerPage() {
  const [odevler, setOdevler] = useState<Odev[]>([])

  useEffect(() => {
    // Load from localStorage (teacher's assignments)
    const stored = localStorage.getItem("ogretmenOdevler")
    if (stored) {
      const allOdevler: any[] = JSON.parse(stored)
      setOdevler(allOdevler.map((o: any) => ({
        id: o.id,
        baslik: o.baslik,
        aciklama: o.aciklama,
        ogretmen: "Ahmet Yılmaz",
        sonTarih: o.sonTarih
      })))
    } else {
      // Demo data
      const demoOdevler = [
        { id: "1", baslik: "Türev Problemleri", aciklama: "Sayfa 45-48 arası sorular", ogretmen: "Ahmet Yılmaz", sonTarih: "2026-03-30" },
        { id: "2", baslik: "İntegral Test", aciklama: "Konu tekrarı ve test çözümü", ogretmen: "Ahmet Yılmaz", sonTarih: "2026-04-02" },
        { id: "3", baslik: "Logaritma Ödevi", aciklama: "Formül ve uygulamalar", ogretmen: "Zeynep Kaya", sonTarih: "2026-04-05" },
      ]
      setOdevler(demoOdevler)
    }
  }, [])

  const getDaysRemaining = (sonTarih: string) => {
    const now = new Date()
    const diff = new Date(sonTarih).getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Ödevlerim</h1>
        <p className="text-muted-foreground dark:text-gray-400">Bekleyen ödevlerinizi görüntüleyin</p>
      </div>

      {odevler.length === 0 ? (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center text-muted-foreground dark:text-gray-400">
            Bekleyen ödeviniz yok. 🎉
          </CardContent>
        </Card>
      ) : (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Ödev Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Başlık</TableHead>
                  <TableHead className="dark:text-gray-300">Açıklama</TableHead>
                  <TableHead className="dark:text-gray-300">Öğretmen</TableHead>
                  <TableHead className="dark:text-gray-300">Son Tarih</TableHead>
                  <TableHead className="dark:text-gray-300">Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {odevler.map((odev) => {
                  const daysRemaining = getDaysRemaining(odev.sonTarih)
                  const isUrgent = daysRemaining <= 2

                  return (
                    <TableRow key={odev.id} className="dark:border-gray-700">
                      <TableCell className="font-medium dark:text-gray-200">{odev.baslik}</TableCell>
                      <TableCell className="max-w-xs truncate dark:text-gray-300">{odev.aciklama}</TableCell>
                      <TableCell className="dark:text-gray-300">{odev.ogretmen}</TableCell>
                      <TableCell className="dark:text-gray-300">{new Date(odev.sonTarih).toLocaleDateString("tr-TR")}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded ${
                          isUrgent
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {daysRemaining === 0 ? "Bugün" : `${daysRemaining} gün kaldı`}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
