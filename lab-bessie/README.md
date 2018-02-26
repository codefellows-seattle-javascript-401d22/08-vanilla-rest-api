# Lab 08: Vanilla REST API

## Installation

1. Clone and download the files in this repository.
2. In your terminal run ``npm i`` to install the app's dependancies.
3. To start your connection run ``npm run start`` in your terminal.

## Server Endpoints
```sh
localhost:3000/api/strains
```

* **POST:**  should pass data as stringifed JSON in the body of a **POST** request to create a new strain

* **GET:**  should pass `?id=<uuid>` as a querystring parameter to retrieve a specific strain (as JSON)

* **DELETE:**  should pass `?id=<uuid>` in the querystring to **DELETE** a specific strain - this should also return a **204** status code with no content in the body

## Testing

* To run tests, in your terminal run ``npm run test``.