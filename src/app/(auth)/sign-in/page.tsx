import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { SlidingCards } from "../_components/sliding-cards";

const SignInPage = () => (
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

        <form className="space-y-6">
          <Input
            label="Email"
            placeholder="Digite seu email"
            size="lg"
            type="email"
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            size="lg"
            type="password"
          />

          <Button className="w-full py-3" size={"lg"} type="submit">
            Entrar
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-sm">
          Não tem uma conta?{" "}
          <Link className="text-brand-primary hover:underline" href="/sign-up">
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
    <SlidingCards />
  </main>
);

export default SignInPage;
