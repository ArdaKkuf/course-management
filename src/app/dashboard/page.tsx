"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (!stored) {
      router.push("/login")
      return
    }

    const user = JSON.parse(stored)
    switch (user.role) {
      case "OGRENCI":
        router.push("/dashboard/ogrenci")
        break
      case "OGRETMEN":
        router.push("/dashboard/ogretmen")
        break
      case "YONETICI":
        router.push("/dashboard/yonetici")
        break
      default:
        router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Yükleniyor...</p>
      </div>
    </div>
  )
}
