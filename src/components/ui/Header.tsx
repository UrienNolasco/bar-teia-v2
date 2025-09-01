"use client";

import Image from "next/image";
import { User, LogOut, LogIn } from "lucide-react";
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
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const handleLoginWithGoogleClick = () => signIn("google");

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
        <Sheet>
          <SheetTrigger>
            <div className="relative">
              <User className="h-6 w-6" />
              {session?.user && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex-grow">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-muted-foreground">Carregando...</p>
                </div>
              ) : session?.user ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 p-4">
                    <Avatar>
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "Usuário"}
                      />
                      <AvatarFallback>
                        {session.user.name
                          ? session.user.name[0].toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{session.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">Créditos</p>
                    <p className="text-2xl font-bold">R$ 0.00</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sistema de créditos em desenvolvimento
                    </p>
                  </div>
                  <div className="p-4">
                    <ModeToggle />
                  </div>
                  <div className="mt-auto p-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Button onClick={handleLoginWithGoogleClick}>
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
