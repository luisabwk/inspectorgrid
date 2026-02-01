import { Suspect, PlacementState, getCellKey } from "@/types/game";
import { cn } from "@/lib/utils";
import { PortraitMap } from "./assets/SuspectPortraits";

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
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
        Suspeitos
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {suspects.map((suspect) => {
          const isPlaced = placedSuspects.has(suspect.id);
          const isSelected = selectedSuspect === suspect.id;
          const Portrait = PortraitMap[suspect.portraitId];
          
          return (
            <div
              key={suspect.id}
              draggable={!isPlaced}
              onDragStart={(e) => onSuspectDragStart(e, suspect.id)}
              onClick={() => !isPlaced && onSuspectSelect(suspect.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all cursor-pointer",
                "hover:shadow-md",
                isPlaced && "opacity-40 cursor-not-allowed grayscale",
                isSelected && "ring-2 ring-offset-2 ring-offset-background",
                !isPlaced && !isSelected && "border-border bg-card hover:border-primary/30"
              )}
              style={{
                borderColor: isSelected ? suspect.color : undefined,
                '--tw-ring-color': isSelected ? suspect.color : undefined,
              } as React.CSSProperties}
            >
              <div 
                className="w-14 h-16 drop-shadow-sm"
                style={{ color: suspect.color }}
              >
                {Portrait && <Portrait className="w-full h-full" />}
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-xs font-medium leading-tight",
                  isPlaced ? "text-muted-foreground" : "text-foreground"
                )}>
                  {suspect.name}
                </p>
                {isPlaced && (
                  <p className="text-xs text-muted-foreground mt-0.5">Posicionado</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
