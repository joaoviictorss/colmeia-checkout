import { Input } from "@/components/input";

interface CardFormProps {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  onCardNumberChange: (value: string) => void;
  onCardNameChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvvChange: (value: string) => void;
}

export function CardForm({
  cardNumber,
  cardName,
  cardExpiry,
  cardCvv,
  onCardNumberChange,
  onCardNameChange,
  onCardExpiryChange,
  onCardCvvChange,
}: CardFormProps) {
  return (
    <div className="space-y-4 rounded-2xl border p-6">
      <div>
        <Input
          label="Número do Cartão"
          maxLength={19}
          onChange={(e) => onCardNumberChange(e.target.value)}
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
        />
      </div>
      <div>
        <Input
          label="Nome no Cartão"
          onChange={(e) => onCardNameChange(e.target.value)}
          placeholder="Nome como está no cartão"
          value={cardName}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Validade"
            maxLength={5}
            onChange={(e) => onCardExpiryChange(e.target.value)}
            placeholder="MM/AA"
            value={cardExpiry}
          />
        </div>
        <div>
          <Input
            label="CVV"
            maxLength={3}
            onChange={(e) => onCardCvvChange(e.target.value)}
            placeholder="123"
            type="password"
            value={cardCvv}
          />
        </div>
      </div>
    </div>
  );
}
