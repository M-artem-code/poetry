'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AboutBelarusSection.module.css'

const features = [
  {
    icon: '🇧🇾',
    title: 'Багатая спадчына',
    description: 'Беларуская паэзія налічвае стагоддзі, ад старажытных летапісаў да сучасных твораў. Яна захоўвае дух народа і яго гісторыю.',
  },
  {
    icon: '📜',
    title: 'Родная мова',
    description: 'Беларуская мова — адна з найстаражэйшых славянскіх моў. Яе мелодыка і выразнасць асабліва раскрываюцца ў паэзіі.',
  },
  {
    icon: '🎭',
    title: 'Нацыянальнае адраджэнне',
    description: 'Пачатак XX стагоддзя даў свету Янку Купалу і Якуба Коласа, якія сталі сімваламі нацыянальнага адраджэння.',
  },
]

const AboutBelarusSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      <div className="container">
        <div className={`${styles.contentWrapper} ${isVisible ? styles.visible : ''}`}>
          {/* Левая колонка с текстом */}
          <div className={styles.textColumn}>
            <span className={styles.label}>Пра Беларусь</span>
            <h2 className={styles.title}>
              КРАІНА ПАЭТАЎ<br/>
              І МАРЫ
            </h2>
            <p className={styles.description}>
              Беларусь — краіна з багатай культурнай спадчынай, дзе паэзія заўжды займала 
              асаблівае месца ў жыцці народа. Ад народных песень да класічных твораў — 
              тут кожнае слова напоўнена любоўю да роднай зямлі.
            </p>
            <p className={styles.description}>
              Нашы паэты апявалі прыгажосць беларускай прыроды, змагаліся за волю народа 
              і стваралі творы, якія хвалююць сэрцы і сёння. Гэта спадчына, якой мы ганарымся.
            </p>
            
            <div className={styles.quote}>
              <span className={styles.quoteIcon}>❝</span>
              <blockquote>
                Не пакідайце ж мовы нашай беларускай, каб не ўмёрлі!
              </blockquote>
              <cite>— Франтішак Багушэвіч</cite>
            </div>
          </div>

          {/* Правая колонка с карточками */}
          <div className={styles.featuresColumn}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={styles.featureCard}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className={styles.featureIcon}>{feature.icon}</span>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className={styles.decorPattern}>
          <div className={styles.ornament}></div>
          <div className={styles.ornament}></div>
          <div className={styles.ornament}></div>
        </div>
      </div>
    </section>
  )
}

export default AboutBelarusSection
