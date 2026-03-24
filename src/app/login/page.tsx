"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const PIN_CODES = {
  YONETICI: "1234",
  OGRETMEN: "5678",
  OGRENCI: "9012"
}

export default function LoginPage() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const { theme, setTheme } = useTheme()

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError("4 haneli PIN giriniz")
      return
    }

    let role: "YONETICI" | "OGRETMEN" | "OGRENCI" | null = null

    if (pin === PIN_CODES.YONETICI) {
      role = "YONETICI"
    } else if (pin === PIN_CODES.OGRETMEN) {
      role = "OGRETMEN"
    } else if (pin === PIN_CODES.OGRENCI) {
      role = "OGRENCI"
    } else {
      setError("Yanlış PIN kodu!")
      return
    }

    if (role) {
      const name = role === "YONETICI" ? "Yönetici" : role === "OGRETMEN" ? "Öğretmen" : "Öğrenci"
      localStorage.setItem("user", JSON.stringify({ role, name }))
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="h-5 w-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-400 mb-2">
          Dershane Yönetim Sistemi
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">PIN kodu ile giriş yapın</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              4 Haneli PIN Kodu
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "")
                setPin(value)
                setError("")
              }}
              className="w-full text-center text-3xl tracking-widest p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
              placeholder="••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">PIN Kodları:</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-400">Yönetici</p>
                <p className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-500">1234</p>
              </div>
              <div>
                <p className="font-semibold text-green-900 dark:text-green-400">Öğretmen</p>
                <p className="font-mono text-2xl font-bold text-green-600 dark:text-green-500">5678</p>
              </div>
              <div>
                <p className="font-semibold text-purple-900 dark:text-purple-400">Öğrenci</p>
                <p className="font-mono text-2xl font-bold text-purple-600 dark:text-purple-500">9012</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 dark:bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-800 dark:hover:bg-blue-700 transition text-lg"
          >
            Giriş Yap
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            PIN kodunuz yok mu? Yönetici ile iletişime geçin
          </p>
        </div>
      </div>
    </div>
  )
}
