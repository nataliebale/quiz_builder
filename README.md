# Quiz Builder (Full Stack)

Full-stack Quiz Builder application built as a take-home assignment.  
The project allows creating, editing, publishing, and rendering quizzes using a block-based editor.

This repository contains **both frontend and backend applications** in a single monorepo.

---

## Repository Structure

```text
quiz_builder/
├── apps/
│   ├── api/        # Backend (NestJS + Prisma)
│   └── web/        # Frontend (Next.js)
```

# Quiz Builder (Full Stack)

Full-stack Quiz Builder application built as a take-home assignment.  
The project allows creating, editing, publishing, and rendering quizzes using a block-based editor.

This repository contains **both frontend and backend applications** in a single monorepo.

---

## Repository Structure

```text
quiz_builder/
├── apps/
│   ├── api/        # Backend (NestJS + Prisma)
│   └── web/        # Frontend (Next.js)
```

## Tech Stack & Reasoning
### Backend

- NestJS – structured and scalable backend framework.
- Prisma ORM – type-safe database access and migrations.
- PostgreSQL (Neon) – relational database with JSON support.
- TypeScript – safer refactors and clearer contracts.
- NestJS was chosen for its clean architecture and dependency injection.
- Prisma simplifies working with JSON-based quiz blocks while keeping migrations manageable.

### Frontend

- Next.js (App Router) – routing and rendering model for a clean structure.
- React – UI components.
- TypeScript – strong typing and maintainability.
- Tailwind CSS – fast styling with consistent design tokens.
- @dnd-kit – drag-and-drop interactions for the editor.
- Zod – lightweight runtime validation (where applicable).

The quiz editor runs as a client component because drag-and-drop relies on browser-only APIs.

## Features

- Quiz list page
- Create quiz with drag-and-drop building blocks
- Edit existing quizzes
- Reorder blocks and insert before other blocks
- Select blocks and edit their properties in a side panel
- Save and publish actions
- Render published quizzes
- Draft quizzes show “Not published yet”

## How to Run Locally
Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database

## Install Dependencies
```
pnpm install
```



# For Frontend and Backend setup see
- [apps/web/README.md](apps/web/README.md)
- [apps/api/README.md](apps/api/README.md)
