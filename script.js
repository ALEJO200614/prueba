// ═══════════════════════════════════════
//  PÉTALOS ANIMADOS — Canvas API
// ═══════════════════════════════════════

const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');
let petals = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createPetal() {
  return {
    x:        Math.random() * canvas.width,
    y:        -20,
    size:     4 + Math.random() * 8,
    speed:    0.5 + Math.random() * 1.2,
    drift:    (Math.random() - 0.5) * 0.5,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    opacity:  0.3 + Math.random() * 0.5
  };
}

// Generar pétalos distribuidos por toda la pantalla al inicio
for (let i = 0; i < 30; i++) {
  const p = createPetal();
  p.y = Math.random() * canvas.height;
  petals.push(p);
}

function drawPetal(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = '#e8738a';
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => {
    drawPetal(p);
    p.y        += p.speed;
    p.x        += p.drift;
    p.rotation += p.rotSpeed;

    // Reiniciar pétalo cuando sale por abajo
    if (p.y > canvas.height + 30) {
      Object.assign(p, createPetal());
    }
  });

  requestAnimationFrame(animatePetals);
}
animatePetals();


// ═══════════════════════════════════════
//  CONTADOR DE TIEMPO JUNTOS
// ═══════════════════════════════════════

const startDate = new Date('2026-04-08T00:00:00'); // ← Cambia esta fecha

function updateCountdown() {
  const diff = Math.max(0, new Date() - startDate);

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  document.getElementById('c-days').textContent  = days;
  document.getElementById('c-hours').textContent = hours;
  document.getElementById('c-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('c-secs').textContent  = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ═══════════════════════════════════════
//  EXPLOSIÓN DE CORAZONES
// ═══════════════════════════════════════

const colors = ['#e8738a', '#f5b8c4', '#c9788c', '#f9e4ea'];

document.getElementById('heartBtn').addEventListener('click', function(e) {
  for (let i = 0; i < 7; i++) {
    const burst = document.createElement('div');
    burst.className   = 'burst';
    burst.textContent = '♥';

    burst.style.left           = (e.clientX - 12 + (Math.random() - 0.5) * 60) + 'px';
    burst.style.top            = (e.clientY - 12 + (Math.random() - 0.5) * 40) + 'px';
    burst.style.animationDelay = (Math.random() * 0.3) + 's';
    burst.style.color          = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1200);
  }
});

