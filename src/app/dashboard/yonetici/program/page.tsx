"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"]

const mockSchedule = [
  { id: 1, gun: "Pazartesi", saat: "09:00", dersAdi: "Matematik", sinif: "11-A", ogretmen: "Ahmet Yılmaz" },
  { id: 2, gun: "Pazartesi", saat: "10:00", dersAdi: "Fizik", sinif: "11-B", ogretmen: "Ayşe Çelik" },
  { id: 3, gun: "Salı", saat: "09:00", dersAdi: "Kimya", sinif: "11-A", ogretmen: "Mehmet Demir" },
  { id: 4, gun: "Salı", saat: "11:00", dersAdi: "Biyoloji", sinif: "11-B", ogretmen: "Zeynep Kaya" },
  { id: 5, gun: "Çarşamba", saat: "09:00", dersAdi: "Matematik", sinif: "11-B", ogretmen: "Ahmet Yılmaz" },
  { id: 6, gun: "Çarşamba", saat: "10:00", dersAdi: "Fizik", sinif: "11-A", ogretmen: "Ayşe Çelik" },
  { id: 7, gun: "Perşembe", saat: "09:00", dersAdi: "Türkçe", sinif: "11-A", ogretmen: "Fatma Öz" },
  { id: 8, gun: "Cuma", saat: "09:00", dersAdi: "Tarih", sinif: "11-B", ogretmen: "Ali Veli" },
]

export default function DersProgramiPage() {
  const groupedByDay = DAYS.reduce((acc, day) => {
    acc[day] = mockSchedule.filter(s => s.gun === day)
    return acc
  }, {} as Record<string, typeof mockSchedule>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Ders Programı</h1>
        <p className="text-muted-foreground dark:text-gray-400">Haftalık ders programı</p>
      </div>

      <div className="grid gap-6">
        {DAYS.map((day) => (
          <Card key={day} className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {groupedByDay[day].length === 0 ? (
                <p className="text-muted-foreground dark:text-gray-400">Bu gün için ders programı yok.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-gray-800">
                        <TableHead className="dark:text-gray-400">Saat</TableHead>
                        <TableHead className="dark:text-gray-400">Ders</TableHead>
                        <TableHead className="dark:text-gray-400">Sınıf</TableHead>
                        <TableHead className="dark:text-gray-400">Öğretmen</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedByDay[day].map((ders) => (
                        <TableRow key={ders.id} className="dark:border-gray-800">
                          <TableCell className="font-medium dark:text-white">{ders.saat}</TableCell>
                          <TableCell className="dark:text-gray-300">{ders.dersAdi}</TableCell>
                          <TableCell className="dark:text-gray-300">{ders.sinif}</TableCell>
                          <TableCell className="dark:text-gray-300">{ders.ogretmen}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
