// ===== Toast Notification =====
function showToast(message, type) {
  type = type || 'error';
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  var el = document.createElement('div');
  el.className = 'toast toast--' + type;
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { el.classList.add('show'); });
  });
  setTimeout(function() {
    el.classList.remove('show');
    setTimeout(function() { el.remove(); }, 300);
  }, 4000);
}

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

  // Search button in header
  const headerInner = document.querySelector('.header-inner');
  if (headerInner && !document.querySelector('.header-search-btn')) {
    const searchBtn = document.createElement('button');
    searchBtn.className = 'header-search-btn';
    searchBtn.setAttribute('aria-label', '検索');
    searchBtn.innerHTML = '&#x1F50D;';
    searchBtn.addEventListener('click', () => {
      const overlay = document.querySelector('.qs-overlay');
      if (overlay) { overlay.classList.add('open'); overlay.querySelector('.qs-input').focus(); }
    });
    const navToggle = headerInner.querySelector('.nav-toggle');
    if (navToggle) headerInner.insertBefore(searchBtn, navToggle);
    else headerInner.appendChild(searchBtn);
  }

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    }
    function closeMenu() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', toggleMenu);
    // Close menu when a link is clicked (SP)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
    // Close menu when tapping outside (SP)
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // Nav icons & colors
  const NAV_META = {
    'index.html':              { icon: '\u{1F3E0}', color: '#58a6ff' },
    'roles.html':              { icon: '\u{1F4CB}', color: '#58a6ff' },
    'characters.html':         { icon: '\u{1F3AD}', color: '#c084fc' },
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
    'gallery.html':            { icon: '\u{1F5BC}', color: '#e879f9' },
    'survivor-count.html':     { icon: '\u{1F43A}', color: '#e74c3c' },
    'ai-advisor.html':         { icon: '\u{1F916}', color: '#a78bfa' },
    'settings.html':           { icon: '\u{2699}',  color: '#8b949e' },
    'pc-app.html':             { icon: '\u{1F4BB}', color: '#58a6ff' },
  };

  // Mark active nav link & inject icons/colors
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const currentPageClean = currentPage.replace('.html', '');
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    const hrefClean = href.replace('.html', '');
    const isActive = href === currentPage || hrefClean === currentPageClean;
    if (isActive) a.classList.add('active');
    const meta = NAV_META[href];
    if (meta) {
      if (isActive) a.style.borderLeftColor = meta.color;
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

  // Affiliate banner (auto-inject before footer on all pages)
  if (!document.querySelector('.affiliate-banner')) {
    var footer = document.querySelector('footer');
    if (footer) {
      var afDiv = document.createElement('div');
      afDiv.className = 'affiliate-banner';
      afDiv.style.cssText = 'text-align:center;margin:2rem auto;padding:1rem 0;max-width:600px;';
      afDiv.innerHTML =
        '<a href="//af.moshimo.com/af/c/click?a_id=5422323&p_id=54&pc_id=54&pl_id=1252" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>'
        + '<img src="//image.moshimo.com/af-img/0032/000000001252.gif" width="234" height="60" style="border:none;">'
        + '</a>'
        + '<img src="//i.moshimo.com/af/i/impression?a_id=5422323&p_id=54&pc_id=54&pl_id=1252" width="1" height="1" style="border:none;" loading="lazy">';
      footer.parentNode.insertBefore(afDiv, footer);
    }
  }

  // PC Sticky Sidebar (auto-inject on 1024px+ screens with long content)
  if (window.matchMedia('(min-width: 1024px)').matches && !document.querySelector('.page-sidebar')) {
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
        + '<a href="//af.moshimo.com/af/c/click?a_id=5422323&p_id=54&pc_id=54&pl_id=1231" rel="nofollow" referrerpolicy="no-referrer-when-downgrade">'
        + '<img src="//image.moshimo.com/af-img/0032/000000001231.gif" width="120" height="500" style="border:none;">'
        + '</a>'
        + '<img src="//i.moshimo.com/af/i/impression?a_id=5422323&p_id=54&pc_id=54&pl_id=1231" width="1" height="1" style="border:none;" loading="lazy">'
        + '</div>';
      wrapper.appendChild(sidebar);
    }
  }

  // Rakuten side banner (PC only, fixed right center)
  if (window.matchMedia('(min-width: 1024px)').matches && !document.getElementById('rakuten-side-banner')) {
    var sideBanner = document.createElement('div');
    sideBanner.id = 'rakuten-side-banner';
    sideBanner.innerHTML =
      '<a href="//af.moshimo.com/af/c/click?a_id=5422316&p_id=54&pc_id=54&pl_id=1225" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" attributionsrc>'
      + '<img src="//image.moshimo.com/af-img/0032/000000001225.gif" width="120" height="500" style="border:none;">'
      + '</a>'
      + '<img src="//i.moshimo.com/af/i/impression?a_id=5422316&p_id=54&pc_id=54&pl_id=1225" width="1" height="1" style="border:none;" loading="lazy">';
    var bannerStyle = document.createElement('style');
    bannerStyle.textContent =
      '#rakuten-side-banner { display: none; }'
      + '@media (min-width: 1024px) {'
      + '  #rakuten-side-banner {'
      + '    display: block;'
      + '    position: fixed;'
      + '    right: 0;'
      + '    top: 50%;'
      + '    transform: translateY(-50%);'
      + '    z-index: 9999;'
      + '  }'
      + '}';
    document.head.appendChild(bannerStyle);
    document.body.appendChild(sideBanner);
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
  try {
    const breadcrumbEl = document.querySelector('.breadcrumb');
    if (breadcrumbEl && !document.querySelector('script[type="application/ld+json"][data-bc]')) {
      const links = breadcrumbEl.querySelectorAll('a');
      const items = [];
      const base = 'https://toukanno.github.io/jinro-judgment-fansite/';
      links.forEach((a, i) => {
        const href = a.getAttribute('href');
        const name = a.textContent.trim();
        if (href && name) {
          items.push({
            '@type': 'ListItem',
            position: i + 1,
            name: name,
            item: base + href
          });
        }
      });
      // Add current page as last item
      const lastNode = breadcrumbEl.lastChild;
      const pageTitle = lastNode ? lastNode.textContent.trim() : '';
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
  } catch (e) { /* breadcrumb generation failed silently */ }

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

  // Quick Search Modal (Ctrl+K / Cmd+K)
  const SEARCH_PAGES = [
    { href: 'index.html', title: 'ホーム', desc: 'トップページ' },
    { href: 'roles.html', title: '役職一覧', desc: '全役職の能力・陣営データベース' },
    { href: 'characters.html', title: 'キャラクター', desc: 'キャラクター一覧' },
    { href: 'guide.html', title: '初心者ガイド', desc: '基本ルール・進行の流れ' },
    { href: 'strategy.html', title: '立ち回りガイド', desc: '陣営別の戦術・テクニック' },
    { href: 'composition.html', title: '編成シミュレーター', desc: '役職構成のバランス確認' },
    { href: 'glossary.html', title: '用語集', desc: '専門用語・略語を検索' },
    { href: 'templates.html', title: '部屋テンプレ集', desc: '部屋ルール・テンプレート' },
    { href: 'copipe.html', title: 'コピペ集', desc: 'ゲーム中の定型文' },
    { href: 'v3roles.html', title: 'V3新役職', desc: 'V3アップデートの新役職' },
    { href: 'queen-wise.html', title: '女王部屋攻略', desc: '20人女王部屋の立ち回り' },
    { href: 'faq.html', title: 'FAQ', desc: 'よくある質問' },
    { href: 'timer.html', title: '議論タイマー', desc: '議論時間管理ツール' },
    { href: 'exclusion.html', title: '同村制限', desc: '同村できない役職の組み合わせ' },
    { href: 'rope-calc.html', title: '縄計算', desc: '吊り余裕の自動計算' },
    { href: 'synergy.html', title: '役職相性', desc: '役職同士のシナジー' },
    { href: 'quiz.html', title: 'クイズ', desc: '知識テスト 初級〜上級' },
    { href: 'notepad.html', title: 'メモ帳', desc: 'ゲーム中のメモツール' },
    { href: 'memo.html', title: 'ゲームメモ', desc: 'プレイヤーごとの記録' },
    { href: 'role-compatibility.html', title: '相性表', desc: '役職相性マトリクス' },
    { href: 'gallery.html', title: 'ギャラリー', desc: '画像ギャラリー' },
    { href: 'settings.html', title: '設定', desc: 'テーマ・表示設定' },
    { href: 'pc-app.html', title: 'PCアプリ版', desc: 'アプリとしてインストール' },
  ];

  (function initQuickSearch() {
    const overlay = document.createElement('div');
    overlay.className = 'qs-overlay';
    overlay.innerHTML = '<div class="qs-modal">'
      + '<input class="qs-input" type="text" placeholder="ページを検索... (Ctrl+K)" autocomplete="off">'
      + '<div class="qs-results"></div>'
      + '<div class="qs-hint">↑↓ 移動 · Enter 開く · Esc 閉じる</div>'
      + '</div>';
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.qs-input');
    const results = overlay.querySelector('.qs-results');
    let selectedIdx = 0;
    let filtered = [];

    function render(query) {
      query = (query || '').toLowerCase();
      filtered = query
        ? SEARCH_PAGES.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query) || p.href.includes(query))
        : SEARCH_PAGES;
      selectedIdx = 0;
      results.innerHTML = filtered.map((p, i) => {
        const meta = NAV_META[p.href];
        const icon = meta ? meta.icon : '';
        return '<a class="qs-item' + (i === 0 ? ' active' : '') + '" href="' + p.href + '">'
          + '<span class="qs-icon">' + icon + '</span>'
          + '<span class="qs-text"><span class="qs-title">' + p.title + '</span><span class="qs-desc">' + p.desc + '</span></span>'
          + '</a>';
      }).join('');
    }

    function updateActive() {
      results.querySelectorAll('.qs-item').forEach((el, i) => {
        el.classList.toggle('active', i === selectedIdx);
        if (i === selectedIdx) el.scrollIntoView({ block: 'nearest' });
      });
    }

    function open() {
      overlay.classList.add('open');
      input.value = '';
      render('');
      input.focus();
    }

    function close() {
      overlay.classList.remove('open');
    }

    input.addEventListener('input', () => render(input.value));

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, filtered.length - 1); updateActive(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, 0); updateActive(); }
      else if (e.key === 'Enter' && filtered[selectedIdx]) { e.preventDefault(); window.location.href = filtered[selectedIdx].href; }
      else if (e.key === 'Escape') { close(); }
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.contains('open') ? close() : open();
      }
    });
  })();

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

