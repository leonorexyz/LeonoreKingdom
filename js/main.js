// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

// Smooth nav
document.querySelectorAll('nav a').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Fake form submit (replace with your backend)
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // basic validation
  if (!data.get('name') || !data.get('email') || !data.get('message')) return alert('Please fill all fields');
  // simulate network
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
  form.reset();
});

// Type animation for ambition, goals, learning
const typeAnimEl = document.getElementById('type-anim');
if (typeAnimEl) {
  const words = ['ambition', 'goals', 'learning'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 120;
  let pauseTime = 1200;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      typeAnimEl.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      typeAnimEl.textContent = currentWord.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? 60 : typingSpeed);
    }
  }
  type();
}
