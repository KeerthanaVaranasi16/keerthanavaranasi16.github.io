/**
 * Keerthana Varanasi — Developer Profile API & CLI Console
 * Live REST endpoint (/api/v1/profile and /api/v1/profile.json) with Postman, Browser & CLI support.
 */

(function () {
  'use strict';

  const LIVE_API_URL = 'https://keerthanavaranasi.is-a.dev/api/v1/profile';

  const profileData = {
    "status": "success",
    "code": 200,
    "endpoint": "/api/v1/profile",
    "timestamp": "2026-09-18T06:30:00.000Z",
    "data": {
      "profile": {
        "name": "Keerthana Varanasi",
        "title": "Backend Engineer",
        "company": "Dhan AI",
        "currentRole": "Software Development Engineer - 1 (July 2025 – Present)",
        "experience": "2+ years",
        "microservices": "8+ worked",
        "scale": "350,000+ live telecom customers supported",
        "location": "India",
        "bio": "Software Engineer with 2+ years building high-scale distributed backend applications using Node.js, TypeScript, Python, GraphQL, and REST APIs. Experienced in event-driven streaming with Apache Kafka, sub-10ms in-memory caching with Redis, and enterprise multi-tenant RBAC auth."
      },
      "technicalSkills": {
        "languages": [
          "Node.js",
          "TypeScript",
          "JavaScript",
          "Python",
          "Java",
          "SQL"
        ],
        "apiAndArchitecture": [
          "GraphQL",
          "REST APIs",
          "Microservices Architecture",
          "Event-Driven Design",
          "API Gateway Routing",
          "High-Concurrency Caching",
          "Error Analysis & Edge-Case Debugging"
        ],
        "databasesAndCache": [
          "Redis (In-Memory Cache & Session Store)",
          "PostgreSQL",
          "MongoDB",
          "MySQL"
        ],
        "integrationsAndEcosystem": [
          "Apache Kafka",
          "Salesforce CRM",
          "Microsoft Dynamics 365",
          "Firebase Auth (RBAC)",
          "Docker",
          "Git",
          "CI/CD Pipelines"
        ]
      },
      "careerProgression": [
        {
          "stage": 1,
          "role": "Backend Developer Intern",
          "company": "Dhan AI",
          "period": "January 2024 – June 2024",
          "type": "Internship",
          "highlights": [
            "Hands-on backend engineering contributing to real-world customer platforms",
            "Optimized backend performance by analyzing edge-case error scenarios and debugging latency bottlenecks",
            "Collaborated in agile cross-functional engineering teams following modern Git workflows and automated testing"
          ]
        },
        {
          "stage": 2,
          "role": "Junior Software Engineer",
          "company": "Dhan AI",
          "period": "July 2024 – June 2025",
          "type": "Full-Time",
          "highlights": [
            "Developed and maintained high-traffic REST and GraphQL API services supporting real-time account operations for 350K+ active users",
            "Implemented multi-tier caching architectures with Redis to optimize database read performance and accelerate high-frequency queries to under 10ms",
            "Integrated secure identity management and granular Role-Based Access Control (RBAC) to protect sensitive account and billing transactions",
            "Built background Kafka event producers to capture telemetry, track user lifecycle events, and trigger automated downstream actions",
            "Participated actively in sprint planning, code reviews, and performance profiling to eliminate latency bottlenecks across services"
          ]
        },
        {
          "stage": 3,
          "role": "Software Development Engineer - 1",
          "company": "Dhan AI",
          "period": "July 2025 – Present",
          "type": "Full-Time (Current Role)",
          "highlights": [
            "Engineered resilient event-driven microservices in Node.js and TypeScript, handling real-time data streaming and asynchronous transaction processing",
            "Developed bi-directional data synchronization mechanisms across enterprise CRM and ERP systems, ensuring strict referential integrity and zero record duplication",
            "Optimized API payload transformation pipelines to convert complex enterprise domain schemas with sub-second processing latencies",
            "Partnered with cross-functional engineering, product, and QA teams to diagnose distributed edge cases and maintain service reliability"
          ]
        }
      ],
      "featuredProjects": [
        {
          "id": "sales-order-orchestrator",
          "title": "Sales Order Orchestrator",
          "scale": "Enterprise CRM & ERP Integration Platform",
          "stack": ["Node.js", "TypeScript", "Apache Kafka", "Microservices", "Salesforce CRM", "Microsoft Dynamics 365", "REST APIs", "MongoDB"],
          "description": "Enterprise event-driven order orchestration and synchronization platform bridging sales operations in Salesforce CRM with operational fulfillment and provisioning in Microsoft Dynamics 365."
        },
        {
          "id": "customer-self-service-portal",
          "title": "Customer Self-Service Portal",
          "scale": "350,000+ Live Telecom Customers",
          "stack": ["Node.js", "TypeScript", "GraphQL", "REST APIs", "Salesforce CRM", "Redis", "Apache Kafka", "Firebase Auth", "Microservices", "Distributed Systems"],
          "description": "High-scale customer-facing self-service platform designed and maintained for residential telecom subscribers, supporting bill pay, plan changes, and real-time usage tracking."
        },
        {
          "id": "rbac-security-auth",
          "title": "Enterprise Role-Based Access Control (RBAC) System",
          "scale": "Multi-Tenant Enterprise Security",
          "stack": ["Node.js", "Firebase Auth", "PostgreSQL", "REST APIs", "Docker"],
          "description": "Fine-grained authorization service implementing dynamic role-based access control, token validation, audit logging, and least-privilege permission management."
        },
        {
          "id": "high-throughput-notification-service",
          "title": "High-Throughput Notification & Broadcast Service",
          "scale": "100K+ Messages/Minute Event Pipeline",
          "stack": ["Apache Kafka", "Redis Cache", "Python", "Microservices", "Docker"],
          "description": "Distributed asynchronous messaging service consuming high-velocity event streams from Kafka to dispatch targeted customer alerts, billing notices, and system alerts."
        }
      ],
      "contact": {
        "email": "keerthanavaranasi16@gmail.com",
        "github": "https://github.com/KeerthanaVaranasi16",
        "linkedin": "https://linkedin.com/in/keerthanavaranasi",
        "portfolio": "https://keerthanavaranasi.is-a.dev/"
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
  let currentLoadedData = profileData;
  let currentLatency = 9;

  async function triggerFetch() {
    terminalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem; color: var(--accent-primary); font-family: var(--font-mono); padding: 2rem;">
        <div class="api-loading-spinner"></div>
        <div style="font-size: 0.95rem; font-weight: 600;">Dispatching GET /api/v1/profile...</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">Querying live endpoint & cache...</div>
      </div>
    `;
    if (statusBadge) statusBadge.innerHTML = `<span style="color: var(--accent-secondary); font-weight: 600;">Connecting...</span>`;
    if (latencyBadge) {
      latencyBadge.textContent = '...';
      latencyBadge.style.color = 'var(--text-muted)';
    }

    const startTime = performance.now();
    let fetchedData = profileData;

    try {
      // Fetch live endpoint with fallback to .json if needed
      const res = await fetch('api/v1/profile');
      if (res.ok) {
        fetchedData = await res.json();
      } else {
        const resJson = await fetch('api/v1/profile.json');
        if (resJson.ok) fetchedData = await resJson.json();
      }
    } catch (e) {
      try {
        const resJson = await fetch('api/v1/profile.json');
        if (resJson.ok) fetchedData = await resJson.json();
      } catch (err) {
        // Local offline or file:// fallback
        fetchedData = profileData;
      }
    }

    const elapsed = Math.max(6, Math.round(performance.now() - startTime));
    currentLatency = elapsed;
    currentLoadedData = fetchedData;
    profileFetched = true;

    renderTab('profile');
    if (window.showToast) window.showToast('Profile data retrieved (Status 200 OK)');
  }

  function copyToClipboard(text, btnElement, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (window.showToast) window.showToast(successMsg || 'Copied to clipboard!');
        if (btnElement) {
          const orig = btnElement.innerHTML;
          btnElement.innerHTML = `<span>✓ Copied</span>`;
          setTimeout(() => { btnElement.innerHTML = orig; }, 1800);
        }
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (window.showToast) window.showToast('Copied to clipboard!');
  }

  function renderReadyState() {
    terminalBody.innerHTML = `
      <div class="api-request-card">
        <div class="api-request-meta">
          <span class="api-method-pill">GET</span>
          <span class="api-endpoint-url">${LIVE_API_URL}</span>
        </div>
        <div class="api-headers-preview">
          <div><span class="api-header-key">Host:</span> keerthanavaranasi16.github.io</div>
          <div><span class="api-header-key">Accept:</span> application/json</div>
        </div>
        <div class="api-request-action-box">
          <button type="button" class="api-send-btn" id="api-card-send-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Send Request</span>
          </button>
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

    if (tabKey === 'cli') {
      profileFetched = false;
    }

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

        if (latencyBadge) {
          latencyBadge.textContent = `${currentLatency}ms`;
          latencyBadge.style.color = 'var(--accent-primary)';
        }
        if (statusBadge) statusBadge.innerHTML = `<span class="status-badge-ok">200 OK</span>`;
        if (contentTypeBadge) contentTypeBadge.textContent = 'application/json';

        terminalBody.innerHTML = `
          <div class="api-response-toolbar" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; margin-bottom: 0.75rem; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.75rem;">
            <div style="color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--accent-primary); font-weight: 700;">●</span>
              <span>GET /api/v1/profile</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <a href="api/v1/profile" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;">
                <span>View Raw</span> ↗
              </a>
              <button type="button" id="copy-json-btn" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem;">
                <span>Copy JSON</span>
              </button>
            </div>
          </div>
          <pre><code>${syntaxHighlightJson(currentLoadedData)}</code></pre>
        `;
        terminalBody.scrollTop = 0;

        const copyJsonBtn = document.getElementById('copy-json-btn');
        if (copyJsonBtn) {
          copyJsonBtn.addEventListener('click', () => {
            copyToClipboard(JSON.stringify(currentLoadedData, null, 2), copyJsonBtn, 'Full JSON response copied!');
          });
        }
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
          <div style="color: var(--text-muted);">Try: <span style="color: var(--accent-primary); font-weight: bold;">curl /api/v1/profile</span>, <span style="color: var(--accent-primary); font-weight: bold;">profile</span>, <span style="color: var(--accent-primary); font-weight: bold;">skills</span>, or <span style="color: var(--accent-primary); font-weight: bold;">help</span>.</div>
        </div>
        <div class="cli-input-line">
          <span class="cli-prompt">keerthana@backend:~$</span>
          <input type="text" id="cli-input" class="cli-input" placeholder="Type a command (curl /api/v1/profile, help, skills)..." autofocus autocomplete="off" />
        </div>
      </div>
    `;

    const input = document.getElementById('cli-input');
    const history = document.getElementById('cli-history');

    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim();
          input.value = '';
          handleCliCommand(cmd, history);
        }
      });
    }

    terminalBody.onclick = () => {
      if (activeTab === 'cli') {
        const inp = document.getElementById('cli-input');
        if (inp) inp.focus();
      }
    };
  }

  function handleCliCommand(cmdRaw, history) {
    const userLine = document.createElement('div');
    userLine.innerHTML = `<span style="color: var(--accent-primary); font-weight: bold;">keerthana@backend:~$</span> <span>${cmdRaw}</span>`;
    history.appendChild(userLine);

    const cmd = cmdRaw.trim().toLowerCase();
    const outLine = document.createElement('div');
    outLine.style.marginBottom = '0.5rem';

    if (cmd === 'help') {
      outLine.innerHTML = `
        <div style="color: var(--text-secondary);">Available commands:</div>
        <div style="margin-left: 1rem; line-height: 1.6;">
          <div><strong style="color: var(--accent-primary);">curl /api/v1/profile</strong> - Dispatch HTTP GET request and dump JSON</div>
          <div><strong style="color: var(--accent-primary);">profile</strong>             - Overview of Keerthana's background & role</div>
          <div><strong style="color: var(--accent-primary);">skills</strong>              - List languages, databases, APIs & tools</div>
          <div><strong style="color: var(--accent-primary);">projects</strong>            - High-scale platforms & architectural details</div>
          <div><strong style="color: var(--accent-primary);">experience</strong>          - Career journey at Dhan AI (Software Development Engineer - 1)</div>
          <div><strong style="color: var(--accent-primary);">contact</strong>             - Email, GitHub, and LinkedIn</div>
          <div><strong style="color: var(--accent-primary);">clear</strong>               - Clear terminal output</div>
        </div>
      `;
    } else if (cmd.startsWith('curl')) {
      outLine.innerHTML = `
        <div style="color: var(--accent-primary); margin-bottom: 0.35rem;">HTTP/1.1 200 OK</div>
        <div style="color: var(--text-muted); font-size: 0.75rem; margin-bottom: 0.5rem;">Content-Type: application/json | Server: GitHub-Pages/CDN</div>
        <pre style="margin: 0; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 4px; overflow-x: auto;"><code>${syntaxHighlightJson(currentLoadedData)}</code></pre>
      `;
    } else if (cmd === 'profile') {
      outLine.innerHTML = `<span style="color: #38bdf8; font-weight: 600;">Keerthana Varanasi</span> | Backend Engineer at Dhan AI (Software Development Engineer - 1)<br>I love Building systems that make sense.`;
    } else if (cmd === 'skills') {
      outLine.innerHTML = `
        <div><strong style="color: var(--accent-primary);">Languages:</strong> TypeScript, JavaScript, Python, Java, Node.js, SQL</div>
        <div><strong style="color: var(--accent-secondary);">API & Systems:</strong> GraphQL, REST APIs, Microservices, Event-Driven, API Gateway</div>
        <div><strong style="color: #f59e0b;">Databases & Cache:</strong> Redis (In-Memory), PostgreSQL, MongoDB, MySQL</div>
        <div><strong style="color: #a855f7;">Integrations:</strong> Apache Kafka, Salesforce CRM, Dynamics 365, Firebase Auth</div>
      `;
    } else if (cmd === 'projects') {
      outLine.innerHTML = `
        <strong>Sales Order Orchestrator</strong> (Node.js, TypeScript, Kafka, Microservices, Salesforce, Dynamics 365, MongoDB)<br>
        Enterprise event-driven order orchestration platform bridging sales operations in Salesforce CRM with operational fulfillment and provisioning in Microsoft Dynamics 365.<br><br>
        <strong>Customer Self-Service Portal</strong> (Node.js, TypeScript, GraphQL, Redis, Kafka, Salesforce)<br>
        High-scale platform supporting 350,000+ residential telecom customers with billing, payments, and account operations.
      `;
    } else if (cmd === 'experience') {
      outLine.innerHTML = `
        • <strong>Software Development Engineer - 1 @ Dhan AI</strong> (July 2025 – Present)<br>
        • <strong>Junior Software Engineer @ Dhan AI</strong> (July 2024 – June 2025)<br>
        • <strong>Backend Developer Intern @ Dhan AI</strong> (January 2024 – June 2024)
      `;
    } else if (cmd === 'contact') {
      outLine.innerHTML = `
        Email: keerthanavaranasi16@gmail.com<br>
        GitHub: https://github.com/KeerthanaVaranasi16<br>
        LinkedIn: https://linkedin.com/in/keerthanavaranasi
      `;
    } else if (cmd === 'clear') {
      history.innerHTML = '';
      return;
    } else if (cmd === '') {
      return;
    } else {
      outLine.innerHTML = `<span style="color: #f43f5e;">Command not found: "${cmdRaw}". Type "help" for available commands or "curl /api/v1/profile".</span>`;
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
