
# Quantum Team - Blokzincir Başlangıç Projesi

## Projenin amacı
Blokzincir teknolojisinin temellerini öğrenmek ve Ethereum üzerinde
test amaçlı bir etkinlik kayıt uygulaması geliştirmek.

## Öğrenilecek konular
- Blokzincir ve dağıtık defter
- Kriptografi ve Ethereum cüzdanları
- Git ve GitHub
- Solidity ve akıllı sözleşmeler
- Ethereum Sepolia test ağı
- Web uygulaması ve MetaMask bağlantısı

## Kullanılan araçlar
- Visual Studio Code
- Git ve GitHub
- MetaMask
- Remix IDE
- Sepolia Etherscan
- Node.js ve npm (eğitim cüzdanının bağımlılığını kurmak ve testleri çalıştırmak için)
- ethers.js (BIP39, anahtar türetme ve Ethereum adresi hesaplama için)

## İP-12 · Eğitim cüzdanını çalıştırma

1. Proje klasöründe terminali açıp `npm ci` çalıştırın. PowerShell'de gerekirse `npm.cmd ci` kullanın.
2. `index.html` dosyasını tarayıcıda açın ve **Yeni eğitim cüzdanı oluştur** düğmesine basın.
3. Her adımın altında kullanılan çağrıyı ve sonucu inceleyin. Entropi, mnemonic, seed ve özel anahtar için **Göster** düğmesini kullanın.

Cüzdan tarayıcıda oluşturulur. Uygulama gizli değerleri kaydetmez, loglamaz veya ağ üzerinden göndermez. Sayfa yenilenince cüzdan değerleri ekrandan silinir. Bu cüzdan eğitim amaçlıdır.

Türetme akışını ve BIP39 referans vektörünü kontrol etmek için `node --test wallet.test.js` çalıştırın. Referans vektörü `TREZOR` ek parolasını kullanır. Uygulamada ek parola boştur. [BIP39 referans vektörleri](https://github.com/trezor/python-mnemonic/blob/master/vectors.json)

## İP-19 · Remix ve Etherscan ile sözleşme çağrısı

Remix, derlenmiş sözleşmenin ABI’sini kullanarak bir adresin fonksiyonlarını **Deployed Contracts** panelinde gösterir. Etherscan, doğrulanmış sözleşmenin ABI’sinden **Read Contract** ve **Write Contract** formlarını oluşturur. İki arayüz de seçilen fonksiyonu ve parametrelerini işlem verisine kodlar. Yazma çağrısında MetaMask işlemi imzalar ve bağlı olduğu ağın RPC uç noktası üzerinden gönderir. Aynı Sepolia ağına, aynı sözleşme adresine ve aynı cüzdana bağlandığımda her iki arayüz de aynı sözleşme durumuyla etkileşir. Okuma çağrıları mevcut durumu sorgular ve zincire işlem göndermez. [Remix Deploy & Run](https://remix-ide.readthedocs.io/en/latest/run.html) · [Etherscan Read / Write Contract](https://info.etherscan.com/how-to-use-read-or-write-contract-features-on-etherscan/)

## İP-24 · Sepolia etkinlik uygulaması

1. Proje kökünde bağımlılıkları `npm ci` ile kur.
2. Aynı klasörde `node etkinlik/serve.js` çalıştır ve MetaMask’in kurulu olduğu tarayıcı profilinde `http://127.0.0.1:8000/etkinlik/` adresini aç.
3. **Cüzdan bağla** ile bir eğitim hesabı seç. Yazma işlemleri için MetaMask’te **Ethereum Sepolia** ağına geç. İP-23’te kayıtlı ikinci eğitim hesabıyla mevcut kaydı ve giriş durumunu görebilir, henüz kaydolmamış bir eğitim hesabıyla kalan kapasite içinde yeni kayıt deneyebilirsin.
4. Giriş onayı için İP-23’te dağıtımı yapan ilk eğitim hesabını seç. Görevli paneline kayıtlı ve henüz giriş yapmamış katılımcının açık adresini gir. Kayıt ve giriş onayları mevcut Sepolia örneğine yazılır ve test ETH ile ağ ücreti ödenir.

[Yapılandırma](etkinlik/config.js) Sepolia zincir kimliğini, İP-23 sözleşme adresini, okuma RPC’sini ve [V3 ABI dosyasının](src/EtkinlikKaydiV3.abi.json) yolunu içerir. [Uygulama kodunda](etkinlik/app.js) `connectWallet` MetaMask bağlantısını başlatır, `refresh` sözleşme durumunu okur, `sendTransaction` ağ ve hesabı kontrol edip `kaydol` veya `girisVer` çağrısını MetaMask’e iletir. MetaMask işlemi imzalar. Makbuz onaylanınca uygulama bilgileri yeniden okur. Görevli yetkisini [V3 sözleşmesi](src/EtkinlikKaydiV3.sol) denetler.

İP-12 aracı kökteki [index.html](index.html) dosyasında duruyor. İP-13’te bu araçtan oluşturup MetaMask’e aktardığımız eğitim hesabı, etkinlik sayfasında MetaMask üzerinden seçiliyor. Etkinlik sayfası yalnızca seçili açık adresi alır. İki sayfa arasında kurtarma kelimeleri veya özel anahtar aktarımı yoktur.

## İP-25 · İşlem durumu

Arayüz MetaMask imzasını ve zincir onayını ayrı gösterir. İşlem hash’i oluştuğunda **Son gönderilen işlemi Etherscan’de aç** bağlantısı görünür. Bağlantı kesilirse **Bilgileri yenile** mevcut işlemin makbuzunu ve bağlı hesabın verilerini sorgular. İşlem yeniden gönderilmez.

## İlerleme

- Eğitim cüzdanı, akıllı sözleşmeler ve etkinlik arayüzünün kodu çalışma alanında hazır.
- Etkinlik sözleşmesi Remix VM ve Sepolia’da denendi. Web arayüzünde canlı MetaMask bağlantısı ve Sepolia okumaları doğrulandı. İP-25 işlem senaryoları simülasyonda çalıştırıldı.
- İP-16 ve İP-19’da kullanılan hesap farkları [araştırma notlarında](arastirma-notlari/01-blokzincir.md) açıklandı.
