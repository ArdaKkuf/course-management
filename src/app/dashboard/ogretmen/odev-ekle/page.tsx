"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const SINIFLAR = ["9", "10", "11", "12"]
const SUBELER = ["A", "B", "C", "Tümü"]

export default function OdevEklePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    baslik: "",
    aciklama: "",
    sinif: "9",
    sube: "Tümü",
    sonTarih: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/ogretmen/odev-ekle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ödev eklenemedi")
      }

      toast.success("Ödev başarıyla eklendi!")
      router.push("/dashboard/ogretmen")
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Yeni Ödev Ekle</CardTitle>
          <CardDescription>Öğrencilere ödev atayın</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baslik">Ödev Başlığı</Label>
              <Input
                id="baslik"
                value={formData.baslik}
                onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
                placeholder="Örn: Matematik Problemleri - 1"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sinif">Sınıf</Label>
                <Select value={formData.sinif} onValueChange={(value) => value && setFormData({ ...formData, sinif: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SINIFLAR.map(s => (
                      <SelectItem key={s} value={s}>{s}. Sınıf</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sube">Şube</Label>
                <Select value={formData.sube} onValueChange={(value) => value && setFormData({ ...formData, sube: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBELER.map(s => (
                      <SelectItem key={s} value={s}>{s === "Tümü" ? "Tüm Şubeler" : `${s} Şubesi`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sonTarih">Son Teslim Tarihi</Label>
              <Input
                id="sonTarih"
                type="date"
                value={formData.sonTarih}
                onChange={(e) => setFormData({ ...formData, sonTarih: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aciklama">Açıklama</Label>
              <Textarea
                id="aciklama"
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                placeholder="Ödev detaylarını buraya yazın..."
                rows={5}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Ekleniyor..." : "Ödev Ekle"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              İptal
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
