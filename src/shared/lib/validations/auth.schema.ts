import { z } from "zod";
import { passwordSchema } from "./password.validation";

export const loginSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Имя должно быть минимум 2 символа")
      .max(50, "Имя не должно превышать 50 символов")
      .optional(),
    email: z.string().min(1, "Email обязателен").email("Некорректный email"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
