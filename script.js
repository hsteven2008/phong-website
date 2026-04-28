// =====================================================
// Phong Hoang — Personal Site
// Minimal interactivity: scroll state, mobile menu, year
// =====================================================

(function () {
  'use strict';

  const nav        = document.getElementById('nav');
  const navToggle  = document.querySelector('.nav-toggle');
  const navLinks   = document.querySelector('.nav-links');
  const yearSpan   = document.getElementById('year');

  // Sticky-nav style change on scroll
  let lastScrolled = false;
  function onScroll() {
    const scrolled = window.scrollY > 12;
    if (scrolled !== lastScrolled) {
      nav.classList.toggle('scrolled', scrolled);
      lastScrolled = scrolled;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Auto-update copyright year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();
