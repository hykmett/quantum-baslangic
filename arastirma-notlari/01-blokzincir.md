### BLOKZİNCİR TEMELLERİ
## İP-1

# Blokzincir, işlem, blok ve dağıtık defter nedir? Birbirleriyle nasıl ilişkilidir?
Blokzincir (Blockchain): Blokların kriptografik  yöntemlerle kronolojik olarak birbirine zincirlenmesiyle oluşan değiştirilemez veri tabanıdır. Her blok bir öncekine şifresel olarak bağlı olduğu için, geçmişteki tek bir işlem kaydını bile değiştirmek sonraki tüm blokların şifresini bozacağından sistemin geriye dönük manipüle edilmesini imkansız hale getirir.

İşlem (Transaction): Sisteme kaydedilmek istenen en küçük veri veya eylem birimidir. Kripto para transferleri , akıllı sözleşme emirleri, bir ürünün tedarik zincirindeki hareket kaydı veya dijital bir kimlik doğrulaması birer işlemdir.

Blok (Block): Belirli bir zaman diliminde gerçekleşen onaylanmış işlemlerin bir arada toplandığı dijital paketlerdir. Her blok, içinde barındırdığı işlem verilerinin yanı sıra kendisinden önce gelen bloğun benzersiz şifre kodunu (özet/hash) ve bloğun ne zaman oluşturulduğunu gösteren bir zaman damgasını taşır.

 Dağıtık Defter(DLT):
 Verilerin tek bir merkez yerine, ağdaki tüm katılımcılarda (bilgisayarlarda/düğümlerde) eş zamanlı ve senkronize bir şekilde tutulduğu kayıt sistemidir. Merkezi bir otorite (banka, hükümet veya şirket) yoktur; ağdaki herkes defterin güncel bir kopyasına sahiptir ve yeni kayıtlar ortak bir mutabakat  mekanizmasıyla onaylanır.

İlişkinin Çalışma Döngüsü:
1. Kullanıcılar ağ üzerinde bir işlem başlatır.
2. Ağdaki bilgisayarlar bu işlemleri toplar, doğrular ve bir blok içerisine paketler.
3. Oluşturulan yeni blok, kriptografik şifrelerle bir önceki bloğun arkasına eklenerek blokzincir ağını günceller.
4. Güncellenen bu zincir yapısı, ağa bağlı olan tüm katılımcılara aynı anda dağıtılarak dağıtık defter üzerinde senkronize edilir.

 ----KRİTİK NOT----
 Her blokzincir bir dağıtık defterdir (DLT), ancak her dağıtık defter bir blokzincir olmak zorunda değildir. Blokzincir, verileri doğrusal bloklar halinde şifreleyerek tutan özel bir DLT türüdür. Bazı dağıtık defter teknolojileri (örneğin DAG veya Holochain) verileri bloklar halinde veya zincir yapısıyla saklamadan da dağıtık mimariyi kullanabilirler.


# Merkezi veritabanıyla blokzincir arasında kayıt kontrolü ve güven açısından ne fark vardır?

Merkezi veritabanları ile blokzincir teknolojisi arasındaki en temel fark, güvenin kime veya neye emanet edildiğidir. Merkezi sistemlerde güven tek bir kuruma, otoriteye veya sunucuya (insana ve şirketlere) emanet edilirken; blokzincirde güven matematiğe, şifreleme bilimine (kriptografi) ve konsensüs kurallarına emanet edilir.

Kayıt yetkisi, merkezi veritabanında tek bir merkezde veya yöneticidedir;
blokzincirde ise tüm ağ katılımcılarına (düğümlere) dağıtılmıştır.

Veri değiştirilebilirliği, merkezi veritabanında CRUD(oluştur,oku,güncelle, sil) yetkisi vardır; blokzincirde ise yalnızca eklenebilir(Sadece okuma ve yazma vardır, silme/güncelleme yoktur.)


Kayıt Kontrolü Açısından Farklar

