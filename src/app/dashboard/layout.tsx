"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/layouts/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      router.push("/login")
    }
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
