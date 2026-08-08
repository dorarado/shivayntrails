<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data.php';

$blogs = get_blogs();
$slug = $_GET['slug'] ?? '';

if (!isset($blogs[$slug])) {
    http_response_code(404);
    $page_title = 'Post Not Found | Shivayan Trails';
    require __DIR__ . '/includes/header.php';
    echo '<section class="section"><div class="container"><h1>Post Not Found</h1><p>The blog post you are looking for does not exist.</p><a href="blogs.php" class="btn btn-primary">Back to Blogs</a></div></section>';
    require __DIR__ . '/includes/footer.php';
    exit;
}

$post = $blogs[$slug];
$page_title = $post['title'] . ' | Shivayan Trails';
$meta_description = $post['excerpt'];
require __DIR__ . '/includes/header.php';

// Related posts (exclude current)
$related = array_filter($blogs, function ($k) use ($slug) { return $k !== $slug; }, ARRAY_FILTER_USE_KEY);
$related = array_slice($related, 0, 2, true);
?>

<article class="blog-detail-hero">
  <div class="container">
    <a href="blogs.php" class="back-link" style="color:var(--color-primary); margin-bottom:20px;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      Back to Blogs
    </a>
    <div class="eyebrow-row">
      <span class="blog-tag" style="background:var(--color-primary-light); color:var(--color-primary);"><?= h($post['read_time']) ?></span>
      <span class="blog-tag" style="background:var(--color-primary-light); color:var(--color-primary);">Blog</span>
    </div>
    <h1 class="reveal"><?= h($post['title']) ?></h1>
  </div>
</article>

<div class="container">
  <div class="blog-detail-media reveal">
    <img src="<?= h($post['image']) ?>" alt="<?= h($post['title']) ?>" onerror="this.style.display='none'">
  </div>
</div>

<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="blog-body reveal">
      <?php foreach ($post['content'] as $paragraph): ?>
        <p><?= h($paragraph) ?></p>
      <?php endforeach; ?>
    </div>

    <div class="blog-body" style="margin-top:40px; text-align:center;">
      <?php if (has_whatsapp()): ?>
      <a href="<?= h(whatsapp_link('Hi Shivayan Trails! I read: ' . $post['title'] . '. I would like to know more about your trips.')) ?>" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path></svg>
        <span>Ask Us on WhatsApp</span>
      </a>
      <?php else: ?>
      <a href="mailto:<?= h(CONTACT_EMAIL) ?>" class="btn btn-whatsapp btn-lg">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"></path><path d="M22 6l-10 7L2 6"></path></svg>
        <span>Ask Us via Email</span>
      </a>
      <?php endif; ?>
    </div>
  </div>
</section>

<?php if (!empty($related)): ?>
<section class="section section-muted">
  <div class="container">
    <div class="section-header reveal">
      <h2>More Stories</h2>
    </div>
    <div class="blog-grid">
      <?php foreach ($related as $rslug => $rpost): ?>
        <a href="blog-detail.php?slug=<?= h($rslug) ?>" class="blog-card reveal">
          <div class="blog-card-media">
            <img src="<?= h($rpost['image']) ?>" alt="<?= h($rpost['title']) ?>" loading="lazy" onerror="this.style.display='none'">
            <div class="blog-card-meta">
              <span class="blog-tag"><?= h($rpost['read_time']) ?></span>
              <span class="blog-tag">Blog</span>
            </div>
          </div>
          <div class="blog-card-body">
            <h3><?= h($rpost['title']) ?></h3>
            <p><?= h($rpost['excerpt']) ?></p>
            <span class="blog-read-more">Read More
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<?php require __DIR__ . '/includes/footer.php'; ?>
