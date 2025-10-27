"use client";

import { CheckCircle, CreditCard, Receipt, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CartItem } from "@/utils/types/shared-types";
import type { User } from "@/utils/types/user";

type PaymentMethod = "pix" | "card" | "boleto";

interface PaymentConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  user: User | null;
  isProcessing: boolean;
}

const paymentMethodIcons = {
  pix: Smartphone,
  card: CreditCard,
  boleto: Receipt,
};

const paymentMethodNames = {
  pix: "PIX",
  card: "Cartão de Crédito",
  boleto: "Boleto Bancário",
};

export function PaymentConfirmation({
  isOpen,
  onClose,
  onConfirm,
  items,
  total,
  paymentMethod,
  user,
  isProcessing,
}: PaymentConfirmationProps) {
  const Icon = paymentMethodIcons[paymentMethod];

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-secondary/20">
              <Icon className="h-5 w-5 text-brand-secondary" />
            </div>
            Confirmar Pagamento
          </DialogTitle>
          <DialogDescription className="text-base">
            Revise os dados do seu pedido antes de confirmar o pagamento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-xl border bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold text-gray-900">
              Dados do Comprador
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nome:</span>
                <span className="font-medium">{user?.name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{user?.email || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold text-gray-900">
              Método de Pagamento
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary/20">
                <Icon className="h-4 w-4 text-brand-secondary" />
              </div>
              <span className="font-medium">
                {paymentMethodNames[paymentMethod]}
              </span>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="rounded-xl border bg-gray-50 p-4">
            <h3 className="mb-3 font-semibold text-gray-900">
              Resumo do Pedido
            </h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div className="flex justify-between text-sm" key={item.id}>
                  <span className="truncate pr-2">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">
                    {(item.price * item.quantity).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-brand-primary">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1"
              disabled={isProcessing}
              onClick={onClose}
              variant="outline"
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-brand-secondary hover:bg-brand-secondary/90"
              disabled={isProcessing}
              onClick={onConfirm}
            >
              {isProcessing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processando...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirmar Pagamento
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
