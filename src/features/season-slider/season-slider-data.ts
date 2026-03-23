import { Season } from "@/src/shared";

export type SlideSeason = "spring" | "summer" | "autumn" | "winter";

export const slides = [
  {
    id: 1,
    src: "/images/spring.jpg",
    alt: "Вясна",
    title: "ВЯСНА",
    subtitle: "Час абуджэння",
    season: "spring",
  },
  {
    id: 2,
    src: "/images/summer.jpg",
    alt: "Лета",
    title: "ЛЕТА",
    subtitle: "Час росквіту",
    season: "summer",
  },
  {
    id: 3,
    src: "/images/autumn.jpg",
    alt: "Восень",
    title: "ВОСЕНЬ",
    subtitle: "Час роздуму",
    season: "autumn",
  },
  {
    id: 4,
    src: "/images/winter.jpg",
    alt: "Зіма",
    title: "ЗІМА",
    subtitle: "Час спакою",
    season: "winter",
  },
];

export const seasonMap = {
  spring: Season.SPRING,
  summer: Season.SUMMER,
  autumn: Season.AUTUMN,
  winter: Season.WINTER,
};
