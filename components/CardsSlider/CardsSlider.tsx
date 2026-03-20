'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCategories } from '@/src/features/categories';
import styles from './CardsSlider.module.css';

// Маппинг slug категории к картинке
const categoryImages: Record<string, string> = {
  'classical-poetry': '/classic.jpg',
  'nature-poetry': '/scenery.jpg', 
  'love-poetry': '/romantic.jpg',
  'civil-poetry': '/present.jpg',
  'philosophical-poetry': '/filosofia.jpg',
};

const CardsSlider = () => {
  const router = useRouter();
  const { data: categories, isLoading, error } = useCategories();

  const handleCardClick = (slug: string) => {
    router.push(`/collection/${slug}`);
  };

  // Получить картинку для категории
  const getCategoryImage = (slug: string, name: string) => {
    // Сначала проверяем точное совпадение
    if (categoryImages[slug]) {
      return categoryImages[slug];
    }
    
    // Проверяем по ключевым словам в названии
    const nameLower = name.toLowerCase();
    if (nameLower.includes('класіч') || nameLower.includes('класич')) return '/classic.jpg';
    if (nameLower.includes('пейзаж') || nameLower.includes('прырод')) return '/scenery.jpg';
    if (nameLower.includes('каханн') || nameLower.includes('любов')) return '/romantic.jpg';
    if (nameLower.includes('грамадзян') || nameLower.includes('civil')) return '/present.jpg';
    if (nameLower.includes('філасоф') || nameLower.includes('философ')) return '/filosofia.jpg';
    
    // По умолчанию
    return '/classic.jpg';
  };

  if (isLoading) {
    return (
      <section className={styles.sliderSection}>
        <div className="container">
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Загрузка кірункаў...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <section className={styles.sliderSection}>
        <div className="container">
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <p>Кірункі не знойдзены</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className={styles.sliderSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>КІРУНКІ ПАЭЗІІ</h2>
        <div className={styles.cardsContainer}>
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardImage}>
                  <Image
                    src={getCategoryImage(category.slug, category.name)}
                    alt={category.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                  />
                  <div className={styles.imageOverlay}></div>
                  <h3 className={styles.cardTitle}>{category.name.toUpperCase()}</h3>
                </div>
                
                <button 
                  className={styles.cardButton}
                  onClick={() => handleCardClick(category.slug)}
                >
                  ПАДРАБЯЗНЕЙ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSlider;
