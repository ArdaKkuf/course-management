const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data in proper order (due to foreign key constraints)
  try { await prisma.yoklama.deleteMany() } catch {}
  try { await prisma.etutRandevu.deleteMany() } catch {}
  try { await prisma.odev.deleteMany() } catch {}
  try { await prisma.musaatlik.deleteMany() } catch {}
  try { await prisma.dersProgrami.deleteMany() } catch {}
  try { await prisma.ogrenci.deleteMany() } catch {}
  try { await prisma.ogretmen.deleteMany() } catch {}
  try { await prisma.user.deleteMany() } catch {}

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10)
  const hocaPassword = await bcrypt.hash('hoca123', 10)
  const ogrenciPassword = await bcrypt.hash('ogrenci123', 10)

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@dershane.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'YONETICI'
    }
  })
  console.log('✅ Created admin:', admin.email)

  // Create Teachers
  const ogretmenler = [
    { email: 'hoca@dershane.com', name: 'Ahmet Yılmaz', brans: 'Matematik', password: hocaPassword },
    { email: 'ayse@dershane.com', name: 'Ayşe Demir', brans: 'Fizik', password: hocaPassword },
    { email: 'mehmet@dershane.com', name: 'Mehmet Kaya', brans: 'Kimya', password: hocaPassword },
    { email: 'fatma@dershane.com', name: 'Fatma Şahin', brans: 'Biyoloji', password: hocaPassword },
    { email: 'ali@dershane.com', name: 'Ali Çelik', brans: 'Türkçe', password: hocaPassword },
  ]

  const createdOgretmenler = []
  for (const ogretmen of ogretmenler) {
    const user = await prisma.user.create({
      data: {
        email: ogretmen.email,
        password: ogretmen.password,
        name: ogretmen.name,
        role: 'OGRETMEN'
      }
    })
    const profil = await prisma.ogretmen.create({
      data: {
        userId: user.id,
        brans: ogretmen.brans,
        telefon: '555-1234'
      }
    })
    createdOgretmenler.push({ user, profil })
    console.log('✅ Created teacher:', ogretmen.name)
  }

  // Create Students
  const siniflar = ['9', '10', '11', '12']
  const subeler = ['A', 'B', 'C']

  for (const sinif of siniflar) {
    for (const sube of subeler) {
      for (let i = 1; i <= 5; i++) {
        const email = `ogrenci-${sinif}${sube}-${i}@dershane.com`
        const name = `Öğrenci ${sinif}${sube}-${i}`
        const user = await prisma.user.create({
          data: {
            email,
            password: ogrenciPassword,
            name,
            role: 'OGRENCI'
          }
        })
        await prisma.ogrenci.create({
          data: {
            userId: user.id,
            sinif,
            sube,
            veliAdi: `Veli ${i}`,
            veliTelefon: '555-5678'
          }
        })
        console.log('✅ Created student:', name)
      }
    }
  }

  // Create Schedule (Ders Programı)
  const gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']
  const saatler = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

  for (const gun of gunler) {
    for (const saat of saatler) {
      const ogretmen = createdOgretmenler[Math.floor(Math.random() * createdOgretmenler.length)]
      const sinif = siniflar[Math.floor(Math.random() * siniflar.length)]

      await prisma.dersProgrami.create({
        data: {
          gun,
          saat,
          dersAdi: ogretmen.profil.brans,
          sinif: `${sinif}. Sınıf`,
          ogretmenId: ogretmen.profil.id
        }
      })
    }
  }
  console.log('✅ Created schedule')

  // Create Teacher Availability (Müsaitlik)
  for (const ogretmen of createdOgretmenler) {
    for (const gun of gunler) {
      for (const saat of saatler) {
        if (Math.random() > 0.3) {
          await prisma.musaatlik.create({
            data: {
              ogretmenId: ogretmen.profil.id,
              gun,
              saat,
              musait: true
            }
          })
        }
      }
    }
  }
  console.log('✅ Created teacher availability')

  // Create sample assignments (Ödevler)
  const sampleOdevler = [
    { baslik: 'Matematik Problemleri', aciklama: 'Sayfa 45-48 arası soruları çözünüz', sinif: '9' },
    { baslik: 'Fizik Laboratuvar Raporu', aciklama: 'Deney sonuçlarını raporlayınız', sinif: '10' },
    { baslik: 'Kimya Formülleri', aciklama: 'Periyodik tabloyu ezberleyiniz', sinif: '11' },
    { baslik: 'Biyoloji Projesi', aciklama: 'Hücre yapısı hakkında sunum hazırlayınız', sinif: '12' },
  ]

  for (const odev of sampleOdevler) {
    const relevantOgretmen = createdOgretmenler.find(o =>
      odev.baslik.toLowerCase().includes(o.profil.brans.toLowerCase())
    ) || createdOgretmenler[0]

    await prisma.odev.create({
      data: {
        baslik: odev.baslik,
        aciklama: odev.aciklama,
        sinif: odev.sinif,
        sonTarih: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ogretmenId: relevantOgretmen.profil.id
      }
    })
  }
  console.log('✅ Created sample assignments')

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
