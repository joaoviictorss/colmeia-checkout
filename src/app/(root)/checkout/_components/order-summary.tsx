import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/utils/types/shared-types";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  isProcessing: boolean;
  onPayment: () => void;
}

export function OrderSummary({
  items,
  total,
  isProcessing,
  onPayment,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-24 space-y-6 rounded-[1.25rem] bg-white p-8 shadow-sm">
      <h2 className="font-bold text-2xl text-gray-900">Resumo do Pedido</h2>
      <div className="max-h-64 space-y-3 overflow-y-auto pr-2">
        {items.map((item) => (
          <div className="flex justify-between py-2 text-sm" key={item.id}>
            <span className="truncate pr-2 font-medium">
              {item.quantity}x {item.name}
            </span>
            <span className="font-semibold">
              {(item.price * item.quantity).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        ))}
      </div>
      <div className="space-y-3 border-t pt-6">
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
          <span className="font-semibold text-green-500">Grátis</span>
        </div>
        <div className="flex justify-between pt-2 font-bold text-2xl">
          <span>Total</span>
          <span className="text-brand-primary">
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
      <Button
        className="h-10 w-full bg-brand-secondary text-base text-white hover:bg-brand-secondary/90"
        disabled={isProcessing}
        onClick={onPayment}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando pagamento...
          </>
        ) : (
          "Confirmar Pagamento"
        )}
      </Button>
    </div>
  );
}
