"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-card shadow-md">
      <div className="flex items-center space-x-4">
        <Image
          src="/logoteia.svg"
          alt="Bar da Teia Logo"
          width={40}
          height={40}
        />
        <div>
          <h1 className="text-lg font-bold">Bar da Teia</h1>
          <p className="text-sm text-muted-foreground">
            Nova versão agora com pagamentos reais
          </p>
        </div>
      </div>
      <Sheet>
        <SheetTrigger>
          <User className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>This is the user menu.</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
