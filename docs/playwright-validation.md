# Playwright validation

The catalog has two small automated checks:

- The six product cards appear on `index.html`.
- Searching for `Synthetic Oil` leaves one matching product.

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
