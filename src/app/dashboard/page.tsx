import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  switch (session.user.role) {
    case "OGRENCI":
      redirect("/dashboard/ogrenci")
    case "OGRETMEN":
      redirect("/dashboard/ogretmen")
    case "YONETICI":
      redirect("/dashboard/yonetici")
    default:
      redirect("/login")
  }
}
