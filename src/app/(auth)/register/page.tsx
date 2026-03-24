"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "OGRENCI" as "OGRENCI" | "OGRETMEN" | "YONETICI",
    // Student fields
    sinif: "",
    sube: "",
    // Teacher fields
    brans: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor!")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır!")
      return
    }

    setIsLoading(true)

    try {
      const body: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      }

      if (formData.role === "OGRENCI") {
        body.sinif = formData.sinif
        body.sube = formData.sube
      } else if (formData.role === "OGRETMEN") {
        body.brans = formData.brans
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Kayıt başarısız")
      }

      toast.success("Kayıt başarılı! Giriş yapabilirsiniz.")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Dershane Yönetim Sistemi</CardTitle>
          <CardDescription>Hesap oluşturun</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select value={formData.role} onValueChange={(value: any) => value && setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OGRENCI">Öğrenci</SelectItem>
                  <SelectItem value="OGRETMEN">Öğretmen</SelectItem>
                  <SelectItem value="YONETICI">Yönetici</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "OGRENCI" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="sinif">Sınıf</Label>
                  <Select value={formData.sinif} onValueChange={(value) => value && setFormData({ ...formData, sinif: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sınıf seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {[9, 10, 11, 12].map(s => (
                        <SelectItem key={s} value={s.toString()}>{s}. Sınıf</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sube">Şube</Label>
                  <Select value={formData.sube} onValueChange={(value) => value && setFormData({ ...formData, sube: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Şube seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D"].map(s => (
                        <SelectItem key={s} value={s}>{s} Şubesi</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {formData.role === "OGRETMEN" && (
              <div className="space-y-2">
                <Label htmlFor="brans">Branş</Label>
                <Select value={formData.brans} onValueChange={(value) => value && setFormData({ ...formData, brans: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Branş seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Matematik">Matematik</SelectItem>
                    <SelectItem value="Fizik">Fizik</SelectItem>
                    <SelectItem value="Kimya">Kimya</SelectItem>
                    <SelectItem value="Biyoloji">Biyoloji</SelectItem>
                    <SelectItem value="Türkçe">Türkçe</SelectItem>
                    <SelectItem value="Tarih">Tarih</SelectItem>
                    <SelectItem value="Coğrafya">Coğrafya</SelectItem>
                    <SelectItem value="İngilizce">İngilizce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Zaten hesabınız var mı?{" "}
              <a href="/login" className="text-primary hover:underline">
                Giriş yapın
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
