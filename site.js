function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', toggleTheme);
    }
}

function showCopiedBadge(target) {
    const badge = document.createElement('span');
    badge.className = 'copied-badge';
    badge.textContent = 'Copied!';
    document.body.appendChild(badge);

    const rect = target.getBoundingClientRect();
    badge.style.left = (rect.left + rect.width / 2) + 'px';
    badge.style.top = rect.top + 'px';

    requestAnimationFrame(() => badge.classList.add('show'));

    setTimeout(() => {
        badge.classList.remove('show');
        setTimeout(() => badge.remove(), 200);
    }, 1200);
}

function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve();
}

function initCopyToClipboard() {
    document.querySelectorAll('[data-copy]').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const text = el.getAttribute('data-copy');
            copyText(text).then(() => showCopiedBadge(el));
        });
    });
}

const STAR_COLORS = ['#ffffff', '#cfe0ff', '#e6d9ff', '#fff6df'];

function initStars() {
    const container = document.getElementById('hero-stars');
    if (!container) return;

    const count = 55;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('span');
        star.className = 'star';

        const size = 1 + Math.random() * 2.2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        star.style.setProperty('--star-color', STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]);
        star.style.setProperty('--star-duration', `${2 + Math.random() * 3}s`);
        star.style.setProperty('--star-delay', `${Math.random() * 4}s`);
        star.style.setProperty('--star-min-opacity', `${0.15 + Math.random() * 0.25}`);

        container.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initCopyToClipboard();
    initStars();
});
