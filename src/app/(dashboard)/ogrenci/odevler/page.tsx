import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function OgrenciOdevlerPage() {
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

  // Get assignments for this student's class
  const odevler = await prisma.odev.findMany({
    where: {
      OR: [
        { sinif: ogrenci.sinif },
        { sinif: `${ogrenci.sinif}-${ogrenci.sube}` },
        { ogrenciId: ogrenci.id }
      ],
      sonTarih: { gte: new Date() }
    },
    include: {
      ogretmen: { include: { user: true } }
    },
    orderBy: { sonTarih: "asc" }
  })

  const getDaysRemaining = (sonTarih: Date) => {
    const now = new Date()
    const diff = new Date(sonTarih).getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ödevlerim</h1>
        <p className="text-muted-foreground">Bekleyen ödevlerinizi görüntüleyin</p>
      </div>

      {odevler.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Bekleyen ödeviniz yok. 🎉
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Ödev Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead>Öğretmen</TableHead>
                  <TableHead>Son Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {odevler.map((odev) => {
                  const daysRemaining = getDaysRemaining(odev.sonTarih)
                  const isUrgent = daysRemaining <= 2

                  return (
                    <TableRow key={odev.id}>
                      <TableCell className="font-medium">{odev.baslik}</TableCell>
                      <TableCell className="max-w-xs truncate">{odev.aciklama}</TableCell>
                      <TableCell>{odev.ogretmen.user.name}</TableCell>
                      <TableCell>{new Date(odev.sonTarih).toLocaleDateString("tr-TR")}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded ${
                          isUrgent ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
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
