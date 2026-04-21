"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useFavorites,
  useRemoveFavorite,
} from "@/src/shared/hooks/interactions";
import { useUserStore } from "@/src/entities/user";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/StateScreen/StateScreen";
import styles from "./favorites.module.css";

export default function FavoritesPage() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const { favorites, isLoading, error } = useFavorites();
  const removeFavorite = useRemoveFavorite();

  const handleGoBack = () => {
    router.back();
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <EmptyState
          icon="auth"
          title="Войдите в аккаунт"
          description="Чтобы просматривать избранное, войдите в свой аккаунт"
          actionHref="/"
          actionLabel="На главную"
        />
      );
    }

    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState description="Не удалось загрузить избранное" />;
    }

    if (favorites.length === 0) {
      return (
        <EmptyState
          icon="bookmark"
          title="Нет избранных стихов"
          description="Начните добавлять стихотворения в избранное, чтобы они появились здесь"
          actionHref="/"
          actionLabel="Посмотреть стихи"
        />
      );
    }

    return (
      <div className={styles.grid}>
        {favorites.map((favorite) => (
          <div key={favorite.id} className={styles.card}>
            <div className={styles.cardContent}>
              <Link
                href={`/poem/${favorite.poem.id}`}
                className={styles.cardLink}
              >
                <h3 className={styles.cardTitle}>{favorite.poem.title}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardAuthor}>
                    {favorite.poem.author?.name || "Неизвестный автор"}
                  </span>
                  {favorite.poem.year && (
                    <>
                      <span className={styles.cardDivider}>•</span>
                      <span className={styles.cardYear}>
                        {favorite.poem.year}
                      </span>
                    </>
                  )}
                </div>
                <p className={styles.cardExcerpt}>
                  {favorite.poem.content
                    .split("\n")
                    .slice(0, 2)
                    .join("\n")
                    .substring(0, 120)}
                  ...
                </p>
              </Link>
              <button
                onClick={() => removeFavorite.mutate(favorite.poem.id)}
                className={styles.removeButton}
                title="Удалить из избранного"
                disabled={removeFavorite.isPending}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Назад
      </button>

      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Избранное</h1>
          <p className={styles.subtitle}>
            {isAuthenticated && favorites.length > 0
              ? `${favorites.length} ${getWord(favorites.length)}`
              : "Ваши любимые стихотворения"}
          </p>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

function getWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 19) return "стихотворений";
  if (lastOne === 1) return "стихотворение";
  if (lastOne >= 2 && lastOne <= 4) return "стихотворения";
  return "стихотворений";
}
