import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, Search, FileText, Play, Star, Trophy } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { getPlayerStats } = useProgress();
  const [stats, setStats] = useState<{ level: number; score: number; cases: number } | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const playerStats = await getPlayerStats();
      if (playerStats) {
        setStats({
          level: playerStats.level,
          score: playerStats.totalScore,
          cases: playerStats.completedCases
        });
      }
    };
    if (user) {
      loadStats();
    }
  }, [user]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Pixel art background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sky */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(200 70% 75%) 0%, hsl(40 60% 80%) 70%, hsl(35 45% 85%) 100%)'
          }}
        />
        {/* Sun */}
        <div 
          className="absolute top-12 right-[15%] w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 70%) 0%, hsl(35 90% 60%) 100%)',
            boxShadow: '0 0 40px hsl(45 100% 70% / 0.5)'
          }}
        />
        {/* Clouds */}
        <div className="absolute top-16 left-[8%] w-28 h-10 bg-white/80" style={{ clipPath: 'polygon(0 60%, 10% 20%, 30% 0, 70% 0, 90% 20%, 100% 60%, 90% 100%, 10% 100%)' }} />
        <div className="absolute top-8 left-[30%] w-20 h-8 bg-white/70" style={{ clipPath: 'polygon(0 60%, 15% 0, 85% 0, 100% 60%, 85% 100%, 15% 100%)' }} />
        
        {/* Hills */}
        <div 
          className="absolute bottom-24 left-0 right-0 h-40"
          style={{
            background: 'hsl(120 30% 50%)',
            clipPath: 'polygon(0 100%, 0 60%, 15% 30%, 35% 50%, 55% 20%, 75% 45%, 100% 25%, 100% 100%)'
          }}
        />
        
        {/* Ground */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-28"
          style={{
            background: 'linear-gradient(180deg, hsl(120 35% 45%) 0%, hsl(120 40% 35%) 100%)'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 wood-panel mx-4 mt-4">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-primary pixel-border-thin">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-pixel-title text-sm text-foreground">InspectorGrid</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block font-pixel">
              {user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground font-pixel"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Welcome card */}
          <div className="pixel-card p-6 text-center space-y-4">
            <h2 className="font-pixel-title text-base text-foreground">
              Bem-vindo, Detetive
            </h2>
            <p className="text-lg text-muted-foreground font-pixel">
              Prepare-se para resolver casos misteriosos usando lógica e dedução.
            </p>
          </div>

          {/* Game options */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div 
              onClick={() => navigate('/game')}
              className="pixel-card p-5 cursor-pointer group hover:translate-y-[-2px] transition-transform"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-primary pixel-border-thin mb-4 group-hover:animate-pixel-bounce">
                <Play className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-pixel-title text-xs text-foreground mb-2">Novo Caso</h3>
              <p className="text-base text-muted-foreground font-pixel">
                Inicie uma nova investigação e descubra o culpado.
              </p>
            </div>
            
            <div className="pixel-card p-5 opacity-60 cursor-not-allowed">
              <div className="w-14 h-14 flex items-center justify-center bg-muted pixel-border-thin mb-4">
                <FileText className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-pixel-title text-xs text-foreground mb-2">Continuar</h3>
              <p className="text-base text-muted-foreground font-pixel">
                Em breve: Retome uma investigação em andamento.
              </p>
            </div>
          </div>

          {/* Stats panel */}
          <div className="wood-panel p-4">
            <div className="flex items-center justify-center gap-6 flex-wrap font-pixel text-base">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                <span>Nível {stats?.level || 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                <span>{stats?.cases || 0} casos</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>{stats?.score || 0} pts</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
