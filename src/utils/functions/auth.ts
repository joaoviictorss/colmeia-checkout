import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/utils/functions/session";
import { mockUsers } from "@/utils/mockData/auth";
import type { User } from "@/utils/types/user";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId || typeof session.userId !== "string") {
      return null;
    }

    const user = mockUsers.find((u) => u.id === session.userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId || typeof session.userId !== "string") {
      return null;
    }

    return session.userId;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const userId = await getCurrentUserId();
  return !!userId;
}
