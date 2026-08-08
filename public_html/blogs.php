<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data.php';

$page_title = 'Blogs | Shivayan Trails';
$meta_description = 'Tips, tales, and inspiration from the mountains — read the latest from Shivayan Trails.';
require __DIR__ . '/includes/header.php';

$blogs = get_blogs();
?>

<section class="page-hero">
  <div class="container">
    <h1 class="reveal">Blogs</h1>
    <p class="reveal">Tips, tales, and inspiration from the mountains.</p>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="container">
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
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
