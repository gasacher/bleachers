const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

const hero = document.querySelector('.hero');

function updateHeader() {
  const threshold = hero ? hero.offsetHeight * 0.12 : 48;
  header.classList.toggle('header--solid', window.scrollY > threshold);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mobileNav.hidden = expanded;
  document.body.style.overflow = expanded ? '' : 'hidden';
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.hidden = true;
    document.body.style.overflow = '';
  });
});

const CONTACT_EMAIL = 'hola@bleachers.shop';

const contactForm = document.getElementById('contact-form');
const contactHint = document.getElementById('contact-hint');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const nombre = data.get('nombre')?.toString().trim() || '';
    const email = data.get('email')?.toString().trim() || '';
    const modelo = data.get('modelo')?.toString().trim() || 'Consulta general';
    const mensaje = data.get('mensaje')?.toString().trim() || '';

    const subject = encodeURIComponent(`Bleachers — ${modelo}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nModelo: ${modelo}\n\n${mensaje}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    if (contactHint) {
      contactHint.hidden = false;
    }
  });
}

const revealEls = document.querySelectorAll(
  '.section-header, .catalog__card, .about__content, .about__photo, .feed__item, .hero__content, .contact__info, .contact__form'
);

revealEls.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));
