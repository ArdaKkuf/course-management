import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"]

export default async function ProgramPage() {
  const session = await auth()

  if (!session?.user || (session.user.role !== "OGRENCI" && session.user.role !== "YONETICI")) {
    redirect("/dashboard")
  }

  const ogrenci = await prisma.ogrenci.findUnique({
    where: { id: session.user.ogrenciId! }
  })

  if (!ogrenci) {
    return <div>Öğrenci bilgisi bulunamadı.</div>
  }

  const schedule = await prisma.dersProgrami.findMany({
    where: {
      sinif: `${ogrenci.sinif}. Sınıf`
    },
    include: {
      ogretmen: { include: { user: true } }
    },
    orderBy: [
      { gun: "asc" },
      { saat: "asc" }
    ]
  })

  const groupedByDay = DAYS.reduce((acc, day) => {
    acc[day] = schedule.filter(s => s.gun === day)
    return acc
  }, {} as Record<string, typeof schedule>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ders Programı</h1>
        <p className="text-muted-foreground">{ogrenci.sinif}. Sınıf {ogrenci.sube} Şubesi</p>
      </div>

      <div className="grid gap-6">
        {DAYS.map((day) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle>{day}</CardTitle>
            </CardHeader>
            <CardContent>
              {groupedByDay[day].length === 0 ? (
                <p className="text-muted-foreground">Bu gün için ders yok.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Saat</TableHead>
                      <TableHead>Ders</TableHead>
                      <TableHead>Öğretmen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedByDay[day].map((ders) => (
                      <TableRow key={ders.id}>
                        <TableCell className="font-medium">{ders.saat}</TableCell>
                        <TableCell>{ders.dersAdi}</TableCell>
                        <TableCell>{ders.ogretmen.user.name}</TableCell>
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
