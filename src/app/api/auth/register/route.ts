import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role, sinif, sube, brans } = body

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email ile kayıtlı bir kullanıcı zaten var" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as Role
      }
    })

    // Create role-specific profile
    if (role === "OGRENCI") {
      await prisma.ogrenci.create({
        data: {
          userId: user.id,
          sinif,
          sube
        }
      })
    } else if (role === "OGRETMEN") {
      await prisma.ogretmen.create({
        data: {
          userId: user.id,
          brans
        }
      })
    }

    return NextResponse.json(
      { message: "Kayıt başarılı", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { error: "Kayıt sırasında bir hata oluştu" },
      { status: 500 }
    )
  }
}
