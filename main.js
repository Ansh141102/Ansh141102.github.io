/* Ansh Srivastava portfolio: data, rendering and interactions.
   window.PORTFOLIO is shared with chatbot.js, so edit content here once. */
window.PORTFOLIO = {
  profile: {
    name: 'Ansh Srivastava',
    email: 'srivastavaansh171@gmail.com',
    phone: '+91-9599091751',
    linkedin: 'https://www.linkedin.com/in/ansh-srivastava141102/',
    github: 'https://github.com/Ansh141102',
    resume: 'Ansh_Srivastava_Resume.pdf',
    location: 'India'
  },
  roles: ['Machine Learning Projects', 'Data Analytic Dashboards', 'Predictive Models', 'ETL & Data Pipelines'],
  education: {
    degree: 'B.Tech in Computer Science & Engineering (Data Science)',
    college: 'ABES Engineering College (AKTU)',
    period: 'Oct 2021 – Sep 2025'
  },
  skills: [
    ['Machine learning', ['Scikit-learn', 'XGBoost', 'SVM', 'Random Forest', 'Voting ensembles', 'TensorFlow', 'PyTorch', 'Clustering & PCA', 'Feature engineering', 'SMOTE', 'Hyperparameter tuning']],
    ['Data engineering', ['Python', 'SQL (PostgreSQL, MySQL)', 'Apache Spark', 'Apache Kafka', 'ETL / ELT', 'Pandas', 'NumPy', 'SQLite caching', 'AWS']],
    ['Analysis & visualization', ['Power BI', 'Tableau', 'Matplotlib', 'Seaborn', 'EDA', 'Statistical testing', 'KPI reporting', 'Geospatial mapping', 'Advanced Excel']],
    ['Web & APIs', ['FastAPI', 'Flask', 'Streamlit', 'REST APIs', 'Gmail API (OAuth 2.0)', 'HTML, CSS, JavaScript', 'VADER sentiment', 'yfinance', 'NewsAPI']],
    ['Tools', ['Git & GitHub', 'Docker', 'Jupyter', 'VS Code', 'Render', 'Linux & Bash', 'Postman']]
  ],
  experience: [
    {
      title: 'Data Analyst Intern', org: 'SPN JIT Engineering Solutions Pvt Ltd', period: 'Mar 2026 – Aug 2026',
      sub: 'Enterprise analytics and reporting',
      summary: 'Data cleaning, EDA, SQL queries and Power BI and Tableau dashboards for sales, seasonality and inventory.',
      points: [
        'Cleaned and explored transactional data and queried it with SQL.',
        'Built <strong>Power BI and Tableau dashboards</strong> covering sales trends, seasonality and inventory.',
        'Used Matplotlib and Seaborn to surface operational bottlenecks for decision makers.'
      ]
    },
    {
      title: 'Machine Learning Engineer (Freelance)', org: 'Alliance Precision and Solution', period: 'Oct 2025 – Feb 2026',
      sub: 'Sonar-based underwater object detection',
      summary: 'Sonar-based underwater object classifier with 85% accuracy, 77% fewer false positives and a real-time inference prototype.',
      points: [
        'Built a classifier for underwater objects (mines, rocks, obstacles) from naval sensor and sonar frequency data.',
        'Led preprocessing, feature engineering, normalization and class balancing to reach <strong>85% accuracy</strong>.',
        'Tuned ensemble classifiers and <strong>cut false positives by 77%</strong>.',
        'Shipped a real-time inference prototype for fast obstacle assessment.'
      ]
    }
  ],
  certs: [
    ['AWS Certified Cloud Practitioner (CLF-C02)', 'Amazon Web Services'],
    ['Data Engineering Professional Certificate', 'Coursera'],
    ['Machine Learning', 'IBM (Coursera)'],
    ['Python 101 for Data Science', 'IBM'],
    ['Introduction to Data Science', 'Infosys Springboard'],
    ['Data Analysis: SQL, Tableau, Power BI and Excel', 'Udemy'],
    ['Data Visualisation virtual experience', 'Tata (Forage)'],
    ['Engineering job simulation', 'Goldman Sachs (Forage)']
  ],
  projects: [
    {
      id: 'stock-predictor', cat: 'ml', featured: true, kicker: 'Machine learning and finance', date: 'Dec 2025',
      name: 'AI Stock Price Predictor (NSE & BSE)',
      desc: 'Stock analysis and 7-day ML forecasting for 5,000+ Indian companies, with technical indicators, VADER news sentiment and Buy/Hold/Sell verdicts. Built on free APIs with an SQLite TTL cache.',
      metrics: [['5,000+', 'Stocks'], ['7-day', 'Forecast'], ['SQLite', 'TTL cache']],
      tags: ['Python', 'FastAPI', 'Ensemble models', 'VADER', 'yfinance'],
      demo: 'https://stock-predictor-hwkr.onrender.com', github: 'https://github.com/Ansh141102/Stock_Predictor',
      detail: `<h4>Overview</h4><p>A production-style platform covering 5,000+ stocks on NSE and BSE. It runs entirely on free APIs by combining smart caching with on-demand ML inference.</p>
<h4>Architecture</h4><pre>Frontend (vanilla JS + Chart.js)
        | REST
FastAPI backend
  - Symbol registry (fuzzy search)
  - SQLite TTL cache manager
  - yfinance fundamentals + OHLCV
  - Technical indicators (RSI, MACD, Bollinger)
  - Ensemble prediction engine
  - NewsAPI + VADER sentiment
  - Buy / Hold / Sell explainer</pre>
<h4>Engineering decisions</h4><ul><li>Cache TTLs: fundamentals 24h, news 12h, history 6h, indices 5 min.</li><li>Predictions run on demand to conserve compute.</li><li>Graceful degradation when the NewsAPI quota runs out.</li></ul>
<h4>Note</h4><p>The live app uses yfinance, so it works best during Indian market hours (Mon to Fri, 9:15 AM to 3:30 PM IST). The free host may take a few seconds to wake up on the first visit.</p>`
    },
    {
      id: 'heart-failure', cat: 'ml', kicker: 'Clinical machine learning', date: 'Nov 2025',
      name: 'Heart Failure Risk Predictor',
      desc: 'End-to-end clinical risk app. Five algorithms compared with custom features (Oldpeak squared, MaxHR to age ratio). SVM reached 90.76% accuracy; a voting ensemble is deployed for robustness.',
      metrics: [['90.76%', 'SVM accuracy'], ['0.91', 'Macro F1'], ['Flask', 'Inference']],
      tags: ['Python', 'Flask', 'Scikit-learn', 'SVM', 'Ensemble'],
      demo: 'https://heart-failure-prediction-5wt9.onrender.com/', github: 'https://github.com/Ansh141102/Heart_Failure_Prediction',
      detail: `<h4>Overview</h4><p>Predicts heart failure likelihood from clinical parameters. Includes single prediction with a risk gauge and batch prediction from CSV.</p>
<h4>Model benchmark (test set)</h4><pre>SVM                 90.76%  (macro F1 0.91)
Logistic Regression 90.22%  (0.90)
Ensemble (voting)   89.13%  (0.89)  deployed
XGBoost (tuned)     88.04%  (0.88)
Random Forest       86.41%  (0.86)</pre>
<h4>Feature engineering</h4><ul><li>Oldpeak squared captures non-linear exercise ST depression.</li><li>MaxHR, cholesterol and resting BP are normalized by age.</li><li>Top drivers: ST slope, exercise angina, Oldpeak squared, MaxHR.</li></ul>`
    },
    {
      id: 'telecom-churn', cat: 'ml analytics', kicker: 'Customer retention', date: 'Jun 2026',
      name: 'Telecom Churn Predictor & Dashboard',
      desc: 'ML pipeline over 7,043 customers. Handled 26.5% churn imbalance with SMOTE, tuned XGBoost with RandomizedSearchCV and shipped a Streamlit dashboard with risk tiers and retention actions.',
      metrics: [['7,043', 'Customers'], ['SMOTE', 'Balancing'], ['Streamlit', 'Dashboard']],
      tags: ['Python', 'XGBoost', 'SMOTE', 'Streamlit', 'Pandas'],
      github: 'https://github.com/Ansh141102/Telecom_Customer_Churn_Prediction',
      detail: `<h4>Problem</h4><p>Retention is cheaper than acquisition. The pipeline scores each customer's churn probability and recommends actions.</p>
<h4>Pipeline</h4><pre>Raw data (7,043 rows, 21 columns)
  -> clean TotalCharges, drop customerID
  -> binary + one-hot encoding (30 features)
  -> 80/20 split, StandardScaler (train only)
  -> SMOTE on training set (8,260 rows)
  -> XGBoost + RandomizedSearchCV
  -> Streamlit risk tiers</pre>
<h4>Findings</h4><ul><li>Month-to-month contracts, fiber optic, electronic check payments and short tenure show the highest churn.</li><li>Risk tiers: low under 30%, medium 30 to 70%, high 70% and above.</li><li>Three models compared: logistic regression baseline, random forest and XGBoost.</li></ul>`
    },
    {
      id: 'hr-automation', cat: 'automation', kicker: 'API automation',
      name: 'HR Cold-Email Automation (Gmail API)',
      desc: 'Reads HR contacts from Excel, cleans company names, personalizes templates, attaches a resume and sends through the Gmail API with OAuth 2.0, in reviewed batches with duplicate protection.',
      metrics: [['OAuth 2.0', 'Auth'], ['Batch', 'Dispatch'], ['No dupes', 'Send log']],
      tags: ['Python', 'Gmail API', 'OAuth 2.0', 'Pandas', 'OpenPyXL'],
      github: 'https://github.com/Ansh141102/HR-Cold-Email-Automation-Gmail-API',
      detail: `<h4>Overview</h4><p>A controlled batch workflow so emails are reviewed and sent in small groups rather than blasted to a whole database.</p>
<h4>Workflow</h4><pre>Excel ingestion
  -> name + company cleaning
  -> email validation
  -> Gmail OAuth 2.0 token
  -> personalized MIME email + resume
  -> human-reviewed batch
  -> dispatch with duplicate log</pre>
<h4>Safety</h4><ul><li>A local log prevents emailing the same recruiter twice.</li><li>Paced sending respects Gmail limits.</li><li>Secrets stay out of the repo via env files and .gitignore.</li></ul>`
    },
    {
      id: 'ev-analysis', cat: 'analytics', kicker: 'Big data and BI', date: 'Feb 2026',
      name: 'EV Adoption Analysis (Washington State)',
      desc: 'Tableau and Python analysis of 130,000+ EV registrations: geospatial maps, manufacturer share, BEV versus PHEV segmentation and multi-year adoption trends.',
      metrics: [['130K+', 'Records'], ['BEV/PHEV', 'Segments'], ['Tableau', 'Geo maps']],
      tags: ['Tableau', 'Python', 'Data wrangling', 'Geospatial EDA'],
      github: 'https://github.com/Ansh141102/EV_Vehicle_Analysis_Washinton',
      detail: `<h4>Overview</h4><p>An interactive dashboard over 130,000+ electric vehicle registrations in Washington State.</p>
<h4>Insights</h4><ul><li>BEV versus PHEV trajectory over the years.</li><li>County-level adoption heatmaps, concentrated around King County.</li><li>Manufacturer share evolution across the period.</li></ul>`
    }
  ]
};

