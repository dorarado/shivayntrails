# TODO

## High priority — before going live
- [ ] **Add real photography.** Every image slot currently falls back to a CSS gradient placeholder (via `onerror` handlers) because no photos were copied from the reference site. Populate `images/hero/`, `images/treks/`, `images/getaways/`, `images/dham-yatra/`, `images/blogs/`, `images/team/`, `images/gallery/` with licensed/original photos matching the filenames already referenced in `data/*.php`.
- [ ] **Regenerate `screenshots/`** once real photos are added — the current set (captured 2026-07-08) shows CSS gradient placeholders instead of actual trip/gallery photography, so they'll be outdated as soon as images are populated.
- [ ] **Swap the WhatsApp number and contact details** in `includes/config.php` (`WHATSAPP_NUMBER`, `CONTACT_PHONE_DISPLAY`, `CONTACT_EMAIL`) if this is not meant to reuse the original business's contact info.
- [ ] **Update social links** in `includes/config.php` (`SOCIAL_INSTAGRAM`, `SOCIAL_FACEBOOK`, `SOCIAL_LINKEDIN`) to the correct accounts.
- [ ] Review all copy in `data/*.php` (trek/getaway/yatra descriptions, team bios, blog posts) for accuracy — content was reconstructed from the live site and may need business sign-off before publishing.

## Medium priority
- [ ] **Booking flow beyond WhatsApp.** Currently all "Book" CTAs deep-link to WhatsApp with a pre-filled message. Consider a proper booking form / backend if WhatsApp-only isn't sufficient long-term.
- [ ] **Blog content management.** Blog posts are hardcoded in `data/blogs.php`. If the client will publish new posts regularly, consider a lightweight CMS or admin form instead of hand-editing PHP arrays.
- [ ] **Image optimization pipeline.** Once real photos are added, ensure they're compressed/resized appropriately (the current `<img>` markup has no `srcset`/responsive-image handling).
- [ ] **Accessibility pass.** Re-run the pre-delivery checklist (alt text on real images once added, focus states, color contrast in both themes) now that placeholder gradients will be replaced with actual photos.
- [ ] **SEO basics.** Add per-page `<meta description>` refinement (currently set per-page but generic), Open Graph tags, and a sitemap if this goes live publicly.

## Low priority / nice-to-have
- [ ] Add pagination or "load more" to `gallery.php` and `blogs.php` if content grows significantly.
- [ ] Consider server-side caching for `data/*.php` lookups if trip counts grow large (currently loaded fresh via `require` per request, cached only within a single request via `static` vars in `includes/data.php`).
- [ ] Add a proper 404 page shared across all routes instead of the inline error markup duplicated in `treks.php`/`getaways.php`/`dham-yatra.php`/`blog-detail.php`.
- [ ] Add automated tests (e.g., a simple PHP script or CI check) that hits every page/slug combination and asserts HTTP 200, to catch regressions like the `listing-template.php` path bug fixed in this build.

## Known limitations
- The site currently reuses the "Codesaint Technologies Pvt. Ltd." developer credit in the footer per explicit request — confirm this is the desired final attribution before delivery to the client (Alpiene Thrills), since typical client-facing deliverables should credit the client's brand, not the development agency, unless contractually specified otherwise.
- No server-side form validation/CSRF protection is needed currently since there are no forms — if a booking form is added later (see Medium priority above), standard input validation and CSRF protections must be implemented.
