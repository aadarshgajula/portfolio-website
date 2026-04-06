// ============================================================
// PORTFOLIO — SCRIPT.JS
// ============================================================

// ---------- NAV: scrolled class ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- NAV: hamburger ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// ---------- SCROLL REVEAL ----------
const animatables = document.querySelectorAll('[data-aos], .timeline-item, .edu-card, .award-card, .skill-group');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // stagger children if it's a grid parent
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animatables.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 5) * 0.08}s`;
  observer.observe(el);
});

// ---------- SMOOTH ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text-primary)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---------- CURSOR GLOW EFFECT (desktop only) ----------
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  })();

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
}
