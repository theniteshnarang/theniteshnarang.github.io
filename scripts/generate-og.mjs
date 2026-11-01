/**
 * Generates public/og-image.png (1200×630) for link previews (Open Graph /
 * Twitter cards). The card is a standalone HTML template in the site's brand
 * style (Noto Sans, teal/band palette) baked with Puppeteer, so the
 * typography is pixel-perfect and reproducible. Run via `npm run og`.
 */
import puppeteer from "puppeteer";

const WIDTH = 1200;
const HEIGHT = 630;

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    font-family: "Noto Sans", sans-serif;
    background: #ffffff;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  .band {
    height: 18px;
    background: #f3f2ef;
    border-bottom: 3px solid #17535b;
  }
  .header {
    background: #f3f2ef;
    padding: 58px 84px 46px;
  }
  .name {
    display: flex;
    align-items: baseline;
    gap: 30px;
    flex-wrap: wrap;
  }
  .name h1 {
    font-size: 88px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.015em;
    color: #17535b;
  }
  .name span {
    font-size: 44px;
    font-weight: 500;
    line-height: 1;
    color: #17535b;
  }
  .contact {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    font-size: 27px;
    font-weight: 400;
    color: #222222;
  }
  .main {
    height: 285px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 84px;
  }
  .identity {
    font-size: 46px;
    font-weight: 600;
    line-height: 1.2;
    color: #222222;
  }
  .identity b { color: #17535b; font-weight: 600; }
  .stats {
    margin-top: 22px;
    font-size: 28px;
    color: #767676;
  }
  .footer {
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 84px;
    border-top: 1px solid #e4e2de;
    font-size: 26px;
  }
  .footer .left { color: #767676; }
  .footer .right { color: #17535b; font-weight: 600; }
</style>
</head>
<body>
  <div class="band"></div>
  <div class="header">
    <div class="name">
      <h1>Nitesh Narang</h1>
      <span>Product Engineer</span>
    </div>
    <div class="contact">
      <span>nitesh@nivyaan.com</span>
      <span>+91 91068 57146</span>
      <span>Ahmedabad, India</span>
    </div>
  </div>
  <div class="main">
    <div class="identity">
      Researcher · Learner · <b>Builder</b>
    </div>
    <div class="stats">
      10k+ users · 2,500+ patients · 100+ enterprise clients
    </div>
  </div>
  <div class="footer">
    <span class="left">Résumé &amp; portfolio</span>
    <span class="right">theniteshnarang.github.io</span>
  </div>
</body>
</html>
`;

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
  });
  await page.goto(
    `data:text/html;charset=utf-8,${encodeURIComponent(html)}`,
    { waitUntil: "networkidle0" },
  );
  await page.evaluateHandle("document.fonts.ready");
  await page.screenshot({ path: "public/og-image.png" });
  console.log(`✓ public/og-image.png generated (${WIDTH}×${HEIGHT})`);
} finally {
  await browser.close();
  process.exit(0);
}
