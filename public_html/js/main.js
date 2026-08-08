/**
 * Shivayan Trails — Global JS (jQuery)
 * Mobile menu, theme toggle persistence, scroll reveal, gallery lightbox.
 */
(function ($) {
  'use strict';

  $(function () {
    /* ---------- Mobile menu ---------- */
    var $menuBtn = $('#mobileMenuBtn');
    var $navLinks = $('#navLinks');

    $menuBtn.on('click', function () {
      var isOpen = $navLinks.hasClass('open');
      $navLinks.toggleClass('open');
      $menuBtn.toggleClass('open');
      $menuBtn.attr('aria-expanded', String(!isOpen));
    });

    $navLinks.find('a').on('click', function () {
      $navLinks.removeClass('open');
      $menuBtn.removeClass('open');
      $menuBtn.attr('aria-expanded', 'false');
    });

    /* ---------- Theme toggle ---------- */
    var $themeToggle = $('#themeToggle');
    var $html = $('html');

    function setTheme(theme) {
      $html.attr('data-theme', theme);
      try { localStorage.setItem('at-theme', theme); } catch (e) {}
    }

    $themeToggle.on('click', function () {
      var current = $html.attr('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    /* ---------- Scroll reveal ---------- */
    var revealTargets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealTargets.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px 400px 0px' });
      revealTargets.forEach(function (el) { observer.observe(el); });

      // Safety net: reveal everything after a short delay regardless of
      // intersection state, so content is never permanently stuck invisible
      // (e.g. for automated tools, slow layout shifts, or edge-case viewports).
      setTimeout(function () {
        $('.reveal:not(.is-visible)').addClass('is-visible');
      }, 1500);
    } else {
      $('.reveal').addClass('is-visible');
    }

    /* ---------- Lightbox (gallery) ---------- */
    var $overlay = $('#lightboxOverlay');
    var $lightboxImg = $('#lightboxImg');
    var galleryImages = [];
    var currentIndex = 0;

    function openLightbox(index) {
      if (!galleryImages.length) return;
      currentIndex = index;
      $lightboxImg.attr('src', galleryImages[currentIndex]);
      $overlay.addClass('open');
      $('body').css('overflow', 'hidden');
    }

    function closeLightbox() {
      $overlay.removeClass('open');
      $('body').css('overflow', '');
    }

    function showNext(delta) {
      currentIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
      $lightboxImg.attr('src', galleryImages[currentIndex]);
    }

    if ($overlay.length) {
      $('.gallery-item').each(function () {
        galleryImages.push($(this).data('full') || $(this).find('img').attr('src'));
      });

      $('.gallery-item').on('click', function () {
        openLightbox($(this).index());
      });

      $('#lightboxClose').on('click', closeLightbox);
      $('#lightboxPrev').on('click', function () { showNext(-1); });
      $('#lightboxNext').on('click', function () { showNext(1); });

      $overlay.on('click', function (e) {
        if (e.target === this) closeLightbox();
      });

      $(document).on('keydown', function (e) {
        if (!$overlay.hasClass('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext(1);
        if (e.key === 'ArrowLeft') showNext(-1);
      });
    }

    /* ---------- Header shadow on scroll (subtle enhancement) ---------- */
    var $header = $('.site-header');
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 10) {
        $header.css('box-shadow', '0 4px 20px -8px var(--shadow-color)');
      } else {
        $header.css('box-shadow', 'none');
      }
    });
  });
})(jQuery);
