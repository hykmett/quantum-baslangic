// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtkinlikKaydiV3 {
    string public constant etkinlikAdi = unicode"Quantum Atölyesi";
    uint256 public constant kapasite = 3;
    address public immutable gorevli;
    uint256 public kayitSayisi;
    mapping(address => string) public takmaAdlar;
    mapping(address => bool) public girisYaptiMi;

    event KayitYapildi(address indexed katilimci, string takmaAd);
    event GirisYapildi(address indexed katilimci);

    constructor() {
        gorevli = msg.sender;
    }

    function kaydol(string calldata takmaAd) external {
        require(bytes(takmaAd).length != 0, "Takma ad bos olamaz");
        require(bytes(takmaAdlar[msg.sender]).length == 0, "Bu adres zaten kayitli");
        require(kayitSayisi < kapasite, "Etkinlik kapasitesi dolu");

        takmaAdlar[msg.sender] = takmaAd;
        kayitSayisi += 1;
        emit KayitYapildi(msg.sender, takmaAd);
    }

    function girisVer(address katilimci) external {
        require(msg.sender == gorevli, "Yalnizca gorevli giris verebilir");
        require(bytes(takmaAdlar[katilimci]).length != 0, "Katilimci kayitli degil");
        require(!girisYaptiMi[katilimci], "Katilimci zaten giris yapti");

        girisYaptiMi[katilimci] = true;
        emit GirisYapildi(katilimci);
    }
}
