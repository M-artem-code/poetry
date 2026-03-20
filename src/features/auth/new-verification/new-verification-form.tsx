"use client";

import { useVerificationMutation } from "@/src/shared";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./new-verification-form.module.css";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  const { verification } = useVerificationMutation();

  const calledRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (!token) {
      const err =
        "Токен подтверждения отсутствует. Пожалуйста, проверьте ссылку.";
      setError(err);
      console.error(err);
      return;
    }

    const performVerification = async () => {
      try {
        await verification(token);
        setSuccess(true);
        timerRef.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              if (timerRef.current) clearInterval(timerRef.current);
              router.push("/");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (err: any) {
        setError(err?.message || "Произошла ошибка при подтверждении.");
      }
    };

    performVerification();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [token]);

  const showingSuccess = success;

  return (
    <div className={styles.container}>
      <div className={styles.decoration + " " + styles.decorationCircle}></div>
      <div className={styles.decoration + " " + styles.decorationSquare}></div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Подтверждение email</h1>
          <p className={styles.subtitle}>
            {showingSuccess
              ? "Ваш email успешно подтверждён! Теперь вы можете пользоваться всеми возможностями аккаунта."
              : error
                ? "Произошла ошибка при подтверждении."
                : "Идёт проверка вашего токена подтверждения. Пожалуйста, подождите..."}
          </p>
        </div>

        <div className={styles.content}>
          {error ? (
            <>
              <div className={styles.errorIcon}>⚠️</div>
              <div className={styles.error}>{error}</div>
            </>
          ) : showingSuccess ? (
            <>
              <div className={styles.successIcon}>✓</div>
              <p className={styles.message}>
                Поздравляем! Ваш аккаунт полностью активирован. Теперь вы можете
                войти и начать использовать сервис.
              </p>
              <p className={styles.message}>
                Перенаправление на главную страницу через{" "}
                <span className={styles.countdown}>{countdown}</span>{" "}
                {countdown === 1
                  ? "секунду"
                  : countdown < 5
                    ? "секунды"
                    : "секунд"}
                ...
              </p>
            </>
          ) : (
            <>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.message}>
                Проверяем ваш токен, это займёт несколько секунд...
              </p>
            </>
          )}
        </div>

        <div className={styles.actions}>
          {showingSuccess ? (
            <a
              href="/"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Войти в аккаунт
            </a>
          ) : error ? (
            <>
              <a
                href="/"
                className={`${styles.button} ${styles.primaryButton}`}
              >
                Зарегистрироваться
              </a>
              <a
                href="/"
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                Войти
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
