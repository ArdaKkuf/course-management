import { YazimYanlisOyunu } from "@/components/yazim-yanlis-oyunu"

export default function OyunlarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Eğitici Oyunlar</h1>
        <p className="text-muted-foreground dark:text-gray-400">Derslerini eğlenerek pekiştir!</p>
      </div>

      <div className="max-w-2xl">
        <YazimYanlisOyunu />
      </div>
    </div>
  )
}
