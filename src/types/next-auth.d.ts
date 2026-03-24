import { DefaultSession, DefaultUser } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: Role
      ogrenciId?: string
      ogretmenId?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: Role
    ogrenciId?: string
    ogretmenId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
    ogrenciId?: string
    ogretmenId?: string
  }
}
