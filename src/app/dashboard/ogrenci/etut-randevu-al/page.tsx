"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"]

type Teacher = {
  id: string
  name: string
  brans: string
}

type Slot = {
  ogretmenId: string
  gun: string
  saat: string
}

export default function EtutRandevuAlPage() {
  const router = useRouter()

  // Demo teachers
  const teachers: Teacher[] = [
    { id: "1", name: "Ahmet Yılmaz", brans: "Matematik" },
    { id: "2", name: "Zeynep Kaya", brans: "Fizik" },
    { id: "3", name: "Mehmet Demir", brans: "Kimya" },
    { id: "4", name: "Ayşe Çelik", brans: "Biyoloji" },
  ]

  // Demo availability slots
  const allSlots: Slot[] = [
    { ogretmenId: "1", gun: "Pazartesi", saat: "09:00" },
    { ogretmenId: "1", gun: "Pazartesi", saat: "10:00" },
    { ogretmenId: "1", gun: "Salı", saat: "14:00" },
    { ogretmenId: "1", gun: "Çarşamba", saat: "15:00" },
    { ogretmenId: "2", gun: "Pazartesi", saat: "11:00" },
    { ogretmenId: "2", gun: "Salı", saat: "09:00" },
    { ogretmenId: "2", gun: "Çarşamba", saat: "10:00" },
    { ogretmenId: "3", gun: "Pazartesi", saat: "14:00" },
    { ogretmenId: "3", gun: "Çarşamba", saat: "11:00" },
    { ogretmenId: "4", gun: "Salı", saat: "15:00" },
    { ogretmenId: "4", gun: "Perşembe", saat: "10:00" },
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([])
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [konu, setKonu] = useState("")

  const handleTeacherChange = (teacherId: string | null) => {
    if (!teacherId) {
      setSelectedTeacher("")
      setAvailableSlots([])
      return
    }

    setSelectedTeacher(teacherId)
    setSelectedDay("")
    setSelectedTime("")

    // Filter slots for this teacher
    const slots = allSlots.filter(s => s.ogretmenId === teacherId)
    setAvailableSlots(slots)
  }

  const handleDayChange = (value: string | null) => {
    if (value) setSelectedDay(value)
  }

  const handleTimeChange = (value: string | null) => {
    if (value) setSelectedTime(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedTeacher || !selectedDay || !selectedTime || !konu) {
      toast.error("Tüm alanları doldurun")
      return
    }

    setIsSubmitting(true)
    try {
      // Demo save - store in localStorage
      const randevular = JSON.parse(localStorage.getItem("ogrenciRandevular") || "[]")
      randevular.push({
        id: Date.now().toString(),
        ogretmenId: selectedTeacher,
        ogretmenAd: teachers.find(t => t.id === selectedTeacher)?.name,
        gun: selectedDay,
        saat: selectedTime,
        konu,
        durum: "bekliyor",
        tarih: new Date().toISOString()
      })
      localStorage.setItem("ogrenciRandevular", JSON.stringify(randevular))

      toast.success("Randevu talebi oluşturuldu! Öğretmeniniz onaylayacak.")
      router.push("/dashboard/ogrenci")
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAvailableTimes = () => {
    const slots = availableSlots.filter(s => s.gun === selectedDay)
    return slots.map(s => s.saat).sort()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Etüt Randevusu Al</h1>
        <p className="text-muted-foreground dark:text-gray-400">Müsait öğretmenleri görüntüleyin ve randevu alın</p>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Randevu Bilgileri</CardTitle>
          <CardDescription className="dark:text-gray-400">Detayları doldurun</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacher" className="dark:text-gray-300">Öğretmen Seçin</Label>
              <Select value={selectedTeacher} onValueChange={handleTeacherChange} disabled={isLoading}>
                <SelectTrigger id="teacher" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Öğretmen seçin" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.brans}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTeacher && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="day" className="dark:text-gray-300">Gün Seçin</Label>
                  <Select value={selectedDay} onValueChange={handleDayChange} disabled={isLoading}>
                    <SelectTrigger id="day" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Gün seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.filter(day =>
                        availableSlots.some(s => s.gun === day)
                      ).map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDay && (
                  <div className="space-y-2">
                    <Label htmlFor="time" className="dark:text-gray-300">Saat Seçin</Label>
                    <Select value={selectedTime} onValueChange={handleTimeChange} disabled={isLoading}>
                      <SelectTrigger id="time" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Saat seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableTimes().map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="konu" className="dark:text-gray-300">Konu</Label>
                  <Input
                    id="konu"
                    value={konu}
                    onChange={(e) => setKonu(e.target.value)}
                    placeholder="Örn: Trigonometri konusu"
                    required
                    disabled={isSubmitting}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </>
            )}
          </CardContent>
          {selectedTeacher && selectedDay && selectedTime && (
            <div className="p-4 border-t dark:border-gray-700">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Oluşturuluyor..." : "Randevu Oluştur"}
              </Button>
            </div>
          )}
        </form>
      </Card>
    </div>
  )
}
