"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Soru {
  dogru: string
  yanlis: string
}

const kelimeler: Soru[] = [
  { dogru: "yazım", yanlis: "yazıym" },
  { dogru: "gidiyor", yanlis: "gidiyor" },
  { dogru: "muhtemelen", yanlis: "muhtemelen" },
  { dogru: "hakikaten", yanlis: "hakikaten" },
  { dogru: "öğrenci", yanlis: "öğrancı" },
  { dogru: "dersane", yanlis: "dershane" },
  { dogru: "kitap", yanlis: "kitap" },
  { dogru: "defter", yanlis: "defter" },
  { dogru: "arkadaş", yanlis: "arkadaş" },
  { dogru: "nasıl", yanlis: "nasıl" },
  { dogru: "böylece", yanlis: "böyleçe" },
  { dogru: "gerçekten", yanlis: "gerçekten" },
  { dogru: "nefese", yanlis: "nefes" },
  { dogru: "bağlı", yanlis: "bağlı" },
  { dogru: "çünkü", yanlis: "çünki" },
  { dogru: "daha", yanlis: "daha" },
  { dogru: "zaman", yanlis: "zaman" },
  { dogru: "süre", yanlis: "süri" },
  { dogru: "öğrenmek", yanlis: "öğrenmek" },
  { dogru: "çalışmak", yanlis: "çalışmak" },
  { dogru: "kitapçı", yanlis: "kitapçi" },
  { dogru: "güzergah", yanlis: "güzergah" },
  { dogru: "milli", yanlis: "mili" },
  { dogru: "harbi", yanlis: "herbi" },
  { dogru: "iflah", yanlis: "ıflah" },
  { dogru: "meşru", yanlis: "meşrui" },
  { dogru: "lafzı", yanlis: "lafı" },
  { dogru: "ruh", yanlis: "ruh" },
  { dogru: "nüfuz", yanlis: "nüfus" },
  { dogru: "kuşku", yanlis: "kuşku" },
]

type Durum = "basla" | "oyun" | "sonuc"

export function YazimYanlisOyunu() {
  const [durum, setDurum] = useState<Durum>("basla")
  const [soru, setSoru] = useState<Soru | null>(null)
  const [soruIndex, setSoruIndex] = useState(0)
  const [kullanilanSorular, setKullanilanSorular] = useState<Set<number>>(new Set())
  const [sure, setSure] = useState(120)
  const [puan, setPuan] = useState(0)
  const [seri, setSeri] = useState(0)
  const [yanlislar, setYanlislar] = useState<Array<{ dogru: string; yanlis: string; secim: string }>>([])
  const [dogruCevaplar, setDogruCevaplar] = useState(0)

  const soruUret = useCallback(() => {
    if (kullanilanSorular.size >= kelimeler.length) {
      bitir()
      return
    }

    let rastgeleIndex: number
    do {
      rastgeleIndex = Math.floor(Math.random() * kelimeler.length)
    } while (kullanilanSorular.has(rastgeleIndex))

    setKullanilanSorular(prev => new Set([...prev, rastgeleIndex]))
    setSoruIndex(rastgeleIndex)

    const secilenSoru = kelimeler[rastgeleIndex]
    const solTaraf = Math.random() < 0.5 ? "dogru" : "yanlis"
    setSoru({
      dogru: solTaraf === "dogru" ? secilenSoru.dogru : secilenSoru.yanlis,
      yanlis: solTaraf === "dogru" ? secilenSoru.yanlis : secilenSoru.dogru,
    })
  }, [kullanilanSorular])

  const basla = () => {
    setDurum("oyun")
    setSure(120)
    setPuan(0)
    setSeri(0)
    setYanlislar([])
    setDogruCevaplar(0)
    setKullanilanSorular(new Set())
    soruUret()
  }

  const bitir = () => {
    setDurum("sonuc")
  }

  const cevapVer = (secim: string) => {
    if (!soru) return

    const dogruCevap = kelimeler[soruIndex].dogru
    const yanlisCevap = kelimeler[soruIndex].yanlis

    if (secim === dogruCevap) {
      const yeniSeri = seri + 1
      const seriBonus = yeniSeri >= 3 ? Math.pow(1.5, yeniSeri - 2) : 1
      const yeniPuan = Math.round(10 * seriBonus)
      setPuan(prev => prev + yeniPuan)
      setSeri(yeniSeri)
      setDogruCevaplar(prev => prev + 1)
    } else {
      setYanlislar(prev => [...prev, { dogru: dogruCevap, yanlis: yanlisCevap, secim }])
      setSeri(0)
    }

    soruUret()
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
          <CardTitle className="dark:text-white">🎯 Yazım Yanlışı Oyunu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground dark:text-gray-400">
            Doğru yazılışı seç! 2 dakika süren var. Seri yaparsan puanın katlanır!
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
            <CardTitle className="dark:text-white">🎯 Yazım Yanlışı Oyunu</CardTitle>
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

          <div className="text-center py-4">
            <p className="text-lg font-medium dark:text-gray-200 mb-4">Doğru yazılış hangisi?</p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => cevapVer(soru.dogru)}
                variant="outline"
                className="h-24 text-lg font-semibold dark:border-gray-600 dark:hover:bg-gray-700"
              >
                {soru.dogru}
              </Button>
              <Button
                onClick={() => cevapVer(soru.yanlis)}
                variant="outline"
                className="h-24 text-lg font-semibold dark:border-gray-600 dark:hover:bg-gray-700"
              >
                {soru.yanlis}
              </Button>
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
              {dogruCevaplar} doğru • {yanlislar.length} yanlış
            </p>
          </div>

          {yanlislar.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold dark:text-gray-200">Yanlış Yapılanlar:</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {yanlislar.map((hata, i) => (
                  <div key={i} className="text-sm border-b dark:border-gray-700 pb-1">
                    <span className="text-red-600 dark:text-red-400 line-through mr-2">{hata.secim}</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">→ {hata.dogru}</span>
                  </div>
                ))}
              </div>
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
