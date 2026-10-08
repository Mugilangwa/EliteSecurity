/* ============================================
   ELITE SECURITY — HOMEPAGE ADVANCED FEATURES
   Counters, animations, scroll effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    initStatsCounter();
    initScrollReveal();
    initMobileMenu();
    initSmoothScroll();
    initQuoteForm();

});

/* ---------- Animated Stats Counter ---------- */
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const animateCounter = (el) => {
        const parent = el.closest('.stat-advanced');
        const target = parseInt(parent.dataset.count, 10);
        const duration = 1800;
        const startTime = performance.now();

        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };

        requestAnimationFrame(step);
    };

    // Trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) observer.observe(statsSection);
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.site-nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('open');
        btn.classList.toggle('active');
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            btn.classList.remove('active');
        });
    });
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#' || id === '#!') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ---------- Quote Form ---------- */
function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '✓ Request Sent';
            btn.style.background = '#15803d';

            showToast('Thank you! Our team will contact you within 24 hours.', 'success');

            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2200);
        }, 1200);
    });
}

/* ---------- Toast ---------- */
function showToast(message, type = 'info') {
    const existing = document.querySelector('.home-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'home-toast';

    const colors = {
        info: '#1e40af',
        success: '#15803d',
        error: '#b91c1c'
    };

    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background-color: ${colors[type] || colors.info};
        color: #ffffff;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-size: 0.95rem;
        font-weight: 500;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 90%;
        text-align: center;
        font-family: inherit;
    `;

    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}