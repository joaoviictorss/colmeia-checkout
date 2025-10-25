import { Input as ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { IInputData } from "../data";

export const Input = ({
  id,
  placeholder,
  required,
  label,
  className,
  error,
  icon,
  iconPosition = "left",
  size = "default",
  ...rest
}: IInputData) => {
  const sizeClasses = {
    sm: "h-8",
    default: "h-9",
    lg: "h-10",
  };

  return (
    <div className="flex flex-col items-start">
      {label && (
        <Label
          className={`${error && "text-error"} mb-1 flex flex-row gap-1`}
          htmlFor={id}
        >
          {label}
          {required && <span className="text-error">*</span>}
        </Label>
      )}

      <div className="relative w-full">
        {icon && iconPosition === "left" && (
          <div className="-translate-y-1/2 absolute top-1/2 left-3 text-muted-foreground">
            {icon}
          </div>
        )}

        <ShadInput
          className={cn(
            `${error && "border-error"}`,
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            sizeClasses[size],
            className
          )}
          id={id}
          placeholder={placeholder}
          {...rest}
        />

        {icon && iconPosition === "right" && (
          <div className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>

      <span
        className={`h-0 overflow-hidden transition-all duration-150 ${
          error && "mt-1 h-4"
        }`}
      >
        <div
          className={`text-xs opacity-0 ${error && "text-error opacity-100"}`}
        >
          {error}
        </div>
      </span>
    </div>
  );
};
