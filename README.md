# Vanilla JS Product Catalog & REST API Consumer

Web application with two pages:

- A local product catalog built with Vanilla JavaScript and Tailwind CSS.
- A Rick and Morty character explorer that consumes an external REST API.

The local catalog stores its products in PostgreSQL and loads them through the
Spring Boot backend.

## Features

### Local product catalog

- Responsive product grid.
- Product search by name or description.
- Product data loaded from the local backend.
- PostgreSQL persistence through Spring Data JPA.

### Rick and Morty API explorer

- Paginated character list.
- Search with a four-second delay.
- Character and location details in a modal.

## Project structure

```text
.
├── backend/catalog-backend/
│   └── src/main/
│       ├── java/com/example/catalog_backend/
│       │   ├── controller/
│       │   ├── model/
│       │   ├── repository/
│       │   └── service/
│       └── resources/
├── css/
├── img/
├── js/
├── tests/
├── api.html
└── index.html
```

## Local catalog flow

```text
index.html
→ js/catalog.js
→ ProductController
→ ProductService
→ ProductRepository
→ PostgreSQL
```

The frontend requests the products from Spring Boot. The backend handles the
search and reads the data from the `product` table.

## Catalog endpoints

```text
GET http://localhost:8080/api/products
GET http://localhost:8080/api/products?search=oil
```

The first endpoint returns all products. The second searches by product name
or description.

## Rick and Morty endpoints

The second page consumes these external endpoints:

```text
GET https://rickandmortyapi.com/api/character?page={n}
GET https://rickandmortyapi.com/api/character/?name={query}
GET https://rickandmortyapi.com/api/character/{id}
```

The location details are requested from the location URL returned by the
character endpoint.

## Local setup

PostgreSQL runs in the `catalog-postgres` Podman container. Spring Boot uses
the `catalog` database on port `5432` and runs on port `8080`.

The frontend is served locally on port `8000`:

```text
http://localhost:8000/index.html
http://localhost:8000/api.html
```

## Playwright validation

The catalog was checked in the browser with two small tests:

- Six product cards are displayed.
- Searching for `Synthetic Oil` leaves `Synthetic Oil 15W-40`.

The validation notes are in
[`docs/playwright-validation.md`](docs/playwright-validation.md).
