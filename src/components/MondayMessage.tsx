import { format } from "date-fns";

export const mondayMessage = <p className="text-red-500 font-bold text-center text-xs md:text-sm mb-4">Les données d&apos;aujourd&apos;hui ({format(new Date(), "dd/MM/yyyy")}) seront disponibles demain matin.</p>