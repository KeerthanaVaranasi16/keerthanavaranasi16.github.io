/**
 * Keerthana Varanasi — Developer Profile API & CLI Console
 * Supports REST endpoint (GET /api/v1/profile) and interactive terminal CLI mode.
 */

(function () {
  'use strict';

  const profileData = {
    status: "success",
    code: 200,
    data: {
      name: "Keerthana Varanasi",
      title: "Backend Engineer",
      company: "Dhan AI",
      currentRole: "SDE 1 (July 2025 – Present)",
      experience: "2+ years",
      scale: "350,000+ live telecom customers supported",
      primaryStack: [
        "Node.js",
        "TypeScript",
        "GraphQL",
        "REST APIs",
        "Apache Kafka",
        "Redis",
        "PostgreSQL",
        "MongoDB"
      ],
      integrations: [
        "Salesforce CRM",
        "Microsoft Dynamics 365",
        "Firebase Auth"
      ],
      availability: "Open to select backend engineering opportunities",
      contact: {
        email: "keerthanavaranasi16@gmail.com",
        github: "https://github.com/KeerthanaVaranasi",
        linkedin: "https://linkedin.com/in/keerthanavaranasi"
      }
    }
  };

  // Syntax highlighting helper for JSON
  function syntaxHighlightJson(json) {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  // DOM Elements
  const tabButtons = document.querySelectorAll('.endpoint-tab');
  const terminalBody = document.getElementById('terminal-response-body');
  const statusBadge = document.getElementById('terminal-status-code');
  const latencyBadge = document.getElementById('terminal-latency');
  const contentTypeBadge = document.getElementById('terminal-content-type');
  const executeBtn = document.getElementById('terminal-execute-btn');
  const resetBtn = document.getElementById('terminal-reset-btn');

  let activeTab = 'profile';
  let profileFetched = false;

  function getRandomLatency() {
    return Math.floor(Math.random() * 5) + 6; // 6ms - 10ms
  }

  function triggerFetch() {
    terminalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem; color: var(--accent-primary); font-family: var(--font-mono);">
        <div class="api-loading-spinner"></div>
        <div style="font-size: 0.9rem; font-weight: 600;">Dispatching GET /api/v1/profile...</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">Querying in-memory Redis cache & PostgreSQL...</div>
      </div>
    `;
    if (statusBadge) statusBadge.innerHTML = `<span style="color: var(--accent-secondary); font-weight: 600;">Connecting...</span>`;
    if (latencyBadge) {
      latencyBadge.textContent = '...';
      latencyBadge.style.color = 'var(--text-muted)';
    }

    setTimeout(() => {
      profileFetched = true;
      renderTab('profile');
      if (window.showToast) window.showToast('Profile data retrieved (Status 200 OK)');
    }, 180);
  }

  function renderReadyState() {
    terminalBody.innerHTML = `
      <div class="api-request-card">
        <div class="api-request-meta">
          <span class="api-method-pill">GET</span>
          <span class="api-endpoint-url">https://keerthanavaranasi.github.io/api/v1/profile</span>
        </div>
        <div class="api-headers-preview">
          <div><span class="api-header-key">Host:</span> api.keerthanavaranasi.dev</div>
          <div><span class="api-header-key">Accept:</span> application/json</div>
        </div>
        <div class="api-request-action-box">
          <button type="button" class="api-send-btn" id="api-card-send-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Send Request</span>
          </button>
          <div class="api-send-hint">Click to query endpoint and inspect JSON payload</div>
        </div>
      </div>
    `;

    const cardSendBtn = document.getElementById('api-card-send-btn');
    if (cardSendBtn) {
      cardSendBtn.addEventListener('click', triggerFetch);
    }
  }

  function renderTab(tabKey) {
    activeTab = tabKey;
    tabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
    });

    if (tabKey === 'profile') {
      if (!profileFetched) {
        if (executeBtn) {
          executeBtn.style.display = 'inline-flex';
          executeBtn.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 2px;">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Send Request</span>
          `;
        }
        if (resetBtn) resetBtn.style.display = 'none';

        if (statusBadge) statusBadge.innerHTML = `<span style="color: var(--text-muted); font-weight: 600;">Idle</span>`;
        if (latencyBadge) {
          latencyBadge.textContent = '--';
          latencyBadge.style.color = 'var(--text-muted)';
        }
        if (contentTypeBadge) contentTypeBadge.textContent = 'application/json';

        renderReadyState();
      } else {
        if (executeBtn) {
          executeBtn.style.display = 'inline-flex';
          executeBtn.innerHTML = `<span>↻ Re-fetch</span>`;
        }
        if (resetBtn) resetBtn.style.display = 'inline-flex';

        const latency = getRandomLatency();
        if (latencyBadge) {
          latencyBadge.textContent = `${latency}ms`;
          latencyBadge.style.color = 'var(--accent-primary)';
        }
        if (statusBadge) statusBadge.innerHTML = `<span class="status-badge-ok">200 OK</span>`;
        if (contentTypeBadge) contentTypeBadge.textContent = 'application/json';

        terminalBody.innerHTML = `<pre><code>${syntaxHighlightJson(profileData)}</code></pre>`;
        terminalBody.scrollTop = 0;
      }
    } else if (tabKey === 'cli') {
      if (executeBtn) executeBtn.style.display = 'none';
      if (resetBtn) resetBtn.style.display = 'none';

      if (statusBadge) statusBadge.innerHTML = `<span style="color: var(--accent-purple); font-weight: 600;">Interactive</span>`;
      if (latencyBadge) {
        latencyBadge.textContent = 'tty-active';
        latencyBadge.style.color = 'var(--accent-purple)';
      }
      if (contentTypeBadge) contentTypeBadge.textContent = 'interactive-tty';

      renderCliInterface();
    }
  }

  function renderCliInterface() {
    terminalBody.innerHTML = `
      <div class="cli-container">
        <div class="cli-history" id="cli-history">
          <div style="color: var(--text-muted);">Keerthana Varanasi — Interactive Backend CLI [Version 2.0.0]</div>
          <div style="color: var(--text-muted);">Type <span style="color: var(--accent-primary); font-weight: bold;">help</span> for commands, or <span style="color: var(--accent-primary); font-weight: bold;">profile</span> / <span style="color: var(--accent-primary); font-weight: bold;">skills</span> / <span style="color: var(--accent-primary); font-weight: bold;">projects</span>.</div>
        </div>
        <div class="cli-input-line">
          <span class="cli-prompt">keerthana@backend:~$</span>
          <input type="text" id="cli-input" class="cli-input" placeholder="Type a command (help, profile, skills, projects)..." autofocus autocomplete="off" />
        </div>
      </div>
    `;

    const input = document.getElementById('cli-input');
    const history = document.getElementById('cli-history');

    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim().toLowerCase();
          input.value = '';
          handleCliCommand(cmd, history);
        }
      });
    }

    // Keep input in view and focused when clicking anywhere inside terminal body
    terminalBody.onclick = () => {
      if (activeTab === 'cli') {
        const inp = document.getElementById('cli-input');
        if (inp) inp.focus();
      }
    };
  }

  function handleCliCommand(cmd, history) {
    const userLine = document.createElement('div');
    userLine.innerHTML = `<span style="color: var(--accent-primary); font-weight: bold;">keerthana@backend:~$</span> <span>${cmd}</span>`;
    history.appendChild(userLine);

    const outLine = document.createElement('div');
    outLine.style.marginBottom = '0.5rem';

    switch (cmd) {
      case 'help':
        outLine.innerHTML = `
          <div style="color: var(--text-secondary);">Available commands:</div>
          <div style="margin-left: 1rem; line-height: 1.6;">
            <div><strong style="color: var(--accent-primary);">profile</strong>    - Overview of Keerthana's background & role</div>
            <div><strong style="color: var(--accent-primary);">skills</strong>     - List languages, databases, APIs & tools</div>
            <div><strong style="color: var(--accent-primary);">projects</strong>   - Customer Self-Service Portal details</div>
            <div><strong style="color: var(--accent-primary);">experience</strong> - Career journey at Dhan AI (SDE 1)</div>
            <div><strong style="color: var(--accent-primary);">contact</strong>    - Email, GitHub, and LinkedIn</div>
            <div><strong style="color: var(--accent-primary);">clear</strong>      - Clear terminal output</div>
          </div>
        `;
        break;
      case 'profile':
        outLine.innerHTML = `<span style="color: #38bdf8; font-weight: 600;">Keerthana Varanasi</span> | Backend Engineer at Dhan AI (SDE 1)<br>2+ years developing and maintaining scalable backend services supporting 350K+ live customers using Node.js, TypeScript, GraphQL, Kafka, and Redis. I love Building systems that make sense.`;
        break;
      case 'skills':
        outLine.innerHTML = `
          <div><strong style="color: var(--accent-primary);">Languages:</strong> TypeScript, JavaScript, Python, Java, Node.js</div>
          <div><strong style="color: var(--accent-secondary);">API & Systems:</strong> GraphQL, REST APIs, Microservices, Event-Driven</div>
          <div><strong style="color: #f59e0b;">Databases & Cache:</strong> Redis (In-Memory), PostgreSQL, MongoDB, MySQL</div>
          <div><strong style="color: #a855f7;">Integrations:</strong> Apache Kafka, Salesforce CRM, Dynamics 365, Firebase Auth</div>
        `;
        break;
      case 'projects':
        outLine.innerHTML = `
          <strong>Customer Self-Service Portal</strong> (Node.js, TypeScript, GraphQL, Redis, Kafka, Firebase Auth, REST)<br>
          High-scale platform supporting 350,000+ residential telecom customers with billing, payments, and account operations.
        `;
        break;
      case 'experience':
        outLine.innerHTML = `
          • <strong>SDE 1 @ Dhan AI</strong> (July 2025 – Present)<br>
          • <strong>Junior Software Engineer @ Dhan AI</strong> (July 2024 – June 2025)<br>
          • <strong>Backend Developer Intern @ Dhan AI</strong> (January 2024 – June 2024)
        `;
        break;
      case 'contact':
        outLine.innerHTML = `
          Email: keerthanavaranasi16@gmail.com<br>
          GitHub: https://github.com/KeerthanaVaranasi<br>
          LinkedIn: https://linkedin.com/in/keerthanavaranasi
        `;
        break;
      case 'clear':
        history.innerHTML = '';
        return;
      case '':
        return;
      default:
        outLine.innerHTML = `<span style="color: #f43f5e;">Command not found: "${cmd}". Type "help" for a list of commands.</span>`;
        break;
    }

    history.appendChild(outLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Event Listeners for Tabs
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      renderTab(tab);
    });
  });

  // Execute button for profile (Send Request / Re-fetch)
  if (executeBtn) {
    executeBtn.addEventListener('click', () => {
      triggerFetch();
    });
  }

  // Reset button for profile
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      profileFetched = false;
      renderTab('profile');
      if (window.showToast) window.showToast('Console reset to initial state');
    });
  }

  // Initial render
  renderTab('profile');
})();
