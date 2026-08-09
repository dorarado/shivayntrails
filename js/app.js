/**
 * SHIVAYAN TRAILS — APP CONTROLLER & INTERACTIVE LOGIC
 * High-performance, zero-dependency, rich interactive UX.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Identify current page context
    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('treks.html') || document.getElementById('treks-catalog')) {
        initCatalogPage('treks');
    } else if (path.includes('getaways.html') || document.getElementById('getaways-catalog')) {
        initCatalogPage('getaways');
    } else if (path.includes('dham-yatra.html') || document.getElementById('dham-yatra-catalog')) {
        initCatalogPage('dhamYatra');
    } else if (path.includes('gallery.html') || document.getElementById('gallery-grid-container')) {
        initGalleryPage();
    } else if (path.includes('blogs.html') || document.getElementById('blogs-grid-container')) {
        initBlogsPage();
    }

    // Initialize global trip detail modal & booking modal
    initDetailModal();
    initBookingModal();

    // Check URL parameters for deep-linking (e.g. ?slug=kedarkantha)
    handleDeepLinks();

    // Initialize Hero Search Dropdown on index.html
    initGlobalSearchDropdown();
});


/* ─────────────────────────────────────────────────
   CATALOG LISTING & FILTER ENGINE
   ───────────────────────────────────────────────── */
