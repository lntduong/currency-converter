"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
  disabled?: boolean;
}

export function CurrencySelect({
  label,
  value,
  onChange,
  currencies,
  disabled,
}: CurrencySelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="grid gap-2 flex-1 w-full relative">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className="w-full h-10 justify-between font-normal px-3 bg-transparent hover:bg-transparent"
            >
              {value || "Select currency..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-muted-foreground" />
            </Button>
          }
        />
        <PopoverContent 
          className="w-[--radix-popover-trigger-width] min-w-32 p-0" 
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search currency..." className="h-9" />
            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencies.map((currency) => (
                  <CommandItem
                    key={currency}
                    value={currency}
                    onSelect={() => {
                      onChange(currency);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-blue-600 dark:text-blue-400",
                        value === currency ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {currency}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
