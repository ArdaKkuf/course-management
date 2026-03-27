"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { quizVerisiGenis } from "./tyt-quiz-data-expanded"

export interface Soru {
  soru: string
  secenekler: string[]
  dogru: string
}

export interface Konu {
  ad: string
  sorular: Soru[]
}

interface QuizData {
  [key: string]: Konu[]
}

interface TYTQuizProps {
  baslangicDers?: string
}

// TYT 9-10. sınıf müfredatına uygun sorular
const quizVerisiInternal: QuizData = quizVerisiGenis

type Durum = "basla" | "oyun" | "sonuc"

export function TYTQuiz({ baslangicDers }: TYTQuizProps) {
  const [durum, setDurum] = useState<Durum>("basla")
  const [secilenDersler, setSecilenDersler] = useState<string[]>(baslangicDers ? [baslangicDers] : [])
  const [secilenKonular, setSecilenKonular] = useState<string[]>([])
  const [kategori, setKategori] = useState<string>("")
  const [soru, setSoru] = useState<Soru | null>(null)
  const [sorular, setSorular] = useState<Soru[]>([])
  const [mevcutSoru, setMevcutSoru] = useState(0)
  const [soruSayisi, setSoruSayisi] = useState<number>(10)
  const [dogruCevaplar, setDogruCevaplar] = useState(0)
  const [yanlislar, setYanlislar] = useState<Array<{ soru: string; dogru: string; secim: string }>>([])

  // BaslangicDers ile geldiysek, direkt konu secimine git
  useEffect(() => {
    if (baslangicDers && quizVerisiInternal[baslangicDers]) {
      setSecilenDersler([baslangicDers])
    }
  }, [baslangicDers])

  useEffect(() => {
    const savedProgress = localStorage.getItem("tytQuizProgress")
    if (savedProgress && !baslangicDers) {
      const { secilenDersler: dersler, soruSayisi: sayi } = JSON.parse(savedProgress)
      setSecilenDersler(dersler)
      setSoruSayisi(sayi)
    }
  }, [baslangicDers])

  const ilerlemeKaydet = () => {
    localStorage.setItem("tytQuizProgress", JSON.stringify({
      secilenDersler,
      soruSayisi
    }))
  }

  const dersSec = (ders: string) => {
    if (secilenDersler.includes(ders)) {
      setSecilenDersler(prev => prev.filter(d => d !== ders))
    } else {
      setSecilenDersler(prev => [...prev, ders])
    }
    ilerlemeKaydet()
  }

  const soruSayisiSec = (sayi: number) => {
    setSoruSayisi(sayi)
    ilerlemeKaydet()
  }

  const konuSec = (konuAdi: string) => {
    if (secilenKonular.includes(konuAdi)) {
      setSecilenKonular(prev => prev.filter(k => k !== konuAdi))
    } else {
      setSecilenKonular(prev => [...prev, konuAdi])
    }
  }

  const karmaSec = () => {
    // Seçili dersin tüm konularını seç
    const tumKonular: string[] = []
    secilenDersler.forEach(ders => {
      if (quizVerisiInternal[ders]) {
        quizVerisiInternal[ders].forEach(konu => {
          tumKonular.push(konu.ad)
        })
      }
    })
    setSecilenKonular(tumKonular)
  }

  const basla = () => {
    // Eğer baslangicDers varsa ve konu seçimi yapılmamışsa, önce konu seçimi yapmalı
    if (baslangicDers && secilenKonular.length === 0) {
      // Konu seçimine devam et
      return
    }

    // Eğer baslangicDers yoksa ve konu seçimi yoksa, eski davranış
    if (!baslangicDers && secilenDersler.length === 0) return

    // Soruları topla
    const tumSorular: Soru[] = []

    if (baslangicDers) {
      // Tek ders için konu bazlı seçim
      if (secilenKonular.length === 0) return

      quizVerisiInternal[baslangicDers].forEach(konu => {
        if (secilenKonular.includes(konu.ad)) {
          tumSorular.push(...konu.sorular)
        }
      })
    } else {
      // Eski multi-ders modu
      secilenDersler.forEach(ders => {
        quizVerisiInternal[ders].forEach(konu => {
          tumSorular.push(...konu.sorular)
        })
      })
    }

    if (tumSorular.length === 0) return

    // Soruları karıştır ve seçilen sayı kadar al
    const karistirilmis = tumSorular.sort(() => Math.random() - 0.5).slice(0, soruSayisi)

    let finalSorular: Soru[]
    if (karistirilmis.length === 0 && tumSorular.length > 0) {
      // Yeterli soru yoksa, mevcut soruların hepsini al
      finalSorular = tumSorular.sort(() => Math.random() - 0.5)
    } else {
      finalSorular = karistirilmis
    }

    setSorular(finalSorular)
    setMevcutSoru(0)
    setDogruCevaplar(0)
    setYanlislar([])
    setSoru(finalSorular[0])
    setDurum("oyun")
  }

  const cevapVer = (secim: string) => {
    if (!soru) return

    if (secim === soru.dogru) {
      setDogruCevaplar(prev => prev + 1)
    } else {
      setYanlislar(prev => [...prev, { soru: soru.soru, dogru: soru.dogru, secim }])
    }

    const sonrakiSoru = mevcutSoru + 1
    if (sonrakiSoru < sorular.length) {
      setMevcutSoru(sonrakiSoru)
      setSoru(sorular[sonrakiSoru])
    } else {
      bitir()
    }
  }

  const bitir = () => {
    // Best score kaydet
    const derslerKey = secilenDersler.sort().join('+')
    const skor = dogruCevaplar * 10
    const savedBest = localStorage.getItem('tytQuizBest')
    const bestScores = savedBest ? JSON.parse(savedBest) : {}

    if (!bestScores[derslerKey] || skor > bestScores[derslerKey]) {
      bestScores[derslerKey] = skor
      localStorage.setItem('tytQuizBest', JSON.stringify(bestScores))
    }

    // Son skor kaydet
    const savedLast = localStorage.getItem('tytQuizSon')
    const sonScores = savedLast ? JSON.parse(savedLast) : {}
    sonScores[derslerKey] = skor
    localStorage.setItem('tytQuizSon', JSON.stringify(sonScores))

    // Yanlış soruları kaydet
    if (yanlislar.length > 0) {
      const savedQuestions = localStorage.getItem('tytQuizYanlislar')
      const allWrongQuestions = savedQuestions ? JSON.parse(savedQuestions) : []

      // Her yanlış soruyu tarihle birlikte kaydet
      yanlislar.forEach(yanlis => {
        allWrongQuestions.push({
          soru: yanlis.soru,
          dogru: yanlis.dogru,
          secim: yanlis.secim,
          tarih: new Date().toISOString(),
          ders: secilenDersler.join(', ')
        })
      })

      localStorage.setItem('tytQuizYanlislar', JSON.stringify(allWrongQuestions))
    }

    setDurum("sonuc")
  }

  const kategoriAdi = (kat: string) => {
    const adlar: { [key: string]: string } = {
      fizik: "⚛️ Fizik",
      kimya: "🧪 Kimya",
      biyoloji: "🧬 Biyoloji",
      matematik: "📐 Matematik",
      turkce: "📖 Türkçe",
      tarih: "📜 Tarih",
      felsefe: "🧠 Felsefe",
      din: "🕌 Din Kültürü"
    }
    return adlar[kat] || kat
  }

  if (durum === "basla") {
    // Tek ders için konu seçimi
    if (baslangicDers && quizVerisiInternal[baslangicDers]) {
      const konular = quizVerisiInternal[baslangicDers]

      return (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">{kategoriAdi(baslangicDers)} - Konu Seç</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Konu Seçimi */}
            <div>
              <p className="text-sm font-medium dark:text-gray-200 mb-3">Konu Seç:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {konular.map((konu) => (
                  <Button
                    key={konu.ad}
                    onClick={() => konuSec(konu.ad)}
                    variant={secilenKonular.includes(konu.ad) ? "default" : "outline"}
                    className="h-auto text-sm dark:border-gray-600 dark:hover:bg-gray-700 text-left px-4 py-3"
                  >
                    <div>
                      <div className="font-semibold">{konu.ad}</div>
                      <div className="text-xs opacity-70">{konu.sorular.length} soru</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Karma Butonu */}
            <Button
              onClick={karmaSec}
              variant="secondary"
              className="w-full"
              size="lg"
            >
              ⚡ Karma (Tüm Konular Karışık)
            </Button>

            {/* Soru Sayısı Seçimi */}
            <div>
              <p className="text-sm font-medium dark:text-gray-200 mb-3">Soru Sayısı:</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {[5, 10, 15, 20, 25, 30].map((sayi) => (
                  <Button
                    key={sayi}
                    onClick={() => soruSayisiSec(sayi)}
                    variant={soruSayisi === sayi ? "default" : "outline"}
                    className="h-10 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    {sayi}
                  </Button>
                ))}
              </div>
            </div>

            {/* Başla Butonu */}
            <Button
              onClick={basla}
              disabled={secilenKonular.length === 0}
              className="w-full"
              size="lg"
            >
              Quiz Başla ({secilenKonular.length} konu seçili)
            </Button>

            {/* Bilgi */}
            <div className="text-xs text-muted-foreground dark:text-gray-400 text-center">
              {secilenKonular.length > 0 ? `${secilenKonular.length} konu seçildi` : "En az bir konu seçmelisin"}
            </div>
          </CardContent>
        </Card>
      )
    }

    // Çoklu ders seçimi (eski mod)
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">🎓 TYT Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ders Seçimi */}
          <div>
            <p className="text-sm font-medium dark:text-gray-200 mb-3">Ders Seç:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.keys(quizVerisiInternal).map((ders) => (
                <Button
                  key={ders}
                  onClick={() => dersSec(ders)}
                  variant={secilenDersler.includes(ders) ? "default" : "outline"}
                  className="h-12 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {kategoriAdi(ders)}
                </Button>
              ))}
            </div>
          </div>

          {/* Soru Sayısı Seçimi */}
          <div>
            <p className="text-sm font-medium dark:text-gray-200 mb-3">Soru Sayısı:</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[5, 10, 15, 20, 25, 30].map((sayi) => (
                <Button
                  key={sayi}
                  onClick={() => soruSayisiSec(sayi)}
                  variant={soruSayisi === sayi ? "default" : "outline"}
                  className="h-10 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {sayi}
                </Button>
              ))}
            </div>
          </div>

          {/* Başla Butonu */}
          <Button
            onClick={basla}
            disabled={secilenDersler.length === 0}
            className="w-full"
            size="lg"
          >
            Quiz Başla
          </Button>

          {/* Best Score Gösterimi */}
          <div className="text-xs text-muted-foreground dark:text-gray-400 text-center">
            Seçtiğin derslere göre quiz yapacaksın. Best score otomatik kaydedilir.
          </div>
        </CardContent>
      </Card>
    )
  }

  if (durum === "oyun" && soru) {
    const secenekler = [...soru.secenekler].sort(() => Math.random() - 0.5)

    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="dark:text-white text-lg">Soru {mevcutSoru + 1}/{sorular.length}</CardTitle>
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">
              {dogruCevaplar * 10} Puan
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center py-4">
            <p className="text-base font-medium dark:text-gray-200 mb-4">{soru.soru}</p>
            <div className="grid grid-cols-1 gap-2">
              {secenekler.map((secenek, i) => (
                <Button
                  key={i}
                  onClick={() => cevapVer(secenek)}
                  variant="outline"
                  className="w-full h-12 text-left px-4 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <span className="mr-2 font-bold text-muted-foreground text-xs">{String.fromCharCode(65 + i)})</span>
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
    const derslerKey = secilenDersler.sort().join('+')
    const savedBest = localStorage.getItem('tytQuizBest')
    const bestScores = savedBest ? JSON.parse(savedBest) : {}
    const savedLast = localStorage.getItem('tytQuizSon')
    const sonScores = savedLast ? JSON.parse(savedLast) : {}
    const skor = dogruCevaplar * 10

    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">🎉 Quiz Bitti!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{skor} Puan</p>
            <p className="text-muted-foreground dark:text-gray-400">
              {dogruCevaplar} doğru • {yanlislar.length} yanlış
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                <p className="text-yellow-800 dark:text-yellow-400 font-semibold">En İyi</p>
                <p className="text-yellow-900 dark:text-yellow-300">{bestScores[derslerKey] || 0}</p>
              </div>
              <div className="text-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                <p className="text-blue-800 dark:text-blue-400 font-semibold">Son</p>
                <p className="text-blue-900 dark:text-blue-300">{sonScores[derslerKey] || 0}</p>
              </div>
            </div>
          </div>

          {yanlislar.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold dark:text-gray-200 text-sm">Yanlış Yapılanlar:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {yanlislar.map((hata, i) => (
                  <div key={i} className="text-xs border-b dark:border-gray-700 pb-2">
                    <p className="font-medium dark:text-gray-200">{hata.soru}</p>
                    <p className="text-red-600 dark:text-red-400">Seçimin: {hata.secim}</p>
                    <p className="text-green-600 dark:text-green-400">Doğru: {hata.dogru}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setDurum("basla")} variant="outline" size="sm">
              Ana Menü
            </Button>
            <Button onClick={() => basla()} size="sm">
              Tekrar Oyna
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
