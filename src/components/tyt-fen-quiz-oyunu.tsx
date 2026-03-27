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

const quizVerisi: QuizData = {
  fizik: [
    // Vektörler
    { soru: "3 birim kuzey, 4 birim doğu giden iki vektörün sonuç büyüklüğü kaç birimdir?", secenekler: ["5", "6", "7", "8"], dogru: "5" },
    { soru: "Birim vektörün büyüklüğü kaçtır?", secenekler: ["0", "1", "2", "3"], dogru: "1" },
    { soru: "A = 3i + 4j vektörünün büyüklüğü kaçtır?", secenekler: ["5", "6", "7", "8"], dogru: "5" },
    { soru: "Kuzey yönünde 5 birimlik bir vektörün doğu yönündeki bileşeni kaçtır?", secenekler: ["0", "1", "2", "3"], dogru: "0" },
    { soru: "A ve B vektörlerinin sonuç vektörü C olsun. A ⊥ B ise |C|^2 = ?", secenekler: ["|A|^2 + |B|^2", "|A|^2 - |B|^2", "2|A||B|", "|A||B|"], dogru: "|A|^2 + |B|^2" },
    // Kuvvet ve Hareket
    { soru: "F = ma formülünde m hangi büyüklüktür?", secenekler: ["Kütle", "Hız", "İvme", "Güç"], dogru: "Kütle" },
    { soru: "Serbest düşmede ivme kaç m/s²'dir?", secenekler: ["9.8", "10", "8.9", "11"], dogru: "9.8" },
    { soru: "Sabit hızla hareket eden cisim için ivme kaçtır?", secenekler: ["0", "1", "2", "3"], dogru: "0" },
    { soru: "Newton'un hangi yasası eylem-eylem karşıtı yasasıdır?", secenekler: ["1. yasa", "2. yasa", "3. yasa", "4. yasa"], dogru: "3. yasa" },
    { soru: "10 N kuvvetle 2 kg kütleli cisme etki edildiğinde ivme kaç m/s²'dir?", secenekler: ["2", "4", "5", "6"], dogru: "5" },
    // İş-Güç-Enerji
    { soru: "1 Joule kaç Newton-metre'dir?", secenekler: ["1", "2", "3", "4"], dogru: "1" },
    { soru: "Enerji korumu yasası göre kapalı bir sistemde toplam enerji nasıl değişir?", secenekler: ["Artar", "Azalır", "Sabit kalır", "Sıfır olur"], dogru: "Sabit kalır" },
    { soru: "1 saatte 3600 Joule iş yapan motorun güç kaç Watt'tır?", secenekler: ["1", "10", "100", "1000"], dogru: "1" },
    { soru: "Kinetik enerji formülü nedir?", secenekler: ["E = mv", "E = ½mv²", "E = ma", "E = mgh"], dogru: "E = ½mv²" },
    { soru: "Potansiyel enerji birimi nedir?", secenekler: ["Joule", "Newton", "Watt", "Pascal"], dogru: "Joule" },
    // Madde ve Özellikleri
    { soru: "Maddeyi oluşturan en küçük parçacık nedir?", secenekler: ["Atom", "Molekül", "Elektron", "Proton"], dogru: "Atom" },
    { soru: "Katı maddelerin özelliği hangisidir?", secenekler: ["Sabit şekil ve hacim", "Değişen şekil", "Sadece sabit hacim", "Hareket edebilir"], dogru: "Sabit şekil ve hacim" },
    { soru: "Sıvı maddelerin özelliği hangisidir?", secenekler: ["Sabit şekil", "Değişen şekil sabit hacim", "Sabit hacim değişen şekil", "Hareketsiz"], dogru: "Değişen şekil sabit hacim" },
    { soru: "Gaz maddelerin özelliği hangisidir?", secenekler: ["Sabit şekil ve hacim", "Sabit hacim değişen şekil", "Değişen şekil ve hacim", "Hareketsiz"], dogru: "Değişen şekil ve hacim" },
    { soru: "Bronz hangi madde türündedir?", secenekler: ["Element", "Bileşik", "Karışım", "Molekül"], dogru: "Karışım" },
    // Isı ve Sıcaklık
    { soru: "Isı birimi nedir?", secenekler: ["Joule", "Derece", "Kalori", "Watt"], dogru: "Joule" },
    { soru: "Sıcaklık birimi nedir?", secenekler: ["Joule", "Derece", "Kalori", "Newton"], dogru: "Derece" },
    { soru: "1 kalori kaç Joule'dir?", secenekler: ["4.18", "4.18", "4.18", "4.18"], dogru: "4.18" },
    { soru: "Isı transfer yollarından hangisi doğru değildir?", secenekler: ["İletim", "Taşınım", "Yansıma", "Işınım"], dogru: "Yansıma" },
    { soru: "Karanlık madde neyi yansıtır?", secenekler: ["Tüm ışığı", "Işığı yansıtmaz", "Sadece kırmızıyı", "Sadece maviyi"], dogru: "Işığı yansıtmaz" },
    // Elektrik
    { soru: "Elektrik akımı birimi nedir?", secenekler: ["Amper", "Volt", "Ohm", "Watt"], dogru: "Amper" },
    { soru: "Ohm yasası nedir?", secenekler: ["V = IR", "V = I/R", "V = R/I", "V = I²R"], dogru: "V = IR" },
    { soru: "Direnç birimi nedir?", secenekler: ["Amper", "Volt", "Ohm", "Watt"], dogru: "Ohm" },
    { soru: "Seri bağlı iki direnç için eşdeğer direnç nasıl hesaplanır?", secenekler: ["R = R₁ + R₂", "R = R₁R₂/(R₁+R₂)", "R = R₁ - R₂", "R = R₁/R₂"], dogru: "R = R₁ + R₂" },
    { soru: "Paralel bağlı iki direnç için eşdeğer direnç nasıl hesaplanır?", secenekler: ["R = R₁ + R₂", "R = R₁R₂/(R₁+R₂)", "R = R₁ - R₂", "R = R₁²R₂"], dogru: "R = R₁R₂/(R₁+R₂)" },
    // Manyetizma
    { soru: "Manyetik alan birimi nedir?", secenekler: ["Tesla", "Weber", "Henry", "Coulomb"], dogru: "Tesla" },
    { soru: "Manyetik akı birimi nedir?", secenekler: ["Tesla", "Weber", "Henry", "Farad"], dogru: "Weber" },
    { soru: "Manyetik akı yoğunluğu nedir?", secenekler: ["Φ/A", "Φ·A", "A/Φ", "Φ²/A"], dogru: "Φ/A" },
    { soru: "Solenoidin içindeki manyetik alan nasıl artar?", secenekler: ["Akım artarsa", "Akım azalırsa", "Nötr olursa", "Değişmez"], dogru: "Akım artarsa" },
    { soru: "Earth'ın manyetik kuzey kutbu coğrafi neresine yakın?", secenekler: ["Güney", "Kuzey", "Ekvator", "Batı"], dogru: "Güney" },
    // Dalgalar
    { soru: "Dalga hızı formülü nedir?", secenekler: ["v = fλ", "v = f/λ", "v = λ/f", "v = f²λ"], dogru: "v = fλ" },
    { soru: "Frekans birimi nedir?", secenekler: ["Hertz", "Saniye", "Metre", "Joule"], dogru: "Hertz" },
    { soru: "Dalga boyu birimi nedir?", secenekler: ["Hertz", "Metre", "Joule", "Amper"], dogru: "Metre" },
    { soru: "Gözle görünen ışık dalga boyu aralığı yaklaşık nedir?", secenekler: ["400-700 nm", "100-400 nm", "700-1000 nm", "1-100 nm"], dogru: "400-700 nm" },
    { soru: "Ses hızı havada yaklaşık kaç m/s'dir?", secenekler: ["300", "340", "400", "500"], dogru: "340" },
    // Optik
    { soru: "Işık hızı вакuumda kaç m/s'dir?", secenekler: ["3×10⁸", "3×10⁶", "3×10⁴", "3×10²"], dogru: "3×10⁸" },
    { soru: "Kırılma indisi nedir?", secenekler: ["n = c/v", "n = v/c", "n = c·v", "n = c²/v"], dogru: "n = c/v" },
    { soru: "Aynadan yansıyan ışığın yansıma açısı ile geliş açısı arasındaki ilişki nedir?", secenekler: ["Eşittir", "Yansıma açısı büyüktür", "Geliş açısı büyüktür", "Toplamı 180°"], dogru: "Eşittir" },
    { soru: "Küresel aynada görüntü özelliği nedir?", secenekler: ["Düz ve ters", "Sanal ve gerçek", "Büyütür ve küçültür", "Hepsi"], dogru: "Hepsi" },
    { soru: "Mercek denkleminde 1/f = ?", secenekler: ["1/o + 1/i", "o + i", "o - i", "o/i"], dogru: "1/o + 1/i" },
    // Modern Fizik
    { soru: "Fotonun enerjisi formülü nedir?", secenekler: ["E = hf", "E = h/f", "E = hf²", "E = h²f"], dogru: "E = hf" },
    { soru: "Planck sabiti nedir?", secenekler: ["h = 6.626×10⁻³⁴ J·s", "h = 6.626×10⁻³² J·s", "h = 6.626×10⁻³⁰ J·s", "h = 6.626×10⁻²⁸ J·s"], dogru: "h = 6.626×10⁻³⁴ J·s" },
    { soru: "Fotoelektrik etkiyi kim açıklamıştır?", secenekler: ["Einstein", "Newton", "Maxwell", "Bohr"], dogru: "Einstein" },
    { soru: "Atom modelini kim geliştirmiştir?", secenekler: ["Bohr", "Rutherford", "Dalton", "Thomson"], dogru: "Bohr" },
    { soru: "Radyoaktiviteyi kim keşfetmiştir?", secenekler: ["Becquerel", "Curie", "Röntgen", "Thomson"], dogru: "Becquerel" },
    // Dinamik
    { soru: "Eylemsizlik momenti birimi nedir?", secenekler: ["kg·m²", "kg·m", "kg·m²/s", "kg·m/s"], dogru: "kg·m²" },
    { soru: "Tork formülü nedir?", secenekler: ["τ = rF", "τ = r/F", "τ = F/r", "τ = r²F"], dogru: "τ = rF" },
    { soru: "Açısal hız birimi nedir?", secenekler: ["rad/s", "rad", "m/s", "1/s"], dogru: "rad/s" },
    { soru: "Merkezcil kuvvet formülü nedir?", secenekler: ["F = mv²/r", "F = mr/v²", "F = mvr", "F = mv/r²"], dogru: "F = mv²/r" },
    { soru: "Döner hareketin kinetik enerjisi nedir?", secenekler: ["E = ½Iω²", "E = ½Iω", "E = Iω²", "E = I²ω²"], dogru: "E = ½Iω²" },
    // Basınç
    { soru: "Basınç birimi nedir?", secenekler: ["Pascal", "Newton", "Joule", "Watt"], dogru: "Pascal" },
    { soru: "Pascal yasası nedir?", secenekler: ["Kapalı sıvıda basınç her yöne eşit iletilir", "Basınç kuvvet/alandır", "Basınç sıvı derinliğine göre artar", "Hepsi"], dogru: "Kapalı sıvıda basınç her yöne eşit iletilir" },
    { soru: "Arşimet prensibi nedir?", secenekler: ["Sıvıya batan cisim karşılık geldiği kadar sıvıyı iter", "Basınç eşit olur", "Hacim sabittir", "Kütle artar"], dogru: "Sıvıya batan cisim karşılık geldiği kadar sıvıyı iter" },
    { soru: "Atmosfer basıncı yaklaşık kaç Pascal'dır?", secenekler: ["10⁵", "10⁶", "10⁴", "10³"], dogru: "10⁵" },
    { soru: "Hidrolik pres prensibi nedir?", secenekler: ["P₁ = P₂", "F₁ = F₂", "A₁ = A₂", "V₁ = V₂"], dogru: "P₁ = P₂" }
  ],
  kimya: [
    // Atom ve Yapısı
    { soru: "Atomu ilk kez kim öne sürmüştür?", secenekler: ["Dalton", "Thomson", "Rutherford", "Bohr"], dogru: "Dalton" },
    { soru: "Atom çekirdeğini keşfeden kimdir?", secenekler: ["Rutherford", "Thomson", "Dalton", "Bohr"], dogru: "Rutherford" },
    { soru: "Elektronu kim keşfetmiştir?", secenekler: ["Thomson", "Rutherford", "Dalton", "Bohr"], dogru: "Thomson" },
    { soru: "Proton nerede bulunur?", secenekler: ["Çekirdekte", "Elektron bulutunda", "Her iki yerde", "Çekirdekte yok"], dogru: "Çekirdekte" },
    { soru: "Nötron nerede bulunur?", secenekler: ["Çekirdekte", "Elektron bulutunda", "Her iki yerde", "Çekirdekte yok"], dogru: "Çekirdekte" },
    // Periyodik Sistem
    { soru: "Periyodik tabloyu kim düzenlemiştir?", secenekler: ["Mendeleev", "Moseley", "Dalton", "Bohr"], dogru: "Mendeleev" },
    { soru: "Periyot neyi gösterir?", secenekler: ["Elektron katman sayısı", "Proton sayısı", "Nötron sayısı", "Atom sayısı"], dogru: "Elektron katman sayısı" },
    { soru: "Grup neyi gösterir?", secenekler: ["Değerlik elektron sayısı", "Proton sayısı", "Nötron sayısı", "Kütle sayısı"], dogru: "Değerlik elektron sayısı" },
    { soru: "En aktif metal hangi gruptadır?", secenekler: ["1A", "2A", "7A", "8A"], dogru: "1A" },
    { soru: "En aktif ametal hangi gruptadır?", secenekler: ["1A", "2A", "7A", "8A"], dogru: "7A" },
    // Kimyasal Tepkimeler
    { soru: "A + B → C tepkime türü nedir?", secenekler: ["Birleşme", "Ayrılma", "Yer değiştirme", "Yanma"], dogru: "Birleşme" },
    { soru: "AB → A + B tepkime türü nedir?", secenekler: ["Ayrılma", "Birleşme", "Yer değiştirme", "Yanma"], dogru: "Ayrılma" },
    { soru: "Ekzotermik tepkimelerde ısı nasıl değişir?", secenekler: ["Verilir", "Alınır", "Değişmez", "Sıfırdır"], dogru: "Verilir" },
    { soru: "Endotermik tepkimelerde ısı nasıl değişir?", secenekler: ["Alınır", "Verilir", "Değişmez", "Sıfırdır"], dogru: "Alınır" },
    { soru: "Katalizör ne yapar?", secenekler: ["Tepkime hızını artırır", "Tepkime hızını azaltır", "Tepkimeyi durdurur", "Ürün miktarını artırır"], dogru: "Tepkime hızını artırır" },
    // Asitler ve Bazlar
    { soru: "pH değeri 7 olan çözelti nedir?", secenekler: ["Nötr", "Asidik", "Bazik", "Hacim"], dogru: "Nötr" },
    { soru: "pH değeri 7'den küçükse çözelti nedir?", secenekler: ["Asidik", "Bazik", "Nötr", "Doygun"], dogru: "Asidik" },
    { soru: "pH değeri 7'den büyükse çözelti nedir?", secenekler: ["Bazik", "Asidik", "Nötr", "Doygun"], dogru: "Bazik" },
    { soru: "Güçlü asit örnekleri hangileridir?", secenekler: ["HCl, H₂SO₄", "CH₃COOH, HCN", "H₂CO₃, H₂S", "NH₃, H₂O"], dogru: "HCl, H₂SO₄" },
    { soru: "Güçlü baz örnekleri hangileridir?", secenekler: ["NaOH, KOH", "NH₃, Mg(OH)₂", "Ca(OH)₂, Al(OH)₃", "Fe(OH)₃, Cu(OH)₂"], dogru: "NaOH, KOH" },
    // Kimyasal Türler
    { soru: "Element nedir?", secenekler: ["Tek cins atomdan oluşan madde", "Farklı atomlardan oluşan madde", "Karışım", "Bileşik"], dogru: "Tek cins atomdan oluşan madde" },
    { soru: "Bileşik nedir?", secenekler: ["Farklı elementlerin kimyasal birleşimi", "Tek cins atom", "Karışım", "Element"], dogru: "Farklı elementlerin kimyasal birleşimi" },
    { soru: "Karışım nedir?", secenekler: ["Fiziksel yollarla ayrılabilen madde", "Kimyasal yollarla ayrılan madde", "Element", "Bileşik"], dogru: "Fiziksel yollarla ayrılabilen madde" },
    { soru: "H₂O hangi madde türündedir?", secenekler: ["Bileşik", "Element", "Karışım", "Molekül"], dogru: "Bileşik" },
    { soru: "Hangisi elementtür?", secenekler: ["Altın", "Su", "Tuz", "Hava"], dogru: "Altın" },
    // Molar Kütle
    { soru: "Mol kavramını kim bulmuştur?", secenekler: ["Avogadro", "Dalton", "Mendeleev", "Bohr"], dogru: "Avogadro" },
    { soru: "1 mol maddedeki parçacık sayısı kaçtır?", secenekler: ["6.02×10²³", "6.02×10²²", "6.02×10²⁴", "6.02×10²¹"], dogru: "6.02×10²³" },
    { soru: "Molar kütle birimi nedir?", secenekler: ["g/mol", "mol/g", "g·mol", "mol²/g"], dogru: "g/mol" },
    { soru: "Standart sıcaklık ve basınç nedir?", secenekler: ["0°C ve 1 atm", "25°C ve 1 atm", "0°C ve 0 atm", "25°C ve 0 atm"], dogru: "0°C ve 1 atm" },
    { soru: "18 g su kaç moldür?", secenekler: ["1", "2", "3", "4"], dogru: "1" },
    // Gazlar
    { soru: "İdeal gaz yasası kim tarafından bulunmuştur?", secenekler: ["Clapeyron", "Boyle", "Charles", "Gay-Lussac"], dogru: "Clapeyron" },
    { soru: "Boyle yasası nedir?", secenekler: ["P₁V₁ = P₂V₂ (sabit T)", "V₁/T₁ = V₂/T₂ (sabit P)", "P₁/T₁ = P₂/T₂ (sabit V)", "PV = nRT"], dogru: "P₁V₁ = P₂V₂ (sabit T)" },
    { soru: "Charles yasası nedir?", secenekler: ["V₁/T₁ = V₂/T₂ (sabit P)", "P₁V₁ = P₂V₂ (sabit T)", "P₁/T₁ = P₂/T₂ (sabit V)", "PV = nRT"], dogru: "V₁/T₁ = V₂/T₂ (sabit P)" },
    { soru: "Standart koşullarda 1 mol gazın hacmi kaç litredir?", secenekler: ["22.4", "24.5", "20.0", "25.0"], dogru: "22.4" },
    { soru: "Dalton yasası nedir?", secenekler: ["Kısmi basınçlar toplamı = toplam basınç", "P₁V₁ = P₂V₂", "V₁/T₁ = V₂/T₂", "PV = nRT"], dogru: "Kısmi basınçlar toplamı = toplam basınç" },
    // Çözeltiler
    { soru: "Çözelti nedir?", secenekler: ["Çözünen + Çözücü", "Sadece çözünen", "Sadece çözücü", "Element + bileşik"], dogru: "Çözünen + Çözücü" },
    { soru: "Konsantrasyon birimi nedir?", secenekler: ["mol/L", "L/mol", "mol·L", "g/L"], dogru: "mol/L" },
    { soru: "Yüzde konsantrasyon nasıl hesaplanır?", secenekler: ["çözünen kütle/çözelti kütle × 100", "çözücü kütle/çözelti kütle × 100", "çözünen/çözücü × 100", "çözelti/çözünen × 100"], dogru: "çözünen kütle/çözelti kütle × 100" },
    { soru: "Sulu çözeltide çözücü nedir?", secenekler: ["Su", "Tuz", "Şeker", "Asit"], dogru: "Su" },
    { soru: "Doymuş çözeltide çözünen madde nasıl davranır?", secenekler: ["Daha fazla çözünmez", "Sonsuza kadar çözünür", "Çökelir", "Buharlaşır"], dogru: "Daha fazla çözünmez" },
    // Asit-Baz Dengesi
    { soru: "Brönsted-Lowry tanımına göre asit nedir?", secenekler: ["Proton verici", "Proton alıcı", "Elektron verici", "Elektron alıcı"], dogru: "Proton verici" },
    { soru: "Brönsted-Lowry tanımına göre baz nedir?", secenekler: ["Proton alıcı", "Proton verici", "Elektron verici", "Elektron alıcı"], dogru: "Proton alıcı" },
    { soru: "Lewis asidi nedir?", secenekler: ["Elektron çifti alıcı", "Elektron çifti verici", "Proton verici", "Proton alıcı"], dogru: "Elektron çifti alıcı" },
    { soru: "Konjugat asit-baz çifti nedir?", secenekler: ["Proton farkına 1 olan çift", "Aynı elektronegatiflik", "Aynı proton sayısı", "Aynı elektron sayısı"], dogru: "Proton farkına 1 olan çift" },
    { soru: "pH hesaplama formülü nedir?", secenekler: ["pH = -log[H⁺]", "pH = log[H⁺]", "pH = -[H⁺]", "pH = [H⁺]"], dogru: "pH = -log[H⁺]" },
    // Oksidasyon-Redüksiyon
    { soru: "Oksidasyon nedir?", secenekler: ["Elektron kaybı", "Elektron kazanımı", "Proton kaybı", "Proton kazanımı"], dogru: "Elektron kaybı" },
    { soru: "Redüksiyon nedir?", secenekler: ["Elektron kazanımı", "Elektron kaybı", "Proton kaybı", "Proton kazanımı"], dogru: "Elektron kazanımı" },
    { soru: "Oksidan nedir?", secenekler: ["Kendisi reduksiyona uğratan madde", "Kendisi okside olan madde", "Katalizör", "Çözücü"], dogru: "Kendisi reduksiyona uğratan madde" },
    { soru: "Redükör nedir?", secenekler: ["Kendisi okside olan madde", "Kendisi reduksiyona uğratan madde", "Katalizör", "Çözücü"], dogru: "Kendisi okside olan madde" },
    { soru: "Oksidasyon sayısı nasıl değişir?", secenekler: ["Elektron kaybında artar", "Elektron kaybında azalır", "Değişmez", "Sıfırdır"], dogru: "Elektron kaybında artar" },
    // Karbon ve Yapısı
    { soru: "Karbonun değeri nedir?", secenekler: ["4", "3", "2", "5"], dogru: "4" },
    { soru: "Alkanlar genel formülü nedir?", secenekler: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₁"], dogru: "CₙH₂ₙ₊₂" },
    { soru: "Alkenler genel formülü nedir?", secenekler: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₁"], dogru: "CₙH₂ₙ" },
    { soru: "Alkinler genel formülü nedir?", secenekler: ["CₙH₂ₙ₋₂", "CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₊₁"], dogru: "CₙH₂ₙ₋₂" },
    { soru: "Doymamış hidrokarbonlar arası çift bağ içerir?", secenekler: ["Alkenler, Alkinler", "Alkanlar", "Sikloalkanlar", "Hepsi"], dogru: "Alkenler, Alkinler" },
    // Organik Kimya
    { soru: "Fonksiyonel grup nedir?", secenekler: ["Molekülün özelliğini belirten grup", "Sadece hidrojen", "Sadece karbon", "Sadece oksijen"], dogru: "Molekülün özelliğini belirten grup" },
    { soru: "-OH grubuna ne denir?", secenekler: ["Hidroksil", "Karbonil", "Karboksil", "Amino"], dogru: "Hidroksil" },
    { soru: "-CHO grubuna ne denir?", secenekler: ["Aldehit", "Keton", "Alkol", "Asit"], dogru: "Aldehit" },
    { soru: "-COOH grubuna ne denir?", secenekler: ["Karboksil", "Karbonil", "Hidroksil", "Amino"], dogru: "Karboksil" },
    { soru: "Esterler nasıl oluşur?", secenekler: ["Asit + Alkol", "Alkol + Alkol", "Asit + Asit", "Aldehit + Keton"], dogru: "Asit + Alkol" },
    // Polimerler
    { soru: "Polimer nedir?", secenekler: ["Büyük molekül kütleli organik bileşik", "Küçük molekül", "Element", "İnorganik bileşik"], dogru: "Büyük molekül kütleli organik bileşik" },
    { soru: "Monomer nedir?", secenekler: ["Polimeri oluşturan küçük birim", "Polimer kendisi", "Element", "Çözücü"], dogru: "Polimeri oluşturan küçük birim" },
    { soru: "Polietilen monomeri nedir?", secenekler: ["Eten", "Propen", "Stiren", "Vinil klorür"], dogru: "Eten" },
    { soru: "Polipropilen monomeri nedir?", secenekler: ["Propen", "Eten", "Stiren", "Vinil klorür"], dogru: "Propen" },
    { soru: "Neylon hangi polimer türündedir?", secenekler: ["Poliamid", "Poliester", "Polietilen", "Polipropilen"], dogru: "Poliamid" }
  ],
  biyoloji: [
    // Canlıların Ortak Özellikleri
    { soru: "Canlıların temel özellikleri hangileridir?", secenekler: ["Hücreli yapı, büyüme, üreme", "Sadece üreme", "Sadece büyüme", "Hareket etme"], dogru: "Hücreli yapı, büyüme, üreme" },
    { soru: "Canlıların ortak özelliklerinden hangisi yanlıştır?", secenekler: ["Hareketsiz olma", "Üreme", "Büyüme", "Beslenme"], dogru: "Hareketsiz olma" },
    { soru: "Canlı sınıflandırılmasında en büyük birim nedir?", secenekler: ["Domain", "Krallık", "Filum", "Sınıf"], dogru: "Domain" },
    { soru: "İnsanın sınıflandırılması nedir?", secenekler: ["Animalia-Chordata-Mammalia-Primates", "Plantae-Fungi-Protista-Archaea", "Bacteria-Archaea-Eukarya", "Fungi-Protista-Monera"], dogru: "Animalia-Chordata-Mammalia-Primates" },
    { soru: "Canlıların en küçük ortak özelliği nedir?", secenekler: ["Hücre", "Üreme", "Büyüme", "Hareket"], dogru: "Hücre" },
    // Canlıların Temel Bileşenleri
    { soru: "Canlıların yapı taşı nedir?", secenekler: ["Hücre", "Doku", "Organ", "Sistem"], dogru: "Hücre" },
    { soru: "Hücreyi ilk kez kim görmüştür?", secenekler: ["Robert Hooke", "Schleiden", "Schwann", "Virchow"], dogru: "Robert Hooke" },
    { soru: "Hücre kuramına göre hangisi yanlıştır?", secenekler: ["Tüm canlılar hücrelidir", "Hücreler canlıdır", "Canlılar tek hücreden oluşur", "Hücreler hastalanabilir"], dogru: "Hücreler canlıdır" },
    { soru: "Prokaryot hücre özelliği nedir?", secenekler: ["Çekirdek zarı yok", "Çekirdek var", "Organeller var", "Büyük"], dogru: "Çekirdek zarı yok" },
    { soru: "Ökaryot hücre özelliği nedir?", secenekler: ["Çekirdek zarı var", "Çekirdek zarı yok", "Organel yok", "Küçük"], dogru: "Çekirdek zarı var" },
    // Hücre ve Organeller
    { soru: "Mitokondri fonksiyonu nedir?", secenekler: ["Enerji üretimi", "Protein sentezi", "Lipit sentezi", "Hücre bölünmesi"], dogru: "Enerji üretimi" },
    { soru: "Kloroplast fonksiyonu nedir?", secenekler: ["Fotosentez", "Protein sentezi", "Lipit sentezi", "Hücre bölünmesi"], dogru: "Fotosentez" },
    { soru: "Ribozom fonksiyonu nedir?", secenekler: ["Protein sentezi", "Enerji üretimi", "Fotosentez", "Lipit sentezi"], dogru: "Protein sentezi" },
    { soru: "Endoplazmik retikulum fonksiyonu nedir?", secenekler: ["Protein ve lipit sentezi", "Enerji üretimi", "Fotosentez", "Hücre bölünmesi"], dogru: "Protein ve lipit sentezi" },
    { soru: "Golgi cismi fonksiyonu nedir?", secenekler: ["Paketleme ve salgılama", "Enerji üretimi", "Protein sentezi", "Fotosentez"], dogru: "Paketleme ve salgılama" },
    { soru: "Lizozom fonksiyonu nedir?", secenekler: ["Sindirim", "Enerji üretimi", "Protein sentezi", "Hücre bölünmesi"], dogru: "Sindirim" },
    { soru: "Sentrozom fonksiyonu nedir?", secenekler: ["Hücre bölünmesi", "Enerji üretimi", "Protein sentezi", "Fotosentez"], dogru: "Hücre bölünmesi" },
    { soru: "Koful fonksiyonu nedir?", secenekler: ["Depolama", "Enerji üretimi", "Protein sentezi", "Fotosentez"], dogru: "Depolama" },
    { soru: "Hücre zarı fonksiyonu nedir?", secenekler: ["Koruma ve taşıma", "Enerji üretimi", "Protein sentezi", "Fotosentez"], dogru: "Koruma ve taşıma" },
    { soru: "Sitoplazma nedir?", secenekler: ["Hücre içi sıvı", "Hücre zarı", "Çekirdek", "Organeller"], dogru: "Hücre içi sıvı" },
    // Canlıların Sınıflandırılması
    { soru: "5 krallık sistemi kime aittir?", secenekler: ["Whittaker", "Linnaeus", "Darwin", "Mendel"], dogru: "Whittaker" },
    { soru: "Monera krallığına hangisi dahildir?", secenekler: ["Bakteriler", "Mantarlar", "Bitkiler", "Hayvanlar"], dogru: "Bakteriler" },
    { soru: "Protista krallığına hangisi dahildir?", secenekler: ["Algler", "Bitkiler", "Hayvanlar", "Mantarlar"], dogru: "Algler" },
    { soru: "Fungi krallığına hangisi dahildir?", secenekler: ["Mantarlar", "Bitkiler", "Hayvanlar", "Bakteriler"], dogru: "Mantarlar" },
    { soru: "Plantae krallığına hangisi dahildir?", secenekler: ["Bitkiler", "Hayvanlar", "Mantarlar", "Bakteriler"], dogru: "Bitkiler" },
    { soru: "Animalia krallığına hangisi dahildir?", secenekler: ["Hayvanlar", "Bitkiler", "Mantarlar", "Bakteriler"], dogru: "Hayvanlar" },
    { soru: "Bakteriler nasıl ürer?", secenekler: ["Eşeysiz", "Eşeyli", "Hem eşeyli hem eşeysiz", "Bölünemez"], dogru: "Eşeysiz" },
    { soru: "Mantarlar nasıl beslenir?", secenekler: ["Saprofit", "Fotosentez", "Kemosentez", "Parazit"], dogru: "Saprofit" },
    { soru: "Bitkiler nasıl beslenir?", secenekler: ["Fotosentez", "Saprofit", "Kemosentez", "Parazit"], dogru: "Fotosentez" },
    // Mitoz ve Eşeysiz Üreme
    { soru: "Mitoz bölünme sonucu kaç hücre oluşur?", secenekler: ["2", "4", "8", "16"], dogru: "2" },
    { soru: "Mitoz bölünme hangi hücrelerde görülür?", secenekler: ["Somatik hücreler", "Eşey hücreleri", "Hepsi", "Hiçbiri"], dogru: "Somatik hücreler" },
    { soru: "Mitoz bölünme evreleri sırası nedir?", secenekler: ["Profaz-Metafaz-Anafaz-Telofaz", "Metafaz-Profaz-Anafaz-Telofaz", "Anafaz-Profaz-Metafaz-Telofaz", "Telofaz-Anafaz-Metafaz-Profaz"], dogru: "Profaz-Metafaz-Anafaz-Telofaz" },
    { soru: "Kromozomlar hangi evrede birbirine bağlanır?", secenekler: ["Metafazda", "Profazda", "Anafazda", "Telofazda"], dogru: "Metafazda" },
    { soru: "Kromatitler hangi evrede ayrılır?", secenekler: ["Anafazda", "Profazda", "Metafazda", "Telofazda"], dogru: "Anafazda" },
    { soru: "Eşeysiz üreme türlerinden hangisi yanlıştır?", secenekler: ["Göçme", "Bölünme", "Tomurcuklanma", "Döllenme"], dogru: "Döllenme" },
    { soru: "Bakteriler nasıl eşeysiz ürer?", secenekler: ["Bölünerek", "Tomurcuklanarak", "Sporla", "Göçerek"], dogru: "Bölünerek" },
    { soru: "Mayalar nasıl eşeysiz ürer?", secenekler: ["Tomurcuklanarak", "Bölünerek", "Sporla", "Göçerek"], dogru: "Tomurcuklanarak" },
    { soru: "Sporlar nasıl oluşur?", secenekler: ["Mitozla", "Mayozla", "Farksızdır", "Eşeyli"], dogru: "Mayozla" },
    { soru: "Eşeysiz üreme avantajı nedir?", secenekler: ["Hızlı ve az enerjili", "Çeşitlilik", "Uyumluluk", "Adaptasyon"], dogru: "Hızlı ve az enerjili" },
    // Mayoz ve Eşeyli Üreme
    { soru: "Mayoz bölünme sonucu kaç hücre oluşur?", secenekler: ["4", "2", "8", "16"], dogru: "4" },
    { soru: "Mayoz bölünme hangi hücrelerde görülür?", secenekler: ["Eşey hücreleri", "Somatik hücreler", "Hepsi", "Hiçbiri"], dogru: "Eşey hücreleri" },
    { soru: "Mayoz bölünme kaç evrede gerçekleşir?", secenekler: ["2", "4", "6", "8"], dogru: "2" },
    { soru: "Mayoz I'de kromozom sayısı nasıl değişir?", secenekler: ["Yarıya iner", "Aynı kalır", "İki katına çıkar", "Sıfırdır"], dogru: "Yarıya iner" },
    { soru: "Mayoz II'de kromozom sayısı nasıl değişir?", secenekler: ["Aynı kalır", "Yarıya iner", "İki katına çıkar", "Sıfırdır"], dogru: "Aynı kalır" },
    { soru: "Çaprazlama ne zaman olur?", secenekler: ["Mayoz I Profazı", "Mayoz II Profazı", "Mayoz I Metafazı", "Mayoz II Metafazı"], dogru: "Mayoz I Profazı" },
    { soru: "Eşeyli üreme avantajı nedir?", secenekler: ["Çeşitlilik", "Hızlılık", "Az enerji", "Basitlik"], dogru: "Çeşitlilik" },
    { soru: "Gametogenez ne demektir?", secenekler: ["Eşey hücresi oluşumu", "Vücut hücresi oluşumu", "Hücre ölümü", "Hücre büyümesi"], dogru: "Eşey hücresi oluşumu" },
    { soru: "Spermatogenez sonucu kaç sperm oluşur?", secenekler: ["4", "2", "1", "8"], dogru: "4" },
    { soru: "Oogenez sonucu kaç yumurta oluşur?", secenekler: ["1", "2", "4", "8"], dogru: "1" },
    // Kalıtım
    { soru: "Genetik biliminin kurucusu kimdir?", secenekler: ["Mendel", "Darwin", "Lamarck", "Wallace"], dogru: "Mendel" },
    { soru: "Mendel'in bezelye deneylerinde kaç karakter incelemiştir?", secenekler: ["7", "5", "6", "8"], dogru: "7" },
    { soru: "Dominant gen nasıl gösterilir?", secenekler: ["Büyük harf", "Küçük harf", "Kalın", "İtalik"], dogru: "Büyük harf" },
    { soru: "Resesif gen nasıl gösterilir?", secenekler: ["Küçük harf", "Büyük harf", "Kalın", "İtalik"], dogru: "Küçük harf" },
    { soru: "Homozygot birey nedir?", secenekler: ["Aynı iki gen", "Farklı iki gen", "Tek gen", "Gen yok"], dogru: "Aynı iki gen" },
    { soru: "Heterozigot birey nedir?", secenekler: ["Farklı iki gen", "Aynı iki gen", "Tek gen", "Gen yok"], dogru: "Farklı iki gen" },
    { soru: "Fenotip nedir?", secenekler: ["Görünüm", "Genetik yapı", "Kromozom sayısı", "DNA"], dogru: "Görünüm" },
    { soru: "Genotip nedir?", secenekler: ["Genetik yapı", "Görünüm", "Fenotip", "Kromozom"], dogru: "Genetik yapı" },
    { soru: "Tayfsal kalıtım örneği nedir?", secenekler: ["Kan grubu", "Sık dikbüyük", "Çatık kaş", "Renk körlüğü"], dogru: "Kan grubu" },
    { soru: "Seksioran kalıtım örneği nedir?", secenekler: ["Renk körlüğü", "Kan grubu", "Sık dikbüyük", "Çatık kaş"], dogru: "Renk körlüğü" },
    // Ekosistem Ekolojisi
    { soru: "Ekosistem nedir?", secenekler: ["Canlı + çevre", "Sadece canlılar", "Sadece çevre", "İklim"], dogru: "Canlı + çevre" },
    { soru: "Besin zincirinde enerji nasıl akar?", secenekler: ["Üretici → tüketici", "Tüketici → üretici", "Çevresel", "Rastgele"], dogru: "Üretici → tüketici" },
    { soru: "Üretici nedir?", secenekler: ["Fotosentetik canlı", "Et yiyen", "Hepçil", "Ayrıştırıcı"], dogru: "Fotosentetik canlı" },
    { soru: "Tüketici nedir?", secenekler: ["Diğer canlılarla beslenen", "Fotosentetik", "Ayrıştırıcı", "Üretici"], dogru: "Diğer canlılarla beslenen" },
    { soru: "Ayrıştırıcı nedir?", secenekler: ["Ölü organik maddeyi ayrıştıran", "Fotosentetik", "Tüketici", "Üretici"], dogru: "Ölü organik maddeyi ayrıştıran" },
    { soru: "Trofik seviye nedir?", secenekler: ["Besin zinciri basamağı", "Hız", "Sıcaklık", "Yağış"], dogru: "Besin zinciri basamağı" },
    { soru: "Ekolojik piramit nedir?", secenekler: ["Enerji azalır", "Enerji artar", "Enerji sabittir", "Enerji sıfırdır"], dogru: "Enerji azalır" },
    { soru: "Karbon döngüsünde en büyük havuz nedir?", secenekler: ["Okyanus", "Atmosfer", "Toprak", "Canlılar"], dogru: "Okyanus" },
    { soru: "Azot döngüsünde en önemli olay nedir?", secenekler: ["Azot fiksasyonu", "Fotosentez", "Solunum", "Çürümek"], dogru: "Azot fiksasyonu" },
    { soru: "Biyoçeşitlilik nedir?", secenekler: ["Canlı çeşitliliği", "Hava durumu", "İklim", "Toprak"], dogru: "Canlı çeşitliliği" },
    // Bitkiler
    { soru: "Bitkilerin besin organı hangisidir?", secenekler: ["Kök", "Yaprak", "Çiçek", "Gövde"], dogru: "Kök" },
    { soru: "Fotosentez hangi organda gerçekleşir?", secenekler: ["Kloroplast", "Mitokondri", "Ribozom", "Hücre çekirdeği"], dogru: "Kloroplast" },
    { soru: "Fotosentez denklemi nedir?", secenekler: ["6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "CO₂ + H₂O → C₆H₁₂O₆", "O₂ + C₆H₁₂O₆ → CO₂ + H₂O", "C₆H₁₂O₆ → 6CO₂ + 6H₂O"], dogru: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
    { soru: "Bitkiler hangi gazı salgılar?", secenekler: ["Oksijen", "Karbon dioksit", "Azot", "Hidrojen"], dogru: "Oksijen" },
    { soru: "Transpirasyon nedir?", secenekler: ["Su kaybı", "Gaz alışverişi", "Enerji üretimi", "Büyüme"], dogru: "Su kaybı" },
    // Sindirim
    { soru: "Sindirim nedir?", secenekler: ["Büyük molekülleri küçük parçalara ayırma", "Küçük molekülleri birleştirme", "Enerji üretimi", "Büyüme"], dogru: "Büyük molekülleri küçük parçalara ayırma" },
    { soru: "Sindirim enzimi nedir?", secenekler: ["Kimyasal sindirimi sağlayan protein", "Mekanik sindirim", "Fiziksel sindirim", "Hormon"], dogru: "Kimyasal sindirimi sağlayan protein" },
    { soru: "Amilaz hangi besini sindirir?", secenekler: ["Nişasta", "Protein", "Yağ", "Şeker"], dogru: "Nişasta" },
    { soru: "Pepsin hangi besini sindirir?", secenekler: ["Protein", "Nişasta", "Yağ", "Şeker"], dogru: "Protein" },
    { soru: "Lipaz hangi besini sindirir?", secenekler: ["Yağ", "Protein", "Nişasta", "Şeker"], dogru: "Yağ" },
    // Dolaşım
    { soru: "Kan fonksiyonu nedir?", secenekler: ["Taşıma", "Sindirim", "Solunum", "Boşaltım"], dogru: "Taşıma" },
    { soru: "Kırmızı kan hücresi fonksiyonu nedir?", secenekler: ["Oksijen taşıma", "Bağışıklık", "Pıhtılaşma", "Hastalık"], dogru: "Oksijen taşıma" },
    { soru: "Beyaz kan hücresi fonksiyonu nedir?", secenekler: ["Bağışıklık", "Oksijen taşıma", "Pıhtılaşma", "Hastalık"], dogru: "Bağışıklık" },
    { soru: "Kan pulcuğu fonksiyonu nedir?", secenekler: ["Pıhtılaşma", "Bağışıklık", "Oksijen taşıma", "Hastalık"], dogru: "Pıhtılaşma" },
    { soru: "Kalp kaç odalıdır?", secenekler: ["4", "2", "3", "5"], dogru: "4" },
    // Solunum
    { soru: "Solunum nedir?", secenekler: ["Enerji elde etme", "Sindirim", "Boşaltım", "Büyüme"], dogru: "Enerji elde etme" },
    { soru: "Aerobik solunum sonucu kaç ATP oluşur?", secenekler: ["36-38", "2", "4", "8"], dogru: "36-38" },
    { soru: "Anaerobik solunum sonucu kaç ATP oluşur?", secenekler: ["2", "36-38", "4", "8"], dogru: "2" },
    { soru: "Fotosentez ile solunum arasındaki ilişki nedir?", secenekler: ["Ters yönlü", "Aynı yönlü", "Farksızdır", "Birbirini tamamlar"], dogru: "Ters yönlü" },
    { soru: "Solunum gazı nedir?", secenekler: ["Karbon dioksit", "Oksijen", "Azot", "Hidrojen"], dogru: "Karbon dioksit" },
    // Boşaltım
    { soru: "Boşaltım nedir?", secenekler: ["Zararlı maddeleri vücuttan atma", "Enerji üretimi", "Sindirim", "Büyüme"], dogru: "Zararlı maddeleri vücuttan atma" },
    { soru: "Böbrek fonksiyonu nedir?", secenekler: ["İdrak oluşumu", "Sindirim", "Solunum", "Büyüme"], dogru: "İdrak oluşumu" },
    { soru: "Akciğer fonksiyonu nedir?", secenekler: ["Gaz alışverişi", "Sindirim", "Boşaltım", "Büyüme"], dogru: "Gaz alışverişi" },
    { soru: "Deri fonksiyonu nedir?", secenekler: ["Koruma ve boşaltım", "Sindirim", "Solunum", "Büyüme"], dogru: "Koruma ve boşaltım" },
    { soru: "Karaciğer fonksiyonu nedir?", secenekler: ["Detoks", "Sindirim", "Solunum", "Büyüme"], dogru: "Detoks" }
  ],
  turkce: [
    // Sözcükte Anlam
    { soru: "Anlam cağında 'köpek' kelimesinin kavramı nedir?", secenekler: ["Evcil hayvan", "Kurt", "Kedi", "Kuş"], dogru: "Evcil hayvan" },
    { soru: "'Kırmızı elma' örneğinde hangi anlam vardır?", secenekler: ["Yanlam", "Kavram", "Terim", "Mecaz"], dogru: "Yanlam" },
    { soru: "Sözcükte anlam türlerinden hangisi yanlıştır?", secenekler: ["Kavram", "Yanlam", "Terim", "Hecelanma"], dogru: "Hecelanma" },
    { soru: "Bir sözcüğün temel anlamı nedir?", secenekler: ["Kavram", "Yanlam", "Mecaz", "Terim"], dogru: "Kavram" },
    { soru: "Bilim dünyasında kullanılan anlam türü nedir?", secenekler: ["Terim", "Kavram", "Yanlam", "Mecaz"], dogru: "Terim" },
    // Cümlede Anlam
    { soru: "Cümlede anlamın oluşmasında hangisi etkilidir?", secenekler: ["Sözcükler ve yapı", "Sadece sözcükler", "Sadece yapı", "Noktalama"], dogru: "Sözcükler ve yapı" },
    { soru: "Cümle anlam türlerinden hangisi yanlıştır?", secenekler: ["Yazılış", "Anlatım", "Vurgu", "Bağlam"], dogru: "Yazılış" },
    { soru: "Vurgu anlamı nasıl değiştirir?", secenekler: ["Ses tonlaması", "Sözcük sayısı", "Noktalama", "Yazım"], dogru: "Ses tonlaması" },
    { soru: "'Ali okula gitti' cümlesinin anlamı nedir?", secenekler: ["Olay", "Durum", "Süreç", "Kıyaslama"], dogru: "Olay" },
    { soru: "'Ali okulda' cümlesinin anlamı nedir?", secenekler: ["Durum", "Olay", "Süreç", "Kıyaslama"], dogru: "Durum" },
    // Paragrafta Anlam
    { soru: "Paragraf anlamı nasıl belirlenir?", secenekler: ["Tüm cümleler", "İlk cümle", "Son cümle", "Orta cümle"], dogru: "Tüm cümleler" },
    { soru: "Paragrafın ana fikri nerede bulunur?", secenekler: ["Genelde ilk cümle", "Son cümle", "Orta cümle", "Herhangi bir yerde"], dogru: "Genelde ilk cümle" },
    { soru: "Paragraf türlerinden hangisi yanlıştır?", secenekler: ["Hikaye", "Açıklama", "Öyküleme", "Tanımlama"], dogru: "Hikaye" },
    { soru: "Açıklama paragrafı özelliği nedir?", secenekler: ["Bilgi verir", "Olay anlatır", "Betimler", "Örnek verir"], dogru: "Bilgi verir" },
    { soru: "Öyküleme paragrafı özelliği nedir?", secenekler: ["Olay anlatır", "Bilgi verir", "Betimler", "Tanımlar"], dogru: "Olay anlatır" },
    // Ses Olayları
    { soru: "Düşünce birimi nedir?", secenekler: ["Ses", "Hece", "Harf", "Kelime"], dogru: "Ses" },
    { soru: "Türkçede kaç ses vardır?", secenekler: ["8", "6", "10", "12"], dogru: "8" },
    { soru: "Ses olaylarından hangisi yanlıştır?", secenekler: ["Ünlileşme", "Düşme", "Türeme", "Hece"], dogru: "Hece" },
    { soru: "Ses düşmesi örneği nedir?", secenekler: ["Gitmek → gitmek", "Elma → alma", "Su → suyu", "Kitap → kitab"], dogru: "gitmek" },
    { soru: "Ses türemesi örneği nedir?", secenekler: ["Kitap → kitabı", "Su → suyu", "Gitmek → gitmek", "Elma → alma"], dogru: "kitabı" },
    { soru: "Ünlü değişmesi örneği nedir?", secenekler: ["Köpek → köpek", "Gitmek → gitmek", "Su → suyu", "Kitap → kitab"], dogru: "köpek" },
    { soru: "Ünsüz değişmesi örneği nedir?", secenekler: ["Kıt → kip", "Su → suyu", "Gitmek → gitmek", "Elma → alma"], dogru: "Kıt → kip" },
    { soru: "Ses benzeşmesi örneği nedir?", secenekler: ["Ekmek → emmek", "Gitmek → gitmek", "Su → suyu", "Kitap → kitab"], dogru: "emmek" },
    { soru: "Paranaz örneği nedir?", secenekler: ["Bilgi → bilgi", "Gitmek → gitmek", "Su → suyu", "Kitap → kitab"], dogru: "bilgi" },
    // Yazım Kuralları
    { soru: "Türkçe büyük harfle başlayan kelimelerden hangisi yanlıştır?", secenekler: ["bayram", "Türkiye", "İstanbul", "Kuran"], dogru: "bayram" },
    { soru: "Değişik yazılan kelimelerden hangisi doğrudur?", secenekler: ["tr", "nr", "dr", "km"], dogru: "dr" },
    { soru: "Birleşik kelimelerden hangisi yanlıştır?", secenekler: ["Göz odası", "Gözodası", "Su bardağı", "Subardagı"], dogru: "Göz odası" },
    { soru: "Ayrı yazılan kelimelerden hangisi yanlıştır?", secenekler: ["Ön görü", "Öngörü", "Karar ver", "Kararver"], dogru: "Ön görü" },
    { soru: " Türkçe'de hangi kelime doğrudur?", secenekler: ["herkes", "herkez", "falan", "filan"], dogru: "herkes" },
    // Noktalama İşaretleri
    { soru: "Nokta nerede kullanılır?", secenekler: ["Cümle sonunda", "Cümle başında", "Ortada", "Her yerde"], dogru: "Cümle sonunda" },
    { soru: "Virgül nerede kullanılır?", secenekler: ["Dizi sıralaması", "Cümle sonunda", "Başlangıçta", "Soru işareti yerine"], dogru: "Dizi sıralaması" },
    { soru: "Noktalı virgül nerede kullanılır?", secenekler: ["Uzun cümlelerde", "Kısa cümlelerde", "Sorularda", "Ünlem yerine"], dogru: "Uzun cümlelerde" },
    { soru: "İki nokta nerede kullanılır?", secenekler: ["Örnekleri sayarken", "Cümle sonunda", "Başlangıçta", "Sorularda"], dogru: "Örnekleri sayarken" },
    { soru: "Soru işareti nerede kullanılır?", secenekler: ["Soru cümlelerinde", "Olay cümlelerinde", "Ünlem cümlelerinde", "Emir cümlelerinde"], dogru: "Soru cümlelerinde" },
    // Sözcük Türleri
    { soru: "Sözcük türlerinden hangisi isim bildirir?", secenekler: ["İsim", "Fiil", "Sıfat", "Zamir"], dogru: "İsim" },
    { soru: "Sözcük türlerinden hangi eylem bildirir?", secenekler: ["Fiil", "İsim", "Sıfat", "Zamir"], dogru: "Fiil" },
    { soru: "Sözcük türlerinden hangisi nitelik bildirir?", secenekler: ["Sıfat", "İsim", "Fiil", "Zamir"], dogru: "Sıfat" },
    { soru: "Sözcük türlerinden hangisi isim yerine kullanılır?", secenekler: ["Zamir", "İsim", "Fiil", "Sıfat"], dogru: "Zamir" },
    { soru: "Zarf özelliği nedir?", secenekler: ["Fiilin niteliği", "İsimin niteliği", "Sıfatın niteliği", "Zamirin niteliği"], dogru: "Fiilin niteliği" },
    // Cümle Türleri
    { soru: "Cümle türlerinden hangisi yapısal sınıflandırmadır?", secenekler: ["Basit cümle", "Olay cümlesi", "Durum cümlesi", "Süreç cümlesi"], dogru: "Basit cümle" },
    { soru: "Cümle türlerinden hangi anlamsal sınıflandırmadır?", secenekler: ["Olay cümlesi", "Basit cümle", "Birleşik cümle", "Sesli cümle"], dogru: "Olay cümlesi" },
    { soru: "Basit cümle özelliği nedir?", secenekler: ["Tek yüklemeli", "İki yüklemeli", "Üç yüklemeli", "Yüklemesiz"], dogru: "Tek yüklemeli" },
    { soru: "Birleşik cümle özelliği nedir?", secenekler: ["İki yüklemeli", "Tek yüklemeli", "Üç yüklemeli", "Yüklemesiz"], dogru: "İki yüklemeli" },
    { soru: "Cümlele Türkçe cümle özelliği nedir?", secenekler: ["Fiil sonda", "Fiil başta", "Fiil ortada", "Yüklemesiz"], dogru: "Fiil sonda" },
    // Anlatım Bozuklukları
    { soru: "Anlatım bozukluğu türlerinden hangisi yanlıştır?", secenekler: ["Anlamca doğru", "Yazım yanlışı", "Yapısal hata", "Mantık hatası"], dogru: "Anlamca doğru" },
    { soru: "Yanlış kelime kullanımı örneği nedir?", secenekler: ["Gitmek → gelmek", "Gitmek → gitmek", "Su → suyu", "Kitap → kitab"], dogru: "Gitmek → gelmek" },
    { soru: "Yapısal bozukluk örneği nedir?", secenekler: ["Yüklemesiz cümle", "Yüklemeli cümle", "Basit cümle", "Birleşik cümle"], dogru: "Yüklemesiz cümle" },
    { soru: "Mantık hatası örneği nedir?", secenekler: ["Zıt anlamlı kelimeler", "Anlamlı kelimeler", "Benzer anlamlı kelimeler", "Aynı anlamlı kelimeler"], dogru: "Zıt anlamlı kelimeler" },
    { soru: "Anlamca bozukluk örneği nedir?", secenekler: ["Anlam belirsizliği", "Anlam netliği", "Doğru kullanım", "Uygun kullanım"], dogru: "Anlam belirsizliği" },
    // Fiilde Çatı
    { soru: "Fiilde çatı nedir?", secenekler: ["Zaman, şahıs, işlem, sayı", "Sadece zaman", "Sadece şahıs", "Sadece işlem"], dogru: "Zaman, şahıs, işlem, sayı" },
    { soru: "Fiil zamanlarından hangisi yanlıştır?", secenekler: ["Şimdiki zaman", "Geçmiş zaman", "Şimdiki zamansız", "Gelecek zaman"], dogru: "Şimdiki zamansız" },
    { soru: "Geniş zaman nedir?", secenekler: ["Genel geçerlilik", "Şu an", "Geçmiş", "Gelecek"], dogru: "Genel geçerlilik" },
    { soru: "Şimdiki zaman nedir?", secenekler: ["Şu an", "Genel geçerlilik", "Geçmiş", "Gelecek"], dogru: "Şu an" },
    { soru: "Di'li geçmiş zaman örneği nedir?", secenekler: ["Geldi", "Geliyor", "Gelecek", "Gel"], dogru: "Geldi" },
    { soru: "Miş'li geçmiş zaman örneği nedir?", secenekler: ["Geliyormuş", "Geldi", "Geliyor", "Gelecek"], dogru: "Geliyormuş" },
    { soru: "Rapor kipi örneği nedir?", secenekler: ["Gelseydi", "Geldi", "Geliyor", "Gelecek"], dogru: "Gelseydi" },
    { soru: "Gereklilik kipi örneği nedir?", secenekler: ["Gelmeli", "Geldi", "Geliyor", "Gelecek"], dogru: "Gelmeli" },
    { soru: "İstek kipi örneği nedir?", secenekler: ["Gelsin", "Geldi", "Geliyor", "Gelecek"], dogru: "Gelsin" },
    { soru: "Emir kipi örneği nedir?", secenekler: ["Gel", "Geldi", "Geliyor", "Gelecek"], dogru: "Gel" },
    // Sözcükte Anlam İlişkileri
    { soru: "Eş anlamlı kelimeler örneği nedir?", secenekler: ["Güzel → hoş", "Güzel → çirkin", "Güzel → büyük", "Güzel → küçük"], dogru: "Güzel → hoş" },
    { soru: "Karşıt anlamlı kelimeler örneği nedir?", secenekler: ["Güzel → çirkin", "Güzel → hoş", "Güzel → büyük", "Güzel → küçük"], dogru: "Güzel → çirkin" },
    { soru: "Tam anlamlı kelimeler örneği nedir?", secenekler: ["Öğretmen → hoca", "Öğretmen → doktor", "Öğretmen → hemşire", "Öğretmen → mühendis"], dogru: "Öğretmen → hoca" },
    { soru: "Eş sesli kelimeler örneği nedir?", secenekler: ["Gel → gelecek (gelmek)", "Gel → git", "Gel → koş", "Gel → atla"], dogru: "Gel → gelecek (gelmek)" },
    { soru: "Somut kavram örneği nedir?", secenekler: ["Masa", "Sevgi", "Adalet", "Güzellik"], dogru: "Masa" },
    { soru: "Soyut kavram örneği nedir?", secenekler: ["Sevgi", "Masa", "Sandalye", "Kitap"], dogru: "Sevgi" },
    { soru: "Gerçek kelime örneği nedir?", secenekler: ["Masa", "Peri", "Cin", "Hayalet"], dogru: "Masa" },
    { soru: "Hayali kelime örneği nedir?", secenekler: ["Peri", "Masa", "Kitap", "Kalem"], dogru: "Peri" },
    { soru: "Teknik kelime örneği nedir?", secenekler: ["Fotosentez", "Güzel", "Hoş", "Çirkin"], dogru: "Fotosentez" },
    // Cümle Tamamlama
    { soru: "Ali okula ___", secenekler: ["gitti", "gitmek", "giden", "gitmiş"], dogru: "gitti" },
    { soru: "Bugün hava çok ___", secenekler: ["sıcak", "sıcaklık", "sıcaklıkta", "sıcaklıklı"], dogru: "sıcak" },
    { soru: "Annem yemek ___", secenekler: ["yaptı", "yapmak", "yapan", "yapmış"], dogru: "yaptı" },
    { soru: "Kitabı okumayı ___", secenekler: ["severim", "sevgi", "sevimli", "sev"], dogru: "severim" },
    { soru: "Ders çalışmaya ___", secenekler: ["başladım", "başlangıç", "başlatıcı", "başlatma"], dogru: "başladım" },
    // Metin Bilgisi
    { soru: "Fıkra özelliği nedir?", secenekler: ["Kısa ve özlü", "Uzun ve detaylı", "Sadece şiir", "Sadece hikaye"], dogru: "Kısa ve özlü" },
    { soru: "Hikaye özelliği nedir?", secenekler: ["Olay örgüsü", "Şiirsel yapı", "Bilgi verir", "Kısa özet"], dogru: "Olay örgüsü" },
    { soru: "Roman özelliği nedir?", secenekler: ["Uzun anlatım", "Kısa özet", "Şiirsel yapı", "Bilgi verir"], dogru: "Uzun anlatım" },
    { soru: "Makale özelliği nedir?", secenekler: ["Görüş bildirir", "Olay anlatır", "Şiir yazar", "Öykü anlatır"], dogru: "Görüş bildirir" },
    { soru: "Deneme özelliği nedir?", secenekler: ["Kişisel görüş", "Nesnel görüş", "Bilgi verir", "Olay anlatır"], dogru: "Kişisel görüş" },
    // Sözcük Türetme ve Birleştirme
    { soru: "Sözcük türetme ekleri örnekleri?", secenekler: ["Güzel → güzelleş", "Güzel → çirkin", "Güzel → hoş", "Güzel → büyük"], dogru: "Güzel → güzelleş" },
    { soru: "Sözcük birleştirme örnekleri?", secenekler: ["Mavi + yeşil → mavi yeşil", "Mavi → kırmızı", "Mavi → sarı", "Mavi → siyah"], dogru: "Mavi + yeşil → mavi yeşil" },
    { soru: "Gövde meydana getirme ek örnekleri?", secenekler: ["Göz + göz → gözlük", "Göz → bak", "Göz → gör", "Göz → kırp"], dogru: "Göz + göz → gözlük" },
    { soru: "İsimden fiil yapma örnekleri?", secenekler: ["Su → sulamak", "Su → ıslak", "Su → damla", "Su → deniz"], dogru: "Su → sulamak" },
    { soru: "Fiilden isim yapma örnekleri?", secenekler: ["Yazmak → yazı", "Yazmak → kitap", "Yazmak → kalem", "Yazmak → mürekkep"], dogru: "Yazmak → yazı" },
    // Atasözleri ve Deyimler
    { soru: "Atasözü özelliği nedir?", secenekler: ["Deneyim ve öğüt", "Sadece betimleme", "Sadece bilgi", "Sadece komik"], dogru: "Deneyim ve öğüt" },
    { soru: "Deyim özelliği nedir?", secenekler: ["Konusuna göre anlam", "Söz dizimi", "Yazım kuralları", "Noktalama"], dogru: "Konusuna göre anlam" },
    { soru: "'Damlaya damlaya göl olur' neyi ifade eder?", secenekler: ["Birikimin önemini", "Hızın önemini", "Gücün önemini", "Zamanın önemini"], dogru: "Birikimin önemini" },
    { soru: "'Teneke gürler' deyimi neyi ifade eder?", secenekler: ["Boş konuşma", "Güzel konuşma", "Hızlı konuşma", "Yavaş konuşma"], dogru: "Boş konuşma" },
    { soru: "'Kör göze parmak sokmak' deyimi neyi ifade eder?", secenekler: ["Açıkça söylemek", "Gizli söylemek", "Yavaş söylemek", "Hızlı söylemek"], dogru: "Açıkça söylemek" }
  ]
}

type Durum = "basla" | "oyun" | "sonuc"

export function TYTQuizOyunu() {
  const [durum, setDurum] = useState<Durum>("basla")
  const [kategori, setKategori] = useState<string>("")
  const [soru, setSoru] = useState<Soru | null>(null)
  const [sorular, setSorular] = useState<Soru[]>([])
  const [mevcutSoru, setMevcutSoru] = useState(0)
  const [dogruCevaplar, setDogruCevaplar] = useState(0)
  const [yanlislar, setYanlislar] = useState<Array<{ soru: string; dogru: string; secim: string }>>([])
  const [bestScores, setBestScores] = useState<{ [key: string]: number }>({})
  const [sonSkorlar, setSonSkorlar] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const savedBest = localStorage.getItem("tyt2QuizBest")
    const savedLast = localStorage.getItem("tyt2QuizSon")
    if (savedBest) setBestScores(JSON.parse(savedBest))
    if (savedLast) setSonSkorlar(JSON.parse(savedLast))
  }, [])

  const kategoriSec = (secilenKategori: string) => {
    const kategoriSorulari = [...quizVerisi[secilenKategori]]
    // Soruları karıştır ve ilk 10'unu al
    const karistirilmis = kategoriSorulari.sort(() => Math.random() - 0.5).slice(0, 10)

    setKategori(secilenKategori)
    setSorular(karistirilmis)
    setMevcutSoru(0)
    setDogruCevaplar(0)
    setYanlislar([])
    setSoru(karistirilmis[0])
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
    const skor = dogruCevaplar * 10
    const guncelBest = { ...bestScores }
    const guncelSon = { ...sonSkorlar }

    if (!guncelBest[kategori] || skor > guncelBest[kategori]) {
      guncelBest[kategori] = skor
    }
    guncelSon[kategori] = skor

    setBestScores(guncelBest)
    setSonSkorlar(guncelSon)

    localStorage.setItem("tyt2QuizBest", JSON.stringify(guncelBest))
    localStorage.setItem("tyt2QuizSon", JSON.stringify(guncelSon))

    setDurum("sonuc")
  }

  const kategoriAdi = (kat: string) => {
    const adlar: { [key: string]: string } = {
      fizik: "⚛️ Fizik",
      kimya: "🧪 Kimya",
      biyoloji: "🧬 Biyoloji",
      turkce: "📚 Türkçe"
    }
    return adlar[kat] || kat
  }

  if (durum === "basla") {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">🎓 TYT Quiz - Fen ve Türkçe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(quizVerisi).map((kat) => (
              <Button
                key={kat}
                onClick={() => kategoriSec(kat)}
                variant="outline"
                className="h-16 text-base font-semibold dark:border-gray-600 dark:hover:bg-gray-700 justify-start px-4"
              >
                <span className="mr-2">{kategoriAdi(kat)}</span>
                <span className="ml-auto text-xs font-normal text-muted-foreground">
                  {quizVerisi[kat].length} soru havuzundan 10
                </span>
              </Button>
            ))}
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
            <CardTitle className="dark:text-white text-lg">{kategoriAdi(kategori)}</CardTitle>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {mevcutSoru + 1}/{sorular.length}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center py-3">
            <p className="text-base font-medium dark:text-gray-200 mb-4">{soru.soru}</p>
            <div className="space-y-2">
              {secenekler.map((secenek, i) => (
                <Button
                  key={i}
                  onClick={() => cevapVer(secenek)}
                  variant="outline"
                  className="w-full h-12 text-left px-3 text-sm dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <span className="mr-2 font-bold text-muted-foreground text-xs">{String.fromCharCode(65 + i)})</span>
                  <span className="text-xs">{secenek}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (durum === "sonuc") {
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
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {kategoriAdi(kategori)}
            </p>
          </div>

          {yanlislar.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold dark:text-gray-200 text-sm">Yanlış Yapılanlar:</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {yanlislar.map((hata, i) => (
                  <div key={i} className="text-xs border-b dark:border-gray-700 pb-1">
                    <p className="font-medium dark:text-gray-200">{hata.soru}</p>
                    <p className="text-red-600 dark:text-red-400">Seçimin: {hata.secim}</p>
                    <p className="text-green-600 dark:text-green-400">Doğru: {hata.dogru}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setDurum("basla")} variant="outline" className="text-sm">
              Ana Menü
            </Button>
            <Button onClick={() => kategoriSec(kategori)} className="text-sm">
              Tekrar Oyna
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
