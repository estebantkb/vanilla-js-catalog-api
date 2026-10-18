# Vanilla JS Product Catalog & REST API Consumer

## Overview
Web application built with **Vanilla JavaScript (ECMAScript 6+)**, **HTML5**, and **Tailwind CSS** implementing DOM manipulation, array methods, asynchronous API consumption, and responsive 3-column card layouts.

## Features
### Page 1: Local Product Catalog (`index.html`)
- **Responsive Grid:** 3-column layout on desktop, 2 on tablet, 1 on mobile.
- **Product Cards:** Detailed descriptions and category/status labels.
- **Instant Search:** Real-time filtering using ES6 `.filter()`, `.map()`, and object destructuring.

### Page 2: Rick & Morty API Explorer (`api.html`)
- **3 REST Endpoints Consumed:**
  1. Paginated character directory (`/api/character?page={n}`)
  2. Server-side filtered search (`/api/character/?name={query}`)
  3. Single character & origin/location detail (`/api/character/{id}` & location endpoint)
- **4-Second Debounced Search:** Delays API requests by 4000ms after the user stops typing.
- **Interactive Detail Modal (Pop-up):** Displays extended information with a "Go Back" navigation action.

## Responsive validation

The detailed Playwright/MCP test procedure and evidence checklist are in
[`docs/playwright-validation.md`](docs/playwright-validation.md). That document
records the browser tool, URLs, viewport sizes, actions, expected results, and
the location where screenshots should be saved. A screenshot by itself shows
the visual result; the checklist and the recorded test result show what was
actually verified.

The validation covers:

- Desktop (`1000x800`) and mobile (`375x800`) viewports.
- Rendering of the six local product cards.
- Rendering and navigation of the Rick & Morty API cards.
- Local catalog search for `Synthetic Oil`.
- The API search debounce and detail modal.
- Absence of horizontal overflow on mobile.
