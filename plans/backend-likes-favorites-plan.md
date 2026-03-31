# План бэкенда для лайков и избранного

## Цель

Исправить путаницу между сущностями "лайк" и "избранное", реализовать корректную логику на бэкенде, обеспечить обновление счетчиков и состояние для авторизованных пользователей.

## Текущие проблемы

1. **Сущности перепутаны**: В схеме Prisma есть модели `Like` и `Favorite`, но API для лайков отсутствует.
2. **Счетчики**: Поле `likesCount` в модели `Poem` не синхронизируется с записями `Like`.
3. **Интеграция**: В `PoemsService` нет проверки `isLiked`, только `isFavorited`.
4. **Нет эндпоинтов** для добавления/удаления лайков.

## Требования

- Лайки увеличивают счетчик `likesCount` и сохраняются в базе.
- Избранное — просто флаг "сохранить" без счетчика (только отношение).
- При открытии модалки сразу показываются актуальные количества лайков, комментариев и просмотров.
- Логика должна работать только для авторизованных пользователей (JWT).

## Архитектура бэкенда

### 1. Модели Prisma (текущее состояние)

```prisma
model Like {
  id     Int @id @default(autoincrement())
  userId Int
  poemId Int
  createdAt DateTime @default(now())
  user User @relation(fields: [userId], references: [id])
  poem Poem @relation(fields: [poemId], references: [id], onDelete: Cascade)
  @@unique([userId, poemId])
  @@index([poemId])
}

model Favorite {
  id        Int      @id @default(autoincrement())
  userId    Int
  poemId    Int
  createdAt DateTime @default(now())
  user User @relation(fields: [userId], references: [id])
  poem Poem @relation(fields: [poemId], references: [id], onDelete: Cascade)
  @@unique([userId, poemId])
  @@index([userId])
  @@index([poemId])
}

model Poem {
  // ...
  views         Int @default(0)
  likesCount    Int @default(0)
  commentsCount Int @default(0)
  // ...
  favorites Favorite[]
  likes     Like[]
}
```

**Изменения в схеме не требуются.** Необходимо обеспечить согласованность счетчика `likesCount` с помощью транзакций.

### 2. Модуль `likes`

Создать новый модуль по аналогии с `favorites`.

#### Структура файлов:

- `src/likes/likes.module.ts`
- `src/likes/likes.service.ts`
- `src/likes/likes.controller.ts`
- `src/likes/dto/like-query.dto.ts` (опционально)

#### Сервис `LikesService`:

- `addLike(userId, poemId)`: создает запись `Like`, инкрементирует `poem.likesCount` в транзакции.
- `removeLike(userId, poemId)`: удаляет запись, декрементирует счетчик.
- `checkLike(userId, poemId)`: возвращает `{ liked: boolean }`.
- `getLikeCount(poemId)`: возвращает количество лайков (можно через агрегацию).
- `getLikeStats(poemId)`: возвращает детальную статистику.

#### Контроллер `LikesController` (JWT guard):

- `POST /likes/:poemId` – добавить лайк.
- `DELETE /likes/:poemId` – удалить лайк.
- `GET /likes/check/:poemId` – проверить лайк.
- `GET /likes/poem/:poemId/count` – количество лайков.
- `GET /likes/poem/:poemId/stats` – статистика.

### 3. Обновление `PoemsService`

Добавить проверку `isLiked` в методы `findOne` и `findBySlug` (аналогично `isFavorited`).

Пример:

```typescript
let isLiked = false;
if (userId) {
  const like = await this.prisma.like.findUnique({
    where: { userId_poemId: { userId, poemId: poem.id } },
  });
  isLiked = !!like;
}
```

Вернуть в ответе поля `isLiked` и `isFavorited`.

### 4. Обновление `FavoritesService`

Убедиться, что при добавлении/удалении избранного не меняются счетчики (только отношение). Сейчас `FavoritesService` не обновляет счетчик `favoritesCount` (его нет в модели). Это правильно.

### 5. Эндпоинт для получения статистики стихотворения

Уже существует `GET /poems/:id/stats` (метод `getStats` в `PoemsService`). Нужно расширить его, включив `isLiked` и `isFavorited` для авторизованного пользователя.

### 6. Интеграция с `AppModule`

Добавить `LikesModule` в импорты `AppModule`.

## Последовательность реализации

### Этап 1: Создание модуля `likes`

1. Создать директорию `src/likes/`.
2. Написать `LikesService` с транзакциями.
3. Написать `LikesController` с JWT guard.
4. Создать `LikesModule`.
5. Добавить модуль в `AppModule`.

### Этап 2: Обновление `PoemsService`

1. Добавить проверку `isLiked` в `findOne` и `findBySlug`.
2. Обновить тип возвращаемого DTO (фронтенд уже ожидает поля? нужно проверить типы).
3. При необходимости обновить `getStats`.

### Этап 3: Тестирование

1. Проверить эндпоинты через Postman.
2. Убедиться, что счетчик `likesCount` синхронизируется.
3. Проверить авторизацию (неавторизованный пользователь не может лайкать).

### Этап 4: Документация

1. Обновить `API_ROUTES.md` с новыми эндпоинтами.
2. Добавить комментарии в код.

## Вопросы для уточнения

1. Нужно ли добавлять поле `favoritesCount` в модель `Poem`? Сейчас его нет, но есть отношение `favorites`. Если нужно отображать количество добавлений в избранное, можно добавить счетчик или использовать агрегацию.
2. Нужно ли кэширование счетчиков? Пока можно обойтись без него.
3. Нужны ли push-уведомления или real-time обновления? Пока достаточно обновления при запросе.

## Оценка сложности

- Создание модуля `likes`: 2 часа.
- Обновление `PoemsService`: 1 час.
- Тестирование: 1 час.
- Итого: 4 часа.

## Риски

- Расхождение счетчика `likesCount` из-за race condition. Решение: использование транзакций.
- Увеличение нагрузки на базу из-за дополнительных запросов. Решение: индексы уже есть.

## Следующие шаги

1. Утвердить план.
2. Перейти к реализации в режиме Code.
