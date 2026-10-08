/* ============================================
   ELITE SECURITY COMPANY LIMITED
   Main JavaScript File
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Image Slider ----------
    initSlider();

    // ---------- Active Nav Highlight ----------
    highlightActiveNav();

    // ---------- Login Form ----------
    initLoginForm();

    // ---------- Contact Form ----------
    initContactForm();

    // ---------- Smooth Scroll ----------
    initSmoothScroll();
});

/* ---------- Image Slider ---------- */
function initSlider() {
    const slides = document.getElementById('slides');
    if (!slides) return;

    const slideItems = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    if (slideItems.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slideItems.length;
    let slideInterval;

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slideItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateSlider() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    createDots();
    startAutoSlide();
}

/* ---------- Highlight Active Nav Link ---------- */
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes(linkPath.replace('../', '').replace('./', ''))) {
            link.classList.add('active');
        }
    });
}

/* ---------- Login Form ---------- */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const alertBox = document.getElementById('loginAlert');

        // Simple demo validation
        if (!email || !password) {
            showAlert(alertBox, 'Tafadhali jaza barua pepe na neno la siri.', 'error');
            return;
        }

        if (password.length < 6) {
            showAlert(alertBox, 'Neno la siri linahitaji herufi 6 au zaidi.', 'error');
            return;
        }

        // Demo success message
        showAlert(alertBox, 'Karibu! Unaingia kwenye mfumo...', 'success');

        // Reset form
        setTimeout(() => {
            loginForm.reset();
            hideAlert(alertBox);
        }, 2500);
    });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Inatuma...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Ujumbe Umetumwa ✓';
            btn.style.backgroundColor = '#1b5e20';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1200);
    });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ---------- Alert Helpers ---------- */
function showAlert(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = 'alert alert-' + type + ' show';
}

function hideAlert(element) {
    if (!element) return;
    element.className = 'alert';
}