"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Soru {
  soru: string
  secenekler: string[]
  dogru: string
}

type Durum = "basla" | "oyun" | "sonuc"

function soruUret(): Soru {
  const islemler = ["+", "-", "×", "÷"]
  const islem = islemler[Math.floor(Math.random() * islemler.length)]

  let sayi1: number
  let sayi2: number
  let cevap: number
  let soruMetni: string

  switch (islem) {
    case "+":
      sayi1 = Math.floor(Math.random() * 100) + 1
      sayi2 = Math.floor(Math.random() * 100) + 1
      cevap = sayi1 + sayi2
      break
    case "-":
      sayi1 = Math.floor(Math.random() * 100) + 20
      sayi2 = Math.floor(Math.random() * sayi1)
      cevap = sayi1 - sayi2
      break
    case "×":
      sayi1 = Math.floor(Math.random() * 12) + 2
      sayi2 = Math.floor(Math.random() * 12) + 2
      cevap = sayi1 * sayi2
      break
    case "÷":
      sayi2 = Math.floor(Math.random() * 11) + 2
      cevap = Math.floor(Math.random() * 12) + 2
      sayi1 = sayi2 * cevap
      break
    default:
      sayi1 = 1
      sayi2 = 1
      cevap = 1
  }

  soruMetni = `${sayi1} ${islem} ${sayi2} = ?`

  // Yanlış seçenekler üret
  const secenekler = [cevap.toString()]
  while (secenekler.length < 4) {
    let yanlisCevap: number
    const rastgele = Math.random()

    if (rastgele < 0.25) {
      yanlisCevap = cevap + Math.floor(Math.random() * 10) + 1
    } else if (rastgele < 0.5) {
      yanlisCevap = cevap - Math.floor(Math.random() * 10) - 1
    } else if (rastgele < 0.75) {
      yanlisCevap = cevap + Math.floor(Math.random() * 5) + 1
    } else {
      yanlisCevap = Math.floor(Math.random() * 150)
    }

    if (yanlisCevap >= 0 && yanlisCevap !== cevap && !secenekler.includes(yanlisCevap.toString())) {
      secenekler.push(yanlisCevap.toString())
    }
  }

  // Seçenekleri karıştır
  const karistirilmis = secenekler.sort(() => Math.random() - 0.5)

  return {
    soru: soruMetni,
    secenekler: karistirilmis,
    dogru: cevap.toString()
  }
}

export function MatematikOyunu() {
  const [durum, setDurum] = useState<Durum>("basla")
  const [soru, setSoru] = useState<Soru | null>(null)
  const [sure, setSure] = useState(60)
  const [puan, setPuan] = useState(0)
  const [seri, setSeri] = useState(0)
  const [yanlislar, setYanlislar] = useState<number>(0)
  const [dogruCevaplar, setDogruCevaplar] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [sonSkor, setSonSkor] = useState(0)

  useEffect(() => {
    const savedBest = localStorage.getItem("matematikBest")
    const savedLast = localStorage.getItem("matematikSon")
    if (savedBest) setBestScore(parseInt(savedBest))
    if (savedLast) setSonSkor(parseInt(savedLast))
  }, [])

  const yeniSoru = useCallback(() => {
    setSoru(soruUret())
  }, [])

  const basla = () => {
    setDurum("oyun")
    setSure(60)
    setPuan(0)
    setSeri(0)
    setYanlislar(0)
    setDogruCevaplar(0)
    yeniSoru()
  }

  const bitir = () => {
    if (puan > bestScore) {
      setBestScore(puan)
      localStorage.setItem("matematikBest", puan.toString())
    }
    setSonSkor(puan)
    localStorage.setItem("matematikSon", puan.toString())
    setDurum("sonuc")
  }

  const cevapVer = (secim: string) => {
    if (!soru) return

    if (secim === soru.dogru) {
      const yeniSeri = seri + 1
      const seriBonus = yeniSeri >= 3 ? Math.pow(1.5, yeniSeri - 2) : 1
      const zorlukBonus = soru.soru.includes("×") || soru.soru.includes("÷") ? 1.5 : 1
      const yeniPuan = Math.round(10 * seriBonus * zorlukBonus)
      setPuan(prev => prev + yeniPuan)
      setSeri(yeniSeri)
      setDogruCevaplar(prev => prev + 1)
    } else {
      const puanDususu = 5
      setPuan(prev => Math.max(0, prev - puanDususu))
      setYanlislar(prev => prev + 1)
      setSeri(0)
    }

    yeniSoru()
  }

  useEffect(() => {
    if (durum === "oyun" && sure > 0) {
      const timer = setTimeout(() => setSure(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (sure === 0 && durum === "oyun") {
      bitir()
    }
  }, [sure, durum])

  if (durum === "basla") {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">🔢 Hızlı Matematik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">En İyi Skor</p>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">{bestScore}</p>
            </div>
            <div className="text-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-400">Son Skor</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{sonSkor}</p>
            </div>
          </div>
          <p className="text-muted-foreground dark:text-gray-400">
            1 dakikada kaç işlem çözersin? Çarpma/bölme daha çok puan!
          </p>
          <Button onClick={basla} className="w-full">
            Oyunu Başlat
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (durum === "oyun" && soru) {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="dark:text-white">🔢 Hızlı Matematik</CardTitle>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {Math.floor(sure / 60)}:{(sure % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground dark:text-gray-400">
              Puan: <span className="font-bold text-green-600 dark:text-green-400">{puan}</span>
            </span>
            <span className="text-muted-foreground dark:text-gray-400">
              Seri: <span className="font-bold text-blue-600 dark:text-blue-400">{seri}</span>
              {seri >= 3 && " 🔥"}
            </span>
          </div>

          <div className="text-center py-6">
            <p className="text-4xl font-bold dark:text-white mb-6">{soru.soru}</p>
            <div className="grid grid-cols-2 gap-3">
              {soru.secenekler.map((secenek, i) => (
                <Button
                  key={i}
                  onClick={() => cevapVer(secenek)}
                  variant="outline"
                  className="h-16 text-xl font-semibold dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {secenek}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (durum === "sonuc") {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">🎉 Oyun Bitti!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{puan} Puan</p>
            <p className="text-muted-foreground dark:text-gray-400">
              {dogruCevaplar} doğru • {yanlislar} yanlış
            </p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Ortalama: {dogruCevaplar + yanlislar > 0 ? (60 / (dogruCevaplar + yanlislar)).toFixed(1) : "0"} saniye/soru
            </p>
          </div>

          {puan >= bestScore && puan > 0 && (
            <div className="text-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <p className="text-lg font-bold text-yellow-800 dark:text-yellow-400">🏆 Yeni Rekor!</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setDurum("basla")} variant="outline">
              Tekrar Oyna
            </Button>
            <Button onClick={() => setDurum("basla")}>
              Ana Menü
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
