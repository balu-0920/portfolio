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

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Please fill out all fields correctly.';
    formStatus.style.color = '#dc3545';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Using your specific Service ID and Template ID
  emailjs.sendForm('service_61v557n', 'template_lt53pv8', this)
    .then(() => {
      formStatus.textContent = 'Message Sent Successfully!';
      formStatus.style.color = '#198754';
      contactForm.reset();
    })
    .catch((error) => {
      console.log(error);
      formStatus.textContent = error.text || 'Failed to send message. Please try again.';
      formStatus.style.color = '#dc3545';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
});