• Yetki Dağılımı: Merkezi bir veritabanında, bir "Veritabanı Yöneticisi" (DBA) tam yetkiye sahiptir. Bu yönetici veya sisteme sızan bir saldırgan, geçmişe dönük bir veriyi değiştirebilir, silebilir veya sahte bir kayıt ekleyebilir. Blokzincirde ise kayıt kontrolü hiçbir bireyin veya kurumun elinde değildir. Yeni bir kaydın eklenebilmesi için ağdaki bilgisayarların çoğunluğunun (örneğin %51'inin) ortak kurallara göre onay (konsensüs) vermesi gerekir.

• Değiştirilemezlik (Immutability): Merkezi veritabanlarında veriler dinamiktir; güncellenebilir ve silinebilir. Blokzincirde ise bir veri bloğu zincire eklendikten sonra asla silinemez ve üzerinde değişiklik yapılamaz. Eğer bir hata yapıldıysa, bunu düzeltmek için eski veri silinmez, hatayı düzelten "yeni bir işlem kaydı" eklenir. Böylece paranın veya varlığın ilk günden itibaren tüm hareket geçmişi şeffafça görülür.

Güvenlik açısından farklar:
Merkezi veri tabanını sabote etmek için tek bir merkez vardır. Burası ele geçirildiğinde tüm sistem çöker. Blokzincirde ise veri, dünya geneline yayılmış binlerce bilgisayarda(node) aynı anda tutulur. Sistemi sabote etmek isteyen birisi, dünyadaki binlerce bilgisayarın çoğunu aynı anda hacklemesi gerekir. Bu hem pratik olarak hem de maliyet açısından imkansızdır. Merkezi sistemlerde en büyük risklerden birisi içeriden yapılacak suistimallerdir.
Blokzincir mutlak güvenlik ve güvenilirlik sunsa da her işlemin binlerce bilgisayar tarafından tek tek onaylanması ve kaydedilmesi gerektiğinden merkezi veritabanlarına göre çok daha yavaş ve maliyetlidir. 

KISACA:
• Merkezi Veritabanları; yüksek hız, saniyede milyonlarca işlem kapasitesi ve kolay güncellenebilirlik gerektiren durumlar (örneğin sosyal medya platformları, e-ticaret siteleri, hızlı müşteri kayıt sistemleri) için idealdir.
• Blokzincir ise; hızdan ziyade mutlak güvenlik, şeffaflık, değiştirilemezlik ve taraflar arasında sıfır güven ilişkisi gerektiren durumlar (örneğin kripto paralar, tapu ve sicil kayıtları, uluslararası lojistik takibi, dijital kimlikler) için mükemmeldir.



# • Geçmiş işlemin kaydı ile sözleşmede tutulan güncel değerin değişmesi nasıl ayrılır?
Aralarındaki temel fark:
- Geçmiş işlem kaydı: Ne oldu, hangi işlem ne zaman gerçekleşti?
- Güncel sözleşme değeri: Şu anda sistemde hangi durum geçerli?

Geçmiş İşlemlerin Kaydı (Ledger / Günlük Defteri): Blokzincir üzerindeki tüm transferlerin, emirlerin ve olayların kronolojik olarak alt alta yazıldığı salt okunur ve değiştirilemez bir tarih günlüğüdür.

Güncel Değer: Sistemin şu anki anlık fotoğrafıdır. Akıllı sözleşmelerin içindeki değişkenlerin en son değerlerini, hangi cüzdanda o an kaç adet token olduğunu gösteren güncel veridir.


KISACA:Geçmiş işlem kaydı, sistemde daha önce gerçekleşen işlemleri gösterir. Sözleşmede tutulan güncel değer ise bu işlemler sonucunda oluşan mevcut durumu ifade eder. 

#  Bir etkinlik kayıt sisteminde blokzincir kullanmanın yararı ve ek maliyeti ne olabilir?
AVANTAJLARI:
Sahte Biletlerin Sıfırlanması:
** Her bilet, benzersiz bir dijital varlık (NFT veya akıllı sözleşme kaydı) olarak blokzincire işlenir. Bu sayede aynı QR kodunun kopyalanıp birden fazla kişiye satılması (sahtecilik) imkansız hale gelir.

• Doğrudan ve Güvenli İade Süreçleri:
** Etkinliğin iptal edilmesi veya ertelenmesi durumunda, akıllı sözleşmeler aracı kurumları (bilet satış firmalarını) aradan kaldırarak iade ücretlerini saniyeler içinde doğrudan bilet sahiplerinin dijital cüzdanlarına aktarabilir.


Katılımcı Verilerinin Gizliliği ve Güvenliği: 
**Merkezi bilet firmalarının hacklenmesi sonucu milyonlarca kullanıcının kredi kartı ve kimlik bilgileri sızdırılabilmektedir.• Blokzincirde ise kullanıcılar sisteme kriptografik cüzdan adresleriyle bağlanır. Kişisel veriler doğrudan zincir üstünde tutulmak zorunda kalmadığı için veri sızıntısı riski minimuma iner.


DEZAVANTAJLARI:
İşlem Ücretleri (Gas Fees):
** Blokzincirde yapılan her işlem (bilet basımı, biletin bir başkasına devredilmesi, kayıt güncellemesi) ağdaki bilgisayarların çalışması için bir işlem ücreti gerektirir.

Hız ve Ölçeklenebilirlik Sorunu:
**Dünyaca ünlü bir sanatçının konser biletleri satışa çıktığında, saniyede on binlerce insan aynı anda bilet almaya çalışır. Merkezi veritabanları bu yoğunluğu güçlü sunucularla kaldırabilirken, halka açık blokzincirler saniyedeki işlem kapasitesi (TPS) sınırları nedeniyle kilitlenebilir. Bu da kötü bir kullanıcı deneyimine yol açar.

Kullanıcı Deneyimi Zorluğu (UX Maliyeti): Teknolojik okuryazarlığı düşük olan sıradan bir etkinlik katılımcısına dijital cüzdan açtırmak, gizli kelimeleri saklatmak veya cüzdana işlem ücreti için kripto para yükletmek oldukça zordur.

KISACA:Eğer yerel, küçük ölçekli ve bilet hırsızlığı riski olmayan bir etkinlik yapılıyorsa, blokzincir kullanmak gereksiz bir maliyet ve teknolojik yük olacaktır.
Ancak dünya çapında turneler, karaborsanın çok güçlü olduğu büyük festivaller veya biletlerin prestij/üyelik (NFT) unsuru taşıdığı özel etkinlikler söz konusuysa; sahteciliği önlemek, ikinci el piyasasını kontrol etmek ve telif geliri elde etmek için blokzincir tabanlı bir sistem kurmanın getireceği finansal fayda, ek teknolojik maliyetleri fazlasıyla karşılayacaktır.

# Hangi durumlarda normal veritabanını tercih ederim?
Eğer projemde veriyi yazacak birden fazla ve birbirine güvenmeyen taraflar yoksa, verilerin zaman zaman silinmesi veya güncellenmesi gerekiyorsa, milisaniyeler mertebesinde hız kritikse normal bir veritabanını tercih ederim. 


## İP-2

## D · Kendi Etkinlik Sözleşmeni Geliştir

### İP-20 · İlk Etkinlik Kaydını Oluştur

[EtkinlikKaydi.sol](../src/EtkinlikKaydi.sol) tek bir etkinliği temsil ediyor. Etkinliğin adı **Quantum Atölyesi**. Takma adlar, cüzdan adresini metne eşleyen `takmaAdlar` mapping’inde sözleşme durumuna yazılıyor. `kaydol` fonksiyonu adres parametresi almıyor. Yazılacak kaydın anahtarı olarak `msg.sender`, yani çağrıyı yapan adres kullanılıyor. `public` tanımı sayesinde Solidity, herhangi bir adresin kaydını okumak için `takmaAdlar(adres)` fonksiyonunu otomatik oluşturuyor.

#### Remix VM deneyi

İlk yerel hesabın (`…eddC4`) `kaydol(string)` işlemi Remix VM’de 2. blokta başarıyla tamamlandı. Kaydın içeriğini `takmaAdlar` ile ayrıca okuyacağım.

Sözleşmeyi Remix’te derledim ve Remix VM’de dağıttım. Terminalde `EtkinlikKaydi.(constructor)` işlemi için **Transaction mined and execution completed** durumunu gördüm. Yerel sözleşme adresi `0xd9145CCE52D386f254917e481eB44e9943F39138`.

1. `EtkinlikKaydi.sol` dosyasını Remix’te aç ve Solidity Compiler ile derle.
2. **Deploy & Run Transactions** panelinde **Remix VM** ortamını ve **EtkinlikKaydi** sözleşmesini seç. **Deploy** ile yerel bir örnek oluştur.
3. İlk yerel hesabın adresini kopyala ve `kaydol` ile `mavi` takma adını yaz. Aynı sözleşme örneğinde ikinci yerel hesaba geç, adresini kopyala ve `kaydol` ile `yesil` takma adını yaz.
4. Aynı sözleşmede `takmaAdlar` ile iki adresi ayrı ayrı sorguladım. Remix’in **decoded output** alanında ilk yerel hesap (`…eddC4`) için `mavi`, ikinci yerel hesap (`…35cb2`) için `yesil` döndüğünü doğruladım. Böylece iki takma adın kendi adresleri altında saklandığını gördüm.

**Benim yorumum.** İlk sürüm boş veya çok uzun takma adlara izin veriyor. Farklı adresler aynı takma adı kullanabiliyor. Bir adres yeniden kaydolursa önceki takma adın üzerine yazılıyor. Boş metin kaydı ile hiç kayıt yapılmamış bir adres okumada aynı sonucu veriyor.

### İP-21 · Kapasite ve Kayıt Kurallarını Ekle

[EtkinlikKaydiV2.sol](../src/EtkinlikKaydiV2.sol) boş takma adı ve bir adresin ikinci kaydını reddeder. Kapasite üçtür. Toplamı `kayitSayisi()` ile okuyabilirim. Sözleşme, takma adı yazmadan ve sayacı artırmadan önce tüm kuralları kontrol eder. İP-20 sürümü [EtkinlikKaydi.sol](../src/EtkinlikKaydi.sol) dosyasında duruyor.

#### Remix VM deneyi

`EtkinlikKaydiV2.sol` dosyasını Remix’te derleyip **Remix VM** ortamında dağıttım. Kabul ve ret sonuçlarını aşağıda kaydettim.

| Deneme | Beklenen sonuç | Remix VM gözlemi |
| --- | --- | --- |
| İlk yerel hesapla `mavi` | Kabul, toplam 1 | Kabul. `kayitSayisi()` 1 döndürdü. |
| İlk hesapla tekrar `turkuaz` | Ret, toplam 1 | Remix VM işlemi `Bu adres zaten kayitli` hatasıyla geri aldı. Ardından `kayitSayisi()` yine 1 döndürdü. |
| İkinci yerel hesapla boş metin | Ret, toplam 1 | İşlem `Takma ad bos olamaz` hatasıyla geri alındı. İşlem geri alındığı için sayaç 1 kaldı. |
| İkinci ve üçüncü geçerli kayıt | Kabul, toplam 3 | Son sayaç okuması 3 döndürdü. |
| Farklı bir hesapla `sari` | Ret, toplam 3 | `…cabaB` hesabının işlemi `Etkinlik kapasitesi dolu` hatasıyla geri alındı. Ardından `kayitSayisi()` 3 döndürdü. |

**Benim yorumum.** Bir kişi birden fazla cüzdan adresi oluşturabilir ve her adresle ayrı kayıt yapabilir. Sözleşme çağrıyı yapan adresi bildiği için kapasite üç farklı adresle sınırlıdır. Gerçek kişi sayısını doğrulamak için ayrıca kimlik doğrulaması gerekir.
