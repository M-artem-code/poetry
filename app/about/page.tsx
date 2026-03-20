'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header/Header'
import styles from './about.module.css'

const teamMembers = [
  {
    name: 'Семашко Вадим',
    role: 'Основатель',
    avatar: 'В',
    description: 'Вдохновитель проекта, ценитель классической поэзии'
  },
  {
    name: 'Солоницын Олег',
    role: 'Куратор контента и Дизайнер',
    avatar: 'О',
    description: 'Отбирает лучшие стихотворения для коллекции и создаёт визуальную атмосферу сайта'
  }
]

const stats = [
  { number: '500+', label: 'Стихотворений' },
  { number: '100+', label: 'Авторов' },
  { number: '10K+', label: 'Читателей' },
  { number: '50+', label: 'Коллекций' }
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className={styles.page}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.badge}>О проекте</span>
            <h1 className={styles.heroTitle}>
              Мы делаем поэзию
              <span className={styles.highlight}> доступной</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Poetry — это платформа для ценителей поэзии. Мы собираем лучшие 
              стихотворения классиков и современных авторов, чтобы вы могли 
              наслаждаться красотой слова в любое время.
            </p>
          </motion.div>
          <div className={styles.heroDecor}>
            <div className={styles.decorCircle}></div>
            <div className={styles.decorCircle2}></div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.missionSection}>
          <motion.div 
            className={styles.missionContent}
            {...fadeInUp}
          >
            <h2 className={styles.sectionTitle}>Наша миссия</h2>
            <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>📚</div>
                <h3>Сохранение наследия</h3>
                <p>Мы бережно храним произведения великих поэтов, делая их доступными для новых поколений читателей.</p>
              </div>
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>🎨</div>
                <h3>Современная подача</h3>
                <p>Используем видео, аудио и интерактивные элементы, чтобы стихи оживали и затрагивали сердца.</p>
              </div>
              <div className={styles.missionCard}>
                <div className={styles.missionIcon}>🌍</div>
                <h3>Доступность</h3>
                <p>Бесплатный доступ к огромной библиотеке поэзии с любого устройства, в любое время.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Наша команда</h2>
          <p className={styles.sectionSubtitle}>
            Люди, которые создают Poetry с любовью к поэзии
          </p>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <motion.div 
                key={`${member.name}-${member.role}`}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <div className={styles.teamAvatar}>
                  {member.avatar}
                </div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <span className={styles.teamRole}>{member.role}</span>
                <p className={styles.teamDesc}>{member.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <motion.div 
            className={styles.ctaContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>Присоединяйтесь к нам</h2>
            <p className={styles.ctaText}>
              Начните свое путешествие в мир поэзии прямо сейчас
            </p>
            <a href="/" className={styles.ctaButton}>
              Смотреть стихи
            </a>
          </motion.div>
        </section>
      </div>
    </>
  )
}
