/* ═══════════════════════════════════════════════════════════════
   ADVANCED UI INTERACTIONS — REFINED
   Only purposeful, content-serving enhancements
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        initScrollProgress();
        initPageLoader();
    });
});


/* ─────────────────────────────────────────────────
   SCROLL PROGRESS BAR
   ───────────────────────────────────────────────── */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    
    function update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    }
    
    window.addEventListener('scroll', () => requestAnimationFrame(update));
    update();
}


/* ─────────────────────────────────────────────────
   SEAMLESS CINEMATIC CURTAIN PAGE LOADER
   ───────────────────────────────────────────────── */
function initPageLoader() {
    const loader = document.getElementById('page-loader');
    const bar = document.getElementById('loader-progress-bar');
    const percentText = document.getElementById('loader-percent');
    if (!loader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 18) + 8;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            if (bar) bar.style.width = '100%';
            if (percentText) percentText.textContent = '100%';
            
            setTimeout(() => {
                loader.classList.add('loaded');
                setTimeout(() => {
                    if (loader.parentNode) loader.remove();
                }, 1200);
            }, 350);
        } else {
            if (bar) bar.style.width = progress + '%';
            if (percentText) percentText.textContent = progress + '%';
        }
    }, 50);

    window.addEventListener('load', () => {
        progress = Math.max(progress, 90);
    });
}


/* ─────────────────────────────────────────────────
   UTILITY
   ───────────────────────────────────────────────── */
function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}
