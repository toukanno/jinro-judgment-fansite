/**
 * Generate PNG icons from SVG for iOS/PWA support.
 * Run: node scripts/generate-icons.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const iconsDir = join(root, 'icons');

// Wolf icon SVG with dark background - matches the existing favicon/icon style
function createSvg(size) {
  const fontSize = Math.round(size * 0.52);
  const textY = Math.round(size * 0.62);
  const rx = Math.round(size * 0.167);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="#0a0e17"/>
  <text x="${size / 2}" y="${textY}" font-size="${fontSize}" text-anchor="middle" font-family="Arial">&#x1F43A;</text>
</svg>`;
}

const sizes = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'apple-touch-icon-120x120.png', size: 120 },
  { name: 'apple-touch-icon-152x152.png', size: 152 },
  { name: 'apple-touch-icon-180x180.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

mkdirSync(iconsDir, { recursive: true });

for (const { name, size } of sizes) {
  const svgBuffer = Buffer.from(createSvg(size));
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(iconsDir, name));
  console.log(`Generated: icons/${name} (${size}x${size})`);
}

// Also generate splash screens for common iOS devices
const splashScreens = [
  // iPhone SE, iPod touch
  { name: 'apple-splash-640x1136.png', w: 640, h: 1136 },
  // iPhone 8, 7, 6s
  { name: 'apple-splash-750x1334.png', w: 750, h: 1334 },
  // iPhone 8 Plus, 7 Plus, 6s Plus
  { name: 'apple-splash-1242x2208.png', w: 1242, h: 2208 },
  // iPhone X, XS, 11 Pro, 12 mini, 13 mini
  { name: 'apple-splash-1125x2436.png', w: 1125, h: 2436 },
  // iPhone XR, 11, 12, 12 Pro, 13, 13 Pro, 14
  { name: 'apple-splash-828x1792.png', w: 828, h: 1792 },
  // iPhone XS Max, 11 Pro Max
  { name: 'apple-splash-1242x2688.png', w: 1242, h: 2688 },
  // iPhone 14 Pro
  { name: 'apple-splash-1179x2556.png', w: 1179, h: 2556 },
  // iPhone 14 Pro Max, 15 Plus, 15 Pro Max, 16 Plus, 16 Pro Max
  { name: 'apple-splash-1290x2796.png', w: 1290, h: 2796 },
  // iPad Mini, iPad Air
  { name: 'apple-splash-1536x2048.png', w: 1536, h: 2048 },
  // iPad Pro 11"
  { name: 'apple-splash-1668x2388.png', w: 1668, h: 2388 },
  // iPad Pro 12.9"
  { name: 'apple-splash-2048x2732.png', w: 2048, h: 2732 },
];

const splashDir = join(iconsDir, 'splash');
mkdirSync(splashDir, { recursive: true });

for (const { name, w, h } of splashScreens) {
  const iconSize = Math.round(Math.min(w, h) * 0.25);
  const fontSize = Math.round(iconSize * 0.52);
  const titleFontSize = Math.round(Math.min(w, h) * 0.045);

  const splashSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="#0a0e17"/>
  <text x="${w / 2}" y="${h / 2 - titleFontSize}" font-size="${fontSize}" text-anchor="middle" font-family="Arial">&#x1F43A;</text>
  <text x="${w / 2}" y="${h / 2 + titleFontSize * 1.5}" font-size="${titleFontSize}" text-anchor="middle" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" fill="#e6edf3" font-weight="700">人狼JGDB</text>
</svg>`;

  await sharp(Buffer.from(splashSvg))
    .resize(w, h)
    .png()
    .toFile(join(splashDir, name));
  console.log(`Generated: icons/splash/${name} (${w}x${h})`);
}

console.log('\nDone! All icons and splash screens generated.');
