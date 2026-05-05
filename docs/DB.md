# Database

The project uses PostgreSQL with Prisma.

## Setup (local)

1. Create a PostgreSQL database named `poetry`.
2. Configure `DATABASE_URL` in `poetry-backend/.env`.
3. Run migrations and seed:

```bash
cd poetry-backend
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

## Prisma

Useful commands:

```bash
cd poetry-backend
npm run prisma:studio
```
