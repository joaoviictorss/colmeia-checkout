import type { ComponentProps, ReactNode } from "react";

export interface IInputProps extends Omit<ComponentProps<"input">, "size"> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: "default" | "sm" | "lg";
}
export interface IInputData extends IInputProps {}
