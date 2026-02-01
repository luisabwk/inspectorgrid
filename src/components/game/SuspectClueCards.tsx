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
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
        Suspeitos & Pistas
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {suspects.map((suspect) => {
          const isPlaced = placedSuspects.has(suspect.id);
          const isSelected = selectedSuspect === suspect.id;
          const Portrait = PortraitMap[suspect.portraitId];
          const clue = findClueForSuspect(suspect, clues);

          return (
            <div
              key={suspect.id}
              className="flex flex-col"
            >
              {/* Portrait Card */}
              <div
                draggable={!isPlaced}
                onDragStart={(e) => onSuspectDragStart(e, suspect.id)}
                onClick={() => !isPlaced && onSuspectSelect(suspect.id)}
                className={cn(
                  "relative flex flex-col items-center p-3 rounded-lg border-4 transition-all cursor-pointer bg-card",
                  "hover:shadow-lg hover:scale-[1.02]",
                  isPlaced && "opacity-50 cursor-not-allowed",
                  isSelected && "ring-2 ring-offset-2 ring-offset-background shadow-lg scale-[1.02]",
                )}
                style={{
                  borderColor: suspect.color,
                  '--tw-ring-color': suspect.color,
                } as React.CSSProperties}
              >
                {/* Portrait */}
                <div 
                  className="w-16 h-20 sm:w-20 sm:h-24 drop-shadow-sm flex-shrink-0"
                  style={{ color: suspect.color }}
                >
                  {Portrait && <Portrait className="w-full h-full" />}
                </div>
                
                {/* Name Banner */}
                <div 
                  className="w-[calc(100%+24px)] text-center py-1.5 -mx-3 mt-2 -mb-3 rounded-b-md"
                  style={{ 
                    backgroundColor: suspect.color,
                  }}
                >
                  <p className="text-sm font-bold text-white drop-shadow-sm px-2" style={{
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)'
                  }}>
                    {suspect.name}
                  </p>
                  {suspect.isVictim && (
                    <p className="text-[10px] text-white/80 font-medium -mt-0.5">A Vítima</p>
                  )}
                </div>

                {/* Placed indicator */}
                {isPlaced && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg">
                    <span className="text-lg font-bold text-muted-foreground">✓</span>
                  </div>
                )}
              </div>

              {/* Clue attached below */}
              {clue && (
                <div 
                  className="mt-1 mx-0.5 p-2 bg-card border border-border rounded-lg shadow-sm"
                >
                  <p className="text-[11px] sm:text-xs text-foreground leading-snug">
                    {formatClueText(clue.text, suspect.name)}
                  </p>
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
