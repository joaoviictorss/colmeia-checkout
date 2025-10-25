import type { ReactNode } from "react";

export type SlidingCardData = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  buttonText?: string;
};

export interface ISlidingCardsProps {}

export interface ISlidingCardsData extends ISlidingCardsProps {
  data: SlidingCardData[];
  getIcon: (iconName: string) => ReactNode;
}
