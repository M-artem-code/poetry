"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/shared/api/client";
import Header from "@/components/Header/Header";
import Link from "next/link";
import styles from "./author.module.css";

interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  birthYear: number | null;
  deathYear: number | null;
  image: string | null;
  poems: Array<{
    id: number;
    title: string;
    slug: string;
    year: number | null;
    category: { name: string };
  }>;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function AuthorPage({ params }: PageProps) {
  const [showPoems, setShowPoems] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    data: author,
    isLoading,
    error,
  } = useQuery<Author>({
    queryKey: ["author", params.slug],
    queryFn: async () => {
      const response = await apiClient.get(`/poems/authors/${params.slug}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className="container">
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Загрузка...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !author) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className="container">
            <div className={styles.notFound}>
              <h1>Аўтар не знойдзены</h1>
              <Link href="/" className={styles.backLink}>
                ← Вярнуцца на галоўную
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const years = author.birthYear
    ? `${author.birthYear}${author.deathYear ? `–${author.deathYear}` : ""}`
    : "";

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Link href="/" className={styles.backButton}>
            ← Назад
          </Link>

          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.imageContainer}>
              {author.image && !imageError ? (
                <img
                  src={author.image}
                  alt={author.name}
                  className={styles.heroImage}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  {author.name.charAt(0)}
                </div>
              )}
            </div>

            <div className={styles.heroContent}>
              <h1 className={styles.authorName}>{author.name}</h1>
              {years && (
                <div className={styles.yearsBadge}>
                  <span className={styles.yearsIcon}>📅</span>
                  <span className={styles.yearsText}>{years}</span>
                </div>
              )}
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>
                    {author.poems.length}
                  </span>
                  <span className={styles.statLabel}>
                    {getWordForm(author.poems.length)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Biography Section */}
          {author.bio && (
            <div className={styles.bioSection}>
              <h2 className={styles.sectionTitle}>Біяграфія</h2>
              <div className={styles.bioContent}>
                <p className={styles.bioText}>{author.bio}</p>
              </div>
            </div>
          )}

          {/* Poems Section */}
          <div className={styles.poemsSection}>
            <div className={styles.poemsHeader}>
              <h2 className={styles.sectionTitle}>Творы</h2>
              <button
                className={styles.toggleButton}
                onClick={() => setShowPoems(!showPoems)}
              >
                {showPoems ? "Схаваць" : "Смотреть его стихи"}
                <span className={styles.toggleIcon}>
                  {showPoems ? "▲" : "▼"}
                </span>
              </button>
            </div>

            {showPoems && (
              <div className={styles.poemsList}>
                {author.poems.length > 0 ? (
                  author.poems.map((poem, index) => (
                    <Link
                      href={`/poem/${poem.id}`}
                      key={poem.id}
                      className={styles.poemCard}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className={styles.poemNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className={styles.poemContent}>
                        <h3 className={styles.poemTitle}>{poem.title}</h3>
                        <div className={styles.poemMeta}>
                          <span className={styles.poemCategory}>
                            {poem.category?.name}
                          </span>
                          {poem.year && (
                            <span className={styles.poemYear}>{poem.year}</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.poemArrow}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>У гэтага аўтара пакуль няма вершаў</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function getWordForm(count: number): string {
  if (count === 1) return "верш";
  if (count >= 2 && count <= 4) return "вершы";
  return "вершаў";
}
