"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { PlusCircle, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CreditosPage() {
  const { data: session, status } = useSession();
  return (
    <div className="p-8 space-y-4">
      {/* header section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Comprar Créditos
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-left">
          Adicione saldo à sua carteira digital e desfrute de todas as
          facilidades do frigobar. Escolha o pacote que melhor se adapta às suas
          necessidades.
        </p>
      </div>
      {/* credits section */}
      <div className="py-4">
        <Card className="relative p-6">
          <CardTitle className="flex items-center justify-between text-2xl">
            <span>Seu Saldo Atual</span>
            <Wallet className="w-6 h-6 text-green-500" />
          </CardTitle>
          <CardContent className="text-4xl font-bold text-green-500 mt-4">
            {status === "loading" ? (
              <div className="animate-pulse bg-gray-200 h-12 w-32 rounded"></div>
            ) : (
              `R$ ${Number(session?.user?.credits || 0).toFixed(2)}`
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Pacote Básico",
            price: "25,00",
            bg: "bg-gradient-to-br from-blue-500 to-blue-700",
            button: "bg-blue-600 hover:bg-blue-500",
          },
          {
            title: "Pacote Padrão",
            price: "50,00",
            bg: "bg-gradient-to-br from-green-500 to-green-700",
            button: "bg-green-600 hover:bg-green-500",
            popular: true,
          },
          {
            title: "Pacote Premium",
            price: "100,00",
            bg: "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500",
            button:
              "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 font-bold",
            textColor: "text-gray-900",
          },
        ].map((pkg) => (
          <Card
            key={pkg.title}
            className={`relative p-6 flex flex-col overflow-hidden transition-transform hover:scale-105 duration-300 ${
              pkg.bg
            } ${pkg.textColor || "text-white"}`}
          >
            {pkg.popular && (
              <div className="absolute top-3 -right-11 transform rotate-45 bg-white text-green-700 px-10 py-1 text-sm font-bold z-10">
                Popular
              </div>
            )}
            <CardTitle className="text-2xl font-bold">{pkg.title}</CardTitle>
            <CardContent className="text-5xl font-extrabold my-6 text-center">
              R$ {pkg.price}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className={`w-full text-white ${pkg.button}`}>
                <PlusCircle className="w-5 h-5 mr-2" />
                Adicionar Saldo
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
