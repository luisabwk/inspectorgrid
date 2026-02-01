import { Suspect, PlacementState, getCellKey } from "@/types/game";
import { cn } from "@/lib/utils";

interface SuspectPanelProps {
  suspects: Suspect[];
  placements: PlacementState;
  selectedSuspect: string | null;
  onSuspectSelect: (suspectId: string) => void;
  onSuspectDragStart: (e: React.DragEvent, suspectId: string) => void;
}

export const SuspectPanel = ({
  suspects,
  placements,
  selectedSuspect,
  onSuspectSelect,
  onSuspectDragStart,
}: SuspectPanelProps) => {
  // Find which suspects are already placed
  const placedSuspects = new Set(Object.values(placements).filter(Boolean));
  
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
        Suspeitos
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {suspects.map((suspect) => {
          const isPlaced = placedSuspects.has(suspect.id);
          const isSelected = selectedSuspect === suspect.id;
          
          return (
            <div
              key={suspect.id}
              draggable={!isPlaced}
              onDragStart={(e) => onSuspectDragStart(e, suspect.id)}
              onClick={() => !isPlaced && onSuspectSelect(suspect.id)}
              className={cn(
                "flex items-center gap-2 p-2 rounded-md border transition-all cursor-pointer",
                "hover:border-primary/50",
                isPlaced && "opacity-40 cursor-not-allowed",
                isSelected && "ring-2 ring-primary border-primary bg-primary/10",
                !isPlaced && !isSelected && "border-border bg-card hover:bg-accent/20"
              )}
              style={{
                borderColor: isSelected ? suspect.color : undefined,
              }}
            >
              <div className="text-2xl">{suspect.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-xs font-medium truncate",
                  isPlaced ? "text-muted-foreground" : "text-foreground"
                )}>
                  {suspect.name}
                </p>
                {isPlaced && (
                  <p className="text-xs text-muted-foreground">Posicionado</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
