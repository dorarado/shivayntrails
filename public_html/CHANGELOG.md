# Changelog

All notable changes to the Alpiene Thrills clone are documented in this file.

## [Unreleased]

### Added
- "Developed by Codesaint Technologies Pvt. Ltd." credit link in the site footer (`includes/footer.php`), replacing the placeholder "Made with ❤ in the Himalayas" line.
- Hover styling for the new footer credit link (`.footer-bottom p a`) in `css/style.css`.
- `screenshots/` folder with full-page desktop (1440×900) screenshots of all 12 distinct page types: home, treks listing, trek detail, getaways listing, getaway detail, dham yatra listing, dham yatra detail, gallery, blogs listing, blog detail, about, terms & conditions.

### Fixed
- **Scroll-reveal content invisible on initial load.** `js/main.js`'s `IntersectionObserver` for `.reveal` elements used `threshold: 0.12` with a negative bottom `rootMargin`, meaning most below-the-fold content (feature cards, trip cards, category cards, gallery items, blog cards) stayed at `opacity: 0` until scrolled precisely into view. This broke full-page screenshots (content appeared blank/missing) and was a real UX risk for anchor-link jumps or fast scrolling. Fixed by extending `rootMargin` to `0px 0px 400px 0px` (triggers ~400px before entering the viewport) and adding a 1.5s safety-net `setTimeout` that force-reveals any remaining hidden elements, guaranteeing content is never stuck invisible.
- Left/right padding on `.site-footer` (was `padding: 64px 0 28px`, now `padding: 64px 24px 28px`) plus a `.footer-inner` max-width wrapper, so footer content aligns with the rest of the page's container spacing on all screen sizes.
- `includes/listing-template.php` referenced `./includes/trip-card.php` (a duplicated path since the file is already inside `includes/`), causing PHP warnings on every listing page (treks/getaways/dham-yatra). Corrected to `./trip-card.php`.

## [0.1.0] - Initial build

Full HTML5 / CSS3 / JavaScript (jQuery) / PHP clone of alpienethrills.com, built from a live inspection of the reference site (nav structure, fonts, colors, content, WhatsApp integration).

### Added
- **Includes / shared logic**
  - `includes/config.php` — site constants (`SITE_NAME`, `WHATSAPP_NUMBER`, contact info, social links) and helpers (`h()`, `whatsapp_link()`, `rupee()`, `current_path()`).
  - `includes/data.php` — data loaders (`get_treks()`, `get_getaways()`, `get_dham_yatra()`, `get_blogs()`, `get_team()`), `trip_categories()`, `find_trip()`, `all_trips()`, `trip_url()`.
  - `includes/header.php` — `<head>`, sticky nav bar, logo, nav links with active-state detection, dark/light theme toggle button, WhatsApp CTA button, mobile hamburger menu button.
  - `includes/footer.php` — footer columns (brand/social, Explore, Company, Legal), floating WhatsApp button, jQuery + `js/main.js` script includes.
  - `includes/trip-card.php` — reusable trip card partial (image, category badge, duration/altitude meta, price, "View Details" CTA).
  - `includes/trip-detail.php` — shared detail-page template: hero image, overview, day-wise itinerary timeline, highlights grid, sticky booking sidebar (price, WhatsApp booking CTA with pre-filled trip details, packing list, inclusions, exclusions).
  - `includes/listing-template.php` — shared listing-page template (page hero + trip card grid) used by treks/getaways/dham-yatra.

