"use client";

import { useState } from "react";
import useSWR from "swr";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AmountInput } from "./amount-input";
import { CurrencySelect } from "./currency-select";
import { ResultDisplay } from "./result-display";
import { useDebounce } from "@/hooks/use-debounce";
import { API_BASE_URL } from "@/lib/constants";

interface ExchangeRatesResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
  time_last_update_utc: string;
}

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch rates");
  return res.json();
});

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("15000");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("VND");

  const debouncedAmount = useDebounce(amount, 500);
  const debouncedFromCurrency = useDebounce(fromCurrency, 300);

  // Use SWR to fetch exchange rates
  const { data, error, isLoading, mutate } = useSWR<ExchangeRatesResponse>(
    `${API_BASE_URL}?base=${debouncedFromCurrency}`,
    fetcher,
    {
      revalidateOnFocus: false, // Don't revalidate on window focus for free APIs
      dedupingInterval: 60000, // Cache for 60 seconds
    }
  );

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const parsedAmount = parseFloat(debouncedAmount) || 0;
  
  // Calculate result based on rates
  let result = 0;
  if (data?.conversion_rates && data.conversion_rates[toCurrency]) {
    result = parsedAmount * data.conversion_rates[toCurrency];
  }

  // Extract available currencies
  const currencies = data?.conversion_rates 
    ? Object.keys(data.conversion_rates) 
    : ["USD", "VND", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD"];

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl border-slate-200/60 dark:border-slate-800 backdrop-blur-md bg-white/80 dark:bg-slate-950/80">
      <CardHeader className="text-center pb-6 border-b border-slate-100 dark:border-slate-800/50 mb-6">
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Currency Converter
        </CardTitle>
        <CardDescription className="flex items-center justify-center gap-2 mt-2">
          Real-time exchange rates
          <button 
            onClick={() => mutate()} 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
            title="Refresh rates"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <AmountInput 
          value={amount} 
          onChange={setAmount} 
        />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 w-full">
          <div className="w-full">
            <CurrencySelect
              label="From"
              value={fromCurrency}
              onChange={setFromCurrency}
              currencies={currencies}
              disabled={isLoading && !data}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="shrink-0 rounded-full h-10 w-10 mb-0 sm:mb-[2px] hover:bg-slate-100 hover:text-blue-600 transition-all dark:hover:bg-slate-800"
            onClick={handleSwap}
            aria-label="Swap currencies"
          >
            <ArrowLeftRight className="h-4 w-4 rotate-90 sm:rotate-0 transition-transform" />
          </Button>
          
          <div className="w-full">
            <CurrencySelect
              label="To"
              value={toCurrency}
              onChange={setToCurrency}
              currencies={currencies}
              disabled={isLoading && !data}
            />
          </div>
        </div>

        <div className="pt-2">
          <ResultDisplay
            isLoading={isLoading && !data}
            error={error}
            amount={parsedAmount}
            result={result}
            from={fromCurrency}
            to={toCurrency}
          />
        </div>
      </CardContent>
    </Card>
  );
}
