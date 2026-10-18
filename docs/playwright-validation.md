# Playwright/MCP validation

This file is the evidence record for the responsive checks performed with the
Playwright browser MCP. It should be updated after each validation run instead
of relying only on manually copied screenshots.

## What counts as evidence

Use both kinds of evidence:

1. **Execution record:** the browser actions, viewport, expected result, and
   actual result written in the table below.
2. **Visual evidence:** screenshots taken at the stated checkpoints and stored
   under `docs/evidence/` (or attached to the assignment/PR if binary files
   are not committed).

The MCP tool call itself normally lives in the chat/tool history, not in the
Git repository. This document is the repository-friendly record of what that
tool call tested.

## Start the application

From the repository root, run:

```bash
python3 -m http.server 8000
```

Keep that terminal running. Open these URLs in the Playwright browser:

- `http://127.0.0.1:8000/index.html`
- `http://127.0.0.1:8000/api.html`

Do not use `file://` URLs for the final evidence run. Serving the files over
HTTP makes the run reproducible and avoids browser restrictions around local
files and network requests.

## MCP/Playwright test checklist

| ID | Page | Viewport | Browser action | Expected result | Result |
| --- | --- | --- | --- | --- | --- |
| P1 | `index.html` | `1000x800` | Open the page and inspect `#grid` | Six product cards render; cards use the desktop multi-column layout | Pass |
| P2 | `index.html` | `375x800` | Inspect the page and scroll horizontally, if possible | Cards stack vertically and there is no horizontal overflow | Pass |
| P3 | `index.html` | `375x800` | Fill `#searchInput` with `Synthetic Oil` | Only `Synthetic Oil 15W-40` remains visible | Pass |
| P4 | `api.html` | `1000x800` | Open the page and wait for the API response | Character cards render and the pagination controls are visible | Pass |
| P5 | `api.html` | `375x800` | Inspect the page after the API response | Character cards stack vertically and there is no horizontal overflow | Pass |
| P6 | `api.html` | `375x800` | Fill `#searchInput` and wait at least 4 seconds | The status message appears while waiting, then filtered results load | Pass |
| P7 | `api.html` | `1000x800` | Click a character card, then click `Go Back` | The detail modal opens and closes successfully | Pass |

For every row, replace `Pending` with `Pass` or `Fail` and add a short note
below the table if the result differs from the expected result.

## Screenshot checkpoints

Capture at least these checkpoints with the Playwright screenshot tool:

```text
docs/evidence/index-desktop-1000x800.png
docs/evidence/index-mobile-375x800.png
docs/evidence/index-search-synthetic-oil.png
docs/evidence/api-desktop-1000x800.png
docs/evidence/api-mobile-375x800.png
docs/evidence/api-detail-modal.png
```

The screenshot filename should identify the page and viewport. Do not claim a
checkpoint passed if its screenshot or an execution note is missing.

## Run metadata

Record the details of the actual run here:

- Date: 2026-10-18
- Browser: Integrated Chromium browser
- Playwright/MCP tool: Playwright browser MCP
- Base URL: `http://127.0.0.1:8000`
- Result: `Pass`
- Notes: P1-P7 were executed during this validation session. The API checks
  depend on the live Rick & Morty API and should be repeated if that service is
  unavailable.

## Important limitation

This repository does not currently include a Playwright package or automated
test runner. The checks above are browser-MCP acceptance checks. If automated
regression tests are required later, add a Playwright test project and commit
the test files separately; screenshots from an interactive MCP session alone
are not equivalent to an automated test suite.
