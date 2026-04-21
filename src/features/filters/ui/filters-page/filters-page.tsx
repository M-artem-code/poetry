"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCategories } from "@/src/features/categories";
import { useAuthors } from "@/src/features/authors";
import {
  useFilteredPoems,
  useFiltersPageDerived,
  useFiltersPageState,
} from "@/src/features/filters/model/use-filters-page";
import { usePoems } from "@/src/shared/hooks/use-poemsSTRANCH";
import styles from "./filters-page.module.css";

export const FiltersPage = () => {
  const router = useRouter();

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: authors, isLoading: isAuthorsLoading } = useAuthors();

  const {
    draftQuery,
    setDraftQuery,
    state,
    setState,
    handleApply,
    handleReset,
    toggleCategory,
  } = useFiltersPageState();

  const { data: poemsResponse, isLoading, error } = usePoems(1, 200);
  const poems = useMemo(
    () => poemsResponse?.poems || [],
    [poemsResponse?.poems],
  );

  const { appliedChips, yearFromN, yearToN, resultsTitle } =
    useFiltersPageDerived({
      state,
      setState,
      categories,
      authors,
    });

  const filteredPoems = useFilteredPoems({ poems, state, yearFromN, yearToN });

  const handleGoBack = () => router.back();

  const handleOpenAuthor = () => {
    if (!state.selectedAuthorSlug) return;
    router.push(`/author/${state.selectedAuthorSlug}`);
  };

  const handleOpenCategory = (slug: string) => {
    router.push(`/collection/${slug}`);
  };

  const handlePoemClick = (poemId: number) => {
    router.push(`/poem/${poemId}`);
  };

  return (
    <main className={styles.page}>
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

        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Фильтры</h1>
            <p className={styles.subtitle}>
              Выбирай автора, направления, годы и сортировку — результаты будут
              обновляться сразу.
            </p>
          </div>

          <div className={styles.headerRight}>
            <Link href="/favorites" className={styles.quickLink}>
              Избранное
            </Link>
            <Link href="/" className={styles.quickLinkSecondary}>
              На главную
            </Link>
          </div>
        </header>

        {appliedChips.length > 0 && (
          <section className={styles.chipsSection}>
            <div className={styles.chipsTitle}>Активные фильтры</div>
            <div className={styles.chips}>
              {appliedChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className={styles.chip}
                  onClick={chip.onRemove}
                  title="Убрать"
                >
                  <span className={styles.chipLabel}>{chip.label}</span>
                  <span className={styles.chipX}>×</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className={styles.grid}>
          <aside className={styles.panel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>Настройка</div>
              <div className={styles.panelActions}>
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={handleReset}
                >
                  Сбросить
                </button>
                <button
                  type="button"
                  className={styles.applyButton}
                  onClick={handleApply}
                >
                  Применить
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Поиск</label>
              <div className={styles.searchRow}>
                <input
                  className={styles.input}
                  value={draftQuery}
                  onChange={(e) => setDraftQuery(e.target.value)}
                  placeholder="Название или автор..."
                />
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setDraftQuery("")}
                  disabled={!draftQuery}
                  title="Очистить"
                >
                  ×
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Автор</label>
              <div className={styles.selectRow}>
                <select
                  className={styles.select}
                  value={state.selectedAuthorSlug}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      selectedAuthorSlug: e.target.value,
                    }))
                  }
                  disabled={isAuthorsLoading}
                >
                  <option value="">Любой</option>
                  {(authors || []).map((a) => (
                    <option key={a.id} value={a.slug}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleOpenAuthor}
                  disabled={!state.selectedAuthorSlug}
                >
                  Перейти
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Направления</label>
              <div className={styles.categoriesBox}>
                {isCategoriesLoading ? (
                  <div className={styles.hint}>Загрузка направлений...</div>
                ) : (
                  <div className={styles.categoriesGrid}>
                    {(categories || []).map((c) => {
                      const active = state.selectedCategorySlugs.includes(
                        c.slug,
                      );
                      return (
                        <button
                          key={c.id}
                          type="button"
                          className={`${styles.categoryTag} ${
                            active ? styles.categoryTagActive : ""
                          }`}
                          onClick={() => toggleCategory(c.slug)}
                        >
                          <span className={styles.categoryDot}>
                            {c.name.charAt(0).toUpperCase()}
                          </span>
                          <span className={styles.categoryText}>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {state.selectedCategorySlugs.length === 1 && (
                <button
                  type="button"
                  className={styles.openCategoryButton}
                  onClick={() =>
                    handleOpenCategory(state.selectedCategorySlugs[0])
                  }
                >
                  Открыть направление
                </button>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Год</label>
              <div className={styles.yearsRow}>
                <input
                  className={styles.input}
                  inputMode="numeric"
                  value={state.yearFrom}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, yearFrom: e.target.value }))
                  }
                  placeholder="От"
                />
                <span className={styles.yearsDash}>—</span>
                <input
                  className={styles.input}
                  inputMode="numeric"
                  value={state.yearTo}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, yearTo: e.target.value }))
                  }
                  placeholder="До"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Сортировка</label>
              <div className={styles.sortGrid}>
                <button
                  type="button"
                  className={`${styles.sortButton} ${
                    state.sort === "popular" ? styles.sortButtonActive : ""
                  }`}
                  onClick={() =>
                    setState((prev) => ({ ...prev, sort: "popular" }))
                  }
                >
                  Популярные
                </button>
                <button
                  type="button"
                  className={`${styles.sortButton} ${
                    state.sort === "new" ? styles.sortButtonActive : ""
                  }`}
                  onClick={() => setState((prev) => ({ ...prev, sort: "new" }))}
                >
                  Сначала новые
                </button>
                <button
                  type="button"
                  className={`${styles.sortButton} ${
                    state.sort === "old" ? styles.sortButtonActive : ""
                  }`}
                  onClick={() => setState((prev) => ({ ...prev, sort: "old" }))}
                >
                  Сначала старые
                </button>
              </div>
            </div>
          </aside>

          <section className={styles.results}>
            <div className={styles.resultsHeader}>
              <div>
                <div className={styles.resultsTitle}>{resultsTitle}</div>
                <div className={styles.resultsSubtitle}>
                  Найдено: {filteredPoems.length}
                </div>
              </div>
            </div>

            <div className={styles.resultsBody}>
              {isLoading ? (
                <div className={styles.emptyCard}>
                  <div className={styles.emptyTitle}>
                    Загружаем стихотворения...
                  </div>
                  <div className={styles.emptyText}>Подождите немного.</div>
                </div>
              ) : error ? (
                <div className={styles.emptyCard}>
                  <div className={styles.emptyTitle}>Ошибка</div>
                  <div className={styles.emptyText}>
                    Не удалось загрузить список стихотворений.
                  </div>
                </div>
              ) : filteredPoems.length === 0 ? (
                <div className={styles.emptyCard}>
                  <div className={styles.emptyTitle}>Ничего не найдено</div>
                  <div className={styles.emptyText}>
                    Попробуйте изменить фильтры.
                  </div>
                </div>
              ) : (
                <div className={styles.poemsGrid}>
                  {filteredPoems.slice(0, 24).map((poem) => (
                    <button
                      key={poem.id}
                      type="button"
                      className={styles.poemCard}
                      onClick={() => handlePoemClick(poem.id)}
                    >
                      <div>
                        <div className={styles.poemTitle}>{poem.title}</div>
                        <div className={styles.poemMeta}>
                          <span className={styles.poemAuthor}>
                            {poem.author?.name || "Неизвестный автор"}
                          </span>
                          {poem.year && (
                            <span className={styles.poemYear}>{poem.year}</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.poemChevron}>→</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