function initCatalogPage(typeKey) {
    const container = document.getElementById(`${typeKey}-catalog`) || 
                      document.getElementById('dham-yatra-catalog') ||
                      document.getElementById('treks-catalog') ||
                      document.getElementById('getaways-catalog') ||
                      document.getElementById('catalog-grid');
    if (!container || !window.ShivayanData) return;

    const allItems = window.ShivayanData[typeKey] || [];
    let currentFiltered = [...allItems];

    const searchInput = document.getElementById('catalog-search');
    const filterPills = document.querySelectorAll('.filter-pill');
    const sortSelect = document.getElementById('catalog-sort');
    const diffSelect = document.getElementById('catalog-diff');
    const countBadge = document.getElementById('results-count');

    function render(items) {
        if (countBadge) {
            countBadge.textContent = `${items.length} Expedition${items.length === 1 ? '' : 's'}`;
        }

        if (items.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.6);">
                    <i data-lucide="compass" style="width: 48px; height: 48px; color: var(--color-gold); margin-bottom: 16px;"></i>
                    <h3 style="font-family: 'Cinzel', serif; color: #fff; margin-bottom: 8px;">No Expeditions Match Your Criteria</h3>
                    <p style="font-size: 14px;">Try searching for a different destination or resetting filters.</p>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            return;
        }

        container.innerHTML = items.map(trip => `
            <div class="catalog-card" data-slug="${trip.slug}">
                <div class="card-media">
                    <img src="${trip.image}" alt="${trip.name}" class="card-img" loading="lazy" onerror="this.src='assets/images/mountain-card-bg.jpg'">
                    <div class="card-badges">
                        <span class="badge-tag">${trip.subCategory || trip.category}</span>
                        ${trip.difficultyLevel ? `<span class="badge-diff ${trip.difficultyLevel}">${trip.difficulty}</span>` : ''}
                    </div>
                    <div class="card-rating-float">
                        <i data-lucide="star"></i>
                        <span>${trip.rating || '4.9'}</span>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${trip.name}</h3>
                    <div class="card-specs">
                        <span class="spec-item"><i data-lucide="clock"></i> ${trip.duration}</span>
                        ${trip.altitude ? `<span class="spec-item"><i data-lucide="mountain"></i> ${trip.altitude}</span>` : ''}
                        ${trip.season ? `<span class="spec-item"><i data-lucide="calendar"></i> ${trip.season.split('(')[0]}</span>` : ''}
                    </div>
                    <p class="card-desc">${trip.overview}</p>
                    <div class="card-footer-row">
                        <div class="price-block">
                            <span class="price-label">Starting From</span>
                            <div style="display: flex; align-items: baseline;">
                                <span class="price-val">${window.ShivayanHelper.formatPrice(trip.price)}</span>
                                ${trip.originalPrice ? `<span class="price-original">${window.ShivayanHelper.formatPrice(trip.originalPrice)}</span>` : ''}
                            </div>
                        </div>
                        <div class="card-actions">
                            <button class="btn-card-details" onclick="openTripModal('${trip.slug}')">
                                <span>Itinerary</span>
                                <i data-lucide="arrow-right"></i>
                            </button>
                            <a href="${window.ShivayanHelper.getWhatsAppLink(trip)}" target="_blank" rel="noopener" class="btn-card-wa" title="Instant WhatsApp Enquiry">
                                <i data-lucide="message-circle"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activePill = document.querySelector('.filter-pill.active');
        const categoryFilter = activePill ? activePill.dataset.filter : 'all';
        const diffFilter = diffSelect ? diffSelect.value : 'all';
        const sortVal = sortSelect ? sortSelect.value : 'recommended';

        currentFiltered = allItems.filter(trip => {
            const matchesQuery = !query || 
                trip.name.toLowerCase().includes(query) || 
                trip.overview.toLowerCase().includes(query) ||
                (trip.subCategory && trip.subCategory.toLowerCase().includes(query));

            const matchesCategory = categoryFilter === 'all' || 
                (trip.difficultyLevel && trip.difficultyLevel.includes(categoryFilter)) ||
                (trip.subCategory && trip.subCategory.toLowerCase().includes(categoryFilter.toLowerCase())) ||
                (trip.duration && trip.duration.includes(categoryFilter));

            const matchesDiff = diffFilter === 'all' || trip.difficultyLevel === diffFilter;

            return matchesQuery && matchesCategory && matchesDiff;
        });

        // Sorting
        if (sortVal === 'price-low') {
            currentFiltered.sort((a, b) => a.price - b.price);
        } else if (sortVal === 'price-high') {
            currentFiltered.sort((a, b) => b.price - a.price);
        } else if (sortVal === 'duration-low') {
            currentFiltered.sort((a, b) => a.daysCount - b.daysCount);
        } else if (sortVal === 'duration-high') {
            currentFiltered.sort((a, b) => b.daysCount - a.daysCount);
        } else if (sortVal === 'rating') {
            currentFiltered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        render(currentFiltered);
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 150));
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            applyFilters();
        });
    });

    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    if (diffSelect) diffSelect.addEventListener('change', applyFilters);

    // Initial render
    render(allItems);
}


/* ─────────────────────────────────────────────────
   TRIP DETAIL MODAL & DRAWER CONTROLLER
   ───────────────────────────────────────────────── */
function initDetailModal() {
    let backdrop = document.getElementById('trip-detail-modal');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'trip-detail-modal';
        backdrop.className = 'trip-modal-backdrop';
        backdrop.innerHTML = `
            <div class="trip-modal-container" id="trip-modal-box">
                <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close modal">
                    <i data-lucide="x"></i>
                </button>
                <div id="trip-modal-dynamic-content"></div>
            </div>
        `;
        document.body.appendChild(backdrop);
    }

    const closeBtn = document.getElementById('modal-close-trigger');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTripModal);
    }

    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeTripModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTripModal();
            closeBookingModal();
            closeLightboxModal();
        }
    });
}

window.openTripModal = function(slug) {
    const trip = window.ShivayanHelper.findTripBySlug(slug);
    if (!trip) return;

    const container = document.getElementById('trip-modal-dynamic-content');
    const backdrop = document.getElementById('trip-detail-modal');
    if (!container || !backdrop) return;

    // Update URL hash/query without reloading
    const url = new URL(window.location);
    url.searchParams.set('slug', slug);
    window.history.pushState({ slug }, '', url);

    container.innerHTML = `
        <div class="modal-hero-cover">
            <img src="${trip.image}" alt="${trip.name}" class="modal-hero-img" onerror="this.src='assets/images/mountain-lake-hero.jpg'">
            <div class="modal-hero-overlay"></div>
            <div class="modal-hero-info">
                <div class="modal-meta-row" style="margin-bottom: 8px;">
                    <span class="modal-pill"><i data-lucide="tag"></i> ${trip.subCategory || trip.category}</span>
                    <span class="modal-pill"><i data-lucide="clock"></i> ${trip.duration}</span>
                    ${trip.altitude ? `<span class="modal-pill"><i data-lucide="mountain"></i> ${trip.altitude}</span>` : ''}
                    ${trip.difficulty ? `<span class="modal-pill"><i data-lucide="compass"></i> ${trip.difficulty}</span>` : ''}
                </div>
                <h2 class="modal-title">${trip.name}</h2>
            </div>
        </div>

        <div class="modal-nav-tabs">
            <button class="modal-tab-btn active" onclick="switchModalTab('overview')">Overview & Plan</button>
            <button class="modal-tab-btn" onclick="switchModalTab('itinerary')">Day-Wise Itinerary</button>
            <button class="modal-tab-btn" onclick="switchModalTab('inclusions')">Inclusions & Logistics</button>
            <button class="modal-tab-btn" onclick="switchModalTab('packing')">Packing Checklist</button>
        </div>

        <div class="modal-tab-content">
            <!-- TAB 1: OVERVIEW -->
            <div id="tab-overview" class="tab-pane active">
                <h3 style="font-family: 'Cinzel', serif; color: #fff; margin-bottom: 12px;">About This Journey</h3>
                <p style="line-height: 1.7; color: rgba(242,240,235,0.85); font-size: 15px; margin-bottom: 24px;">${trip.overview}</p>

                ${trip.highlights && trip.highlights.length ? `
                    <h4 style="font-family: 'Cinzel', serif; color: var(--color-gold); margin-bottom: 12px;">Key Highlights</h4>
                    <div class="highlights-list-grid">
                        ${trip.highlights.map(h => `
                            <div class="highlight-box">
                                <i data-lucide="check-circle-2"></i>
                                <p>${h}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <!-- TAB 2: ITINERARY -->
            <div id="tab-itinerary" class="tab-pane">
                <h3 style="font-family: 'Cinzel', serif; color: #fff; margin-bottom: 16px;">Comprehensive Day-by-Day Plan</h3>
                <div class="itinerary-timeline">
                    ${(trip.itinerary || []).map((step, idx) => `
                        <div class="itinerary-step">
                            <div class="itinerary-node"></div>
                            <div class="itinerary-day-tag">${step.day}</div>
                            <h4 class="itinerary-heading">${step.title}</h4>
                            <ul class="itinerary-bullets">
                                ${(step.points || []).map(p => `<li>${p}</li>`).join('')}
                            </ul>
                            ${step.meals ? `<div class="itinerary-meals-badge"><i data-lucide="utensils"></i> ${step.meals}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- TAB 3: INCLUSIONS -->
            <div id="tab-inclusions" class="tab-pane">
                <h3 style="font-family: 'Cinzel', serif; color: #fff; margin-bottom: 16px;">What's Covered & What's Not</h3>
                <div class="inclusions-split">
                    <div class="inc-card included">
                        <div class="inc-title"><i data-lucide="check"></i> Inclusions (Covered)</div>
                        <ul class="inc-list">
                            ${(trip.inclusions || []).map(inc => `<li>${inc}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="inc-card excluded">
                        <div class="inc-title"><i data-lucide="x"></i> Exclusions</div>
                        <ul class="inc-list">
                            ${(trip.exclusions || []).map(exc => `<li>${exc}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <!-- TAB 4: PACKING -->
            <div id="tab-packing" class="tab-pane">
                <h3 style="font-family: 'Cinzel', serif; color: #fff; margin-bottom: 16px;">Recommended Gear & Essentials</h3>
                <div class="highlights-list-grid">
                    ${(trip.packingList || []).map(item => `
                        <div class="highlight-box">
                            <i data-lucide="backpack"></i>
                            <p>${item}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="modal-bottom-bar">
            <div class="modal-price-tag">
                <span class="p-label">All-Inclusive Price</span>
                <div class="p-val-wrap">
                    <span class="p-val">${window.ShivayanHelper.formatPrice(trip.price)}</span>
                    <span class="p-unit">/ person</span>
                </div>
            </div>
            <div class="modal-cta-group">
                <a href="${window.ShivayanHelper.getWhatsAppLink(trip)}" target="_blank" rel="noopener" class="btn-modal-wa" aria-label="WhatsApp Inquiry">
                    <i data-lucide="message-circle"></i>
                    <span>WhatsApp Inquiry</span>
                </a>
                <button class="btn-modal-book" onclick="openBookingModal('${trip.slug}')" aria-label="Book Trip Now">
                    <i data-lucide="calendar-check"></i>
                    <span>Book Now</span>
                </button>
            </div>
        </div>
    `;

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

window.closeTripModal = function() {
    const backdrop = document.getElementById('trip-detail-modal');
    if (backdrop) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove slug from URL
        const url = new URL(window.location);
        url.searchParams.delete('slug');
        window.history.pushState({}, '', url);
    }
};

window.switchModalTab = function(tabName) {
    document.querySelectorAll('.modal-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    const activeBtn = Array.from(document.querySelectorAll('.modal-tab-btn')).find(b => b.textContent.toLowerCase().includes(tabName));
    if (activeBtn) activeBtn.classList.add('active');

    const targetPane = document.getElementById(`tab-${tabName}`);
    if (targetPane) targetPane.classList.add('active');
};


/* ─────────────────────────────────────────────────
   UNIVERSAL BOOKING & ENQUIRY MODAL
   ───────────────────────────────────────────────── */
function initBookingModal() {
    let backdrop = document.getElementById('universal-booking-modal');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'universal-booking-modal';
        backdrop.className = 'book-modal-backdrop';
        backdrop.innerHTML = `
            <div class="book-modal-card">
                <button class="modal-close-btn" onclick="closeBookingModal()" style="top: 12px; right: 12px;" aria-label="Close booking modal">
                    <i data-lucide="x"></i>
                </button>
                <h3 style="font-family: 'Cinzel', serif; color: #fff; margin-bottom: 6px;" id="booking-modal-title">Book Your Expedition</h3>
                <p style="font-size: 13px; color: rgba(255,255,255,0.7); margin-bottom: 18px;" id="booking-modal-subtitle">Hand-crafted Himalayan adventure curated by certified pioneers.</p>
                
                <form id="booking-quick-form" onsubmit="submitBookingForm(event)">
                    <input type="hidden" id="book-trip-slug" value="">
                    
                    <div class="book-form-group">
                        <label class="book-label">Full Name *</label>
                        <input type="text" id="book-name" class="book-input" placeholder="e.g. Rahul Sharma" required>
                    </div>

                    <div class="book-form-row">
                        <div class="book-form-group">
                            <label class="book-label">WhatsApp Number *</label>
                            <input type="tel" id="book-phone" class="book-input" placeholder="+91 98765 43210" required>
                        </div>
                        <div class="book-form-group">
                            <label class="book-label">Email Address</label>
                            <input type="email" id="book-email" class="book-input" placeholder="you@example.com">
                        </div>
                    </div>

                    <div class="book-form-row">
                        <div class="book-form-group">
                            <label class="book-label">Preferred Month / Date</label>
                            <input type="text" id="book-date" class="book-input" placeholder="e.g. Next Month / Oct 15">
                        </div>
                        <div class="book-form-group">
                            <label class="book-label">Number of Travellers</label>
                            <select id="book-pax" class="book-select">
                                <option value="1 Person (Solo Explorer)">1 Person (Solo)</option>
                                <option value="2 Persons (Duo/Couple)" selected>2 Persons</option>
                                <option value="3-5 Persons (Small Group)">3-5 Persons</option>
                                <option value="6-10 Persons (Group Batch)">6-10 Persons</option>
                                <option value="10+ Persons (Corporate / Large Squad)">10+ Persons</option>
                            </select>
                        </div>
                    </div>

                    <div class="book-form-group">
                        <label class="book-label">Custom Requirements or Questions</label>
                        <textarea id="book-notes" class="book-textarea" rows="2" placeholder="Any dietary preferences, offloading needed, or custom pickup location?"></textarea>
                    </div>

                    <button type="submit" class="book-submit-btn">
                        <i data-lucide="send"></i>
                        <span>Confirm & Send via WhatsApp</span>
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(backdrop);
    }
}

window.openBookingModal = function(slug) {
    const trip = slug ? window.ShivayanHelper.findTripBySlug(slug) : null;
    const modal = document.getElementById('universal-booking-modal');
    const slugInput = document.getElementById('book-trip-slug');
    const titleEl = document.getElementById('booking-modal-title');
    const subEl = document.getElementById('booking-modal-subtitle');

    if (!modal) return;

    if (trip) {
        if (slugInput) slugInput.value = trip.slug;
        if (titleEl) titleEl.textContent = `Reserve: ${trip.name}`;
        if (subEl) subEl.textContent = `${trip.duration} | Starting from ${window.ShivayanHelper.formatPrice(trip.price)} per person`;
    } else {
        if (slugInput) slugInput.value = '';
        if (titleEl) titleEl.textContent = 'Custom Expedition Enquiry';
        if (subEl) subEl.textContent = 'Speak directly with our mountain pioneers to plan your trip.';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

window.closeBookingModal = function() {
    const modal = document.getElementById('universal-booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.submitBookingForm = function(e) {
    e.preventDefault();
    const slug = document.getElementById('book-trip-slug').value;
    const name = document.getElementById('book-name').value;
    const phone = document.getElementById('book-phone').value;
    const email = document.getElementById('book-email').value;
    const date = document.getElementById('book-date').value;
    const pax = document.getElementById('book-pax').value;
    const notes = document.getElementById('book-notes').value;

    const trip = slug ? window.ShivayanHelper.findTripBySlug(slug) : null;

    let msg = `Hi Shivayan Trails! 🙏\nI would like to book an expedition:\n`;
    if (trip) {
        msg += `🏔️ *Trip:* ${trip.name} (${trip.duration})\n💰 *Price:* ${window.ShivayanHelper.formatPrice(trip.price)}/person\n`;
    }
    msg += `👤 *Name:* ${name}\n📱 *Contact:* ${phone}\n`;
    if (email) msg += `✉️ *Email:* ${email}\n`;
    if (date) msg += `📅 *Preferred Date:* ${date}\n`;
    msg += `👥 *Travellers:* ${pax}\n`;
    if (notes) msg += `💬 *Notes:* ${notes}\n`;
    msg += `\nPlease share departure availability, batch dates, and payment options.`;

    const waUrl = `https://wa.me/919058344407?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    closeBookingModal();
};


/* ─────────────────────────────────────────────────
   GALLERY PAGE & FULLSCREEN LIGHTBOX
   ───────────────────────────────────────────────── */
let currentGalleryIndex = 0;
let currentGalleryList = [];

function initGalleryPage() {
    const container = document.getElementById('gallery-grid-container');
    if (!container || !window.ShivayanData || !window.ShivayanData.gallery) return;

    currentGalleryList = [...window.ShivayanData.gallery];
    const pills = document.querySelectorAll('.gallery-filter-pill');

    function render(items) {
        container.innerHTML = items.map((item, idx) => `
            <div class="gallery-card-item" onclick="openLightbox(${idx})">
                <img src="${item.src}" alt="${item.title}" loading="lazy" onerror="this.src='assets/images/mountain-lake-hero.jpg'">
                <div class="gallery-card-overlay">
                    <span style="font-size: 10px; font-weight: 700; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.1em;">${item.tag}</span>
                    <h4 style="font-family: 'Cinzel', serif; font-size: 14px; color: #fff; margin: 2px 0;">${item.title}</h4>
                    <span style="font-size: 11px; color: rgba(255,255,255,0.7);">${item.location}</span>
                </div>
            </div>
        `).join('');
    }

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const category = pill.dataset.category;

            if (category === 'all') {
                currentGalleryList = [...window.ShivayanData.gallery];
            } else {
                currentGalleryList = window.ShivayanData.gallery.filter(g => g.category === category);
            }
            render(currentGalleryList);
        });
    });

    render(currentGalleryList);
    initLightboxModal();
}

function initLightboxModal() {
    let lb = document.getElementById('lightbox-modal');
    if (!lb) {
        lb = document.createElement('div');
        lb.id = 'lightbox-modal';
        lb.className = 'lightbox-modal';
        lb.innerHTML = `
            <button class="modal-close-btn" onclick="closeLightboxModal()" style="top: 24px; right: 24px;" aria-label="Close lightbox">
                <i data-lucide="x"></i>
            </button>
            <button class="lightbox-nav-btn lightbox-prev-btn" onclick="navigateLightbox(-1)" aria-label="Previous image">
                <i data-lucide="chevron-left"></i>
            </button>
            <div class="lightbox-img-wrapper">
                <img id="lightbox-img" class="lightbox-active-img" src="" alt="Himalayan vista">
                <div class="lightbox-caption" id="lightbox-caption"></div>
            </div>
            <button class="lightbox-nav-btn lightbox-next-btn" onclick="navigateLightbox(1)" aria-label="Next image">
                <i data-lucide="chevron-right"></i>
            </button>
        `;
        document.body.appendChild(lb);
    }

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('lightbox-modal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

window.openLightbox = function(index) {
    currentGalleryIndex = index;
    updateLightboxContent();
    const lb = document.getElementById('lightbox-modal');
    if (lb) {
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.closeLightboxModal = function() {
    const lb = document.getElementById('lightbox-modal');
    if (lb) {
        lb.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.navigateLightbox = function(direction) {
    if (!currentGalleryList.length) return;
    currentGalleryIndex = (currentGalleryIndex + direction + currentGalleryList.length) % currentGalleryList.length;
    updateLightboxContent();
};

function updateLightboxContent() {
    const item = currentGalleryList[currentGalleryIndex];
    if (!item) return;

    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    if (img) img.src = item.src;
    if (cap) cap.innerHTML = `<strong>${item.title}</strong> &bull; <span style="color: var(--color-gold);">${item.location}</span> (${currentGalleryIndex + 1}/${currentGalleryList.length})`;
}


/* ─────────────────────────────────────────────────
   BLOGS & ARTICLES CONTROLLER
   ───────────────────────────────────────────────── */
function initBlogsPage() {
    const container = document.getElementById('blogs-grid-container');
    if (!container || !window.ShivayanData || !window.ShivayanData.blogs) return;

    const blogs = window.ShivayanData.blogs;
    container.innerHTML = blogs.map(b => `
        <article class="blog-post-card" onclick="openBlogModal('${b.slug}')" style="cursor: pointer;">
            <div class="blog-post-media">
                <img src="${b.image}" alt="${b.title}" loading="lazy" onerror="this.src='assets/images/mountain-lake-hero.jpg'">
            </div>
            <div class="blog-post-body">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <span class="blog-meta-tag">${b.category}</span>
                    <span style="font-size: 11px; color: rgba(255,255,255,0.5);"><i data-lucide="clock" style="width: 12px; height: 12px; display: inline;"></i> ${b.readTime}</span>
                </div>
                <h3 class="blog-post-title">${b.title}</h3>
                <p class="blog-post-excerpt">${b.excerpt}</p>
                <div style="margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--color-gold);">
                    <span>By ${b.author}</span>
                    <span style="font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">Read Guide <i data-lucide="arrow-right" style="width: 12px; height: 12px;"></i></span>
                </div>
            </div>
        </article>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

window.openBlogModal = function(slug) {
    const blog = window.ShivayanHelper.findBlogBySlug(slug);
    if (!blog) return;

    const backdrop = document.getElementById('trip-detail-modal');
    const container = document.getElementById('trip-modal-dynamic-content');
    if (!backdrop || !container) return;

    // Push URL query
    const url = new URL(window.location);
    url.searchParams.set('slug', slug);
    window.history.pushState({ slug }, '', url);

    container.innerHTML = `
        <div class="modal-hero-cover" style="height: 260px;">
            <img src="${blog.image}" alt="${blog.title}" class="modal-hero-img" onerror="this.src='assets/images/mountain-lake-hero.jpg'">
            <div class="modal-hero-overlay"></div>
            <div class="modal-hero-info">
                <span class="modal-pill" style="margin-bottom: 6px;"><i data-lucide="book-open"></i> ${blog.category}</span>
                <h2 class="modal-title" style="font-size: clamp(1.4rem, 3vw, 2.1rem);">${blog.title}</h2>
            </div>
        </div>
        <div style="padding: 28px; max-width: 800px; margin: 0 auto;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 13px; color: rgba(255,255,255,0.6);">
                <span>Written by <strong style="color: var(--color-gold);">${blog.author}</strong> &bull; ${blog.date}</span>
                <span><i data-lucide="clock" style="width: 14px; height: 14px; display: inline;"></i> ${blog.readTime}</span>
            </div>
            <div style="font-size: 15px; line-height: 1.8; color: rgba(242,240,235,0.9);">
                ${blog.content.map(p => `<p style="margin-bottom: 16px;">${p}</p>`).join('')}
            </div>
            <div style="margin-top: 32px; padding: 20px; background: rgba(218,186,111,0.08); border: 1px solid rgba(218,186,111,0.3); border-radius: var(--radius-lg); text-align: center;">
                <h4 style="font-family: 'Cinzel', serif; color: var(--color-gold); margin-bottom: 6px;">Inspired to Trek With Us?</h4>
                <p style="font-size: 13px; color: rgba(255,255,255,0.8); margin-bottom: 16px;">Explore upcoming batches or speak directly with our certified mountain pioneers.</p>
                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                    <a href="treks.html" class="btn-modal-book" style="text-decoration: none;">View All Treks</a>
                    <a href="https://wa.me/919058344407" target="_blank" class="btn-modal-wa" style="text-decoration: none;">Ask on WhatsApp</a>
                </div>
            </div>
        </div>
    `;

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
};


/* ─────────────────────────────────────────────────
   GLOBAL HERO SEARCH & AUTOCOMPLETE ON INDEX
   ───────────────────────────────────────────────── */
function initGlobalSearchDropdown() {
    const input = document.getElementById('hero-search-input');
    const searchContainer = document.querySelector('.hero-search') || document.querySelector('.destination-search');
    if (!input || !searchContainer || !window.ShivayanData) return;

    let dropdown = document.getElementById('hero-search-results');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'hero-search-results';
        dropdown.style.cssText = `
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: #0d1519;
            border: 1px solid rgba(218, 186, 111, 0.4);
            border-radius: var(--radius-lg);
            max-height: 380px;
            overflow-y: auto;
            z-index: 100;
            display: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.9);
            backdrop-filter: blur(16px);
        `;
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(dropdown);
    }

    const all = [...window.ShivayanData.treks, ...window.ShivayanData.getaways, ...window.ShivayanData.dhamYatra];

    function search(query) {
        if (!query) {
            dropdown.style.display = 'none';
            return;
        }

        const matches = all.filter(t => 
            t.name.toLowerCase().includes(query) || 
            t.category.toLowerCase().includes(query) ||
            t.overview.toLowerCase().includes(query)
        ).slice(0, 6);

        if (matches.length === 0) {
            dropdown.innerHTML = `
                <div style="padding: 16px; text-align: center; color: rgba(255,255,255,0.6); font-size: 13px;">
                    No expeditions found for "<strong>${query}</strong>"
                </div>
            `;
            dropdown.style.display = 'block';
            return;
        }

        dropdown.innerHTML = matches.map(m => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); cursor: pointer; transition: background 0.2s;" 
                 onmouseover="this.style.background='rgba(218,186,111,0.1)'" 
                 onmouseout="this.style.background='transparent'"
                 onclick="openTripModal('${m.slug}')">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${m.image}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;" onerror="this.src='assets/images/mountain-card-bg.jpg'">
                    <div>
                        <div style="font-weight: 700; color: #fff; font-size: 14px;">${m.name}</div>
                        <div style="font-size: 11px; color: var(--color-gold);">${m.category} &bull; ${m.duration}</div>
                    </div>
                </div>
                <div style="font-weight: 800; color: var(--color-gold); font-size: 14px;">
                    ${window.ShivayanHelper.formatPrice(m.price)}
                </div>
            </div>
        `).join('');

        dropdown.style.display = 'block';
    }

    input.addEventListener('input', (e) => {
        search(e.target.value.toLowerCase().trim());
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}


/* ─────────────────────────────────────────────────
   DEEP LINKING ROUTER
   ───────────────────────────────────────────────── */
function handleDeepLinks() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (slug) {
        setTimeout(() => {
            if (window.ShivayanHelper.findTripBySlug(slug)) {
                openTripModal(slug);
            } else if (window.ShivayanHelper.findBlogBySlug(slug)) {
                openBlogModal(slug);
            }
        }, 200);
    }
}


/* ─────────────────────────────────────────────────
   UTILITY
   ───────────────────────────────────────────────── */
function debounce(fn, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}
