import { mockUsers } from "@/utils/mockData/auth";
import type { User } from "@/utils/types/user";
import type { SignInFormData, SignUpFormData } from "@/utils/validations/auth";

function findUserByEmail(email: string) {
  return mockUsers.find((user) => user.email === email);
}

function findUserByCredentials(email: string, password: string) {
  return mockUsers.find(
    (user) => user.email === email && user.password === password
  );
}

export function signUp(data: SignUpFormData): {
  success: boolean;
  user?: User;
  message?: string;
} {
  const { name, email, password } = data;

  const userAlreadyExists = findUserByEmail(email);

  if (userAlreadyExists) {
    return {
      success: false,
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

  return {
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
}

export function signIn(data: SignInFormData): {
  success: boolean;
  user?: User;
  message?: string;
} {
  const { email, password } = data;

  const user = findUserByCredentials(email, password);

  if (!user) {
    return {
      success: false,
      message: "Usuário ou senhas inválidos",
    };
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
