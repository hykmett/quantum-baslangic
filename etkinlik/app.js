"use strict";

const { address, chainId, abiUrl, rpcUrl, explorerUrl } = eventConfig;
const sepolia = ethers.toQuantity(chainId);
const $ = (id) => document.getElementById(id);
const wallet = window.ethereum?.providers?.find((provider) => provider.isMetaMask)
    ?? (window.ethereum?.isMetaMask ? window.ethereum : null);
const rpc = new ethers.FetchRequest(rpcUrl);
rpc.timeout = 10000;
const reader = new ethers.JsonRpcProvider(rpc, chainId, { staticNetwork: true });

let contract;
let account;
let correctNetwork = false;
let isStaff = false;
let nickname = "";
let hasSpace = false;
let dataReady = false;
let busy = false;
let readVersion = 0;
let pending;

function updateControls() {
    $("connect").disabled = !wallet || busy;
    $("connect").textContent = account ? "Cüzdan bağlı" : "Cüzdan bağla";
    $("connect").disabled ||= Boolean(account);
    $("refresh").disabled = !contract || busy;
    $("staff").hidden = !isStaff;
    $("staff-hint").hidden = !account || !dataReady || isStaff;
    $("register-button").disabled = busy || Boolean(pending) || !account || !correctNetwork || !dataReady || !hasSpace || Boolean(nickname);
    $("check-in-button").disabled = busy || Boolean(pending) || !correctNetwork || !isStaff;
    $("registration-hint").textContent = !account || !dataReady ? ""
        : nickname ? "Bu adres zaten kayıtlı. İkinci kez kayıt yapılamaz."
        : !hasSpace ? "Etkinlik kapasitesi dolu. Yeni kayıt alınamıyor." : "";
}

function showError(error) {
    const details = [error.reason, error.info?.error?.message, error.data?.message, error.shortMessage, error.message].join(" ");
    if (error.code === 4001 || error.code === "ACTION_REJECTED") {
        $("status").textContent = "MetaMask onayını reddettin. İşlem gönderilmedi.";
    } else if (details.includes("Bu adres zaten kayitli")) {
        $("status").textContent = "Bu adres zaten kayıtlı. İkinci kez kayıt yapılamaz.";
    } else if (details.includes("Etkinlik kapasitesi dolu")) {
        $("status").textContent = "Etkinlik kapasitesi dolu. Yeni kayıt alınamıyor.";
    } else if (details.includes("Yalnizca gorevli") || details.includes("görevli hesabına ait")) {
        $("status").textContent = "Giriş onayını yalnızca görevli hesap verebilir.";
    } else if ([4900, 4901, "NETWORK_ERROR", "TIMEOUT"].includes(error.code)) {
        $("status").textContent = "Bağlantı kesildi. Sonuç doğrulanamadı. MetaMask işlem geçmişini kontrol et.";
    } else {
        $("status").textContent = error.shortMessage ?? error.message ?? "İşlem başlatılamadı.";
    }
}

async function refresh(blockTag = "latest") {
    const version = ++readVersion;
    const connected = account;
    const overrides = { blockTag };
    const [name, capacity, count, staff, alias, checkedIn] = await Promise.all([
        contract.etkinlikAdi(overrides),
        contract.kapasite(overrides),
        contract.kayitSayisi(overrides),
        contract.gorevli(overrides),
        connected ? contract.takmaAdlar(connected, overrides) : "",
        connected ? contract.girisYaptiMi(connected, overrides) : false
    ]);
    if (version !== readVersion) return;

    nickname = alias;
    hasSpace = count < capacity;
    dataReady = true;
    isStaff = Boolean(connected && ethers.getAddress(staff) === connected);
    $("event-name").textContent = name;
    $("capacity").textContent = capacity;
    $("count").textContent = count;
    $("nickname").textContent = alias || "—";
    $("registration").textContent = connected ? (alias ? "Kayıtlı" : "Kayıt yok") : "—";
    $("attendance").textContent = connected ? (checkedIn ? "Giriş onaylandı" : "Giriş bekleniyor") : "—";
    $("read-status").textContent = "";
    updateControls();
}

async function syncWallet(blockTag = "latest") {
    const version = ++readVersion;
    account = null;
    correctNetwork = false;
    isStaff = false;
    nickname = "";
    dataReady = false;
    $("read-status").textContent = "Bilgiler okunuyor…";
    for (const id of ["account", "nickname", "registration", "attendance"]) $(id).textContent = "—";
    updateControls();
    if (wallet) {
        const [accounts, network] = await Promise.all([
            wallet.request({ method: "eth_accounts" }),
            wallet.request({ method: "eth_chainId" })
        ]);
        if (version !== readVersion) return;
        account = accounts[0] ? ethers.getAddress(accounts[0]) : null;
        correctNetwork = Number(network) === chainId;
    }
    $("account").textContent = account ?? "—";
    $("wallet-status").textContent = !wallet ? "Bu tarayıcıda MetaMask bulunamadı."
        : !account ? "MetaMask bağlantısı bekleniyor."
        : correctNetwork ? "Sepolia ağına bağlı."
        : "İşlem göndermek için MetaMask’te Ethereum Sepolia ağına geç.";
    await refresh(blockTag);
}

