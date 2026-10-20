# Node.js + Express Users API

A simple REST API built with Express 5 that manages an in-memory list of users. It supports listing, searching, fetching, creating, replacing, updating, and deleting users.

## Tech Stack

- **Node.js** (ES Modules, `"type": "module"`)
- **Express 5.x** for routing and middleware
- **Nodemon** (dev dependency) for auto-restarting the server during development

## Project Structure

```
nodeandexpress/
├── src/
│   └── index.mjs      # Express server and route handlers
├── package.json       # Project metadata, scripts, and dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Running the Server

Production mode:

```bash
npm start
```

Development mode (restarts automatically on file changes):

```bash
npm run start-dev
```

Once running, the server listens on **http://localhost:3000**.

## API Endpoints

| Method   | Endpoint            | Description                                   | Success Status |
|----------|---------------------|-----------------------------------------------|----------------|
| `GET`    | `/`                 | Returns the home page message                 | 200            |
| `GET`    | `/api/users`        | Returns all users (optional filtering)        | 200            |
| `GET`    | `/api/users/:id`    | Returns a single user by ID                   | 200            |
| `POST`   | `/api/users`        | Creates a new user from the JSON body         | 201            |
| `PUT`    | `/api/users/:id`    | Replaces an existing user with the JSON body  | 201            |
| `PATCH`  | `/api/users/:id`    | Partially updates an existing user            | 200            |
| `DELETE` | `/api/users/:id`    | Deletes a user by ID                          | 200            |

### Data Model

Each user is an object with an `id` and a `name`:

```json
{
  "id": 1,
  "name": "PALVANNAN"
}
```

Seed data is defined in `src/index.mjs`:

| id | name      |
|----|-----------|
| 1  | PALVANNAN |
| 2  | Arun      |
| 3  | Arjun     |
| 4  | Preeti    |
| 5  | Priya     |

## Example Requests

### Get all users

```bash
curl http://localhost:3000/api/users
```

### Filter users

Filter by a property with a `filter` and `value` query parameter. The match is a case-insensitive "contains" check on the property value.

```bash
curl "http://localhost:3000/api/users?filter=name&value=ar"
```

### Get a user by ID

```bash
curl http://localhost:3000/api/users/2
```

### Create a user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Kumar"}'
```

### Replace a user

```bash
curl -X PUT http://localhost:3000/api/users/2 \
  -H "Content-Type: application/json" \
  -d '{"name": "Arun Kumar"}'
```

### Partially update a user

```bash
curl -X PATCH http://localhost:3000/api/users/2 \
  -H "Content-Type: application/json" \
  -d '{"name": "Arun R"}'
```

### Delete a user

```bash
curl -X DELETE http://localhost:3000/api/users/2
```

## Error Responses

| Situation                      | Status | Response Body          |
|--------------------------------|--------|------------------------|
| ID is not a number             | 400    | `Invlid ID format`     |
| No user exists with given ID   | 400    | `User Not Found`       |

## Notes and Limitations

- **In-memory storage:** Data is kept in an array and resets every time the server restarts. There is no database.
- **Filtering:** The `filter` value must be a string property (such as `name`). Filtering on a numeric property like `id` will fail because `toLowerCase()` is only valid on strings.
- **Creating users:** `POST` assigns the new ID as the last user's ID plus one. If all users are deleted, this will throw an error because there is no last user to read from.
- **Status codes:** Missing users return `400` instead of the more typical `404 Not Found`.
- **Typo in messages:** The invalid-ID message reads `Invlid ID format`. It is kept as written in the source.

## Learning Goals

This project was built as an exercise to practice:

- Setting up an Express server with ES Modules
- Route parameters (`req.params`) and query strings (`req.query`)
- Parsing JSON request bodies with `express.json()`
- Implementing full CRUD operations (POST, GET, PUT, PATCH, DELETE)
- Validating input and returning appropriate HTTP status codes
- Using Nodemon for a faster development workflow

## Author

**Palvannan A**