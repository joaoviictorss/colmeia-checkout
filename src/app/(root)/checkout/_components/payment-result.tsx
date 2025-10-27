"use client";

import {
  ArrowLeft,
  CheckCircle,
  Clock,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PaymentStatus = "success" | "failed" | "expired";

interface PaymentResultProps {
  isOpen: boolean;
  onClose: () => void;
  status: PaymentStatus;
  amount: number;
  paymentMethod: string;
  onRetry?: () => void;
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    title: "Pagamento Aprovado!",
    description: "Seu pagamento foi processado com sucesso.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
  },
  failed: {
    icon: XCircle,
    title: "Pagamento Falhou",
    description: "Não foi possível processar seu pagamento.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
  },
  expired: {
    icon: Clock,
    title: "Pagamento Expirado",
    description: "O tempo limite para pagamento foi excedido.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100",
  },
};

export function PaymentResult({
  isOpen,
  onClose,
  status,
  amount,
  paymentMethod,
  onRetry,
}: PaymentResultProps) {
  const router = useRouter();
  const config = statusConfig[status];
  const Icon = config?.icon;

  if (!config) {
    return null;
  }

  const handleGoToProducts = () => {
    router.push("/products");
    onClose();
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${config.iconBg}`}
            >
              <Icon className={`h-6 w-6 ${config.color}`} />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            {config.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Detalhes do Pagamento */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Valor:</span>
                <span className="font-medium">
                  {amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Método:</span>
                <span className="font-medium">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${config.color}`}>
                  {status === "success" && "Aprovado"}
                  {status === "failed" && "Falhou"}
                  {status === "expired" && "Expirado"}
                </span>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            {status === "success" && (
              <Button
                className="w-full"
                onClick={handleGoToProducts}
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuar Comprando
              </Button>
            )}

            {(status === "failed" || status === "expired") && (
              <>
                {onRetry && (
                  <Button
                    className="w-full bg-brand-secondary hover:bg-brand-secondary/90"
                    onClick={onRetry}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Tentar Novamente
                  </Button>
                )}
                <Button
                  className="w-full"
                  onClick={handleGoToProducts}
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Catálogo
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
