"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentUser as getCurrentUserFromAuth } from "@/utils/functions/auth";
import { createSession, deleteSession } from "@/utils/functions/session";
import { mockUsers } from "@/utils/mockData/auth";
import {
  type SignInFormData,
  type SignUpFormData,
  signInSchema,
  signUpSchema,
} from "@/utils/validations/auth";

type FormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

function findUserByEmail(email: string) {
  return mockUsers.find((user) => user.email === email);
}

function findUserByCredentials(email: string, password: string) {
  return mockUsers.find(
    (user) => user.email === email && user.password === password
  );
}

export async function signUp(_: FormState, formData: SignUpFormData) {
  const validatedFields = signUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error).properties,
    };
  }

  const { name, email, password } = validatedFields.data;

  const userAlreadyExists = findUserByEmail(email);

  if (userAlreadyExists) {
    return {
      message: "Uma conta já existe com esse email",
    };
  }

  const newUser = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    password,
  };

  mockUsers.push(newUser);

  await createSession(newUser.id);
  redirect("/products");
}

export async function signIn(_: FormState, formData: SignInFormData) {
  const validatedFields = signInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error).properties,
    };
  }

  const { email, password } = validatedFields.data;

  const user = findUserByCredentials(email, password);

  if (!user) {
    return {
      message: "Usuário ou senhas inválidos",
    };
  }

  await createSession(user.id);
  redirect("/products");
}

export async function logout() {
  await deleteSession();
  redirect("/sign-in");
}

export async function getCurrentUser() {
  return await getCurrentUserFromAuth();
}
