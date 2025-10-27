"use client";

import { CheckCircle, Copy, Receipt } from "lucide-react";
import { useEffect, useState } from "react";

interface BoletoBarcodeProps {
  amount: number;
}

const BANK_CODE = "237";
const CURRENCY_CODE = "9";
const WALLET_CODE = "25";
const DAYS_TO_DUE = 3;
const DV_RANGE = 10;
const OUR_NUMBER_RANGE = 100_000_000;
const OUR_NUMBER_PADDING = 8;
const AMOUNT_MULTIPLIER = 100;
const AMOUNT_PADDING = 10;
const COPY_TIMEOUT = 2000;

export function BoletoBarcode({ amount }: BoletoBarcodeProps) {
  const [barcode, setBarcode] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Gera código de barras do boleto (formato simplificado)
    const generateBarcode = () => {
      // Código de barras de 44 dígitos (formato FEBRABAN)
      const dv = Math.floor(Math.random() * DV_RANGE).toString();
      const agency = "1234";
      const account = "12345678";
      const ourNumber = Math.floor(Math.random() * OUR_NUMBER_RANGE)
        .toString()
        .padStart(OUR_NUMBER_PADDING, "0");
      const dvOurNumber = Math.floor(Math.random() * DV_RANGE).toString();
      const zero = "0";
      const amountFormatted = Math.floor(amount * AMOUNT_MULTIPLIER)
        .toString()
        .padStart(AMOUNT_PADDING, "0");

      const barcodeString = `${BANK_CODE}${CURRENCY_CODE}${dv}${agency}${account}${WALLET_CODE}${ourNumber}${dvOurNumber}${zero}${amountFormatted}`;

      // Adiciona dígito verificador geral (simplificado)
      const dvGeneral = Math.floor(Math.random() * DV_RANGE).toString();

      return `${barcodeString}${dvGeneral}`;
    };

    // Gera data de vencimento (3 dias a partir de hoje)
    const generateDueDate = () => {
      const today = new Date();
      const dueDateResult = new Date(today);
      dueDateResult.setDate(today.getDate() + DAYS_TO_DUE);

      return dueDateResult.toLocaleDateString("pt-BR");
    };

    setBarcode(generateBarcode());
    setDueDate(generateDueDate());
  }, [amount]);

  // Função para formatar o código de barras com espaços
  const formatBarcode = (code: string) => code.replace(/(.{5})/g, "$1 ").trim();

  const handleCopyBarcode = async () => {
    try {
      await navigator.clipboard.writeText(barcode);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_TIMEOUT);
    } catch {
      // Fallback para navegadores que não suportam clipboard API
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-brand-secondary/20 bg-linear-to-br from-brand-secondary/5 to-brand-secondary/15 p-8">
      <div className="text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-secondary/20">
            <Receipt className="h-6 w-6 text-brand-secondary" />
          </div>
          <h3 className="font-bold text-gray-900 text-xl">Boleto Bancário</h3>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="h-full w-full flex-1 rounded-xl bg-white/80 p-4 shadow-sm">
              <div className="mb-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
                Valor do Pagamento
              </div>
              <div className="font-bold text-brand-secondary text-xl">
                {amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </div>

            <div className="h-full w-full flex-1 rounded-xl bg-white/80 p-4 shadow-sm">
              <div className="mb-2 font-medium text-gray-500 text-xs uppercase tracking-wide">
                Data de Vencimento
              </div>
              <div className="font-semibold text-gray-700 text-lg">
                {dueDate}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-brand-secondary/10">
            <div className="mb-4 font-medium text-gray-600 text-sm">
              Código de Barras
            </div>
            <div className="rounded-lg bg-gray-50 p-4 font-mono text-gray-800 text-sm leading-relaxed">
              {formatBarcode(barcode)}
            </div>
          </div>

          <button
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
              copied
                ? "bg-brand-secondary text-white"
                : "bg-brand-secondary text-white hover:bg-brand-secondary/90"
            }`}
            onClick={handleCopyBarcode}
            type="button"
          >
            {copied ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Código Copiado!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copiar Código de Barras
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
