const themeToggle = document.getElementById('theme-toggle');
const rootElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

function setTheme(theme) {
  rootElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  }
}

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme) {
  setTheme(savedTheme);
} else if (systemPrefersDark) {
  setTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.showModal();
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.close();
    document.body.style.overflow = 'auto';
  }
}

document.querySelectorAll('.case-study-modal').forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
      document.body.style.overflow = 'auto';
    }
  });
});

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Please fill out all fields correctly.';
    formStatus.style.color = '#dc3545';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Ensure EmailJS is properly configured with your keys
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
    .then(() => {
      formStatus.textContent = 'Message sent successfully!';
      formStatus.style.color = '#198754';
      contactForm.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      formStatus.textContent = 'Failed to send message. Please ensure your EmailJS credentials are correct.';
      formStatus.style.color = '#dc3545';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
});