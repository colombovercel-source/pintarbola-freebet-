document.getElementById('bonusForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const memberName = document.getElementById('memberName').value.trim();
  const message = document.getElementById('bonusMessage');

  if(memberName === "") {
    message.textContent = "Silakan masukkan nama member!";
    message.style.color = "red";
    return;
  }

  // Simulasi klaim bonus
  message.textContent = `Selamat ${memberName}, bonus freebet berhasil diklaim! 🎉`;
  message.style.color = "#00ff00";

  // Reset form
  document.getElementById('bonusForm').reset();
});
