const form = document.getElementById('bonusForm');
const memberInput = document.getElementById('memberName');
const bonusMessage = document.getElementById('bonusMessage');
const chatAdmin = document.getElementById('chatAdmin');
const claimBtn = document.getElementById('claimBtn');
const countdownEl = document.getElementById('countdown');
const coinAnimation = document.getElementById('coinAnimation');
const historyTable = document.getElementById('historyTable');
const progressBar = document.getElementById('progressBar');

let nextClaimTime = new Date(localStorage.getItem('nextClaim') || 0);
let totalBonus = parseInt(localStorage.getItem('totalBonus')) || 0;

// Update countdown
function updateCountdown() {
  const now = new Date();
  const diff = nextClaimTime - now;

  if(diff <= 0){
    countdownEl.textContent = "Anda bisa klaim sekarang!";
    claimBtn.disabled = false;
  } else {
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `Klaim berikutnya dalam: ${hours}h ${minutes}m ${seconds}s`;
    claimBtn.disabled = true;
  }
}
setInterval(updateCountdown, 1000);

// Update history table
function updateHistory(memberName){
  const row = historyTable.insertRow(-1);
  const dateCell = row.insertCell(0);
  const bonusCell = row.insertCell(1);
  const statusCell = row.insertCell(2);

  const now = new Date();
  dateCell.textContent = now.toLocaleString();
  bonusCell.textContent = "15.000";
  statusCell.textContent = "Sukses";
}

// Update progress bar
function updateProgress(){
  const percentage = Math.min(totalBonus / 100000 * 100, 100); // asumsi max 100.000
  progressBar.style.width = percentage + "%";
}

updateProgress();

form.addEventListener('submit', function(e){
  e.preventDefault();

  const memberName = memberInput.value.trim();
  if(!memberName){
    bonusMessage.textContent = "Silakan masukkan nama member!";
    bonusMessage.style.color = "red";
    return;
  }

  // Notifikasi real-time
  bonusMessage.textContent = `Selamat ${memberName}, bonus 15.000 berhasil diklaim! 🎉`;
  bonusMessage.style.color = "#00ff00";

  // Animasi koin
  coinAnimation.classList.remove('hidden');
  setTimeout(()=> coinAnimation.classList.add('hidden'), 1000);

  // Simpan next claim
  nextClaimTime = new Date();
  nextClaimTime.setHours(nextClaimTime.getHours() + 24);
  localStorage.setItem('nextClaim', nextClaimTime);

  // Update total bonus & progress
  totalBonus += 15000;
  localStorage.setItem('totalBonus', totalBonus);
  updateProgress();

  // Update history
  updateHistory(memberName);

  // Tampilkan tombol chat admin
  chatAdmin.href = `https://pintarkrn.com/livechat?message=${encodeURIComponent(`Member ${memberName} claim bonus 15000`)}`;
  chatAdmin.classList.remove('hidden');

  // Disable tombol klaim
  claimBtn.disabled = true;

  // Reset form
  memberInput.value = '';
});
