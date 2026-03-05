const typedText = document.getElementById("typed-text");
const yearEl = document.getElementById("year");

const phrases = [
  "Creative Front-End Developer",
  "UI Motion Enthusiast",
  "Design × Code Explorer"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    charIndex += 1;
  } else {
    charIndex -= 1;
  }

  typedText.textContent = current.slice(0, charIndex);

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && charIndex === current.length) {
    delay = 1300;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 320;
  }

  window.setTimeout(typeEffect, delay);
}

if (typedText) {
  typeEffect();
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach(item => observer.observe(item));

window.addEventListener("pointermove", event => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty("--mx", `${x}%`);
  document.documentElement.style.setProperty("--my", `${y}%`);
});

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createStars();
}

function createStars() {
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.7 + 0.3,
    alpha: Math.random() * 0.6 + 0.2,
    drift: (Math.random() - 0.5) * 0.25
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.y += star.drift;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.fillStyle = `rgba(229, 237, 255, ${star.alpha})`;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();
window.addEventListener("resize", resizeCanvas);
