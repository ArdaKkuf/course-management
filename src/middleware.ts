import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  // Public routes
  const publicRoutes = ["/login", "/register", "/api/auth"]
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return NextResponse.next()
  }

  // Protected routes - require auth
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Role-based access control
  if (pathname.startsWith("/dashboard/ogrenci") && userRole !== "OGRENCI" && userRole !== "YONETICI") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  if (pathname.startsWith("/dashboard/ogretmen") && userRole !== "OGRETMEN" && userRole !== "YONETICI") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  if (pathname.startsWith("/dashboard/yonetici") && userRole !== "YONETICI") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
