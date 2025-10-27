import { CreditCard, Receipt, Smartphone } from "lucide-react";

type PaymentMethod = "pix" | "card" | "boleto";

interface PaymentMethodsProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

const paymentMethods = [
  {
    id: "pix" as PaymentMethod,
    icon: Smartphone,
    title: "Pix",
    description: "Pagamento instantâneo",
  },
  {
    id: "card" as PaymentMethod,
    icon: CreditCard,
    title: "Cartão de Crédito",
    description: "Em até 12x sem juros",
  },
  {
    id: "boleto" as PaymentMethod,
    icon: Receipt,
    title: "Boleto",
    description: "Vencimento em 3 dias",
  },
];

export function PaymentMethods({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodsProps) {
  return (
    <div className="">
      <h2 className="mb-6 font-bold text-2xl text-gray-900">
        Método de Pagamento
      </h2>
      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = paymentMethod === method.id;

          return (
            <button
              className={`relative flex w-full items-center space-x-4 rounded-2xl border-2 p-6 text-left transition-all duration-200 ${
                isSelected
                  ? "border-brand-secondary bg-brand-secondary/10 shadow-md"
                  : "border-border hover:border-brand-secondary/50 hover:bg-muted/50"
              }
              `}
              key={method.id}
              onClick={() => onPaymentMethodChange(method.id)}
              type="button"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
                  isSelected
                    ? "bg-brand-secondary text-white shadow-md"
                    : "bg-muted text-gray-600"
                }
                `}
              >
                <Icon className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-lg">
                  {method.title}
                </div>
                <div className="text-muted-foreground text-sm">
                  {method.description}
                </div>
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 transition-all ${
                  isSelected
                    ? "border-brand-secondary bg-brand-secondary"
                    : "border-gray-300"
                }
                `}
              >
                {isSelected && (
                  <div className="h-full w-full scale-50 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