(function () {
  'use strict';
  const P = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reducedMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reducedMQ.matches;
  const root = document.documentElement;

  function init() {
    renderSections();
    initTheme();
    initNav();
    initTyped();
    initCounters();
    initFilters();
    initModal();
    initContact();
    initReveal();
    initParticles();
    const ask = $('#askBot');
    if (ask) ask.addEventListener('click', () => window.openPortfolioChat && window.openPortfolioChat());
  }

  /* ── Data-driven sections ──────────────────────────────── */
  function renderSections() {
    $('#skillsList').innerHTML = P.skills.map(([h, items]) =>
      `<article class="skill"><h3>${esc(h)}</h3><ul class="chips">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></article>`).join('');

    $('#expList').innerHTML = P.experience.map(e => `
      <li>
        <div class="t-head"><h3>${esc(e.title)}</h3><time class="t-date">${esc(e.period)}</time></div>
        <p class="t-sub">${esc(e.org)} · ${esc(e.sub)}</p>
        <ul>${e.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </li>`).join('');

    $('#certList').innerHTML = P.certs.map(([n, i]) => `<li>${esc(n)}<span>${esc(i)}</span></li>`).join('');

    $('#projectList').innerHTML = P.projects.map(p => `
      <article class="project${p.featured ? ' featured' : ''}" data-cat="${esc(p.cat)}">
        <div class="p-main">
          <div class="p-meta"><span>${esc(p.kicker)}</span>${p.date ? `<span class="p-date">${esc(p.date)}</span>` : ''}</div>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.desc)}</p>
          <ul class="tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        </div>
        <div class="p-side">
          <dl class="metrics">${p.metrics.map(([v, k]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
          <div class="p-actions">
            ${p.demo ? `<a class="btn btn-primary btn-sm" href="${p.demo}" target="_blank" rel="noopener">Live demo</a>` : ''}
            <a class="btn btn-sm" href="${p.github}" target="_blank" rel="noopener">Code</a>
            <button class="btn btn-sm" type="button" data-project="${esc(p.id)}">Details</button>
          </div>
        </div>
      </article>`).join('');

    /* cursor spotlight on project cards */
    $('#projectList').addEventListener('pointermove', e => {
      const card = e.target.closest('.project');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* ── Theme ─────────────────────────────────────────────── */
  function initTheme() {
    const btn = $('#themeToggle'), meta = $('meta[name="theme-color"]');
    const apply = theme => {
      root.dataset.theme = theme;
      if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f1e3' : '#0c0c0d');
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
      window.dispatchEvent(new Event('themechange'));
    };
    apply(root.dataset.theme === 'light' ? 'light' : 'dark');
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('ansh_portfolio_theme', next); } catch (e) { /* storage unavailable */ }
    });
    /* follow the OS setting until the visitor picks a theme */
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      let saved = null;
      try { saved = localStorage.getItem('ansh_portfolio_theme'); } catch (err) { /* ignore */ }
      if (!saved) apply(e.matches ? 'light' : 'dark');
    });
  }

  /* ── Nav: scrolled state, progress, scroll spy, mobile menu ─ */
  function initNav() {
    const nav = $('#navbar'), bar = $('#progress'), menu = $('#navMenu'), menuBtn = $('#mobileToggle');
    const spy = $$('main section[id]').map(s => [s, $(`.nav-menu a[href="#${s.id}"]`)]).filter(x => x[1]);
    let ticking = false;

    function onScroll() {
      const y = scrollY, max = root.scrollHeight - innerHeight;
      nav.classList.toggle('scrolled', y > 8);
      bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      let current = null;
      spy.forEach(([s]) => { if (s.getBoundingClientRect().top <= innerHeight * 0.35) current = s; });
      if (max > 0 && y >= max - 4) current = spy[spy.length - 1][0]; /* short last section */
      spy.forEach(([s, a]) => {
        const on = s === current;
        a.classList.toggle('active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      ticking = false;
    }
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();

    const setMenu = open => {
      menu.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('click', e => { if (!nav.contains(e.target)) setMenu(false); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });
    addEventListener('resize', () => { if (innerWidth > 860) setMenu(false); });
    $('#backToTop').addEventListener('click', () => scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }));
  }

  /* ── Typed roles ───────────────────────────────────────── */
  function initTyped() {
    const el = $('#typedRoles');
    if (reduced()) { el.textContent = P.roles[0]; return; }
    let r = 0, c = 0, del = false;
    (function tick() {
      const word = P.roles[r];
      c += del ? -1 : 1;
      el.textContent = word.slice(0, c);
      let wait = del ? 35 : 80;
      if (!del && c === word.length) { del = true; wait = 1800; }
      else if (del && c === 0) { del = false; r = (r + 1) % P.roles.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  }

  /* ── Stat counters (final values are in the HTML as a no-JS fallback) ── */
  function initCounters() {
    const counters = $$('#stats dd');
    const parse = t => parseFloat(t.replace(/[^0-9.]/g, ''));
    const fmt = (t, v) => {
      const suffix = t.replace(/[0-9.,]/g, '');
      const dec = t.includes('.') ? t.split('.')[1].replace(/\D/g, '').length : 0;
      return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
    };
    const setAll = k => counters.forEach(el => { const t = el.dataset.target; el.textContent = fmt(t, parse(t) * k); });
    if (reduced() || !('IntersectionObserver' in window)) return;

    setAll(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1400;
      (function step(now) {
        const k = Math.min((now - start) / dur, 1);
        setAll(1 - Math.pow(1 - k, 3));
        if (k < 1) requestAnimationFrame(step);
      })(start);
    }, { threshold: 0.4 });
    io.observe($('#stats'));
  }

  /* ── Project filter ────────────────────────────────────── */
  function initFilters() {
    const btns = $$('.filter'), cards = $$('.project');
    btns.forEach(btn => btn.addEventListener('click', () => {
      btns.forEach(b => { const on = b === btn; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
      const f = btn.dataset.filter;
      cards.forEach(card => { card.hidden = f !== 'all' && !card.dataset.cat.split(' ').includes(f); });
    }));
  }

  /* ── Project modal with focus management ───────────────── */
  function initModal() {
    const modal = $('#projectModal'), box = $('.modal-box', modal);
    let lastFocus = null;

    function open(id, trigger) {
      const p = P.projects.find(x => x.id === id);
      if (!p) return;
      lastFocus = trigger;
      $('#modalTitle').textContent = p.name;
      $('#modalBody').innerHTML = p.detail;
      $('#modalBody').scrollTop = 0;
      $('#modalFoot').innerHTML =
        (p.demo ? `<a class="btn btn-primary btn-sm" href="${p.demo}" target="_blank" rel="noopener">Open live demo</a>` : '') +
        `<a class="btn btn-sm" href="${p.github}" target="_blank" rel="noopener">GitHub repository</a>`;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      box.focus();
    }
    function close() {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    }

    $('#projectList').addEventListener('click', e => {
      const b = e.target.closest('[data-project]');
      if (b) open(b.dataset.project, b);
    });
    $('#modalClose').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    addEventListener('keydown', e => {
      if (modal.hidden) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const f = $$('a[href], button', box);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === box)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ── Contact: copy email + mailto form (no backend needed) ── */
  function initContact() {
    const copy = $('#copyEmail');
    copy.addEventListener('click', async () => {
      let ok = false;
      try { await navigator.clipboard.writeText(P.profile.email); ok = true; } catch (e) { /* fall through */ }
      if (!ok) {
        const t = document.createElement('textarea');
        t.value = P.profile.email; t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select();
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        t.remove();
      }
      copy.textContent = ok ? 'Copied' : 'Copy failed';
      setTimeout(() => { copy.textContent = 'Copy'; }, 1800);
    });

    const form = $('#contactForm'), status = $('#formStatus');
    const fields = ['#senderName', '#senderEmail', '#senderMessage'].map(s => $(s));
    fields.forEach(f => f.addEventListener('input', () => f.removeAttribute('aria-invalid')));

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#senderName').value.trim(), email = $('#senderEmail').value.trim();
      const subject = $('#senderSubject').value.trim() || 'Portfolio inquiry', msg = $('#senderMessage').value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const bad = [];
      if (!name) bad.push($('#senderName'));
      if (!validEmail) bad.push($('#senderEmail'));
      if (!msg) bad.push($('#senderMessage'));
      fields.forEach(f => { if (bad.includes(f)) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid'); });
      if (bad.length) {
        status.className = 'form-status error';
        status.textContent = 'Enter your name, a valid email address and a message.';
        bad[0].focus();
        return;
      }
      status.className = 'form-status success';
      status.textContent = 'Opening your email app. If nothing opens, write to ' + P.profile.email + '.';
      location.href = `mailto:${P.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Ansh,\n\n${msg}\n\nFrom: ${name} (${email})`)}`;
    });
  }

  /* ── Scroll reveal ─────────────────────────────────────── */
  function initReveal() {
    const targets = $$('.section-head, .prose, .facts, .skill, .timeline > li, .project, .certs li, #contactForm');
    targets.forEach(el => el.classList.add('reveal'));
    const groups = new Map();
    targets.forEach(el => {
      const n = groups.get(el.parentElement) || 0;
      groups.set(el.parentElement, n + 1);
      el.style.setProperty('--d', (n % 4) * 0.07 + 's');
    });
    if (reduced() || !('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => io.observe(el));
  }

  /* ── Particle network background ───────────────────────── */
  function initParticles() {
    const canvas = $('#dynamicBg');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const LINK = 140;
    let w = 0, h = 0, dpr = 1, rgb = '212,165,116', particles = [], raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const readColor = () => {
      const v = getComputedStyle(root).getPropertyValue('--particle').trim();
      if (v) rgb = v;
    };
    const color = a => `rgba(${rgb},${a})`;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(24, Math.min(70, Math.round(w / 18)));
      while (particles.length < target) particles.push(makeParticle());
      particles.length = target;
      particles.forEach(p => { p.x = Math.min(p.x, w); p.y = Math.min(p.y, h); });
      if (reduced()) drawFrame();
    }
    function makeParticle() {
      return { x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.8 + .9, a: Math.random() * .3 + .15 };
    }
    function update(p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
      const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
      if (d < 200 && d > 0) { p.vx += dx / d * .012; p.vy += dy / d * .012; }
      const s = Math.hypot(p.vx, p.vy);
      if (s > .9) { p.vx *= .97; p.vy *= .97; }
    }
    function drawFrame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color(p.a); ctx.fill();
      }
      ctx.lineWidth = .6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = color(.16 * (1 - d / LINK));
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
    }
    function loop() { particles.forEach(update); drawFrame(); raf = requestAnimationFrame(loop); }
    function start() { if (!raf && !reduced() && !document.hidden) raf = requestAnimationFrame(loop); }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    readColor();
    resize();
    addEventListener('resize', resize);
    addEventListener('themechange', () => { readColor(); if (!raf) drawFrame(); });
    addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    root.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    reducedMQ.addEventListener('change', () => { stop(); if (reduced()) drawFrame(); else start(); });
    if (reduced()) drawFrame(); else start();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
