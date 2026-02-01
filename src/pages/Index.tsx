import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Search, FileText, Play } from "lucide-react";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">MURDOKU</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              Bem-vindo, Detetive
            </h2>
            <p className="text-lg text-muted-foreground">
              Prepare-se para resolver casos misteriosos usando lógica e dedução.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div 
              onClick={() => navigate('/game')}
              className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <Play className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-2">Novo Caso</h3>
              <p className="text-sm text-muted-foreground">
                Inicie uma nova investigação e descubra o culpado.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group opacity-50">
              <FileText className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-2">Continuar</h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Retome uma investigação em andamento.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground font-mono">
              NÍVEL 1 • 0 CASOS RESOLVIDOS • 0 PONTOS
            </p>
          </div>
        </div>
      </main>

      {/* Footer decoration */}
      <div className="fixed bottom-4 left-4 text-muted-foreground/20 text-xs font-mono">
        ARQUIVO CONFIDENCIAL
      </div>
    </div>
  );
};

export default Index;
