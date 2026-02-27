// ── Hamburger Menu Toggle ──

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
}

function openMenu() {
    hamburger.classList.add('active');
    nav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
}

hamburger.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close mobile menu when a nav link is clicked
nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        closeMenu();
    }
});

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
    }
});

// ── Dynamic Copyright Year ──

const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
