'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Check, ChevronsUpDown, Copy } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { Input } from "./ui/input";

interface SearchBarProps {
  initialRate: {
    [key: string]: string;
  };
  updateRates: (date: string) => Promise<{ [key: string]: string }>;
  titles: Record<string, string>;
}

export default function SearchBar({ initialRate, updateRates, titles }: SearchBarProps) {

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const initialDate = dateRegex.test(initialRate.Date) ? new Date(initialRate.Date) : new Date();
  const initialNumberRate = (isNaN(Number(initialRate.USD))) ? 0 : Number(initialRate.USD);
  const [amount, setAmount] = useState<string>('1');
  const [date, setDate] = useState<Date>(initialDate);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [currentRate, setCurrentRate] = useState(initialRate);
  const [toCurrency, setToCurrency] = useState<number>(initialNumberRate);
  const [errorRate, setErrorRate] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);
  const [open, setOpen] = useState(false)

  const handleDateChange = async (newDate: Date | undefined) => {
    if (!newDate) return;
    const formattedDate = format(newDate, "yyyy-MM-dd");
    setDate(newDate);
    const newRates = await updateRates(formattedDate);
    setCurrentRate(newRates);
    const newRate = newRates[selectedCurrency];
    setToCurrency(Number(newRate));
    calculateConversion(amount, Number(newRate));
  };

  const calculateConversion = (amount: string, rate: number) => {
    if (isNaN(rate)) {
      setResult(0);
      setErrorRate(true);
    } else {
      const result = Number(amount) * (1 / rate);
      setResult(Math.round(result * 100) / 100);
      setErrorRate(false);
    }
  };

  useEffect(() => {
    setToCurrency(Number(currentRate[selectedCurrency]));
    calculateConversion(amount, toCurrency);
  }, [selectedCurrency, currentRate, amount, toCurrency]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.toString());
      toast.success('Résultat copié dans le presse-papiers');
    } catch (err) {
      toast.error('Erreur lors de la copie' + err);
    }
  };

  const errorRateMessage = <p className="text-red-500 font-bold text-center ">Aucune données encore pour cette date.</p>;

  return <>
    {errorRate && <div className="flex flex-col gap-0 mb-6">
      {errorRate && errorRateMessage}
    </div>}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-black font-bold">Date de conversion</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12 text-base md:text-sm",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "dd MMMM yyyy", { locale: fr })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={fr}
              selected={date}
              onSelect={handleDateChange}
              disabled={(date) =>
                date < new Date('2024-01-01') ||
                date > new Date(Date.now() - 86400000) ||
                date.getDay() === 0 || // Dimanche
                date.getDay() === 6    // Samedi
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-black font-bold">Conversion en</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between h-12 text-base md:text-sm"
            >
              {titles[selectedCurrency] || "Sélectionner une devise..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Rechercher une devise..." className="h-9" />
              <CommandList>
                <CommandEmpty>Aucune devise trouvée.</CommandEmpty>
                <CommandGroup>
                  {Object.entries(currentRate)
                    .filter(([key]) => key !== "Date")
                    .map(([key]) => (
                      <CommandItem
                        key={key}
                        value={titles[key]}
                        onSelect={() => {
                          setSelectedCurrency(key);
                          setToCurrency(Number(currentRate[key]));
                          calculateConversion(amount, Number(currentRate[key]));
                          setOpen(false);
                        }}
                      >
                        {titles[key]}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedCurrency === key ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-black font-bold">Montant en {selectedCurrency}</label>
        <Input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            calculateConversion(e.target.value, toCurrency);
          }}
          className="w-full h-12"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-black font-bold">Résultat en Euros</p>
        <div className="w-full p-3 h-12 flex items-center justify-between text-xl border rounded-lg bg-gray-50 text-black cursor-pointer" onClick={copyToClipboard}>
          <span>{result} €</span>
          <button
            className="hover:text-gray-600 transition-colors"
            title="Copier le résultat"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
        <p className="text-gray-500 italic text-xs">
          Pour un taux de change de {toCurrency}
        </p>
      </div>
    </div>
  </>;
}
