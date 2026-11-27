// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtkinlikKaydiV2 {
    string public constant etkinlikAdi = unicode"Quantum Atölyesi";
    uint256 public constant kapasite = 3;
    uint256 public kayitSayisi;
    mapping(address => string) public takmaAdlar;

    function kaydol(string calldata takmaAd) external {
        require(bytes(takmaAd).length != 0, "Takma ad bos olamaz");
        require(bytes(takmaAdlar[msg.sender]).length == 0, "Bu adres zaten kayitli");
        require(kayitSayisi < kapasite, "Etkinlik kapasitesi dolu");

        takmaAdlar[msg.sender] = takmaAd;
        kayitSayisi += 1;
    }
}
