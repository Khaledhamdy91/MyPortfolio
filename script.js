const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((element) => observer.observe(element));
}

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const updateActiveNav = () => {
  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });

  navAnchors.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

document.getElementById('year').textContent = new Date().getFullYear();
