document.addEventListener("DOMContentLoaded", function() {

window.openInvite = function() {
  document.querySelector('.overlay').classList.add('open');

  setTimeout(() => {
    document.querySelector('.overlay').style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  }, 900);
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
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerText =
    days + " zile " + hours + " ore " + minutes + " minute " + seconds + " secunde";
}, 1000);

/* RSVP */
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: this.name.value,
    guests: this.guests.value,
    status: this.status.value
  };

  fetch("https://script.google.com/macros/s/AKfycbwSQCQWfOYszvpn_qNAme_tIWMSt0Q029zfBLLdewGL4H73ItlTKrzUzEUbIBoGL9PDbw/exec", {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "text/plain"
  },
  body: JSON.stringify({
    name: this.name.value,
    guests: this.guests.value,
    status: this.status.value
  })
});

alert("Mulțumim pentru confirmare ❤️");
this.reset();
});

});