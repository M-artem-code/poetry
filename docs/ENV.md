# ENV

## Frontend (Next.js)

Create `./.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Backend (NestJS)

Create `./poetry-backend/.env` based on `./poetry-backend/.env.example`.

Required:

- `DATABASE_URL`
- `JWT_SECRET`
- `FRONTEND_URL`
- `PORT`

Optional (email):

- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASSWORD`

Legacy (optional):

- `SMTP_USER`
- `SMTP_PASSWORD`
