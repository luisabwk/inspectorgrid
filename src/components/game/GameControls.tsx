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
    <div className="flex flex-wrap items-center gap-1.5">
      <Button
        variant={isPencilMode ? "default" : "outline"}
        size="sm"
        onClick={onTogglePencilMode}
        className={cn(
          "h-7 px-2 text-xs gap-1",
          isPencilMode && "bg-warning text-warning-foreground hover:bg-warning/90"
        )}
      >
        <Pencil className="w-3 h-3" />
        Notas
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onClearCell}
        className="h-7 px-2 text-xs gap-1"
      >
        <Eraser className="w-3 h-3" />
        Limpar
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onResetGame}
        className="h-7 px-2 text-xs gap-1 text-destructive hover:text-destructive"
      >
        <RotateCcw className="w-3 h-3" />
      </Button>
      
      <Button
        variant="default"
        size="sm"
        onClick={onCheckSolution}
        disabled={!canCheck}
        className="h-7 px-2 text-xs gap-1 ml-auto"
      >
        <Check className="w-3 h-3" />
        Verificar
      </Button>
    </div>
  );
};
