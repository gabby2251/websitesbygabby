/* =============================================
   YEAR
   ============================================= */
document.getElementById('year').textContent = new Date().getFullYear();

/* =============================================
   MOBILE NAV
   ============================================= */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* =============================================
   SCROLL REVEAL
   ============================================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* =============================================
   CONTACT FORM
   ============================================= */
const form = document.getElementById('contactForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showFormMessage('Please fill in your name, email, and message.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }

  // In production, replace this block with a real form submission
  // (e.g. Formspree, EmailJS, Netlify Forms, etc.)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    showFormMessage("Message sent! I'll be in touch soon.", 'success');
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }, 1200);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(text, type) {
  const existing = form.querySelector('.form-msg');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className = 'form-msg';
  msg.textContent = text;
  msg.style.cssText = `
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    background: ${type === 'success' ? '#e6f4ea' : '#fdecea'};
    color:       ${type === 'success' ? '#1e7e34' : '#c62828'};
    border: 1px solid ${type === 'success' ? '#a8d5b0' : '#f5a9a9'};
  `;
  form.appendChild(msg);
}
