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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-6 right-6 p-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
        <Moon className="h-5 w-5 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
      </button>

      {/* Main Card */}
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20 mb-4">
            <span className="text-white text-2xl font-bold">D</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dershane Yönetim
          </h1>
          <p className="text-gray-600 dark:text-gray-400">PIN kodu ile giriş yapın</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 p-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="space-y-6">
            {/* PIN Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && pin.length === 4) {
                    handleLogin()
                  }
                }}
                className="w-full text-center text-4xl tracking-[0.5em] p-5 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white dark:bg-gray-700 dark:text-white font-mono"
                placeholder="••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <span className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</span>
              </div>
            )}

            {/* PIN Codes Reference */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                PIN Kodları
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { role: "Yönetici", pin: "1234", color: "blue" },
                  { role: "Öğretmen", pin: "5678", color: "green" },
                  { role: "Öğrenci", pin: "9012", color: "purple" }
                ].map((item) => (
                  <div
                    key={item.role}
                    className="text-center p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform"
                  >
                    <p className={`text-xs font-semibold text-${item.color}-900 dark:text-${item.color}-400 mb-1`}>
                      {item.role}
                    </p>
                    <p className={`font-mono text-2xl font-bold text-${item.color}-600 dark:text-${item.color}-500`}>
                      {item.pin}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={pin.length !== 4}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] text-lg"
            >
              Giriş Yap
            </button>

            {/* Help Text */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              PIN kodunuz yok mu? Yönetici ile iletişime geçin
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
