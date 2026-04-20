# expense-api

REST API for expense management built with Fastify, Prisma and PostgreSQL.

## Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Fastify 5
- **ORM:** Prisma 7 (with `@prisma/adapter-pg`)
- **Validation:** Zod 4
- **Database:** PostgreSQL
- **Package manager:** pnpm

## Requirements

- Node.js 18+
- pnpm
- Docker (for the database)

## Getting started

**1. Clone the repository and install dependencies**

```bash
git clone https://github.com/your-username/expense-api.git
cd expense-api
pnpm install
```

**2. Set up environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/expense-db"
DB_USER=your_user
DB_PASSWORD=your_password
```

**3. Start the database**

```bash
docker compose up -d
```

**4. Run migrations**

```bash
pnpm prisma migrate deploy
```

**5. Generate Prisma client**

```bash
pnpm prisma generate
```

**6. Start the server**

```bash
# Development (with watch mode)
pnpm dev

# Production
pnpm start
```

The server will be running at `http://localhost:3000`.

## Endpoints

### Health check

```
GET /health
```

```json
{ "status": "ok", "live": true }
```

---

### Expenses

| Method   | Path            | Description          |
| -------- | --------------- | -------------------- |
| `GET`    | `/expenses`     | List all expenses    |
| `GET`    | `/expenses/:id` | Get a single expense |
| `POST`   | `/expenses`     | Create an expense    |
| `PUT`    | `/expenses/:id` | Update an expense    |
| `DELETE` | `/expenses/:id` | Delete an expense    |

---

#### `GET /expenses`

Returns all expenses.

**Response `200`**

```json
{
  "expenses": [
    {
      "id": 1,
      "title": "Groceries",
      "amount": 89.9,
      "category": "food",
      "date": "2026-04-17T00:00:00.000Z",
      "createdAt": "2026-04-17T20:08:27.000Z"
    }
  ]
}
```

---

#### `GET /expenses/:id`

**Response `200`**

```json
{
  "expense": {
    "id": 1,
    "title": "Groceries",
    "amount": 89.9,
    "category": "food",
    "date": "2026-04-17T00:00:00.000Z",
    "createdAt": "2026-04-17T20:08:27.000Z"
  }
}
```

**Response `404`**

```json
{ "error": "ID not found", "status": "Error Occurred" }
```

---

#### `POST /expenses`

**Request body**

```json
{
  "title": "Groceries",
  "amount": 89.9,
  "category": "food",
  "date": "2026-04-17"
}
```

| Field      | Type              | Required |
| ---------- | ----------------- | -------- |
| `title`    | string            | ✅       |
| `amount`   | number            | ✅       |
| `category` | string            | ✅       |
| `date`     | string (ISO 8601) | ✅       |

**Response `201`**

```json
{ "status": "Successfully Created" }
```

**Response `400`**

```json
{ "error": "...", "status": "Error Occurred" }
```

---

#### `PUT /expenses/:id`

All fields are optional — only the fields sent will be updated.

**Request body**

```json
{
  "amount": 95.0
}
```

**Response `200`**

```json
{ "status": "Successfully Updated" }
```

---

#### `DELETE /expenses/:id`

**Response `200`**

```json
{ "status": "Successfully Deleted" }
```

## Project structure

```
expense-api/
├── prisma/
│   ├── migrations/       # Database migrations
│   └── schema.prisma     # Data model
├── src/
│   ├── generated/        # Prisma client (auto-generated)
│   ├── lib/
│   │   └── prisma.ts     # Prisma client instance
│   ├── routes/
│   │   └── expense.ts    # Route handlers
│   ├── schemas/
│   │   └── expense.ts    # Zod validation schemas
│   ├── services/
│   │   └── expense.ts    # Business logic
│   ├── utils/
│   │   └── errorHandler.ts
│   └── server.ts         # Entry point
├── docker-compose.yml
├── prisma.config.ts
├── tsconfig.json
├── eslint.config.mts
└── .prettierrc
```

## Scripts

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start in development mode with watch |
| `pnpm start`  | Start from compiled output           |
| `pnpm lint`   | Run ESLint                           |
| `pnpm format` | Format with Prettier                 |
| `pnpm check`  | Check formatting                     |
