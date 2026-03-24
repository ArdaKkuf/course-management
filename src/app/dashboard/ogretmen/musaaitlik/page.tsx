"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"]
const TIMES = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

type Availability = Record<string, Record<string, boolean>>

export default function MusaaitlikPage() {
  const [availability, setAvailability] = useState<Availability>({
    "Pazartesi": { "09:00": true, "10:00": true, "14:00": true },
    "Salı": { "09:00": true, "10:00": true, "11:00": true },
    "Çarşamba": { "14:00": true, "15:00": true, "16:00": true },
    "Perşembe": { "09:00": true, "10:00": true },
    "Cuma": { "11:00": true, "14:00": true },
  })
  const [isSaving, setIsSaving] = useState(false)

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
      // Demo save
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Müsaitlik durumu güncellendi!")
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Müsaitlik Yönetimi</h1>
          <p className="text-muted-foreground dark:text-gray-400">Etüt için müsait olduğunuz saatleri seçin</p>
        </div>
        <Button onClick={saveAvailability} disabled={isSaving}>
          {isSaving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border dark:border-gray-700 dark:text-gray-300">Saat</th>
                  {DAYS.map(day => (
                    <th key={day} className="p-2 border dark:border-gray-700 min-w-[100px] dark:text-gray-300">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map(time => (
                  <tr key={time}>
                    <td className="p-2 border dark:border-gray-700 font-medium text-center dark:text-gray-300">{time}</td>
                    {DAYS.map(day => (
                      <td key={`${day}-${time}`} className="p-2 border dark:border-gray-700 text-center">
                        <button
                          type="button"
                          onClick={() => toggleSlot(day, time)}
                          className={`w-12 h-8 rounded transition-colors ${
                            availability[day]?.[time]
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
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
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Müsait</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <span>Müsait Değil</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
