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
      a.insertAdjacentHTML('afterbegin', '<span class="nav-icon">' + meta.icon + '</span>');
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

  // PC Sticky Sidebar (auto-inject on 900px+ screens with long content)
  if (window.matchMedia('(min-width: 900px)').matches && !document.querySelector('.page-sidebar')) {
    var mainEl = document.querySelector('main.container, main');
    if (mainEl && mainEl.scrollHeight > 600) {
      var wrapper = document.createElement('div');
      wrapper.className = 'page-with-sidebar';
      mainEl.parentNode.insertBefore(wrapper, mainEl);
      wrapper.appendChild(mainEl);
      var sidebar = document.createElement('aside');
      sidebar.className = 'page-sidebar';
      sidebar.innerHTML =
        '<div class="sidebar-ad-slot">'
        + '<div class="ad-label">\u5E83\u544A</div>'
        + '<div class="sidebar-ad-placeholder">'
        + '<!-- \u3053\u3053\u306B\u5E83\u544A\u30B3\u30FC\u30C9\u3092\u633F\u5165 -->'
        + '\u5E83\u544A\u30B9\u30DA\u30FC\u30B9<br>300\u00D7250'
        + '</div>'
        + '</div>'
        + '<div class="sidebar-ad-slot">'
        + '<div class="ad-label">\u5E83\u544A</div>'
        + '<div class="sidebar-ad-placeholder">'
        + '<!-- \u3053\u3053\u306B\u5E83\u544A\u30B3\u30FC\u30C9\u3092\u633F\u5165 -->'
        + '\u5E83\u544A\u30B9\u30DA\u30FC\u30B9<br>300\u00D7250'
        + '</div>'
        + '</div>';
      wrapper.appendChild(sidebar);
    }
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
  const tocMain = document.querySelector('main');
  if (tocMain && !document.querySelector('.auto-toc')) {
    const headings = tocMain.querySelectorAll('h2.section-title, h2');
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // Keep the site functional even if offline registration fails.
    });
  });
}
