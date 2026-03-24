"use client"

import { useState, useEffect } from "react"
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
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [konu, setKonu] = useState("")

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/etut/teachers")
      if (response.ok) {
        const data = await response.json()
        setTeachers(data.teachers || [])
      }
    } catch (error) {
      console.error("Öğretmenler yüklenirken hata:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTeacherChange = async (teacherId: string | null) => {
    if (!teacherId) {
      setSelectedTeacher("")
      setSelectedDay("")
      setSelectedTime("")
      setAvailableSlots([])
      return
    }

    setSelectedTeacher(teacherId)
    setSelectedDay("")
    setSelectedTime("")

    setIsLoading(true)
    try {
      const response = await fetch(`/api/etut/available?ogretmenId=${teacherId}`)
      if (response.ok) {
        const data = await response.json()
        setAvailableSlots(data.slots || [])
      }
    } catch (error) {
      console.error("Müsaatlikler yüklenirken hata:", error)
    } finally {
      setIsLoading(false)
    }
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
      const response = await fetch("/api/etut/randevu-olustur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ogretmenId: selectedTeacher,
          gun: selectedDay,
          saat: selectedTime,
          konu
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Randevu oluşturulamadı")
      }

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
        <h1 className="text-3xl font-bold">Etüt Randevusu Al</h1>
        <p className="text-muted-foreground">Müsait öğretmenleri görüntüleyin ve randevu alın</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Randevu Bilgileri</CardTitle>
          <CardDescription>Detayları doldurun</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacher">Öğretmen Seçin</Label>
              <Select value={selectedTeacher} onValueChange={handleTeacherChange} disabled={isLoading}>
                <SelectTrigger id="teacher">
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
                  <Label htmlFor="day">Gün Seçin</Label>
                  <Select value={selectedDay} onValueChange={handleDayChange} disabled={isLoading}>
                    <SelectTrigger id="day">
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
                    <Label htmlFor="time">Saat Seçin</Label>
                    <Select value={selectedTime} onValueChange={handleTimeChange} disabled={isLoading}>
                      <SelectTrigger id="time">
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
                  <Label htmlFor="konu">Konu</Label>
                  <Input
                    id="konu"
                    value={konu}
                    onChange={(e) => setKonu(e.target.value)}
                    placeholder="Örn: Trigonometri konusu"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </>
            )}
          </CardContent>
          {selectedTeacher && selectedDay && selectedTime && (
            <div className="p-4 border-t">
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
