import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, CheckCircle, Clock } from "lucide-react"

export default async function YoneticiDashboardPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "YONETICI") {
    redirect("/dashboard")
  }

  // Get statistics
  const [ogrenciSayisi, ogretmenSayisi, etutSayisi, dersProgramiSayisi] = await Promise.all([
    prisma.ogrenci.count(),
    prisma.ogretmen.count(),
    prisma.etutRandevu.count(),
    prisma.dersProgrami.count()
  ])

  // Get recent activity
  const sonEtutler = await prisma.etutRandevu.findMany({
    take: 5,
    orderBy: { olusturulma: "desc" },
    include: {
      ogrenci: { include: { user: true } }
    }
  })

  const stats = [
    { title: "Toplam Öğrenci", value: ogrenciSayisi, icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Toplam Öğretmen", value: ogretmenSayisi, icon: Users, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Toplam Etüt", value: etutSayisi, icon: Calendar, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Ders Programı", value: dersProgramiSayisi, icon: Clock, color: "text-orange-600", bgColor: "bg-orange-100" }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Yönetici Paneli</h1>
        <p className="text-muted-foreground">Dershane yönetim sistemi genel bakış</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Son Etüt Randevuları</CardTitle>
          <CardDescription>En son oluşturulan etüt talepleri</CardDescription>
        </CardHeader>
        <CardContent>
          {sonEtutler.length === 0 ? (
            <p className="text-muted-foreground">Henüz etüt randevusu yok.</p>
          ) : (
            <div className="space-y-4">
              {sonEtutler.map((etut) => (
                <div key={etut.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{etut.ogrenci.user.name}</p>
                    <p className="text-sm text-muted-foreground">{etut.konu}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(etut.tarih).toLocaleDateString("tr-TR")}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      etut.durum === "onaylandi" ? "bg-green-100 text-green-800" :
                      etut.durum === "bekliyor" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {etut.durum}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
