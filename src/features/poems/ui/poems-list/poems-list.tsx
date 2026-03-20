'use client';

import { useRouter } from 'next/navigation';
import type { Collection } from '@/src/shared/types';
import { usePoemsFilter } from '../../model/use-poems-filter';
import { getPoemsWord } from '../../model/helpers';
import { PoemsSearch } from '../poems-search/poems-search';
import { PoemCard } from '../poem-card/poem-card';
import styles from './poems-list.module.css';

interface PoemsListProps {
  collection: Collection;
}

export const PoemsList = ({ collection }: PoemsListProps) => {
  const router = useRouter();
  const poems = collection.poems || [];
  
  const {
    searchQuery,
    setSearchQuery,
    filteredPoems,
    clearSearch,
    filteredCount,
  } = usePoemsFilter({ poems });

  const handlePoemClick = (poemId: number) => {
    router.push(`/poem/${poemId}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <section className={styles.poemsListSection}>
      <div className="container">
        {/* Header Section */}
        <div className={styles.headerSection}>
          <button className={styles.backButton} onClick={handleBack}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Назад
          </button>

          <div className={styles.titleRow}>
            <div>
              <h1 className={styles.categoryTitle}>{collection.title}</h1>
              <p className={styles.poemsCount}>
                {filteredCount} {getPoemsWord(filteredCount)}
                {searchQuery && ` по запросу "${searchQuery}"`}
              </p>
            </div>

            <PoemsSearch
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={clearSearch}
            />
          </div>
        </div>

        {/* Poems List */}
        {filteredPoems.length === 0 ? (
          <div className={styles.noResults}>
            <svg className={styles.noResultsIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M8 8l6 6M14 8l-6 6" />
            </svg>
            <p className={styles.noResultsText}>Ничего не найдено</p>
            <p className={styles.noResultsHint}>
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        ) : (
          <div className={styles.poemsList}>
            {filteredPoems.map((poem) => (
              <PoemCard
                key={poem.id}
                poem={poem}
                onClick={handlePoemClick}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
