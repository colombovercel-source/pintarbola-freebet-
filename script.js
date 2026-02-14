const loginBtn = document.getElementById("loginBtn");
const claimModal = document.getElementById("claimModal");
const memberName = document.getElementById("memberName");
const logoutBtn = document.getElementById("logoutBtn");
const promoTimerEl = document.getElementById("promoTimer");

let claimedUsers = {}; // username => sudah klaim?

// Promo countdown (misal promo berakhir 2 jam dari sekarang)
const promoEnd = new Date();
promoEnd.setHours(promoEnd.getHours() + 2);

function updateCountdown(){
  const now = new Date();
  let diff = promoEnd - now;
  if(diff <=0){
    promoTimerEl.textContent = "00:00:00";
    clearInterval(countdownInterval);
    return;
  }
  const h = String(Math.floor(diff/1000/60/60)).padStart(2,'0');
  const m = String(Math.floor((diff/1000/60)%60)).padStart(2,'0');
  const s = String(Math.floor((diff/1000)%60)).padStart(2,'0');
  promoTimerEl.textContent = `${h}:${m}:${s}`;
}

const countdownInterval = setInterval(updateCountdown,1000);
updateCountdown();

// Login
loginBtn.addEventListener("click", () => {
  const username = document.getElementById("loginUsername").value.trim();
  if(username === "") return alert("Username wajib diisi!");
  
  memberName.textContent = username;
  claimModal.classList.add("active");
  document.getElementById("loginCard").style.display = "none";
});

// Claim Freebet
document.getElementById("claimBtn").addEventListener("click", () => {
  const username = document.getElementById("loginUsername").value.trim();
  if(claimedUsers[username]){
    alert("⚠ Username ini sudah pernah klaim freebet sebelumnya!");
    return;
  }
  claimedUsers[username] = true;

  // Confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  alert("🎉 Freebet 15.000 berhasil diklaim!");
});

// Logout
logoutBtn.addEventListener("click", () => {
  claimModal.classList.remove("active");
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("loginUsername").value = "";
});

// Close Modal
document.getElementById("closeModal").addEventListener("click", () => {
  claimModal.classList.remove("active");
});
