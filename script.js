// ===== Particle System =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.6 + 0.15;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
    this.hue = 260 + Math.random() * 40;
    this.saturation = 60 + Math.random() * 40;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += this.pulseSpeed;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const force = (130 - dist) / 130;
        this.x -= (dx / dist) * force * 1.8;
        this.y -= (dy / dist) * force * 1.8;
      }
    }

    if (this.x < -20) this.x = canvas.width + 10;
    if (this.x > canvas.width + 20) this.x = -10;
    if (this.y < -20) this.y = canvas.height + 10;
    if (this.y > canvas.height + 20) this.y = -10;
  }

  draw() {
    const glowOpacity = this.opacity * (0.7 + Math.sin(this.pulse) * 0.3);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, 70%, ${glowOpacity})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = `hsla(${this.hue}, ${this.saturation}%, 60%, ${glowOpacity * 0.6})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const particleCount = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 10000));
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

window.addEventListener('resize', () => {
  particles.forEach(p => {
    if (p.x > canvas.width || p.y > canvas.height) {
      p.reset();
    }
  });
});

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const opacity = (1 - dist / 120) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

// ===== Discord - Copy username =====
document.getElementById('discord-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const id = 'luna670';
  navigator.clipboard.writeText(id).then(() => {
    showToast('Copied: ' + id);
  });
});

// ===== Roblox - Copy username =====
document.getElementById('roblox-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const id = 'luna_02170';
  navigator.clipboard.writeText(id).then(() => {
    showToast('Copied: ' + id);
  });
});

// ===== Toast =====
function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== Stagger Animation on Load =====
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.link-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + i * 100);
  });
});
