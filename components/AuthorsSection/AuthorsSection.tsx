'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/src/shared/api/client'
import styles from './AuthorsSection.module.css'

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

const quotes: Record<string, string> = {
  'yanka-kupala': 'А хто там ідзе, а хто там ідзе у агромністай такой грамадзе?',
  'yakub-kolas': 'Мой родны кут, як ты мне мілы! Забыць цябе не маю сілы!',
  'maksim-bahdanovich': 'Зорка Венера ўзышла над зямлёю, светлыя згадкі з сабой прывяла...',
}

const titles: Record<string, string> = {
  'yanka-kupala': 'Народны паэт Беларусі',
  'yakub-kolas': 'Народны паэт Беларусі',
  'maksim-bahdanovich': 'Класік беларускай літаратуры',
}

const AuthorsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const { data: allAuthors } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: async () => {
      const response = await apiClient.get('/poems/authors')
      return response.data
    },
  })

  // Берём только 3 главных автора
  const authors = allAuthors?.filter(a => 
    ['yanka-kupala', 'yakub-kolas', 'maksim-bahdanovich'].includes(a.slug)
  ) || []

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (authors.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % authors.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [authors.length])

  return (
    <section className={styles.authorsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Вялікія паэты</span>
          <h2 className={styles.sectionTitle}>КЛАСІКІ БЕЛАРУСКАЙ ЛІТАРАТУРЫ</h2>
          <p className={styles.sectionSubtitle}>
            Пазнаёмцеся з творчасцю найвялікшых беларускіх паэтаў, 
            якія стварылі сучасную беларускую мову і літаратуру
          </p>
        </div>

        <div className={`${styles.authorsGrid} ${isVisible ? styles.visible : ''}`}>
          {authors.map((author, index) => {
            const years = author.birthYear 
              ? `${author.birthYear}–${author.deathYear || ''}` 
              : '';
            const quote = quotes[author.slug] || '';
            const title = titles[author.slug] || 'Беларускі паэт';
            
            return (
              <Link 
                href={`/author/${author.slug}`} 
                key={author.slug}
                className={`${styles.authorCard} ${index === activeIndex ? styles.active : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className={styles.authorImageWrapper}>
                  {author.image && !imageErrors[author.slug] ? (
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className={styles.authorImage}
                      onError={() => setImageErrors(prev => ({ ...prev, [author.slug]: true }))}
                    />
                  ) : (
                    <div className={styles.authorImagePlaceholder}>
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.authorInfo}>
                  <h3 className={styles.authorName}>{author.name}</h3>
                  <span className={styles.authorYears}>{years}</span>
                  <span className={styles.authorTitle}>{title}</span>
                  {quote && <p className={styles.authorQuote}>«{quote}»</p>}
                </div>
                <div className={styles.cardOverlay}></div>
              </Link>
            );
          })}
        </div>

        {/* Статистика */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>12</span>
            <span className={styles.statLabel}>Аўтараў</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Вершаў</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5</span>
            <span className={styles.statLabel}>Кірункаў</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>∞</span>
            <span className={styles.statLabel}>Натхнення</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthorsSection
