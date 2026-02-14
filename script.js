const loginSection = document.getElementById("loginSection");
const mainSection = document.getElementById("mainSection");
const usernameInput = document.getElementById("usernameInput");
const displayUser = document.getElementById("displayUser");
const saldoText = document.getElementById("saldo");
const claimBtn = document.getElementById("claimBtn");
const timerText = document.getElementById("timer");
const transactionText = document.getElementById("transactionId");
const totalClaimText = document.getElementById("totalClaim");
const liveFeed = document.getElementById("liveFeed");

let saldo = 0;
let lastClaim = 0;
let username = "";

function login() {
  username = usernameInput.value.trim();
  if (username === "") {
    alert("Masukkan username dulu!");
    return;
  }

  localStorage.setItem("username", username);
  displayUser.innerText = username;

  loginSection.classList.add("hidden");
  mainSection.classList.remove("hidden");

  loadUserData();
}

function loadUserData() {
  saldo = localStorage.getItem(username + "_saldo")
    ? parseInt(localStorage.getItem(username + "_saldo"))
    : 0;

  lastClaim = localStorage.getItem(username + "_lastClaim")
    ? parseInt(localStorage.getItem(username + "_lastClaim"))
    : 0;

  saldoText.innerText = "Rp " + saldo.toLocaleString();
}

totalClaimText.innerText =
  Math.floor(Math.random() * 200 + 100) + " Member";

function updateTimer() {
  const now = Date.now();
  const diff = 86400000 - (now - lastClaim);

  if (diff <= 0) {
    timerText.innerText = "Anda bisa claim sekarang!";
    claimBtn.disabled = false;
  } else {
    claimBtn.disabled = true;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    timerText.innerText =
      `Freebet berikutnya dalam ${hours}j ${minutes}m ${seconds}d`;
  }
}

setInterval(updateTimer, 1000);

claimBtn.addEventListener("click", () => {
  const now = Date.now();
  if (now - lastClaim >= 86400000) {
    saldo += 15000;
    lastClaim = now;

    localStorage.setItem(username + "_saldo", saldo);
    localStorage.setItem(username + "_lastClaim", lastClaim);

    saldoText.innerText = "Rp " + saldo.toLocaleString();

    const trxId = "PB-" + now;
    transactionText.innerText = "ID Transaksi: " + trxId;

    alert("Freebet 15.000 berhasil diklaim!");
    updateTimer();
  }
});

const names = ["agus88", "andika77", "rudi99", "bima21", "rizky10"];

function generateFeed() {
  const name = names[Math.floor(Math.random() * names.length)];
  const div = document.createElement("div");
  div.classList.add("feed-item");
  div.innerText =
    `🎉 Member ${name} berhasil claim Rp 15.000`;
  liveFeed.prepend(div);

  if (liveFeed.children.length > 6) {
    liveFeed.removeChild(liveFeed.lastChild);
  }
}

setInterval(generateFeed, 4000);
