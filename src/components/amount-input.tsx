"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function AmountInput({ value, onChange }: AmountInputProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="amount">Amount</Label>
      <Input
        id="amount"
        type="number"
        placeholder="Enter amount"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg"
        min={0}
      />
    </div>
  );
}
