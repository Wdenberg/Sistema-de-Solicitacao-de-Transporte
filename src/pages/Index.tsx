import { TransportForm } from "@/components/transport-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="bg-card border-b shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">SE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Secretaria de Educação e Esportes
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistema de Solicitação de Transporte
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <TransportForm />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Secretaria de Educação e Esportes de Pernambuco - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;