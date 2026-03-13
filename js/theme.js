// ===== Theme System (loaded in <head> to prevent flash) =====
(function() {
  'use strict';

  var THEMES = {
    'dark': {
      label: 'ダーク', icon: '\u{1F319}',
      preview: ['#0a0e17', '#161b22', '#58a6ff'],
      vars: {}  // default :root
    },
    'light': {
      label: 'ライト', icon: '\u{2600}',
      preview: ['#ffffff', '#f6f8fa', '#0969da'],
      vars: {
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f6f8fa',
        '--bg-tertiary': '#f0f3f6',
        '--bg-card': 'rgba(255,255,255,.9)',
        '--bg-header': 'rgba(255,255,255,.92)',
        '--bg-header-scrolled': 'rgba(255,255,255,.98)',
        '--text-primary': '#1f2328',
        '--text-secondary': '#424a53',
        '--text-muted': '#656d76',
        '--text-faint': '#8b949e',
        '--border-primary': 'rgba(208,215,222,.8)',
        '--border-secondary': 'rgba(208,215,222,.5)',
        '--accent': '#0969da',
        '--accent-hover': '#0550ae',
        '--accent-bg': 'rgba(9,105,218,.08)',
        '--accent-bg-strong': 'rgba(9,105,218,.12)',
        '--bg-overlay-light': 'rgba(208,215,222,.15)',
        '--bg-overlay': 'rgba(208,215,222,.3)',
        '--bg-overlay-strong': 'rgba(208,215,222,.5)'
      }
    },
    'daytime': {
      label: '昼', icon: '\u{1F324}',
      preview: ['#f0f5ff', '#e8effc', '#2563eb'],
      vars: {
        '--bg-primary': '#f0f5ff',
        '--bg-secondary': '#e8effc',
        '--bg-tertiary': '#dce6f7',
        '--bg-card': 'rgba(255,255,255,.85)',
        '--bg-header': 'rgba(240,245,255,.92)',
        '--bg-header-scrolled': 'rgba(240,245,255,.98)',
        '--text-primary': '#1e293b',
        '--text-secondary': '#475569',
        '--text-muted': '#64748b',
        '--text-faint': '#94a3b8',
        '--border-primary': 'rgba(148,163,184,.4)',
        '--border-secondary': 'rgba(148,163,184,.2)',
        '--accent': '#2563eb',
        '--accent-hover': '#1d4ed8',
        '--accent-bg': 'rgba(37,99,235,.08)',
        '--accent-bg-strong': 'rgba(37,99,235,.12)',
        '--bg-overlay-light': 'rgba(226,232,240,.2)',
        '--bg-overlay': 'rgba(226,232,240,.4)',
        '--bg-overlay-strong': 'rgba(226,232,240,.6)'
      }
    },
    'sunset': {
      label: '夕方', icon: '\u{1F305}',
      preview: ['#1a0f0a', '#2d1810', '#f97316'],
      vars: {
        '--bg-primary': '#1a0f0a',
        '--bg-secondary': '#2d1810',
        '--bg-tertiary': '#1f1209',
        '--bg-card': 'rgba(45,24,16,.7)',
        '--bg-header': 'rgba(26,15,10,.88)',
        '--bg-header-scrolled': 'rgba(26,15,10,.95)',
        '--text-primary': '#fde8d8',
        '--text-secondary': '#e8c4a8',
        '--text-muted': '#b8906a',
        '--text-faint': '#7a5c40',
        '--border-primary': 'rgba(120,80,50,.5)',
        '--border-secondary': 'rgba(120,80,50,.3)',
        '--accent': '#f97316',
        '--accent-hover': '#fb923c',
        '--accent-bg': 'rgba(249,115,22,.1)',
        '--accent-bg-strong': 'rgba(249,115,22,.15)',
        '--bg-overlay-light': 'rgba(45,24,16,.3)',
        '--bg-overlay': 'rgba(45,24,16,.5)',
        '--bg-overlay-strong': 'rgba(45,24,16,.8)'
      }
    },
    'night': {
      label: '夜', icon: '\u{1F303}',
      preview: ['#06081a', '#0c1030', '#818cf8'],
      vars: {
        '--bg-primary': '#06081a',
        '--bg-secondary': '#0c1030',
        '--bg-tertiary': '#080b22',
        '--bg-card': 'rgba(12,16,48,.7)',
        '--bg-header': 'rgba(6,8,26,.88)',
        '--bg-header-scrolled': 'rgba(6,8,26,.95)',
        '--text-primary': '#e0e7ff',
        '--text-secondary': '#c7d2fe',
        '--text-muted': '#818cf8',
        '--text-faint': '#4f46e5',
        '--border-primary': 'rgba(99,102,241,.25)',
        '--border-secondary': 'rgba(99,102,241,.15)',
        '--accent': '#818cf8',
        '--accent-hover': '#a5b4fc',
        '--accent-bg': 'rgba(129,140,248,.1)',
        '--accent-bg-strong': 'rgba(129,140,248,.15)',
        '--bg-overlay-light': 'rgba(12,16,48,.3)',
        '--bg-overlay': 'rgba(12,16,48,.5)',
        '--bg-overlay-strong': 'rgba(12,16,48,.8)'
      }
    },
    'skyblue': {
      label: 'スカイブルー', icon: '\u{1F4A7}',
      preview: ['#f0f9ff', '#e0f2fe', '#0ea5e9'],
      vars: {
        '--bg-primary': '#f0f9ff',
        '--bg-secondary': '#e0f2fe',
        '--bg-tertiary': '#d4edfc',
        '--bg-card': 'rgba(255,255,255,.85)',
        '--bg-header': 'rgba(240,249,255,.92)',
        '--bg-header-scrolled': 'rgba(240,249,255,.98)',
        '--text-primary': '#0c4a6e',
        '--text-secondary': '#0369a1',
        '--text-muted': '#0284c7',
        '--text-faint': '#7dd3fc',
        '--border-primary': 'rgba(14,165,233,.25)',
        '--border-secondary': 'rgba(14,165,233,.12)',
        '--accent': '#0ea5e9',
        '--accent-hover': '#0284c7',
        '--accent-bg': 'rgba(14,165,233,.08)',
        '--accent-bg-strong': 'rgba(14,165,233,.12)',
        '--bg-overlay-light': 'rgba(186,230,253,.2)',
        '--bg-overlay': 'rgba(186,230,253,.4)',
        '--bg-overlay-strong': 'rgba(186,230,253,.6)'
      }
    },
    'forest': {
      label: 'フォレスト', icon: '\u{1F332}',
      preview: ['#071209', '#0d2818', '#22c55e'],
      vars: {
        '--bg-primary': '#071209',
        '--bg-secondary': '#0d2818',
        '--bg-tertiary': '#091e0f',
        '--bg-card': 'rgba(13,40,24,.7)',
        '--bg-header': 'rgba(7,18,9,.88)',
        '--bg-header-scrolled': 'rgba(7,18,9,.95)',
        '--text-primary': '#dcfce7',
        '--text-secondary': '#bbf7d0',
        '--text-muted': '#6ee7a0',
        '--text-faint': '#2a6e3f',
        '--border-primary': 'rgba(34,197,94,.25)',
        '--border-secondary': 'rgba(34,197,94,.15)',
        '--accent': '#22c55e',
        '--accent-hover': '#4ade80',
        '--accent-bg': 'rgba(34,197,94,.1)',
        '--accent-bg-strong': 'rgba(34,197,94,.15)',
        '--bg-overlay-light': 'rgba(13,40,24,.3)',
        '--bg-overlay': 'rgba(13,40,24,.5)',
        '--bg-overlay-strong': 'rgba(13,40,24,.8)'
      }
    },
    'sakura': {
      label: 'サクラ', icon: '\u{1F338}',
      preview: ['#fdf2f8', '#fce7f3', '#ec4899'],
      vars: {
        '--bg-primary': '#fdf2f8',
        '--bg-secondary': '#fce7f3',
        '--bg-tertiary': '#fbcfe8',
        '--bg-card': 'rgba(255,255,255,.85)',
        '--bg-header': 'rgba(253,242,248,.92)',
        '--bg-header-scrolled': 'rgba(253,242,248,.98)',
        '--text-primary': '#831843',
        '--text-secondary': '#9d174d',
        '--text-muted': '#be185d',
        '--text-faint': '#f9a8d4',
        '--border-primary': 'rgba(236,72,153,.2)',
        '--border-secondary': 'rgba(236,72,153,.1)',
        '--accent': '#ec4899',
        '--accent-hover': '#db2777',
        '--accent-bg': 'rgba(236,72,153,.08)',
        '--accent-bg-strong': 'rgba(236,72,153,.12)',
        '--bg-overlay-light': 'rgba(251,207,232,.2)',
        '--bg-overlay': 'rgba(251,207,232,.4)',
        '--bg-overlay-strong': 'rgba(251,207,232,.6)'
      }
    },
    'gold': {
      label: 'ゴールド', icon: '\u{1F451}',
      preview: ['#1a150a', '#2d2510', '#eab308'],
      vars: {
        '--bg-primary': '#1a150a',
        '--bg-secondary': '#2d2510',
        '--bg-tertiary': '#1f1b09',
        '--bg-card': 'rgba(45,37,16,.7)',
        '--bg-header': 'rgba(26,21,10,.88)',
        '--bg-header-scrolled': 'rgba(26,21,10,.95)',
        '--text-primary': '#fef9c3',
        '--text-secondary': '#fde68a',
        '--text-muted': '#ca8a04',
        '--text-faint': '#854d0e',
        '--border-primary': 'rgba(234,179,8,.25)',
        '--border-secondary': 'rgba(234,179,8,.15)',
        '--accent': '#eab308',
        '--accent-hover': '#facc15',
        '--accent-bg': 'rgba(234,179,8,.1)',
        '--accent-bg-strong': 'rgba(234,179,8,.15)',
        '--bg-overlay-light': 'rgba(45,37,16,.3)',
        '--bg-overlay': 'rgba(45,37,16,.5)',
        '--bg-overlay-strong': 'rgba(45,37,16,.8)'
      }
    },
    'ocean': {
      label: 'オーシャン', icon: '\u{1F30A}',
      preview: ['#042f2e', '#064e3b', '#14b8a6'],
      vars: {
        '--bg-primary': '#042f2e',
        '--bg-secondary': '#064e3b',
        '--bg-tertiary': '#053832',
        '--bg-card': 'rgba(6,78,59,.5)',
        '--bg-header': 'rgba(4,47,46,.88)',
        '--bg-header-scrolled': 'rgba(4,47,46,.95)',
        '--text-primary': '#ccfbf1',
        '--text-secondary': '#99f6e4',
        '--text-muted': '#5eead4',
        '--text-faint': '#0d6e5e',
        '--border-primary': 'rgba(20,184,166,.25)',
        '--border-secondary': 'rgba(20,184,166,.15)',
        '--accent': '#14b8a6',
        '--accent-hover': '#2dd4bf',
        '--accent-bg': 'rgba(20,184,166,.1)',
        '--accent-bg-strong': 'rgba(20,184,166,.15)',
        '--bg-overlay-light': 'rgba(6,78,59,.3)',
        '--bg-overlay': 'rgba(6,78,59,.5)',
        '--bg-overlay-strong': 'rgba(6,78,59,.8)'
      }
    }
  };

  function applyTheme(id) {
    var theme = THEMES[id];
    if (!theme) return;
    var root = document.documentElement;
    // Reset to default first
    root.removeAttribute('data-theme');
    var vars = theme.vars;
    if (Object.keys(vars).length === 0) {
      // Default dark: clear all inline styles
      root.style.cssText = '';
    } else {
      var css = '';
      for (var key in vars) {
        css += key + ':' + vars[key] + ';';
      }
      root.style.cssText = css;
    }
    localStorage.setItem('jg-theme', id);
  }

  // Apply on load immediately (no flash)
  var saved = localStorage.getItem('jg-theme') || 'dark';
  if (saved !== 'dark' && THEMES[saved]) {
    applyTheme(saved);
  }

  // Migrate old settings
  var oldMode = localStorage.getItem('theme-mode');
  if (oldMode === 'light' && !localStorage.getItem('jg-theme')) {
    applyTheme('light');
  }

  // Expose globally
  window.JG_THEMES = THEMES;
  window.applyJGTheme = applyTheme;
})();
