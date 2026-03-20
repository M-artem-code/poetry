"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthInput } from "../ui/auth-input";
import {
  ResetPasswordSchema,
  TypeResetPasswordSchema,
} from "@/src/shared/services/schemas/reset.password.schema";
import { useResetPasswordMutation } from "@/src/shared";
import styles from './reset-password-form.module.css'

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { reset, isLoadingReset } = useResetPasswordMutation();

  const onSubmit = (data: TypeResetPasswordSchema) => {
    reset(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.decoration + " " + styles.decorationCircle}></div>
      <div className={styles.decoration + " " + styles.decorationSquare}></div>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Восстановление пароля</h1>
          <p className={styles.subtitle}>
            Введите email, связанный с вашим аккаунтом, и мы отправим вам ссылку
            для сброса пароля.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
          <div className={styles.inputWrapper}>
            <AuthInput
              placeholder="Ваш email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <button
            type="submit"
            disabled={isLoadingReset}
            className={styles.submitButton}
          >
            {isLoadingReset && <span className={styles.loading}></span>}
            {isLoadingReset ? "Отправка..." : "Отправить ссылку"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Вспомнили пароль?{" "}
            <a href="/" className={styles.link}>
              Войти
            </a>
          </p> 
        </div>
      </div>
    </div>
  );
};
