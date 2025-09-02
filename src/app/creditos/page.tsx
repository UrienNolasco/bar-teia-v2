import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { PlusCircle, Wallet } from "lucide-react";

export default function CreditosPage() {
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
            R$ 125,00
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Pacote Básico",
            price: "25,00",
          },
          {
            title: "Pacote Padrão",
            price: "50,00",
          },
          {
            title: "Pacote Premium",
            price: "100,00",
          },
        ].map((pkg) => (
          <Card
            key={pkg.title}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 flex flex-col"
          >
            <CardTitle className="text-2xl font-bold">{pkg.title}</CardTitle>
            <CardContent className="text-4xl font-extrabold my-4 text-center">
              R$ {pkg.price}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full bg-blue-400 text-white">
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
