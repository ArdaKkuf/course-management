"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Soru {
  soru: string
  secenekler: string[]
  dogru: string
  aciklama?: string
}

interface QuizData {
  [key: string]: Soru[]
}

const quizVerisi: QuizData = {
  felsefe: [
    {
      soru: "İlk Türk filozof kimdir?",
      secenekler: ["Farabi", "Yunus Emre", "Hoca Ahmet Yesevi", "Mevlana"],
      dogru: "Hoca Ahmet Yesevi"
    },
    {
      soru: "'Bilgi doğrudur' öğretisine hangi okul aittir?",
      secenekler: ["Stoacılık", "Epikürosçuluk", "Elea Okulu", "Akademi"],
      dogru: "Elea Okulu"
    },
    {
      soru: "İlk Çağ'da 'Neden' sorusu ile ilgilenen bilim dalı hangisidir?",
      secenekler: ["Fizik", "Metafizik", "Etik", "Mantık"],
      dogru: "Metafizik"
    },
    {
      soru: "'İnsan her şeyin ölçüsüdür' söylediği düşünür kimdir?",
      secenekler: ["Sokrates", "Platon", "Aristoteles", "Protagoras"],
      dogru: "Protagoras"
    },
    {
      soru: "İslam felsefesinin kurucusu kabul edilen filozof kimdir?",
      secenekler: ["İbn-i Sina", "Kindi", "Farabi", "Gazali"],
      dogru: "Kindi"
    },
    {
      soru: "'Mağara Alegorisi' hangi filozofa aittir?",
      secenekler: ["Sokrates", "Platon", "Aristoteles", "Plotinos"],
      dogru: "Platon"
    },
    {
      soru: "'Mutlak akıl' kavramını ilk kullanan filozof kimdir?",
      secenekler: ["Farabi", "İbn-i Sina", "İbn Rüşd", "Kindi"],
      dogru: "Farabi"
    },
    {
      soru: "'Tanzimat' döneminde Batı felsefesini Türkçeye kazandıran düşünür kimdir?",
      secenekler: ["Şinasi", "Namık Kemal", "Ziya Paşa", "Ali Suavi"],
      dogru: "Şinasi"
    },
    {
      soru: "'Bilgi horsemu doğrudur' öğretisine hangi felsefe sistemi aittir?",
      secenekler: ["Rasyonalizm", "Ampirizm", "Kritisizm", "Dogmatizm"],
      dogru: "Ampirizm"
    },
    {
      soru: "'Ahlak' kavramını 'erdem' ile açıklayan felsefe öğretisi hangisidir?",
      secenekler: ["Utilitaryenizm", "Erdem ahlakı", "Görecilik ahlakı", "Ödev ahlakı"],
      dogru: "Erdem ahlakı"
    }
  ],
  din: [
    {
      soru: "Hz. Muhammed hangi yıl doğmuştur?",
      secenekler: ["570", "571", "572", "573"],
      dogru: "571"
    },
    {
      soru: "İslam'ın beş şartından hangisi 'İman' ile başlar?",
      secenekler: ["Namaz", "Oruç", "Hac", "Zekat"],
      dogru: "Namaz"
    },
    {
      soru: "Kur'an-ı Kerim kaç yılda indirilmiştir?",
      secenekler: ["20", "21", "22", "23"],
      dogru: "23"
    },
    {
      soru: "Hz. Muhammed'in ilk vahyini aldığı yer neresidir?",
      secenekler: ["Hira Mağarası", "Sevr Mağarası", "Thawr Mağarası", "Nemira Mağarası"],
      dogru: "Hira Mağarası"
    },
    {
      soru: "İslamiyet'te kaç tane farz namaz vardır?",
      secenekler: ["3", "4", "5", "6"],
      dogru: "5"
    },
    {
      soru: "Hicret hangi yılda gerçekleşmiştir?",
      secenekler: ["620", "622", "624", "626"],
      dogru: "622"
    },
    {
      soru: "Kur'an-ı Kerim ilk kez hangi halife ile kitap haline getirilmiştir?",
      secenekler: ["Hz. Ebu Bekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
      dogru: "Hz. Ebu Bekir"
    },
    {
      soru: "İslamiyet'te oruç hangi ayda tutulur?",
      secenekler: ["Recep", "Şaban", "Ramazan", "Muharrem"],
      dogru: "Ramazan"
    },
    {
      soru: "Hz. Muhammed'in vefat ettiği yaş kaçtır?",
      secenekler: ["60", "61", "62", "63"],
      dogru: "63"
    },
    {
      soru: "İslam'ın kutsal kitabı olan Kur'an-ı Kerim kaç sureden oluşur?",
      secenekler: ["100", "108", "114", "120"],
      dogru: "114"
    }
  ],
  tarih: [
    {
      soru: "İlk Türk devleti hangisidir?",
      secenekler: ["Hun İmparatorluğu", "Göktürk Kağanlığı", "Uygur Kağanlığı", "Hazar Kağanlığı"],
      dogru: "Hun İmparatorluğu"
    },
    {
      soru: "Türklerin İslamiyeti kabul ettiği ilk devlet hangisidir?",
      secenekler: ["Karahanlılar", "Gazneliler", "Büyük Selçuklular", "Harezmşahlar"],
      dogru: "Karahanlılar"
    },
    {
      soru: "Malazgirt Savaşı hangi yılda yapılmıştır?",
      secenekler: ["1051", "1071", "1091", "1111"],
      dogru: "1071"
    },
    {
      soru: "Osmanlı Devleti'nin kurucusu kimdir?",
      secenekler: ["Osman Bey", "Orhan Bey", "Fatih Sultan Mehmet", "Yıldırım Bayezid"],
      dogru: "Osman Bey"
    },
    {
      soru: "İstanbul'un fethi hangi yılda yapılmıştır?",
      secenekler: ["1453", "1463", "1473", "1483"],
      dogru: "1453"
    },
    {
      soru: "Kurtuluş Savaşı'nın başlangıç tarihi kabul edilen olay nedir?",
      secenekler: ["Erzurum Kongresi", "Samsun'a çıkarma", "Amasya Genelgesi", "Misak-ı Milli"],
      dogru: "Samsun'a çıkarma"
    },
    {
      soru: "Türkiye Cumhuriyeti hangi yılda ilan edilmiştir?",
      secenekler: ["1920", "1921", "1922", "1923"],
      dogru: "1923"
    },
    {
      soru: "Atatürk ilkelerinden hangisi 'Cumhuriyetçilik' ile aynı anlamdadır?",
      secenekler: ["Milliyetçilik", "Halkçılık", "Cumhuriyetçilik", "Devletçilik"],
      dogru: "Cumhuriyetçilik"
    },
    {
      soru: "Saltanatın kaldırıldığı yıl hangisidir?",
      secenekler: ["1920", "1922", "1924", "1926"],
      dogru: "1922"
    },
    {
      soru: "Türkiye Büyük Millet Meclisi hangi yılda açılmıştır?",
      secenekler: ["1919", "1920", "1921", "1922"],
      dogru: "1920"
    }
  ]
}

type Durum = "basla" | "oyun" | "sonuc"

export function TYTQuizOyunu() {
  const [durum, setDurum] = useState<Durum>("basla")
  const [kategori, setKategori] = useState<string>("")
  const [soru, setSoru] = useState<Soru | null>(null)
  const [sorular, setSorular] = useState<Soru[]>([])
  const [mevcutSoru, setMevcutSoru] = useState(0)
  const [dogruCevaplar, setDogruCevaplar] = useState(0)
  const [yanlislar, setYanlislar] = useState<Array<{ soru: string; dogru: string; secim: string }>>([])
  const [bestScores, setBestScores] = useState<{ [key: string]: number }>({})
  const [sonSkorlar, setSonSkorlar] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const savedBest = localStorage.getItem("tytQuizBest")
    const savedLast = localStorage.getItem("tytQuizSon")
    if (savedBest) setBestScores(JSON.parse(savedBest))
    if (savedLast) setSonSkorlar(JSON.parse(savedLast))
  }, [])

  const kategoriSec = (secilenKategori: string) => {
    const kategoriSorulari = [...quizVerisi[secilenKategori]]
    // Soruları karıştır
    const karistirilmis = kategoriSorulari.sort(() => Math.random() - 0.5)

    setKategori(secilenKategori)
    setSorular(karistirilmis)
    setMevcutSoru(0)
    setDogruCevaplar(0)
    setYanlislar([])
    setSoru(karistirilmis[0])
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
    const skor = dogruCevaplar * 10
    const guncelBest = { ...bestScores }
    const guncelSon = { ...sonSkorlar }

    if (!guncelBest[kategori] || skor > guncelBest[kategori]) {
      guncelBest[kategori] = skor
    }
    guncelSon[kategori] = skor

    setBestScores(guncelBest)
    setSonSkorlar(guncelSon)

    localStorage.setItem("tytQuizBest", JSON.stringify(guncelBest))
    localStorage.setItem("tytQuizSon", JSON.stringify(guncelSon))

    setDurum("sonuc")
  }

  const kategoriAdi = (kat: string) => {
    const adlar: { [key: string]: string } = {
      felsefe: "🧠 Felsefe",
      din: "🕌 Din Kültürü",
      tarih: "📜 Tarih"
    }
    return adlar[kat] || kat
  }

  if (durum === "basla") {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">📚 TYT Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {Object.keys(quizVerisi).map((kat) => (
              <Button
                key={kat}
                onClick={() => kategoriSec(kat)}
                variant="outline"
                className="h-20 text-lg font-semibold dark:border-gray-600 dark:hover:bg-gray-700 justify-start"
              >
                <span className="mr-3">{kategoriAdi(kat)}</span>
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  {quizVerisi[kat].length} soru
                </span>
              </Button>
            ))}
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
            <CardTitle className="dark:text-white">{kategoriAdi(kategori)}</CardTitle>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {mevcutSoru + 1}/{sorular.length}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-lg font-medium dark:text-gray-200 mb-6">{soru.soru}</p>
            <div className="space-y-2">
              {secenekler.map((secenek, i) => (
                <Button
                  key={i}
                  onClick={() => cevapVer(secenek)}
                  variant="outline"
                  className="w-full h-14 text-left px-4 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <span className="mr-3 font-bold text-muted-foreground">{String.fromCharCode(65 + i)})</span>
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
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {kategoriAdi(kategori)}
            </p>
          </div>

          {yanlislar.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold dark:text-gray-200">Yanlış Yapılanlar:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {yanlislar.map((hata, i) => (
                  <div key={i} className="text-sm border-b dark:border-gray-700 pb-2">
                    <p className="font-medium dark:text-gray-200">{hata.soru}</p>
                    <p className="text-red-600 dark:text-red-400">Seçimin: {hata.secim}</p>
                    <p className="text-green-600 dark:text-green-400">Doğru: {hata.dogru}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setDurum("basla")} variant="outline">
              Ana Menü
            </Button>
            <Button onClick={() => kategoriSec(kategori)}>
              Tekrar Oyna
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
