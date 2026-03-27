"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TYTQuiz } from "@/components/tyt-quiz-oyunu"
import { YazimYanlisOyunu } from "@/components/yazim-yanlis-oyunu"
import { useState } from "react"

type QuizType = "fizik" | "kimya" | "biyoloji" | "matematik" | "turkce" | "tarih" | "felsefe" | "din" | "yazim" | null

export default function OyunlarPage() {
  const [secilenQuiz, setSecilenQuiz] = useState<QuizType>(null)

  if (secilenQuiz === "yazim") {
    return (
      <div className="space-y-4">
        <Button onClick={() => setSecilenQuiz(null)} variant="outline">
          ← Geri
        </Button>
        <YazimYanlisOyunu />
      </div>
    )
  }

  if (secilenQuiz) {
    return (
      <div className="space-y-4">
        <Button onClick={() => setSecilenQuiz(null)} variant="outline">
          ← Geri
        </Button>
        <TYTQuiz baslangicDers={secilenQuiz} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Eğitici Oyunlar</h1>
        <p className="text-muted-foreground dark:text-gray-400">Derslerini eğlenerek pekiştir!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("fizik")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">⚛️ Fizik Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              6 konu, 50+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("kimya")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">🧪 Kimya Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              6 konu, 50+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("biyoloji")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">🧬 Biyoloji Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              5 konu, 50+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("matematik")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">📐 Matematik Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              12 konu, 120+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("turkce")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">📖 Türkçe Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              7 konu, 50+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("tarih")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">📜 Tarih Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              6 konu, 45+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("felsefe")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">🧠 Felsefe Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              5 konu, 50+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          onClick={() => setSecilenQuiz("din")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">🕌 Din Kültürü Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              4 konu, 30+ soru
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-lg transition-all cursor-pointer dark:bg-gray-800 dark:border-gray-700 md:col-span-2 lg:col-span-1"
          onClick={() => setSecilenQuiz("yazim")}
        >
          <CardHeader>
            <CardTitle className="dark:text-white text-xl">✏️ Yazım Yanlışı Oyunu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              100+ kelime, 1 dakika
            </p>
            <Button className="w-full mt-3" variant="outline">
              Başla
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
