"use client";

import Image from "next/image";
import SeasonCalendar from "../../season-calendar/ui/SeasonCalendar";
import { useHolidaysBySeason } from "@/src/features/holidays/model/use-holidays";
import { seasonMap } from "../season-slider-data";

type SlideSeason = "spring" | "summer" | "autumn" | "winter";

interface Slide {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  season: SlideSeason;
}

interface SeasonSlideProps {
  slide: Slide;
  isActive: boolean;
}

export const SeasonSlide = ({ slide, isActive }: SeasonSlideProps) => {
  const apiSeason = seasonMap[slide.season];

  const { data: holidays = [], isLoading } = useHolidaysBySeason(apiSeason);

  return (
    <div className={isActive ? "active" : ""}>
      <Image src={slide.src} alt={slide.alt} fill />

      {isActive && <SeasonCalendar season={slide.season} holidays={holidays} />}
    </div>
  );
};
