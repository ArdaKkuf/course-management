"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Soru {
  soru: string
  secenekler: string[]
  dogru: string
  aciklama?: string
}

interface QuizData {
  [key: string]: Soru[]
}

const quizVerisi: QuizData = {
  felsefe: [
    {
      soru: "İlk Türk filozof kimdir?",
      secenekler: ["Farabi", "Yunus Emre", "Hoca Ahmet Yesevi", "Mevlana"],
      dogru: "Hoca Ahmet Yesevi"
    },
    {
      soru: "'Bilgi doğrudur' öğretisine hangi okul aittir?",
      secenekler: ["Stoacılık", "Epikürosçuluk", "Elea Okulu", "Akademi"],
      dogru: "Elea Okulu"
    },
    {
      soru: "İlk Çağ'da 'Neden' sorusu ile ilgilenen bilim dalı hangisidir?",
      secenekler: ["Fizik", "Metafizik", "Etik", "Mantık"],
      dogru: "Metafizik"
    },
    {
      soru: "'İnsan her şeyin ölçüsüdür' söylediği düşünür kimdir?",
      secenekler: ["Sokrates", "Platon", "Aristoteles", "Protagoras"],
      dogru: "Protagoras"
    },
    {
      soru: "İslam felsefesinin kurucusu kabul edilen filozof kimdir?",
      secenekler: ["İbn-i Sina", "Kindi", "Farabi", "Gazali"],
      dogru: "Kindi"
    },
    {
      soru: "'Mağara Alegorisi' hangi filozofa aittir?",
      secenekler: ["Sokrates", "Platon", "Aristoteles", "Plotinos"],
      dogru: "Platon"
    },
    {
      soru: "'Mutlak akıl' kavramını ilk kullanan filozof kimdir?",
      secenekler: ["Farabi", "İbn-i Sina", "İbn Rüşd", "Kindi"],
      dogru: "Farabi"
    },
    {
      soru: "'Tanzimat' döneminde Batı felsefesini Türkçeye kazandıran düşünür kimdir?",
      secenekler: ["Şinasi", "Namık Kemal", "Ziya Paşa", "Ali Suavi"],
      dogru: "Şinasi"
    },
    {
      soru: "'Bilgi horsemu doğrudur' öğretisine hangi felsefe sistemi aittir?",
      secenekler: ["Rasyonalizm", "Ampirizm", "Kritisizm", "Dogmatizm"],
      dogru: "Ampirizm"
    },
    {
      soru: "'Ahlak' kavramını 'erdem' ile açıklayan felsefe öğretisi hangisidir?",
      secenekler: ["Utilitaryenizm", "Erdem ahlakı", "Görecilik ahlakı", "Ödev ahlakı"],
      dogru: "Erdem ahlakı"
    },
    {
      soru: "'Bana bir fikir ver, seni dünyaları ihya edeyim' düşüncesini savunan filozof kimdir?",
      secenekler: ["Descartes", "Platon", "Aristoteles", "Leibniz"],
      dogru: "Descartes"
    },
    {
      soru: "'Mutlak hakikat' kavramı hangi felsefe döneminde önem kazanmıştır?",
      secenekler: ["Antik Çağ", "Orta Çağ", "Modern Çağ", "Çağdaş Çağ"],
      dogru: "Antik Çağ"
    },
    {
      soru: "'Bilginin kaynağı duyular değil, akıldır' görüşünü savunan akım hangisidir?",
      secenekler: ["Ampirizm", "Rasyonalizm", "Kritisizm", "Existansiyalizm"],
      dogru: "Rasyonalizm"
    },
    {
      soru: "'Dünyanın merkezi insan'dır' görüşü hangi felsefi akımla ilişkilidir?",
      secenekler: ["Hümanizm", "Skolastik", "Dogmatizm", "Septisizm"],
      dogru: "Hümanizm"
    },
    {
      soru: "'Zorunlu olarak var olan varlık' tanımı hangi kavrama aittir?",
      secenekler: ["Mümkün varlık", "Zorunlu varlık", "Mümkün olmayan", "Mutlak varlık"],
      dogru: "Zorunlu varlık"
    },
    {
      soru: "İlk Türk-İslam filozofu kabul edilen düşünür kimdir?",
      secenekler: ["Farabi", "Kindi", "İbn-i Sina", "Gazali"],
      dogru: "Kindi"
    },
    {
      soru: "'Sicillü'l-İhtimac' adlı eserin yazarı kimdir?",
      secenekler: ["Farabi", "İbn-i Sina", "İbn Rüşd", "Kindi"],
      dogru: "Farabi"
    },
    {
      soru: "'Tevhid' kavramını felsefi açıdan açıklayan ilk Türk düşünür kimdir?",
      secenekler: ["Hoca Ahmet Yesevi", "Yunus Emre", "Mevlana", "Ahi Evran"],
      dogru: "Hoca Ahmet Yesevi"
    },
    {
      soru: "'Muasıra medeniyet' düşüncesini savunan Tanzimat dönemi düşünür kimdir?",
      secenekler: ["Şinasi", "Namık Kemal", "Ziya Paşa", "Ali Suavi"],
      dogru: "Şinasi"
    },
    {
      soru: "'Bilgi tecrübedir' görüşünü savunan filozof kimdir?",
      secenekler: ["Descartes", "Locke", "Kant", "Hegel"],
      dogru: "Locke"
    },
    {
      soru: "'Ahlak taklit edilir' görüşü hangi felsefi sisteme aittir?",
      secenekler: ["Erdem ahlakı", "Ödev ahlakı", "Utilitaryenizm", "Görecilik ahlakı"],
      dogru: "Ödev ahlakı"
    },
    {
      soru: "'Sanat sanat içindir' görüşü hangi sanat anlayışına aittir?",
      secenekler: ["Sanatçının özgürlüğü", "Yaratıcılık", "Taklitçilik", "Anlatıcılık"],
      dogru: "Sanatçının özgürlüğü"
    },
    {
      soru: "'Devlet bir zorunluluktur' düşüncesini savunan filozof kimdir?",
      secenekler: ["Platon", "Aristoteles", "Hobbes", "Locke"],
      dogru: "Hobbes"
    },
    {
      soru: "'Tanrı'nın varlığı ontolojik kanıt' hangi filozofa aittir?",
      secenekler: ["Aziz Augustinus", "Aziz Thomas", "Descartes", "Leibniz"],
      dogru: "Aziz Thomas"
    },
    {
      soru: "'Mutlak özne' kavramı hangi felsefi akımla ilişkilidir?",
      secenekler: ["Materyalizm", "İdealizm", "Existansiyalizm", "Pragmatizm"],
      dogru: "İdealizm"
    },
    {
      soru: "'Güzel zevk konusudur' hangi felsefi disiplinle ilgilidir?",
      secenekler: ["Estetik", "Etik", "Politika", "Metafizik"],
      dogru: "Estetik"
    },
    {
      soru: "'İnsan kendi varlığını seçerek belirler' düşüncesini savunan filozof kimdir?",
      secenekler: ["Sartre", "Camus", "Heidegger", "Kierkegaard"],
      dogru: "Sartre"
    },
    {
      soru: "'Saf aklın eleştirisi' eseri hangi filozofa aittir?",
      secenekler: ["Descartes", "Locke", "Kant", "Hegel"],
      dogru: "Kant"
    },
    {
      soru: "'Tarih akıl dışıdır' görüşü hangi felsefi akıma aittir?",
      secenekler: ["Rasyonalizm", "Ampirizm", "Kritisizm", "Existansiyalizm"],
      dogru: "Existansiyalizm"
    },
    {
      soru: "'Var olan her şey mantıksaldır' felsefesine inanan filozof kimdir?",
      secenekler: ["Heraclitus", "Parmenides", "Demokritos", "Anaximandros"],
      dogru: "Parmenides"
    },
    {
      soru: "'Değişim tek ilkedir' düşüncesini savunan filozof kimdir?",
      secenekler: ["Heraclitus", "Parmenides", "Demokritos", "Anaximandros"],
      dogru: "Heraclitus"
    },
    {
      soru: "'Rüya tabirleri' ile ünlü Türk düşünür kimdir?",
      secenekler: ["Hoca Ahmet Yesevi", "Yunus Emre", "Mevlana", "Ahi Evran"],
      dogru: "Hoca Ahmet Yesevi"
    },
    {
      soru: "'Dinde sadeleşme' hareketini başlatan Türk düşünür kimdir?",
      secenekler: ["Hoca Ahmet Yesevi", "Yunus Emre", "Mevlana", "Ahi Evran"],
      dogru: "Yunus Emre"
    },
    {
      soru: "'Vahdet-i Vücut' anlayışını savunan Türk filozof kimdir?",
      secenekler: ["Yunus Emre", "Mevlana", "Hoca Ahmet Yesevi", "Ahi Evran"],
      dogru: "Yunus Emre"
    },
    {
      soru: "'Mevlânâ' hangi felsefi düşüncenin temsilcisi olarak bilinir?",
      secenekler: ["Vahdet-i Vücut", "Vahdet-i Varlık", "İnsan-ı Kamil", "Rububiyet"],
      dogru: "Vahdet-i Varlık"
    },
    {
      soru: "'Hikmet' kelimesinin anlamı nedir?",
      secenekler: ["Bilgelik", "Felsefe", "Din", "Sanat"],
      dogru: "Bilgelik"
    },
    {
      soru: "'İlm-i Kelam' hangi felsefi disiplinin İslam dünyasındaki adıdır?",
      secenekler: ["Metafizik", "Teoloji", "Etik", "Politika"],
      dogru: "Teoloji"
    },
    {
      soru: "'Kelamcılar' öncelikle hangi konuyla ilgilenirler?",
      secenekler: ["Varlık", "Bilgi", "Ahlak", "Tanrı'nın varlığı"],
      dogru: "Tanrı'nın varlığı"
    },
    {
      soru: "'Müspet hareket' felsefesi hangi akıma aittir?",
      secenekler: ["Materyalizm", "İdealizm", "Rasyonalizm", "Ampirizm"],
      dogru: "Materyalizm"
    },
    {
      soru: "'Çoktan seçmeli sınav' hangi felsefi metoda göre yapılır?",
      secenekler: ["Analitik", "Sentetik", "Diyalektik", "Hipotetik"],
      dogru: "Analitik"
    },
    {
      soru: "'Deneme-yanılma' yöntemi hangi felsefi disiplinle ilişkilidir?",
      secenekler: ["Metafizik", "Etik", "Bilgi felsefesi", "Mantık"],
      dogru: "Bilgi felsefesi"
    }
  ],
  din: [
    {
      soru: "Hz. Muhammed hangi yıl doğmuştur?",
      secenekler: ["570", "571", "572", "573"],
      dogru: "571"
    },
    {
      soru: "İslam'ın beş şartından hangisi 'İman' ile başlar?",
      secenekler: ["Namaz", "Oruç", "Hac", "Zekat"],
      dogru: "Namaz"
    },
    {
      soru: "Kur'an-ı Kerim kaç yılda indirilmiştir?",
      secenekler: ["20", "21", "22", "23"],
      dogru: "23"
    },
    {
      soru: "Hz. Muhammed'in ilk vahyini aldığı yer neresidir?",
      secenekler: ["Hira Mağarası", "Sevr Mağarası", "Thawr Mağarası", "Nemira Mağarası"],
      dogru: "Hira Mağarası"
    },
    {
      soru: "İslamiyet'te kaç tane farz namaz vardır?",
      secenekler: ["3", "4", "5", "6"],
      dogru: "5"
    },
    {
      soru: "Hicret hangi yılda gerçekleşmiştir?",
      secenekler: ["620", "622", "624", "626"],
      dogru: "622"
    },
    {
      soru: "Kur'an-ı Kerim ilk kez hangi halife ile kitap haline getirilmiştir?",
      secenekler: ["Hz. Ebu Bekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
      dogru: "Hz. Ebu Bekir"
    },
    {
      soru: "İslamiyet'te oruç hangi ayda tutulur?",
      secenekler: ["Recep", "Şaban", "Ramazan", "Muharrem"],
      dogru: "Ramazan"
    },
    {
      soru: "Hz. Muhammed'in vefat ettiği yaş kaçtır?",
      secenekler: ["60", "61", "62", "63"],
      dogru: "63"
    },
    {
      soru: "İslam'ın kutsal kitabı olan Kur'an-ı Kerim kaç sureden oluşur?",
      secenekler: ["100", "108", "114", "120"],
      dogru: "114"
    },
    {
      soru: "Hz. Muhammed hangi kabileden doğmuştur?",
      secenekler: ["Kureyş", "Hz. Muhammed", "Benu Esed", "Benu Temim"],
      dogru: "Kureyş"
    },
    {
      soru: "İslam'ın ilk müezzini kimdir?",
      secenekler: ["Bilal-i Habeşi", "Ömer bin Hattab", "Ali bin Ebu Talib", "Hz. Ebu Bekir"],
      dogru: "Bilal-i Habeşi"
    },
    {
      soru: "Kur'an-ı Kerim'in ilk inmeye başladığı ay hangisidir?",
      secenekler: ["Ramazan", "Kadir", "Recep", "Muharrem"],
      dogru: "Kadir"
    },
    {
      soru: "İslamiyet'in beş şartı hangi sırayla sıralanır?",
      secenekler: ["Şehadet, Namaz, Oruç, Zekat, Hac", "Şehadet, Oruç, Namaz, Zekat, Hac", "Şehadet, Zekat, Namaz, Oruç, Hac", "Şehadet, Namaz, Zekat, Oruç, Hac"],
      dogru: "Şehadet, Namaz, Oruç, Zekat, Hac"
    },
    {
      soru: "Hac ibadeti hangi aylarda yapılır?",
      secenekler: ["Recep-Şaban-Ramazan", "Zilkade-Zilhice", "Muharrem-Safar", "Ramazan-Şevval"],
      dogru: "Zilkade-Zilhice"
    },
    {
      soru: "Zekat hangi zenginliklere verilir?",
      secenekler: ["Altın, Gümüş, Ticari mallar", "Ev, Arsa, Araç", "Altın, Gümüş, Ev", "Ticari mallar, Araç, Arsa"],
      dogru: "Altın, Gümüş, Ticari mallar"
    },
    {
      soru: "Kur'an-ı Kerim'i Hz. Muhammed'in vahiy kâtibi kimdir?",
      secenekler: ["Hz. Ali", "Hz. Ömer", "Zeyd bin Harise", "Hz. Ebu Bekir"],
      dogru: "Zeyd bin Harise"
    },
    {
      soru: "İslamiyet'in ilk savaşı hangisidir?",
      secenekler: ["Badr", "Uhud", "Hendek", "Huneyn"],
      dogru: "Badr"
    },
    {
      soru: "Hz. Muhammed hangi yılda vefat etmiştir?",
      secenekler: ["630", "631", "632", "633"],
      dogru: "632"
    },
    {
      soru: "İslam'da 'Aşere-i Mübeşşere' nedir?",
      secenekler: ["10 garantili cennetlik sahabe", "12 halife", "4 halife", "7 büyük sahabe"],
      dogru: "10 garantili cennetlik sahabe"
    },
    {
      soru: "Hz. Ebu Bekir'in hilafeti kaç yıl sürmüştür?",
      secenekler: ["1 yıl", "2 yıl", "3 yıl", "4 yıl"],
      dogru: "2 yıl"
    },
    {
      soru: "Hz. Ömer hangi yılda şehit edilmiştir?",
      secenekler: ["642", "643", "644", "645"],
      dogru: "644"
    },
    {
      soru: "Hz. Osman döneminde Kur'an-ı Kerim nasıl bir araya getirilmiştir?",
      secenekler: ["Tek bir nüsha olarak", "4 nüsha olarak", "7 nüsha olarak", "Sözlü olarak"],
      dogru: "Tek bir nüsha olarak"
    },
    {
      soru: "Hz. Ali'nin hilafeti kaç yıl sürmüştür?",
      secenekler: ["3 yıl", "4 yıl", "5 yıl", "6 yıl"],
      dogru: "4 yıl"
    },
    {
      soru: "Kerbela olayı hangi yılda gerçekleşmiştir?",
      secenekler: ["680", "681", "682", "683"],
      dogru: "680"
    },
    {
      soru: "İslamiyet'te 'Şirk' nedir?",
      secenekler: ["Allah'ı ortak koşmak", "İnançsızlık", "Günah işlemek", "Dinden çıkmak"],
      dogru: "Allah'ı ortak koşmak"
    },
    {
      soru: "İslam'da 'Kıyamet' nedir?",
      secenekler: ["Dünyanın sonu", "Savaş", "Hesap günü", "Ahiret hayatı"],
      dogru: "Dünyanın sonu"
    },
    {
      soru: "Kur'an-ı Kerim'de en çok zikredilen peygamber kimdir?",
      secenekler: ["Hz. Musa", "Hz. İsa", "Hz. Muhammed", "Hz. İbrahim"],
      dogru: "Hz. Musa"
    },
    {
      soru: "İslamiyet'te 'Cuma namazı' kaç rekat'tır?",
      secenekler: ["2 rekat", "4 rekat", "6 rekat", "8 rekat"],
      dogru: "2 rekat"
    },
    {
      soru: "Kur'an-ı Kerim'in en uzun suresi hangisidir?",
      secenekler: ["Bakara", "Ali İmran", "Nisa", "Maide"],
      dogru: "Bakara"
    },
    {
      soru: "Kur'an-ı Kerim'in en kısa sureti hangisidir?",
      secenekler: ["Kevser", "İhlas", "Felak", "Nas"],
      dogru: "Kevser"
    },
    {
      soru: "İslam'da 'Ezan' ne demektir?",
      secenekler: ["Namaz çağrısı", "İftar çağrısı", "Hac çağrısı", "Zekat çağrısı"],
      dogru: "Namaz çağrısı"
    },
    {
      soru: "Hz. Muhammed'in first eşi kimdir?",
      secenekler: ["Hatice", "Aişe", "Zeynep", "Hafsa"],
      dogru: "Hatice"
    },
    {
      soru: "İslamiyet'te 'Bayram' kaç gündür?",
      secenekler: ["1 gün", "2 gün", "3 gün", "4 gün"],
      dogru: "3 gün"
    },
    {
      soru: "Kur'an-ı Kerim'de kaç sure başı with 'Bismillah' ile başlar?",
      secenekler: ["113", "114", "115", "116"],
      dogru: "113"
    },
    {
      soru: "İslam'da 'Miraç' nedir?",
      secenekler: ["Hz. Muhammed'in göğe yükselişi", "Hicret", "Vahiy", "Savaş"],
      dogru: "Hz. Muhammed'in göğe yükselişi"
    },
    {
      soru: "Hz. Muhammed kaç yaşında peygamberlikle görevlendirilmiştir?",
      secenekler: ["38", "39", "40", "41"],
      dogru: "40"
    },
    {
      soru: "İslamiyet'te 'Teravih' namazı kaç rekat'tır?",
      secenekler: ["8 rekat", "20 rekat", "23 rekat", "36 rekat"],
      dogru: "20 rekat"
    },
    {
      soru: "Kur'an-ı Kerim hangi dilde indirilmiştir?",
      secenekler: ["Arapça", "Farsça", "Türkçe", "Latince"],
      dogru: "Arapça"
    },
    {
      soru: "İslam'da 'İtikat' nedir?",
      secenekler: ["İnanç", "İbadet", "Ahlak", "Hukuk"],
      dogru: "İnanç"
    },
    {
      soru: "Hz. Muhammed'in hayatı boyunca kaç savaş yapmıştır?",
      secenekler: ["25", "26", "27", "28"],
      dogru: "27"
    },
    {
      soru: "İslamiyet'te 'Hacc-ül Ekber' nedir?",
      secenekler: ["Büyük hac", "Küçük hac", "Umre", "Ziyaret"],
      dogru: "Büyük hac"
    }
  ],
  tarih: [
    {
      soru: "İlk Türk devleti hangisidir?",
      secenekler: ["Hun İmparatorluğu", "Göktürk Kağanlığı", "Uygur Kağanlığı", "Hazar Kağanlığı"],
      dogru: "Hun İmparatorluğu"
    },
    {
      soru: "Türklerin İslamiyeti kabul ettiği ilk devlet hangisidir?",
      secenekler: ["Karahanlılar", "Gazneliler", "Büyük Selçuklular", "Harezmşahlar"],
      dogru: "Karahanlılar"
    },
    {
      soru: "Malazgirt Savaşı hangi yılda yapılmıştır?",
      secenekler: ["1051", "1071", "1091", "1111"],
      dogru: "1071"
    },
    {
      soru: "Osmanlı Devleti'nin kurucusu kimdir?",
      secenekler: ["Osman Bey", "Orhan Bey", "Fatih Sultan Mehmet", "Yıldırım Bayezid"],
      dogru: "Osman Bey"
    },
    {
      soru: "İstanbul'un fethi hangi yılda yapılmıştır?",
      secenekler: ["1453", "1463", "1473", "1483"],
      dogru: "1453"
    },
    {
      soru: "Kurtuluş Savaşı'nın başlangıç tarihi kabul edilen olay nedir?",
      secenekler: ["Erzurum Kongresi", "Samsun'a çıkarma", "Amasya Genelgesi", "Misak-ı Milli"],
      dogru: "Samsun'a çıkarma"
    },
    {
      soru: "Türkiye Cumhuriyeti hangi yılda ilan edilmiştir?",
      secenekler: ["1920", "1921", "1922", "1923"],
      dogru: "1923"
    },
    {
      soru: "Atatürk ilkelerinden hangisi 'Cumhuriyetçilik' ile aynı anlamdadır?",
      secenekler: ["Milliyetçilik", "Halkçılık", "Cumhuriyetçilik", "Devletçilik"],
      dogru: "Cumhuriyetçilik"
    },
    {
      soru: "Saltanatın kaldırıldığı yıl hangisidir?",
      secenekler: ["1920", "1922", "1924", "1926"],
      dogru: "1922"
    },
    {
      soru: "Türkiye Büyük Millet Meclisi hangi yılda açılmıştır?",
      secenekler: ["1919", "1920", "1921", "1922"],
      dogru: "1920"
    },
    {
      soru: "Göktürk Kağanlığı'nın kurucusu kimdir?",
      secenekler: ["Bumin Kağan", "İstemi Yabgu", "Kül Tigin", "Bilge Kağan"],
      dogru: "Bumin Kağan"
    },
    {
      soru: "Türklerin kullandığı ilk yazı hangisidir?",
      secenekler: ["Göktürk Yazısı", "Uygur Yazısı", "Arap Yazısı", "Latince Yazı"],
      dogru: "Göktürk Yazısı"
    },
    {
      soru: "Uygur Kağanlığı'nın dini hangisidir?",
      secenekler: ["Budizm", "Mani din", "Tengricilik", "İslamiyet"],
      dogru: "Mani din"
    },
    {
      soru: "Hazar Kağanlığı'nın dinleri hangileridir?",
      secenekler: ["Budizm", "Tengricilik ve Musevilik", "İslamiyet", "Hristiyanlık"],
      dogru: "Tengricilik ve Musevilik"
    },
    {
      soru: "Gazneli Devleti'nin kurucusu kimdir?",
      secenekler: ["Sultan Mahmud", "Sultan Mesud", "Alptekin", "Sabuktekin"],
      dogru: "Alptekin"
    },
    {
      soru: "Büyük Selçuklu Devleti'nin kurucusu kimdir?",
      secenekler: ["Çağrı Bey", "Tuğrul Bey", "Alp Arslan", "Melikşah"],
      dogru: "Tuğrul Bey"
    },
    {
      soru: "Malazgirt Savaşı'nı kazanan Selçuklu sultanı kimdir?",
      secenekler: ["Tuğrul Bey", "Alp Arslan", "Melikşah", "Kılıç Arslan"],
      dogru: "Alp Arslan"
    },
    {
      soru: "Haçlı Seferleri'nin ilki hangi yılda başlamıştır?",
      secenekler: ["1096", "1097", "1098", "1099"],
      dogru: "1096"
    },
    {
      soru: "Osmanlı Devleti'nin başkenti ilk neresidir?",
      secenekler: ["Bursa", "Edirne", "İstanbul", "Söğüt"],
      dogru: "Söğüt"
    },
    {
      soru: "Osmanlı'nın ilk fethi ettiği şehir hangisidir?",
      secenekler: ["Bursa", "İznik", "Edirne", "İstanbul"],
      dogru: "İznik"
    },
    {
      soru: "Fatih Sultan Mehmet İstanbul'u fethettiğinde kaç yaşındadır?",
      secenekler: ["19", "20", "21", "22"],
      dogru: "21"
    },
    {
      soru: "Osmanlı'nın en büyük padişahı kimdir?",
      secenekler: ["Fatih Sultan Mehmet", "Kanuni Sultan Süleyman", "Yıldırım Bayezid", "II. Murad"],
      dogru: "Kanuni Sultan Süleyman"
    },
    {
      soru: "Kanuni Sultan Süleyman'ın saltanatı kaç yıl sürmüştür?",
      secenekler: ["40 yıl", "45 yıl", "46 yıl", "50 yıl"],
      dogru: "46 yıl"
    },
    {
      soru: "Osmanlı Devleti'nin gerileme dönemi hangi padişahla başlar?",
      secenekler: ["I. Ahmet", "II. Osman", "IV. Murad", "I. Abdülmecid"],
      dogru: "II. Osman"
    },
    {
      soru: "Viyana Kuşatması hangi yılda yapılmıştır?",
      secenekler: ["1523", "1529", "1533", "1543"],
      dogru: "1529"
    },
    {
      soru: "Osmanlı-Rus savaşları kaç kez yapılmıştır?",
      secenekler: ["10", "11", "12", "13"],
      dogru: "13"
    },
    {
      soru: "1877-1878 Osmanlı-Rus Savaşı'nın adı nedir?",
      secenekler: ["93 Harbi", "Trablusgarp Savaşı", "Balkan Savaşları", "I. Dünya Savaşı"],
      dogru: "93 Harbi"
    },
    {
      soru: "Trablusgarp Savaşı hangi yılda yapılmıştır?",
      secenekler: ["1910", "1911", "1912", "1913"],
      dogru: "1911"
    },
    {
      soru: "Balkan Savaşları hangi yıllarda yapılmıştır?",
      secenekler: ["1912-1913", "1913-1914", "1911-1912", "1914-1915"],
      dogru: "1912-1913"
    },
    {
      soru: "I. Dünya Savaşı hangi yıllarda yapılmıştır?",
      secenekler: ["1914-1918", "1915-1919", "1916-1920", "1917-1921"],
      dogru: "1914-1918"
    },
    {
      soru: "Osmanlı Devleti I. Dünya Savaşı'na hangi ittifakla katılmıştır?",
      secenekler: ["İttifak Devletleri", "İtilaf Devletleri", "Bağımsız", "Nötr"],
      dogru: "İttifak Devletleri"
    },
    {
      soru: "Kurtuluş Savaşı hangi yılda başlamıştır?",
      secenekler: ["1918", "1919", "1920", "1921"],
      dogru: "1919"
    },
    {
      soru: "Erzurum Kongresi hangi yılda yapılmıştır?",
      secenekler: ["1919", "1920", "1921", "1922"],
      dogru: "1919"
    },
    {
      soru: "Amasya Genelgesi hangi yılda ilan edilmiştir?",
      secenekler: ["1919", "1920", "1921", "1922"],
      dogru: "1919"
    },
    {
      soru: "Misak-ı Milli hangi yılda kabul edilmiştir?",
      secenekler: ["1919", "1920", "1921", "1922"],
      dogru: "1920"
    },
    {
      soru: "TBMM'nin açılış tarihi hangisidir?",
      secenekler: ["23 Nisan 1920", "19 Mayıs 1919", "29 Ekim 1923", "30 Ağustos 1922"],
      dogru: "23 Nisan 1920"
    },
    {
      soru: "Sakarya Meydan Muharebesi hangi yılda yapılmıştır?",
      secenekler: ["1920", "1921", "1922", "1923"],
      dogru: "1921"
    },
    {
      soru: "Büyük Taarruz hangi yılda başlamıştır?",
      secenekler: ["1920", "1921", "1922", "1923"],
      dogru: "1922"
    },
    {
      soru: "Türkiye Cumhuriyeti'nin ilan tarihi hangisidir?",
      secenekler: ["23 Nisan 1920", "19 Mayıs 1919", "29 Ekim 1923", "30 Ağustos 1922"],
      dogru: "29 Ekim 1923"
    },
    {
      soru: "Halifelik hangi yılda kaldırılmıştır?",
      secenekler: ["1922", "1923", "1924", "1925"],
      dogru: "1924"
    },
    {
      soru: "Şapka Kanunu hangi yılda çıkarılmıştır?",
      secenekler: ["1923", "1924", "1925", "1926"],
      dogru: "1925"
    },
    {
      soru: "Harf Devrimi hangi yılda yapılmıştır?",
      secenekler: ["1926", "1927", "1928", "1929"],
      dogru: "1928"
    },
    {
      soru: "Kadınlara seçme ve seçilme hakkı hangi yılda verilmiştir?",
      secenekler: ["1930", "1933", "1934", "1935"],
      dogru: "1934"
    },
    {
      soru: "Atatürk'ün 'Nutuk'unu okuduğu yıl hangisidir?",
      secenekler: ["1925", "1926", "1927", "1928"],
      dogru: "1927"
    },
    {
      soru: "Atatürk ilkeleri 'Altı Ok' hangi yılda kabul edilmiştir?",
      secenekler: ["1929", "1930", "1931", "1932"],
      dogru: "1931"
    },
    {
      soru: "Atatürk'ün vefat tarihi hangisidir?",
      secenekler: ["10 Kasım 1936", "10 Kasım 1937", "10 Kasım 1938", "10 Kasım 1939"],
      dogru: "10 Kasım 1938"
    }
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
    const savedBest = localStorage.getItem("tytQuizBest")
    const savedLast = localStorage.getItem("tytQuizSon")
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

    localStorage.setItem("tytQuizBest", JSON.stringify(guncelBest))
    localStorage.setItem("tytQuizSon", JSON.stringify(guncelSon))

    setDurum("sonuc")
  }

  const kategoriAdi = (kat: string) => {
    const adlar: { [key: string]: string } = {
      felsefe: "🧠 Felsefe",
      din: "🕌 Din Kültürü",
      tarih: "📜 Tarih"
    }
    return adlar[kat] || kat
  }

  if (durum === "basla") {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">📚 TYT Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {Object.keys(quizVerisi).map((kat) => (
              <Button
                key={kat}
                onClick={() => kategoriSec(kat)}
                variant="outline"
                className="h-20 text-lg font-semibold dark:border-gray-600 dark:hover:bg-gray-700 justify-start"
              >
                <span className="mr-3">{kategoriAdi(kat)}</span>
                <span className="ml-auto text-sm font-normal text-muted-foreground">
                  Her oyunda 10 soru ({quizVerisi[kat].length} havuzdan)
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
            <CardTitle className="dark:text-white">{kategoriAdi(kategori)}</CardTitle>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {mevcutSoru + 1}/{sorular.length}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="text-lg font-medium dark:text-gray-200 mb-6">{soru.soru}</p>
            <div className="space-y-2">
              {secenekler.map((secenek, i) => (
                <Button
                  key={i}
                  onClick={() => cevapVer(secenek)}
                  variant="outline"
                  className="w-full h-14 text-left px-4 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <span className="mr-3 font-bold text-muted-foreground">{String.fromCharCode(65 + i)})</span>
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
              <h4 className="font-semibold dark:text-gray-200">Yanlış Yapılanlar:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {yanlislar.map((hata, i) => (
                  <div key={i} className="text-sm border-b dark:border-gray-700 pb-2">
                    <p className="font-medium dark:text-gray-200">{hata.soru}</p>
                    <p className="text-red-600 dark:text-red-400">Seçimin: {hata.secim}</p>
                    <p className="text-green-600 dark:text-green-400">Doğru: {hata.dogru}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setDurum("basla")} variant="outline">
              Ana Menü
            </Button>
            <Button onClick={() => kategoriSec(kategori)}>
              Tekrar Oyna
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
