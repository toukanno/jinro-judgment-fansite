// ===== Mobile Nav Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  // Skip to content link (accessibility)
  const mainContent = document.querySelector('main, .container, .timer-container, .memo-container');
  if (mainContent && !document.querySelector('.skip-link')) {
    if (!mainContent.id) mainContent.id = 'main-content';
    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#' + mainContent.id;
    skip.textContent = 'メインコンテンツへスキップ';
    document.body.prepend(skip);
  }

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    // Close menu when a link is clicked (SP)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Nav icons & colors
  const NAV_META = {
    'index.html':              { icon: '\u{1F3E0}', color: '#58a6ff' },
    'roles.html':              { icon: '\u{1F4CB}', color: '#58a6ff' },
    'characters.html':         { icon: '\u{1F3AD}', color: '#a78bfa' },
    'guide.html':              { icon: '\u{1F4D6}', color: '#58a6ff' },
    'strategy.html':           { icon: '\u{1F3AF}', color: '#58a6ff' },
    'composition.html':        { icon: '\u{1F9E9}', color: '#7ee787' },
    'glossary.html':           { icon: '\u{1F4DD}', color: '#7ee787' },
    'templates.html':          { icon: '\u{1F4C4}', color: '#f0883e' },
    'copipe.html':             { icon: '\u{1F4CE}', color: '#f0883e' },
    'v3roles.html':            { icon: '\u{26A1}',  color: '#f85149' },
    'queen-wise.html':         { icon: '\u{1F451}', color: '#fbbf24' },
    'faq.html':                { icon: '\u{2753}',  color: '#7ee787' },
    'timer.html':              { icon: '\u{23F1}',  color: '#f0883e' },
    'exclusion.html':          { icon: '\u{1F6AB}', color: '#f85149' },
    'rope-calc.html':          { icon: '\u{1F522}', color: '#f0883e' },
    'synergy.html':            { icon: '\u{1F91D}', color: '#7ee787' },
    'quiz.html':               { icon: '\u{1F9E0}', color: '#f0883e' },
    'notepad.html':            { icon: '\u{1F4DD}', color: '#f0883e' },
    'memo.html':               { icon: '\u{1F4D2}', color: '#f0883e' },
    'characters-gallery.html': { icon: '\u{1F5BC}', color: '#a78bfa' },
    'role-compatibility.html': { icon: '\u{1F4CA}', color: '#7ee787' },
    'settings.html':           { icon: '\u{2699}',  color: '#8b949e' },
  };

  // Mark active nav link & inject icons/colors
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage) a.classList.add('active');
    const meta = NAV_META[href];
    if (meta) {
      a.style.borderLeftColor = meta.color;
      var iconSpan = document.createElement('span');
      iconSpan.className = 'nav-icon';
      iconSpan.textContent = meta.icon;
      a.insertBefore(iconSpan, a.firstChild);
    }
  });

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      if (item.classList.contains('open')) {
        body.style.maxHeight = null;
        item.classList.remove('open');
      } else {
        body.style.maxHeight = body.scrollHeight + 'px';
        item.classList.add('open');
      }
    });
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tabs-container');
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      group.querySelector(`#${btn.dataset.tab}`).classList.add('active');
    });
  });

  // Back to Top button (auto-inject)
  if (!document.querySelector('.back-to-top')) {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'ページトップへ戻る');
    btn.innerHTML = '&#x25B2;';
    document.body.appendChild(btn);
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });
  }

  // Sidebar Ads (PC only, left + right, auto-inject)
  if (!document.querySelector('.sidebar-ad')) {
    var adHTML = '<a href="//af.moshimo.com/af/c/click?a_id=5422323&p_id=54&pc_id=54&pl_id=1225" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>'
      + '<img src="//image.moshimo.com/af-img/0032/000000001225.gif" width="120" height="500" style="border:none;" alt="広告"></a>'
      + '<img src="//i.moshimo.com/af/i/impression?a_id=5422323&p_id=54&pc_id=54&pl_id=1225" width="1" height="1" style="border:none;" loading="lazy" alt="">';
    ['left', 'right'].forEach(function(side) {
      var ad = document.createElement('div');
      ad.className = 'sidebar-ad sidebar-ad-' + side;
      ad.innerHTML = '<button class="sidebar-ad-close" aria-label="閉じる">&times;</button>' + adHTML;
      document.body.appendChild(ad);
      ad.querySelector('.sidebar-ad-close').addEventListener('click', function() {
        ad.style.opacity = '0';
        setTimeout(function() { ad.remove(); }, 300);
      });
    });
  }

  // Scroll progress bar (auto-inject)
  if (!document.querySelector('.scroll-progress')) {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
    }, { passive: true });
  }

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Breadcrumb JSON-LD auto-generation
  const breadcrumbEl = document.querySelector('.breadcrumb');
  if (breadcrumbEl && !document.querySelector('script[type="application/ld+json"][data-bc]')) {
    const links = breadcrumbEl.querySelectorAll('a');
    const items = [];
    const base = 'https://toukanno.github.io/jinro-judgment-fansite/';
    links.forEach((a, i) => {
      items.push({
        '@type': 'ListItem',
        position: i + 1,
        name: a.textContent.trim(),
        item: base + a.getAttribute('href')
      });
    });
    // Add current page as last item
    const pageTitle = breadcrumbEl.lastChild.textContent.trim();
    if (pageTitle) {
      items.push({
        '@type': 'ListItem',
        position: items.length + 1,
        name: pageTitle
      });
    }
    if (items.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-bc', '');
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items
      });
      document.head.appendChild(script);
    }
  }

  // Auto Table of Contents for long pages (3+ h2 headings)
  const mainEl = document.querySelector('main');
  if (mainEl && !document.querySelector('.auto-toc')) {
    const headings = mainEl.querySelectorAll('h2.section-title, h2');
    if (headings.length >= 3) {
      const toc = document.createElement('details');
      toc.className = 'auto-toc';
      toc.innerHTML = '<summary>&#x1F4D1; 目次</summary>';
      const list = document.createElement('ol');
      headings.forEach((h, i) => {
        if (!h.id) h.id = 'toc-' + i;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/^[\s\S]{0,2}/, '').trim() || h.textContent.trim();
        li.appendChild(a);
        list.appendChild(li);
      });
      toc.appendChild(list);
      const firstH2 = headings[0];
      firstH2.parentNode.insertBefore(toc, firstH2);
    }
  }

  // Scroll reveal animation for cards and sections
  if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.card, .accordion-item, .tip-box, .strat-card, .strat-section');
    revealTargets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => observer.observe(el));
  }
});

