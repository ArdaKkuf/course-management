import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function OgretmenOdevlerPage() {
  const session = await auth()

  if (!session?.user || (session.user.role !== "OGRETMEN" && session.user.role !== "YONETICI")) {
    redirect("/dashboard")
  }

  const odevler = await prisma.odev.findMany({
    where: {
      ogretmenId: session.user.ogretmenId
    },
    orderBy: { olusturulma: "desc" }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verilen Ödevler</h1>
        <p className="text-muted-foreground">Tüm ödevlerinizi görüntüleyin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ödev Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {odevler.length === 0 ? (
            <p className="text-muted-foreground">Henüz ödev eklemediniz.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Sınıf</TableHead>
                  <TableHead>Son Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {odevler.map((odev) => {
                  const isExpired = new Date(odev.sonTarih) < new Date()
                  return (
                    <TableRow key={odev.id}>
                      <TableCell className="font-medium">{odev.baslik}</TableCell>
                      <TableCell>{odev.sinif}</TableCell>
                      <TableCell>
                        {new Date(odev.sonTarih).toLocaleDateString("tr-TR")}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded ${
                          isExpired ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
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
