const claimBtn = document.getElementById("claimBtn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const STORAGE_KEY = "pintarbola_claimed_ids";

function getClaimedIds() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveClaimedId(id) {
  const ids = getClaimedIds();
  ids.push(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

claimBtn.addEventListener("click", function() {
  const userId = document.getElementById("userId").value.trim();

  if (!userId) {
    showPopup("ERROR", "Silakan masukkan User ID terlebih dahulu.");
    return;
  }

  const claimedIds = getClaimedIds();

  if (claimedIds.includes(userId)) {
    showPopup("TIDAK BISA CLAIM", "User ID ini sudah pernah claim bonus.");
    return;
  }

  showProgress(userId);
});

function showProgress(userId) {
  modal.style.display = "flex";

  modalContent.innerHTML = `
    <h2>Memproses Bonus...</h2>
    <p>Menghubungkan ke pusat bonus...</p>
    <div style="margin-top:20px;height:10px;background:#222;border-radius:10px;overflow:hidden;">
      <div id="bar" style="height:10px;width:0%;background:white;"></div>
    </div>
  `;

  let progress = 0;
  const bar = document.getElementById("bar");

  const interval = setInterval(() => {
    progress += 10;
    bar.style.width = progress + "%";

    if(progress >= 100) {
      clearInterval(interval);
      saveClaimedId(userId);
      showSuccess(userId);
    }
  }, 300);
}

function showSuccess(userId) {
  modalContent.innerHTML = `
    <h2>Selamat</h2>
    <p>
      User ID <b>${userId}</b><br><br>
      Berhasil Claim Bonus Freebet 20.000<br><br>
      Silakan screenshot halaman ini
    </p>
    <button onclick="goToCS()">HUBUNGI CS</button>
  `;
}

function showPopup(title, message) {
  modal.style.display = "flex";
  modalContent.innerHTML = `
    <h2>${title}</h2>
    <p>${message}</p>
    <button onclick="closeModal()">Tutup</button>
  `;
}

function closeModal() {
  modal.style.display = "none";
}

function goToCS() {
  window.location.href = "https://pintarkrn.com/";
}

/* ===== LIVE FEED AUTO ===== */

const feedList = document.getElementById("feedList");
const users = ["User123","UserABC","PlayerX","LuckyOne","UserXYZ","Gamer77"];
const amount = 20000;

function addFeed() {
  const user = users[Math.floor(Math.random()*users.length)];
  const li = document.createElement("li");
  li.textContent = `${user} berhasil claim ${amount.toLocaleString()}`;
  feedList.prepend(li);
  if(feedList.children.length > 8) feedList.removeChild(feedList.lastChild);
}

setInterval(addFeed, 2500);
