"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Soru {
  dogru: string
  yanlis: string
}

const kelimeler: Soru[] = [
  { dogru: "herkes", yanlis: "herkez" },
  { dogru: "yalnız", yanlis: "yanlız" },
  { dogru: "yanlış", yanlis: "yalnış" },
  { dogru: "bir şey", yanlis: "birşey" },
  { dogru: "birçok", yanlis: "bir çok" },
  { dogru: "hiçbir", yanlis: "hiç bir" },
  { dogru: "herhangi", yanlis: "her hangi" },
  { dogru: "bir şey", yanlis: "bişey" },
  { dogru: "iyi ki", yanlis: "iyiki" },
  { dogru: "demek ki", yanlis: "demekki" },
  { dogru: "tabii ki", yanlis: "tabiki" },
  { dogru: "belki de", yanlis: "belkide" },
  { dogru: "yine de", yanlis: "yinede" },
  { dogru: "şimdi de", yanlis: "şimdide" },
  { dogru: "artık da", yanlis: "artıkda" },
  { dogru: "senin de", yanlis: "seninde" },
  { dogru: "benim de", yanlis: "benimde" },
  { dogru: "onun da", yanlis: "onunda" },
  { dogru: "bizim de", yanlis: "bizimde" },
  { dogru: "evde de", yanlis: "evdede" },
  { dogru: "okulda da", yanlis: "okuldada" },
  { dogru: "gelmedi de", yanlis: "gelmedide" },
  { dogru: "yaptı da", yanlis: "yaptıda" },
  { dogru: "gitti de", yanlis: "gittide" },
  { dogru: "çok da", yanlis: "çokta" },
  { dogru: "az da", yanlis: "azda" },
  { dogru: "hiç de", yanlis: "hiçte" },
  { dogru: "biraz da", yanlis: "birazda" },
  { dogru: "olur da", yanlis: "olurda" },
  { dogru: "geliyor musun", yanlis: "geliyormusun" },
  { dogru: "yapar mısın", yanlis: "yaparmısın" },
  { dogru: "gelmez mi", yanlis: "gelmezmi" },
  { dogru: "okudun mu", yanlis: "okudunmu" },
  { dogru: "bilmiyor musun", yanlis: "bilmiyormusun" },
  { dogru: "anlayabiliyor musun", yanlis: "anlıyabiliyormusun" },
  { dogru: "gidiyor muyuz", yanlis: "gidiyormuyuz" },
  { dogru: "yapıyor muydun", yanlis: "yapıyormuydun" },
  { dogru: "yanlış mı", yanlis: "yanlışmı" },
  { dogru: "doğru mu", yanlis: "doğrumu" },
  { dogru: "gelir misin", yanlis: "gelirmisin" },
  { dogru: "görür müydün", yanlis: "görürmüydün" },
  { dogru: "gidebilir misin", yanlis: "gidebilirmisin" },
  { dogru: "yapabilir miydin", yanlis: "yapabilirmiydin" },
  { dogru: "gelmiş miydi", yanlis: "gelmişmiydi" },
  { dogru: "gelecek", yanlis: "gelicek" },
  { dogru: "yapacak", yanlis: "yapıcak" },
  { dogru: "geleceğim", yanlis: "gelicem" },
  { dogru: "gideceğim", yanlis: "gidicem" },
  { dogru: "bakacağım", yanlis: "bakıcam" },
  { dogru: "okuyacağım", yanlis: "okucam" },
  { dogru: "yazacağım", yanlis: "yazcam" },
  { dogru: "söyleyeceğim", yanlis: "söylicem" },
  { dogru: "diyeceğim", yanlis: "dicem" },
  { dogru: "şu an", yanlis: "şuan" },
  { dogru: "şu anki", yanlis: "şuanki" },
  { dogru: "şu anda", yanlis: "şuanda" },
  { dogru: "bugünkü", yanlis: "bugünki" },
  { dogru: "dünkü", yanlis: "dünki" },
  { dogru: "yarınki", yanlis: "yarınki" },
  { dogru: "ya da", yanlis: "yada" },
  { dogru: "affetmek", yanlis: "af etmek" },
  { dogru: "sabretmek", yanlis: "sabır etmek" },
  { dogru: "emretmek", yanlis: "emir etmek" },
  { dogru: "öngörü", yanlis: "ön görü" },
  { dogru: "öngörmek", yanlis: "ön görmek" },
  { dogru: "önyargı", yanlis: "ön yargı" },
  { dogru: "önyargılı", yanlis: "ön yargılı" },
  { dogru: "önyargısız", yanlis: "ön yargısız" },
  { dogru: "önsöz", yanlis: "ön söz" },
  { dogru: "önsözlü", yanlis: "ön sözlü" },
  { dogru: "birdenbire", yanlis: "birden bire" },
  { dogru: "gitgide", yanlis: "git gide" },
  { dogru: "art arda", yanlis: "artarda" },
  { dogru: "peş peşe", yanlis: "peşpeşe" },
  { dogru: "yanı sıra", yanlis: "yanısıra" },
  { dogru: "bir arada", yanlis: "birarada" },
  { dogru: "birbirine", yanlis: "biribirine" },
  { dogru: "birbirinden", yanlis: "biribirinden" },
  { dogru: "birbirini", yanlis: "biribirini" },
  { dogru: "birbirimiz", yanlis: "biribirimiz" },
  { dogru: "hiç kimse", yanlis: "hiçkimse" },
  { dogru: "hiçbir şey", yanlis: "hiçbirşey" },
  { dogru: "hiçbir şeyi", yanlis: "hiçbirşeyi" },
  { dogru: "hiçbir şeye", yanlis: "hiçbirşeye" },
  { dogru: "herhangi bir", yanlis: "herhangibir" },
  { dogru: "herhangi biri", yanlis: "herhangibiri" },
  { dogru: "şoför", yanlis: "şöför" },
  { dogru: "kibrit", yanlis: "kirbit" },
  { dogru: "kirpik", yanlis: "kiprik" },
  { dogru: "psikoloji", yanlis: "pisikoloji" },
  { dogru: "eşofman", yanlis: "eşortman" },
  { dogru: "makine", yanlis: "makina" },
  { dogru: "tıraş", yanlis: "traş" },
  { dogru: "kılavuz", yanlis: "klavuz" },
  { dogru: "egzoz", yanlis: "egsoz" },
  { dogru: "müsaade", yanlis: "müsade" },
  { dogru: "yalnızlık", yanlis: "yanlızlık" },
  { dogru: "herkesten", yanlis: "herkezden" },
  { dogru: "yanlışlık", yanlis: "yalnışlık" },
  { dogru: "birkaç", yanlis: "bi kaç" },
  { dogru: "birtakım", yanlis: "bir takım" },
  { dogru: "birtakımı", yanlis: "bir takımı" },
  { dogru: "birtakım şeyler", yanlis: "bir takım şeyler" },
]

