function openInvite() {
  document.querySelector('.envelope').style.display = 'none';
  document.getElementById('invitation').classList.remove('hidden');
}

/* COUNTDOWN */
const weddingDate = new Date("2027-09-11T17:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "Astăzi este ziua cea mare! 💍";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("countdown").innerText =
    `${days} zile • ${hours} ore • ${minutes} minute`;
}, 1000);

/* FORM */
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Mulțumim pentru confirmare! 💌");

  // Aici poți conecta backend (Formspree / Firebase etc.)
});