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

// On load, set theme from localStorage or default to light
const saved = localStorage.getItem('darkMode');
if (saved === '1') {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

// Hero typing animation
const heroTypedEl = document.getElementById('hero-typed');
if (heroTypedEl) {
  const phrases = [
    'Java Developer',
    'AWS Cloud Engineer',
    'DevSecOps Enthusiast',
    'Spring Boot • FastAPI • Serverless'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeSpeed = 55;
  const deleteSpeed = 35;
  const pauseAfterTypeMs = 1000;
  const pauseAfterDeleteMs = 250;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex += 1;
      heroTypedEl.textContent = current.slice(0, charIndex);

      if (charIndex >= current.length) {
        deleting = true;
        setTimeout(tick, pauseAfterTypeMs);
        return;
      }

      setTimeout(tick, typeSpeed);
      return;
    }

    // deleting
    charIndex -= 1;
    heroTypedEl.textContent = current.slice(0, charIndex);

    if (charIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, pauseAfterDeleteMs);
      return;
    }

    setTimeout(tick, deleteSpeed);
  }

  tick();
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

// Skills data for Java Developer + AWS Cloud Engineer + DevSecOps
const skills = [
  { name: 'Java', level: 90, category: 'Programming' },
  { name: 'Python', level: 85, category: 'Programming' },
  { name: 'SQL', level: 80, category: 'Programming' },
  { name: 'AWS Lambda', level: 85, category: 'Cloud' },
  { name: 'AWS SNS', level: 80, category: 'Cloud' },
  { name: 'AWS API Gateway', level: 80, category: 'Cloud' },
  { name: 'AWS IAM', level: 85, category: 'Cloud' },
  { name: 'Spring Boot', level: 88, category: 'Programming' },
  { name: 'FastAPI', level: 82, category: 'Programming' },
  { name: 'Git', level: 85, category: 'DevOps' },
  { name: 'CI/CD', level: 75, category: 'DevOps' },
  { name: 'Linux', level: 80, category: 'OS' },
  { name: 'Figma', level: 85, category: 'Tools' },
  { name: 'Power BI', level: 78, category: 'Tools' }
];

function renderSkills() {
  const skillsList = document.querySelector('.skills-list');
  skillsList.innerHTML = '';
  
  // Group skills by category
  const skillsByCategory = {};
  skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  // Render skills by category
  Object.keys(skillsByCategory).forEach(category => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'skill-category-card';
    categoryCard.innerHTML = `
      <h3 class="skill-category-title">${category}</h3>
      <div class="skills-grid"></div>
    `;
    
    const skillsGrid = categoryCard.querySelector('.skills-grid');
    skillsByCategory[category].forEach(skill => {
      const skillElement = document.createElement('div');
      skillElement.className = 'skill-item';
      skillElement.innerHTML = `
        <div class="skill-name">${skill.name}</div>
        <div class="skill-bar"><div class="skill-bar-fill" style="width:0%"></div></div>
        <div class="skill-level">${skill.level}%</div>
      `;
      skillsGrid.appendChild(skillElement);
      
      setTimeout(() => {
        skillElement.querySelector('.skill-bar-fill').style.width = skill.level + '%';
      }, 200);
    });
    
    skillsList.appendChild(categoryCard);
  });
}
renderSkills();

// Projects data
const projects = [
  {
    name: 'AI Powered Learning Platform',
    description: 'Spring Boot backend with Python FastAPI ML model integration. Features personalized learning paths and real-time analytics dashboard.',
    technologies: ['Spring Boot', 'FastAPI', 'Machine Learning', 'PostgreSQL'],
    github: 'https://github.com/VemalathaYakkanti/ai-learning-platform',
    live: null
  },
  {
    name: 'Text Analysis App on AWS',
    description: 'Serverless application using Amazon Comprehend for sentiment analysis. Built with AWS Lambda, SNS, API Gateway, and secure IAM role-based access.',
    technologies: ['AWS Lambda', 'Amazon Comprehend', 'SNS', 'API Gateway', 'IAM'],
    github: 'https://github.com/VemalathaYakkanti/aws-text-analysis',
    live: null
  }
];
function renderProjects() {
  const projectsList = document.querySelector('.projects-list');
  projectsList.innerHTML = '';
  
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-title">${project.name}</div>
      <div class="project-desc">${project.description}</div>
      <div class="project-tech">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${project.github}" target="_blank" rel="noopener">View Code</a>
        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener">Live Demo</a>` : ''}
      </div>
    `;
    projectsList.appendChild(card);
  });
}
renderProjects();

// Fetch and render GitHub projects as backup
const githubUsername = 'VemalathaYakkanti';
async function fetchGitHubProjects() {
  try {
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
    const repos = await res.json();
    
    // Add GitHub repos to projects if they don't already exist
    repos.slice(0, 4).forEach(repo => {
      if (!projects.find(p => p.name === repo.name)) {
        projects.push({
          name: repo.name,
          description: repo.description || 'GitHub repository',
          technologies: [],
          github: repo.html_url,
          live: null
        });
      }
    });
    
    renderProjects();
  } catch (e) {
    console.log('Using static projects data');
  }
}

// Try to fetch GitHub projects, fallback to static data
fetchGitHubProjects();

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
