"use client";

import Image from "next/image";
import styles from "./SeasonSlider.module.css";
import SeasonCalendar from "../../season-calendar/ui/SeasonCalendar";

interface Slide {
  id: number;
  src: string;
  alt: string;
  subtitle: string;
  title: string;
  season: string;
}

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
}

export default function SlideItem({ slide, isActive }: SlideItemProps) {
  return (
    <div className={`${styles.slide} ${isActive ? styles.active : ""}`}>
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority={false}
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.slideContent}>
        <div className={styles.content}>
          <span className={styles.subtitle}>{slide.subtitle}</span>
          <h2 className={styles.title}>{slide.title}</h2>
        </div>
        {isActive && (
          <div className={styles.calendarWrapper}>
            <SeasonCalendar season={slide.season} />
          </div>
        )}
      </div>
    </div>
  );
}
