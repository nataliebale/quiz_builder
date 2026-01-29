# Quiz Builder API (Backend)

Backend service for the Quiz Builder application.  
Provides REST APIs to create, edit, publish, and fetch quizzes.

---

## Tech Stack & Reasoning

- **NestJS**: structured and scalable Node.js framework with dependency injection.
- **TypeScript**: improves maintainability and developer experience.
- **Prisma ORM**: type-safe database access and migrations.
- **PostgreSQL**: reliable relational database with JSON support.
- **class-validator / class-transformer**: request validation at the DTO layer.

**Quiz content storage**  
Quiz blocks are stored as JSON to allow flexible, block-based quiz structures without frequent schema changes.

---

## How to Run Locally

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL (local or Docker)

---

### Environment Variables

Create a `.env` file in the backend root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/quiz_builder?schema=public"
PORT=4000
```


---

### Install Dependencies

```env
pnpm install
```

---

### Database Setup

Generate Prisma client and run migrations:

```env
pnpm prisma generate
pnpm prisma migrate dev
```

Seed demo data:

```env
pnpm prisma db seed
```

---

### Start the Server

```env
# development
pnpm start:dev

# production
pnpm build
pnpm start
```

API will be available at:

```env
http://localhost:4000
```

# API Endpoints
## List quizzes

```env
# http
GET /quizzes
```

Response:

```json
[
  {
    "id": "abc123",
    "title": "Sample Quiz",
    "isPublished": true,
    "updatedAt": "2026-01-01T12:00:00Z"
  }
]
```

## Get quiz by ID

```env
GET /quizzes/:id
```

## Create quiz

```env
POST /quizzes
```

Payload:

```json
{
  "title": "My Quiz",
  "blocks": {
    "blocks": []
  }
}
```

## Update quiz

```env
PUT /quizzes/:id
```

Payload:

```json
{
  "title": "Updated title",
  "blocks": {
    "blocks": []
  }
}
```

## Publish quiz

```env
POST /quizzes/:id/publish
```

## Data Model (Simplified)

```env
Quiz {
  id: string
  title: string
  published: boolean
  blocks: JSON
  createdAt: Date
  updatedAt: Date
}
```

## Trade-offs & Known Limitations

- Quiz blocks are stored as JSON and are not validated at the database level.

## Notes

- DTO typing for blocks is kept flexible to avoid Prisma JSON typing limitations.
- Seed data includes both published and draft quizzes for easier local testing.
