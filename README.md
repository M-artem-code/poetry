# Poetry

Full-stack веб-приложение для чтения и публикации стихов.

Монорепозиторий:

- Frontend: Next.js + React + TypeScript
- Backend: NestJS + Prisma + PostgreSQL

## Возможности

- Аутентификация (JWT + cookies)
- Категории, авторы, стихотворения
- Комментарии, избранное, лайки
- Дополнительные сущности (квизы, сезонные слайды)

## Скриншоты

Добавь сюда изображения после первого релиза UI:

- `docs/screenshots/home.png`
- `docs/screenshots/poem.png`
- `docs/screenshots/auth.png`
- `docs/screenshots/profile.png`

## Технологии

- Frontend: Next.js, React, TypeScript, TanStack React Query, Zustand, Zod, React Hook Form
- Backend: NestJS, Prisma, PostgreSQL, JWT, class-validator

## Быстрый старт (локально)

### Требования

- Node.js 20+ (рекомендуется LTS)
- npm
- PostgreSQL 14+

### 1) Установка зависимостей

Frontend:

```bash
npm install
```

Backend:

```bash
cd poetry-backend
npm install
```

### 2) Настройка переменных окружения

Backend:

- Скопируй `./poetry-backend/.env.example` в `./poetry-backend/.env`
- Укажи реальный `DATABASE_URL`

Frontend:

- Скопируй `./.env.local.example` в `./.env.local`

### 3) Подготовка базы данных

Создай базу данных `poetry` в PostgreSQL, затем:

```bash
cd poetry-backend
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### 4) Запуск в dev-режиме

Backend:

```bash
cd poetry-backend
npm run start:dev
```

Frontend:

```bash
npm run dev
```

Приложение:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Структура репозитория

```
poetry/
├── app/                         # Next.js App Router
├── src/                         # Frontend по FSD
├── components/                  # UI-компоненты
├── poetry-backend/              # NestJS API + Prisma
├── docs/                        # Документация и скриншоты
└── ARCHITECTURE.md              # Архитектурные заметки
```

## Команды

Frontend (корень репо):

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Backend (`poetry-backend/`):

```bash
npm run start:dev
npm run build
npm run start:prod
npm run lint
npm run prisma:migrate
npm run prisma:studio
npm run seed
```

## Документация

- `ARCHITECTURE.md`
- `docs/ENV.md`
- `docs/API.md`
- `docs/DB.md`

## Контрибьютинг

См. `CONTRIBUTING.md`.
