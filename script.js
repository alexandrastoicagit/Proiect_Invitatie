function openInvite() {
  document.querySelector('.overlay').classList.add('open');

  setTimeout(() => {
    document.querySelector('.overlay').style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  }, 900);

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
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerText =
    days + " zile  " + hours + " ore  "+ minutes + " minute  "+ seconds + " secunde";
}, 1000);

/* RSVP */
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: this.name.value,
    guests: this.guests.value,
    status: this.status.value
  };

  fetch("https://script.google.com/macros/s/AKfycbwIDsOvCudwZmcg_MQjs5fR2jqcvSUDAkHBGirBIA5PXSzV6Ma4KFyG7AZ5E1D0Q7gaAQ/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    if (res.result === "success") {
      alert("Mulțumim pentru confirmare ❤️");
      this.reset();
    } else {
      alert("Eroare: " + res.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert("Eroare de conexiune");
  });
});