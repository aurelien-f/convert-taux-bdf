'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface ArrayTauxChangeProps {
  initialRate: {
    [key: string]: string;
  };
  titles: Record<string, string>;
  updateRates: (date: string) => Promise<{ [key: string]: string }>;
  dayBefore: string;
}

export default function ArrayTauxChange({ initialRate, titles, updateRates, dayBefore }: ArrayTauxChangeProps) {
  const [date, setDate] = useState<Date>(new Date(dayBefore));
  const [currentRates, setCurrentRates] = useState(initialRate);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = Object.values(titles)
    .filter(title =>
      title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      searchQuery.length > 0
    )
    .slice(0, 10);

  const handleDateChange = async (newDate: Date | undefined) => {
    if (!newDate) return;
    const formattedDate = format(newDate, "yyyy-MM-dd");
    setDate(newDate);
    const newRates = await updateRates(formattedDate);
    setCurrentRates(newRates);
  };

  const filteredRates = Object.entries(currentRates)
    .filter(([key]) => key !== "Date")
    .filter(([currency]) =>
      titles[currency].toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-4 bg-white p-4 md:p-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-2 mb-4 md:mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-black font-bold">Date des taux de change</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal text-base",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "dd MMMM yyyy", { locale: fr })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={fr}
                mode="single"
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
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <label className="text-black font-bold">Rechercher une devise</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Dollar, Livre, Peso, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full p-2 border rounded-md text-base md:text-sm"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Réinitialiser la recherche"
              onClick={() => {
                setSearchQuery("");
                setShowSuggestions(false);
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Devise</TableHead>
            <TableHead>Taux de change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRates.map(([currency, rate]) => (
            <TableRow key={currency}>
              <TableCell className="font-medium">{titles[currency]}</TableCell>
              <TableCell>{rate ? rate : "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}