// ===== PWA Install Prompt =====
window._pwaInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window._pwaInstallPrompt = e;
  window.dispatchEvent(new Event('pwa-install-ready'));

  // Show install banner (only if not dismissed recently)
  var dismissed = sessionStorage.getItem('pwa-install-dismissed');
  if (dismissed) return;

  // Don't show if already in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: window-controls-overlay)').matches) return;

  var banner = document.createElement('div');
  banner.className = 'pwa-install-banner';
  banner.innerHTML =
    '<span class="pwa-install-banner-text"><strong>人狼JGDB</strong>をPCアプリとしてインストールできます</span>'
    + '<button class="pwa-install-btn" id="pwaBannerInstall">インストール</button>'
    + '<button class="pwa-install-dismiss" id="pwaBannerDismiss">閉じる</button>';
  document.body.appendChild(banner);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() { banner.classList.add('show'); });
  });

  document.getElementById('pwaBannerInstall').addEventListener('click', function() {
    if (window._pwaInstallPrompt) {
      window._pwaInstallPrompt.prompt();
      window._pwaInstallPrompt.userChoice.then(function(result) {
        if (result.outcome === 'accepted') {
          banner.classList.remove('show');
          setTimeout(function() { banner.remove(); }, 300);
        }
        window._pwaInstallPrompt = null;
      });
    }
  });

  document.getElementById('pwaBannerDismiss').addEventListener('click', function() {
    banner.classList.remove('show');
    setTimeout(function() { banner.remove(); }, 300);
    sessionStorage.setItem('pwa-install-dismissed', '1');
  });
});

window.addEventListener('appinstalled', () => {
  window._pwaInstallPrompt = null;
  var banner = document.querySelector('.pwa-install-banner');
  if (banner) {
    banner.classList.remove('show');
    setTimeout(function() { banner.remove(); }, 300);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then((reg) => {
      reg.update();
    }).catch(() => {});
  });
}
