"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  const [randevular, setRandevular] = useState<EtutRandevu[]>([
    { id: "1", ogrenciAd: "Ahmet Yılmaz", tarih: "2026-03-26T14:00", konu: "Matematik - Türev", durum: "bekliyor" },
    { id: "2", ogrenciAd: "Zeynep Kaya", tarih: "2026-03-27T10:00", konu: "Fizik - Kuvvet", durum: "onaylandi" },
    { id: "3", ogrenciAd: "Mehmet Demir", tarih: "2026-03-28T15:00", konu: "Kimya - Tepkimeler", durum: "bekliyor" },
  ])

  const updateDurum = async (id: string, durum: string) => {
    try {
      // Demo update
      setRandevular(prev => prev.map(r => r.id === id ? { ...r, durum } : r))
      toast.success("Randevu durumu güncellendi")
    } catch (error) {
      toast.error("Bir hata oluştu")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Etüt Randevuları</h1>
        <p className="text-muted-foreground dark:text-gray-400">Gelen randevu taleplerini görüntüleyin ve yönetin</p>
      </div>

      {randevular.length === 0 ? (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center text-muted-foreground dark:text-gray-400">
            Henüz randevu talebi yok.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {randevular.map((randevu) => (
            <Card key={randevu.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg dark:text-white">{randevu.ogrenciAd}</h3>
                    <p className="text-muted-foreground mt-1 dark:text-gray-400">{randevu.konu}</p>
                    <p className="text-sm text-muted-foreground mt-2 dark:text-gray-400">
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
                      randevu.durum === "onaylandi" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                      randevu.durum === "bekliyor" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
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
