import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription>Sayfa bulunamadı</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Aradığınız sayfa mevcut değil veya erişim yetkiniz yok.
          </p>
          <Link href="/dashboard">
            <Button className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Dashboard&apos;a Dön
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
