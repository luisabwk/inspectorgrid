import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/hooks/useGame";
import { useNextCase } from "@/hooks/useCases";
import { useProgress } from "@/hooks/useProgress";
import { GameGrid } from "@/components/game/GameGrid";
import { SuspectClueCards } from "@/components/game/SuspectClueCards";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Trophy, XCircle, Info, Loader2, Home, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Game = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { getPlayerStats } = useProgress();
  
  const [playerLevel, setPlayerLevel] = useState(1);
  const [startTime] = useState(() => Date.now());
  const [resultDialog, setResultDialog] = useState<{ 
    open: boolean; 
    success: boolean; 
    message: string;
    score?: number;
    levelUp?: boolean;
    newLevel?: number;
  }>({
    open: false,
    success: false,
    message: '',
  });

  // Load player stats on mount
  useEffect(() => {
    const loadStats = async () => {
      const stats = await getPlayerStats();
      if (stats) {
        setPlayerLevel(stats.level);
      }
    };
    if (user) {
      loadStats();
    }
  }, [user]);

  // Load case based on player level
  const { gameCase, loading, error } = useNextCase(playerLevel);

  const {
    placements,
    pencilMarks,
    selectedSuspect,
    selectedCell,
    isPencilMode,
    placedCount,
    totalSuspects,
    canCheck,
    handleSuspectSelect,
    handleCellClick,
    handleDragStart,
    handleDragOver,
    handleCellDrop,
    handleClearCell,
    handleResetGame,
    checkSolution,
    setIsPencilMode,
  } = useGame(gameCase);

  const handleCheckSolution = async () => {
    if (!gameCase) return;
    
    // Calculate time taken and pass to server
    const timeTakenSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    // Server handles both validation AND progress recording atomically
    const result = await checkSolution(timeTakenSeconds);
    
    if (result.valid) {
      // Refresh player stats after successful completion
      if (user && !result.alreadyCompleted) {
        const stats = await getPlayerStats();
        if (stats && stats.level > playerLevel) {
          setResultDialog({
            open: true,
            success: true,
            message: `Você resolveu o caso em ${formatTime(timeTakenSeconds)}!`,
            score: result.score,
            levelUp: true,
            newLevel: stats.level,
          });
          setPlayerLevel(stats.level);
          return;
        }
      }
      
      setResultDialog({
        open: true,
        success: true,
        message: result.alreadyCompleted 
          ? result.message 
          : `Você resolveu o caso em ${formatTime(timeTakenSeconds)}!`,
        score: result.score,
      });
    } else {
      setResultDialog({
        open: true,
        success: false,
        message: result.message,
      });
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const handleNextCase = () => {
    setResultDialog({ open: false, success: false, message: '' });
    // Increment level to trigger loading next case
    setPlayerLevel(prev => prev + 1);
    window.location.reload(); // Simple refresh to load new case
  };

  const handleGoHome = () => {
    setResultDialog({ open: false, success: false, message: '' });
    navigate('/');
  };

  const handleContinue = () => {
    setResultDialog({ open: false, success: false, message: '' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 pixel-card p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground font-pixel">Carregando caso...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !gameCase) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center pixel-card p-8">
          <XCircle className="w-12 h-12 text-destructive" />
          <h2 className="font-pixel-title text-sm">Erro ao carregar caso</h2>
          <p className="text-muted-foreground font-pixel">{error || "Nenhum caso disponível"}</p>
          <button onClick={() => navigate('/')} className="pixel-btn">
            <Home className="w-4 h-4 mr-2 inline" />
            Voltar ao Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header */}
      <header className="wood-panel mx-2 mt-2 sticky top-2 z-50">
        <div className="container mx-auto px-3 py-2 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="pixel-btn-secondary px-2 py-1 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-center cursor-pointer flex items-center gap-2 hover:opacity-80">
                <span className="font-pixel-title text-xs text-foreground">{gameCase.title}</span>
                <Info className="w-4 h-4 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="pixel-card max-w-xs text-center">
              <p className="font-pixel text-sm">{gameCase.description}</p>
              <p className="text-xs text-muted-foreground mt-2 font-pixel">Dificuldade: {gameCase.difficulty}</p>
            </PopoverContent>
          </Popover>
          
          <div className="font-pixel text-sm text-muted-foreground">{placedCount}/{totalSuspects}</div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 container mx-auto px-2 py-3 flex flex-col gap-3 overflow-hidden">
        {/* Suspects Panel */}
        <SuspectClueCards
          suspects={gameCase.suspects}
          clues={gameCase.clues}
          placements={placements}
          selectedSuspect={selectedSuspect}
          onSuspectSelect={handleSuspectSelect}
          onSuspectDragStart={handleDragStart}
        />

        {/* Grid */}
        <div className="flex-1 flex flex-col items-center gap-3 min-h-0">
          {/* Selected suspect indicator */}
          {selectedSuspect && (
            <p className="font-pixel text-xs text-muted-foreground text-center">
              Toque em uma célula para posicionar{' '}
              <span className="font-bold text-foreground">
                {gameCase.suspects.find(s => s.id === selectedSuspect)?.name}
              </span>
            </p>
          )}

          <div className="w-full max-w-[90vw] sm:max-w-[420px] lg:max-w-[480px] mx-auto p-2">
            <GameGrid
              cells={gameCase.layoutConfig.cells}
              suspects={gameCase.suspects}
              placements={placements}
              pencilMarks={pencilMarks}
              selectedCell={selectedCell}
              selectedSuspect={selectedSuspect}
              isPencilMode={isPencilMode}
              rooms={gameCase.layoutConfig.rooms}
              onCellClick={handleCellClick}
              onCellDrop={handleCellDrop}
              onDragOver={handleDragOver}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetGame}
              className="pixel-btn-secondary px-4 py-2 text-sm"
            >
              Reiniciar
            </button>
            <button
              onClick={handleCheckSolution}
              disabled={!canCheck}
              className="pixel-btn px-6 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verificar
            </button>
          </div>
        </div>
      </main>

      {/* Result Dialog */}
      <Dialog open={resultDialog.open} onOpenChange={(open) => !open && handleContinue()}>
        <DialogContent className="pixel-card sm:max-w-md border-0">
          <DialogHeader>
            <div className="mx-auto mb-4">
              {resultDialog.success ? (
                <div className="w-16 h-16 flex items-center justify-center bg-primary pixel-border">
                  <Trophy className="w-8 h-8 text-primary-foreground" />
                </div>
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-destructive pixel-border">
                  <XCircle className="w-8 h-8 text-destructive-foreground" />
                </div>
              )}
            </div>
            <DialogTitle className="text-center font-pixel-title text-sm">
              {resultDialog.success ? 'Caso Resolvido!' : 'Continue Investigando'}
            </DialogTitle>
            <DialogDescription className="text-center space-y-2 font-pixel">
              <p>{resultDialog.message}</p>
              {resultDialog.success && resultDialog.score && (
                <p className="text-lg font-bold text-primary">+{resultDialog.score} pontos</p>
              )}
              {resultDialog.levelUp && (
                <p className="text-sm text-primary font-bold animate-pixel-pulse">
                  ⭐ Subiu para o Nível {resultDialog.newLevel}!
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-3">
            {resultDialog.success ? (
              <>
                <button onClick={handleGoHome} className="pixel-btn-secondary px-4 py-2">
                  <Home className="w-4 h-4 mr-2 inline" />
                  Menu
                </button>
                <button onClick={handleNextCase} className="pixel-btn px-4 py-2">
                  Próximo Caso
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </button>
              </>
            ) : (
              <button onClick={handleContinue} className="pixel-btn px-6 py-2">
                Continuar
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
