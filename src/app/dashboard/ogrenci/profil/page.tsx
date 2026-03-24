import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function OgrenciProfilPage() {
  const session = await auth()

  if (!session?.user || (session.user.role !== "OGRENCI" && session.user.role !== "YONETICI")) {
    redirect("/dashboard")
  }

  const ogrenci = await prisma.ogrenci.findUnique({
    where: { id: session.user.ogrenciId! },
    include: {
      user: true,
      etutRandevular: {
        orderBy: { olusturulma: "desc" },
        take: 5
      }
    }
  })

  if (!ogrenci) {
    return <div>Öğrenci bilgisi bulunamadı.</div>
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
        <h1 className="text-3xl font-bold">Profilim</h1>
        <p className="text-muted-foreground">Kişisel bilgileriniz</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Kişisel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Ad Soyad</p>
              <p className="font-medium">{ogrenci.user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{ogrenci.user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sınıf</p>
              <p className="font-medium">{ogrenci.sinif}. Sınıf {ogrenci.sube} Şubesi</p>
            </div>
            {ogrenci.veliAdi && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Veli Adı</p>
                  <p className="font-medium">{ogrenci.veliAdi}</p>
                </div>
                {ogrenci.veliTelefon && (
                  <div>
                    <p className="text-sm text-muted-foreground">Veli Telefon</p>
                    <p className="font-medium">{ogrenci.veliTelefon}</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {stats.map((stat) => (
                  <TableRow key={stat.label}>
                    <TableCell className="font-medium">{stat.label}</TableCell>
                    <TableCell className="text-right">{stat.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appointments */}
      {ogrenci.etutRandevular.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Son Etüt Randevuları</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Konu</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ogrenci.etutRandevular.map((randevu) => (
                  <TableRow key={randevu.id}>
                    <TableCell>{randevu.konu}</TableCell>
                    <TableCell>{new Date(randevu.tarih).toLocaleDateString("tr-TR")}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded ${
                        randevu.durum === "onaylandi" ? "bg-green-100 text-green-800" :
                        randevu.durum === "bekliyor" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {randevu.durum}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
