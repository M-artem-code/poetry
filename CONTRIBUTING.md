# Contributing

## Prerequisites

- Node.js (LTS recommended)
- npm
- PostgreSQL 14+

## Project Structure

- `./` — frontend (Next.js)
- `./poetry-backend` — backend (NestJS + Prisma)

## Local Development

### 1) Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd poetry-backend
npm install
```

### 2) Environment variables

Backend:

- Copy `.env.example` to `.env` in the repository root.
- Adjust `DATABASE_URL` to match your local PostgreSQL credentials.

Frontend:

- Copy `.env.local.example` to `.env.local`.

### 3) Database

```bash
cd poetry-backend
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### 4) Run

Backend:

```bash
cd poetry-backend
npm run start:dev
```

Frontend:

```bash
npm run dev
```

## Code Style

- Use ESLint rules from the repo.
- Prefer small, focused PRs.

## Commit Messages (recommended)

Conventional Commits style:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`

## Prisma Migrations

When changing DB schema:

```bash
cd poetry-backend
npx prisma migrate dev --name <short_name>
```
