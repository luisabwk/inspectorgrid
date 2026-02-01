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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
              "relative flex flex-col rounded-lg border-2 transition-all cursor-pointer bg-card p-2",
              "hover:shadow-md active:scale-[0.98]",
              isPlaced && "opacity-40 cursor-not-allowed",
              isSelected && "ring-2 ring-offset-2 ring-offset-background shadow-lg scale-[1.02]",
            )}
            style={{
              borderColor: suspect.color,
              '--tw-ring-color': suspect.color,
            } as React.CSSProperties}
          >
            {/* Portrait + Name Row */}
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-12 flex-shrink-0"
                style={{ color: suspect.color }}
              >
                {Portrait && <Portrait className="w-full h-full" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground leading-tight">
                  {suspect.name}
                </p>
                {suspect.isVictim && (
                  <p className="text-[10px] text-destructive font-semibold">⚰️ Vítima</p>
                )}
              </div>
            </div>

            {/* Clue */}
            {clue && (
              <p className="text-[11px] text-muted-foreground leading-snug mt-2 line-clamp-3">
                {formatClueText(clue.text, suspect.name)}
              </p>
            )}

            {/* Placed indicator */}
            {isPlaced && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg">
                <span className="text-lg font-bold text-primary">✓</span>
              </div>
            )}
          </div>
        );
      })}
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
