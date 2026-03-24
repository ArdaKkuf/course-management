"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/layouts/dashboard-nav"
import { BottomNav } from "@/components/layouts/bottom-nav"

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-6 flex-1 pb-24 md:pb-6">
        {children}
      </main>
      <BottomNav user={user} />
      <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-3 text-center text-xs text-gray-500 dark:text-gray-400 md:block hidden">
        Designed by Arda Küf
      </footer>
      {/* Mobile footer */}
      <div className="md:hidden fixed bottom-20 left-0 right-0 text-center pb-2 bg-gray-50 dark:bg-gray-950">
        <p className="text-[10px] text-gray-400 dark:text-gray-500">Designed by Arda Küf</p>
      </div>
    </div>
  )
}
