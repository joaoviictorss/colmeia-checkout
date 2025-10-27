"use client";

import { Smartphone } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

interface PixQRCodeProps {
  amount: number;
}

const QR_CODE_SIZE = 200;
const QR_CODE_MARGIN = 2;
const RANDOM_KEY_LENGTH = 15;
const KEY_START_INDEX = 2;
const RANDOM_KEY_BASE = 36;

export function PixQRCode({ amount }: PixQRCodeProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

  useEffect(() => {
    // Gera uma chave PIX aleatória
    const generatePixKey = () => {
      const randomKey = Math.random()
        .toString(RANDOM_KEY_BASE)
        .substring(KEY_START_INDEX, RANDOM_KEY_LENGTH);
      return `pix-${randomKey}@colmeia.com.br`;
    };

    const key = generatePixKey();

    const generateQRCode = async () => {
      try {
        const pixData = {
          pixKey: key,
          amount,
          description: "Pagamento via PIX - Colmeia Checkout",
          merchant: "Colmeia.io",
          transactionId: `pix-${Date.now()}`,
        };

        const qrCodeString = JSON.stringify(pixData);
        const qrCodeDataURLResult = await QRCode.toDataURL(qrCodeString, {
          width: QR_CODE_SIZE,
          margin: QR_CODE_MARGIN,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        setQrCodeDataURL(qrCodeDataURLResult);
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: just a console error
        console.error("Erro ao gerar QR Code:", error);
      }
    };

    generateQRCode();
  }, [amount]);

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-brand-secondary/20 bg-linear-to-br from-brand-secondary/5 to-brand-secondary/15 p-8">
      <div className="text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-secondary/20">
            <Smartphone className="h-6 w-6 text-brand-secondary" />
          </div>
          <h3 className="font-bold text-gray-900 text-xl">Pagamento PIX</h3>
        </div>

        {qrCodeDataURL ? (
          <div className="space-y-6">
            <div className="mx-auto w-fit rounded-2xl bg-white p-6 shadow-lg ring-1 ring-brand-secondary/10">
              <Image
                alt="QR Code PIX"
                className="mx-auto rounded-lg"
                height={QR_CODE_SIZE}
                src={qrCodeDataURL}
                width={QR_CODE_SIZE}
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="h-full w-full flex-1 rounded-xl bg-white/80 p-4 shadow-sm">
                <div className="mb-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
                  Valor do Pagamento
                </div>
                <div className="font-bold text-2xl text-brand-secondary">
                  {amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-3 border-brand-secondary border-t-transparent" />
              <p className="text-gray-600 text-sm">Gerando QR Code...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
