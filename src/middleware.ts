import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public routes - always accessible
  const publicRoutes = ["/login", "/register", "/api/auth", "/_next", "/favicon"]
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For demo purposes, allow all routes
  // In production, you'd check session here
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
