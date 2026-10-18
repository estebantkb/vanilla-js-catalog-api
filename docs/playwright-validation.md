# Playwright validation

Playwright opens the application in a real browser and checks the result of
the JavaScript code. The tests do not only read the original HTML: they wait
for the page to load, interact with the search field, and inspect the updated
page.

The catalog has two small automated checks:

- The six product cards appear on `index.html`.
- Searching for `Synthetic Oil` leaves one matching product.

## Project files

- `playwright.config.js` contains the test settings.
- `tests/catalog.spec.js` contains the browser tests.
- `package.json` defines the `npm run test:e2e` command.

## How the configuration works

The configuration uses `tests` as the test folder and sets
`http://127.0.0.1:8000` as the base URL. Before the tests run, Playwright
starts the local server with:

```bash
python3 -m http.server 8000
```

This lets the tests open `/index.html` as a web page instead of opening the
file directly from the computer.

## How the tests work

The first test opens the catalog:

```js
await page.goto("/index.html");
```

Then it finds the product cards inside `#grid` and checks that there are six:

```js
await expect(page.locator("#grid > div")).toHaveCount(6);
```

The cards are created by `js/catalog.js`, so this check confirms that the
page loaded and the JavaScript rendered the products.

The second test fills the search field:

```js
await page.locator("#searchInput").fill("Synthetic Oil");
```

The catalog code filters the products when the field changes. The test then
checks that one card remains and that it contains the expected product name:

```js
await expect(page.locator("#grid > div")).toHaveCount(1);
await expect(page.locator("#grid")).toContainText("Synthetic Oil 15W-40");
```

`page` represents the browser page, `locator` finds an element, and `expect`
checks a result. The `await` statements make Playwright wait for each browser
operation or assertion to finish.

## Run the tests

Install the dependencies:

```bash
npm install
```

Run the tests:

```bash
npm run test:e2e
```

The tests start a local server on port `8000` automatically.
