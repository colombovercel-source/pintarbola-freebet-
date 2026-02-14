// ===== ELEMENTS =====
const form = document.getElementById('bonusForm');
const memberInput = document.getElementById('memberName');
const claimBtn = document.getElementById('claimBtn');
const countdownEl = document.getElementById('countdown');

const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const coinContainer = document.getElementById('coinContainer');
const chatAdmin = document.getElementById('chatAdmin');
const closeModal = document.getElementById('closeModal');

const historyTable = document.getElementById('historyTable');
const progressBar = document.getElementById('progressBar');

const coinSound = document.getElementById('coinSound');

// ===== STORAGE =====
let nextClaimTime = new Date(localStorage.getItem('nextClaim') || 0);
let totalBonus = parseInt(localStorage.getItem('totalBonus')) || 0;

// ===== COUNTDOWN =====
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

// ===== HISTORY =====
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

// ===== PROGRESS BAR =====
function updateProgress(){
  const percentage = Math.min(totalBonus / 100000 * 100, 100);
  progressBar.style.width = percentage + "%";
}
updateProgress();

// ===== COIN ANIMATION =====
function spawnCoins(num=6){
  coinContainer.innerHTML = '';
  for(let i=0;i<num;i++){
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = `${10 + i*20}px`;
    coin.textContent = '💰';
    coinContainer.appendChild(coin);
  }
  coinSound.play();
}

// ===== CLAIM BONUS =====
form.addEventListener('submit', function(e){
  e.preventDefault();
  const memberName = memberInput.value.trim();
  if(!memberName){
    alert("Silakan masukkan nama member!");
    return;
  }

  // SET NEXT CLAIM 24 JAM
  nextClaimTime = new Date();
  nextClaimTime.setHours(nextClaimTime.getHours() + 24);
  localStorage.setItem('nextClaim', nextClaimTime);

  // UPDATE BONUS & PROGRESS
  totalBonus += 15000;
  localStorage.setItem('totalBonus', totalBonus);
  updateProgress();

  // UPDATE HISTORY
  updateHistory(memberName);

  // SHOW MODAL
  modalMessage.textContent = `Selamat ${memberName}, bonus 15.000 berhasil diklaim! 🎉`;
  spawnCoins();
  chatAdmin.href = `https://pintarkrn.com/livechat?message=${encodeURIComponent(`Member ${memberName} claim bonus 15000`)}`;
  chatAdmin.classList.remove('hidden');
  modal.classList.remove('hidden');

  claimBtn.disabled = true;
  memberInput.value = '';
});

// ===== CLOSE MODAL =====
closeModal.addEventListener('click', () => modal.classList.add('hidden'));
