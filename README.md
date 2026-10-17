# Computer Vision Laboratory Portfolio

A single compilation website for **CSST106 — Computer Vision**, connecting seven independently developed laboratory activities. This repository contains the **main portfolio only**, as requested. It does not contain or create the seven independent laboratory applications.

## Run locally

Use Node.js 24 LTS and npm:

```sh
npm ci
npm run dev
```

Open the printed local URL. To verify and preview the production build:

```sh
npm run build
npm run preview
```

`npm run check` runs the strict TypeScript check without a production bundle.

## What is included

- White-and-orange responsive home page with an original vector research illustration, portfolio statistics, seven activity cards, project introduction, documentation entry point, and footer.
- Searchable activity collection with topic filters and working grid/list controls.
- Seven central detail pages with overview, workspace, and resource tabs; previous/next navigation; expected inputs/outputs; and honest material statuses.
- Integrated workspace that can load a configured, embedding-compatible independent lab on demand, plus an external launch alternative.
- Separate live-application and source-code destinations for every activity.
- About page with editable student metadata and a documentation guide with expandable sections and an activity index.
- Sticky navigation, mobile menu, keyboard-accessible tabs, focus management, skip link, reduced-motion support, subtle hover/route/scroll animations, and static-host-compatible routing.
- GitHub Pages workflow with reproducible npm installs and typechecking.

## Edit identity and destinations

Edit `src/config/portfolio.ts` for the student name, section, instructor, and main repository URL. Empty personal fields show “Not yet provided.” No personal information is invented.

Edit `src/config/laboratories.ts` for all activity data. Each activity has:

| Field | Purpose |
| --- | --- |
| `liveUrl` | HTTPS URL of the deployed independent lab website |
| `sourceUrl` | HTTPS URL of that lab’s source repository |
| `embed` | `true` only after verifying that the independent app permits and supports iframe embedding |
| `reportUrl` | HTTPS document URL, or a relative `reports/filename.pdf` path for an existing file in `public/reports/` |
| `status` | `awaiting-materials`, `awaiting-instructions`, `in-progress`, or `available` |
| `objectives`, `input`, `output`, `note` | Activity content to reconcile with the original instructions |

For example, fill `liveUrl` with the lab’s real deployed website URL and `sourceUrl` with its real GitHub repository URL. Do not point both fields to the repository. URLs are intentionally blank until supplied; invalid or missing HTTPS destinations do not create clickable external links.

Set `available` only after verifying the real independent implementation. Link presence and iframe load events do not verify algorithm execution. The portfolio makes no algorithm completion claims.

For a local report, copy the actual supplied document to `public/reports/activity-01.pdf`, then set `reportUrl: 'reports/activity-01.pdf'`. Do not configure a file that does not exist. Adapt the resource labels if a linked document is specifically an instruction sheet or report.

## GitHub Pages deployment

1. Put this project in the **main compilation repository** and push to its `main` branch. If the default branch has another name, update `.github/workflows/deploy.yml`.
2. Open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. The included workflow runs `npm ci`, typechecks/builds, uploads `dist`, and deploys it. Follow the deployment URL returned in the Actions run.
4. Update the main repository URL in the portfolio configuration and push subsequent changes to update the site.

`vite.config.ts` uses `base: './'`, and navigation uses hash routes such as `#/lab/04`. Assets and refreshes therefore work under a repository subpath without server rewrite rules. Open the repository root with a trailing slash. For a custom domain, set up the domain in GitHub Pages and add the appropriate `public/CNAME` only when a real domain is provided.

The independent laboratories are deployed from their own repositories, managed separately. Paste their resulting live and source URLs into this portal. There is **one portfolio deployment workflow** here; no workflows or repositories for the independent laboratories are generated in this task.

References: [Vite deployment guidance](https://vite.dev/guide/static-deploy.html), [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite).

## Embedding behavior

An iframe is created only after a visitor explicitly clicks **Load Laboratory** and the activity has both a safe HTTPS `liveUrl` and `embed: true`. The frame allows scripts, same-origin behavior within the external app, forms, downloads, pointer lock, and fullscreen. Camera/microphone permissions are deliberately not delegated; camera-driven activities should use the external launch action unless that integration is reviewed and added explicitly.

Browser policies, an app’s `X-Frame-Options`/CSP, authentication, and runtime requirements can prevent embedding. Cross-origin frame errors cannot be reliably inspected by this portal. A visible note and **Open in New Tab** action remain available even after the frame loads. Start with `embed: false` and verify each application before enabling it. `onLoad` ends the frame’s loading hint; it does not mean that its algorithms are functional.

## Content and scope

Topics supplied in the master brief:

1. Images
2. Edge Detection
3. Histogram Analysis
4. SURF Feature Detection
5. PCA in Computer Vision
6. YOLOv8 Object Detection
7. Awaiting topic and instructions

Only broad, supplied topic descriptions are present. The following materials are still needed: original Word instructions, existing implementations, reports/supporting files, verified results/screenshots, real live and repository URLs, and student information. Laboratory 07 remains undefined. No fabricated results, uploaded image processing demonstrations, or simulated detections are included.

SURF runtime limitations and YOLOv8 real-inference requirements are documented in the relevant activity pages. The independent applications must explain any differences from their original Python implementations. GitHub Pages cannot run Python or Node.js backends.

## Project structure

```text
.github/workflows/deploy.yml   Main portfolio deployment
public/favicon.svg            Local vector favicon
src/config/portfolio.ts       Identity and main repository URL
src/config/laboratories.ts    Seven lab definitions and all external links
src/components/Artwork.tsx    Original decorative SVG illustrations
src/App.tsx                   Shared UI, routes, collection, pages, workspace
src/main.tsx                  React entry point
src/styles.css                Theme, layouts, motion, responsive behavior
vite.config.ts                React/Tailwind integration and relative assets
```

Typography uses Google Fonts with local sans-serif fallbacks. Original illustrations are bundled SVG components; no external image assets or inference models are required. All data is repository configuration: there is no account, backend, analytics, or persistent visitor data.

## Validation and remaining checks

See `VALIDATION.md` for the actual verification performed. External destinations, independent algorithm execution, embedding compatibility, and the hosted GitHub Actions deployment remain unverified until real destinations/materials are supplied and the workflow is run in GitHub.

No license is assigned. Add the appropriate license before distributing source if needed.
