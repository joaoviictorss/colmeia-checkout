"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "@/actions/auth";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { type SignInFormData, signInSchema } from "@/utils/validations/auth";
import { SlidingCards } from "../_components/sliding-cards";

const SignInPage = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setError("");

    const result = await signIn({}, data);

    if (result?.message) {
      setError(result.message);
    }
  };

  return (
    <main className="flex h-screen w-screen">
      <section className="flex w-5/12 flex-col justify-center px-12 py-16">
        <div className="mb-12 flex items-center gap-3">
          <Image alt="Logo" height={40} src="/logo.png" width={40} />
          <span className="font-semibold text-xl">Colmeia Checkout</span>
        </div>

        <div className="mb-12">
          <h1 className="mb-3 font-bold text-4xl text-brand-primary">
            Bem-vindo de volta
          </h1>
          <p className="text-muted-foreground text-xl">
            Soluções Digitais para Automação Financeira
          </p>
        </div>

        <div className="space-y-8">
          <Button className="w-full py-3" size={"lg"} variant={"outline"}>
            <GoogleIcon className="" size={24} />
            Entrar com Google
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-border" />
            <span className="text-muted-foreground text-sm uppercase">ou</span>
            <div className="h-px w-full bg-border" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Input
              error={errors.email?.message}
              label="Email"
              placeholder="Digite seu email"
              size="lg"
              type="text"
              {...register("email")}
            />

            <Input
              error={errors.password?.message}
              label="Senha"
              placeholder="Digite sua senha"
              size="lg"
              type="password"
              {...register("password")}
            />

            <Button
              className="w-full py-3"
              disabled={isSubmitting}
              size={"lg"}
              type="submit"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm">
            Não tem uma conta?{" "}
            <Link
              className="text-brand-primary hover:underline"
              href="/sign-up"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </section>
      <SlidingCards />
    </main>
  );
};

export default SignInPage;
