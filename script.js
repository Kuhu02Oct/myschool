/*
   S D Memorial Sanskar Public School - Clean Script
   Safe version (no slideshow, no gallery crash)
*/

document.addEventListener('DOMContentLoaded', function() {

    /* ================= MOBILE MENU ================= */

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }


    /* ================= SCROLL ACTIVE LINK ================= */

    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll(".section");

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.style.borderBottomColor =
                link.getAttribute("href") === "#" + current
                ? "#fbbf24"
                : "transparent";
        });
    });


    /* ================= FADE ANIMATION ================= */

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".about-card, .class-card, .step, .info-item")
        .forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "0.6s ease";
            observer.observe(el);
        });


    /* ================= CONTACT FORM ================= */

    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const formMessage = document.getElementById("formMessage");
        const submitBtn = form.querySelector(".submit-btn");

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };

        if (!data.name || !data.email || !data.subject || !data.message) {
            formMessage.textContent = "✗ Please fill all required fields";
            formMessage.className = "form-message error";
            return;
        }

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbxayswOFglIlarHeoOmg265OJb0Kns2YlkbYxnPHcf4QhwO6EqPT0ujr1TMyqIWQQzJIw/exec",
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            if (result.result === "success") {
                formMessage.textContent = "✓ Message sent successfully!";
                formMessage.className = "form-message success";
                form.reset();
            } else {
                throw new Error();
            }

        } catch {
            formMessage.textContent = "✗ Failed to send. Please try again.";
            formMessage.className = "form-message error";
        }

        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
    });


    console.log("Website Loaded Successfully");
});
