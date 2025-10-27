"use client";

import { useCallback, useState } from "react";

type PaymentStatus = "idle" | "processing" | "success" | "failed" | "expired";

interface PaymentState {
  status: PaymentStatus;
  isProcessing: boolean;
  error: string | null;
}

interface UsePaymentReturn {
  paymentState: PaymentState;
  startPayment: () => Promise<void>;
  resetPayment: () => void;
}

const PAYMENT_SUCCESS_RATE = 0.8; // 80% de sucesso
const PAYMENT_PROCESSING_DELAY = 3000; // 3 segundos

export function usePayment(): UsePaymentReturn {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: "idle",
    isProcessing: false,
    error: null,
  });

  const startPayment = useCallback(async () => {
    setPaymentState({
      status: "processing",
      isProcessing: true,
      error: null,
    });

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, PAYMENT_PROCESSING_DELAY)
      );

      // Simula resultado aleatório baseado na taxa de sucesso
      const isSuccess = Math.random() < PAYMENT_SUCCESS_RATE;

      if (isSuccess) {
        setPaymentState({
          status: "success",
          isProcessing: false,
          error: null,
        });
      } else {
        const failureTypes = ["failed", "expired"];
        const randomFailure = failureTypes[
          Math.floor(Math.random() * failureTypes.length)
        ] as "failed" | "expired";

        setPaymentState({
          status: randomFailure,
          isProcessing: false,
          error:
            randomFailure === "failed"
              ? "Falha na comunicação com o banco"
              : "Tempo limite excedido",
        });
      }
    } catch {
      setPaymentState({
        status: "failed",
        isProcessing: false,
        error: "Erro inesperado no processamento",
      });
    }
  }, []);

  const resetPayment = useCallback(() => {
    setPaymentState({
      status: "idle",
      isProcessing: false,
      error: null,
    });
  }, []);

  return {
    paymentState,
    startPayment,
    resetPayment,
  };
}
