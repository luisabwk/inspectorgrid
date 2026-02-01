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
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
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
              "relative flex-shrink-0 flex flex-col items-center rounded-lg border-2 transition-all cursor-pointer bg-card p-1.5",
              "hover:shadow-md active:scale-[0.98]",
              isPlaced && "opacity-40 cursor-not-allowed",
              isSelected && "ring-2 ring-offset-1 ring-offset-background shadow-lg scale-[1.05]",
            )}
            style={{
              borderColor: suspect.color,
              '--tw-ring-color': suspect.color,
            } as React.CSSProperties}
          >
            {/* Portrait */}
            <div 
              className="w-8 h-10 sm:w-10 sm:h-12"
              style={{ color: suspect.color }}
            >
              {Portrait && <Portrait className="w-full h-full" />}
            </div>
            
            {/* Name */}
            <p className="text-[10px] sm:text-xs font-bold text-foreground leading-tight mt-0.5 text-center">
              {suspect.name.split(' ')[0]}
            </p>
            
            {suspect.isVictim && (
              <span className="text-[8px]">⚰️</span>
            )}

            {/* Placed indicator */}
            {isPlaced && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg">
                <span className="text-sm font-bold text-primary">✓</span>
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
