const BONUS = 15000;
const CLAIM_INTERVAL = 24*60*60*1000;

// ELEMENTS
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");
const dashboardCard = document.getElementById("dashboardCard");
const displayUsername = document.getElementById("displayUsername");
const statusBadge = document.getElementById("statusBadge");
const balanceDisplay = document.getElementById("balanceDisplay");
const claimBtn = document.getElementById("claimBtn");
const totalClaimEl = document.getElementById("totalClaim");
const timerEl = document.getElementById("timer");
const transactionIdEl = document.getElementById("transactionId");
const liveFeed = document.getElementById("liveFeed");
const logoutBtn = document.getElementById("logoutBtn");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

// STATE
let username = "";
let lastClaim = 0;
let balance = 0;
let totalClaim = Math.floor(Math.random()*200+100);
let countdownInterval = null;

// MEMBERS FAKE LIVE FEED
const members = ["agus88","andika77","rudi99","bima21","leo123"];

// INIT
totalClaimEl.textContent = totalClaim;

// RANDOM STATUS AKUN
let verified = Math.random()>0.2; // 80% terverifikasi
statusBadge.textContent = verified ? "🟢 Status Akun: Terverifikasi" : "🟡 Status Akun: Belum Verifikasi";

// LOGIN
loginBtn.addEventListener("click",()=>{
  username = usernameInput.value.trim();
  if(!username){ alert("Masukkan username!"); return; }
  displayUsername.textContent = username;
  dashboardCard.classList.remove("hidden");
  document.querySelector(".login-card").classList.add("hidden");
  showPopup(`Freebet 15.000 berhasil diklaim oleh ${username}!`);
  claimBtn.disabled = false;
});

// CLAIM
claimBtn.addEventListener("click",()=>{
  const now = Date.now();
  if(now-lastClaim<CLAIM_INTERVAL){
    alert("Tunggu 24 jam sebelum claim berikutnya!");
    return;
  }
  lastClaim = now;
  balance += BONUS;
  balanceDisplay.textContent = `Saldo Freebet: Rp ${balance.toLocaleString()}`;
  totalClaim +=1;
  totalClaimEl.textContent = totalClaim;
  const trxId = `PB-${now}`;
  transactionIdEl.textContent = `ID Transaksi: ${trxId}`;
  showPopup(`Freebet 15.000 berhasil diklaim oleh ${username}!`);
  startTimer();
});

// TIMER 24 JAM
function startTimer(){
  if(countdownInterval) clearInterval(countdownInterval);
  let remaining = CLAIM_INTERVAL;
  countdownInterval = setInterval(()=>{
    if(remaining<=0){
      timerEl.textContent="Freebet siap diklaim!";
      claimBtn.disabled=false;
      clearInterval(countdownInterval);
      return;
    }
    const h = Math.floor(remaining/3600000);
    const m = Math.floor((remaining%3600000)/60000);
    const s = Math.floor((remaining%60000)/1000);
    timerEl.textContent=`Tunggu ${h}j ${m}m ${s}d untuk claim berikutnya`;
    remaining-=1000;
  },1000);
}

// LIVE FEED
function updateLiveFeed(){
  const randomMember = members[Math.floor(Math.random()*members.length)];
  liveFeed.textContent=`🎉 Member ${randomMember} berhasil claim Rp 15.000`;
}
setInterval(updateLiveFeed,5000);
updateLiveFeed();

// POPUP
function showPopup(message){
  popupText.textContent=message;
  popup.classList.remove("hidden");
}
closePopup.addEventListener("click",()=>{ popup.classList.add("hidden"); });

// LOGOUT
logoutBtn.addEventListener("click",()=>{
  username="";
  balance=0;
  lastClaim=0;
  document.querySelector(".login-card").classList.remove("hidden");
  dashboardCard.classList.add("hidden");
  usernameInput.value="";
  balanceDisplay.textContent=`Saldo Freebet: Rp 0`;
  timerEl.textContent="Freebet siap diklaim!";
  transactionIdEl.textContent="";
});

// BACKGROUND ANIMASI PREMIUM
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
for(let i=0;i<150;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3+1});
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.y-=0.7;
    if(p.y<0)p.y=canvas.height;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="#22c55e";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});
