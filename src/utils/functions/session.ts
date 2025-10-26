/** biome-ignore-all lint/style/noMagicNumbers: only used in this file */
import "server-only";

import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SESSION_SECRET);
const ONE_DAY = 24 * 60 * 60 * 1000;
const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  },
  duration: ONE_DAY,
} as const;

export function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });
  const cookieStore = await cookies();

  cookieStore.set(cookie.name, session, {
    ...cookie.options,
    expires,
    maxAge: cookie.duration / 1000, // em segundos
  });
}

export async function updateSession() {
  const session = (await cookies()).get(cookie.name)?.value;
  const payload = await decrypt(session);

  if (!(session && payload)) {
    return null;
  }

  const expires = new Date(Date.now() + cookie.duration);
  const cookieStore = await cookies();
  cookieStore.set(cookie.name, session, { ...cookie.options, expires });
}

export async function verifySession() {
  const cookieData = (await cookies()).get(cookie.name)?.value;
  const session = await decrypt(cookieData);
  if (!session) {
    redirect("/sign-in");
  }

  return { isAuth: true, userId: session.userId };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookie.name);
}
