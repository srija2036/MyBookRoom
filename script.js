// === Magic Sparkle Cursor (Canvas-based) ===
const canvas = document.createElement("canvas");
canvas.id = "cursorCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];

function createParticle(x, y) {
  particles.push({
    x,
    y,
    size: Math.random() * 3 + 1,
    life: 100,
    // Changed color to a softer gold to match the new palette
    color: "rgba(197, 160, 89, 0.7)" 
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.life--;
    p.size *= 0.96;
    p.y -= 0.5;
    if (p.life <= 0) {
      particles.splice(i, 1);
      i--;
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

document.addEventListener("mousemove", (e) => {
  createParticle(e.clientX, e.clientY);
});

// === Set Custom Cursor (Magic Wand) ===
const style = document.createElement("style");
style.innerHTML = `
  body {
    cursor: url('https://cdn.custom-cursor.com/db/4296/32/magic-wand-pointer.png'), auto !important;
  }
  .enter-button, button, a {
    cursor: url('https://cdn.custom-cursor.com/db/4296/32/magic-wand-pointer.png'), pointer !important;
  }
`;
document.head.appendChild(style);

// === Star Rating Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const starRating = document.getElementById('starRating');
  if (starRating) {
    const stars = starRating.querySelectorAll('span');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = star.dataset.value;
        const ratingInput = document.getElementById('bookRating');
        if (ratingInput) ratingInput.value = rating;
        
        stars.forEach(s => s.classList.remove('filled'));
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add('filled');
        }
      });
    });
  }
});

// === Page Turn Transition ===
function turnPage() {
  const book = document.getElementById("book");
  if (book) {
    book.classList.add("page-turn");
    
    // Smooth transition to the next page
    setTimeout(() => {
      // Change 'room.html' to 'bookform.html' if you want the form first!
      window.location.href = "room.html"; 
    }, 1200);
  }
}