// ===== Theme Color System =====
(function() {
  const THEMES = {
    'dark-blue': { accent: '#58a6ff', accentHover: '#79c0ff', label: 'ダークブルー' },
    'dark-purple': { accent: '#a78bfa', accentHover: '#c4b5fd', label: 'ダークパープル' },
    'dark-red': { accent: '#f85149', accentHover: '#ff6b6b', label: 'ダークレッド' },
    'dark-green': { accent: '#7ee787', accentHover: '#a5f0b0', label: 'ダークグリーン' },
    'dark-orange': { accent: '#f0883e', accentHover: '#f4a261', label: 'ダークオレンジ' },
    'black': { accent: '#8b949e', accentHover: '#b1bac4', label: 'ブラック' },
    'navy': { accent: '#388bfd', accentHover: '#58a6ff', label: 'ネイビー' },
    'dark-teal': { accent: '#2dd4bf', accentHover: '#5eead4', label: 'ダークティール' },
    'dark-brown': { accent: '#d2a679', accentHover: '#e8c9a0', label: 'ダークブラウン' },
    'dark-pink': { accent: '#f778ba', accentHover: '#ff9ed2', label: 'ダークピンク' },
  };

  function applyThemeColor(themeId) {
    const theme = THEMES[themeId];
    if (!theme) return;
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent-hover', theme.accentHover);
    document.documentElement.style.setProperty('--accent-bg', hexToRgba(theme.accent, 0.1));
    document.documentElement.style.setProperty('--accent-bg-strong', hexToRgba(theme.accent, 0.15));
    localStorage.setItem('theme-color', themeId);
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // Apply saved theme mode (light/dark)
  if (localStorage.getItem('theme-mode') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Apply saved theme color
  const saved = localStorage.getItem('theme-color');
  if (saved && THEMES[saved]) {
    applyThemeColor(saved);
  }

  // Expose for settings page
  window.THEME_COLORS = THEMES;
  window.applyThemeColor = applyThemeColor;
})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Keep the site functional even if offline registration fails.
    });
  });
}
