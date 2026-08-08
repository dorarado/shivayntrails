<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data.php';

$page_title = 'Shivayan Trails | Elevate Your Adventure';
$meta_description = "Curated Himalayan treks, serene getaways, and sacred pilgrimages — crafted for the adventurer in you.";
require __DIR__ . '/includes/header.php';

$treks = get_treks();
$getaways = get_getaways();
$dham = get_dham_yatra();
$blogs = get_blogs();

// Featured adventures: one from each category, hand-picked to mirror the source site.
$featured = [
    ['slug' => 'kedarkantha', 'trip' => $treks['kedarkantha'], 'category_key' => 'treks'],
    ['slug' => 'har-ki-dun', 'trip' => $treks['har-ki-dun'], 'category_key' => 'treks'],
    ['slug' => 'chopta-getaway', 'trip' => $getaways['chopta-getaway'], 'category_key' => 'getaways'],
    ['slug' => 'kedarnath', 'trip' => $dham['kedarnath'], 'category_key' => 'dham-yatra'],
];

$gallery_preview = [
    'images/gallery/preview-1.jpg',
    'images/gallery/preview-2.jpg',
    'images/gallery/preview-3.jpg',
    'images/gallery/preview-4.jpg',
    'images/gallery/preview-5.jpg',
    'images/gallery/preview-6.jpg',
];
?>

<!-- ================= HERO ================= -->
<section class="hero">
  <img src="images/hero/hero-mountains.jpg" alt="Breathtaking Himalayan mountain peaks at golden hour" class="hero-bg-img" onerror="this.style.display='none'">
  <div class="hero-content">
    <img src="images/logo.png" alt="Shivayan Trails logo" class="hero-logo">
    <h1>Discover Your<br>Adventure Spirit</h1>
    <p>Curated Himalayan treks, serene getaways, and sacred pilgrimages — crafted for the adventurer in you.</p>
    <a href="#why-choose-us" class="btn btn-primary btn-lg">
      Explore Our Experiences
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </a>
  </div>
</section>

<!-- ================= WHY CHOOSE US ================= -->
<section class="section" id="why-choose-us">
  <div class="container">
    <div class="section-header reveal">
      <h2>Why Choose Shivayan Trails</h2>
      <p>We don't just take you to the mountains — we bring the mountains to life.</p>
    </div>
    <div class="feature-grid">
      <div class="feature-card reveal">
        <div class="feature-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4.5 8-11.8A8 8 0 0 0 4 10.2C4 17.5 12 22 12 22z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
        <h3>Safety First</h3>
        <p>Expert guides and certified safety protocols on every expedition.</p>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg></div>
        <h3>Unforgettable Experiences</h3>
        <p>Thoughtfully curated itineraries that go beyond the ordinary.</p>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3 4 15h16L14 3l-3 6-3-6z"></path></svg></div>
        <h3>Local Expertise</h3>
        <p>Deep regional knowledge from guides who call the mountains home.</p>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="3"></circle><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"></path><circle cx="18" cy="8" r="2.2"></circle></svg></div>
        <h3>Small Groups</h3>
        <p>Personalized attention with intimate group sizes for every trip.</p>
      </div>
    </div>
  </div>
</section>

<!-- ================= FEATURED ADVENTURES ================= -->
<section class="section section-muted">
  <div class="container">
    <div class="section-header reveal">
      <h2>Featured Adventures</h2>
      <p>Handpicked experiences across treks, getaways, and sacred journeys.</p>
    </div>
    <div class="card-grid">
      <?php foreach ($featured as $item):
        $trip = $item['trip']; $category_key = $item['category_key']; $slug = $item['slug'];
        include __DIR__ . '/includes/trip-card.php';
      endforeach; ?>
    </div>
  </div>
</section>

