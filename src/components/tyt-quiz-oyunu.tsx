"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Soru {
  soru: string
  secenekler: string[]
  dogru: string
}

interface QuizData {
  [key: string]: Soru[]
}

// TYT 9-10. sınıf müfredatına uygun sorular
const quizVerisi: QuizData = {
  fizik: [
    // 9. sınıf - Fizik Bilimine Giriş
    { soru: "Fizik bilimi neyi inceler?", secenekler: ["Madde ve enerji", "Sadece canlılar", "Sadece hareket", "Sadece ışık"], dogru: "Madde ve enerji" },
    { soru: "Fizikte temel ölçüler nelerdir?", secenekler: ["Uzunluk, kütle, zaman", "Sadece uzunluk", "Sadece kütle", "Sadece zaman"], dogru: "Uzunluk, kütle, zaman" },
    { soru: "Uzunluk birimi nedir?", secenekler: ["metre", "kilogram", "saniye", "santimetre"], dogru: "metre" },
    { soru: "Kütle birimi nedir?", secenekler: ["kilogram", "metre", "saniye", "gram"], dogru: "kilogram" },
    { soru: "Zaman birimi nedir?", secenekler: ["saniye", "metre", "kilogram", "dakika"], dogru: "saniye" },

    // 9. sınıf - Madde ve Özellikleri
    { soru: "Maddeyi oluşturan en küçük parçacık nedir?", secenekler: ["atom", "molekül", "elektron", "proton"], dogru: "atom" },
    { soru: "Atom çekirdeğinde neler bulunur?", secenekler: ["proton ve nötron", "sadece proton", "sadece nötron", "elektron ve nötron"], dogru: "proton ve nötron" },
    { soru: "Elektron nerede bulunur?", secenekler: ["çekirdek çevresinde", "çekirdekte", "her iki yerde", "yoktur"], dogru: "çekirdek çevresinde" },
    { soru: "Protonun yükü nedir?", secenekler: ["artı", "eksi", "nötr", "değişken"], dogru: "artı" },
    { soru: "Elektronun yükü nedir?", secenekler: ["eksi", "artı", "nötr", "değişken"], dogru: "eksi" },
    { soru: "Katı maddelerin özelliği nedir?", secenekler: ["sabit şekil ve hacim", "sadece sabit şekil", "sadece sabit hacim", "değişen şekil"], dogru: "sabit şekil ve hacim" },
    { soru: "Sıvı maddelerin özelliği nedir?", secenekler: ["değişen şekil sabit hacim", "sabit şekil", "değişen hacim", "sabit şekil ve hacim"], dogru: "değişen şekil sabit hacim" },
    { soru: "Gaz maddelerin özelliği nedir?", secenekler: ["değişen şekil ve hacim", "sabit şekil", "sabit hacim", "sabit şekil ve hacim"], dogru: "değişen şekil ve hacim" },
    { soru: "Maddelerin hal değiştirmesi nedir?", secenekler: ["katı-sıvı-gaz", "sadece katı-sıvı", "sadece sıvı-gaz", "sadece gaz-katı"], dogru: "katı-sıvı-gaz" },
    { soru: "Erime noktası nedir?", secenekler: ["katı→sıvı", "sıvı→katı", "sıvı→gaz", "gaz→sıvı"], dogru: "katı→sıvı" },
    { soru: "Kaynama noktası nedir?", secenekler: ["sıvı→gaz", "gaz→sıvı", "katı→sıvı", "sıvı→katı"], dogru: "sıvı→gaz" },
    { soru: "Yoğunluk birimi nedir?", secenekler: ["g/cm³ veya kg/m³", "cm³", "g", "kg"], dogru: "g/cm³ veya kg/m³" },
    { soru: "Yoğunluk formülü nedir?", secenekler: ["d = m/V", "d = V/m", "d = m·V", "d = m+V"], dogru: "d = m/V" },
    { soru: "Suyun yoğunluğu kaç g/cm³'dür?", secenekler: ["1", "0.5", "2", "1.5"], dogru: "1" },

    // 9. sınıf - Kuvvet ve Hareket
    { soru: "Kuvvet birimi nedir?", secenekler: ["Newton", "Joule", "Watt", "Pascal"], dogru: "Newton" },
    { soru: "Kütle birimi nedir?", secenekler: ["kilogram", "Newton", "Joule", "metre"], dogru: "kilogram" },
    { soru: "Newton'un 1. yasası nedir?", secenekler: ["Cisim durursa durur", "F = ma", "Eylem-eylem karşıtı", "Enerji korunumu"], dogru: "Cisim durursa durur" },
    { soru: "Newton'un 2. yasası nedir?", secenekler: ["F = ma", "Eylem-eylem karşıtı", "Cisim durursa durur", "Enerji korunumu"], dogru: "F = ma" },
    { soru: "Newton'un 3. yasası nedir?", secenekler: ["Eylem-eylem karşıtı", "F = ma", "Cisim durursa durur", "Enerji korunumu"], dogru: "Eylem-eylem karşıtı" },
    { soru: "Hız birimi nedir?", secenekler: ["m/s", "m", "s", "m/s²"], dogru: "m/s" },
    { soru: "İvme birimi nedir?", secenekler: ["m/s²", "m/s", "m", "s"], dogru: "m/s²" },
    { soru: "Sabit hızla giden cisimde ivme kaçtır?", secenekler: ["0", "1", "2", "değişir"], dogru: "0" },
    { soru: "Serbest düşmede ivme kaç m/s²'dir?", secenekler: ["10", "5", "15", "20"], dogru: "10" },
    { soru: "Sürtünme kuvveti hareketi nasıl etkiler?", secenekler: ["yavaşlatır", "hızlandırır", "etki etmez", "durdurur"], dogru: "yavaşlatır" },

    // 10. sınıf - Enerji
    { soru: "Enerji birimi nedir?", secenekler: ["Joule", "Newton", "Watt", "Pascal"], dogru: "Joule" },
    { soru: "Kinetik enerji formülü nedir?", secenekler: ["Ek = ½mv²", "Ek = mv", "Ek = ma", "Ek = mgh"], dogru: "Ek = ½mv²" },
    { soru: "Potansiyel enerji formülü nedir?", secenekler: ["Ep = mgh", "Ep = ½mv²", "Ep = ma", "Ep = mv"], dogru: "Ep = mgh" },
    { soru: "Mekanik enerji nedir?", secenekler: ["Ek + Ep", "Ek - Ep", "Ek/Ep", "Ek × Ep"], dogru: "Ek + Ep" },
    { soru: "Enerji korunumu yasası nedir?", secenekler: ["enerji korunur", "enerji kaybolur", "enerji artar", "enerji değişir"], dogru: "enerji korunur" },
    { soru: "Güç birimi nedir?", secenekler: ["Watt", "Joule", "Newton", "Pascal"], dogru: "Watt" },
    { soru: "Güç formülü nedir?", secenekler: ["P = W/t", "P = W×t", "P = W/t²", "P = W×t²"], dogru: "P = W/t" },
    { soru: "İş formülü nedir?", secenekler: ["W = F×d", "W = F/d", "W = F×d²", "W = F/d²"], dogru: "W = F×d" },

    // 10. sınıf - Isı ve Sıcaklık
    { soru: "Isı birimi nedir?", secenekler: ["Joule", "derece", "kalori", "Watt"], dogru: "Joule" },
    { soru: "Sıcaklık birimi nedir?", secenekler: ["derece", "Joule", "kalori", "Newton"], dogru: "derece" },
    { soru: "Isı nasıl transfer olur?", secenekler: ["sıcaktan soğuğa", "soğuktan sıcağa", "rastgele", "yön değiştirmez"], dogru: "sıcaktan soğuğa" },
    { soru: "Isı transfer yolları nelerdir?", secenekler: ["iletim, taşınım, ışınım", "sadece iletim", "sadece taşınım", "sadece ışınım"], dogru: "iletim, taşınım, ışınım" },
    { soru: "Kapalı bir sistemde enerji nasıl değişir?", secenekler: ["korunur", "artar", "azalır", "sıfıra düşer"], dogru: "korunur" },
    { soru: "Genleşme katsayısı neyi gösterir?", secenekler: ["uzama oranı", "kısalma oranı", "sıcaklık değişimi", "kütle artışı"], dogru: "uzama oranı" },
    { soru: "Katılar ısıtılırsa ne olur?", secenekler: ["genleşir", "büzülür", "değişmez", "eriyeceğine göre değişir"], dogru: "genleşir" },
    { soru: "Sıvılar ısıtılırsa ne olur?", secenekler: ["genleşir", "büzülür", "değişmez", "buharlaşır"], dogru: "genleşir" },
    { soru: "Gazlar ısıtılırsa ne olur?", secenekler: ["genleşir", "büzülür", "değişmez", "yoğunlaşır"], dogru: "genleşir" },

    // 10. sınıf - Elektrik
    { soru: "Elektrik akımı birimi nedir?", secenekler: ["Amper", "Volt", "Ohm", "Watt"], dogru: "Amper" },
    { soru: "Gerilim birimi nedir?", secenekler: ["Volt", "Amper", "Ohm", "Watt"], dogru: "Volt" },
    { soru: "Direnç birimi nedir?", secenekler: ["Ohm", "Amper", "Volt", "Watt"], dogru: "Ohm" },
    { soru: "Ohm yasası nedir?", secenekler: ["V = I×R", "V = I/R", "I = V×R", "R = V×I"], dogru: "V = I×R" },
    { soru: "Seri bağlı dirençlerde eşdeğer direnç nasıl bulunur?", secenekler: ["R = R₁ + R₂", "R = R₁×R₂", "1/R = 1/R₁ + 1/R₂", "R = R₁/R₂"], dogru: "R = R₁ + R₂" },
    { soru: "Paralel bağlı dirençlerde eşdeğer direnç nasıl bulunur?", secenekler: ["1/R = 1/R₁ + 1/R₂", "R = R₁ + R₂", "R = R₁×R₂", "R = R₁/R₂"], dogru: "1/R = 1/R₁ + 1/R₂" },
    { soru: "Elektrik gücü birimi nedir?", secenekler: ["Watt", "Joule", "Volt", "Amper"], dogru: "Watt" },
    { soru: "Elektrik enerjisi birimi nedir?", secenekler: ["Joule", "Watt", "Volt", "Amper"], dogru: "Joule" },
    { soru: "P = V×I formülü neyi hesaplar?", secenekler: ["güç", "enerji", "direnç", "akım"], dogru: "güç" },
    { soru: "E = V×I×t formülü neyi hesaplar?", secenekler: ["enerji", "güç", "direnç", "akım"], dogru: "enerji" }
  ],

  kimya: [
    // 9. sınıf - Periyodik Sistem
    { soru: "Periyodik tabloyu kim düzenlemiştir?", secenekler: ["Mendeleev", "Dalton", "Bohr", "Rutherford"], dogru: "Mendeleev" },
    { soru: "Elementler periyodik tabloda nasıl düzenlenmiştir?", secenekler: ["atom numarasına göre", "kütle numarasına göre", "elektron sayısına göre", "nötron sayısına göre"], dogru: "atom numarasına göre" },
    { soru: "Periyot neyi gösterir?", secenekler: ["elektron katman sayısı", "proton sayısı", "nötron sayısı", "değerlik elektron sayısı"], dogru: "elektron katman sayısı" },
    { soru: "Grup neyi gösterir?", secenekler: ["değerlik elektron sayısı", "proton sayısı", "nötron sayısı", "elektron katman sayısı"], dogru: "değerlik elektron sayısı" },
    { soru: "Metal olmayan elementler hangi gruptadır?", secenekler: ["7A (Halojenler)", "1A (Alkali metaller)", "2A (Toprak alkali)", "8A (Soygazlar)"], dogru: "7A (Halojenler)" },
    { soru: "Soygazlar hangi gruptadır?", secenekler: ["8A", "1A", "2A", "7A"], dogru: "8A" },
    { soru: "En aktif metal hangi gruptadır?", secenekler: ["1A", "2A", "7A", "8A"], dogru: "1A" },
    { soru: "Periyodik tabloda hangisi metal değildir?", secenekler: ["klor", "sodyum", "magnezyum", "alüminyum"], dogru: "klor" },

    // 9. sınıf - Atom ve Yapısı
    { soru: "Atomu keşfeden bilim insanı kimdir?", secenekler: ["Dalton", "Bohr", "Rutherford", "Thomson"], dogru: "Dalton" },
    { soru: "Atom numarası neyi gösterir?", secenekler: ["proton sayısı", "nötron sayısı", "elektron sayısı", "kütle numarası"], dogru: "proton sayısı" },
    { soru: "Kütle numarası neyi gösterir?", secenekler: ["proton + nötron", "sadece proton", "sadece nötron", "elektron sayısı"], dogru: "proton + nötron" },
    { soru: "Nötron sayısı nasıl bulunur?", secenekler: ["kütle numarası - atom numarası", "atom numarası - kütle numarası", "proton sayısı", "elektron sayısı"], dogru: "kütle numarası - atom numarası" },
    { soru: "İzotoplar arasındaki fark nedir?", secenekler: ["nötron sayısı", "proton sayısı", "elektron sayısı", "atom numarası"], dogru: "nötron sayısı" },
    { soru: "Elektron nerede bulunur?", secenekler: ["çekirdek çevresinde", "çekirdekte", "her iki yerde", "yoktur"], dogru: "çekirdek çevresinde" },
    { soru: "Proton nerede bulunur?", secenekler: ["çekirdekte", "çekirdek çevresinde", "yoktur", "her iki yerde"], dogru: "çekirdekte" },
    { soru: "Atomların çoğunluğu boşlukla doludur. Bu kime aittir?", secenekler: ["Rutherford", "Dalton", "Bohr", "Thomson"], dogru: "Rutherford" },
    { soru: "Elektron yörüngesi modelini kim geliştirmiştir?", secenekler: ["Bohr", "Rutherford", "Dalton", "Thomson"], dogru: "Bohr" },
    { soru: "Atomun %99'unu oluşturan parçacık hangisidir?", secenekler: ["proton ve nötron", "elektron", "sadece proton", "sadece nötron"], dogru: "proton ve nötron" },

    // 9. sınıf - Kimyasal Türler
    { soru: "Element nedir?", secenekler: ["tek cins atomdan oluşan madde", "farklı atomlardan oluşan madde", "karışım", "bileşik"], dogru: "tek cins atomdan oluşan madde" },
    { soru: "Bileşik nedir?", secenekler: ["farklı elementlerin kimyasal birleşimi", "tek cins atom", "karışım", "element"], dogru: "farklı elementlerin kimyasal birleşimi" },
    { soru: "Karışım nedir?", secenekler: ["fiziksel yollarla ayrılabilen madde", "kimyasal yollarla ayrılan madde", "element", "bileşik"], dogru: "fiziksel yollarla ayrılabilen madde" },
    { soru: "H₂O hangi madde türündedir?", secenekler: ["bileşik", "element", "karışım", "molekül"], dogru: "bileşik" },
    { soru: "Hangisi elementtür?", secenekler: ["altın", "su", "tuz", "hava"], dogru: "altın" },
    { soru: "Hangisi karışımtır?", secenekler: ["hava", "altın", "su", "tuz"], dogru: "hava" },
    { soru: "Homojen karışım nedir?", secenekler: ["hakkında aynı görünüm", "hakkında farklı görünüm", "katı-sıvı", "sıvı-gaz"], dogru: "hakkında aynı görünüm" },
    { soru: "Heterojen karışım nedir?", secenekler: ["hakkında farklı görünüm", "hakkında aynı görünüm", "sadece sıvı", "sadece gaz"], dogru: "hakkında farklı görünüm" },
    { soru: "Cola-cola hangi karışım türündedir?", secenekler: ["homojen", "heterojen", "element", "bileşik"], dogru: "homojen" },
    { soru: "Salata hangi karışım türündedir?", secenekler: ["heterojen", "homojen", "element", "bileşik"], dogru: "heterojen" },

    // 10. sınıf - Kimyasal Tepkimeler
    { soru: "Kimyasal tepkime tanımı nedir?", secenekler: ["madde değişimi", "fiziksel değişim", "hal değişimi", "yoğunluk değişimi"], dogru: "madde değişimi" },
    { soru: "A + B → C tepkimesi türü nedir?", secenekler: ["birleşme", "ayrılma", "yer değiştirme", "yanma"], dogru: "birleşme" },
    { soru: "AB → A + B tepkimesi türü nedir?", secenekler: ["ayrılma", "birleşme", "yer değiştirme", "yanma"], dogru: "ayrılma" },
    { soru: "A + BC → B + AC tepkimesi türü nedir?", secenekler: ["yer değiştirme", "birleşme", "ayrılma", "yanma"], dogru: "yer değiştirme" },
    { soru: "Ekzotermik tepkime nedir?", secenekler: ["ısı veren", "ısı alan", "ısı değiştirmeyen", "ısı yayan"], dogru: "ısı veren" },
    { soru: "Endotermik tepkime nedir?", secenekler: ["ısı alan", "ısı veren", "ısı değiştirmeyen", "ısı yayan"], dogru: "ısı alan" },
    { soru: "Katalizör ne yapar?", secenekler: ["tepkime hızını artırır", "tepkime hızını azaltır", "tepkipye girer", "tepkipye çıkar"], dogru: "tepkime hızını artırır" },
    { soru: "Yanma tepkimesi örneği nedir?", secenekler: ["odun yanması", "suyun buzuşması", "demirin paslanması", "mumun erimesi"], dogru: "odun yanması" },
    { soru: "Paslanma hangi tepkime türüdür?", secenekler: ["yavaş oksidasyon", "hızlı oksidasyon", "ekzotermik", "endotermik"], dogru: "yavaş oksidasyon" },
    { soru: "Tepkime hızı neyi artırır?", secenekler: ["sıcaklık artışı", "sıcaklık düşüşü", "basınç düşüşü", "katalizör azlığı"], dogru: "sıcaklık artışı" },

    // 10. sınıf - Asitler ve Bazlar
    { soru: "Asit tadı nasıldır?", secenekler: ["ekşi", "acı", "tuzlu", "tatlı"], dogru: "ekşi" },
    { soru: "Baz tadı nasıldır?", secenekler: ["acı kaygan", "ekşi", "tatlı", "tuzlu"], dogru: "acı kaygan" },
    { soru: "Asitler ne kadar dissociation olur?", secenekler: ["H⁺ verirler", "OH⁻ verirler", "H⁺ alırlar", "OH⁻ alırlar"], dogru: "H⁺ verirler" },
    { soru: "Bazlar ne kadar dissociation olur?", secenekler: ["OH⁻ verirler", "H⁺ verirler", "H⁺ alırlar", "OH⁻ alırlar"], dogru: "OH⁻ verirler" },
    { soru: "pH < 7 ise çözelti nedir?", secenekler: ["asidik", "bazik", "nötr", "doygun"], dogru: "asidik" },
    { soru: "pH > 7 ise çözelti nedir?", secenekler: ["bazik", "asidik", "nötr", "doygun"], dogru: "bazik" },
    { soru: "pH = 7 ise çözelti nedir?", secenekler: ["nötr", "asidik", "bazik", "doygun"], dogru: "nötr" },
    { soru: "Limon suyu pH'ı nedir?", secenekler: ["asidik", "bazik", "nötr", "doygun"], dogru: "asidik" },
    { soru: "Sabun suyu pH'ı nedir?", secenekler: ["bazik", "asidik", "nötr", "doygun"], dogru: "bazik" },
    { soru: "Saf su pH'ı nedir?", secenekler: ["nötr", "asidik", "bazik", "doygun"], dogru: "nötr" },

    // 10. sınıf - Çözeltiler
    { soru: "Çözelti nedir?", secenekler: ["çözünen + çözücü", "sadece çözünen", "sadece çözücü", "karışım"], dogru: "çözünen + çözücü" },
    { soru: "Çözünen nedir?", secenekler: ["eriyen madde", "eriten madde", "su", "tuz"], dogru: "eriyen madde" },
    { soru: "Çözücü nedir?", secenekler: ["eriten madde", "eriyen madde", "tuz", "şeker"], dogru: "eriten madde" },
    { soru: "Sulu çözeltide çözücü nedir?", secenekler: ["su", "tuz", "şeker", "asit"], dogru: "su" },
    { soru: "Konsantrasyon birimi nedir?", secenekler: ["mol/L", "L/mol", "g/L", "mL/g"], dogru: "mol/L" },
    { soru: "Yoğun çözelti nedir?", secenekler: ["çok çözünen var", "az çözünen var", "hiç çözünen yok", "sadece çözücü var"], dogru: "çok çözünen var" },
    { soru: "Seyreltik çözelti nedir?", secenekler: ["az çözünen var", "çok çözünen var", "hiç çözünen yok", "sadece çözücü var"], dogru: "az çözünen var" },
    { soru: "Doymuş çözelti nedir?", secenekler: ["çözünme limiti", "çözünme sınırı", "katı çözelti", "sıvı çözelti"], dogru: "çözünme limiti" },
    { soru: "Seyreltme ne demektir?", secenekler: ["çözücü ekleme", "çözünen ekleme", "çözücü çıkarma", "çözünen çıkarma"], dogru: "çözücü ekleme" },
    { soru: "Derişme ne demektir?", secenekler: ["yoğunlaştırma", "seyreltme", "çözünürlük", "konsantrasyon"], dogru: "yoğunlaştırma" }
  ],

  biyoloji: [
    // 9. sınıf - Canlıların Ortak Özellikleri
    { soru: "Canlıların temel özellikleri nelerdir?", secenekler: ["hücreli yapı, üreme, büyüme", "sadece üreme", "sadece büyüme", "sadece hücreli yapı"], dogru: "hücreli yapı, üreme, büyüme" },
    { soru: "Canlı olmayan özellik hangisidir?", secenekler: ["hareketsizlik", "üyreme", "büyüme", "beslenme"], dogru: "hareketsizlik" },
    { soru: "Canlı sınıflandırılmasında en büyük birim nedir?", secenekler: ["domain", "krallık", "filum", "sınıf"], dogru: "domain" },
    { soru: "İnsan sınıflandırılması nedir?", secenekler: ["animalia-chordata-mammalia-primates", "plantae-fungi-protista", "bacteria-archaea", "fungi-protista"], dogru: "animalia-chordata-mammalia-primates" },
    { soru: "Canlıların en küçük ortak özelliği nedir?", secenekler: ["hücre", "üyreme", "büyüme", "hareket"], dogru: "hücre" },

    // 9. sınıf - Canlıların Temel Bileşenleri
    { soru: "Hücreyi ilk kez kim görmüştür?", secenekler: ["Robert Hooke", "Schleiden", "Schwann", "Virchow"], dogru: "Robert Hooke" },
    { soru: "Hücre kuramına göre hangisi yanlıştır?", secenekler: ["hücreler canlıdır", "tüm canlılar hücrelidir", "canlılar tek hücreden oluşur", "hücreler hastalanabilir"], dogru: "hücreler canlıdır" },
    { soru: "Prokaryot hücre özelliği nedir?", secenekler: ["çekirdek zarı yok", "çekirdek var", "organeller var", "büyük"], dogru: "çekirdek zarı yok" },
    { soru: "Ökaryot hücre özelliği nedir?", secenekler: ["çekirdek zarı var", "çekirdek zarı yok", "organel yok", "küçük"], dogru: "çekirdek zarı var" },
    { soru: "Bakteri hangi hücre türündedir?", secenekler: ["prokaryot", "ökaryot", "hem ikisi de", "ne ikisi de"], dogru: "prokaryot" },
    { soru: "İnsan hücresi hangi türdedir?", secenekler: ["ökaryot", "prokaryot", "hem ikisi de", "ne ikisi de"], dogru: "ökaryot" },

    // 9. sınıf - Hücre Organelleri
    { soru: "Mitokondri fonksiyonu nedir?", secenekler: ["enerji üretimi", "protein sentezi", "fotosentez", "hücre bölünmesi"], dogru: "enerji üretimi" },
    { soru: "Kloroplast fonksiyonu nedir?", secenekler: ["fotosentez", "protein sentezi", "enerji üretimi", "hücre bölünmesi"], dogru: "fotosentez" },
    { soru: "Ribozom fonksiyonu nedir?", secenekler: ["protein sentezi", "enerji üretimi", "fotosentez", "hücre bölünmesi"], dogru: "protein sentezi" },
    { soru: "Hücre zarı fonksiyonu nedir?", secenekler: ["koruma ve taşıma", "enerji üretimi", "protein sentezi", "fotosentez"], dogru: "koruma ve taşıma" },
    { soru: "Sitoplazma nedir?", secenekler: ["hücre içi sıvı", "hücre zarı", "çekirdek", "organeller"], dogru: "hücre içi sıvı" },
    { soru: "Lizozom fonksiyonu nedir?", secenekler: ["sindirim", "enerji üretimi", "protein sentezi", "fotosentez"], dogru: "sindirim" },
    { soru: "Golgi cismi fonksiyonu nedir?", secenekler: ["paketleme ve salgılama", "enerji üretimi", "protein sentezi", "fotosentez"], dogru: "paketleme ve salgılama" },
    { soru: "Sentrozom fonksiyonu nedir?", secenekler: ["hücre bölünmesi", "enerji üretimi", "protein sentezi", "fotosentez"], dogru: "hücre bölünmesi" },
    { soru: "Koful fonksiyonu nedir?", secenekler: ["depolama", "enerji üretimi", "protein sentezi", "fotosentez"], dogru: "depolama" },
    { soru: "Endoplazmik retikulum fonksiyonu nedir?", secenekler: ["protein ve lipit sentezi", "enerji üretimi", "fotosentez", "hücre bölünmesi"], dogru: "protein ve lipit sentezi" },

    // 10. sınıf - Mitoz ve Eşeysiz Üreme
    { soru: "Mitoz bölünme sonucu kaç hücre oluşur?", secenekler: ["2", "4", "6", "8"], dogru: "2" },
    { soru: "Mitoz bölünme hangi hücrelerde görülür?", secenekler: ["somatik", "eşey", "her ikisi de", "hiçbiri"], dogru: "somatik" },
    { soru: "Mitoz evreleri sırası nedir?", secenekler: ["profaz-metafaz-anafaz-telofaz", "metafaz-profaz-anafaz-telofaz", "anafaz-profaz-metafaz-telofaz", "profaz-metafaz-telofaz-anafaz"], dogru: "profaz-metafaz-anafaz-telofaz" },
    { soru: "Eşeysiz üreme türleri nelerdir?", secenekler: ["bölünme, tomurcuklanma, spor", "sadece bölünme", "sadece tomurcuklanma"], dogru: "bölünme, tomurcuklanma, spor" },
    { soru: "Bakteriler nasıl eşeysiz ürer?", secenekler: ["bölünerek", "tomurcuklanarak", "sporla", "göçerek"], dogru: "bölünerek" },
    { soru: "Mayalar nasıl eşeysiz ürer?", secenekler: ["tomurcuklanarak", "bölünerek", "sporla", "göçerek"], dogru: "tomurcuklanarak" },
    { soru: "Sporlar nasıl oluşur?", secenekler: ["mitozla", "mayozla", "farksızdır", "eşeyli"], dogru: "mitozla" },
    { soru: "Eşeysiz üreme avantajı nedir?", secenekler: ["hızlı ve az enerjili", "çeşitlilik", "uyumluluk", "adaptasyon"], dogru: "hızlı ve az enerjili" },
    { soru: "Eşeysiz üreme dezavantajı nedir?", secenekler: ["çeşitlilik az", "çok enerji", "yavaş", "adaptasyon"], dogru: "çeşitlilik az" },
    { soru: "Kromozomlar hangi evrede birbirine bağlanır?", secenekler: ["metafazda", "profazda", "anafazda", "telofazda"], dogru: "metafazda" },

    // 10. sınıf - Mayoz ve Eşeyli Üreme
    { soru: "Mayoz bölünme sonucu kaç hücre oluşur?", secenekler: ["4", "2", "6", "8"], dogru: "4" },
    { soru: "Mayoz bölünme hangi hücrelerde görülür?", secenekler: ["eşey", "somatik", "her ikisi de", "hiçbiri"], dogru: "eşey" },
    { soru: "Mayoz kaç evrede gerçekleşir?", secenekler: ["2", "4", "6", "8"], dogru: "2" },
    { soru: "Mayoz I'de kromozom sayısı nasıl değişir?", secenekler: ["yarıya iner", "aynı kalır", "iki katına çıkar", "sıfıra düşer"], dogru: "yarıya iner" },
    { soru: "Mayoz II'de kromozom sayısı nasıl değişir?", secenekler: ["aynı kalır", "yarıya iner", "iki katına çıkar", "sıfıra düşer"], dogru: "aynı kalır" },
    { soru: "Çaprazlama ne zaman olur?", secenekler: ["mayoz I profazı", "mayoz II profazı", "mayoz I metafazı", "mayoz II metafazı"], dogru: "mayoz I profazı" },
    { soru: "Eşeyli üreme avantajı nedir?", secenekler: ["çeşitlilik", "hızlılık", "az enerji", "basitlik"], dogru: "çeşitlilik" },
    { soru: "Spermatogenez sonucu kaç sperm oluşur?", secenekler: ["4", "2", "1", "8"], dogru: "4" },
    { soru: "Oogenez sonucu kaç yumurta oluşur?", secenekler: ["1", "2", "4", "8"], dogru: "1" },
    { soru: "Gametogenez ne demektir?", secenekler: ["eşey hücresi oluşumu", "vücut hücresi oluşumu", "hücre ölümü", "hücre büyümesi"], dogru: "eşey hücresi oluşumu" },

    // 10. sınıf - Kalıtım
    { soru: "Genetik biliminin kurucusu kimdir?", secenekler: ["Mendel", "Darwin", "Lamarck", "Wallace"], dogru: "Mendel" },
    { soru: "Dominant gen nasıl gösterilir?", secenekler: ["büyük harf", "küçük harf", "kalın", "italik"], dogru: "büyük harf" },
    { soru: "Resesif gen nasıl gösterilir?", secenekler: ["küçük harf", "büyük harf", "kalın", "italik"], dogru: "küçük harf" },
    { soru: "Homozygot birey nedir?", secenekler: ["ayn iki gen", "farklı iki gen", "tek gen", "gen yok"], dogru: "ayn iki gen" },
    { soru: "Heterozigot birey nedir?", secenekler: ["farklı iki gen", "ayn iki gen", "tek gen", "gen yok"], dogru: "farklı iki gen" },
    { soru: "Fenotip nedir?", secenekler: ["görünüm", "genetik yapı", "kromozom sayısı", "DNA"], dogru: "görünüm" },
    { soru: "Genotip nedir?", secenekler: ["genetik yapı", "görünüm", "fenotip", "kromozom"], dogru: "genetik yapı" },
    { soru: "Renk körlüğü hangi kalıtım türüdür?", secenekler: ["seksioran", "otomal", "çokgenli", "tam dom"], dogru: "seksioran" },
    { soru: "Kan grubu hangi kalıtım türüdür?", secenekler: ["çokgenli", "seksioran", "otosomal", "tam dom"], dogru: "çokgenli" },
    { soru: "Sık dikbüyük hangi kalıtım türüdür?", secenekler: ["otomal dominant", "seksioran", "resesif", "çokgenli"], dogru: "otomal dominant" },

    // 10. sınıf - Ekosistem Ekolojisi
    { soru: "Ekosistem nedir?", secenekler: ["canlı + çevre", "sadece canlılar", "sadece çevre", "iklim"], dogru: "canlı + çevre" },
    { soru: "Besin zinciri nedir?", secenekler: ["üretici → tüketici", "tüketici → üretici", "çevresel", "rastgele"], dogru: "üretici → tüketici" },
    { soru: "Üretici nedir?", secenekler: ["fotosentetik canlı", "et yiyen", "hepçil", "ayrıştırıcı"], dogru: "fotosentetik canlı" },
    { soru: "Tüketici nedir?", secenekler: ["diğer canlılarla beslenen", "fotosentetik", "ayrıştırıcı", "üretici"], dogru: "diğer canlılarla beslenen" },
    { soru: "Ayrıştırıcı nedir?", secenekler: ["ölü organik maddeyi ayrıştıran", "fotosentetik", "tüketici", "üretici"], dogru: "ölü organik maddeyi ayrıştıran" },
    { soru: "Trofik seviye nedir?", secenekler: ["besin zinciri basamağı", "hız", "sıcaklık", "yağış"], dogru: "besin zinciri basamağı" },
    { soru: "Ekolojik piramit neyi gösterir?", secenekler: ["enerji azalır", "enerji artar", "enerji sabittir", "enerji sıfırdır"], dogru: "enerji azalır" },
    { soru: "Biyoçeşitlilik nedir?", secenekler: ["canlı çeşitliliği", "hava durumu", "iklim", "toprak"], dogru: "canlı çeşitliliği" },
    { soru: "Kararlılık nedir?", secenekler: ["denge", "değişim", "bozulma", "artış"], dogru: "denge" },
    { soru: "Popülasyon nedir?", secenekler: ["ayn tür bireyler topluluğu", "farklı türler", "canlılar", "çevre"], dogru: "ayn tür bireyler topluluğu" }
  ],

  turkce: [
    // 9. sınıf - Sözcükte Anlam
    { soru: "Sözcükte anlam nedir?", secenekler: ["kelimenin taşıdığı kavram", "sadece yazılış", "sadece okunuş", "sadece hece sayısı"], dogru: "kelimenin taşıdığı kavram" },
    { soru: "Kavramsal anlam nedir?", secenekler: ["kelimenin genel anlamı", "kelimenin özel anlamı", "yanlam anlamı", "mecaz anlam"], dogru: "kelimenin genel anlamı" },
    { soru: "Yanlam anlam nedir?", secenekler: ["kelimenin özel anlamı", "kelimenin genel anlamı", "kavramsal anlam", "mecaz anlam"], dogru: "kelimenin özel anlamı" },
    { soru: "Mecaz anlam nedir?", secenekler: ["gerçek anlam dışı", "gerçek anlam", "genel anlam", "özel anlam"], dogru: "gerçek anlam dışı" },
    { soru: "Terim anlamı nedir?", secenekler: ["bilim alanında kullanılan", "günlük dilde kullanılan", "mecaz anlamı", "yanlam anlamı"], dogru: "bilim alanında kullanılan" },
    { soru: "'Köpek' kelimesinin kavramsal anlamı nedir?", secenekler: ["evcil hayvan", "bir hayvan ismi", "insan", "eşya"], dogru: "evcil hayvan" },
    { soru: "Eş anlamlı kelimeler hangileridir?", secenekler: ["güzel-hoş", "güzel-çirkin", "uzun-kısa", "büyük-küçük"], dogru: "güzel-hoş" },
    { soru: "Karşıt anlamlı kelimeler hangileridir?", secenekler: ["güzel-çirkin", "güzel-hoş", "uzun-uzun", "büyük-büyük"], dogru: "güzel-çirkin" },
    { soru: "Tam anlamlı kelimeler hangileridir?", secenekler: ["öğretmen-hoca", "öğretmen-doktor", "öğretmen-mühendis", "öğretmen-hemşire"], dogru: "öğretmen-hoca" },
    { soru: "Somut kavram hangisidir?", secenekler: ["masa", "sevgi", "adalet", "güzellik"], dogru: "masa" },

    // 9. sınıf - Cümlede Anlam
    { soru: "Cümlede anlamı belirleyen unsurlar nelerdir?", secenekler: ["sözcükler ve yapı", "sadece sözcükler", "sadece yapı", "sadece noktalama"], dogru: "sözcükler ve yapı" },
    { soru: "Vurgu anlamı nasıl etkiler?", secenekler: ["ses tonlaması", "sözcük sayısı", "noktalama", "yazım"], dogru: "ses tonlaması" },
    { soru: "'Ali okula gitti' cümlesinin anlamı nedir?", secenekler: ["olay", "durum", "süreç", "kıyaslama"], dogru: "olay" },
    { soru: "'Ali okulda' cümlesinin anlamı nedir?", secenekler: ["durum", "olay", "süreç", "kıyaslama"], dogru: "durum" },
    { soru: "Bağlam nedir?", secenekler: ["cümlelerin geçtiği ortam", "sözcük anlamı", "yazım kuralları", "noktalama"], dogru: "cümlelerin geçtiği ortam" },
    { soru: "Anlamca bozukluk nedir?", secenekler: ["anlam belirsizliği", "yazım hatası", "noktalama hatası", "sözcük hatası"], dogru: "anlam belirsizliği" },
    { soru: "Yapısal bozukluk nedir?", secenekler: ["yüklemesiz cümle", "anlam belirsizliği", "noktalama hatası", "yazım hatası"], dogru: "yüklemesiz cümle" },
    { soru: "Mantık hatası nedir?", secenekler: ["zıt anlamlı kelimeler", "anlamlı kelimeler", "eş anlamlı kelimeler", "sözcük eksikliği"], dogru: "zıt anlamlı kelimeler" },
    { soru: "İçerik bozukluğu nedir?", secenekler: ["konu dışı kelime", "yazım hatası", "noktalama hatası", "anlam belirsizliği"], dogru: "konu dışı kelime" },
    { soru: "Anlatım bozukluklarından hangisi yanlıştır?", secenekler: ["anlamca doğru", "yapısal hata", "mantık hatası", "içerik hatası"], dogru: "anlamca doğru" },

    // 9. sınıf - Paragrafta Anlam
    { soru: "Paragraf nedir?", secenekler: ["cümleler topluluğu", "sadece tek cümle", "sözcükler topluluğu", "harfler topluluğu"], dogru: "cümleler topluluğu" },
    { soru: "Paragrafın ana fikri nerede bulunur?", secenekler: ["genelde ilk cümle", "son cümle", "orta cümle", "herhangi bir yerde"], dogru: "genelde ilk cümle" },
    { soru: "Açıklama paragrafı özelliği nedir?", secenekler: ["bilgi verir", "olay anlatır", "betimler", "örnek verir"], dogru: "bilgi verir" },
    { soru: "Öyküleme paragrafı özelliği nedir?", secenekler: ["olay anlatır", "bilgi verir", "betimler", "tanımlar"], dogru: "olay anlatır" },
    { soru: "Betimleme paragrafı özelliği nedir?", secenekler: ["görsel özellikler verir", "bilgi verir", "olay anlatır", "örnek verir"], dogru: "görsel özellikler verir" },
    { soru: "Örnekleme paragrafı özelliği nedir?", secenekler: ["örnek verir", "bilgi verir", "olay anlatır", "betimler"], dogru: "örnek verir" },
    { soru: "Karşılaştırma paragrafı özelliği nedir?", secenekler: ["benzerlik/farklılık gösterir", "bilgi verir", "olay anlatır", "betimler"], dogru: "benzerlik/farklılık gösterir" },
    { soru: "Paragraf türlerinden hangisi yanlıştır?", secenekler: ["hikaye", "açıklama", "öyküleme", "tanımlama"], dogru: "hikaye" },
    { soru: "Ana fikir ile yardımcı fikir arasındaki ilişki nedir?", secenekler: ["ana fikri destekler", "zıttır", "ilgisizdir", "aynısıdır"], dogru: "ana fikri destekler" },
    { soru: "Paragraf analizi nasıl yapılır?", secenekler: ["tüm cümleleri okuyarak", "sadece ilk cümleyi okuyarak", "sadece son cümleyi okuyarak", "sadece orta cümleyi okuyarak"], dogru: "tüm cümleleri okuyarak" },

    // 10. sınıf - Ses Olayları
    { soru: "Düşünce birimi nedir?", secenekler: ["ses", "hece", "harf", "kelime"], dogru: "ses" },
    { soru: "Türkçede kaç ses vardır?", secenekler: ["8", "6", "10", "12"], dogru: "8" },
    { soru: "Ses düşmesi nedir?", secenekler: ["sesin düşmesi", "sesin artması", "sesin değişmesi", "sesin sabit kalması"], dogru: "sesin düşmesi" },
    { soru: "Ses türemesi nedir?", secenekler: ["sesin artması", "sesin düşmesi", "sesin değişmesi", "sesin sabit kalması"], dogru: "sesin artması" },
    { soru: "Ses değişmesi nedir?", secenekler: ["sesin farklı bir sese dönüşmesi", "sesin düşmesi", "sesin artması", "sesin sabit kalması"], dogru: "sesin farklı bir sese dönüşmesi" },
    { soru: "Ses benzeşmesi nedir?", secenekler: ["seslerin birbirine benzemesi", "seslerin farklı olması", "sesin düşmesi", "sesin artması"], dogru: "seslerin birbirine benzemesi" },
    { soru: "Paranaz nedir?", secenekler: ["selerin birleşmesi", "seslerin ayrılması", "sesin düşmesi", "sesin artması"], dogru: "selerin birleşmesi" },
    { soru: "Ünlü değişmesi örneği nedir?", secenekler: ["köpek → köpek", "su → suyu", "kitap → kitabı", "elma → elması"], dogru: "köpek → köpek" },
    { soru: "Ünsüz değişmesi örneği nedir?", secenekler: ["kıt → kip", "su → suyu", "kitap → kitabı", "elma → elması"], dogru: "kıt → kip" },
    { soru: "Düşme olayı örneği nedir?", secenekler: ["gitmek → gitmek", "su → suyu", "kitap → kitabı", "elma → elması"], dogru: "gitmek → gitmek" },

    // 10. sınıf - Yazım Kuralları
    { soru: "Büyük harfle başlanan kelimelerden hangisi yanlıştır?", secenekler: ["bayram", "Türkiye", "İstanbul", "Kuran"], dogru: "bayram" },
    { soru: "Değişik yazılan kelimelerden hangisi doğrudur?", secenekler: ["tr", "nr", "dr", "km"], dogru: "dr" },
    { soru: "Birleşik kelime örneği nedir?", secenekler: ["gözlemci", "göz odası", "su bardağı", "kitaplık"], dogru: "göz odası" },
    { soru: "Ayrı yazılan kelime örneği nedir?", secenekler: ["göz odası", "gözlemci", "su bardağı", "kitaplık"], dogru: "göz odası" },
    { soru: "Türkçe doğru yazılmış kelime hangisidir?", secenekler: ["herkes", "herkez", "falan", "filan"], dogru: "herkes" },
    { soru: "'yapım' kelimesinin doğru yazılışı hangisidir?", secenekler: ["yapım", "yapıym", "yapım", "yapım"], dogru: "yapım" },
    { soru: "'nasıl' kelimesinin doğru yazılışı hangisidir?", secenekler: ["nasıl", "nası", "nasıl", "nasıl"], dogru: "nasıl" },
    { soru: "'çünkü' kelimesinin doğru yazılışı hangisidir?", secenekler: ["çünkü", "çünki", "çünkü", "çünkü"], dogru: "çünkü" },
    { soru: "'tabii ki' kelimesinin doğru yazılışı hangisidir?", secenekler: ["tabii ki", "tabiki", "tabii ki", "tabii ki"], dogru: "tabii ki" },
    { soru: "'belki de' kelimesinin doğru yazılışı hangisidir?", secenekler: ["belki de", "belkide", "belki de", "belki de"], dogru: "belki de" },

    // 10. sınıf - Noktalama İşaretleri
    { soru: "Nokta nerede kullanılır?", secenekler: ["cümle sonunda", "cümle başında", "ortada", "her yerde"], dogru: "cümle sonunda" },
    { soru: "Virgül nerede kullanılır?", secenekler: ["dizi sıralaması", "cümle sonunda", "başlangıçta", "soru işareti yerine"], dogru: "dizi sıralaması" },
    { soru: "Soru işareti nerede kullanılır?", secenekler: ["soru cümlesinde", "olay cümlesinde", "ünlem cümlesinde", "emir cümlesinde"], dogru: "soru cümlesinde" },
    { soru: "Ünlem işareti nerede kullanılır?", secenekler: ["şaşkınlık cümlesinde", "soru cümlesinde", "olay cümlesinde", "emir cümlesinde"], dogru: "şaşkınlık cümlesinde" },
    { soru: "İki nokta nerede kullanılır?", secenekler: ["örnekleri sayarken", "cümle sonunda", "başlangıçta", "sorularda"], dogru: "örnekleri sayarken" },
    { soru: "Noktalı virgül nerede kullanılır?", secenekler: ["uzun cümlelerde", "kısa cümlelerde", "sorularda", "ünlem cümlelerinde"], dogru: "uzun cümlelerde" },
    { soru: "Three dots (...) nerede kullanılır?", secenekler: ["eksik belirtirken", "cümle sonunda", "cümle başında", "soru cümlesinde"], dogru: "eksik belirtirken" },
    { soru: "Parantez nerede kullanılır?", secenekler: ["açıklama eklerken", "cümle sonunda", "başlangıçta", "soru cümlesinde"], dogru: "açıklama eklerken" },
    { soru: "Tırnak işareti nerede kullanılır?", secenekler: ["özel birimi gösterirken", "cümle sonunda", "başlangıçta", "virgül yerine"], dogru: "özel birimi gösterirken" },
    { soru: "Kesme işareti (-) nerede kullanılır?", secenekler: ["kelime bölerken", "cümle sonunda", "başlangıçta", "virgül yerine"], dogru: "kelime bölerken" },

    // 10. sınıf - Sözcük Türleri
    { soru: "İsim nedir?", secenekler: ["kişi, eşya, kavram adı", "eylem", "nitelik"], dogru: "kişi, eşya, kavram adı" },
    { soru: "Fiil nedir?", secenekler: ["eylem", "kişi", "eşya", "nitelik"], dogru: "eylem" },
    { soru: "Sıfat nedir?", secenekler: ["nitelik", "eylem", "kişi", "eşya"], dogru: "nitelik" },
    { soru: "Zamir nedir?", secenekler: ["isim yerine kullanılan", "eylem", "nitelik", "eşya"], dogru: "isim yerine kullanılan" },
    { soru: "Zarf nedir?", secenekler: ["fiilin niteliği", "ismin niteliği", "sıfatın niteliği", "zamirin niteliği"], dogru: "fiilin niteliği" },
    { soru: "Edat nedir?", secenekler: ["isim/fiil ile diğer kelime arasına giren", "eylem", "nitelik", "kişi"], dogru: "isim/fiil ile diğer kelime arasına giren" },
    { soru: "Bağlaç nedir?", secenekler: ["kelimeleri/cümleleri bağlayan", "eylem", "nitelik", "kişi"], dogru: "kelimeleri/cümleleri bağlayan" },
    { soru: "Ünlem nedir?", secenekler: ["duygu belirtir", "eylem", "nitelik", "kişi"], dogru: "duygu belirtir" },
    { soru: "İyileştirme nedir?", secenekler: ["nasıllık belirtir", "duygu", "eylem", "kişi"], dogru: "nasıllık belirtir" },
    { soru: "Belirteç nedir?", secenekler: ["işaret belirtir", "duygu", "eylem", "nitelik"], dogru: "işaret belirtir" },

    // 10. sınıf - Cümle Türleri
    { soru: "Cümle çeşitleri nelerdir?", secenekler: ["yapısal ve anlamsal", "sadece yapısal", "sadece anlamsal", "sözcük sayısına göre"], dogru: "yapısal ve anlamsal" },
    { soru: "Basit cümle nedir?", secenekler: ["tek yüklemeli", "iki yüklemeli", "üç yüklemeli", "yüklemesiz"], dogru: "tek yüklemeli" },
    { soru: "Birleşik cümle nedir?", secenekler: ["iki yüklemeli", "tek yüklemeli", "üç yüklemeli", "yüklemesiz"], dogru: "iki yüklemeli" },
    { soru: "Olay cümlesi nedir?", secenekler: ["oluş ve bitişi olan", "devam eden", "durum bildiren", "süreç bildiren"], dogru: "oluş ve bitişi olan" },
    { soru: "Durum cümlesi nedir?", secenekler: ["devam eden", "oluş ve bitişi olan", "süreç bildiren", "karşılaştırma"], dogru: "devam eden" },
    { soru: "Süreç cümlesi nedir?", secenekler: ["zaman alan", "oluş ve bitişi olan", "devam eden", "durum bildiren"], dogru: "zaman alan" },
    { soru: "Türkçe cümle özelliği nedir?", secenekler: ["fiil sonda", "fiil başta", "fiil ortada", "yüklemesiz"], dogru: "fiil sonda" },
    { soru: "Emir cümlesi nedir?", secenekler: ["emir veren", "olay bildiren", "durum bildiren", "süreç bildiren"], dogru: "emir veren" },
    { soru: "Ünlem cümlesi nedir?", secenekler: ["duygu ifade eden", "emir veren", "olay bildiren", "süreç bildiren"], dogru: "duygu ifade eden" },
    { soru: "Soru cümlesi nedir?", secenekler: ["soru içeren", "duygu ifade eden", "emir veren", "olay bildiren"], dogru: "soru içeren" }
  ],

  tarih: [
    // 9. sınıf - İlk Türk Devletleri
    { soru: "İlk Türk devleti hangisidir?", secenekler: ["Hun İmparatorluğu", "Göktürk Kağanlığı", "Uygur Kağanlığı", "Hazar Kağanlığı"], dogru: "Hun İmparatorluğu" },
    { soru: "Göktürk Kağanlığı'nın kurucusu kimdir?", secenekler: ["Bumin Kağan", "İstemi Yabgu", "Kül Tigin", "Bilge Kağan"], dogru: "Bumin Kağan" },
    { soru: "Türklerin kullandığı ilk yazı nedir?", secenekler: ["Göktürk yazısı", "Uygur yazısı", "Arap yazısı", "Latince yazı"], dogru: "Göktürk yazısı" },
    { soru: "Uygur Kağanlığı'nın dini nedir?", secenekler: ["Mani din", "Budizm", "Tengricilik", "İslamiyet"], dogru: "Mani din" },
    { soru: "Hazar Kağanlığı'nın dini nedir?", secenekler: ["Tengricilik ve Musevilik", "Budizm", "Mani din", "İslamiyet"], dogru: "Tengricilik ve Musevilik" },
    { soru: "Kök Türk Kağanlığı'nın kurucusu kimdir?", secenekler: ["Bumin Kağan", "İstemi Yabgu", "Kül Tigin", "Bilge Kağan"], dogru: "Bumin Kağan" },
    { soru: "Türklerde İslamiyet'in kabul edildiği ilk devlet hangisidir?", secenekler: ["Karahanlılar", "Gazneliler", "Büyük Selçuklular", "Osmanlılar"], dogru: "Karahanlılar" },
    { soru: "İslamiyet'i kabul eden ilk Türk kavmi hangisidir?", secenekler: ["Karahanlılar", "Gazneliler", "Selçuklular", "Osmanlılar"], dogru: "Karahanlılar" },
    { soru: "Türklerin İslamiyet'i kabul etmesinde etkili olay nedir?", secenekler: ["Talas Savaşı", "Malazgirt Savaşı", "Manzikert Savaşı", "Kosova Savaşı"], dogru: "Talas Savaşı" },
    { soru: "Gazneli Devleti'nin kurucusu kimdir?", secenekler: ["Alptekin", "Sultan Mahmud", "Sabuktekin", "Mesud"], dogru: "Alptekin" },
    { soru: "Büyük Selçuklu Devleti'nin kurucusu kimdir?", secenekler: ["Tuğrul Bey", "Alp Arslan", "Melikşah", "Kılıç Arslan"], dogru: "Tuğrul Bey" },
    { soru: "Malazgirt Savaşı'nı kazanan Selçuklu sultanı kimdir?", secenekler: ["Alp Arslan", "Tuğrul Bey", "Melikşah", "Kılıç Arslan"], dogru: "Alp Arslan" },
    { soru: "Malazgirt Savaşı hangi yılda yapılmıştır?", secenekler: ["1071", "1072", "1073", "1074"], dogru: "1071" },
    { soru: "Anadolu'nun Türkleşmesini başlatan savaş hangisidir?", secenekler: ["Malazgirt", "Talas", "Kosova", "Mohaç"], dogru: "Malazgirt" },

    // 9. sınıf - Osmanlı Tarihi (Kuruluş ve Yükseliş)
    { soru: "Osmanlı Devleti'nin kurucusu kimdir?", secenekler: ["Osman Bey", "Orhan Bey", "Fatih Sultan Mehmet", "Yıldırım Bayezid"], dogru: "Osman Bey" },
    { soru: "Osmanlı Devleti'nin başkenti neresidir?", secenekler: ["Söğüt", "Bursa", "Edirne", "İstanbul"], dogru: "Söğüt" },
    { soru: "Osmanlı'nın ilk fethettiği şehir hangisidir?", secenekler: ["İznik", "Bursa", "Edirne", "İstanbul"], dogru: "İznik" },
    { soru: "Bursa'nın fethi Osmanlı'ya ne kazandırmıştır?", secenekler: ["başkentlik", "sadece şehir", "sadece ticaret", "sadece ün"], dogru: "başkentlik" },
    { soru: "Yıldırım Bayezid hangi savaşı kazandırmıştır?", secenekler: ["Niğbolu", "Varna", "Mohaç", "Rova"], dogru: "Niğbolu" },
    { soru: "Fetret devri nedir?", secenekler: ["kısım savaşları", "büyük savaşlar", "barış dönemleri", "altın dönemleri"], dogru: "kısım savaşları" },
    { soru: "Fetret devri hangi savaşla başlamıştır?", secenekler: ["Ankara Savaşı", "Varna Savaşı", "Niğbolu Savaşı", "Mohaç Savaşı"], dogru: "Ankara Savaşı" },
    { soru: "Fatih Sultan Mehmet İstanbul'u kaç yaşında fethetmiştir?", secenekler: ["21", "19", "20", "22"], dogru: "21" },
    { soru: "İstanbul'un fethi hangi yılda yapılmıştır?", secenekler: ["1453", "1451", "1455", "1459"], dogru: "1453" },
    { soru: "İstanbul'un fethiyle Osmanlı'ya ne olmuştur?", secenekler: ["başkentlik", "sadece şehir", "sadece ün", "sadece ticaret"], dogru: "başkentlik" },

    // 10. sınıf - Kurtuluş Savaşı
    { soru: "Kurtuluş Savaşı hangi yılda başlamıştır?", secenekler: ["1919", "1918", "1920", "1921"], dogru: "1919" },
    { soru: "Mustafa Kemal Samsun'a ne zaman çıkmıştır?", secenekler: ["19 Mayıs 1919", "23 Nisan 1920", "29 Ekim 1923", "30 Ağustos 1922"], dogru: "19 Mayıs 1919" },
    { soru: "Erzurum Kongresi ne zaman yapılmıştır?", secenekler: ["1919", "1920", "1921", "1922"], dogru: "1919" },
    { soru: "Amasya Genelgesi ne zaman ilan edilmiştir?", secenekler: ["1919", "1920", "1921", "1922"], dogru: "1919" },
    { soru: "Misak-ı Milli ne zaman kabul edilmiştir?", secenekler: ["1920", "1919", "1921", "1922"], dogru: "1920" },
    { soru: "TBMM ne zaman açılmıştır?", secenekler: ["23 Nisan 1920", "19 Mayıs 1919", "29 Ekim 1923", "30 Ağustos 1922"], dogru: "23 Nisan 1920" },
    { soru: "Sakarya Meydan Muharebesi ne zaman yapılmıştır?", secenekler: ["1921", "1920", "1922", "1923"], dogru: "1921" },
    { soru: "Büyük Taarruz ne zaman başlamıştır?", secenekler: ["1922", "1921", "1920", "1923"], dogru: "1922" },
    { soru: "Türkiye Cumhuriyeti ne zaman ilan edilmiştir?", secenekler: ["1923", "1922", "1921", "1920"], dogru: "1923" },
    { soru: "Cumhuriyetin ilanı kime göre yapılmıştır?", secenekler: ["halkın iradesi", "padişah", "yabancı devletler", "askeri kuvvet"], dogru: "halkın iradesi" },

    // 10. sınıf - Atatürk İlkeleri
    { soru: "Atatürk ilkeleri hangi yılda kabul edilmiştir?", secenekler: ["1931", "1923", "1924", "1925"], dogru: "1931" },
    { soru: "İlkeler kaça tanınmıştır?", secenekler: ["6", "4", "5", "7"], dogru: "6" },
    { soru: "Cumhuriyetçilik ilkesi neyi ifade eder?", secenekler: ["ülkenin yönetim biçimi", "halkın egemenliği", "milli birlik", "devlet kontrolü"], dogru: "ülkenin yönetim biçimi" },
    { soru: "Milliyetçilik ilkesi neyi ifade eder?", secenekler: ["milli birlik", "halkın egemenliği", "devlet kontrolü", "ülkenin yönetimi"], dogru: "milli birlik" },
    { soru: "Halkçılık ilkesi neyi ifade eder?", secenekler: ["halkın egemenliği", "milli birlik", "devlet kontrolü", "ülkenin yönetimi"], dogru: "halkın egemenliği" },
    { soru: "Devletçilik ilkesi neyi ifade eder?", secenekler: ["devlet kontrolü", "milli birlik", "halkın egemenliği", "ülkenin yönetimi"], dogru: "devlet kontrolü" },
    { soru: "İnkılapçılık ilkesi neyi ifade eder?", secenekler: ["yenilikçi olmak", "korumaçı olmak", "dindar olmak", "geleneksel olmak"], dogru: "yenilikçi olmak" },
    { soru: "Laiklik ilkesi neyi ifade eder?", secenekler: ["din-devlet ayrımı", "din-devlet birliği", "devlet dini yönetir", "din devletten bağımsız"], dogru: "din-devlet ayrımı" },
    { soru: "İnkılap yasalarından hangisi ilk kabul edilmiştir?", secenekler: ["Teşrik-i Mesuliyet", "Şapka Kanunu", "Harf Devrimi", "Medeni Kanun"], dogru: "Teşrik-i Mesuliyet" },
    { soru: "Nutuk'u okumu hangi yılda yapılmıştır?", secenekler: ["1927", "1924", "1925", "1926"], dogru: "1927" }
  ]
}

