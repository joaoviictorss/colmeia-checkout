import { Check } from "lucide-react";
import { Input } from "@/components/input";
import type { User } from "@/utils/types/user";

interface BuyerInfoProps {
  user: User | null;
}

export function BuyerInfo({ user }: BuyerInfoProps) {
  return (
    <div className="space-y-6 rounded-[1.25rem] bg-white p-8 shadow-sm">
      <div className="flex items-center gap-2">
        <Check className="size-5 text-green-500" />
        <h2 className="font-bold text-gray-900 text-xl">Dados do Comprador</h2>
      </div>
      <div className="space-y-4">
        <div>
          <Input disabled label="Nome Completo" value={user?.name || ""} />
        </div>
        <div>
          <Input disabled label="Email" value={user?.email || ""} />
        </div>
      </div>
    </div>
  );
}
