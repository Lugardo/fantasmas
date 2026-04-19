(function () {
  'use strict';

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      });
    });
  }

  // Reveal on scroll
  const revealTargets = document.querySelectorAll('.section, .team-card, .service-card, .testimonial, .process-step, .reason');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      io.observe(el);
    });
  }

  // Contact form
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      feedback.classList.remove('error');

      if (!name || !phone || !message) {
        feedback.textContent = 'Completa todos los campos antes de invocar tu mensaje.';
        feedback.classList.add('error');
        return;
      }

      feedback.textContent = 'Tu mensaje cruza el velo... pronto te contactaremos.';
      form.reset();
    });
  }

  // Subtle cursor ghost trail (desktop only)
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let lastSpawn = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastSpawn < 80) return;
      lastSpawn = now;

      const dot = document.createElement('span');
      dot.textContent = '·';
      dot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        color: rgba(154, 216, 255, 0.7);
        font-size: 14px;
        pointer-events: none;
        z-index: 9999;
        text-shadow: 0 0 8px rgba(154, 216, 255, 0.8);
        transition: opacity 0.9s ease, transform 0.9s ease;
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = `translate(${(Math.random() - 0.5) * 30}px, -20px)`;
      });
      setTimeout(() => dot.remove(), 900);
    }, { passive: true });
  }

  // Random flicker on hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      if (Math.random() < 0.15) {
        heroTitle.style.opacity = '0.4';
        setTimeout(() => { heroTitle.style.opacity = '1'; }, 80);
      }
    }, 2500);
  }
})();