type Durum = "basla" | "oyun" | "sonuc"

export function YazimYanlisOyunu() {
  const [durum, setDurum] = useState<Durum>("basla")
  const [soru, setSoru] = useState<Soru | null>(null)
  const [soruIndex, setSoruIndex] = useState(0)
  const [kullanilanSorular, setKullanilanSorular] = useState<Set<number>>(new Set())
  const [sure, setSure] = useState(60)
  const [puan, setPuan] = useState(0)
  const [seri, setSeri] = useState(0)
  const [yanlislar, setYanlislar] = useState<Array<{ dogru: string; yanlis: string; secim: string }>>([])
  const [dogruCevaplar, setDogruCevaplar] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [sonSkor, setSonSkor] = useState(0)

  useEffect(() => {
    const savedBest = localStorage.getItem("yazimYanlisBest")
    const savedLast = localStorage.getItem("yazimYanlisSon")
    if (savedBest) setBestScore(parseInt(savedBest))
    if (savedLast) setSonSkor(parseInt(savedLast))
  }, [])

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
    setSure(60)
    setPuan(0)
    setSeri(0)
    setYanlislar([])
    setDogruCevaplar(0)
    setKullanilanSorular(new Set())
    soruUret()
  }

  const bitir = () => {
    if (puan > bestScore) {
      setBestScore(puan)
      localStorage.setItem("yazimYanlisBest", puan.toString())
    }
    setSonSkor(puan)
    localStorage.setItem("yazimYanlisSon", puan.toString())
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
      const puanDususu = 5
      setPuan(prev => Math.max(0, prev - puanDususu))
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
            Doğru yazılışı seç! 1 dakika süren var. Seri yaparsan puanın katlanır!
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