<!-- ================= FIND YOUR JOURNEY ================= -->
<section class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2>Find Your Journey</h2>
      <p>Whether you seek adventure, peace, or spirituality — we have a path for you.</p>
    </div>
    <div class="category-grid">
      <div class="category-card reveal">
        <div class="category-icon"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3 4 15h16L14 3l-3 6-3-6z"></path></svg></div>
        <h3>Treks</h3>
        <p class="tagline">Challenging &amp; Rewarding</p>
        <p>Push your limits on curated Himalayan trails with expert guides.</p>
        <a href="treks.php">Browse Treks
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      <div class="category-card reveal">
        <div class="category-icon"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 15l4-5 4 4 5-7 5 8"></path><path d="M3 19h18"></path></svg></div>
        <h3>Getaways</h3>
        <p class="tagline">Scenic &amp; Relaxing</p>
        <p>Escape to serene mountain retreats and pristine valleys.</p>
        <a href="getaways.php">Browse Getaways
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      <div class="category-card reveal">
        <div class="category-icon"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="M5 8c1.5-2 4-2 5.5 0S12 12 12 12s1-2 2.5-4 4-2 5.5 0"></path></svg></div>
        <h3>Dham Yatra</h3>
        <p class="tagline">Spiritual &amp; Serene</p>
        <p>Embark on sacred pilgrimages to the holiest Himalayan shrines.</p>
        <a href="dham-yatra.php">Browse Dham Yatra
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ================= GALLERY PREVIEW ================= -->
<section class="section section-muted">
  <div class="container">
    <div class="section-header reveal">
      <h2>Glimpses of Adventure</h2>
      <p>Moments captured on our journeys through the Himalayas.</p>
    </div>
    <div class="gallery-grid">
      <?php foreach ($gallery_preview as $i => $img): ?>
        <div class="gallery-item reveal">
          <img src="<?= h($img) ?>" alt="Shivayan Trails gallery preview <?= $i + 1 ?>" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,#3a6b52,#1c3626)'; this.remove();">
        </div>
      <?php endforeach; ?>
    </div>
    <div class="section-cta-center" style="margin-top:36px;">
      <a href="gallery.php" class="btn btn-outline">View Full Gallery</a>
    </div>
  </div>
</section>

<!-- ================= BLOG PREVIEW ================= -->
<section class="section">
  <div class="container">
    <div class="section-header reveal">
      <h2>Stories &amp; Guides</h2>
      <p>Tips, tales, and inspiration from the mountains.</p>
    </div>
    <div class="blog-grid">
      <?php foreach ($blogs as $slug => $post): ?>
        <a href="blog-detail.php?slug=<?= h($slug) ?>" class="blog-card reveal">
          <div class="blog-card-media">
            <img src="<?= h($post['image']) ?>" alt="<?= h($post['title']) ?>" loading="lazy" onerror="this.style.display='none'">
            <div class="blog-card-meta">
              <span class="blog-tag"><?= h($post['read_time']) ?></span>
              <span class="blog-tag">Blog</span>
            </div>
          </div>
          <div class="blog-card-body">
            <h3><?= h($post['title']) ?></h3>
            <p><?= h($post['excerpt']) ?></p>
            <span class="blog-read-more">Read More
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
    <div class="section-cta-center" style="margin-top:36px;">
      <a href="blogs.php" class="btn btn-outline">Visit Our Blog</a>
    </div>
  </div>
</section>

<!-- ================= CONTACT CTA ================= -->
<section class="section section-muted">
  <div class="container">
    <div class="section-header reveal">
      <h2>Ready for Your Adventure?</h2>
      <p>Reach out and let's plan your next Himalayan experience together.</p>
    </div>
    <div class="contact-grid">
      <?php if (has_whatsapp()): ?>
      <a href="<?= h(whatsapp_link('Hi Shivayan Trails!')) ?>" target="_blank" rel="noopener" class="contact-card reveal">
        <div class="contact-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path></svg></div>
        <h3>WhatsApp</h3>
        <p>Chat with us instantly</p>
      </a>
      <?php else: ?>
 <a href="tel:+919876543210" >
               
 <div class="contact-card reveal" title="Call Us">
        <div class="contact-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path></svg></div>
        <h3>Call Us</h3>
        <p>+91-9058344407</p>
      </div>
      </a>
      <?php endif; ?>
      <a href="mailto:<?= h(CONTACT_EMAIL) ?>" class="contact-card reveal">
        <div class="contact-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"></path><path d="M22 6l-10 7L2 6"></path></svg></div>
        <h3>Email</h3>
        <p><?= h(CONTACT_EMAIL) ?></p>
      </a>
    </div>
    <div class="section-cta-center">
      <?php if (has_whatsapp()): ?>
      <a href="<?= h(whatsapp_link('Hi Shivayan Trails!')) ?>" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path></svg>
        <span>Chat with Us on WhatsApp</span>
      </a>
      <?php else: ?>
      <span class="btn btn-whatsapp btn-lg is-disabled" aria-disabled="true" title="Coming soon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path></svg>
        <span>WhatsApp Coming Soon</span>
      </span>
      <?php endif; ?>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
