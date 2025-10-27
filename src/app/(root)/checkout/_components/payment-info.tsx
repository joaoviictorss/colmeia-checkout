import { BoletoBarcode } from "./boleto-barcode";
import { PixQRCode } from "./pix-qr-code";

type PaymentMethod = "pix" | "boleto";

interface PaymentInfoProps {
  method: PaymentMethod;
  amount: number;
}

export function PaymentInfo({ method, amount }: PaymentInfoProps) {
  if (method === "pix") {
    return <PixQRCode amount={amount} />;
  }

  if (method === "boleto") {
    return <BoletoBarcode amount={amount} />;
  }

  return null;
}
