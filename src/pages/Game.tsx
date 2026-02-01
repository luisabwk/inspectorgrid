import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/hooks/useGame";
import { testCase } from "@/data/testCase";
import { GameGrid } from "@/components/game/GameGrid";
import { SuspectPanel } from "@/components/game/SuspectPanel";
import { CluesPanel } from "@/components/game/CluesPanel";
import { GameControls } from "@/components/game/GameControls";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Trophy, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Game = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [resultDialog, setResultDialog] = useState<{ open: boolean; success: boolean; message: string }>({
    open: false,
    success: false,
    message: '',
  });

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
  } = useGame(testCase);

  const handleCheckSolution = () => {
    const result = checkSolution();
    setResultDialog({
      open: true,
      success: result.valid,
      message: result.message,
    });
  };

  const handleContinue = () => {
    setResultDialog({ open: false, success: false, message: '' });
    if (resultDialog.success) {
      toast({
        title: "Caso resolvido!",
        description: "Você ganhou 100 pontos.",
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">{testCase.title}</h1>
            <p className="text-xs text-muted-foreground">
              {placedCount}/{totalSuspects} suspeitos posicionados
            </p>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Left Column - Grid and Controls */}
          <div className="space-y-4">
            {/* Game Grid */}
            <div className="flex justify-center">
              <GameGrid
                cells={testCase.layoutConfig.cells}
                suspects={testCase.suspects}
                placements={placements}
                pencilMarks={pencilMarks}
                selectedCell={selectedCell}
                isPencilMode={isPencilMode}
                rooms={testCase.layoutConfig.rooms}
                onCellClick={handleCellClick}
                onCellDrop={handleCellDrop}
                onDragOver={handleDragOver}
              />
            </div>

            {/* Controls */}
            <GameControls
              isPencilMode={isPencilMode}
              onTogglePencilMode={setIsPencilMode}
              onClearCell={handleClearCell}
              onResetGame={handleResetGame}
              onCheckSolution={handleCheckSolution}
              canCheck={canCheck}
            />

            {/* Suspect Panel - Mobile */}
            <div className="lg:hidden">
              <SuspectPanel
                suspects={testCase.suspects}
                placements={placements}
                selectedSuspect={selectedSuspect}
                onSuspectSelect={handleSuspectSelect}
                onSuspectDragStart={handleDragStart}
              />
            </div>
          </div>

          {/* Right Column - Suspects and Clues */}
          <div className="space-y-4">
            {/* Suspect Panel - Desktop */}
            <div className="hidden lg:block">
              <SuspectPanel
                suspects={testCase.suspects}
                placements={placements}
                selectedSuspect={selectedSuspect}
                onSuspectSelect={handleSuspectSelect}
                onSuspectDragStart={handleDragStart}
              />
            </div>

            {/* Clues */}
            <CluesPanel clues={testCase.clues} />

            {/* Case Description */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                O Caso
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {testCase.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Result Dialog */}
      <Dialog open={resultDialog.open} onOpenChange={(open) => !open && setResultDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              {resultDialog.success ? (
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-destructive" />
                </div>
              )}
            </div>
            <DialogTitle className="text-center">
              {resultDialog.success ? 'Caso Resolvido!' : 'Continue Investigando'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {resultDialog.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleContinue}>
              {resultDialog.success ? 'Próximo Caso' : 'Continuar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
