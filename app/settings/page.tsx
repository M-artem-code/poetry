"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useProfile,
  useUpdateProfile,
  useUpdateEmail,
  useUpdatePassword,
} from "@/src/features/profile";
import { useUserStore } from "@/src/entities/user";
import styles from "./settings.module.css";
import { changePasswordSchema } from "@/src/shared";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();
  const { data: profile, isLoading: isLoadingProfile } = useProfile();

  const updateProfile = useUpdateProfile();
  const updateEmail = useUpdateEmail();
  const updatePassword = useUpdatePassword();

  // Форма профиля
  const [name, setName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);

  // Форма email
  const [email, setEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Форма пароля
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Сообщения
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Загружаем данные профиля
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
    } else if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [profile, user]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setSuccessMessage("");
    setTimeout(() => setErrorMessage(""), 5000);
  };

  const handleGoBack = () => {
    router.back();
  };

  // Сохранить имя
  const handleSaveName = async () => {
    try {
      await updateProfile.mutateAsync({ name });
      setIsEditingName(false);
      showSuccess("Имя успешно обновлено!");
    } catch (err: any) {
      showError(err.response?.data?.message || "Ошибка при обновлении имени");
    }
  };

  // Сохранить email
  const handleSaveEmail = async () => {
    if (!emailPassword) {
      showError("Введите пароль для подтверждения");
      return;
    }

    try {
      await updateEmail.mutateAsync({ email, password: emailPassword });
      setIsEditingEmail(false);
      setEmailPassword("");
      showSuccess("Email успешно обновлён!");
    } catch (err: any) {
      showError(err.response?.data?.message || "Ошибка при обновлении email");
    }
  };

  // Сохранить пароль
  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showError("Заполните все поля");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Пароли не совпадают");
      return;
    }

    try {
      const validationResult = changePasswordSchema.safeParse({
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
      });

      if (!validationResult.success) {
        const firstError = validationResult.error;
        showError(firstError.message);
        return;
      }

      await updatePassword.mutateAsync({ currentPassword, newPassword });
      setIsEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showSuccess("Пароль успешно изменён!");
    } catch (err: any) {
      showError(err.response?.data?.message || "Ошибка при смене пароля");
    }
  };

  // Если не авторизован
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.notAuth}>
          <h2>Войдите в аккаунт</h2>
          <p>Для доступа к настройкам профиля необходимо войти</p>
          <button
            onClick={() => router.push("/")}
            className={styles.homeButton}
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  const avatarLetter = (profile?.name || user?.name || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Назад
      </button>

      <div className={styles.header}>
        <h1 className={styles.title}>Настройки профиля</h1>
        <p className={styles.subtitle}>Управляйте своей учетной записью</p>
      </div>

      {/* Сообщения */}
      {successMessage && (
        <div className={styles.successBanner}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className={styles.errorBanner}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {errorMessage}
        </div>
      )}

      {isLoadingProfile ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : (
        <div className={styles.content}>
          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarLarge}>{avatarLetter}</div>
              <div className={styles.profileInfo}>
                <h3 className={styles.profileName}>
                  {profile?.name || user?.name || "Пользователь"}
                </h3>
                <p className={styles.profileEmail}>
                  {profile?.email || user?.email}
                </p>
                {profile?._count && (
                  <div className={styles.stats}>
                    <span>{profile._count.favorites} избранных</span>
                    <span>•</span>
                    <span>{profile._count.comments} комментариев</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Секция: Имя */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Имя</h2>
              {!isEditingName && (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditingName(true)}
                >
                  Изменить
                </button>
              )}
            </div>

            {isEditingName ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  placeholder="Введите ваше имя"
                />
                <div className={styles.editActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setIsEditingName(false);
                      setName(profile?.name || user?.name || "");
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    className={styles.saveBtn}
                    onClick={handleSaveName}
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? "Сохранение..." : "Сохранить"}
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.fieldValue}>{name || "Не указано"}</p>
            )}
          </div>

          {/* Секция: Email */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Email</h2>
              {!isEditingEmail && (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditingEmail(true)}
                >
                  Изменить
                </button>
              )}
            </div>

            {isEditingEmail ? (
              <div className={styles.editForm}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="your@email.com"
                />
                <input
                  type="password"
                  value={emailPassword}
                  onChange={(e) => setEmailPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Введите пароль для подтверждения"
                />
                <div className={styles.editActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setIsEditingEmail(false);
                      setEmail(profile?.email || user?.email || "");
                      setEmailPassword("");
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    className={styles.saveBtn}
                    onClick={handleSaveEmail}
                    disabled={updateEmail.isPending}
                  >
                    {updateEmail.isPending ? "Сохранение..." : "Сохранить"}
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.fieldValue}>{email}</p>
            )}
          </div>

          {/* Секция: Пароль */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Пароль</h2>
              {!isEditingPassword && (
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditingPassword(true)}
                >
                  Изменить
                </button>
              )}
            </div>

            {isEditingPassword ? (
              <div className={styles.editForm}>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Текущий пароль"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Новый пароль (мин. 6 символов)"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Подтвердите новый пароль"
                />
                <div className={styles.editActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setIsEditingPassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    className={styles.saveBtn}
                    onClick={handleSavePassword}
                    disabled={updatePassword.isPending}
                  >
                    {updatePassword.isPending
                      ? "Сохранение..."
                      : "Изменить пароль"}
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.fieldValue}>••••••••</p>
            )}
          </div>

          {/* Дата регистрации */}
          {profile?.createdAt && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Дата регистрации</h2>
              <p className={styles.fieldValue}>
                {new Date(profile.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
