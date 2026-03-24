"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const PIN_CODES = {
  YONETICI: "1234",
  OGRETMEN: "5678",
  OGRENCI: "9012"
}

export default function LoginPage() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [role, setRole] = useState<"YONETICI" | "OGRETMEN" | "OGRENCI" | null>(null)

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError("4 haneli PIN giriniz")
      return
    }

    if (pin === PIN_CODES.YONETICI) {
      setRole("YONETICI")
    } else if (pin === PIN_CODES.OGRETMEN) {
      setRole("OGRETMEN")
    } else if (pin === PIN_CODES.OGRENCI) {
      setRole("OGRENCI")
    } else {
      setError("Yanlış PIN kodu!")
      return
    }
  }

  const handleConfirm = () => {
    if (!role) return

    localStorage.setItem("user", JSON.stringify({
      role,
      name: role === "YONETICI" ? "Yönetici" : role === "OGRETMEN" ? "Öğretmen" : "Öğrenci"
    }))

    router.push("/dashboard")
  }

  if (role) {
    const roleNames = {
      YONETICI: "Yönetici",
      OGRETMEN: "Öğretmen",
      OGRENCI: "Öğrenci"
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
            Dershane Yönetim Sistemi
          </h1>
          <p className="text-center text-gray-600 mb-8">Hoş geldiniz, {roleNames[role]}!</p>

          <div className="text-center py-4">
            <p className="text-green-600 font-medium text-lg">✅ Doğrulandı</p>
            <p className="text-sm text-gray-600 mt-2">{roleNames[role]} paneline yönlendiriliyorsunuz...</p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition text-lg"
          >
            Dashboard'a Git
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Dershane Yönetim Sistemi
        </h1>
        <p className="text-center text-gray-600 mb-8">PIN kodu ile giriş yapın</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full text-center text-3xl tracking-widest p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">PIN Kodları:</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="font-semibold text-blue-900">Yönetici</p>
                <p className="font-mono text-2xl font-bold text-blue-600">1234</p>
              </div>
              <div>
                <p className="font-semibold text-green-900">Öğretmen</p>
                <p className="font-mono text-2xl font-bold text-green-600">5678</p>
              </div>
              <div>
                <p className="font-semibold text-purple-900">Öğrenci</p>
                <p className="font-mono text-2xl font-bold text-purple-600">9012</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition text-lg"
          >
            Giriş Yap
          </button>

          <p className="text-xs text-center text-gray-500">
            PIN kodunuz yok mu? Yönetici ile iletişime geçin
          </p>
        </div>
      </div>
    </div>
  )
}
