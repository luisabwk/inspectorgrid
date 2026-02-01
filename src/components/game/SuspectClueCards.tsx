import { Suspect, Clue, PlacementState } from "@/types/game";
import { cn } from "@/lib/utils";
import { PortraitMap } from "./assets/SuspectPortraits";

interface SuspectClueCardsProps {
  suspects: Suspect[];
  clues: Clue[];
  placements: PlacementState;
  selectedSuspect: string | null;
  onSuspectSelect: (suspectId: string) => void;
  onSuspectDragStart: (e: React.DragEvent, suspectId: string) => void;
}

// Map suspect names to their clues
const findClueForSuspect = (suspect: Suspect, clues: Clue[]): Clue | undefined => {
  return clues.find(clue => 
    clue.text.toLowerCase().includes(suspect.name.toLowerCase())
  );
};

export const SuspectClueCards = ({
  suspects,
  clues,
  placements,
  selectedSuspect,
  onSuspectSelect,
  onSuspectDragStart,
}: SuspectClueCardsProps) => {
  const placedSuspects = new Set(Object.values(placements).filter(Boolean));

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">
        Suspeitos & Pistas
      </h3>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {suspects.map((suspect) => {
          const isPlaced = placedSuspects.has(suspect.id);
          const isSelected = selectedSuspect === suspect.id;
          const Portrait = PortraitMap[suspect.portraitId];
          const clue = findClueForSuspect(suspect, clues);

          return (
            <div
              key={suspect.id}
              draggable={!isPlaced}
              onDragStart={(e) => onSuspectDragStart(e, suspect.id)}
              onClick={() => !isPlaced && onSuspectSelect(suspect.id)}
              className={cn(
                "relative flex flex-col rounded-md border-2 transition-all cursor-pointer bg-card overflow-hidden",
                "hover:shadow-md active:scale-[0.98]",
                isPlaced && "opacity-50 cursor-not-allowed",
                isSelected && "ring-2 ring-offset-1 ring-offset-background shadow-md",
              )}
              style={{
                borderColor: suspect.color,
                '--tw-ring-color': suspect.color,
              } as React.CSSProperties}
            >
              {/* Portrait - compact */}
              <div className="flex items-center gap-1.5 p-1.5 pb-0">
                <div 
                  className="w-8 h-10 sm:w-10 sm:h-12 flex-shrink-0"
                  style={{ color: suspect.color }}
                >
                  {Portrait && <Portrait className="w-full h-full" />}
                </div>
                
                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs font-bold text-foreground leading-tight truncate">
                    {suspect.name}
                  </p>
                  {suspect.isVictim && (
                    <p className="text-[8px] sm:text-[9px] text-muted-foreground font-medium">Vítima</p>
                  )}
                </div>
              </div>

              {/* Clue - compact */}
              {clue && (
                <div className="px-1.5 py-1 mt-0.5">
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight line-clamp-2">
                    {formatClueText(clue.text, suspect.name)}
                  </p>
                </div>
              )}

              {/* Placed indicator */}
              {isPlaced && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                  <span className="text-sm font-bold text-muted-foreground">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Format clue text - remove suspect name from beginning if present
const formatClueText = (text: string, suspectName: string): string => {
  // Remove patterns like "Alberto estava" -> "Estava"
  const pattern = new RegExp(`^${suspectName}\\s+`, 'i');
  let result = text.replace(pattern, '');
  
  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  return result;
};
