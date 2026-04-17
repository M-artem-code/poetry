"use client";

import { useQuizzes } from "@/src/features/quiz";
import { useEffect, useRef, useState } from "react";

import styles from "./Quiz.module.css";

export default function QuizPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);

  const { data: slides = [] } = useQuizzes();

  const slidesCount = slides.length;

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  const changeSlide = (direction) => {
    if (direction === "up") {
      setActiveIndex((prev) => (prev + 1 === slidesCount ? 0 : prev + 1));
    } else {
      setActiveIndex((prev) => (prev - 1 < 0 ? slidesCount - 1 : prev - 1));
    }
  };

  console.log(slides);
  console.log(slidesCount);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{ height: "100vh", overflow: "hidden", position: "relative" }}
    >
      {/* Сайдбар (инвертированный) */}
      <div
        className={styles.sidebar}
        style={{
          transition: "transform 0.5s ease-in-out",
          top: `-${(slidesCount - 1) * 100}vh`,
          transform: `translateY(${activeIndex * containerHeight}px)`,
        }}
      >
        {/* Рендерим блоки сайдбара */}
        {slides.map((slide) => {
          return <div key={slide.id}>{slide.title}</div>;
        })}
      </div>

      {/* Основные слайды */}
      <div
        className={styles.mainSlide}
        style={{
          transition: "transform 0.5s ease-in-out",
          transform: `translateY(-${activeIndex * containerHeight}px)`,
        }}
      >
        {/* Рендерим картинки/слайды */}
        {slides.map((slide) => {
          return (
            <img
              className={styles.slideImage}
              src={slide.imageUrl}
              key={slide.id}
            />
          );
        })}
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => changeSlide("down")}
          className={styles.downButton}
        >
          Down
        </button>
        <button onClick={() => changeSlide("up")} className={styles.upButton}>
          Up
        </button>
      </div>
    </div>
  );
}
