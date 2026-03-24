import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, BookMarked, CalendarCheck, User } from "lucide-react"

export default async function OgrenciDashboardPage() {
  const session = await auth()

  if (!session?.user || (session.user.role !== "OGRENCI" && session.user.role !== "YONETICI")) {
    redirect("/dashboard")
  }

  const ogrenci = await prisma.ogrenci.findUnique({
    where: { id: session.user.ogrenciId! },
    include: {
      user: true,
      odevler: {
        where: { sonTarih: { gte: new Date() } },
        orderBy: { sonTarih: "asc" }
      },
      etutRandevular: {
        orderBy: { tarih: "desc" },
        take: 3
      }
    }
  })

  if (!ogrenci) {
    return <div>Öğrenci bilgisi bulunamadı.</div>
  }

  const stats = [
    {
      title: "Bekleyen Ödevler",
      value: ogrenci.odevler.length,
      icon: BookMarked,
      href: "/dashboard/ogrenci/odevler",
      color: "text-orange-600"
    },
    {
      title: "Etüt Randevuları",
      value: ogrenci.etutRandevular.length,
      icon: CalendarCheck,
      href: "/dashboard/ogrenci/etut",
      color: "text-blue-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Öğrenci Paneli</h1>
        <p className="text-muted-foreground">Hoş geldiniz, {ogrenci.user.name}</p>
        <p className="text-sm text-muted-foreground">{ogrenci.sinif}. Sınıf {ogrenci.sube} Şubesi</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>Sık kullanılan özelliklere hızlı erişim</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link href="/dashboard/ogrenci/program">
            <Button className="w-full" variant="default">
              <Calendar className="mr-2 h-4 w-4" />
              Ders Programı
            </Button>
          </Link>
          <Link href="/dashboard/ogrenci/etut-randevu-al">
            <Button className="w-full" variant="outline">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Etüt Randevusu Al
            </Button>
          </Link>
          <Link href="/dashboard/ogrenci/odevler">
            <Button className="w-full" variant="outline">
              <BookMarked className="mr-2 h-4 w-4" />
              Ödevlerim
            </Button>
          </Link>
          <Link href="/dashboard/ogrenci/profil">
            <Button className="w-full" variant="outline">
              <User className="mr-2 h-4 w-4" />
              Profilim
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Upcoming Assignments */}
      {ogrenci.odevler.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Yaklaşan Ödevler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ogrenci.odevler.slice(0, 3).map((odev) => (
                <div key={odev.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{odev.baslik}</p>
                    <p className="text-sm text-muted-foreground">{odev.aciklama.substring(0, 50)}...</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Son: {new Date(odev.sonTarih).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Appointments */}
      {ogrenci.etutRandevular.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Son Randevular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ogrenci.etutRandevular.map((randevu) => (
                <div key={randevu.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{randevu.konu}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(randevu.tarih).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    randevu.durum === "onaylandi" ? "bg-green-100 text-green-800" :
                    randevu.durum === "bekliyor" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {randevu.durum}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
