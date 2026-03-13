/**
 * Update all HTML files with iOS PWA support:
 * - viewport-fit=cover for notch support
 * - PNG apple-touch-icon references
 * - iOS splash screen (startup image) meta tags
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const htmlFiles = readdirSync(root).filter(f => f.endsWith('.html'));

// iOS splash screen link tags
const splashTags = `
  <!-- iOS Splash Screens -->
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-1242x2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-828x1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-1242x2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-1179x2556.png" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-1290x2796.png" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-1536x2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-1668x2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)">
  <link rel="apple-touch-startup-image" href="icons/splash/apple-splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)">`;

let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = join(root, file);
  let html = readFileSync(filePath, 'utf-8');
  let changed = false;

  // 1. Update viewport meta to include viewport-fit=cover
  if (html.includes('viewport') && !html.includes('viewport-fit=cover')) {
    html = html.replace(
      /(<meta\s+name="viewport"\s+content="[^"]*)(">)/,
      '$1, viewport-fit=cover$2'
    );
    changed = true;
  }

  // 2. Replace SVG apple-touch-icon with PNG
  if (html.includes('apple-touch-icon') && html.includes('icon-192.svg')) {
    html = html.replace(
      '<link rel="apple-touch-icon" href="icons/icon-192.svg">',
      `<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
  <link rel="apple-touch-icon" sizes="120x120" href="icons/apple-touch-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="152x152" href="icons/apple-touch-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon-180x180.png">`
    );
    changed = true;
  }

  // 3. Add apple-mobile-web-app-title if missing
  if (!html.includes('apple-mobile-web-app-title')) {
    html = html.replace(
      /<meta name="apple-mobile-web-app-status-bar-style"[^>]*>/,
      '$&\n  <meta name="apple-mobile-web-app-title" content="人狼JGDB">'
    );
    changed = true;
  }

  // 4. Add apple-mobile-web-app-capable if missing
  if (!html.includes('apple-mobile-web-app-capable')) {
    html = html.replace(
      /(<meta\s+name="viewport"[^>]*>)/,
      '$1\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n  <meta name="apple-mobile-web-app-title" content="人狼JGDB">'
    );
    changed = true;
  }

  // 5. Add splash screen tags after apple-touch-icon (if not already present)
  if (!html.includes('apple-touch-startup-image')) {
    // Insert after the last apple-touch-icon line
    html = html.replace(
      /(<link rel="apple-touch-icon"[^>]*180x180[^>]*>)/,
      `$1${splashTags}`
    );
    changed = true;
  }

  // 6. Add manifest link if missing
  if (!html.includes('rel="manifest"')) {
    html = html.replace('</head>', '  <link rel="manifest" href="manifest.json">\n</head>');
    changed = true;
  }

  if (changed) {
    writeFileSync(filePath, html);
    updatedCount++;
    console.log(`Updated: ${file}`);
  } else {
    console.log(`Skipped (no changes needed): ${file}`);
  }
}

console.log(`\nDone! Updated ${updatedCount}/${htmlFiles.length} HTML files.`);
