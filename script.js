// LOGIN
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");
const liveFeed = document.getElementById("liveFeed");

// POPUP
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// Simulasi data live feed
const members = ["rudi99","bima21","agus88","andi77","leo123"];

loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!username) { alert("Masukkan username!"); return; }

  // Tampilkan popup claim
  showPopup(`Freebet 15.000 berhasil diklaim oleh ${username}!`);

  // Update live feed
  const randomMember = members[Math.floor(Math.random() * members.length)];
  liveFeed.textContent = `🎉 Member ${randomMember} berhasil claim Rp 15.000`;
});

function showPopup(message) {
  popup.classList.remove("hidden");
  document.getElementById("popupText").textContent = message;
}

closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// BACKGROUND ANIMASI SEDERHANA
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i=0;i<100;i++) {
  particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*3+1});
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.y -= 0.5;
    if(p.y<0)p.y=canvas.height;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="#a855f7";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize",()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
