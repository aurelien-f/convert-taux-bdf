import { mondayMessage } from "@/components/MondayMessage";
import { cn } from "@/lib/utils";

export const CardWhite = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <>
    {new Date().getDay() === 1 && mondayMessage}  <div className={cn("bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto", className)} >
      {children}
    </div >
  </>
}
