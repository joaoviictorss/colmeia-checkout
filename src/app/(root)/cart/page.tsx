"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/user-context";
import { useCart } from "@/hooks/use-cart";

export default function Cart() {
  const { state, updateQuantity, removeItem } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const { items, total } = state;

  return (
    <div className="container mx-auto">
      <h1 className="mb-8 font-bold text-3xl text-gray-900">
        Carrinho de Compras
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-2xl bg-linear-to-br from-brand-primary/10 to-brand-secondary/10 p-6">
                <ShoppingBag className="size-12 text-brand-primary" />
              </div>
              <h2 className="mb-2 font-bold text-2xl text-gray-900">
                Seu carrinho está vazio
              </h2>
              <p className="mb-6 text-muted-foreground">
                Adicione produtos incríveis para continuar
              </p>
              <Button
                className="bg-brand-primary px-6 text-white hover:bg-brand-primary/90"
                onClick={() => router.push("/products")}
              >
                Ver produtos
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                className="group flex w-full flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                key={item.id}
              >
                <div className="p-6">
                  <div className="flex gap-6">
                    <div className="group relative">
                      <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-2xl">
                        <Image
                          alt={item.name}
                          className="object-cover"
                          fill
                          sizes="128px"
                          src={item.image}
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="mb-1 font-bold text-brand-primary text-lg">
                          {item.name}
                        </h3>
                        <p className="font-bold text-2xl text-brand-primary">
                          {item.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          className="h-10 w-10 rounded-xl transition-all hover:border-brand-primary hover:bg-brand-primary/10"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          size="icon"
                          variant="outline"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          className="h-10 w-20 rounded-xl text-center font-semibold [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          min="0"
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Number.parseInt(e.target.value, 10) || 0
                            )
                          }
                          type="number"
                          value={item.quantity}
                        />
                        <Button
                          className="h-10 w-10 rounded-xl transition-all hover:border-brand-primary hover:bg-brand-primary/10"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          size="icon"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          className="ml-auto h-10 w-10 rounded-xl transition-all hover:shadow-lg"
                          onClick={() => removeItem(item.id)}
                          size="icon"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="sticky top-24 space-y-6 rounded-[1.25rem] bg-white p-8 shadow-sm">
            <h2 className="font-bold text-2xl text-gray-900">
              Resumo do Pedido
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Frete</span>
                <span className="font-semibold text-green-600">Grátis</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-2xl">
                  <span>Total</span>
                  <span className="text-brand-primary">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
            {user ? (
              <Button
                className="w-full bg-brand-secondary text-white hover:bg-brand-secondary/90"
                onClick={() => router.push("/checkout")}
                size="lg"
              >
                Finalizar Compra
              </Button>
            ) : (
              <Button
                className="w-full bg-brand-primary text-white hover:bg-brand-primary/90"
                onClick={() => router.push("/sign-in")}
                size="lg"
              >
                Fazer Login para Finalizar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
