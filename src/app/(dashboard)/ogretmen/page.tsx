import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, CalendarPlus, BookOpen, Clock } from "lucide-react"

export default async function OgretmenDashboardPage() {
  const session = await auth()

  if (!session?.user || (session.user.role !== "OGRETMEN" && session.user.role !== "YONETICI")) {
    redirect("/dashboard")
  }

  const ogretmen = await prisma.ogretmen.findUnique({
    where: { id: session.user.ogretmenId! },
    include: {
      user: true,
      verdigiOdevler: { take: 5, orderBy: { olusturulma: "desc" } },
      musaatlikler: { where: { musait: true } }
    }
  })

  if (!ogretmen) {
    return <div>Öğretmen bilgisi bulunamadı.</div>
  }

  const stats = [
    {
      title: "Müsait Saatler",
      value: ogretmen.musaatlikler.length,
      icon: Clock,
      href: "/dashboard/ogretmen/musaaitlik",
      color: "text-blue-600"
    },
    {
      title: "Verilen Ödevler",
      value: ogretmen.verdigiOdevler.length,
      icon: BookOpen,
      href: "/dashboard/ogretmen/odevler",
      color: "text-green-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Öğretmen Paneli</h1>
        <p className="text-muted-foreground">Hoş geldiniz, {ogretmen.user.name}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          <Link href="/dashboard/ogretmen/odev-ekle">
            <Button className="w-full" variant="default">
              <BookOpen className="mr-2 h-4 w-4" />
              Yeni Ödev Ekle
            </Button>
          </Link>
          <Link href="/dashboard/ogretmen/musaaitlik">
            <Button className="w-full" variant="outline">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Müsaitlik Düzenle
            </Button>
          </Link>
          <Link href="/dashboard/ogretmen/ogrenciler">
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Öğrencileri Görüntüle
            </Button>
          </Link>
          <Link href="/dashboard/ogretmen/randevular">
            <Button className="w-full" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              Randevu Talepleri
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Assignments */}
      {ogretmen.verdigiOdevler.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Son Ödevler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ogretmen.verdigiOdevler.map((odev) => (
                <div key={odev.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{odev.baslik}</p>
                    <p className="text-sm text-muted-foreground">{odev.sinif}. Sınıf</p>
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
    </div>
  )
}
