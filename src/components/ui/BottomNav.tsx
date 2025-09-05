"use client";
import {
  Home,
  ShoppingCart,
  CreditCard,
  BarChart,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { href: "/", label: "Produtos", icon: Home },
  { href: "/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/creditos", label: "Créditos", icon: CreditCard, isCentral: true },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart,
    requiresAuth: true,
  },
  {
    href: "/gerenciar",
    label: "Gerenciar",
    icon: Settings,
    requiresAuth: true,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const { checkAuth } = useAuth();

  const handleNavClick = (item: (typeof navItems)[0], e: React.MouseEvent) => {
    if (item.requiresAuth && !checkAuth()) {
      e.preventDefault();
    }
  };

  return (
    <footer className="fixed bottom-0 w-full bg-card shadow-lg">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center"
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.isCentral ? (
                <div className="flex flex-col items-center">
                  <div className="relative -top-4 flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              ) : (
                <>
                  <item.icon
                    className={cn(
                      "w-6 h-6",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm mt-1",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
