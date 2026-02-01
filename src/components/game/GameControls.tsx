import { Button } from "@/components/ui/button";
import { Pencil, RotateCcw, Check, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  isPencilMode: boolean;
  onTogglePencilMode: () => void;
  onClearCell: () => void;
  onResetGame: () => void;
  onCheckSolution: () => void;
  canCheck: boolean;
}

export const GameControls = ({
  isPencilMode,
  onTogglePencilMode,
  onClearCell,
  onResetGame,
  onCheckSolution,
  canCheck,
}: GameControlsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={isPencilMode ? "default" : "outline"}
        size="sm"
        onClick={onTogglePencilMode}
        className={cn(
          "gap-2",
          isPencilMode && "bg-warning text-warning-foreground hover:bg-warning/90"
        )}
      >
        <Pencil className="w-4 h-4" />
        Notas
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onClearCell}
        className="gap-2"
      >
        <Eraser className="w-4 h-4" />
        Limpar
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onResetGame}
        className="gap-2 text-destructive hover:text-destructive"
      >
        <RotateCcw className="w-4 h-4" />
        Reiniciar
      </Button>
      
      <Button
        variant="default"
        size="sm"
        onClick={onCheckSolution}
        disabled={!canCheck}
        className="gap-2 ml-auto"
      >
        <Check className="w-4 h-4" />
        Verificar
      </Button>
    </div>
  );
};
