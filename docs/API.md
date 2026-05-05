# API

Base URL (local): `http://localhost:3001`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/profile`
- `GET /auth/check`

## Categories

- `GET /categories`
- `GET /categories/:id`
- `GET /categories/slug/:slug`

## Collections

- `GET /collections`
- `GET /collections/:id`
- `GET /collections/slug/:slug`
- `GET /collections/category/:categoryId`

## Poems

- `GET /poems` (pagination)
- `GET /poems/:id`
- `GET /poems/slug/:slug`
- `GET /poems/collection/:collectionId`
- `GET /poems/search?q=...`

## Comments

- `POST /comments`
- `GET /comments/poem/:poemId`
- `PUT /comments/:id`
- `DELETE /comments/:id`

## Favorites

- `POST /favorites/:poemId`
- `DELETE /favorites/:poemId`
- `GET /favorites`
- `GET /favorites/check/:poemId`
