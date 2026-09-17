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
    });

    stagePanes.forEach((pane) => {
      const isActive = pane.id === `stage-pane-${stageNum}`;
      pane.classList.toggle('active', isActive);
    });

    updateProgressTrack(String(stageNum));
  }

  // Initialize progress bar and active states on load
  selectStage(currentActiveStage);

  // Recalculate on window resize
  window.addEventListener('resize', () => {
    if (currentActiveStage) {
      updateProgressTrack(currentActiveStage);
    }
  });

  stageTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (detailsViewport && detailsViewport.classList.contains('show-all')) {
        detailsViewport.classList.remove('show-all');
        if (toggleText) toggleText.textContent = 'Show All Phases';
      }
      const stage = tab.getAttribute('data-stage');
      selectStage(stage);
    });
  });

  if (viewToggleBtn && detailsViewport) {
    viewToggleBtn.addEventListener('click', () => {
      const isShowAll = detailsViewport.classList.toggle('show-all');
      if (toggleText) {
        toggleText.textContent = isShowAll ? 'Focus Active Phase' : 'Show All Phases';
      }
      if (!isShowAll) {
        selectStage('3'); // reset to SDE 1 active on collapse
      }
    });
  }
})();
