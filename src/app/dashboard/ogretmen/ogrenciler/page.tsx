import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function OgrencilerPage() {
  const session = await auth()

  if (!session?.user || (session.user.role !== "OGRETMEN" && session.user.role !== "YONETICI")) {
    redirect("/dashboard")
  }

  const ogrenciler = await prisma.ogrenci.findMany({
    include: {
      user: true,
      odevler: {
        where: {
          sonTarih: { gte: new Date() }
        },
        orderBy: { sonTarih: "asc" }
      }
    },
    orderBy: { sinif: "asc" }
  })

  const groupedBySinif = ogrenciler.reduce((acc, ogrenci) => {
    const key = `${ogrenci.sinif}-${ogrenci.sube}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(ogrenci)
    return acc
  }, {} as Record<string, typeof ogrenciler>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Öğrenciler</h1>
        <p className="text-muted-foreground">Tüm öğrencileri görüntüleyin</p>
      </div>

      {Object.entries(groupedBySinif).map(([key, ogrenciListesi]) => {
        const [sinif, sube] = key.split("-")
        return (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{sinif}. Sınıf {sube} Şubesi</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad Soyad</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Veli</TableHead>
                    <TableHead>Bekleyen Ödevler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ogrenciListesi.map((ogrenci) => (
                    <TableRow key={ogrenci.id}>
                      <TableCell className="font-medium">{ogrenci.user.name}</TableCell>
                      <TableCell>{ogrenci.user.email}</TableCell>
                      <TableCell>
                        {ogrenci.veliAdi && (
                          <div>
                            <p className="text-sm">{ogrenci.veliAdi}</p>
                            <p className="text-xs text-muted-foreground">{ogrenci.veliTelefon}</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 text-xs rounded bg-orange-100 text-orange-800">
                          {ogrenci.odevler.length}
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
