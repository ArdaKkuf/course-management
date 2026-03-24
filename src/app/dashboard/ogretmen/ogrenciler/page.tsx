"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Demo data
const demoOgrenciler = [
  { id: "1", ad: "Ahmet Yılmaz", email: "ahmet@email.com", veliAdi: "Mehmet Yılmaz", veliTelefon: "0555 123 4567", sinif: "11", sube: "A", bekleynOdev: 3 },
  { id: "2", ad: "Zeynep Kaya", email: "zeynep@email.com", veliAdi: "Ali Kaya", veliTelefon: "0555 234 5678", sinif: "11", sube: "A", bekleynOdev: 5 },
  { id: "3", ad: "Mehmet Demir", email: "mehmet@email.com", veliAdi: "Hasan Demir", veliTelefon: "0555 345 6789", sinif: "11", sube: "B", bekleynOdev: 2 },
  { id: "4", ad: "Ayşe Çelik", email: "ayse@email.com", veliAdi: "Ahmet Çelik", veliTelefon: "0555 456 7890", sinif: "10", sube: "A", bekleynOdev: 4 },
  { id: "5", ad: "Fatma Arslan", email: "fatma@email.com", veliAdi: "Mustafa Arslan", veliTelefon: "0555 567 8901", sinif: "10", sube: "B", bekleynOdev: 3 },
  { id: "6", ad: "Ali Yılmaz", email: "ali@email.com", veliAdi: "İbrahim Yılmaz", veliTelefon: "0555 678 9012", sinif: "12", sube: "A", bekleynOdev: 6 },
]

export default function OgrencilerPage() {
  const groupedBySinif = demoOgrenciler.reduce((acc, ogrenci) => {
    const key = `${ogrenci.sinif}-${ogrenci.sube}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(ogrenci)
    return acc
  }, {} as Record<string, typeof demoOgrenciler>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Öğrenciler</h1>
        <p className="text-muted-foreground dark:text-gray-400">Tüm öğrencileri görüntüleyin</p>
      </div>

      {Object.entries(groupedBySinif).map(([key, ogrenciListesi]) => {
        const [sinif, sube] = key.split("-")
        return (
          <Card key={key} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">{sinif}. Sınıf {sube} Şubesi</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">Ad Soyad</TableHead>
                    <TableHead className="dark:text-gray-300">Email</TableHead>
                    <TableHead className="dark:text-gray-300">Veli</TableHead>
                    <TableHead className="dark:text-gray-300">Bekleyen Ödevler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ogrenciListesi.map((ogrenci) => (
                    <TableRow key={ogrenci.id} className="dark:border-gray-700">
                      <TableCell className="font-medium dark:text-gray-200">{ogrenci.ad}</TableCell>
                      <TableCell className="dark:text-gray-300">{ogrenci.email}</TableCell>
                      <TableCell className="dark:text-gray-300">
                        {ogrenci.veliAdi && (
                          <div>
                            <p className="text-sm">{ogrenci.veliAdi}</p>
                            <p className="text-xs text-muted-foreground dark:text-gray-400">{ogrenci.veliTelefon}</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 text-xs rounded bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                          {ogrenci.bekleynOdev}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
