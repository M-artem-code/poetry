"use client";

import styles from "@/components/SeasonSlider/SeasonSlider.module.css";
import { useSlider } from "../model/use-slide";
import { slides } from "../season-slider-data";
import SlideItem from "./SlideItem";
import NavigationArrows from "./NavigationArrows";
import DotsNavigation from "./DotsNavigation";
import ProgressBar from "./ProgressBar";

export default function SeasonSlider() {
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useSlider();

  return (
    <div className={styles.slider}>
      <div className={styles.slidesContainer}>
        {slides.map((slide, index) => (
          <SlideItem
            key={slide.id}
            slide={slide}
            isActive={index === currentSlide}
          />
        ))}
      </div>

      <NavigationArrows onNext={nextSlide} onPrev={prevSlide} />

      <DotsNavigation
        slidesLength={slides.length}
        current={currentSlide}
        onDotClick={goToSlide}
      />

      <ProgressBar progress={(currentSlide + 1) / slides.length} />
    </div>
  );
}
