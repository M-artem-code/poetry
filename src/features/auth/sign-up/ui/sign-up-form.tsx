"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/src/shared/lib/validations";
import { useSignUp } from "../model/use-sign-up";
import styles from "../../auth.module.css";
import { useState } from "react";

interface SignUpFormProps {
  onSuccess?: () => void;
  onSwitchToSignIn?: () => void;
}

export const SignUpForm = ({
  onSuccess,
  onSwitchToSignIn,
}: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [successMessage, setSuccessMessage] = useState("");

  const { mutate, isPending } = useSignUp({
    onSuccess: () => {
      setSuccessMessage(
        "Рэгістрацыя паспяховая! Праверце email для пацверджання.",
      );
      onSuccess?.();
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    mutate(registerData);
  };

  return (
    <div className={styles.authCard}>
      <h1 className={styles.title}>РЭГІСТРАЦЫЯ</h1>
      <p className={styles.subtitle}>Стварыце новы акаўнт</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        {/* NAME */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>ІМЯ</label>
          <input
            type="text"
            placeholder="Увядзіце ваша імя"
            className={styles.input}
            {...register("name")}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

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
            placeholder="Мінімум 8 сімвалаў"
            className={styles.input}
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>ПАЎТАРЫЦЕ ПАРОЛЬ</label>
          <input
            type="password"
            placeholder="Паўтарыце пароль"
            className={styles.input}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* SUCCESS */}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isPending}
          className={`${styles.submitButton} ${
            isPending ? styles.submitButtonLoading : ""
          }`}
        >
          {isPending ? "Рэгістрацыя..." : "ЗАРЭГІСТРАВАЦЦА"}
        </button>

        {/* SWITCH */}
        {onSwitchToSignIn && (
          <div className={styles.footer}>
            Ужо ёсць акаўнт?
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className={styles.footerLink}
            >
              Увайсці
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
