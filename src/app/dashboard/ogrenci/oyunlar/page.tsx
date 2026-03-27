import { YazimYanlisOyunu } from "@/components/yazim-yanlis-oyunu"
import { TYTQuiz } from "@/components/tyt-quiz-oyunu"

export default function OyunlarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Eğitici Oyunlar</h1>
        <p className="text-muted-foreground dark:text-gray-400">Derslerini eğlenerek pekiştir!</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="max-w-2xl mx-auto w-full">
          <TYTQuiz />
        </div>
        <div className="max-w-2xl mx-auto w-full">
          <YazimYanlisOyunu />
        </div>
      </div>
    </div>
  )
}
