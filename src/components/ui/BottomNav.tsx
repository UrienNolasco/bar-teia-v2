
"use client";
import { Home, ShoppingCart, CreditCard, BarChart, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Produtos', icon: Home },
  { href: '/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/creditos', label: 'Créditos', icon: CreditCard, isCentral: true },
  { href: '/analytics', label: 'Analytics', icon: BarChart },
  { href: '/gerenciar', label: 'Gerenciar', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-lg">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center">
              {item.isCentral ? (
                <div className="flex flex-col items-center">
                  <div className="relative -top-4 flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              ) : (
                <>
                  <item.icon className={cn("w-6 h-6", isActive ? "text-blue-500" : "text-gray-500")} />
                  <span className={cn("text-sm mt-1", isActive ? "text-blue-500" : "text-gray-500")}>{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
