import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "../constants";

export const signInSchema = z.object({
  email: z
    .email("Email deve ter um formato válido")
    .min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z
      .email("Email deve ter um formato válido")
      .min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(
        MIN_PASSWORD_LENGTH,
        `Senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`
      ),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
