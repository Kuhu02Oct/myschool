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

// ===== Student Activities Gallery - Carousel Functionality =====
// Handles auto-sliding, manual navigation, and indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get gallery elements
    const carousel = document.querySelector('.gallery-carousel');
    const cards = document.querySelectorAll('.activity-card');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const indicators = document.querySelectorAll('.indicator');
    
    // Gallery state variables
    let currentSlide = 0;
    let slideCount = cards.length;
    let autoSlideInterval = null;
    const autoSlideDuration = 5000; // Auto-slide every 5 seconds
    
    // Function to update carousel position
    function updateCarousel(index) {
        // Ensure index is within bounds
        if (index >= slideCount) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slideCount - 1;
        } else {
            currentSlide = index;
        }
        
        // Move carousel to the correct position
        const offset = currentSlide * 100;
        carousel.style.transform = `translateX(-${offset}%)`;
        
        // Update indicator dots
        indicators.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Function to go to next slide
    function nextSlide() {
        updateCarousel(currentSlide + 1);
        resetAutoSlide();
    }
    
    // Function to go to previous slide
    function prevSlide() {
        updateCarousel(currentSlide - 1);
        resetAutoSlide();
    }
    
    // Function to start auto-sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, autoSlideDuration);
    }
    
    // Function to reset auto-slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Event listeners for indicator dots
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            updateCarousel(index);
            resetAutoSlide();
        });
    });
    
    // Pause auto-slide on hover (for desktop users)
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    // Resume auto-slide when mouse leaves
    carousel.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
    
    // Initialize carousel with first slide and start auto-sliding
    updateCarousel(0);
    startAutoSlide();
});

// ===== Keyboard Navigation =====
// Navigate between sections using arrow keys
document.addEventListener('keydown', function(event) {
    const sections = ['home', 'activities', 'about', 'academics', 'admissions', 'contact'];
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

/* ===== Launch Slideshow Script ===== */
// Uses local image filenames from the images folder to show a fullscreen flash
// Images are defined below (added programmatically from workspace)
document.addEventListener('DOMContentLoaded', function() {
    // List of image filenames to use in the slideshow (relative to project root)
    const slideshowImages = [
        'images/Image2.jpeg',
        'images/Image3.jpeg',
        'images/Image4.jpeg',
        'images/Image5.jpeg',
        'images/Image6.jpeg',
        'images/Image7.jpeg',
        'images/School1.jpg.jpeg'
    ];

    // Configuration
    const slideInterval = 4000; // 4 seconds per slide (updated)
    const slideshowRoot = document.getElementById('launchSlideshow');
    if (!slideshowRoot) return; // nothing to do if element missing

    const slidesContainer = slideshowRoot.querySelector('.slideshow-slides');
    const indicatorsContainer = slideshowRoot.querySelector('.slideshow-indicators');
    const closeBtn = slideshowRoot.querySelector('.slideshow-close');

    let current = 0;
    let timer = null;

    // Helper: create slide element for each image
    slideshowImages.forEach((src, idx) => {
        const slide = document.createElement('div');
        slide.className = 'slideshow-slide';

        // Accessible image element with alt text derived from filename
        const img = document.createElement('img');
        img.src = src;
        img.alt = `School image ${idx + 1}`;

        slide.appendChild(img);
        slidesContainer.appendChild(slide);

        // Indicator dot
        const dot = document.createElement('button');
        dot.className = 'slideshow-dot';
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        indicatorsContainer.appendChild(dot);
    });

    const total = slideshowImages.length;

    // Move slideshow to a specific slide index
    function goToSlide(index) {
        current = (index + total) % total;
        const offset = current * 100;
        slidesContainer.style.transform = `translateX(-${offset}%)`;
        updateIndicators();
        restartTimer();
    }

    // Update indicator visual state
    function updateIndicators() {
        const dots = indicatorsContainer.querySelectorAll('.slideshow-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    // Advance to next slide
    function nextSlide() {
        goToSlide(current + 1);
    }

    // Start automatic slideshow
    function startTimer() {
        timer = setInterval(nextSlide, slideInterval);
    }

    // Restart timer
    function restartTimer() {
        clearInterval(timer);
        startTimer();
    }

    // Close / hide slideshow and clean up
    function closeSlideshow() {
        clearInterval(timer);
        slideshowRoot.classList.add('hidden');
        slideshowRoot.setAttribute('aria-hidden', 'true');
    }

    // Hook up close action
    closeBtn.addEventListener('click', closeSlideshow);

    // Keyboard support: Esc to close, Left/Right for manual navigation
    slideshowRoot.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeSlideshow();
        if (e.key === 'ArrowLeft') goToSlide(current - 1);
        if (e.key === 'ArrowRight') goToSlide(current + 1);
    });

    // Make the slideshow focusable and focus it for keyboard users
    slideshowRoot.tabIndex = -1;
    slideshowRoot.focus();

    // Preload images, show preloader until images are loaded (or timeout)
    const preloader = slideshowRoot.querySelector('.preloader');
    const slides = slidesContainer.querySelectorAll('.slideshow-slide img');

    // Wait until all images are loaded or timeout (max 3000ms)
    let loadedCount = 0;
    const maxWait = 3000; // max wait time for preload in ms
    let preloadTimedOut = false;

    function checkAllLoaded() {
        if (loadedCount >= slides.length || preloadTimedOut) {
            // Hide preloader and reveal slideshow with entrance animation
            if (preloader) preloader.style.display = 'none';
            const inner = slideshowRoot.querySelector('.slideshow-inner');
            if (inner) inner.classList.add('show');
            // Initialize first slide and start
            goToSlide(0);
            startTimer();
        }
    }

    // Attach load listeners
    slides.forEach(img => {
        if (img.complete) {
            loadedCount++;
            checkAllLoaded();
        } else {
            img.addEventListener('load', function() {
                loadedCount++;
                checkAllLoaded();
            });
            img.addEventListener('error', function() {
                // Treat error as loaded to avoid blocking
                loadedCount++;
                checkAllLoaded();
            });
        }
    });

    // Fallback timeout to avoid blocking slideshow forever
    setTimeout(function() { preloadTimedOut = true; checkAllLoaded(); }, maxWait);
});
