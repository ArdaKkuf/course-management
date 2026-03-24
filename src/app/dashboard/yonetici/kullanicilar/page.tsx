import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Eye } from "lucide-react"

export default async function KullanicilarPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "YONETICI") {
    redirect("/dashboard")
  }

  const users = await prisma.user.findMany({
    include: {
      ogrenciProfil: true,
      ogretmenProfil: true
    },
    orderBy: { createdAt: "desc" }
  })

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "OGRENCI": return "Öğrenci"
      case "OGRETMEN": return "Öğretmen"
      case "YONETICI": return "Yönetici"
      default: return role
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "OGRENCI": return "bg-blue-100 text-blue-800"
      case "OGRETMEN": return "bg-green-100 text-green-800"
      case "YONETICI": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
        <p className="text-muted-foreground">Tüm kullanıcıları görüntüleyin ve yönetin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Detay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded ${getRoleBadgeColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.ogrenciProfil && (
                      <span className="text-sm text-muted-foreground">
                        {user.ogrenciProfil.sinif}. Sınıf {user.ogrenciProfil.sube} Şubesi
                      </span>
                    )}
                    {user.ogretmenProfil && (
                      <span className="text-sm text-muted-foreground">
                        {user.ogretmenProfil.brans}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
