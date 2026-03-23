"use client";

import { useState, useCallback } from "react";
import type { Holiday } from "@/src/shared/types/holiday.types";

interface UseSeasonCalendarProps {
  holidays: Holiday[];
  months: string[];
  monthNumbers: number[];
  year: number;
}

export const useSeasonCalendar = ({
  holidays,
  months,
  monthNumbers,
  year,
}: UseSeasonCalendarProps) => {
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  const currentMonthNumber = monthNumbers[activeMonthIndex];

  const getHolidayForDay = useCallback(
    (day: number) =>
      holidays.find((h) => h.day === day && h.month === currentMonthNumber),
    [holidays, currentMonthNumber],
  );

  const handleDayClick = useCallback(
    (day: number | null) => {
      if (!day) return;

      if (selectedDay === day) {
        setSelectedDay(null);
        setSelectedHoliday(null);
      } else {
        setSelectedDay(day);
        setSelectedHoliday(getHolidayForDay(day) || null);
      }
    },
    [selectedDay, getHolidayForDay],
  );

  const handleMonthClick = useCallback((index: number) => {
    setActiveMonthIndex(index);
    setSelectedDay(null);
    setSelectedHoliday(null);
  }, []);

  return {
    activeMonthIndex,
    currentMonthNumber,
    selectedDay,
    selectedHoliday,
    handleDayClick,
    handleMonthClick,
  };
};
