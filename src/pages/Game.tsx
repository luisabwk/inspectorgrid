import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/hooks/useGame";
import { testCase } from "@/data/testCase";
import { GameGrid } from "@/components/game/GameGrid";
import { SuspectClueCards } from "@/components/game/SuspectClueCards";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeft, Trophy, XCircle, Info, ChevronDown, ChevronUp, Users } from "lucide-react";
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
  const [suspectsOpen, setSuspectsOpen] = useState(true);

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
    <div className="min-h-[100dvh] bg-background flex flex-col">
      {/* Header - compact */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-2 py-1.5 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="h-7 px-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-center cursor-pointer flex items-center gap-1">
                <span className="text-sm font-bold text-foreground">{testCase.title}</span>
                <Info className="w-3 h-3 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="max-w-xs text-center">
              <p className="text-sm">{testCase.description}</p>
            </PopoverContent>
          </Popover>
          
          <div className="text-xs text-muted-foreground">{placedCount}/{totalSuspects}</div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 container mx-auto px-2 py-2 flex flex-col gap-2 overflow-hidden">
        {/* Collapsible Suspects Panel */}
        <Collapsible open={suspectsOpen} onOpenChange={setSuspectsOpen} className="flex-shrink-0">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-between h-7 px-2 mb-1">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">Suspeitos</span>
                <span className="text-xs text-muted-foreground">({placedCount}/{totalSuspects})</span>
              </div>
              {suspectsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SuspectClueCards
              suspects={testCase.suspects}
              clues={testCase.clues}
              placements={placements}
              selectedSuspect={selectedSuspect}
              onSuspectSelect={handleSuspectSelect}
              onSuspectDragStart={handleDragStart}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Grid - fills remaining space */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 min-h-0">
          {/* Selected suspect indicator */}
          {selectedSuspect && (
            <p className="text-xs text-muted-foreground text-center">
              Toque em uma célula para posicionar{' '}
              <span className="font-bold text-foreground">
                {testCase.suspects.find(s => s.id === selectedSuspect)?.name}
              </span>
            </p>
          )}

          <div className="w-full max-w-[90vw] sm:max-w-[420px] lg:max-w-[480px] aspect-square">
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

          {/* Minimal Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetGame}
              className="h-8 px-3 text-xs"
            >
              Reiniciar
            </Button>
            <Button
              size="sm"
              onClick={handleCheckSolution}
              disabled={!canCheck}
              className="h-8 px-4 text-xs"
            >
              Verificar
            </Button>
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
