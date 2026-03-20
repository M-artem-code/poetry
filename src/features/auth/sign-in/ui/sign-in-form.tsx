"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/src/shared/lib/validations";
import styles from "../../auth.module.css";
import { useSignIn } from "../..";
import Link from "next/link";

interface SignInFormProps {
  onSuccess?: () => void;
  onSwitchToSignUp?: () => void;
}

export const SignInForm = ({
  onSuccess,
  onSwitchToSignUp,
}: SignInFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useSignIn({
    onSuccess,
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
      <div className={styles.authCard} >
        <h1 className={styles.title}>ВХОД</h1>
        <p className={styles.subtitle}>С возвращением</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          {/* EMAIL */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>EMAIL</label>
            <input
              type="email"
              placeholder="your@email.com"
              className={styles.input}
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          {/* PASSWORD */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>ПАРОЛЬ</label>
            <input
              type="password"
              placeholder="Введите пароль"
              className={styles.input}
              {...register("password")}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className={styles.forgotPassword}>
            <Link href="/auth/reset-password">Забыли пароль?</Link>
          </div>

          {/* ERROR */}
          {error && (
            <p className={styles.error} style={{ textAlign: "center" }}>
              Неверный email или пароль
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isPending}
            className={`${styles.submitButton} ${
              isPending ? styles.submitButtonLoading : ""
            }`}
          >
            {isPending ? "Вход..." : "ВОЙТИ"}
          </button>

          {/* SWITCH */}
          {onSwitchToSignUp && (
            <div className={styles.footer}>
              Нет аккаунта?
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className={styles.footerLink}
              >
                Зарегистрироваться
              </button>
            </div>
          )}
        </form>
      </div>
  );
};
