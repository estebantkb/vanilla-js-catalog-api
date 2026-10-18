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

The UI was validated locally with a Playwright browser session at these viewport sizes:

- Desktop: `1000x800`
- Mobile: `375x800`

Validation procedure:

1. Open `index.html` and confirm that all six local product cards render.
2. Open `api.html` and confirm that the first page of characters renders.
3. Set the viewport to `1000x800` and verify that each card places the image beside its details.
4. Set the viewport to `375x800` and verify that each card stacks the image above its details without horizontal overflow.
5. Search for `Synthetic Oil` in the local catalog and confirm that the matching card is returned.
6. Confirm that the API page keeps the responsive layout while displaying character data.

Results:

- The six local product cards render correctly.
- The API page loads the character cards correctly.
- Product and character cards are horizontal on desktop.
- Product and character cards stack vertically on mobile.
- The local catalog search returns `Synthetic Oil 15W-40`.
- No horizontal overflow was observed at the mobile viewport.

