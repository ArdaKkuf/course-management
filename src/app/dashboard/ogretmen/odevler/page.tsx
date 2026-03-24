"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Odev = {
  id: string
  baslik: string
  sinif: string
  sube: string
  sonTarih: string
  olusturulma: string
}

export default function OgretmenOdevlerPage() {
  const [odevler, setOdevler] = useState<Odev[]>([])

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem("ogretmenOdevler")
    if (stored) {
      setOdevler(JSON.parse(stored))
    } else {
      // Demo data
      const demoOdevler = [
        { id: "1", baslik: "Türev Problemleri", sinif: "11", sube: "A", sonTarih: "2024-03-28", olusturulma: "2024-03-20" },
        { id: "2", baslik: "İntegral Test", sinif: "11", sube: "B", sonTarih: "2024-03-30", olusturulma: "2024-03-21" },
        { id: "3", baslik: "Logaritma Ödevi", sinif: "10", sube: "A", sonTarih: "2024-04-02", olusturulma: "2024-03-22" },
      ]
      setOdevler(demoOdevler)
      localStorage.setItem("ogretmenOdevler", JSON.stringify(demoOdevler))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Verilen Ödevler</h1>
          <p className="text-muted-foreground dark:text-gray-400">Tüm ödevlerinizi görüntüleyin</p>
        </div>
        <Link href="/dashboard/ogretmen/odev-ekle">
          <Button>Yeni Ödev Ekle</Button>
        </Link>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Ödev Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {odevler.length === 0 ? (
            <p className="text-muted-foreground dark:text-gray-400">Henüz ödev eklemediniz.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Başlık</TableHead>
                  <TableHead className="dark:text-gray-300">Sınıf</TableHead>
                  <TableHead className="dark:text-gray-300">Son Tarih</TableHead>
                  <TableHead className="dark:text-gray-300">Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {odevler.map((odev) => {
                  const isExpired = new Date(odev.sonTarih) < new Date()
                  return (
                    <TableRow key={odev.id} className="dark:border-gray-700">
                      <TableCell className="font-medium dark:text-gray-200">{odev.baslik}</TableCell>
                      <TableCell className="dark:text-gray-300">{odev.sinif}. Sınıf {odev.sube}</TableCell>
                      <TableCell className="dark:text-gray-300">
                        {new Date(odev.sonTarih).toLocaleDateString("tr-TR")}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded ${
                          isExpired
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                          {isExpired ? "Süresi Geçmiş" : "Aktif"}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
