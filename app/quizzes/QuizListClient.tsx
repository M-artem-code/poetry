"use client";

import Link from "next/link";
import styles from "./Quiz.module.css";
import { useQuizzes } from "@/src/features/quiz";

export function QuizListClient() {
  const { data: quizzesList, isLoading, error } = useQuizzes();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error || !quizzesList) {
    return <div>Памылка пры загрузцы квізаў</div>;
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Назад
        </Link>
        <h1 className={styles.title}>Квізы</h1>
        <p className={styles.subtitle}>
          Праверце свае веды беларускай паэзіі ў інтэрактыўных заданнях
        </p>
      </div>

      <div className={styles.grid}>
        {quizzesList.map((quiz, index) => (
          <Link
            key={quiz.id}
            href={`/quizzes/${quiz.id}`}
            className={styles.card}
            style={
              {
                "--card-color": quiz.color,
                "--card-delay": `${index * 0.1}s`,
              } as React.CSSProperties
            }
          >
            <div className={styles.cardIcon}>{quiz.icon}</div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{quiz.title}</h2>
              <p className={styles.cardDescription}>{quiz.description}</p>
              <div className={styles.cardMeta}>
                <span className={styles.questionCount}>
                  {quiz.questionsCount}{" "}
                  {quiz.questionsCount === 1
                    ? "пытанне"
                    : quiz.questionsCount < 5
                      ? "пытанні"
                      : "пытанняў"}
                </span>
                <span className={styles.playButton}>Гуляць →</span>
              </div>
            </div>
            <div className={styles.cardGlow} />
          </Link>
        ))}
      </div>
    </main>
  );
}
