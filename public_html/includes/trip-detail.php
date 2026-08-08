<?php
/**
 * Shared trip detail template.
 * Expects $trip (array), $category_key, $category_label, $slug in scope.
 */
$back_url = $category_key . '.php';
$whatsapp_msg = "Hi Shivayan Trails!\nI'm interested in this trip:\n"
    . "Trip: {$trip['name']}\n"
    . "Category: {$category_label}\n"
    . "Duration: {$trip['duration']}\n"
    . (!empty($trip['altitude']) ? "Altitude: {$trip['altitude']}\n" : '')
    . "Difficulty: {$trip['difficulty']}\n"
    . "Price: From " . rupee($trip['price']) . "\n"
    . "Trip page: /{$back_url}?slug={$slug}\n"
    . "Please share available dates and booking details.";
?>
<section class="detail-hero">
  <img src="<?= h($trip['image']) ?>" alt="<?= h($trip['name']) ?>" onerror="this.style.display='none'">
  <div class="detail-hero-content">
    <div class="container">
      <a href="<?= h($back_url) ?>" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to <?= h($category_label) ?>
      </a>
      <h1><?= h($trip['name']) ?></h1>
      <div class="detail-meta-row">
        <span class="meta-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <?= h($trip['duration']) ?>
        </span>
        <?php if (!empty($trip['altitude'])): ?>
          <span class="meta-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3 4 15h16L14 3l-3 6-3-6z"></path></svg>
            <?= h($trip['altitude']) ?>
          </span>
        <?php endif; ?>
        <?php if (!empty($trip['difficulty'])): ?>
          <span class="meta-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            <?= h($trip['difficulty']) ?>
          </span>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>

<div class="container">
  <div class="detail-layout">
    <div class="detail-main">
      <section class="reveal">
        <h2>Overview</h2>
        <p><?= h($trip['overview']) ?></p>
      </section>

      <?php if (!empty($trip['itinerary'])): ?>
      <section class="reveal">
        <h2>Day-wise Itinerary</h2>
        <div class="itinerary-list">
          <?php foreach ($trip['itinerary'] as $day): ?>
            <div class="itinerary-day">
              <p class="itinerary-day-label"><?= h($day['day']) ?></p>
              <h3><?= h($day['title']) ?></h3>
              <ul>
                <?php foreach ($day['points'] as $point): ?>
                  <li><?= h($point) ?></li>
                <?php endforeach; ?>
              </ul>
              <?php if (!empty($day['meals'])): ?>
                <span class="meals-tag">Meals: <?= h($day['meals']) ?></span>
              <?php endif; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </section>
      <?php endif; ?>

      <?php if (!empty($trip['highlights'])): ?>
      <section class="reveal">
        <h2>Highlights</h2>
        <div class="highlights-grid">
          <?php foreach ($trip['highlights'] as $highlight): ?>
            <div class="highlight-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span><?= h($highlight) ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      </section>
      <?php endif; ?>
    </div>

    <aside class="booking-sidebar">
      <div class="booking-card reveal">
        <p class="from-label">From</p>
        <p class="price"><?= rupee($trip['price']) ?></p>
        <p class="per-person">per person</p>
        <?php if (has_whatsapp()): ?>
        <a href="<?= h(whatsapp_link($whatsapp_msg)) ?>" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path></svg>
          <span>Book via WhatsApp</span>
        </a>
        <p class="helper-text">Chat with us for dates, availability &amp; group discounts.</p>
        <?php else: ?>
        <a href="mailto:<?= h(CONTACT_EMAIL) ?>?subject=<?= h(rawurlencode('Booking enquiry: ' . $trip['name'])) ?>" class="btn btn-whatsapp btn-block">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"></path><path d="M22 6l-10 7L2 6"></path></svg>
          <span>Book via Email</span>
        </a>
        <p class="helper-text">Email us for dates, availability &amp; group discounts.</p>
        <?php endif; ?>
      </div>

      <?php if (!empty($trip['packing_list'])): ?>
      <div class="sidebar-box reveal">
        <h3>Things to Pack</h3>
        <ul class="plain-list">
          <?php foreach ($trip['packing_list'] as $item): ?>
            <li><?= h($item) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endif; ?>

      <?php if (!empty($trip['inclusions'])): ?>
      <div class="sidebar-box reveal">
        <h3>Inclusions</h3>
        <ul class="check-list">
          <?php foreach ($trip['inclusions'] as $item): ?>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span><?= h($item) ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endif; ?>

      <?php if (!empty($trip['exclusions'])): ?>
      <div class="sidebar-box reveal">
        <h3>Exclusions</h3>
        <ul class="cross-list">
          <?php foreach ($trip['exclusions'] as $item): ?>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              <span><?= h($item) ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endif; ?>
    </aside>
  </div>
</div>
