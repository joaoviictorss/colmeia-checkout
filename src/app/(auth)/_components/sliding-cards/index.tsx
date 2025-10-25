"use client";

import Image from "next/image";
import type { ISlidingCardsProps, SlidingCardData } from "./data";
import { SlidingCards as Layout } from "./Layout";

export const SlidingCards = (props: ISlidingCardsProps) => {
  const SLIDING_CARDS_DATA: SlidingCardData[] = [
    {
      id: "1",
      title: "Cartão de Crédito",
      description: "Aceite pagamentos com cartão de forma segura e rápida",
      icon: "credit-card",
      buttonText: "Nacionais e Internacionais",
    },
    {
      id: "2",
      title: "Boletos e Carnês",
      description: "Gere boletos bancários e carnês de forma digital",
      icon: "barcode",
      buttonText: "Digitais ou Impressos",
    },
    {
      id: "3",
      title: "PIX",
      description: "Pagamentos instantâneos via PIX com QR Code",
      icon: "pix",
      buttonText: "Chave Aleatória ou QR Code",
    },
    {
      id: "4",
      title: "Cartão de Crédito",
      description: "Aceite pagamentos com cartão de forma segura e rápida",
      icon: "credit-card",
      buttonText: "Nacionais e Internacionais",
    },
    {
      id: "5",
      title: "Boletos e Carnês",
      description: "Gere boletos bancários e carnês de forma digital",
      icon: "barcode",
      buttonText: "Digitais ou Impressos",
    },
    {
      id: "6",
      title: "PIX",
      description: "Pagamentos instantâneos via PIX com QR Code",
      icon: "pix",
      buttonText: "Chave Aleatória ou QR Code",
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "credit-card":
        return (
          <Image
            alt="Cartão de Crédito"
            className="h-full w-full object-contain"
            height={200}
            src="/cartao.svg"
            width={200}
          />
        );
      case "barcode":
        return (
          <Image
            alt="Boleto"
            className="h-full w-full object-contain"
            height={200}
            src="/boleto.svg"
            width={200}
          />
        );
      case "pix":
        return (
          <Image
            alt="PIX"
            className="h-full w-full object-contain"
            height={200}
            src="/pix.svg"
            width={200}
          />
        );
      default:
        return null;
    }
  };

  const layoutProps = {
    ...props,
    data: SLIDING_CARDS_DATA,
    getIcon,
  };

  return <Layout {...layoutProps} />;
};
