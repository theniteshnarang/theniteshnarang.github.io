/**
 * Generates dist/nitesh-resume.pdf as a snapshot of the built site.
 *
 * The website is the single source of truth: this script serves the freshly
 * built dist/ folder, renders it in headless Chromium with our print
 * stylesheet (print media), and bakes the result into a PDF. Run from
 * `npm run pdf` (invoked automatically by `predeploy`), after `vite build`.
 */
import { preview } from "vite";
import puppeteer from "puppeteer";

const PORT = 4173;

const server = await preview({
  preview: { port: PORT, strictPort: true, host: "127.0.0.1" },
});
const url = server.resolvedUrls.local[0];

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  // page.pdf() uses print media; emulate it during load so layout settles
  await page.emulateMediaType("print");
  await page.setViewport({ width: 794, height: 1123 }); // A4 @ 96dpi
  await page.goto(url, { waitUntil: "networkidle0" });

  // Guarantee final state: reveal animations shown, clean PDF title metadata
  await page.evaluate(() => {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("reveal-shown"));
    document.title = "Nitesh Narang — Résumé";
  });
  await page.evaluateHandle("document.fonts.ready");

  // Fit the whole document on a single A4 page (like the source résumé).
  // The scale shrinks uniformly; anything at or below one page stays at 1.
  const PAGE_HEIGHT = 1123;
  const contentHeight = await page.evaluate(
    () => document.body.scrollHeight,
  );
  const scale = Math.max(
    0.7,
    Math.min(1, Number(((PAGE_HEIGHT - 12) / contentHeight).toFixed(3))),
  );

  await page.pdf({
    path: "dist/nitesh-resume.pdf",
    format: "A4",
    scale,
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  console.log(
    scale < 1
      ? `✓ dist/nitesh-resume.pdf generated (single page, scale ${scale})`
      : "✓ dist/nitesh-resume.pdf generated (single page at 100%)",
  );
} finally {
  await browser.close();
  server.httpServer.close();
  process.exit(0);
}
