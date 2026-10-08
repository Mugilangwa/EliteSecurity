/* ============================================
   ELITE SECURITY — PORTAL SCRIPT
   Handles tabs, forms, and live clock
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    initPortalTabs();
    initLiveClock();
    initPortalForms();

});

/* ---------- Portal Tabs ---------- */
function initPortalTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabButtons.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const target = document.getElementById(targetTab);
            if (target) target.classList.add('active');
        });
    });
}

/* ---------- Live Clock ---------- */
function initLiveClock() {
    const clock = document.getElementById('liveClock');
    if (!clock) return;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* ---------- Portal Forms ---------- */
function initPortalForms() {

    // -------- Login Form --------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientId = document.getElementById('client-id').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!clientId || !password) {
                showToast('Please fill in all login fields.', 'error');
                return;
            }

            showToast(`Authenticating Account: ${clientId}...`, 'info');

            setTimeout(() => {
                showToast('✓ Login successful. Redirecting to dashboard...', 'success');
                setTimeout(() => loginForm.reset(), 2200);
            }, 1500);
        });
    }

    // -------- Quote Form --------
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('quote-name').value.trim();
            const service = document.getElementById('quote-service').value;

            showToast(`Submitting quote request for ${service}...`, 'info');

            setTimeout(() => {
                showToast(`✓ Thank you, ${name}! Your quote request has been received.`, 'success');
                setTimeout(() => quoteForm.reset(), 2200);
            }, 1200);
        });
    }

    // -------- Incident Form --------
    const incidentForm = document.getElementById('incidentForm');
    if (incidentForm) {
        incidentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('incident-type').value;
            const ticketId = 'INC-' + Math.floor(100000 + Math.random() * 900000);

            showToast(`Creating incident ticket...`, 'info');

            setTimeout(() => {
                showToast(`✓ Ticket ${ticketId} created for [${type}]. Command Center notified.`, 'success');
                setTimeout(() => incidentForm.reset(), 2200);
            }, 1200);
        });
    }
}

/* ---------- Toast Notification ---------- */
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existing = document.querySelector('.portal-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'portal-toast portal-toast-' + type;

    const colors = {
        info: { bg: '#1e40af', border: '#3b82f6' },
        success: { bg: '#15803d', border: '#22c55e' },
        error: { bg: '#b91c1c', border: '#ef4444' }
    };

    const color = colors[type] || colors.info;

    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background-color: ${color.bg};
        color: #ffffff;
        padding: 0.9rem 1.75rem;
        border-radius: 8px;
        border-left: 4px solid ${color.border};
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
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
    }, 3000);
}