"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"]
const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

type Availability = Record<string, Record<string, boolean>>

export default function MusaaitlikPage() {
  const { data: session } = useSession()
  const [availability, setAvailability] = useState<Availability>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (session?.user?.ogretmenId) {
      loadAvailability()
    }
  }, [session])

  const loadAvailability = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/ogretmen/musaaitlik?ogretmenId=${session?.user?.ogretmenId}`)
      if (response.ok) {
        const data = await response.json()
        setAvailability(data.availability || {})
      }
    } catch (error) {
      console.error("Müsaitlik yüklenirken hata:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSlot = (day: string, time: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [time]: !(prev[day]?.[time] ?? false)
      }
    }))
  }

  const saveAvailability = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/ogretmen/musaaitlik", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability })
      })

      if (!response.ok) {
        throw new Error("Müsaitlik kaydedilemedi")
      }

      toast.success("Müsaitlik durumu güncellendi!")
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Müsaitlik Yönetimi</h1>
          <p className="text-muted-foreground">Etüt için müsait olduğunuz saatleri seçin</p>
        </div>
        <Button onClick={saveAvailability} disabled={isSaving}>
          {isSaving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">Saat</th>
                  {DAYS.map(day => (
                    <th key={day} className="p-2 border min-w-[100px]">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map(time => (
                  <tr key={time}>
                    <td className="p-2 border font-medium text-center">{time}</td>
                    {DAYS.map(day => (
                      <td key={`${day}-${time}`} className="p-2 border text-center">
                        <button
                          type="button"
                          onClick={() => toggleSlot(day, time)}
                          className={`w-12 h-8 rounded transition-colors ${
                            availability[day]?.[time]
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                          disabled={isSaving}
                        >
                          {availability[day]?.[time] ? "✓" : ""}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Müsait</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>Müsait Değil</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
