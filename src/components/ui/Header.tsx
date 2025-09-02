"use client";

import Image from "next/image";
import {
  User,
  LogOut,
  LogIn,
  Settings,
  CreditCard,
  Star,
  Coffee,
} from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
          <SheetContent side="left" className="flex flex-col w-80">
            <SheetHeader className="pb-4">
              <SheetTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Menu
              </SheetTitle>
            </SheetHeader>

            <div className="flex-grow p-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                  <p className="text-muted-foreground">Carregando...</p>
                </div>
              ) : session?.user ? (
                <div className="flex flex-col h-full space-y-6">
                  {/* Seção do Perfil */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage
                          src={session.user.image || undefined}
                          alt={session.user.name || "Usuário"}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {session.user.name
                            ? session.user.name[0].toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">
                          {session.user.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          <Star className="h-3 w-3 mr-1" />
                          Cliente VIP
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Seção de Créditos */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        Saldo Disponível
                      </p>
                      <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                      R$ 0,00
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      💡 Sistema de créditos em desenvolvimento
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-950/50"
                    >
                      <CreditCard className="h-3 w-3 mr-2" />
                      Adicionar Créditos
                    </Button>
                  </div>

                  <Separator />

                  {/* Menu de Opções */}
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 px-4"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Configurações</span>
                    </Button>

                    <div className="px-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        TEMA
                      </p>
                      <ModeToggle />
                    </div>
                  </div>

                  {/* Botão de Sair */}
                  <div className="mt-auto pt-4">
                    <Separator className="mb-4" />
                    <Button
                      variant="outline"
                      className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/50"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair da Conta
                    </Button>
                  </div>
                </div>
              ) : (
                // Estado não logado melhorado
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-4">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-full p-6 mb-4">
                      <Coffee className="h-16 w-16 text-primary" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">
                        Bem-vindo ao Bar da Teia!
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Faça login para acessar seu perfil, gerenciar créditos e
                        aproveitar todos os recursos do nosso bar.
                      </p>
                    </div>

                    <div className="w-full space-y-3">
                      <Button
                        onClick={handleLoginWithGoogleClick}
                        className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Entrar com Google
                      </Button>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>✨ Acesso a créditos digitais</p>
                        <p>🎯 Experiência personalizada</p>
                        <p>⭐ Status de cliente VIP</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
