"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface ResultDisplayProps {
  isLoading: boolean;
  error: Error | null;
  amount: number;
  result: number;
  from: string;
  to: string;
}

export function ResultDisplay({
  isLoading,
  error,
  amount,
  result,
  from,
  to,
}: ResultDisplayProps) {
  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 text-red-600 text-center text-sm font-medium">
        Failed to get real-time exchange rate. Please try again.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border text-center flex flex-col justify-center min-h-[140px] transition-all">
      {isLoading ? (
        <div className="space-y-3 flex flex-col items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-48" />
        </div>
      ) : (
        <div className="space-y-2 animate-in fade-in zoom-in duration-300">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {new Intl.NumberFormat("en-US").format(amount)} {from} =
          </p>
          <div className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {new Intl.NumberFormat("en-US", {
              maximumFractionDigits: 5,
            }).format(result)}{" "}
            <span className="text-2xl text-slate-500">{to}</span>
          </div>
        </div>
      )}
    </div>
  );
}
