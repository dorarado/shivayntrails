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
   TESTIMONIAL CAROUSEL & CUSTOMER REVIEWS
   ───────────────────────────────────────────────── */
let testimonialAutoPlay = null;

function initTestimonialCarousel() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
    
    // Load persisted user reviews
    loadStoredReviews(track);
    
    let cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let totalPages = Math.ceil(cards.length / cardsPerView);
    
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    // Create dots
    function createDots() {
        cards = track.querySelectorAll('.testimonial-card');
        totalPages = Math.ceil(cards.length / cardsPerView);
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === Math.floor(currentIndex / cardsPerView)) dot.classList.add('active');
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateCarousel() {
        cards = track.querySelectorAll('.testimonial-card');
        if (!cards.length) return;
        
        const cardStyle = window.getComputedStyle(cards[0]);
        const cardMargin = (parseFloat(cardStyle.marginLeft) || 0) + (parseFloat(cardStyle.marginRight) || 0);
        const cardWidth = cards[0].offsetWidth + cardMargin;
        const offset = currentIndex * cardWidth;
        
        track.style.transform = `translateX(-${offset}px)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const activeDotIndex = Math.floor(currentIndex / cardsPerView);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDotIndex);
        });
    }
    
    function goToPage(page) {
        currentIndex = page * cardsPerView;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateCarousel();
    }
    
    prevBtn.onclick = () => {
        currentIndex = Math.max(0, currentIndex - cardsPerView);
        updateCarousel();
    };
    
    nextBtn.onclick = () => {
        currentIndex += cardsPerView;
        if (currentIndex >= cards.length) currentIndex = 0;
        updateCarousel();
    };
    
    // Auto-play
    function startAutoPlay() {
        clearInterval(testimonialAutoPlay);
        testimonialAutoPlay = setInterval(() => {
            cards = track.querySelectorAll('.testimonial-card');
            currentIndex += cardsPerView;
            if (currentIndex >= cards.length) currentIndex = 0;
            updateCarousel();
        }, 5500);
    }
    
    startAutoPlay();
    
    // Pause on hover
    track.onmouseenter = () => clearInterval(testimonialAutoPlay);
    track.onmouseleave = () => startAutoPlay();
    
    // Touch / Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(testimonialAutoPlay);
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                // Swipe Left -> Next
                currentIndex = Math.min(cards.length - 1, currentIndex + cardsPerView);
            } else {
                // Swipe Right -> Prev
                currentIndex = Math.max(0, currentIndex - cardsPerView);
            }
            updateCarousel();
        }
        startAutoPlay();
    }, { passive: true });
    
    // Handle resize
    window.addEventListener('resize', throttle(() => {
        cardsPerView = getCardsPerView();
        createDots();
        currentIndex = 0;
        updateCarousel();
    }, 200));
    
    createDots();
    updateCarousel();
    initStarRatingPicker();
}

function loadStoredReviews(track) {
    try {
        const stored = JSON.parse(localStorage.getItem('shivayan_user_reviews') || '[]');
        if (Array.isArray(stored) && stored.length > 0) {
            // Hide the empty-state placeholder when real reviews exist
            const placeholder = document.getElementById('empty-review-placeholder');
            if (placeholder) placeholder.style.display = 'none';
            stored.forEach(r => {
                const card = createReviewCardElement(r);
                track.insertBefore(card, track.firstChild);
            });
        }
    } catch(e) {
        console.warn('Error loading stored reviews:', e);
    }
}

function createReviewCardElement(review) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    const stars = '★'.repeat(review.rating || 5);
    
    card.innerHTML = `
        <div class="testimonial-stars" style="color: var(--color-gold);">${stars}</div>
        <blockquote class="testimonial-quote">
            "${escapeHTML(review.comment)}"
        </blockquote>
        <div class="testimonial-author">
            <div class="author-avatar">
                <i data-lucide="user-circle"></i>
            </div>
            <div class="author-info">
                <strong>${escapeHTML(review.author)}</strong>
                <span>${escapeHTML(review.trip)} · ${escapeHTML(review.city)}</span>
            </div>
            <div class="verified-badge">
                <i data-lucide="badge-check"></i> Verified
            </div>
        </div>
    `;
    return card;
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

// ─── Interactive Star Rating in Modal ───
function initStarRatingPicker() {
    const picker = document.getElementById('star-rating-picker');
    const input = document.getElementById('review-rating-value');
    if (!picker || !input) return;
    
    const stars = picker.querySelectorAll('.star-pick');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            input.value = rating;
            stars.forEach((s, i) => {
                s.style.opacity = i < rating ? '1' : '0.25';
                s.classList.toggle('active', i < rating);
            });
        });
    });
}

// ─── Modal Open / Close / Submit ───
window.openReviewModal = function() {
    const modal = document.getElementById('review-submission-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
};

window.closeReviewModal = function() {
    const modal = document.getElementById('review-submission-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.submitCustomerReview = function(e) {
    e.preventDefault();
    const author = document.getElementById('review-author')?.value.trim();
    const city = document.getElementById('review-city')?.value.trim();
    const trip = document.getElementById('review-trip')?.value;
    const rating = parseInt(document.getElementById('review-rating-value')?.value || '5');
    const comment = document.getElementById('review-comment')?.value.trim();
    
    if (!author || !city || !comment) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const newReview = { author, city, trip, rating, comment, date: new Date().toISOString() };
    
    // Save to localStorage
    try {
        const stored = JSON.parse(localStorage.getItem('shivayan_user_reviews') || '[]');
        stored.unshift(newReview);
        localStorage.setItem('shivayan_user_reviews', JSON.stringify(stored));
    } catch(err) {
        console.warn('Storage failed:', err);
    }
    
    // Prepend to DOM
    const track = document.getElementById('testimonial-track');
    if (track) {
        // Hide placeholder when a real review is added
        const placeholder = document.getElementById('empty-review-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        const newCard = createReviewCardElement(newReview);
        track.insertBefore(newCard, track.firstChild);
        if (typeof lucide !== 'undefined') lucide.createIcons();
        initTestimonialCarousel();
    }
    
    // Close modal & reset
    closeReviewModal();
    const form = document.getElementById('customer-review-form');
    if (form) form.reset();
    
    // Show toast notification
    showFeedbackToast('Thank you! Your verified review has been published.');
};

function showFeedbackToast(msg) {
    let toast = document.getElementById('feedback-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'feedback-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #11221b;
            color: #2ecc71;
            border: 1px solid #2ecc71;
            border-radius: 99px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transition: transform 0.4s ease, opacity 0.4s ease;
            opacity: 0;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4500);
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
   HERO & DESTINATION SEARCH (Light Themed)
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
    
    const renderSuggestions = (query = '') => {
        const trimmed = query.toLowerCase().trim();
        
        if (trimmed.length === 0) {
            suggestions.innerHTML = `
                <div class="suggestion-group">
                    <span class="suggestion-label">Popular Destinations</span>
                    ${destinations.slice(0, 4).map(d => `
                        <a href="${d.url}" class="suggestion-item">
                            <i data-lucide="${d.icon}"></i> <span>${d.name}</span>
                        </a>
                    `).join('')}
                </div>
            `;
            suggestions.classList.add('active');
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }
        
        const filtered = destinations.filter(d => d.name.toLowerCase().includes(trimmed));
        
        if (filtered.length > 0) {
            suggestions.innerHTML = `
                <div class="suggestion-group">
                    <span class="suggestion-label">Matching Destinations</span>
                    ${filtered.map(d => `
                        <a href="${d.url}" class="suggestion-item">
                            <i data-lucide="${d.icon}"></i> <span>${highlightMatch(d.name, trimmed)}</span>
                        </a>
                    `).join('')}
                </div>
            `;
            suggestions.classList.add('active');
        } else {
            suggestions.innerHTML = `
                <div class="suggestion-group">
                    <span class="suggestion-label">No results found</span>
                    <p style="font-size: 0.875rem; color: #64748B; padding: 0.5rem 0.85rem; margin: 0;">
                        Try searching for "Kedarkantha", "Chopta", "Valley of Flowers", or "Kedarnath"
                    </p>
                </div>
            `;
            suggestions.classList.add('active');
        }
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    input.addEventListener('focus', () => {
        renderSuggestions(input.value);
    });

    input.addEventListener('input', (e) => {
        renderSuggestions(e.target.value);
    });
    
    const executeSearch = () => {
        const query = input.value.trim();
        if (query) {
            window.location.href = `treks.html?search=${encodeURIComponent(query)}`;
        }
    };

    // Search button
    if (searchBtn) {
        searchBtn.addEventListener('click', executeSearch);
    }
    
    // Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });
    
    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.destination-search') && !e.target.closest('.destination-search-container') && !e.target.closest('.hero-search')) {
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
