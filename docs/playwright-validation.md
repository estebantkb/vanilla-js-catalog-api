# Playwright validation

I checked both pages in the browser on desktop and mobile sizes.

## Start the pages

From the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/index.html
http://127.0.0.1:8000/api.html
```

## Checks

I tested the pages at `1000x800` and `375x800`.

### Catalog

- Confirmed that the six product cards appear.
- Searched for `Synthetic Oil`.
- Confirmed that the result is `Synthetic Oil 15W-40`.
- Confirmed that the mobile view has no horizontal scrolling.

### API page

- Confirmed that the character cards load.
- Searched for a character and waited for the four-second delay.
- Opened a character to check the detail window.
- Closed the detail window with `Go Back`.
- Confirmed that the mobile view has no horizontal scrolling.
