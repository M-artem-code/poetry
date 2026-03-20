'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/src/shared/api/client'
import styles from './AllAuthorsSection.module.css'

interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  birthYear: number | null;
  deathYear: number | null;
  image: string | null;
  _count?: { poems: number };
}

const AllAuthorsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const { data: authors, isLoading } = useQuery<Author[]>({
    queryKey: ['all-authors'],
    queryFn: async () => {
      const response = await apiClient.get('/poems/authors')
      return response.data
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.loading}>Загрузка аўтараў...</div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Нашы паэты</span>
          <h2 className={styles.title}>УСЕ АЎТАРЫ</h2>
          <p className={styles.subtitle}>
            Поўная калекцыя беларускіх паэтаў і пісьменнікаў, 
            чыя творчасць увайшла ў залаты фонд беларускай літаратуры
          </p>
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
          {authors?.map((author, index) => {
            const years = author.birthYear 
              ? `${author.birthYear}–${author.deathYear || ''}` 
              : '';
            
            return (
              <Link 
                href={`/author/${author.slug}`} 
                key={author.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.imageWrapper}>
                  {author.image && !imageErrors[author.slug] ? (
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className={styles.image}
                      onError={() => setImageErrors(prev => ({ ...prev, [author.slug]: true }))}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className={styles.info}>
                  <h3 className={styles.name}>{author.name}</h3>
                  {years && <span className={styles.years}>{years}</span>}
                  {author.bio && (
                    <p className={styles.bio}>
                      {author.bio.slice(0, 120)}...
                    </p>
                  )}
                  <span className={styles.poemsCount}>
                    {author._count?.poems || 0} {getWordForm(author._count?.poems || 0)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}

function getWordForm(count: number): string {
  if (count === 1) return 'верш';
  if (count >= 2 && count <= 4) return 'вершы';
  return 'вершаў';
}

export default AllAuthorsSection
