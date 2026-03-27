"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockUsers = [
  { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "OGRENCI", sinif: "11-A" },
  { id: 2, name: "Zeynep Kaya", email: "zeynep@example.com", role: "OGRENCI", sinif: "11-B" },
  { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", role: "OGRETMEN", brans: "Matematik" },
  { id: 4, name: "Ayşe Çelik", email: "ayse@example.com", role: "OGRETMEN", brans: "Fizik" },
  { id: 5, name: "Yönetici", email: "admin@dershane.com", role: "YONETICI" },
]

export default function KullanicilarPage() {
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
      case "OGRENCI": return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400"
      case "OGRETMEN": return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
      case "YONETICI": return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400"
      default: return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Kullanıcı Yönetimi</h1>
        <p className="text-muted-foreground dark:text-gray-400">Tüm kullanıcıları görüntüleyin ve yönetin</p>
      </div>

      <Card className="dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="dark:text-white">Kullanıcı Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="dark:border-gray-800">
                  <TableHead className="dark:text-gray-400">Ad Soyad</TableHead>
                  <TableHead className="dark:text-gray-400">Email</TableHead>
                  <TableHead className="dark:text-gray-400">Rol</TableHead>
                  <TableHead className="dark:text-gray-400">Detay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id} className="dark:border-gray-800">
                    <TableCell className="font-medium dark:text-white">{user.name}</TableCell>
                    <TableCell className="dark:text-gray-300">{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded ${getRoleBadgeColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.role === "OGRENCI" && (
                        <span className="text-sm text-muted-foreground dark:text-gray-400">
                          {user.sinif}
                        </span>
                      )}
                      {user.role === "OGRETMEN" && (
                        <span className="text-sm text-muted-foreground dark:text-gray-400">
                          {user.brans}
                        </span>
                      )}
                      {user.role === "YONETICI" && (
                        <span className="text-sm text-muted-foreground dark:text-gray-400">
                          -
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
