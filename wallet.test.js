"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const ethers = require("ethers");
const { deriveWallet } = require("./wallet.js");

test("BIP39 İngilizce referans vektörü, TREZOR ek parolasıyla eşleşir", () => {
  const entropy = new Uint8Array(16);
  const phrase = ethers.Mnemonic.entropyToPhrase(entropy, ethers.wordlists.en);
  const expectedSeed = "0xc55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e5349553" +
    "1f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04";
  assert.equal(phrase, "abandon ".repeat(11) + "about");
  assert.equal(ethers.Mnemonic.fromPhrase(phrase, "TREZOR", ethers.wordlists.en).computeSeed(), expectedSeed);
  assert.notEqual(deriveWallet(entropy, ethers).seed, expectedSeed);
});

test("Boş ek parolayla ilk Ethereum hesabını türetir", () => {
  const phrase = "test ".repeat(11) + "junk";
  const entropy = ethers.Mnemonic.phraseToEntropy(phrase, ethers.wordlists.en);
  const wallet = deriveWallet(entropy, ethers);
  assert.equal(wallet.phrase, phrase);
  assert.equal(wallet.derivationPath, "m/44'/60'/0'/0/0");
  assert.equal(wallet.seed.length, 130);
  assert.equal(wallet.privateKey, "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  assert.match(wallet.publicKey, /^0x04[0-9a-f]{128}$/);
  assert.equal(wallet.address, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
});
