/**
 * Generates dist/nitesh-resume.pdf as a snapshot of the built site.
 *
 * The website is the single source of truth: this script serves the freshly
 * built dist/ folder, renders it in headless Chromium with our print
 * stylesheet (print media), and bakes the result into a PDF. Run from
 * `npm run pdf` (invoked automatically by `predeploy`), after `vite build`.
 */
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { preview } from "vite";
import puppeteer from "puppeteer";

const PORT = 4173;
const OUTPUT = "dist/nitesh-resume.pdf";
const PAGE_HEIGHT = 1123; // A4 @ 96dpi

function detectPdfinfo() {
  const candidates = [
    "/opt/homebrew/bin/pdfinfo",
    "/usr/local/bin/pdfinfo",
    "/usr/bin/pdfinfo",
  ];
  return existsSync(candidates[0]) || existsSync(candidates[1] || "") || existsSync(candidates[2] || "")
    ? candidates.find((c) => existsSync(c))
    : null;
}

function countPages(pdfinfo, pdfPath) {
  try {
    const out = execFileSync(pdfinfo, [pdfPath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const match = out.match(/Pages:\s+(\d+)/);
    return match ? Number(match[1]) : 0;
  } catch {
    return 0;
  }
}

const server = await preview({
  preview: { port: PORT, strictPort: true, host: "127.0.0.1" },
});
const url = server.resolvedUrls.local[0];

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  // page.pdf() uses print media; emulate it during load so layout settles
  await page.emulateMediaType("print");
  await page.setViewport({ width: 794, height: PAGE_HEIGHT });
  await page.goto(url, { waitUntil: "networkidle0" });

  // Guarantee final state: reveal animations shown, clean PDF title metadata
  await page.evaluate(() => {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("reveal-shown"));
    document.title = "Nitesh Narang — Résumé";
  });
  await page.evaluateHandle("document.fonts.ready");

  const render = (scale) =>
    page.pdf({
      path: OUTPUT,
      format: "A4",
      scale,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

  const pdfinfo = detectPdfinfo();

  if (!pdfinfo) {
    // Fallback: estimate from measured content height (no poppler installed)
    const contentH = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    const scale = Math.max(
      0.7,
      Math.min(1, Number(((PAGE_HEIGHT - 12) / contentH).toFixed(3))),
    );
    await render(scale);
    console.log(`✓ ${OUTPUT} generated (pdfinfo missing; scale ${scale} estimated)`);
  } else {
    // Fit the document on one A4 page (like the source résumé) using the
    // LARGEST possible scale, so empty space at the bottom is minimal.
    // Chromium pagination doesn't track content height × scale, so probe
    // the real artifact: binary-search the largest single-page scale.
    await render(1);
    let scale = 1;
    if (countPages(pdfinfo, OUTPUT) > 1) {
      const fitsAt = async (s) => {
        await render(s);
        return countPages(pdfinfo, OUTPUT) === 1;
      };

      // Coarse step down to find any passing anchor
      let anchor = null;
      for (let s = 0.9; s >= 0.6 && anchor === null; s = Number((s - 0.05).toFixed(2))) {
        if (await fitsAt(s)) anchor = s;
      }

      if (anchor === null) {
        scale = 0.6; // unusually long content: accept a natural multi-page PDF
      } else {
        let lo = anchor;
        let hi = Math.min(1, Math.round((anchor + 0.05) * 1000) / 1000);
        for (let i = 0; i < 8; i++) {
          const mid = Math.round(((lo + hi) / 2) * 1000) / 1000;
          if (mid === scale || mid === lo) break;
          if (await fitsAt(mid)) lo = mid;
          else hi = mid;
        }
        scale = lo;
      }
      await render(scale);
    }
    console.log(`✓ ${OUTPUT} generated (single page chosen at scale ${scale})`);
  }
} finally {
  await browser.close();
  server.httpServer.close();
  process.exit(0);
}
