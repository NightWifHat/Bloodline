/* ============================================================
   BLOODLINE INKWEAR — Main JS
   ============================================================ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Mobile menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  const setMenu = (open) => {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  };

  hamburger.addEventListener('click', () => {
    setMenu(!mobileMenu.classList.contains('open'));
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Intersection Observer — scroll animations ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay based on position in parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-aos]'));
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.12}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

/* ── Toast notification ── */
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── Newsletter form ── */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    // Forms are not wired to a backend yet — validate client-side and confirm.
    if (!newsletterForm.reportValidity()) return;
    showToast('Welcome to the Bloodline. Check your inbox.');
    newsletterForm.reset();
  });
}

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.reportValidity()) return;
    showToast('Message sent. We\'ll be in touch soon.');
    contactForm.reset();
  });
}

/* ── Parallax on hero ── */
const hero = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.25}px)`;
    hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
  }
}, { passive: true });

/* ── Active nav link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = '#c8102e';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
