// Dark mode toggle with localStorage
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const DARK_CLASS = 'dark';

function setDarkMode(enabled) {
  if (enabled) {
    body.classList.add(DARK_CLASS);
    localStorage.setItem('darkMode', '1');
    darkModeToggle.textContent = '🌙';
  } else {
    body.classList.remove(DARK_CLASS);
    localStorage.setItem('darkMode', '0');
    darkModeToggle.textContent = '☀️';
  }
}

darkModeToggle.addEventListener('click', () => {
  setDarkMode(!body.classList.contains(DARK_CLASS));
});

// On load, set dark mode from localStorage or default to dark
if (localStorage.getItem('darkMode') === '0') {
  setDarkMode(false);
} else {
  setDarkMode(true);
}

// Smooth scroll for nav links and scroll-down button
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
  });
});
document.querySelectorAll('.scroll-down').forEach(btn => {
  btn.addEventListener('click', () => scrollToSection('about'));
});

// Skills data
const skills = [
  { name: 'HTML/CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 85 },
  { name: 'Express.js', level: 80 },
  { name: 'MongoDB', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'UI/UX Design', level: 92 },
  { name: 'Database', level: 80 },
  { name: 'Mobile Dev', level: 75 },
  { name: 'Git', level: 80 },
];

function renderSkills() {
  const skillsList = document.querySelector('.skills-list');
  skillsList.innerHTML = '';
  skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `
      <div class="skill-title">${skill.name}</div>
      <div class="skill-bar"><div class="skill-bar-fill" style="width:0%"></div></div>
      <div class="skill-level">${skill.level}%</div>
    `;
    skillsList.appendChild(card);
    setTimeout(() => {
      card.querySelector('.skill-bar-fill').style.width = skill.level + '%';
    }, 200);
  });
}
renderSkills();

// Courses data
const courses = [
  { title: 'Full Stack Web Development', provider: 'Tech Academy' },
  { title: 'React Advanced Patterns', provider: 'React Institute' },
  { title: 'UI/UX Design Masterclass', provider: 'Design School' },
  { title: 'Node.js Backend Development', provider: 'Backend Academy' },
];
function renderCourses() {
  const coursesList = document.querySelector('.courses-list');
  coursesList.innerHTML = '';
  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div class="course-title">${course.title}</div>
      <div class="course-provider">${course.provider}</div>
    `;
    coursesList.appendChild(card);
  });
}
renderCourses();

// Fetch and render GitHub projects
const githubUsername = 'vemalatha';
async function renderProjects() {
  const projectsList = document.querySelector('.projects-list');
  projectsList.innerHTML = '<div>Loading projects...</div>';
  try {
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    const repos = await res.json();
    projectsList.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-title">${repo.name}</div>
        <div class="project-desc">${repo.description || 'No description provided.'}</div>
        <div class="project-links">
          <a href="${repo.html_url}" target="_blank" rel="noopener">GitHub</a>
        </div>
      `;
      projectsList.appendChild(card);
    });
  } catch (e) {
    projectsList.innerHTML = '<div>Failed to load projects.</div>';
  }
}
renderProjects();

// Custom notification function
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const icon = notification.querySelector('.notification-icon');
  const messageEl = notification.querySelector('.notification-message');
  
  // Set message and type
  messageEl.textContent = message;
  notification.className = `notification ${type}`;
  
  // Set icon based on type
  if (type === 'success') {
    icon.textContent = '✓';
    icon.style.background = '#10b981';
  } else {
    icon.textContent = '✕';
    icon.style.background = '#ef4444';
  }
  
  // Show notification
  notification.classList.add('show');
  
  // Hide after 4 seconds
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      notification.classList.remove('show', 'hide');
    }, 300);
  }, 4000);
}

// EmailJS implementation
(function() {
  emailjs.init("xdOZBM822tAW1v7Q0"); // Replace with your EmailJS public key
})();

// Contact form with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  
  if (!name || !email || !message) {
    showNotification('Please fill in all fields.', 'error');
    return;
  }

  // Show loading state
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // EmailJS template parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    to_name: 'Yakkanti Vemalatha'
  };

  // Send email using EmailJS
  emailjs.send('service_sg5k5p9', 'template_m8ppxbc', templateParams)
    .then(function(response) {
      showNotification('Thank you for your message! I will get back to you soon.', 'success');
      document.getElementById('contactForm').reset();
    }, function(error) {
      showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    })
    .finally(function() {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
}); 
