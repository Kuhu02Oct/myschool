/*
   S D Memorial Sanskar Public School - JavaScript
   Handles interactive features like mobile menu, form validation, and user interactions
*/

// ===== Mobile Menu Toggle =====
// This code handles opening and closing the navigation menu on mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = hamburger.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ===== Contact Form Handling =====
// This code validates and handles the contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    
    // Validate form fields
    if (!validateForm(name, email, subject, message)) {
        return;
    }
    
    // Clear previous message
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    // Simulate form submission (in real scenario, this would send data to a server)
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call with setTimeout
    setTimeout(function() {
        // Show success message
        formMessage.textContent = '✓ Thank you! Your message has been sent successfully. We will get back to you soon.';
        formMessage.classList.add('success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(function() {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }, 1500);
});

// ===== Form Validation Function =====
// Validates all required fields and returns true if valid, false otherwise
function validateForm(name, email, subject, message) {
    const formMessage = document.getElementById('formMessage');
    
    // Check if name is empty
    if (name === '') {
        showError('Please enter your full name.');
        return false;
    }
    
    // Check if name is valid (at least 3 characters)
    if (name.length < 3) {
        showError('Please enter a valid name (at least 3 characters).');
        return false;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return false;
    }
    
    // Check if subject is empty
    if (subject === '') {
        showError('Please enter a subject.');
        return false;
    }
    
    // Check if message is empty
    if (message === '') {
        showError('Please enter your message.');
        return false;
    }
    
    // Check if message is at least 10 characters
    if (message.length < 10) {
        showError('Please enter a message with at least 10 characters.');
        return false;
    }
    
    return true;
}

// ===== Email Validation Function =====
// Uses a regular expression to validate email format
function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Show Error Message =====
// Displays error message in the form message area
function showError(message) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '✗ ' + message;
    formMessage.className = 'form-message error';
}

// ===== Add Active State to Current Nav Link =====
// Highlights the current section in the navigation
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.borderBottomColor = '#fbbf24';
        } else {
            link.style.borderBottomColor = 'transparent';
        }
    });
});

// ===== Smooth Scroll Function =====
// Provides smooth scrolling behavior for all anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== Add Scroll Animation to Elements =====
// Elements fade in as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and items for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const itemsToObserve = document.querySelectorAll('.about-card, .class-card, .step, .info-item');
    
    itemsToObserve.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// ===== Keyboard Navigation =====
// Navigate between sections using arrow keys
document.addEventListener('keydown', function(event) {
    const sections = ['home', 'about', 'academics', 'admissions', 'contact'];
    const current = window.location.hash.slice(1) || 'home';
    const currentIndex = sections.indexOf(current);
    
    let nextSection = null;
    
    if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        nextSection = sections[currentIndex + 1];
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        nextSection = sections[currentIndex - 1];
    }
    
    if (nextSection) {
        smoothScroll('#' + nextSection);
    }
});

// ===== Console Welcome Message =====
// A friendly message in the browser console
console.log('%cWelcome to S D Memorial Sanskar Public School', 'color: #1e3a8a; font-size: 24px; font-weight: bold;');
console.log('%cBuilding Bright Futures, One Student at a Time', 'color: #059669; font-size: 16px;');
console.log('%cVisit our website for more information about admissions and academics.', 'color: #6b7280; font-size: 14px;');
