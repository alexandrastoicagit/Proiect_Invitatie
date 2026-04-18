document.addEventListener("DOMContentLoaded", function() {

window.openInvite = function() {
  document.querySelector('.overlay').classList.add('open');

  setTimeout(() => {
    document.querySelector('.overlay').style.display = "none";
    document.getElementById("content").classList.remove("hidden");
  }, 900);
}

/* COUNTDOWN */
const target = new Date(document.querySelector(".countdown").dataset.date).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) return;

  document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}

setInterval(updateCountdown, 1000);
updateCountdown();

const items = document.querySelectorAll(".timeline-item");
const line = document.getElementById("timeline-line");

let lineAnimated = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {

      // stagger
      setTimeout(() => {
        entry.target.classList.add("show");

        // glow icon
        const icon = entry.target.querySelector(".icon-wrapper");
        icon.classList.add("glow");

      }, index * 300);

      // linie progresiva (o singura data)
      if (!lineAnimated) {
        line.style.transform = "scaleY(1)";
        lineAnimated = true;
      }
    }
  });
}, { threshold: 0.2 });

items.forEach(item => observer.observe(item));

/* RSVP */
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

});