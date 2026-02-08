import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { useState, useEffect } from "react";
import { Trophy, Play, LogOut, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { getPlayerStats } = useProgress();
  const [stats, setStats] = useState<{ level: number; totalScore: number } | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      if (user) {
        const playerStats = await getPlayerStats();
        if (playerStats) {
          setStats({ level: playerStats.level, totalScore: playerStats.totalScore });
        }
      }
    };
    loadStats();
  }, [user, getPlayerStats]);

  const handlePlay = () => {
    navigate('/game');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* Header */}
      <header className="pixel-card mx-4 mt-4">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="font-pixel-title text-xs text-primary">Inspector Grid</h1>
          {user && (
            <button 
              onClick={handleSignOut}
              className="pixel-btn-secondary px-3 py-1 text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        {/* Game Title */}
        <div className="text-center">
          <h2 className="font-pixel-title text-lg text-foreground mb-2">
            Inspector Grid
          </h2>
          <p className="font-pixel text-muted-foreground text-lg">
            Resolva mistérios usando lógica dedutiva
          </p>
        </div>

        {/* Stats Card */}
        {user && stats && (
          <div className="pixel-card p-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span className="font-pixel text-sm">Nível {stats.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              <span className="font-pixel text-sm">{stats.totalScore} pts</span>
            </div>
          </div>
        )}

        {/* Play Button */}
        <button 
          onClick={handlePlay}
          className="pixel-btn px-8 py-4 text-xl flex items-center gap-3"
        >
          <Play className="w-6 h-6" />
          Jogar
        </button>

        {/* Instructions */}
        <div className="pixel-card p-4 max-w-md text-center">
          <h3 className="font-pixel-title text-xs text-foreground mb-3">Como Jogar</h3>
          <ul className="font-pixel text-sm text-muted-foreground space-y-2">
            <li>• Posicione os suspeitos no grid</li>
            <li>• Use as pistas para deduzir as posições</li>
            <li>• Cada suspeito ocupa uma célula única</li>
            <li>• Nenhum suspeito pode estar na mesma linha ou coluna</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="font-pixel text-xs text-muted-foreground">
          © 2024 Inspector Grid
        </p>
      </footer>
    </div>
  );
};

export default Index;
