"use client";

import styles from "@/components/SeasonCalendar/SeasonCalendar.module.css";

interface Holiday {
  day: number;
  month: number; // 1-12
  name: string;
  poems: string[];
}

const holidays: Holiday[] = [
  // Зима
  { day: 25, month: 12, name: "Каляды", poems: ["Ave Maria", "Звон кафедры"] },

  // Вясна
  { day: 15, month: 3, name: "Дзень Канстытуцыі", poems: ["А хто там ідзе"] },

  // Лета
  {
    day: 3,
    month: 7,
    name: "Дзень Незалежнасці",
    poems: ["А хто там ідзе", "Спадчына"],
  },
  // Восень
  {
    day: 1,
    month: 9,
    name: "Дзень беларускага пісьменства",
    poems: ["Родная мова", "Спадчына"],
  },
];

const seasonConfig = {
  spring: {
    months: ["Сакавік", "Красавік", "Май"],
    monthNumbers: [3, 4, 5],
    startMonth: 2,
    year: 2026,
    accentColor: "#7cb342",
  },
};

const dayNames = ["Пн", "Ат", "Ср", "Чц", "Пт", "Сб", "Нд"];

export default function SeasonCalendar({ season }: SeasonCalendarProps) {
  return (
    <div
      className={styles.calendar}
      style={{ "--accent-color": config.accentColor } as React.CSSProperties}
    >
      <div className={styles.header}>
        <span className={styles.month}>{config.months[activeMonthIndex]}</span>
        <span className={styles.year}>{displayYear}</span>
      </div>

      <div className={styles.dayNames}>
        {dayNames.map((day) => (
          <span key={day} className={styles.dayName}>
            {day}
          </span>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((day, index) => {
          const holiday = day ? getHolidayForDay(day) : undefined;
          const isSelected =
            selectedHoliday?.day === day &&
            selectedHoliday?.month === currentMonthNumber;
          return (
            <span
              key={index}
              className={`${styles.day} ${day === null ? styles.empty : ""} ${day === 1 ? styles.firstDay : ""} ${holiday ? styles.holiday : ""} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleDayClick(day)}
              title={holiday?.name}
            >
              {day}
              {holiday && <span className={styles.holidayDot} />}
            </span>
          );
        })}
      </div>

      <div className={styles.seasonMonths}>
        {config.months.map((month, index) => (
          <button
            key={month}
            className={`${styles.seasonMonth} ${index === activeMonthIndex ? styles.activeMonth : ""}`}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </button>
        ))}
      </div>

      {selectedHoliday && (
        <div className={styles.holidayPopup}>
          <div className={styles.holidayHeader}>
            <span className={styles.holidayDate}>
              {selectedHoliday.day}.
              {String(selectedHoliday.month).padStart(2, "0")}
            </span>
            <span className={styles.holidayName}>{selectedHoliday.name}</span>
          </div>
          <div className={styles.poemsList}>
            <span className={styles.poemsTitle}>Вершы:</span>
            {selectedHoliday.poems.map((poem, i) => (
              <span key={i} className={styles.poemItem}>
                {poem}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
