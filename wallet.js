"use strict";

const derivationPath = "m/44'/60'/0'/0/0";

function deriveWallet(entropy, library) {
  const { Mnemonic, HDNodeWallet, SigningKey, computeAddress, hexlify, wordlists } = library;
  const phrase = Mnemonic.entropyToPhrase(entropy, wordlists.en);
  const seed = Mnemonic.fromPhrase(phrase, "", wordlists.en).computeSeed();
  const account = HDNodeWallet.fromSeed(seed).derivePath(derivationPath);
  const privateKey = account.privateKey;
  const publicKey = SigningKey.computePublicKey(privateKey, false);
  const address = computeAddress(publicKey);

  return { entropy: hexlify(entropy), phrase, seed, derivationPath, privateKey, publicKey, address };
}

const stages = [
  ["entropy", "Entropi", "Tarayıcı 128 bit rastgele veri üretir.", "crypto.getRandomValues(new Uint8Array(16))", true],
  ["phrase", "Mnemonic · BIP39", "Entropiye kontrol bitleri eklenir ve sonuç 12 İngilizce kelimeye çevrilir.", "Mnemonic.entropyToPhrase(entropy, wordlists.en)", true],
  ["seed", "Seed · BIP39", "Kelimeler ve boş ek parola PBKDF2 ile 64 baytlık seed’e dönüştürülür.", 'Mnemonic.fromPhrase(phrase, "", wordlists.en).computeSeed()', true],
  ["derivationPath", "Türetme yolu · BIP32/BIP44", "Seed’den ana düğüm, ardından Ethereum için ilk harici hesap anahtarı türetilir.", "HDNodeWallet.fromSeed(seed).derivePath(derivationPath)", false],
  ["privateKey", "Özel anahtar", "Bu hesaba ait 32 baytlık anahtar, işlemleri imzalamak için kullanılır.", "account.privateKey", true],
  ["publicKey", "Açık anahtar", "Özel anahtardan secp256k1 üzerinde sıkıştırılmamış açık anahtar elde edilir.", "SigningKey.computePublicKey(privateKey, false)", false],
  ["address", "Ethereum adresi", "Açık anahtarın 0x04 öneki hariç Keccak-256 özeti alınır. Son 20 bayt adresi oluşturur.", "computeAddress(publicKey)", false],
];

if (typeof module !== "undefined") {
  module.exports = { deriveWallet };
}

if (typeof document !== "undefined") {
  const steps = document.querySelector("#steps");
  const status = document.querySelector("#status");

  document.querySelector("#generate").addEventListener("click", () => {
    steps.replaceChildren();
    steps.hidden = true;

    try {
      const entropy = crypto.getRandomValues(new Uint8Array(16));
      const wallet = deriveWallet(entropy, globalThis.ethers);
      const template = document.querySelector("#step");
      const rows = document.createDocumentFragment();

      for (const [key, title, description, call, sensitive] of stages) {
        const row = template.content.cloneNode(true);
        row.querySelector("h2").textContent = title;
        row.querySelector("p").textContent = description;
        row.querySelector(".call").textContent = call;
        const output = row.querySelector("output");
        const toggle = row.querySelector("button");
        output.id = `result-${key}`;
        output.hidden = sensitive;
        if (sensitive) {
          toggle.hidden = false;
          toggle.setAttribute("aria-controls", output.id);
          toggle.setAttribute("aria-label", `${title} göster`);
          toggle.addEventListener("click", () => {
            output.hidden = !output.hidden;
            output.textContent = output.hidden ? "" : wallet[key];
            const action = output.hidden ? "Göster" : "Gizle";
            toggle.textContent = action;
            toggle.setAttribute("aria-label", `${title} ${action.toLocaleLowerCase("tr")}`);
            toggle.setAttribute("aria-expanded", String(!output.hidden));
          });
        } else {
          output.textContent = wallet[key];
        }
        rows.append(row);
      }
      steps.append(rows);
      steps.hidden = false;
      status.textContent = "Cüzdan oluşturuldu. Hassas değerleri ilgili adımda açabilirsin.";
    } catch {
      status.textContent = "Cüzdan oluşturulamadı. npm ci komutunu çalıştırıp sayfayı yeniden aç.";
    }
  });
}
