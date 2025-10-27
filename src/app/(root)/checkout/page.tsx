"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user-context";
import { useCart } from "@/hooks/use-cart";
import { usePayment } from "@/hooks/use-payment";
import { BuyerInfo } from "./_components/buyer-info";
import { CardForm } from "./_components/card-form";
import { OrderSummary } from "./_components/order-summary";
import { PaymentConfirmation } from "./_components/payment-confirmation";
import { PaymentInfo } from "./_components/payment-info";
import { PaymentMethods } from "./_components/payment-methods";
import { PaymentResult } from "./_components/payment-result";

type PaymentMethod = "pix" | "card" | "boleto";

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const { items, total } = state;
  const { user } = useUser();
  const { paymentState, startPayment, resetPayment } = usePayment();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handlePaymentClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    setShowConfirmation(false);
    await startPayment();
    setShowResult(true);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    if (paymentState.status === "success") {
      clearCart();
    }
    resetPayment();
  };

  const handleRetryPayment = () => {
    setShowResult(false);
    resetPayment();
    setShowConfirmation(true);
  };

  const paymentMethodNames = {
    pix: "PIX",
    card: "Cartão de Crédito",
    boleto: "Boleto Bancário",
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-2xl bg-linear-to-br from-brand-primary/10 to-brand-secondary/10 p-6">
            <ShoppingBag className="size-12 text-brand-primary" />
          </div>
          <h1 className="mb-2 font-bold text-2xl text-gray-900">
            Seu carrinho está vazio
          </h1>
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
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-gray-900">Finalizar Compra</h1>
        <p className="text-gray-600">
          Revise seus dados e confirme o pagamento
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BuyerInfo user={user} />

          <div className="space-y-6 rounded-[1.25rem] bg-white p-8 shadow-sm">
            <PaymentMethods
              onPaymentMethodChange={setPaymentMethod}
              paymentMethod={paymentMethod}
            />

            {paymentMethod === "card" && (
              <CardForm
                cardCvv={cardCvv}
                cardExpiry={cardExpiry}
                cardName={cardName}
                cardNumber={cardNumber}
                onCardCvvChange={setCardCvv}
                onCardExpiryChange={setCardExpiry}
                onCardNameChange={setCardName}
                onCardNumberChange={setCardNumber}
              />
            )}

            {(paymentMethod === "pix" || paymentMethod === "boleto") && (
              <PaymentInfo amount={total} method={paymentMethod} />
            )}
          </div>
        </div>

        <div>
          <OrderSummary
            isProcessing={paymentState.isProcessing}
            items={items}
            onPayment={handlePaymentClick}
            total={total}
          />
        </div>
      </div>

      {/* Modal de Confirmação */}
      <PaymentConfirmation
        isOpen={showConfirmation}
        isProcessing={paymentState.isProcessing}
        items={items}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmPayment}
        paymentMethod={paymentMethod}
        total={total}
        user={user}
      />

      {/* Modal de Resultado */}
      <PaymentResult
        amount={total}
        isOpen={showResult}
        onClose={handleCloseResult}
        onRetry={handleRetryPayment}
        paymentMethod={paymentMethodNames[paymentMethod]}
        status={paymentState.status as "success" | "failed" | "expired"}
      />
    </div>
  );
}
