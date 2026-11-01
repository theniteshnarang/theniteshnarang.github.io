/**
 * Generates public/apple-touch-icon.png (180×180) from the same tile as
 * public/n-logo.svg (teal background, band-colored N monogram), baked with
 * Puppeteer for pixel-perfect rasterizing. Run via `npm run favicon`.
 */
import puppeteer from "puppeteer";

const SIZE = 180;
const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; }
  html, body { width: ${SIZE}px; height: ${SIZE}px; }
  body { background: #17535b; }
  svg { display: block; width: ${SIZE}px; height: ${SIZE}px; }
</style>
</head>
<body>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="18" fill="#17535b" />
    <path
      transform="translate(-12.7 -12.7) scale(1.4)"
      d="M18 46V18h4.8l18.4 21.6V18H46v28h-4.8L22.8 24.4V46H18Z"
      fill="#f3f2ef"
      stroke="#f3f2ef"
      stroke-width="2.6"
      stroke-linejoin="round"
    />
  </svg>
</body>
</html>
`;

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.setViewport({
    width: SIZE,
    height: SIZE,
    deviceScaleFactor: 1,
  });
  await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  await page.screenshot({ path: "public/apple-touch-icon.png" });
  console.log(`✓ public/apple-touch-icon.png generated (${SIZE}×${SIZE})`);
} finally {
  await browser.close();
  process.exit(0);
}
