function openInvite() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('open');

  setTimeout(() => {
    overlay.style.display = 'none';
    document.getElementById('content').classList.remove('hidden');
  }, 600);

  document.getElementById("music").play();
}

/* COUNTDOWN */
const weddingDate = new Date("2027-09-11T16:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerText = "Ziua evenimentului";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  document.getElementById("countdown").innerText =
    days + " zile • " + hours + " ore";
}, 1000);

/* RSVP */
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: this.name.value,
    guests: this.guests.value,
    status: this.status.value
  };

  fetch("PASTE_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => {
    alert("Mulțumim pentru confirmare");
    this.reset();
  });
});