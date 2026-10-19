# Playwright validation

I used Playwright to check the local product catalog in a browser. This was
different from checking only the HTML file because the products are no longer
stored in the frontend. The page requests them from Spring Boot, and Spring
Boot reads them from PostgreSQL.

## What I tested

The first test opened `index.html` and checked the product cards after the
page finished loading. Six cards appeared, which confirmed that the request
from the frontend to the backend returned the catalog data.

The second test entered `Synthetic Oil` in the search field. The frontend sent
the search value to the backend, which returned the matching product. The
page then showed one card with the name `Synthetic Oil 15W-40`.

In the test code, `page` represents the browser page. `locator` finds elements
such as `#grid` and `#searchInput`, while `expect` checks what is displayed
after the browser interaction.

## How I ran the checks

I started the PostgreSQL container first:

```bash
podman start catalog-postgres
```

Then I started `CatalogBackendApplication` from IntelliJ. The backend was
available at:

```text
http://localhost:8080
```

I checked the products directly through the API:

```text
http://localhost:8080/api/products
http://localhost:8080/api/products?search=oil
```

The first URL returned the six products. The second returned
`Synthetic Oil 15W-40`.

The frontend was served locally at:

```text
http://localhost:8000/index.html
```

Finally, from the project folder, I ran:

```bash
npm run test:e2e
```

The Playwright configuration started the frontend server on port `8000`. The
Spring Boot application had to be running separately on port `8080`.

## Result

The two tests passed:

```text
2 passed
```
