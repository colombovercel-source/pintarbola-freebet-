const BONUS = 15000;

// ELEMENTS
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");
const dashboardCard = document.querySelector(".dashboard-card");
const liveFeed = document.getElementById("liveFeed");
const totalClaimEl = document.getElementById("totalClaim");
const statusBadge = document.getElementById("statusBadge");
const claimBtn = document.getElementById("claimBtn");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

let username = "";
let totalClaim = Math.floor(Math.random() * 200 + 100); // 100–300

// LIVE FEED MEMBERS
const members = ["agus88","andika77","rudi99","bima21","leo123"];

// INIT TOTAL CLAIM
totalClaimEl.textContent = totalClaim;

// RANDOM STATUS AKUN
let verified = Math.random() > 0.2; // 80% terverifikasi
statusBadge.textContent = verified ? "🟢 Status Akun: Terverifikasi" : "🟡 Status Akun: Belum Verifikasi";

// LOGIN
loginBtn.addEventListener("click", () => {
  username = usernameInput.value.trim();
  if(!username){ alert("Masukkan username!"); return; }

  // Tampilkan dashboard
  document.querySelector(".login-card").classList.add("hidden");
  dashboardCard.classList.remove("hidden");

  // Tampilkan live feed popup
  showPopup(`Freebet 15.000 berhasil diklaim oleh ${username}!`);
});

// CLAIM BUTTON
claimBtn.addEventListener("click", ()=>{
  showPopup(`Freebet 15.000 berhasil diklaim oleh ${username}!`);
  totalClaim += 1;
  totalClaimEl.textContent = totalClaim;
});

// POPUP CONTROL
closePopup.addEventListener("click", ()=>{ popup.classList.add("hidden"); });
function showPopup(message){
  popupText.textContent = message;
  popup.classList.remove("hidden");
}

// LIVE FEED RANDOM
function updateLiveFeed(){
  const randomMember = members[Math.floor(Math.random()*members.length)];
  liveFeed.textContent = `🎉 Member ${randomMember} berhasil claim Rp 15.000`;
}
setInterval(updateLiveFeed,5000);
updateLiveFeed();

// BACKGROUND ANIMASI SEDERHANA
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3+1});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.y-=0.5;
    if(p.y<0)p.y=canvas.height;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="#22c55e"; // hijau luxury
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize",()=>{
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
});
