function openBook() {
  document.querySelector('.book').classList.add('open');

  const music = document.getElementById("music");
  music.play();
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

  document.getElementById("countdown").innerText =
    `${days} zile • ${hours} ore`;
}, 1000);

/* RSVP → GOOGLE SHEETS */
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: this.name.value,
    guests: this.guests.value,
    status: this.status.value
  };

  fetch("https://script.google.com/macros/s/AKfycbxPGnoSXMjMxbVJdr32CLXlEfhsMDj8sXpPvkDY1YcsYvU2-rFA7EfLeD2snCIfwPwqTQ/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(() => {
    alert("Mulțumim pentru confirmare! 💌");
    this.reset();
  });
});