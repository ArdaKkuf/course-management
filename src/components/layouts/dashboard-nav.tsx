"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Calendar, BookOpen, FileText, LogOut, Moon, Sun } from "lucide-react"

interface User {
  role: string
  name: string
}

interface DashboardNavProps {
  user: User
}

export function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const navItems = {
    YONETICI: [
      { href: "/dashboard/yonetici", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/yonetici/kullanicilar", label: "Kullanıcılar", icon: Users },
      { href: "/dashboard/yonetici/program", label: "Ders Programı", icon: Calendar },
      { href: "/dashboard/yonetici/yoklama", label: "Yoklama Raporları", icon: FileText },
    ],
    OGRETMEN: [
      { href: "/dashboard/ogretmen", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/ogretmen/ogrenciler", label: "Öğrenciler", icon: Users },
      { href: "/dashboard/ogretmen/odev-ekle", label: "Ödev Ekle", icon: BookOpen },
      { href: "/dashboard/ogretmen/musaaitlik", label: "Müsaitlik", icon: Calendar },
      { href: "/dashboard/ogretmen/randevular", label: "Randevular", icon: Calendar },
      { href: "/dashboard/ogretmen/odevler", label: "Verilen Ödevler", icon: BookOpen },
    ],
    OGRENCI: [
      { href: "/dashboard/ogrenci", label: "Dashboard", icon: LayoutDashboard },
      { href: "/dashboard/ogrenci/program", label: "Ders Programı", icon: Calendar },
      { href: "/dashboard/ogrenci/etut-randevu-al", label: "Etüt Randevusu Al", icon: Calendar },
      { href: "/dashboard/ogrenci/odevler", label: "Ödevlerim", icon: BookOpen },
      { href: "/dashboard/ogrenci/profil", label: "Profilim", icon: FileText },
    ]
  }

  const items = navItems[user.role as keyof typeof navItems] || []
  const getDashboardLink = () => {
    switch (user.role) {
      case "OGRENCI": return "/dashboard/ogrenci"
      case "OGRETMEN": return "/dashboard/ogretmen"
      case "YONETICI": return "/dashboard/yonetici"
      default: return "/dashboard"
    }
  }

  const getRoleLabel = () => {
    switch (user.role) {
      case "OGRENCI": return "Öğrenci"
      case "OGRETMEN": return "Öğretmen"
      case "YONETICI": return "Yönetici"
      default: return ""
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={getDashboardLink()} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Dershane Yönetim</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {items.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={isActive ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 p-0"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:inline">
              {user.name}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Çıkış</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
