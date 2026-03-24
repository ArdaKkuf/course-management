-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ogrenci" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sinif" TEXT NOT NULL,
    "sube" TEXT NOT NULL,
    "veliAdi" TEXT,
    "veliTelefon" TEXT,
    CONSTRAINT "Ogrenci_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ogretmen" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "brans" TEXT NOT NULL,
    "telefon" TEXT,
    CONSTRAINT "Ogretmen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DersProgrami" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gun" TEXT NOT NULL,
    "saat" TEXT NOT NULL,
    "dersAdi" TEXT NOT NULL,
    "sinif" TEXT NOT NULL,
    "ogretmenId" TEXT NOT NULL,
    CONSTRAINT "DersProgrami_ogretmenId_fkey" FOREIGN KEY ("ogretmenId") REFERENCES "Ogretmen" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Musaatlik" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ogretmenId" TEXT NOT NULL,
    "gun" TEXT NOT NULL,
    "saat" TEXT NOT NULL,
    "musait" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Musaatlik_ogretmenId_fkey" FOREIGN KEY ("ogretmenId") REFERENCES "Ogretmen" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EtutRandevu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ogrenciId" TEXT NOT NULL,
    "ogretmenId" TEXT NOT NULL,
    "tarih" DATETIME NOT NULL,
    "konu" TEXT NOT NULL,
    "durum" TEXT NOT NULL DEFAULT 'bekliyor',
    "olusturulma" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EtutRandevu_ogrenciId_fkey" FOREIGN KEY ("ogrenciId") REFERENCES "Ogrenci" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Odev" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "baslik" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "sinif" TEXT NOT NULL,
    "sonTarih" DATETIME NOT NULL,
    "ogretmenId" TEXT NOT NULL,
    "ogrenciId" TEXT,
    "olusturulma" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Odev_ogretmenId_fkey" FOREIGN KEY ("ogretmenId") REFERENCES "Ogretmen" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Odev_ogrenciId_fkey" FOREIGN KEY ("ogrenciId") REFERENCES "Ogrenci" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Yoklama" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ogrenciId" TEXT NOT NULL,
    "dersId" TEXT NOT NULL,
    "tarih" DATETIME NOT NULL,
    "durum" TEXT NOT NULL,
    CONSTRAINT "Yoklama_ogrenciId_fkey" FOREIGN KEY ("ogrenciId") REFERENCES "Ogrenci" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ogrenci_userId_key" ON "Ogrenci"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ogretmen_userId_key" ON "Ogretmen"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Musaatlik_ogretmenId_gun_saat_key" ON "Musaatlik"("ogretmenId", "gun", "saat");
