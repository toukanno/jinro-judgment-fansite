// ===== Mobile Nav Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Mark active nav link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
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

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
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

  // Apply saved theme on load
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
