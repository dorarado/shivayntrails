</main>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-col footer-brand">
        <a href="index.php" class="brand">
          <img src="<?= h(SITE_LOGO) ?>" alt="<?= h(SITE_NAME) ?> logo" class="brand-logo">
          <span class="brand-name">Shivayan Trails</span>
        </a>
        <p>Curated Himalayan experiences — treks, getaways, and sacred journeys crafted with care.</p>
        <div class="social-links">
          <a href="https://www.instagram.com/shivayantrails/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram" title="Follow us on Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://wa.me/919058344407" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp" title="Chat on WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="treks.php">Treks</a></li>
          <li><a href="getaways.php">Getaways</a></li>
          <li><a href="dham-yatra.php">Dham Yatra</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="about.php">About Us</a></li>
          <li><a href="gallery.php">Gallery</a></li>
          <li><a href="blogs.php">Blogs</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="terms-and-conditions.php">Terms &amp; Conditions</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; <?= date('Y') ?> Shivayan Trails. All rights reserved.</p>
      <p>Developed by <a href="https://codesaint.in" target="_blank" rel="noopener">Codesaint Technologies Pvt. Ltd.</a></p>
    </div>
  </div>
</footer>

<?php if (has_whatsapp()): ?>
<a href="<?= h(whatsapp_link('Hi Shivayan Trails!')) ?>" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path><path d="M12.003 2c-5.517 0-9.998 4.48-9.998 9.999 0 1.766.472 3.42 1.297 4.85L2 22l5.302-1.259a9.96 9.96 0 0 0 4.7 1.257h.001c5.518 0 9.998-4.48 9.998-9.999 0-2.669-1.04-5.176-2.927-7.06A9.94 9.94 0 0 0 12.003 2zm0 18.19a8.19 8.19 0 0 1-4.16-1.14l-.298-.177-3.14.746.84-3.06-.194-.315a8.19 8.19 0 0 1-1.26-4.35c0-4.53 3.686-8.19 8.212-8.19 2.194 0 4.256.854 5.804 2.403a8.14 8.14 0 0 1 2.406 5.79c0 4.53-3.686 8.293-8.21 8.293z"></path></svg>
</a>
<?php else: ?>
<span class="whatsapp-float is-disabled" aria-hidden="true" title="Coming soon">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.35-.4.523-.6.174-.2.15-.35.05-.523-.099-.174-.9-2.164-1.234-2.964-.334-.798-.674-.686-.925-.686-.25 0-.516-.03-.798-.03-.283 0-.744.108-.949.55-.207.44-.79 1.938-.79 3.978s1.026 4.11 1.174 4.407c.148.297 2.05 3.13 4.98 4.29 2.93 1.16 2.93.775 3.462.727.531-.05 1.749-.727 1.99-1.428.245-.7.245-1.302.174-1.428-.075-.124-.271-.198-.57-.347z"></path><path d="M12.003 2c-5.517 0-9.998 4.48-9.998 9.999 0 1.766.472 3.42 1.297 4.85L2 22l5.302-1.259a9.96 9.96 0 0 0 4.7 1.257h.001c5.518 0 9.998-4.48 9.998-9.999 0-2.669-1.04-5.176-2.927-7.06A9.94 9.94 0 0 0 12.003 2zm0 18.19a8.19 8.19 0 0 1-4.16-1.14l-.298-.177-3.14.746.84-3.06-.194-.315a8.19 8.19 0 0 1-1.26-4.35c0-4.53 3.686-8.19 8.212-8.19 2.194 0 4.256.854 5.804 2.403a8.14 8.14 0 0 1 2.406 5.79c0 4.53-3.686 8.293-8.21 8.293z"></path></svg>
</span>
<?php endif; ?>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
