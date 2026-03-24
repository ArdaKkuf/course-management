"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <CardTitle>Bir Hata Oluştu</CardTitle>
          </div>
          <CardDescription>
            Üzgünüz, bir sorun oluştu. Lütfen tekrar deneyin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={reset} className="w-full">
            Tekrar Dene
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
