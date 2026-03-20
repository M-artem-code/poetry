'use client'

import styles from './PromoSection.module.css'

const PromoSection = () => {
  return (
    <section className={styles.promoSection}>
      <div className="container">
        <div className={styles.whitePlate}>
          <span className={styles.dot} data-position="top-left"></span>
          <span className={styles.dot} data-position="top-right"></span>
          <span className={styles.dot} data-position="bottom-left"></span>
          <span className={styles.dot} data-position="bottom-right"></span>
          
          <div className={styles.promoContent}>
            <p className={styles.subtitle}>паэтычная калекцыя</p>
            
            <h2 className={styles.title}>БОЛЬШ ЗА 50 ВЕРШАЎ</h2>
            
            <div className={styles.divider}></div>
            
            <p className={styles.description}>
              <span className={styles.brand}>«БЕЛАРУСКАЯ ПАЭЗІЯ»</span> ДАЕ{' '}
              <span className={styles.highlight}>УНІКАЛЬНУЮ МАГЧЫМАСЦЬ</span> — ПАЗНАЁМІЦЦА З{' '}
              <span className={styles.highlight}>ЛЕПШЫМІ ТВОРАМІ БЕЛАРУСКІХ КЛАСІКАЎ</span>, АДЧУЦЬ{' '}
              БАГАЦЦЕ РОДНАЙ МОВЫ І{' '}
              <span className={styles.highlight}>АТРЫМЛІВАЦЬ НАТХНЕННЕ</span> АД СПАДЧЫНЫ НАШАГА НАРОДА.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoSection

