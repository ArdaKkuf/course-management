"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type EtutRandevu = {
  id: string
  ogrenciAd: string
  tarih: string
  konu: string
  durum: string
}

export default function RandevularPage() {
  const { data: session } = useSession()
  const [randevular, setRandevular] = useState<EtutRandevu[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.ogretmenId) {
      loadRandevular()
    }
  }, [session])

  const loadRandevular = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/ogretmen/randevular?ogretmenId=${session?.user?.ogretmenId}`)
      if (response.ok) {
        const data = await response.json()
        setRandevular(data.randevular || [])
      }
    } catch (error) {
      console.error("Randevular yüklenirken hata:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateDurum = async (id: string, durum: string) => {
    try {
      const response = await fetch("/api/ogretmen/randevular", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, durum })
      })

      if (!response.ok) {
        throw new Error("İşlem başarısız")
      }

      toast.success("Randevu durumu güncellendi")
      loadRandevular()
    } catch (error) {
      toast.error("Bir hata oluştu")
    }
  }

  if (isLoading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Etüt Randevuları</h1>
        <p className="text-muted-foreground">Gelen randevu taleplerini görüntüleyin ve yönetin</p>
      </div>

      {randevular.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Henüz randevu talebi yok.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {randevular.map((randevu) => (
            <Card key={randevu.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{randevu.ogrenciAd}</h3>
                    <p className="text-muted-foreground mt-1">{randevu.konu}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      📅 {new Date(randevu.tarih).toLocaleDateString("tr-TR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-3 py-1 text-sm rounded ${
                      randevu.durum === "onaylandi" ? "bg-green-100 text-green-800" :
                      randevu.durum === "bekliyor" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {randevu.durum === "onaylandi" ? "Onaylandı" :
                       randevu.durum === "bekliyor" ? "Bekliyor" : "İptal"}
                    </span>
                    {randevu.durum === "bekliyor" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateDurum(randevu.id, "onaylandi")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Onayla
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateDurum(randevu.id, "iptal")}
                        >
                          İptal
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
