import { NewPasswordForm } from "@/src/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новый пароль",
  description: "Установите новый пароль для вашего аккаунта на Poetry.",
};

export default function ResetPasswordPage() {
  return (
    <div className="new-password-page">
      <NewPasswordForm />
    </div>
  );
}
