<?php
/**
 * Reusable trip card. Expects $trip (array) and $category_key (string) in scope,
 * and $slug (string, the array key) in scope.
 */
$img = $trip['image'] ?? '';
$name = $trip['name'] ?? '';
$category = $trip['category'] ?? '';
$duration = $trip['duration'] ?? '';
$altitude = $trip['altitude'] ?? '';
$price = $trip['price'] ?? 0;
$url = trip_url($category_key, $slug);
?>
<a href="<?= h($url) ?>" class="trip-card reveal">
  <div class="trip-card-media">
    <?php if ($img): ?>
      <img src="<?= h($img) ?>" alt="<?= h($name) ?>" loading="lazy" onerror="this.closest('.trip-card-media').classList.add('img-fallback')">
    <?php endif; ?>
    <span class="trip-card-badge"><?= h($category) ?></span>
  </div>
  <div class="trip-card-body">
    <h3><?= h($name) ?></h3>
    <div class="trip-card-meta">
      <?php if ($duration): ?>
        <span class="meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <?= h($duration) ?>
        </span>
      <?php endif; ?>
      <?php if ($altitude): ?>
        <span class="meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3 4 15h16L14 3l-3 6-3-6z"></path></svg>
          <?= h($altitude) ?>
        </span>
      <?php endif; ?>
    </div>
    <div class="trip-card-footer">
      <span class="trip-price">From <?= rupee($price) ?></span>
      <span class="trip-card-cta">View Details
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </span>
    </div>
  </div>
</a>
