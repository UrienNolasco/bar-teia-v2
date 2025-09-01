"use client";

import Image from "next/image";
import { User, LogOut, LogIn } from "lucide-react";
import { User as UserType } from "@/types/user";
import { useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/CartSheet";

export function Header() {
  const [user] = useState<UserType | null>({
    id: "1",
    name: "shadcn",
    email: "shadcn@example.com",
    image: "https://github.com/shadcn.png",
    credits: 100,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
            Nova Versão, Nova Experiência!
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <CartSheet />
        <Sheet>
          <SheetTrigger>
            <User className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex-grow">
              {isLoggedIn && user ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 p-4">
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Créditos</p>
                    <p className="text-2xl font-bold">
                      R$ {user.credits.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4">
                    <ModeToggle />
                  </div>
                  <div className="mt-auto p-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Button onClick={() => setIsLoggedIn(true)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Logar com Google
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}