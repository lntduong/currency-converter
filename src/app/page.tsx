import { CurrencyConverter } from "@/components/currency-converter";

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 z-0 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl z-0 pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl z-0 pointer-events-none" />

      {/* Main content */}
      <div className="w-full z-10">
        <CurrencyConverter />
      </div>
    </main>
  );
}
