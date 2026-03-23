import { useState } from "react";
import { slides } from "../season-slider-data";

export const useSlider = (initialIndex = 0) => {
  const [currentSlide, setCurrentSlide] = useState(initialIndex);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  };
};
