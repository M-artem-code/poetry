"use client";

import Link from "next/link";

import { BookOpen, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import styles from "./PromoSection.module.css";

const PromoSection = () => {
  return (
    <section className={styles.promoSection}>
      <div className="container">
        <div className={styles.card}>
          <span className={styles.dot} data-position="top-left" />

          <span className={styles.dot} data-position="top-right" />

          <span className={styles.dot} data-position="bottom-left" />

          <span className={styles.dot} data-position="bottom-right" />

          <div className={styles.bgOrnament} aria-hidden="true" />

          <div className={styles.grid}>
            <div className={styles.left}>
              <div className={styles.badgeRow}>
                <span className={styles.badge}>
                  <Sparkles className={styles.badgeIcon} />
                  паэтычная калекцыя
                </span>
              </div>

              <h2 className={styles.title}>
                Больш за <span className={styles.titleAccent}>50</span> вершаў
              </h2>

              <p className={styles.description}>
                <span className={styles.brand}>«Беларуская паэзія»</span> дае{" "}
                <span className={styles.highlight}>унікальную магчымасць</span>{" "}
                — пазнаёміцца з{" "}
                <span className={styles.highlight}>
                  лепшымі творамі беларускіх класікаў
                </span>
                , адчуць багацце роднай мовы і{" "}
                <span className={styles.highlight}>атрымліваць натхненне</span>{" "}
                ад спадчыны нашага народа.
              </p>

              <ul className={styles.features}>
                <li className={styles.featureItem}>
                  <BookOpen className={styles.featureIcon} />
                  Калекцыі і падборкі па тэматыках
                </li>

                <li className={styles.featureItem}>
                  <Users className={styles.featureIcon} />
                  Старонкі аўтараў з біяграфіяй і творамі
                </li>

                <li className={styles.featureItem}>
                  <Sparkles className={styles.featureIcon} />
                  Віктарыны, святы і фаварыты — каб было цікава вяртацца
                </li>
              </ul>
            </div>

            <div className={styles.right}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>50+</div>

                  <div className={styles.statLabel}>вершаў у калекцыі</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statValue}>BE</div>

                  <div className={styles.statLabel}>родная мова і класіка</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statValue}>24/7</div>

                  <div className={styles.statLabel}>чытаць з любога месца</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statValue}>♥</div>

                  <div className={styles.statLabel}>захоўвай у фаварыты</div>
                </div>
              </div>

              <div className={styles.quoteCard}>
                <div className={styles.quoteMark}>“</div>

                <p className={styles.quoteText}>
                  Паэзія — гэта калі словы становяцца домам для пачуццяў.
                </p>

                <div className={styles.quoteFooter}>
                  Адкрый для сябе беларускую спадчыну
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
