'use client';

import Header from '@/components/Header/Header';
import { useCategory } from '@/src/features/categories';
import { useQuery } from '@tanstack/react-query';
import { poemsApi } from '@/src/shared/api';
import Link from 'next/link';
import styles from './collection.module.css';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({ params }: PageProps) {
  const { data: category, isLoading: isLoadingCategory, error } = useCategory(params.slug);

  const { data: poems, isLoading: isLoadingPoems } = useQuery({
    queryKey: ['poems', 'category', params.slug],
    queryFn: () => poemsApi.getByCategorySlug(params.slug),
    enabled: !!category,
  });

  const isLoading = isLoadingCategory || isLoadingPoems;

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

  if (error || !category) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className="container">
            <div className={styles.notFound}>
              <h1>Катэгорыя не знойдзена</h1>
              <p>На жаль, такой катэгорыі не існуе.</p>
              <Link href="/" className={styles.backLink}>← Вярнуцца на галоўную</Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          {/* Header */}
          <div className={styles.header}>
            <Link href="/" className={styles.backButton}>← Назад</Link>
            <div className={styles.headerContent}>
              <span className={styles.label}>Кірунак паэзіі</span>
              <h1 className={styles.title}>{category.name.toUpperCase()}</h1>
              {category.description && (
                <p className={styles.description}>{category.description}</p>
              )}
              <span className={styles.count}>
                {poems?.length || 0} {getWordForm(poems?.length || 0)}
              </span>
            </div>
          </div>

          {/* Poems Grid */}
          {poems && poems.length > 0 ? (
            <div className={styles.poemsGrid}>
              {poems.map((poem, index) => (
                <Link 
                  href={`/poem/${poem.id}`} 
                  key={poem.id} 
                  className={styles.poemCard}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={styles.poemNumber}>{String(index + 1).padStart(2, '0')}</div>
                  <div className={styles.poemContent}>
                    <h3 className={styles.poemTitle}>{poem.title}</h3>
                    <p className={styles.poemAuthor}>{poem.author?.name || 'Невядомы аўтар'}</p>
                    {poem.year && <span className={styles.poemYear}>{poem.year}</span>}
                  </div>
                  <div className={styles.poemPreview}>
                    {poem.content.split('\n').slice(0, 2).join('\n')}...
                  </div>
                  <div className={styles.poemArrow}>→</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>У гэтай катэгорыі пакуль няма вершаў</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function getWordForm(count: number): string {
  if (count === 1) return 'верш';
  if (count >= 2 && count <= 4) return 'вершы';
  return 'вершаў';
}
