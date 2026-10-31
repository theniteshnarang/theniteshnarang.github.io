# theniteshnarang.github.io

Personal site of Nitesh Narang: a resume-style, single-page portfolio that renders in the browser and doubles as the source of truth for the downloadable résumé PDF.

**Live:** https://theniteshnarang.github.io

## Stack

- [React 19](https://react.dev) + TypeScript
- [Vite 7](https://vite.dev) (SWC plugin)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) icons
- [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans) webfont

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Type-check and build into `dist/` |
| `npm run lint` | ESLint |
| `npm run pdf` | Regenerate `dist/nitesh-resume.pdf` from the built site |
| `npm run deploy` | Build + generate PDF + publish `dist/` to the `gh-pages` branch |

## How the PDF works

The website is the single source of truth for the résumé. At deploy time,
`scripts/generate-pdf.mjs`:

1. Serves the freshly built `dist/` folder via Vite preview.
2. Renders it in headless Chromium (Puppeteer) with the print stylesheet
   (`@media print` rules in `src/index.css` emulate the résumé's geometry).
3. Binary-searches the largest page scale that still fits a single A4 page
   (verified against the real artifact with `pdfinfo`), so content fills the
   page with minimal bottom whitespace.
4. Writes `dist/nitesh-resume.pdf`, which the site's "Download PDF" link serves.

So résumé edits happen in `src/App.tsx` (experience, skills, education data),
and both the site and the PDF update together on the next deploy.
