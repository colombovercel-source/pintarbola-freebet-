const claimBtn = document.getElementById("claimBtn");
const userIdInput = document.getElementById("userId");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const progressText = document.getElementById("progressText");

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
  const userId = userIdInput.value.trim();

  if (!userId) {
    showPopup("ERROR", "User ID wajib diisi.");
    return;
  }

  const claimedIds = getClaimedIds();

  if (claimedIds.includes(userId)) {
    showPopup("TIDAK BISA CLAIM", "User ID ini sudah pernah claim bonus.");
    return;
  }

  progressText.textContent = "Memproses klaim...";
  
  setTimeout(() => {
    saveClaimedId(userId);
    progressText.textContent = "";
    showPopup("BERHASIL", "Selamat! Anda berhasil claim Freebet 20.000");
  }, 1500);
});

function showPopup(title, message) {
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}
