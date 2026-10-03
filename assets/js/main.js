/**
 * Keerthana Varanasi — Portfolio Core JavaScript
 * Handles theme toggling, toast notifications, active section spy, and system architecture inspector.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // THEME MANAGEMENT (Light / Dark)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        // Sun icon for switching to dark or Moon icon indicating current light
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to dark theme');
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to light theme');
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  }

  // Initial theme application
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
      // showToast(`Switched to ${current === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set one
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --------------------------------------------------------------------------
  // FLOATING TOAST NOTIFICATION SYSTEM
  // --------------------------------------------------------------------------
  window.showToast = function (message, duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  };

  // --------------------------------------------------------------------------
  // COPY ACTIONS (Email)
  // --------------------------------------------------------------------------
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard';
      try {
        await navigator.clipboard.writeText(text);
        showToast(label);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(label);
      }
    });
  });

  // --------------------------------------------------------------------------
  // SYSTEM ARCHITECTURE TOPOLOGY INSPECTOR
  // --------------------------------------------------------------------------
  const topologyData = {
    clients: {
      title: 'Residential Telecom Clients',
      badge: '350K+ Active Users',
      description: 'Web & mobile applications serving residential telecom subscribers for self-service operations, bill payments, and plan changes.',
      points: [
        'High-concurrency traffic during monthly billing cycles.',
        'Low-latency requirements for real-time account and plan balance inquiries.',
        'Cross-platform authentication with secure session handoffs.'
      ]
    },
    gateway: {
      title: 'API Gateway & Middleware',
      badge: 'GraphQL & REST / Node.js & TypeScript',
      description: 'Unified backend layer built with Node.js and TypeScript orchestrating requests across backend microservices.',
      points: [
        'Designed and implemented scalable GraphQL schemas for granular client data queries.',
        'REST APIs powering high-throughput transactional operations (payments, billing updates).',
        'Implemented standardized error boundary handling and request rate limiting.'
      ]
    },
    kafka: {
      title: 'Event Streaming Backbone',
      badge: 'Apache Kafka',
      description: 'Asynchronous event bus decoupling high-speed transactional workflows from background operations.',
      points: [
        'Publishes real-time customer activity events across service boundaries.',
        'Enables downstream business intelligence, billing reconciliation, and audit logging.',
        'Guarantees event ordering and fault-tolerant message persistence.'
      ]
    },
    storage: {
      title: 'Databases & Caching Layer',
      badge: 'Redis · PostgreSQL · MongoDB',
      description: 'Multi-tiered persistence and caching strategy balancing sub-millisecond read access with relational integrity.',
      points: [
        'Leveraged Redis caching to achieve sub-10ms response times on hot customer profiles and plan data.',
        'PostgreSQL for relational financial and billing transactions.',
        'MongoDB for high-velocity activity logs and customer metadata.'
      ]
    },
    integrations: {
      title: 'Enterprise Integrations & Auth',
      badge: 'Salesforce CRM · Dynamics 365 · Firebase Auth',
      description: 'Secure, data-driven integrations bridging modern microservices with legacy enterprise systems.',
      points: [
        'Integrated Firebase Authentication with strict role-based access control (RBAC).',
        'Bidirectional customer data synchronization with Salesforce CRM and Microsoft Dynamics 365.',
        'Automated error analysis and notification pipelines for production stability.'
      ]
    }
  };

  const topologyNodes = document.querySelectorAll('.topology-node');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorTag = document.getElementById('inspector-tag');
  const inspectorDesc = document.getElementById('inspector-desc');
  const inspectorPoints = document.getElementById('inspector-points');

  topologyNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-node');
      const data = topologyData[key];
      if (!data) return;

      topologyNodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      if (inspectorTitle) inspectorTitle.textContent = data.title;
      if (inspectorTag) inspectorTag.textContent = data.badge;
      if (inspectorDesc) inspectorDesc.textContent = data.description;
      if (inspectorPoints) {
        inspectorPoints.innerHTML = data.points
          .map((pt) => `<li class="inspector-point">${pt}</li>`)
          .join('');
      }
    });
  });

  // --------------------------------------------------------------------------
  // ACTIVE SECTION SPY & SMOOTH SCROLL
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // --------------------------------------------------------------------------
  // MOBILE NAVIGATION TOGGLE
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', expanded);
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // --------------------------------------------------------------------------
  // DHAN AI PROGRESSION PROGRESS & EXPERIENCE INTERACTION
  // --------------------------------------------------------------------------
  const stageTabs = document.querySelectorAll('.promo-stage-col[data-stage]');
  const stagePanes = document.querySelectorAll('.promo-stage-pane');
  const trackFill = document.getElementById('promo-track-fill');
  const viewToggleBtn = document.getElementById('promo-view-toggle');
  const toggleText = document.getElementById('promo-toggle-text');
  const detailsViewport = document.querySelector('.promo-details-viewport');

  let currentActiveStage = '3';

  function updateProgressTrack(stageNum) {
    if (!trackFill) return;
    const isMobile = window.innerWidth <= 920;
    const progressMap = { '1': '0%', '2': '50%', '3': '100%' };
    const pct = progressMap[stageNum] || '100%';

    if (isMobile) {
      trackFill.style.width = '100%';
      trackFill.style.height = pct;
    } else {
      trackFill.style.height = '100%';
      trackFill.style.width = pct;
    }

    trackFill.classList.toggle('zero-fill', stageNum === '1');
  }

  function selectStage(stageNum) {
    currentActiveStage = String(stageNum);
    const activeInt = parseInt(stageNum, 10);

    stageTabs.forEach((tab) => {
      const tabInt = parseInt(tab.getAttribute('data-stage'), 10);
      const isSelected = tabInt === activeInt;
      const isCompleted = tabInt < activeInt;

      tab.classList.toggle('active-stage', isSelected);
      tab.classList.toggle('completed-stage', isCompleted);
      tab.setAttribute('aria-selected', isSelected);
      tab.setAttribute('title', isSelected ? `Currently viewing ${tab.querySelector('.stage-title')?.textContent || 'stage'} details` : `Click to view ${tab.querySelector('.stage-title')?.textContent || 'stage'} details`);
    });

    stagePanes.forEach((pane) => {
      const isActive = pane.id === `stage-pane-${stageNum}`;
      pane.classList.toggle('active', isActive);
    });

    updateProgressTrack(String(stageNum));
  }

  // Initialize progress bar and active states on load
  selectStage(currentActiveStage);

  const experienceComponent = document.getElementById('dhan-experience-component');
  const promoRail = document.querySelector('.promo-visual-rail');

  function enterShowAllMode() {
    if (!detailsViewport) return;
    detailsViewport.classList.add('show-all');
    if (experienceComponent) experienceComponent.classList.add('all-phases-mode');
    if (promoRail) promoRail.classList.add('all-phases-mode');
    if (viewToggleBtn) viewToggleBtn.classList.add('is-active');
    if (toggleText) toggleText.textContent = 'Focus Single Phase';

    if (trackFill) {
      trackFill.style.width = '100%';
      trackFill.classList.remove('zero-fill');
    }

    stageTabs.forEach((tab) => {
      tab.classList.remove('active-stage');
      tab.classList.add('all-active');
      tab.setAttribute('aria-selected', 'false');
      const stageName = tab.querySelector('.stage-title')?.textContent || 'phase';
      tab.setAttribute('title', `Click to jump to ${stageName}`);
    });
  }

  function exitShowAllMode(focusStage) {
    if (!detailsViewport) return;
    detailsViewport.classList.remove('show-all');
    if (experienceComponent) experienceComponent.classList.remove('all-phases-mode');
    if (promoRail) promoRail.classList.remove('all-phases-mode');
    if (viewToggleBtn) viewToggleBtn.classList.remove('is-active');
    if (toggleText) toggleText.textContent = 'Show All Phases';

    stageTabs.forEach((tab) => {
      tab.classList.remove('all-active');
    });

    selectStage(focusStage || currentActiveStage || '3');
  }

  // --------------------------------------------------------------------------
  // DYNAMIC CAREER PROGRESSION SWEEP (PROGRESS BAR GLIDES START TO END)
  // --------------------------------------------------------------------------
  let hasSweptThisSession = false;

  function playProgressionSweep() {
    if (!trackFill) return;
    if (detailsViewport && detailsViewport.classList.contains('show-all')) return;

    const isMobile = window.innerWidth <= 920;

    // 1. Reset bar to start (0%) without animation
    trackFill.style.transition = 'none';
    if (isMobile) {
      trackFill.style.width = '100%';
      trackFill.style.height = '0%';
    } else {
      trackFill.style.height = '100%';
      trackFill.style.width = '0%';
    }
    trackFill.classList.add('zero-fill');

    // Force browser reflow so 0% position is registered
    void trackFill.offsetWidth;

    // 2. Smoothly sweep progress bar from start to end (0% -> 100%)
    requestAnimationFrame(() => {
      trackFill.style.transition = 'width 1.35s cubic-bezier(0.22, 1, 0.36, 1), height 1.35s cubic-bezier(0.22, 1, 0.36, 1)';
      if (isMobile) {
        trackFill.style.height = '100%';
      } else {
        trackFill.style.width = '100%';
      }
      trackFill.classList.remove('zero-fill');

      // 3. Restore default snappy transition after sweep finishes
      setTimeout(() => {
        if (trackFill) trackFill.style.transition = '';
      }, 1450);
    });
  }

  // Reset sweep trigger when user scrolls back to the top (Hero / About)
  window.addEventListener('scroll', () => {
    if (window.scrollY < 200) {
      hasSweptThisSession = false;
    }
  }, { passive: true });

  // When clicking Experience navbar link from above
  const expNavLink = document.querySelector('a[href="#experience"]');
  if (expNavLink) {
    expNavLink.addEventListener('click', () => {
      hasSweptThisSession = false;
      setTimeout(() => {
        if (!hasSweptThisSession) {
          hasSweptThisSession = true;
          playProgressionSweep();
        }
      }, 400);
    });
  }

  // Recalculate on window resize
  window.addEventListener('resize', () => {
    if (detailsViewport && detailsViewport.classList.contains('show-all')) {
      if (trackFill) trackFill.style.width = '100%';
    } else if (currentActiveStage) {
      updateProgressTrack(currentActiveStage);
    }
  });

  stageTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const stage = tab.getAttribute('data-stage');
      const isShowAll = detailsViewport && detailsViewport.classList.contains('show-all');

      if (isShowAll) {
        // Smoothly scroll down to that specific role card in the full view
        const targetPane = document.getElementById(`stage-pane-${stage}`);
        if (targetPane) {
          targetPane.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          targetPane.classList.remove('pane-spotlight');
          void targetPane.offsetWidth; // trigger reflow
          targetPane.classList.add('pane-spotlight');
          setTimeout(() => targetPane.classList.remove('pane-spotlight'), 1600);
        }
        currentActiveStage = stage;
      } else {
        selectStage(stage);
      }
    });
  });

  if (viewToggleBtn && detailsViewport) {
    viewToggleBtn.addEventListener('click', () => {
      const isShowAll = detailsViewport.classList.contains('show-all');
      if (isShowAll) {
        exitShowAllMode(currentActiveStage || '3');
      } else {
        enterShowAllMode();
      }
    });
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE STAGES SCROLL HINT (MICRO-PULSE ON FIRST SCROLL)
  // --------------------------------------------------------------------------
  if (experienceComponent && promoRail && 'IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            promoRail.classList.add('attention-pulse');
            scrollObserver.unobserve(entry.target);
            setTimeout(() => {
              promoRail.classList.remove('attention-pulse');
            }, 2500);

            // Also trigger the start-to-end progression sweep if entering from top
            if (!hasSweptThisSession) {
              hasSweptThisSession = true;
              playProgressionSweep();
            }
          }
        });
      },
      { threshold: 0.25 }
    );
    scrollObserver.observe(experienceComponent);
  }

  // --------------------------------------------------------------------------
  // METRICS COUNTER ANIMATION
  // --------------------------------------------------------------------------
  const metricsStrip = document.getElementById('hero-metrics') || document.querySelector('.metrics-strip');
  const metricValues = document.querySelectorAll('.metric-val[data-target]');

  if (metricsStrip && metricValues.length > 0) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateSingleCounter(valEl, duration = 1400) {
      const target = parseInt(valEl.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(eased * target);

        valEl.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          valEl.textContent = target;
        }
      }

      valEl.textContent = '0';
      requestAnimationFrame(step);
    }

    function animateAllCounters() {
      if (prefersReducedMotion) {
        metricValues.forEach((valEl) => {
          valEl.textContent = valEl.getAttribute('data-target');
        });
        return;
      }

      metricValues.forEach((valEl, idx) => {
        // Slightly stagger each counter by 80ms for an ultra-slick domino roll effect
        setTimeout(() => {
          animateSingleCounter(valEl, 1200);
        }, idx * 80);
      });
    }

    // Trigger on scroll/visibility via IntersectionObserver
    if ('IntersectionObserver' in window) {
      let hasAnimated = false;
      const metricsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              hasAnimated = true;
              metricsObserver.unobserve(entry.target);
              setTimeout(animateAllCounters, 150);
            }
          });
        },
        { threshold: 0.15 }
      );
      metricsObserver.observe(metricsStrip);
    } else {
      setTimeout(animateAllCounters, 300);
    }

    // Micro-interaction: hovering over a metric card replays a quick 650ms count-up
    const metricCards = metricsStrip.querySelectorAll('.metric-card');
    metricCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        if (prefersReducedMotion) return;
        const valEl = card.querySelector('.metric-val[data-target]');
        if (!valEl || card.dataset.animating === 'true') return;

        card.dataset.animating = 'true';
        animateSingleCounter(valEl, 650);
        setTimeout(() => {
          card.dataset.animating = 'false';
        }, 700);
      });
    });
  }

  // --------------------------------------------------------------------------
  // HERO SECTION FLOATING NODES CONSTELLATION ANIMATION
  // --------------------------------------------------------------------------
  function initHeroParticles() {
    const canvas = document.getElementById('hero-particle-canvas');
    const heroSection = document.getElementById('hero');
    if (!canvas || !heroSection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = heroSection.offsetWidth);
    let height = (canvas.height = heroSection.offsetHeight);
    let particles = [];
    let isVisible = true;
    let mouse = { x: -999, y: -999, radius: 140 };

    function getThemeColors() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      return {
        // Emerald green for nodes, Electric cyan for constellation links
        nodeRgb: isDark ? '16, 185, 129' : '5, 150, 105',
        lineRgb: isDark ? '6, 182, 212' : '2, 132, 199'
      };
    }

    let colors = getThemeColors();

    const themeObserver = new MutationObserver(() => {
      colors = getThemeColors();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 16000), 55);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 0.8,
          alpha: Math.random() * 0.4 + 0.25
        });
      }
    }

    initParticles();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas || !heroSection) return;
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
        initParticles();
      }, 150);
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = -999;
      mouse.y = -999;
    });

    function draw() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Subtle cursor repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.6;
          p.y += (dy / dist) * force * 1.6;
        }

        // Render node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.nodeRgb}, ${p.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 120) {
            const lineAlpha = (1 - dist2 / 120) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.lineRgb}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const wasVisible = isVisible;
            isVisible = entry.isIntersecting;
            if (!wasVisible && isVisible) {
              requestAnimationFrame(draw);
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(heroSection);
    }

    requestAnimationFrame(draw);
  }

  // --------------------------------------------------------------------------
  // HERO DYNAMIC ROLE ROTATOR
  // --------------------------------------------------------------------------
  function initHeroRoleRotator() {
    const heroTitle = document.querySelector('.hero-title');
    const roleRotator = document.getElementById('hero-role-rotator');
    const roleText = document.getElementById('hero-role-text');

    if (!heroTitle || !roleRotator || !roleText) return;

    const roles = [
      'Software Development Engineer.',
      'Backend Engineer.',
      'Forward Deployed Engineer.'
    ];

    let currentIndex = 0;
    let isHovered = false;
    let isAnimating = false;
    let cycleInterval = null;
    let revertTimeout = null;

    function transitionToRole(nextIndex) {
      if (isAnimating) return;
      if (currentIndex === nextIndex && roleText.textContent === roles[nextIndex]) return;

      isAnimating = true;
      currentIndex = nextIndex;

      roleText.classList.remove('slide-in', 'slide-in-prep');
      roleText.classList.add('slide-out');

      setTimeout(() => {
        roleText.textContent = roles[currentIndex];
        roleRotator.setAttribute('aria-label', `Role: ${roles[currentIndex]}`);

        roleText.classList.remove('slide-out');
        roleText.classList.add('slide-in-prep');

        // Force browser layout reflow
        void roleText.offsetWidth;

        roleText.classList.remove('slide-in-prep');
        roleText.classList.add('slide-in');

        setTimeout(() => {
          roleText.classList.remove('slide-in');
          isAnimating = false;
        }, 300);
      }, 220);
    }

    function advanceRole() {
      const nextIdx = (currentIndex + 1) % roles.length;
      transitionToRole(nextIdx);
    }

    function startCycle() {
      isHovered = true;
      if (revertTimeout) {
        clearTimeout(revertTimeout);
        revertTimeout = null;
      }

      // Immediately step to the next role on hover
      advanceRole();

      // Continue cycling one by one while hovered
      if (cycleInterval) clearInterval(cycleInterval);
      cycleInterval = setInterval(() => {
        if (isHovered) {
          advanceRole();
        }
      }, 2200);
    }

    function stopCycle() {
      isHovered = false;
      if (cycleInterval) {
        clearInterval(cycleInterval);
        cycleInterval = null;
      }

      // Gracefully revert back to default role (Software Development Engineer)
      if (revertTimeout) clearTimeout(revertTimeout);
      revertTimeout = setTimeout(() => {
        if (!isHovered && currentIndex !== 0) {
          transitionToRole(0);
        }
      }, 850);
    }

    heroTitle.addEventListener('mouseenter', startCycle);
    heroTitle.addEventListener('mouseleave', stopCycle);

    // Support click or mobile tap to advance immediately
    roleRotator.addEventListener('click', (e) => {
      e.stopPropagation();
      advanceRole();
    });

    // Keyboard support
    roleRotator.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        advanceRole();
      }
    });
  }

  // Initialize
  initHeroParticles();
  initHeroRoleRotator();
})();
