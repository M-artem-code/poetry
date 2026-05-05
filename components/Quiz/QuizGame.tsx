"use client";

import { useState } from "react";
import Link from "next/link";
import type { QuizPublic } from "@/src/shared/types/quiz.types";
import MatchQuiz from "./MatchQuiz";
import TimelineQuiz from "./TimelineQuiz";
import FillQuiz from "./FillQuiz";
import QuizResults from "./QuizResults";
import styles from "./QuizGame.module.css";

interface QuizGameProps {
  quiz: QuizPublic;
}

export default function QuizGame({ quiz }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleQuestionComplete = (
    questionId: string,
    itemResults: Record<string, boolean>,
  ) => {
    setResults((prev) => ({
      ...prev,
      [questionId]: itemResults,
    }));

    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsFinished(true);
      }, 1500);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setResults({});
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <QuizResults quiz={quiz} results={results} onRestart={handleRestart} />
    );
  }

  return (
    <main
      className={styles.container}
      style={{ "--quiz-color": quiz.color } as React.CSSProperties}
    >
      <div className={styles.header}>
        <Link href="/quizzes" className={styles.backLink}>
          ← Да квізаў
        </Link>
        <div className={styles.progressContainer}>
          <div className={styles.progressInfo}>
            <span className={styles.quizIcon}>{quiz.icon}</span>
            <span className={styles.quizTitle}>{quiz.title}</span>
            <span className={styles.questionCounter}>
              {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.questionText}>{currentQuestion.text}</h2>

        {currentQuestion.type === "MATCH" && (
          <MatchQuiz
            key={currentQuestion.id}
            question={currentQuestion}
            color={quiz.color}
            onComplete={(itemResults) =>
              handleQuestionComplete(currentQuestion.id, itemResults)
            }
          />
        )}

        {currentQuestion.type === "ORDER" && (
          <TimelineQuiz
            key={currentQuestion.id}
            question={currentQuestion}
            color={quiz.color}
            onComplete={(itemResults) =>
              handleQuestionComplete(currentQuestion.id, itemResults)
            }
          />
        )}

        {currentQuestion.type === "FILL" && (
          <FillQuiz
            key={currentQuestion.id}
            question={currentQuestion}
            color={quiz.color}
            onComplete={(itemResults) =>
              handleQuestionComplete(currentQuestion.id, itemResults)
            }
          />
        )}
      </div>
    </main>
  );
}
