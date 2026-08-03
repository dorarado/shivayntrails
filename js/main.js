/* ═══════════════════════════════════════════════════════════════
   SHIVAYAN TRAILS — MAIN JAVASCRIPT
   Premium travel agency website interactions
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ─── Theme Toggle ───
    initTheme();

    // ─── Navbar ───
    initNavbar();

    // ─── Mobile Menu ───
    initMobileMenu();

    // ─── Scroll Animations ───
    initScrollAnimations();

    // ─── Testimonial Carousel ───
    initTestimonialCarousel();

    // ─── Back to Top ───
    initBackToTop();

    // ─── Search ───
    initHeroSearch();

    // ─── Modal ───
    initModal();

});


/* ─────────────────────────────────────────────────
   THEME (Dark Mode Only)
   ───────────────────────────────────────────────── */
function initTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('shivayan-theme', 'dark');
}


/* ─────────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────────── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    
    const updateNavbar = () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', throttle(updateNavbar, 16));
    updateNavbar();
}


/* ─────────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────────── */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}


/* ─────────────────────────────────────────────────
   SCROLL ANIMATIONS
   ───────────────────────────────────────────────── */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────────
   TESTIMONIAL CAROUSEL
   ───────────────────────────────────────────────── */
function initTestimonialCarousel() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let totalPages = Math.ceil(cards.length / cardsPerView);
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) * 2;
        const offset = currentIndex * cardWidth;
        track.style.transform = `translateX(-${offset})`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === Math.floor(currentIndex / cardsPerView));
        });
    }
    
    function goToPage(page) {
        currentIndex = page * cardsPerView;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - cardsPerView);
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex += cardsPerView;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateCarousel();
    });
    
    // Auto-play
    let autoPlay = setInterval(() => {
        currentIndex += cardsPerView;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateCarousel();
    }, 5000);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            currentIndex += cardsPerView;
            if (currentIndex >= cards.length) currentIndex = 0;
            updateCarousel();
        }, 5000);
    });
    
    // Handle resize
    window.addEventListener('resize', throttle(() => {
        cardsPerView = getCardsPerView();
        totalPages = Math.ceil(cards.length / cardsPerView);
        createDots();
        currentIndex = 0;
        updateCarousel();
    }, 250));
    
    createDots();
    updateCarousel();
}


/* ─────────────────────────────────────────────────
   BACK TO TOP
   ───────────────────────────────────────────────── */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, 100));
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* ─────────────────────────────────────────────────
   HERO SEARCH
   ───────────────────────────────────────────────── */
function initHeroSearch() {
    const input = document.getElementById('hero-search-input');
    const suggestions = document.getElementById('search-suggestions');
    const searchBtn = document.getElementById('hero-search-btn');
    
    if (!input || !suggestions) return;
    
    // Destinations data
    const destinations = [
        { name: 'Kedarkantha Trek', url: 'treks.html?slug=kedarkantha', icon: 'mountain' },
        { name: 'Har Ki Dun Trek', url: 'treks.html?slug=har-ki-dun', icon: 'mountain' },
        { name: 'Valley of Flowers Trek', url: 'treks.html?slug=valley-of-flowers', icon: 'flower-2' },
        { name: 'Kuari Pass Trek', url: 'treks.html?slug=kuari-pass', icon: 'mountain' },
        { name: 'Chopta - Tungnath - Chandrashila', url: 'treks.html?slug=chopta-tungnath', icon: 'mountain' },
        { name: 'Roopkund Trek', url: 'treks.html?slug=roopkund', icon: 'mountain' },
        { name: 'Brahmatal Trek', url: 'treks.html?slug=brahmatal', icon: 'mountain' },
        { name: 'Chopta Getaway', url: 'getaways.html?slug=chopta', icon: 'tent' },
        { name: 'Rishikesh Getaway', url: 'getaways.html?slug=rishikesh', icon: 'tent' },
        { name: 'Kedarnath Dham Yatra', url: 'dham-yatra.html?slug=kedarnath', icon: 'landmark' },
        { name: 'Badrinath Dham Yatra', url: 'dham-yatra.html?slug=badrinath', icon: 'landmark' },
        { name: 'Char Dham Yatra', url: 'dham-yatra.html?slug=char-dham', icon: 'landmark' },
    ];
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            suggestions.innerHTML = `
                <div class="suggestion-group">
                    <span class="suggestion-label">Popular</span>
                    ${destinations.slice(0, 4).map(d => `
                        <a href="${d.url}" class="suggestion-item">
                            <i data-lucide="${d.icon}"></i> ${d.name}
                        </a>
                    `).join('')}
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }
        
        const filtered = destinations.filter(d => d.name.toLowerCase().includes(query));
        
        if (filtered.length > 0) {
            suggestions.innerHTML = `
                <div class="suggestion-group">
                    <span class="suggestion-label">Results</span>
                    ${filtered.map(d => `
                        <a href="${d.url}" class="suggestion-item">
                            <i data-lucide="${d.icon}"></i> ${highlightMatch(d.name, query)}
                        </a>
                    `).join('')}
                </div>
            `;
        } else {
            suggestions.innerHTML = `
                <div class="suggestion-group">
                    <span class="suggestion-label">No results found</span>
                    <p style="font-size: 0.875rem; color: var(--color-text-muted); padding: 0.5rem 0.75rem;">
                        Try searching for "Kedarkantha", "Chopta", or "Char Dham"
                    </p>
                </div>
            `;
        }
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    
    // Search button
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = input.value.trim();
            if (query) {
                window.location.href = `treks.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = input.value.trim();
            if (query) {
                window.location.href = `treks.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
    
    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hero-search')) {
            suggestions.classList.remove('active');
        }
    });
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/* ─────────────────────────────────────────────────
   MODAL
   ───────────────────────────────────────────────── */
function initModal() {
    const modal = document.getElementById('enquiry-modal');
    const closeBtn = document.getElementById('modal-close');
    const form = document.getElementById('enquiry-form');
    
    if (!modal) return;
    
    // Open modal from any element with data-open-modal
    document.querySelectorAll('[data-open-modal]').forEach(el => {
        el.addEventListener('click', () => openModal());
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal());
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show success state
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Enquiry Sent!';
            btn.style.background = '#25D366';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                closeModal();
                form.reset();
            }, 2000);
        });
    }
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}




/* ─────────────────────────────────────────────────
   NEWSLETTER FORM
   ───────────────────────────────────────────────── */
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = newsletterForm.querySelector('button');
        const input = newsletterForm.querySelector('input');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '✓';
        btn.style.background = '#25D366';
        input.value = '';
        input.placeholder = 'Subscribed!';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            input.placeholder = 'Your email address';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 3000);
    });
}


/* ─────────────────────────────────────────────────
   UTILITY: THROTTLE
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
