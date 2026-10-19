# Validation record

## Instructor and Word resources — 19 October 2026

- Instructor: Sir Jeremy Reyes.
- Matched original handouts 01–07 by filename and topic and copied them without changes into public/reports.
- All seven activities now link to their matching DOCX in Resources; objectives and procedures follow the supplied handouts.
- Labels distinguish available instructions from verified implementation completion.
- Lab 6 uses YOLOv11 as specified inside its handout; Lab 7 now has segmentation objectives and metadata.
- Implementation repository shortcuts and source-download controls remain removed.
- The original DOCX documents are preserved byte for byte; layout was not changed. A document render check was unavailable because the bundled environment has no LibreOffice renderer.

## Repository-link cleanup — 17 October 2026

- Removed the seven repository links and the repository column from the README.
- Removed unused repository destinations from activity and portfolio configuration.
- Removed repository URLs from this validation record and updated the setup instructions.
- Kept all seven published activity website destinations and the creator credit.
- The compilation has no tracked laboratory Python files or source archives, and its public asset directory contains only the favicon.
- Public repositories and previous commits remain accessible through GitHub. Removing project-authored links does not restrict GitHub's built-in source browsing or archive downloads.

## Publication and connection verification — 17 October 2026

- Website: https://v-exor.github.io/CSST106_Lab_Compilation/
- Production TypeScript check and build passed after configuring all seven live destinations.
- All seven independent live websites and their site-config.js files returned HTTP 200.
- Each published site-config.js contains the compilation URL as its default return destination. All seven corresponding deployments completed successfully.
- The initial publication rendered seven live launch links. Repository shortcuts from that initial version have since been removed.
- UI components, styles, laboratory algorithms, existing statuses, and embedding settings were preserved. The unrelated local Lab 4 playwright.config.js modification was not committed.
- This verifies publication and navigation configuration; it does not re-verify the independent algorithms or iframe compatibility.

The original pre-publication record below is historical; its statements about missing destinations and deployment are superseded by this section.

## Original local verification — 16 October 2026

Verified on 16 October 2026 using Node.js 24.16.0, Vite 7.3.7, and the Codex in-app browser.

## Passed

- Final `npm run build`: strict TypeScript checking and production bundling succeeded.
- Content smoke check: exactly seven unique activity IDs; all current lab destinations empty; no unverified activity marked available; Laboratory 07 awaits instructions.
- URL validation smoke check: JavaScript URLs and credential-bearing URLs rejected; a normal HTTPS destination accepted.
- Home → Laboratories navigation displays all seven cards.
- Machine learning filter returns two activities. Searching for YOLO within that filter returns one.
- A non-matching search displays the empty state. Reset filters restores all seven activities.
- Grid/list buttons update the selected layout.
- All seven laboratory detail destinations render their correct heading.
- Workspace displays the unconfigured state with a disabled live-link action.
- Arrow-key navigation from Workspace selects Resources and displays its panel.
- Next-laboratory navigation from Images opens Edge Detection. Reload preserves the detail page.
- Documentation loads; its source/link section expands.
- About loads and displays the unsupplied student-information placeholders.
- Mobile menu opens and closes after selecting a destination.
- Desktop layout renders three card columns; 768px tablet layout renders two.
- 390px mobile home, collection, detail, and workspace render successfully.
- At 320px, home, collection, list view, and **all seven detail pages** have no horizontal page overflow. An initial decorative-orbit/footer overflow was fixed and rechecked.
- Production build loaded under `/portfolio/`, including its styles and assets. A refresh at `/portfolio/#/lab/06` retained the YOLOv8 detail page.
- Unknown route displays a recovery page. Explore Laboratories recovers to all seven activities.
- Browser console inspection returned no warnings or errors during the checked development and production sessions.

Final build output: approximately **273.81 kB JavaScript / 84.57 kB gzip** and **45.95 kB CSS / 11.06 kB gzip**. Google Fonts are separate external stylesheet/font requests and have system-font fallbacks.

Local screenshots are saved in the ignored `artifacts/` folder: `portfolio-preview.jpg`, `portfolio-desktop.jpg`, and `portfolio-mobile.jpg`.

## Pending external verification

- Real deployed lab and repository URLs: none provided.
- Any independent laboratory’s algorithm execution, iframe compatibility, inference outputs, or download behavior: outside this compilation website’s scope and not verified.
- Laboratory-specific procedures, results, reports, and screenshots: original instructions and implementations have not been supplied.
- Actual GitHub Actions deployment: workflow prepared, but this workspace has no Git remote and no deployment was performed.
- Reduced-motion styles, focus indicators, semantics, and tab behavior are implemented; no comprehensive accessibility audit or screen-reader certification was performed.

The local preview initially could not be reached because of sandbox socket restrictions. Running the preview outside those restrictions on a fresh port resolved this, allowing the browser checks above. The skill’s dependency helper also failed to locate npm on Windows; running `npm.cmd install` directly succeeded. `package-lock.json` records the installed dependencies.
