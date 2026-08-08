<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data.php';

$page_title = 'Gallery | Shivayan Trails';
$meta_description = 'Glimpses of our Himalayan treks, getaways, and sacred journeys — a visual journey through Shivayan Trails.';
require __DIR__ . '/includes/header.php';

// Build a gallery list. In production these would be real photos from expeditions.
$gallery_images = [];
for ($i = 1; $i <= 24; $i++) {
    $gallery_images[] = "images/gallery/gallery-$i.jpg";
}
?>

<section class="page-hero">
  <div class="container">
    <h1 class="reveal">Gallery</h1>
    <p class="reveal">Moments captured on our journeys through the Himalayas.</p>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="gallery-grid" style="grid-template-columns:repeat(4,1fr); grid-auto-rows:240px;">
      <?php foreach ($gallery_images as $i => $img): ?>
        <div class="gallery-item reveal" data-full="<?= h($img) ?>">
          <img src="<?= h($img) ?>" alt="Shivayan Trails gallery photo <?= $i + 1 ?>" loading="lazy" onerror="this.parentElement.style.background='linear-gradient(135deg,#3a6b52,#1c3626)'; this.remove();">
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Lightbox markup (controlled by js/main.js) -->
<div class="lightbox-overlay" id="lightboxOverlay">
  <button class="lightbox-close" id="lightboxClose" aria-label="Close">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>
  <button class="lightbox-nav lightbox-prev" id="lightboxPrev" aria-label="Previous image">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
  </button>
  <img id="lightboxImg" src="" alt="Gallery preview">
  <button class="lightbox-nav lightbox-next" id="lightboxNext" aria-label="Next image">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
  </button>
</div>

<style>
@media (max-width: 1024px) {
  .gallery-grid[style] { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 480px) {
  .gallery-grid[style] { grid-auto-rows: 160px !important; }
}
</style>

<?php require __DIR__ . '/includes/footer.php'; ?>
