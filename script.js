document.addEventListener("DOMContentLoaded", function() {

  // Funcția de deschidere a invitației
  window.openInvite = function() {
    const overlay = document.querySelector('.overlay');
    const content = document.getElementById('content');
    const bgVideo = document.getElementById('bg-video');

    // 1. Adăugăm clasa 'open' pentru a porni animația CSS a plicului
    overlay.classList.add('open');

    // 2. După ce se termină animația plicului (900ms conform CSS-ului tău), facem tranziția
    setTimeout(() => {
      // Ascundem overlay-ul cu un efect de fade out
      overlay.style.transition = "opacity 0.6s ease";
      overlay.style.opacity = "0";

      setTimeout(() => {
        overlay.style.display = "none";
        
        // Afișăm conținutul invitației
        content.classList.remove("hidden");
        
        // Pornim videoclipul (browserele blochează autoplay-ul uneori, asta îl forțează să pornească la interacțiune)
        if (bgVideo) {
          bgVideo.play();
        }
      }, 600);
    }, 900);
  }

  document.getElementById('content').classList.add('show');
  
  /* --- Restul codului tău rămâne neschimbat --- */
  
  /* COUNTDOWN */
  const countdownElement = document.querySelector(".countdown");
  if (countdownElement) {
    const target = new Date(countdownElement.dataset.date).getTime();

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
  }

  /* TIMELINE OBSERVER */
  const items = document.querySelectorAll(".timeline-item");
  const line = document.getElementById("timeline-line");
  let lineAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
          const icon = entry.target.querySelector(".icon-wrapper");
          if (icon) icon.classList.add("glow");
        }, index * 300);

        if (!lineAnimated && line) {
          line.style.transform = "scaleY(1)";
          lineAnimated = true;
        }
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));

/* RSVP */
document.getElementById("rsvp-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: this.nume.value,
    status: this.participa.value,
    partner: this.partener.value || "",
    partner_name: this.nume_partener.value || "",
    kids: this.copii.value || "",
    menu: this.meniu.value || "",
    message: this.mesaj.value || ""
  };

  fetch("https://script.google.com/macros/s/AKfycbx0IPczidZ6cUQpWD1X3-H8Oqz3f2Ld1Z_TTvK7UmLZmEx8ETVhcl1bYRym_G-4KEGO0Q/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(() => {
    alert("Mulțumim pentru confirmare! 💌");
    this.reset();

    // reset UI
    document.getElementById("partner-field").style.display = "none";
    document.getElementById("menu-field").style.display = "none";
  })
  .catch(() => {
    alert("Eroare la trimitere.");
  });
});

const partnerField = document.getElementById("partner-field");
const menuField = document.getElementById("menu-field");
const menuOptions = document.getElementById("menu-options");

// ascuns inițial
partnerField.style.display = "none";
menuField.style.display = "none";

// HTML pentru meniuri
const menuForTwo = `
  <label><input type="radio" name="meniu" value="2x Normal"> 2x Meniu Normal</label>
  <label><input type="radio" name="meniu" value="2x Vegetarian"> 2x Meniu Vegetarian</label>
  <label><input type="radio" name="meniu" value="1x Normal + 1x Vegetarian"> 1x Normal, 1x Vegetarian</label>
`;

const menuForOne = `
  <label><input type="radio" name="meniu" value="Meniu Normal"> Meniu Normal</label>
  <label><input type="radio" name="meniu" value="Meniu Vegetarian"> Meniu Vegetarian</label>
`;

// când se schimbă partener
document.querySelectorAll("input[name='partener']").forEach(el => {
  el.addEventListener("change", () => {

    menuField.style.display = "block";

    if (el.value === "Da") {
      partnerField.style.display = "block";
      menuOptions.innerHTML = menuForTwo;
    } else {
      partnerField.style.display = "none";
      menuOptions.innerHTML = menuForOne;
    }
  });
});

});
