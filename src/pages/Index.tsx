import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Search, FileText, Play } from "lucide-react";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Soft decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-accent/20" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">InspectorGrid</h1>
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
      <main className="container mx-auto px-4 py-12 relative z-10">
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
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Novo Caso</h3>
              <p className="text-sm text-muted-foreground">
                Inicie uma nova investigação e descubra o culpado.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card/50 cursor-not-allowed opacity-60">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Continuar</h3>
              <p className="text-sm text-muted-foreground">
                Em breve: Retome uma investigação em andamento.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-muted">Nível 1</span>
              <span>0 casos resolvidos</span>
              <span>0 pontos</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
