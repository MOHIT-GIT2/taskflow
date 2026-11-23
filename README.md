# TaskFlow

TaskFlow is a full-stack task management application built with **Next.js 16**, **React 19**, **TypeScript**, **PostgreSQL**, and **Prisma**. It includes user authentication, user-scoped task management, server-side validation, search, filtering, pagination, and responsive UI styling with Tailwind CSS.

## Features

- **Authentication:** Email and password authentication powered by Better Auth.
- **User-specific tasks:** Tasks are associated with their owner; database operations scope task changes to the authenticated user.
- **Task management:** Create, edit, delete, and toggle tasks between pending and completed.
- **Validation:** Zod schemas validate task titles on the server, including trimming whitespace and enforcing a 100-character limit.
- **Search and filtering:** Search task titles and filter by task status.
- **Pagination:** Load tasks in pages rather than fetching the entire task list at once.
- **Server-first architecture:** Use App Router Server Components for server-side data access and Client Components for interactive UI.
- **Server Actions:** Handle task mutations and revalidate the task route after changes.
- **Loading UI:** Use React Suspense to provide loading fallbacks while asynchronous page content loads.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Authentication | Better Auth |
| Validation | Zod |
| Runtime / package manager | Node.js, npm |

## Getting started

### Prerequisites

- Node.js (use a current LTS release)
- npm
- PostgreSQL database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/MOHIT-GIT2/taskflow.git
cd taskflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. You can start from the example:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Set the following values in `.env`:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string for your database |
| `BETTER_AUTH_SECRET` | A strong, random secret used by Better Auth |
| `BETTER_AUTH_URL` | Base URL of the application, for example `http://localhost:3000` |

Example PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/TASKFLOW?schema=public"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

Use your own database credentials and generate a unique secret. Never commit your real `.env` file or production credentials.

### 4. Generate the Prisma Client and apply database migrations

```bash
npx prisma generate
npx prisma migrate dev
```

Make sure PostgreSQL is running and the database in `DATABASE_URL` exists before running migrations.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

The repository uses a root-level App Router structure:

```text
app/
  api/
    auth/
      [...all]/
        route.ts       # Better Auth HTTP handler
  login/               # Login route
  signup/               # Signup route
  tasks/
    [taskId]/          # Dynamic task route
    actions.ts         # Task Server Actions
    page.tsx           # Task list, search, filters, pagination
  layout.tsx            # Root layout
  page.tsx              # Home page

components/
  create-task.tsx       # Interactive create-task form
  navbar.tsx
  searchbar.tsx
  task-list.tsx         # Task list and task actions

lib/
  auth.ts               # Better Auth server configuration
  prisma.ts             # Prisma client and PostgreSQL adapter
  validation/
    task.ts             # Zod task schemas

prisma/
  schema.prisma         # Database models and enums
  migrations/           # Prisma migration history
prisma7.config.ts       # Prisma 7 configuration
```

Some route and component files may evolve as the application is developed; consult the repository for the latest structure.

## Architecture notes

- The Next.js App Router is used for routing and page composition.
- Server Components handle server-side session checks and database reads.
- Client Components provide interactive controls and browser-side state.
- Server Actions perform task mutations. They independently retrieve the session and scope task updates/deletions to the authenticated user's ID.
- Better Auth manages authentication, with its Next.js route handler exposed under `/api/auth`.
- Prisma provides typed database access to PostgreSQL.
- Zod validates untrusted form input on the server.

## Screenshots

Screenshots can be added here once the deployed application is available.

## Deployment

TaskFlow is intended to be deployed as a Next.js application. Before deploying:

1. Provision a PostgreSQL database that is reachable from the deployment environment.
2. Configure `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in the hosting provider's environment settings.
3. Apply production database migrations with `npx prisma migrate deploy`.
4. Ensure the production build succeeds with `npm run build`.

For Vercel deployment, import this GitHub repository into Vercel, configure the environment variables, and deploy. Do not use local development credentials in production.

## License

No license has been specified yet.
