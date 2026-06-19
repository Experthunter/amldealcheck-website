# AML Dealcheck — website

A static marketing site for **AML Dealcheck**, a product of Compliance On Demand.
Plain HTML / CSS / JS — no build step, no framework, no server. Drop it on any
static host (GitHub Pages, Cloudflare Pages, Netlify, S3…).

## Structure

```
site/
├── index.html            Home
├── aml-dealcheck.html    The product / system
├── contact.html          Request a demo
├── robots.txt            Crawl rules (AI crawlers welcomed)
├── sitemap.xml           Sitemap (update domain before launch)
├── css/styles.css        All styles
├── js/
│   ├── components.js     Shared header + footer (defined once, injected per page)
│   ├── consent.js        Cookie-consent banner + gated analytics loader
│   └── app.js            Stepper, accordion, form, mobile nav
├── fonts/                Self-hosted Red Hat Display + Red Hat Text (woff2)
└── assets/               Logo + favicon
```

## Shared header / footer (no duplication)

The nav and footer live in **`js/components.js`** only. Each page contains
`<div id="site-header"></div>` and `<div id="site-footer"></div>`, declares the
active nav item via `<body data-page="home|product|contact">`, and `components.js`
injects the chrome on load. Edit the header/footer in one place.

> Trade-off: this is a build-free include done in the browser, so the nav is
> injected by JS. Page **content** is plain HTML (fully crawlable); only the nav/
> footer require JS. If you prefer the chrome pre-rendered into each HTML file,
> add a tiny static-site generator (e.g. Eleventy) — the markup is ready to port.

## Deploy to Cloudflare Pages

1. Commit the contents of `site/` to a GitHub repo (HTML files at the repo root,
   or set the output directory to `site`).
2. In Cloudflare Pages, create a project from the repo.
3. **Framework preset:** *None*. **Build command:** *(leave empty)*.
   **Build output directory:** `/` (or `site`).
4. Deploy — there is nothing to compile.

## Analytics & cookie consent

Analytics are **off until the visitor opts in**. To turn them on:

1. Open `js/consent.js` and set `CONFIG.measurementId` (e.g. a GA4 ID
   `G-XXXXXXXXXX`). For Plausible/Fathom/Matomo, swap the loader in `loadAnalytics()`.
2. Done. The analytics script is injected **only** after the visitor clicks
   "Accept analytics". Declining (or ignoring) the banner loads nothing.

- The banner records the choice in `localStorage` (`amlc-consent`) — that is a
  strictly-necessary consent record and does not itself require consent.
- A **"Cookie settings"** link in the footer reopens the banner so visitors can
  change their mind.
- Until a measurement ID is set, the site still makes **zero third-party requests**.

## SEO / AI crawlers

- `robots.txt` allows all crawlers and **explicitly welcomes** the major AI/LLM
  crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot, etc.).
- `sitemap.xml` lists all pages.
- **Before launch:** replace the placeholder domain `https://www.amldealcheck.co.uk/`
  in both `robots.txt` and `sitemap.xml` with the real production domain.

## Privacy notes

- Fonts are self-hosted — no Google Fonts CDN (which would transmit visitor IPs to
  Google, a known UK/EU GDPR issue). No framework CDN.
- No cookies/tracking run before consent; the only pre-consent storage is the
  consent record itself.
- If you later embed the homepage video from a third party (e.g. YouTube), gate it
  behind consent too (or use a privacy-friendly/`youtube-nocookie` embed).

## Placeholders to replace

- Homepage video embed.
- CRM home-page screenshot (product page).
- Dashboard step screenshots and the Adverse Media report screenshot.
- Contact details (currently Compliance On Demand's published numbers/email).
- Wire the contact form to a real endpoint (Cloudflare Pages Function / Worker,
  Formspree, or your CRM) — it currently only shows a success state.
- Production domain in `robots.txt` and `sitemap.xml`.
