/**
 * Функция для склонения слова "стихотворение"
 */
export function getPoemsWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;
  
  if (lastTwo >= 11 && lastTwo <= 19) {
    return 'стихотворений';
  }
  
  if (lastOne === 1) {
    return 'стихотворение';
  }
  
  if (lastOne >= 2 && lastOne <= 4) {
    return 'стихотворения';
  }
  
  return 'стихотворений';
}

/**
 * Форматирование года публикации
 */
export function formatYear(year: number | null | undefined): string {
  if (!year) return '';
  return `${year} г.`;
}
