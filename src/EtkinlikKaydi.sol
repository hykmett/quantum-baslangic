// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EtkinlikKaydi {
    string public etkinlikAdi = unicode"Quantum Atölyesi";
    mapping(address => string) public takmaAdlar;

    function kaydol(string calldata takmaAd) external {
        takmaAdlar[msg.sender] = takmaAd;
    }
}
