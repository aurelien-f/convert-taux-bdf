'use client'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
};

type NavBarProps = {
  items: NavItem[];
};

export function NavBar(props: NavBarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full border-primary bg-background/80 backdrop-blur-sm border px-4 py-2">
        {/* Version Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {props.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium rounded-full px-4 py-1.5 transition-all duration-300",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-primary hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Version Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent side="top" className="px-6 [&>button]:hidden">
              <div className="flex items-center justify-between mb-6">
                <SheetTitle className="text-lg font-semibold">Menu de navigation</SheetTitle>
                <SheetClose asChild>
                  <X size={24} />
                </SheetClose>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center">
                {props.items.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium rounded-full px-4 py-1.5 transition-all duration-300",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-primary hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
