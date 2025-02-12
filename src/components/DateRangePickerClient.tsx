"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DateRangePickerClientProps {
  initialFrom: Date;
  initialTo: Date;
}

export function DateRangePickerClient({ initialFrom, initialTo }: DateRangePickerClientProps) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    // Lorsque la plage de dates est complète, on redirige vers la même page en ajoutant les paramètres
    if (newRange && newRange.from && newRange.to) {
      router.push(
        `?start=${newRange.from.toISOString()}&end=${newRange.to.toISOString()}`
      );
    }
  };

  const textPopoper = range && range.from && range.to ? (
    `${format(range.from, "PPP", { locale: fr })} - ${format(
      range.to,
      "PPP",
      { locale: fr }
    )}`
  ) : initialFrom && initialTo ? (
    `${format(initialFrom, "PPP", { locale: fr })} - ${format(
      initialTo,
      "PPP",
      { locale: fr }
    )}`
  ) : "Choisissez une plage de dates";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !range ? "text-muted-foreground" : ""
          )}
        >
          {textPopoper}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          locale={fr}
          selected={range}
          onSelect={handleSelect}
          // Désactive les weekends : dimanche (0) et samedi (6)
          disabled={(date) =>
            date < new Date("2024-01-01") ||
            date > new Date(Date.now() - 86400000) ||
            date.getDay() === 0 || // Dimanche
            date.getDay() === 6    // Samedi
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
} 