"use client";

import { useState } from "react";
import { useUser } from "@/contexts/user-context";
import { useCart } from "@/hooks/use-cart";
import { BuyerInfo } from "./_components/buyer-info";
import { CardForm } from "./_components/card-form";
import { OrderSummary } from "./_components/order-summary";
import { PaymentInfo } from "./_components/payment-info";
import { PaymentMethods } from "./_components/payment-methods";

type PaymentMethod = "pix" | "card" | "boleto";

const PAYMENT_SUCCESS_RATE = 0.7;
const PAYMENT_FAILURE_RATE = 0.9;
const PROCESSING_DELAY = 2000;

export default function Checkout() {
  const { user } = useUser();
  const { state } = useCart();
  const { items, total } = state;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simula processamento do pagamento
    await new Promise((resolve) => setTimeout(resolve, PROCESSING_DELAY));

    const random = Math.random();

    if (random < PAYMENT_SUCCESS_RATE) {
      // Status: success
    } else if (random < PAYMENT_FAILURE_RATE) {
      // Status: failed
    } else {
      // Status: expired
    }

    // Aqui você pode redirecionar para uma página de resultado ou mostrar um modal
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto">
      <h1 className="mb-8 font-bold text-3xl text-gray-900">
        Finalizar Compra
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
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
            isProcessing={isProcessing}
            items={items}
            onPayment={handlePayment}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