type Durum = "basla" | "oyun" | "sonuc"

export function TYTQuiz() {
  const [durum, setDurum] = useState<Durum>("basla")
  const [secilenDersler, setSecilenDersler] = useState<string[]>([])
  const [kategori, setKategori] = useState<string>("")
  const [soru, setSoru] = useState<Soru | null>(null)
  const [sorular, setSorular] = useState<Soru[]>([])
  const [mevcutSoru, setMevcutSoru] = useState(0)
  const [soruSayisi, setSoruSayisi] = useState<number>(10)
  const [dogruCevaplar, setDogruCevaplar] = useState(0)
  const [yanlislar, setYanlislar] = useState<Array<{ soru: string; dogru: string; secim: string }>>([])

  useEffect(() => {
    const savedProgress = localStorage.getItem("tytQuizProgress")
    if (savedProgress) {
      const { secilenDersler: dersler, soruSayisi: sayi } = JSON.parse(savedProgress)
      setSecilenDersler(dersler)
      setSoruSayisi(sayi)
    }
  }, [])

  const ilerlemeKaydet = () => {
    localStorage.setItem("tytQuizProgress", JSON.stringify({
      secilenDersler,
      soruSayisi
    }))
  }

  const dersSec = (ders: string) => {
    if (secilenDersler.includes(ders)) {
      setSecilenDersler(prev => prev.filter(d => d !== ders))
    } else {
      setSecilenDersler(prev => [...prev, ders])
    }
    ilerlemeKaydet()
  }

  const soruSayisiSec = (sayi: number) => {
    setSoruSayisi(sayi)
    ilerlemeKaydet()
  }

  const basla = () => {
    if (secilenDersler.length === 0) return

    // Tüm seçili derslerin sorularını birleştir
    const tumSorular: Soru[] = []
    secilenDersler.forEach(ders => {
      tumSorular.push(...quizVerisi[ders])
    })

    // Soruları karıştır ve seçilen sayı kadar al
    const karistirilmis = tumSorular.sort(() => Math.random() - 0.5).slice(0, soruSayisi)

    if (karistirilmis.length === 0) {
      // Yeterli soru yoksa, mevcut soruların hepsini al
      const tekrarliSorular: Soru[] = []
      let i = 0
      while (tekrarliSorular.length < soruSayisi && i < soruSayisi * 2) {
        tekrarliSorular.push(...tumSorular)
        i++
      }
      setSorular(tekrarliSorular.sort(() => Math.random() - 0.5).slice(0, soruSayisi))
    } else {
      setSorular(karistirilmis)
    }

    setMevcutSoru(0)
    setDogruCevaplar(0)
    setYanlislar([])
    setSoru(sorular[0])
    setDurum("oyun")
  }

  const cevapVer = (secim: string) => {
    if (!soru) return

    if (secim === soru.dogru) {
      setDogruCevaplar(prev => prev + 1)
    } else {
      setYanlislar(prev => [...prev, { soru: soru.soru, dogru: soru.dogru, secim }])
    }

    const sonrakiSoru = mevcutSoru + 1
    if (sonrakiSoru < sorular.length) {
      setMevcutSoru(sonrakiSoru)
      setSoru(sorular[sonrakiSoru])
    } else {
      bitir()
    }
  }

  const bitir = () => {
    // Best score kaydet
    const derslerKey = secilenDersler.sort().join('+')
    const skor = dogruCevaplar * 10
    const savedBest = localStorage.getItem('tytQuizBest')
    const bestScores = savedBest ? JSON.parse(savedBest) : {}

    if (!bestScores[derslerKey] || skor > bestScores[derslerKey]) {
      bestScores[derslerKey] = skor
      localStorage.setItem('tytQuizBest', JSON.stringify(bestScores))
    }

    // Son skor kaydet
    const savedLast = localStorage.getItem('tytQuizSon')
    const sonScores = savedLast ? JSON.parse(savedLast) : {}
    sonScores[derslerKey] = skor
    localStorage.setItem('tytQuizSon', JSON.stringify(sonScores))

    setDurum("sonuc")
  }

  const kategoriAdi = (kat: string) => {
    const adlar: { [key: string]: string } = {
      fizik: "⚛️ Fizik",
      kimya: "🧪 Kimya",
      biyoloji: "🧬 Biyoloji",
      turkce: "📖 Türkçe",
      tarih: "📜 Tarih"
    }
    return adlar[kat] || kat
  }

  if (durum === "basla") {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">🎓 TYT Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ders Seçimi */}
          <div>
            <p className="text-sm font-medium dark:text-gray-200 mb-3">Ders Seç:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.keys(quizVerisi).map((ders) => (
                <Button
                  key={ders}
                  onClick={() => dersSec(ders)}
                  variant={secilenDersler.includes(ders) ? "default" : "outline"}
                  className="h-12 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {kategoriAdi(ders)}
                </Button>
              ))}
            </div>
          </div>

          {/* Soru Sayısı Seçimi */}
          <div>
            <p className="text-sm font-medium dark:text-gray-200 mb-3">Soru Sayısı:</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[5, 10, 15, 20, 25, 30].map((sayi) => (
                <Button
                  key={sayi}
                  onClick={() => soruSayisiSec(sayi)}
                  variant={soruSayisi === sayi ? "default" : "outline"}
                  className="h-10 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {sayi}
                </Button>
              ))}
            </div>
          </div>

          {/* Başla Butonu */}
          <Button
            onClick={basla}
            disabled={secilenDersler.length === 0}
            className="w-full"
            size="lg"
          >
            Quiz Başla
          </Button>

          {/* Best Score Gösterimi */}
          <div className="text-xs text-muted-foreground dark:text-gray-400 text-center">
            Seçtiğin derslere göre quiz yapacaksın. Best score otomatik kaydedilir.
          </div>
        </CardContent>
      </Card>
    )
  }

  if (durum === "oyun" && soru) {
    const secenekler = [...soru.secenekler].sort(() => Math.random() - 0.5)

    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="dark:text-white text-lg">Soru {mevcutSoru + 1}/{sorular.length}</CardTitle>
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">
              {dogruCevaplar * 10} Puan
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center py-4">
            <p className="text-base font-medium dark:text-gray-200 mb-4">{soru.soru}</p>
            <div className="grid grid-cols-1 gap-2">
              {secenekler.map((secenek, i) => (
                <Button
                  key={i}
                  onClick={() => cevapVer(secenek)}
                  variant="outline"
                  className="w-full h-12 text-left px-4 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <span className="mr-2 font-bold text-muted-foreground text-xs">{String.fromCharCode(65 + i)})</span>
                  {secenek}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (durum === "sonuc") {
    const derslerKey = secilenDersler.sort().join('+')
    const savedBest = localStorage.getItem('tytQuizBest')
    const bestScores = savedBest ? JSON.parse(savedBest) : {}
    const savedLast = localStorage.getItem('tytQuizSon')
    const sonScores = savedLast ? JSON.parse(savedLast) : {}
    const skor = dogruCevaplar * 10

    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">🎉 Quiz Bitti!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{skor} Puan</p>
            <p className="text-muted-foreground dark:text-gray-400">
              {dogruCevaplar} doğru • {yanlislar.length} yanlış
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                <p className="text-yellow-800 dark:text-yellow-400 font-semibold">En İyi</p>
                <p className="text-yellow-900 dark:text-yellow-300">{bestScores[derslerKey] || 0}</p>
              </div>
              <div className="text-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                <p className="text-blue-800 dark:text-blue-400 font-semibold">Son</p>
                <p className="text-blue-900 dark:text-blue-300">{sonScores[derslerKey] || 0}</p>
              </div>
            </div>
          </div>

          {yanlislar.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold dark:text-gray-200 text-sm">Yanlış Yapılanlar:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {yanlislar.map((hata, i) => (
                  <div key={i} className="text-xs border-b dark:border-gray-700 pb-2">
                    <p className="font-medium dark:text-gray-200">{hata.soru}</p>
                    <p className="text-red-600 dark:text-red-400">Seçimin: {hata.secim}</p>
                    <p className="text-green-600 dark:text-green-400">Doğru: {hata.dogru}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setDurum("basla")} variant="outline" size="sm">
              Ana Menü
            </Button>
            <Button onClick={() => basla()} size="sm">
              Tekrar Oyna
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
