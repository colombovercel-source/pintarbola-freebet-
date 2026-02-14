const loginBtn = document.getElementById("loginBtn");
const claimModal = document.getElementById("claimModal");
const memberName = document.getElementById("memberName");
const progressBar = document.getElementById("progressBar");
const totalClaim = document.getElementById("totalClaim");
const logoutBtn = document.getElementById("logoutBtn");

let claimCount = 0;

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("loginUsername").value.trim();
  if(username === "") return alert("Username wajib diisi!");
  
  memberName.textContent = username;
  claimModal.classList.add("active");
  document.getElementById("loginCard").style.display = "none";

  // Reset progress bar
  updateProgress();
});

document.getElementById("claimBtn").addEventListener("click", () => {
  claimCount++;
  alert("🎉 Freebet 15.000 berhasil diklaim!");
  updateProgress();
});

logoutBtn.addEventListener("click", () => {
  claimModal.classList.remove("active");
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("loginUsername").value = "";
  claimCount = 0;
  updateProgress();
});

document.getElementById("closeModal").addEventListener("click", () => {
  claimModal.classList.remove("active");
});

function updateProgress(){
  let progress = Math.min(claimCount*10,100); // Max 100%
  progressBar.style.width = progress + "%";
  progressBar.textContent = progress + "%";
  totalClaim.textContent = claimCount;
}
