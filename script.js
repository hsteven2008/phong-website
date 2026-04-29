// =====================================================
// Phong Hoang — Personal Site
// Scroll state, mobile menu, theme toggle, scroll reveal
// =====================================================

(function () {
  'use strict';

  const root         = document.documentElement;
  const nav          = document.getElementById('nav');
  const navToggle    = document.querySelector('.nav-toggle');
  const navLinks     = document.querySelector('.nav-links');
  const themeToggle  = document.querySelector('.theme-toggle');
  const yearSpan     = document.getElementById('year');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Sticky-nav style change on scroll ----------
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

  // ---------- Mobile menu toggle ----------
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Theme toggle ----------
  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function applyTheme(theme, persist) {
    root.classList.add('theme-transitioning');
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
    setTimeout(function () {
      root.classList.remove('theme-transitioning');
    }, 320);
  }
  // Initialize aria from whatever the inline head script set
  applyTheme(currentTheme(), false);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  // Follow system preference if user hasn't picked one
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = function (e) {
    let stored = null;
    try { stored = localStorage.getItem('theme'); } catch (err) {}
    if (!stored) applyTheme(e.matches ? 'dark' : 'light', false);
  };
  if (mql.addEventListener) mql.addEventListener('change', onSystemChange);
  else if (mql.addListener) mql.addListener(onSystemChange);

  // ---------- Scroll reveal ----------
  // Tag elements via JS so the HTML stays clean.
  const revealTargets = document.querySelectorAll(
    '.section-eyebrow, .section-title, .section-lead, .about-text, .about-side, .education'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  const staggerTargets = document.querySelectorAll(
    '.timeline, .skills-grid, .cert-grid, .creative-grid, .contact-grid, .projects-grid'
  );
  staggerTargets.forEach(function (el) { el.classList.add('reveal-stagger'); });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger')
      .forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.reveal, .reveal-stagger')
      .forEach(function (el) { el.classList.add('in'); });
  }

  // ---------- Project modal ----------
  var projectData = {
    'cereal-box': {
      tag: 'Graphic Design',
      title: 'Cereal Box — Pikachu',
      about: 'A full product-packaging concept for a fictional Pikachu-themed cereal. The goal was to create something that felt shelf-ready — character illustration, food imagery, and marketing copy all working together.',
      process: 'Hand-traced the Pikachu character as a vector in Adobe Illustrator using the pen tool, then built out supporting elements (cereal bowl, milk carton, individual cereal pieces) the same way. Composed the full box face with a unified color palette, product typography, and nutritional-style layout.',
      tools: ['Adobe Illustrator', 'Vector illustration', 'Pen tool', 'Type layout']
    },
    'movie-poster': {
      tag: 'Graphic Design',
      title: 'Detective Comedy Movie Poster',
      about: 'A movie poster for a fictional detective comedy film. The central hook: a dog as the hard-boiled detective protagonist. The challenge was to play the absurdity straight — cinematic poster aesthetics applied to a clearly comedic premise.',
      process: 'Developed the concept, sourced reference images (dog, human actor, crime scene, weapon iconography), and composited them into a single believable poster layout. Applied typography hierarchy, tagline placement, and color treatment typical of genre film posters.',
      tools: ['Adobe Photoshop', 'Image compositing', 'Print layout', 'Typography']
    },
    'beyond-apex': {
      tag: 'Live Action + 2D Animation',
      title: 'Beyond The Apex',
      about: 'A short hybrid film blending filmed live-action footage with hand-drawn 2D animated elements. The project explored what happens when the real world and illustrated characters share the same frame — also produced as a separate 3D version.',
      process: 'Wrote and storyboarded the sequence, shot the live-action segments, edited the footage into a rough cut, and then integrated frame-by-frame 2D animation directly into the video. Managing both production pipelines in the same project required careful planning around timing and scale.',
      tools: ['Video production', '2D animation', 'Video editing', 'Storyboarding']
    },
    'sports-balls': {
      tag: '2D Animation',
      title: 'Sports Balls Store',
      about: 'A 2D animated commercial concept for a fictional sports-equipment retailer. The brief was self-assigned: tell a short, clear brand story through character movement and timing alone — no voiceover, just animation.',
      process: 'Designed the characters and storefront, storyboarded the commercial arc, then animated frame by frame. The main focus was on easing — making bouncing sports balls feel physically convincing — and on building a simple narrative beat (problem → store → solution) in a very short runtime.',
      tools: ['2D animation', 'Character design', 'Storyboarding', 'Motion timing']
    },
    'coke-can': {
      tag: 'Animation',
      title: 'A Can of Animated Coke',
      about: 'An animation exercise using a Coca-Cola can as the subject. The goal was to apply classic animation principles — squash and stretch, anticipation, follow-through, and ease-in/ease-out — to an everyday object and make it feel alive.',
      process: 'Planned the can\'s movement arc through thumbnail sketches, then animated the full sequence with careful attention to weight and timing. Each principle was tested in isolation before being combined: how does a can settle after being placed? How does it anticipate a jump? Iterated on motion curves until the movement felt natural.',
      tools: ['Animation principles', 'Motion design', 'Easing & timing', 'Frame-by-frame']
    },
    'flip-book': {
      tag: 'Traditional Animation',
      title: 'Flip Booklet Animation',
      about: 'A hand-drawn flip book animation — no software, just pen and paper. This was a foundational exercise: understanding frame rate, spacing, and how the eye perceives motion when there\'s nothing between you and the drawing.',
      process: 'Sketched every frame individually on separate pages, building movement progressively from one page to the next. Getting smooth motion required thinking about spacing — frames close together feel slow, frames far apart feel fast. The physical limitation of the medium forced clear decision-making about what to animate and what to imply.',
      tools: ['Pen and paper', 'Traditional animation', 'Frame spacing', 'Motion fundamentals']
    }
  };

  var modal         = document.getElementById('project-modal');
  var modalTag      = document.getElementById('modal-tag');
  var modalTitle    = document.getElementById('modal-title');
  var modalBody     = document.getElementById('modal-body');
  var modalClose    = modal && modal.querySelector('.modal-close');
  var lastFocused   = null;

  function openModal(projectId) {
    var data = projectData[projectId];
    if (!data || !modal) return;
    lastFocused = document.activeElement;

    modalTag.textContent   = data.tag;
    modalTitle.textContent = data.title;
    modalBody.innerHTML =
      '<div class="modal-section"><div class="modal-section-label">About</div><p>' + data.about + '</p></div>' +
      '<div class="modal-section"><div class="modal-section-label">What was involved</div><p>' + data.process + '</p></div>' +
      '<div class="modal-section"><div class="modal-section-label">Tools &amp; techniques</div>' +
        '<div class="modal-chips">' +
          data.tools.map(function(t) { return '<span class="modal-chip">' + t + '</span>'; }).join('') +
        '</div></div>';

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    // Trigger transition on next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        modal.classList.add('open');
        if (modalClose) modalClose.focus();
      });
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    modal.addEventListener('transitionend', function handler() {
      modal.hidden = true;
      modal.removeEventListener('transitionend', handler);
      if (lastFocused) lastFocused.focus();
    });
  }

  // Open on card click or Enter/Space
  document.querySelectorAll('.project-card[data-project]').forEach(function (card) {
    card.addEventListener('click', function () { openModal(card.dataset.project); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.project);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Click outside dialog to close
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key closes
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  // ---------- Auto-update copyright year ----------
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();
