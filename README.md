# Portfolio (HTML/CSS/JS Version)

This is a modern, responsive portfolio website for Yakkanti Vemalatha, built with plain HTML, CSS, and JavaScript (no frameworks).

## Features
- Hero section with animated background and motion effects
- About, Skills, Projects (auto-fetched from GitHub), Courses, and Contact sections
- Dark mode (default) and light mode toggle
- Responsive design for all devices
- Smooth scrolling navigation
- Animated skill bars
- Downloadable CV link
- Contact form with EmailJS integration (sends real emails)

## How to Run Locally
1. Download or clone this folder.
2. Open `index.html` in your browser.

No build step or server required!

## EmailJS Setup
To make the contact form work with real email functionality:

1. Sign up at [EmailJS](https://www.emailjs.com/) (free tier available)
2. Create an Email Service (Gmail, Outlook, etc.)
3. Create an Email Template
4. Replace the following in `script.js`:
   - `YOUR_PUBLIC_KEY` with your EmailJS public key
   - `YOUR_SERVICE_ID` with your email service ID
   - `YOUR_TEMPLATE_ID` with your email template ID

The contact form will then send real emails to your inbox when someone submits it. 
