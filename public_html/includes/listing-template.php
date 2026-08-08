<?php
/**
 * Shared listing template.
 * Expects $category_key ('treks'|'getaways'|'dham-yatra') and $category_label to be set,
 * and $dataset (assoc array of slug => trip) to be set, before including this file.
 */
?>
<section class="page-hero">
  <div class="container">
    <h1 class="reveal"><?= h($category_label) ?></h1>
    <p class="reveal">Browse all <?= h(strtolower($category_label)) ?> experiences.</p>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="card-grid">
      <?php foreach ($dataset as $slug => $trip): ?>
        <?php include __DIR__ . '/trip-card.php'; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>
