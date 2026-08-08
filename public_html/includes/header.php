<?php
/**
 * Shared site header: <head>, nav bar, theme toggle, WhatsApp CTA.
 * Expects optional $page_title and $meta_description to be set before include.
 */
require_once __DIR__ . '/config.php';

$page_title = $page_title ?? SITE_NAME . ' | ' . SITE_TAGLINE;
$meta_description = $meta_description ?? 'Curated Himalayan treks, serene getaways, and sacred pilgrimages — crafted for the adventurer in you.';
$current = current_path();

$nav_items = [
    '/index.php' => 'Home',
    '/treks.php' => 'Treks',
    '/getaways.php' => 'Getaways',
    '/dham-yatra.php' => 'Dham Yatra',
    '/gallery.php' => 'Gallery',
    '/blogs.php' => 'Blogs',
    '/about.php' => 'About',
];

function is_active_nav($href, $current) {
    $base = basename($current);
    if ($base === '' || $base === '/') { $base = 'index.php'; }
    return basename($href) === $base;
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= h($page_title) ?></title>
<meta name="description" content="<?= h($meta_description) ?>">
<link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32.png">
<link rel="icon" type="image/png" sizes="512x512" href="images/favicon-512.png">
<link rel="apple-touch-icon" href="images/favicon-512.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<script>
// Apply saved theme before paint to avoid flash-of-wrong-theme
(function(){
  try {
    var t = localStorage.getItem('at-theme');
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  } catch(e) {}
})();
</script>

<header class="site-header">
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="index.php" class="brand">
        <img src="<?= h(SITE_LOGO) ?>" alt="<?= h(SITE_NAME) ?> logo" class="brand-logo">
        <span class="brand-name">Shivayan Trails</span>
      </a>

      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links" id="navLinks">
        <?php foreach ($nav_items as $href => $label): ?>
          <li>
            <a href="<?= h($href) ?>" class="<?= is_active_nav($href, $current) ? 'active' : '' ?>"><?= h($label) ?></a>
          </li>
        <?php endforeach; ?>
      </ul>

      <div class="nav-actions">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme" title="Toggle theme">
          <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
        <?php if (has_whatsapp()): ?>
        <a href="<?= h(whatsapp_link('Hi Shivayan Trails!' . "\n\n" . 'Page: ' . $current)) ?>" class="btn btn-whatsapp" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path><path d="M12.003 2c-5.517 0-9.998 4.48-9.998 9.999 0 1.766.472 3.42 1.297 4.85L2 22l5.302-1.259a9.96 9.96 0 0 0 4.7 1.257h.001c5.518 0 9.998-4.48 9.998-9.999 0-2.669-1.04-5.176-2.927-7.06A9.94 9.94 0 0 0 12.003 2zm0 18.19a8.19 8.19 0 0 1-4.16-1.14l-.298-.177-3.14.746.84-3.06-.194-.315a8.19 8.19 0 0 1-1.26-4.35c0-4.53 3.686-8.19 8.212-8.19 2.194 0 4.256.854 5.804 2.403a8.14 8.14 0 0 1 2.406 5.79c0 4.53-3.686 8.293-8.21 8.293z"></path></svg>
          <span>WhatsApp</span>
        </a>
        <?php else: ?>
        <span class="btn btn-whatsapp is-disabled" aria-disabled="true" title="Coming soon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path><path d="M12.003 2c-5.517 0-9.998 4.48-9.998 9.999 0 1.766.472 3.42 1.297 4.85L2 22l5.302-1.259a9.96 9.96 0 0 0 4.7 1.257h.001c5.518 0 9.998-4.48 9.998-9.999 0-2.669-1.04-5.176-2.927-7.06A9.94 9.94 0 0 0 12.003 2zm0 18.19a8.19 8.19 0 0 1-4.16-1.14l-.298-.177-3.14.746.84-3.06-.194-.315a8.19 8.19 0 0 1-1.26-4.35c0-4.53 3.686-8.19 8.212-8.19 2.194 0 4.256.854 5.804 2.403a8.14 8.14 0 0 1 2.406 5.79c0 4.53-3.686 8.293-8.21 8.293z"></path></svg>
          <span>WhatsApp</span>
        </span>
        <?php endif; ?>
      </div>
    </div>
  </nav>
</header>

<main>
