import { cn } from "@/lib/utils";

export const H1 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h1 className={cn("text-4xl font-bold text-center mb-4 text-primary", className)}>{children}</h1>;
};
