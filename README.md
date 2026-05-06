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

- `docs/screenshots/home.png`
- `docs/screenshots/poem.png`
- `docs/screenshots/auth.png`

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

## Структура проекта (FSD)

Проект на фронтенде организован по принципам **Feature-Sliced Design** (FSD): код группируется не по типам файлов, а по смыслу и зоне ответственности.

### Слои и ответственность

- **`app/`**
  - Роутинг и композиция страниц (Next.js App Router)
  - Подключение провайдеров (`providers.tsx`), глобальные стили (`globals.css`)
- **`src/shared/`**
  - Переиспользуемые куски без привязки к конкретной бизнес-сущности
  - API клиент, базовые хуки, утилиты, типы, UI-kit
- **`src/entities/`**
  - Бизнес-сущности и их состояние (например `user`)
  - Нельзя тянуть UI/логику напрямую из `features` (наоборот можно)
- **`src/features/`**
  - Фичи (пользовательские сценарии): авторизация, комментарии, избранное, квизы и т.д.
  - Внутри: `model/` (логика), `ui/` (компоненты), `lib/` (утилиты фичи)

### Текущая структура (как есть в репозитории)

```text
app/
  layout.tsx
  providers.tsx
  page.tsx
  globals.css
  about/
  admin/
  auth/
  author/
  collection/
  faq/
  favorites/
  filters/
  holidays/
  poem/
  quizzes/
  settings/

src/
  app/
  entities/
    user/
  features/
    auth/
    authors/
    categories/
    comments/
    favorites/
    filters/
    holidays/
    poems/
    profile/
    quiz/
    season-calendar/
    season-slider/
  shared/
    api/
    config/
    hooks/
    lib/
    services/
    types/
    ui/
    utils/
```

### Публичные API модулей

Чтобы импорты были стабильными и “чистыми”, каждый модуль экспортирует наружу только то, что является его публичным API:

- `src/shared/index.ts`
- `src/entities/user/index.ts`
- `src/features/<feature>/index.ts`

Рекомендуемый стиль импорта:

- `import { apiClient } from '@/shared/api'`
- `import { useUserStore } from '@/entities/user'`
- `import { SignInForm } from '@/features/auth'`

### Конвенции внутри feature

Рекомендуемая структура внутри `src/features/<name>/`:

```text
features/<name>/
  model/     # бизнес-логика, хуки, состояние
  ui/        # компоненты
  lib/       # утилиты фичи
  index.ts   # публичный API
```

Если в фиче много частей, допускаются вложенные подпапки (как в `auth`: `sign-in/`, `sign-up/` и т.д.).

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