function showReadError() {
    $("read-status").textContent = "Cüzdan veya Sepolia bilgileri okunamadı. Bilgileri yenile ile tekrar kontrol et.";
}

async function checkReceipt(wait) {
    const { hash, form } = pending;
    let receipt;
    try {
        receipt = wait
            ? await reader.waitForTransaction(hash, 1, 120000)
            : await reader.getTransactionReceipt(hash);
    } catch {
        // RPC errors do not establish whether the transaction reverted.
    }
    if (!receipt || (receipt.status !== 0 && receipt.status !== 1)) {
        $("status").textContent = "İşlemin sonucu henüz doğrulanamadı. Etherscan bağlantısını aç veya Bilgileri yenile ile tekrar kontrol et.";
        return;
    }

    pending = undefined;
    if (receipt.status === 0) {
        $("status").textContent = "İşlem başarısız. Sepolia işlem makbuzu işlemin geri alındığını gösteriyor.";
        return;
    }
    form.reset();
    $("status").textContent = "İşlem Sepolia’da onaylandı.";
    await syncWallet(receipt.blockNumber).catch(showReadError);
}

async function refreshInformation() {
    busy = true;
    updateControls();
    try {
        if (pending) await checkReceipt(false);
        await syncWallet().catch(showReadError);
    } finally {
        busy = false;
        updateControls();
    }
}

async function connectWallet() {
    busy = true;
    updateControls();
    try {
        await wallet.request({ method: "eth_requestAccounts" });
        await syncWallet().catch(showReadError);
    } catch (error) {
        showError(error);
    } finally {
        busy = false;
        updateControls();
    }
}

async function sendTransaction(method, value, form) {
    if (busy || pending) return;
    const sender = account;
    busy = true;
    updateControls();
    try {
        const [network, accounts] = await Promise.all([
            wallet.request({ method: "eth_chainId" }),
            wallet.request({ method: "eth_accounts" })
        ]);
        if (Number(network) !== chainId) throw new Error("MetaMask’te Ethereum Sepolia ağına geç.");
        if (!sender || sender !== account || !accounts[0] || ethers.getAddress(accounts[0]) !== sender) {
            throw new Error("Aktif cüzdan değişti. İşlemi yeniden başlat.");
        }
        if (method === "girisVer" && !isStaff) throw new Error("Bu işlem görevli hesabına ait.");

        $("status").textContent = "MetaMask onayı bekleniyor…";
        const hash = await wallet.request({
            method: "eth_sendTransaction",
            params: [{
                from: sender,
                to: address,
                chainId: sepolia,
                data: contract.interface.encodeFunctionData(method, [value])
            }]
        });
        const link = $("transaction-link");
        pending = { hash, form };
        link.href = `${explorerUrl}/tx/${hash}`;
        link.hidden = false;
        link.textContent = "Son gönderilen işlemi Etherscan’de aç";
        $("status").textContent = "İşlem gönderildi. Sepolia onayı bekleniyor…";
        await checkReceipt(true);
    } catch (error) {
        showError(error);
    } finally {
        busy = false;
        updateControls();
    }
}

async function initialize() {
    $("contract-link").href = `${explorerUrl}/address/${address}`;
    try {
        const response = await fetch(abiUrl);
        if (!response.ok) throw new Error("Sözleşme ABI dosyası yüklenemedi.");
        const abi = await response.json();
        contract = new ethers.Contract(address, abi, reader);
        $("connect").addEventListener("click", connectWallet);
        $("refresh").addEventListener("click", refreshInformation);
        $("register").addEventListener("submit", (event) => {
            event.preventDefault();
            if ($("register-button").disabled) return;
            const value = $("nickname-input").value.trim();
            if (!value) {
                $("status").textContent = "Bir takma ad gir.";
                return;
            }
            void sendTransaction("kaydol", value, event.currentTarget);
        });
        $("check-in").addEventListener("submit", (event) => {
            event.preventDefault();
            if ($("check-in-button").disabled) return;
            const value = $("participant").value.trim();
            if (!ethers.isAddress(value)) {
                $("status").textContent = "Geçerli bir Ethereum adresi gir.";
                return;
            }
            void sendTransaction("girisVer", value, event.currentTarget);
        });
        for (const event of ["accountsChanged", "chainChanged", "disconnect"]) {
            wallet?.on?.(event, () => void syncWallet().catch(showReadError));
        }
        await syncWallet().catch(showReadError);
    } catch (error) {
        $("event-name").textContent = "Etkinlik bilgileri yüklenemedi";
        showError(error);
    }
}

void initialize();
