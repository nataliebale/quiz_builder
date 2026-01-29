# Quiz Builder (Frontend)

Frontend application for the Quiz Builder take-home assignment.  
Built with Next.js and TypeScript, providing a drag-and-drop quiz editor and quiz renderer.

---

## Tech Stack & Reasoning

- **Next.js (App Router)** – routing and rendering model for a clean structure.
- **React** – UI components.
- **TypeScript** – safer refactors and clearer contracts.
- **Tailwind CSS** – fast styling with consistent design tokens.
- **@dnd-kit** – drag-and-drop for editor interactions.
- **Zod** – lightweight runtime validation (where needed).

The quiz editor is client-side because drag-and-drop relies on browser-only APIs.

---

## Features

- Quiz list page
- Create/edit quiz with drag-and-drop building blocks
- Reorder blocks and insert before other blocks
- Select block and edit its properties in a side panel
- Save and publish actions
- Render published quizzes (draft quizzes show “Not published yet”)

---

## How to Run Locally

### Prerequisites
- Node.js 18+
- pnpm
- Backend API running

### Environment Variables

Create a `.env.local` file in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Install
```env
pnpm install
```

### Run
```env
pnpm dev
```

### Open:

```env
http://localhost:3000
```

### Routes

```env
/ – quiz list

/quiz/edit – create quiz

/quiz/edit/[id] – edit quiz

/quiz/[id] – render quiz
```


## Trade-offs & Known Limitations

- No quiz delete functionality(wasn't requested).
- Save happens only via explicit Save/Publish actions.
- No undo/redo (optional requirement).
