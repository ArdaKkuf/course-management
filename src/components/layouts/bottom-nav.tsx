"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Calendar, BookOpen, FileText, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
  role: string
  name: string
}

interface BottomNavProps {
  user: User
}

export function BottomNav({ user }: BottomNavProps) {
  const pathname = usePathname()

  const navItems = {
    YONETICI: [
      { href: "/dashboard/yonetici", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/yonetici/kullanicilar", label: "Kullanıcılar", icon: Users },
      { href: "/dashboard/yonetici/program", label: "Program", icon: Calendar },
      { href: "/dashboard/yonetici/yoklama", label: "Yoklama", icon: FileText },
    ],
    OGRETMEN: [
      { href: "/dashboard/ogretmen", label: "Ana Sayfa", icon: Home },
      { href: "/dashboard/ogretmen/ogrenciler", label: "Öğrenciler", icon: Users },
      { href: "/dashboard/ogretmen/odev-ekle", label: "Ödev Ekle", icon: BookOpen },
      { href: "/dashboard/ogretmen/musaaitlik", label: "Müsaitlik", icon: Calendar },
      { href: "/dashboard/ogretmen/odevler", label: "Ödevlerim", icon: BookOpen },
      { href: "/dashboard/ogretmen/randevular", label: "Randevular", icon: Calendar },
    ],
    OGRENCI: [
      { href: "/dashboard/ogrenci", label: "Ana Sayfa", icon: Home },
      { href: "/dashboard/ogrenci/program", label: "Program", icon: Calendar },
      { href: "/dashboard/ogrenci/etut-randevu-al", label: "Randevu Al", icon: Calendar },
      { href: "/dashboard/ogrenci/odevler", label: "Ödevlerim", icon: BookOpen },
      { href: "/dashboard/ogrenci/profil", label: "Profil", icon: FileText },
    ]
  }

  const items = navItems[user.role as keyof typeof navItems] || []

  return (
    <>
      {/* Desktop - hide bottom nav */}
      <div className="hidden md:block h-20"></div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 z-50 pb-safe">
        <div className="flex items-center justify-around h-16 px-2 overflow-x-auto">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[60px] py-1 px-2 rounded-lg transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isActive ? "bg-blue-50 dark:bg-blue-900/30" : ""
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] mt-0.5 font-medium leading-tight">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
        {/* Safe area for iOS */}
        <div className="h-safe-area-inset-bottom bg-white dark:bg-gray-900"></div>
      </nav>

      {/* Spacer for mobile */}
      <div className="md:hidden h-20"></div>
    </>
  )
}
