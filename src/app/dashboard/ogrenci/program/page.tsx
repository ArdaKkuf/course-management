"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"]

// Demo data
const demoSchedule = [
  { id: 1, gun: "Pazartesi", saat: "09:00", dersAdi: "Matematik", ogretmen: "Ahmet Yılmaz" },
  { id: 2, gun: "Pazartesi", saat: "10:00", dersAdi: "Fizik", ogretmen: "Zeynep Kaya" },
  { id: 3, gun: "Salı", saat: "09:00", dersAdi: "Kimya", ogretmen: "Mehmet Demir" },
  { id: 4, gun: "Salı", saat: "11:00", dersAdi: "Biyoloji", ogretmen: "Ayşe Çelik" },
  { id: 5, gun: "Çarşamba", saat: "10:00", dersAdi: "Matematik", ogretmen: "Ahmet Yılmaz" },
  { id: 6, gun: "Çarşamba", saat: "14:00", dersAdi: "Türkçe", ogretmen: "Fatma Arslan" },
  { id: 7, gun: "Perşembe", saat: "09:00", dersAdi: "Fizik", ogretmen: "Zeynep Kaya" },
  { id: 8, gun: "Perşembe", saat: "11:00", dersAdi: "Tarih", ogretmen: "Ali Yılmaz" },
  { id: 9, gun: "Cuma", saat: "10:00", dersAdi: "Coğrafya", ogretmen: "Elif Kaya" },
  { id: 10, gun: "Cuma", saat: "14:00", dersAdi: "Matematik", ogretmen: "Ahmet Yılmaz" },
]

export default function ProgramPage() {
  const groupedByDay = DAYS.reduce((acc, day) => {
    acc[day] = demoSchedule.filter(s => s.gun === day)
    return acc
  }, {} as Record<string, typeof demoSchedule>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Ders Programı</h1>
        <p className="text-muted-foreground dark:text-gray-400">11. Sınıf A Şubesi</p>
      </div>

      <div className="grid gap-6">
        {DAYS.map((day) => (
          <Card key={day} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {groupedByDay[day].length === 0 ? (
                <p className="text-muted-foreground dark:text-gray-400">Bu gün için ders yok.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">Saat</TableHead>
                      <TableHead className="dark:text-gray-300">Ders</TableHead>
                      <TableHead className="dark:text-gray-300">Öğretmen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedByDay[day].map((ders) => (
                      <TableRow key={ders.id} className="dark:border-gray-700">
                        <TableCell className="font-medium dark:text-gray-200">{ders.saat}</TableCell>
                        <TableCell className="dark:text-gray-300">{ders.dersAdi}</TableCell>
                        <TableCell className="dark:text-gray-300">{ders.ogretmen}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