- **Data files** (`data/`)
  - `treks.php` — 17 treks (Kedarkantha, Har Ki Dun, Valley of Flowers, Kuari Pass, Dayara Bugyal, Brahmatal, Nag Tibba, Kedartal, Bali Pass, Roopkund, Baraadsar Lake, Gomukh, Darma Valley, Triund, Rupin Pass, Kinner Kailash, Niti Valley, Kashmir Great Lakes) with full itineraries, highlights, packing lists, inclusions/exclusions.
  - `getaways.php` — 20 getaways (Harsil Valley, Nainital, Mussoorie, Kanatal, Chakrata, Auli, Chopta, Rishikesh, Munsiyari, Manali–Kasol, Jibhi, Tirthan Valley, McLeodganj, Bir Billing, Spiti–Kinnaur, Kalpa–Chitkul, Chanshal Pass, Leh–Ladakh, Jammu & Kashmir, Gulmarg, Jaisalmer, Udaipur).
  - `dham-yatra.php` — 6 pilgrimage packages (Kedarnath, Badrinath, Kedarnath–Badrinath 2 Dham, Char Dham, Haridwar, Adi Kailash).
  - `blogs.php` — 3 blog posts (Spiti vs Ladakh, Rise of Micro-Adventures, Why Group Travel is the New Luxury).
  - `team.php` — 9 team member profiles (Founder, Co-founder, Marketing Head, Legal Head, Technical Head, Operations Manager, HR Head, Paragliding Pilot, Tour Guide).

- **Pages**
  - `index.php` — home page: hero, "Why Choose Alpiene Thrills" (4 feature cards), Featured Adventures (4 cards across categories), Find Your Journey (3 category cards), Gallery preview (6 images), Stories & Guides blog preview (3 posts), Contact CTA (WhatsApp/Call/Email cards + floating CTA).
  - `treks.php`, `getaways.php`, `dham-yatra.php` — each handles both the category listing (via `includes/listing-template.php`) and, via `?slug=`, the detail view (via `includes/trip-detail.php`) for that category.
  - `gallery.php` — 24-image responsive grid with click-to-open lightbox.
  - `blogs.php` — blog listing (reuses the same card layout as the home page preview).
  - `blog-detail.php` — full article view via `?slug=`, with related-posts section and a WhatsApp "Ask Us" CTA; 404s gracefully for unknown slugs.
  - `about.php` — hero, Our Story (2-column with founding stats), Why Choose Us (7 numbered feature cards), Meet The Team grid.
  - `terms-and-conditions.php` — 9-section static legal page (booking/payment, cancellation policy, health/fitness, force majeure, traveller conduct, inclusions/exclusions, liability, itinerary changes, contact).

- **Styling** (`css/style.css`)
  - CSS custom-property design tokens for light and dark themes via `[data-theme="dark"]`.
  - Components: navbar, hero, feature/trip/category/blog/team/contact cards, itinerary timeline, booking sidebar, footer, floating WhatsApp button, lightbox overlay.
  - Responsive breakpoints at 1024px, 780px (mobile nav collapse), and 640px.
  - Scroll-reveal (`.reveal` / `.reveal.is-visible`) animation hooks.

- **JavaScript** (`js/main.js`, jQuery-based)
  - Mobile hamburger menu open/close toggle.
  - Dark/light theme toggle, persisted to `localStorage` under the `at-theme` key; applied pre-paint via an inline script in `includes/header.php` to avoid a flash of the wrong theme.
  - `IntersectionObserver`-driven scroll-reveal for `.reveal` elements.
  - Gallery lightbox (open/close, prev/next, click-outside-to-close, Escape/Arrow-key navigation).
  - Subtle header shadow on scroll.

### Notes
- No photos were copied from the reference site; all image slots (`<img>` tags) have `onerror` handlers that remove the broken image and reveal a CSS gradient placeholder already defined on the parent element. Real photography should be added under `images/` before going live.
- Verified with PHP 8.4.22's built-in server: all static pages return HTTP 200; all `?slug=` detail routes for treks/getaways/dham-yatra/blog-detail return HTTP 200 for valid slugs and HTTP 404 with a friendly error page for invalid ones; no PHP warnings in the server log after the `listing-template.php` path fix; confirmed dark mode and mobile menu toggle both work via browser automation.
