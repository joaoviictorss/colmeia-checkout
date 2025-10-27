"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { useUser } from "@/contexts/user-context";
import { signUp } from "@/utils/functions/auth";
import { type SignUpFormData, signUpSchema } from "@/utils/validations/auth";
import { SlidingCards } from "../_components/sliding-cards";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, user, loading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (!loading && user) {
      router.push("/products");
    }
  }, [user, loading, router]);

  const onSubmit = (data: SignUpFormData) => {
    setError("");

    const result = signUp(data);

    if (result?.message) {
      setError(result.message);
    } else if (result?.success && result?.user) {
      login(result.user);
      router.push("/products");
    }
  };

  if (user) {
    return null;
  }

  return (
    <main className="flex h-screen w-screen flex-col lg:flex-row">
      <section className="flex w-full flex-col justify-center py-8 pr-4 pl-6 sm:py-12 lg:w-5/12 lg:py-16">
        <div className="mb-8 flex items-center gap-3 lg:mb-12">
          <Image alt="Logo" height={40} src="/logo.png" width={40} />
          <span className="font-semibold text-lg lg:text-xl">
            Colmeia Checkout
          </span>
        </div>

        <div className="mb-8 lg:mb-12">
          <h1 className="mb-3 font-bold text-2xl text-brand-primary sm:text-3xl lg:text-4xl">
            Crie sua conta
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg lg:text-xl">
            Soluções Digitais para Automação Financeira
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <Button className="w-full py-3" size={"lg"} variant={"outline"}>
            <GoogleIcon className="" size={24} />
            Cadastrar com Google
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-border" />
            <span className="text-muted-foreground text-sm uppercase">ou</span>
            <div className="h-px w-full bg-border" />
          </div>

          <form
            className="space-y-4 sm:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Input
              error={errors.name?.message}
              label="Nome completo"
              placeholder="Digite seu nome completo"
              size="lg"
              type="text"
              {...register("name")}
            />

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

            <Input
              error={errors.confirmPassword?.message}
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              size="lg"
              type="password"
              {...register("confirmPassword")}
            />

            <Button
              className="w-full py-3"
              disabled={isSubmitting}
              size={"lg"}
              type="submit"
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm">
            Já tem uma conta?{" "}
            <Link
              className="text-brand-primary hover:underline"
              href="/sign-in"
            >
              Faça login
            </Link>
          </p>
        </div>
      </section>
      <div className="hidden w-full lg:flex">
        <SlidingCards />
      </div>
    </main>
  );
};

export default SignUpPage;
