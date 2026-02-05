import { Suspect, Clue, PlacementState } from "@/types/game";
import { cn } from "@/lib/utils";
import { PortraitMap } from "./assets/SuspectPortraits";
import { useRef, useEffect } from "react";

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

// Format clue text - remove suspect name from beginning if present
const formatClueText = (text: string, suspectName: string): string => {
  const pattern = new RegExp(`^${suspectName}\\s+`, 'i');
  let result = text.replace(pattern, '');
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  // Scroll to selected suspect when it changes
  useEffect(() => {
    if (selectedSuspect && selectedRef.current && containerRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedSuspect]);

  return (
    <div>
      {/* Suspect cards row */}
      <div 
        ref={containerRef}
        className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin items-stretch justify-center"
      >
        {suspects.map((suspect) => {
          const isPlaced = placedSuspects.has(suspect.id);
          const isSelected = selectedSuspect === suspect.id;
          const Portrait = PortraitMap[suspect.portraitId];
          const isVictim = suspect.isVictim;
          const suspectClue = findClueForSuspect(suspect, clues);

          return (
            <div
              key={suspect.id}
              ref={isSelected ? selectedRef : null}
              draggable={!isPlaced}
              onDragStart={(e) => onSuspectDragStart(e, suspect.id)}
              onClick={() => !isPlaced && onSuspectSelect(suspect.id)}
              className={cn(
                "relative flex-shrink-0 transition-all duration-150 cursor-pointer",
                "pixel-border-thin bg-card",
                "w-40 sm:w-44",
                "flex flex-row gap-2 p-2",
                isPlaced && "opacity-40 cursor-not-allowed",
                isSelected && "translate-y-[-2px]",
                isVictim && "bg-red-50 border-red-400",
              )}
              style={{
                boxShadow: isSelected 
                  ? isVictim 
                    ? '3px 3px 0 hsl(0 65% 40%)' 
                    : '3px 3px 0 hsl(140 45% 30%)'
                  : undefined
              }}
            >
              {/* Avatar */}
              <div 
                className={cn(
                  "flex-shrink-0 w-10 h-12 overflow-hidden",
                  isVictim && "border-2 border-red-600"
                )}
                style={{ imageRendering: 'pixelated' }}
              >
                {Portrait && <Portrait className="w-full h-full" />}
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className={cn(
                  "text-xs font-bold leading-tight truncate",
                  isVictim ? "text-red-700" : "text-foreground"
                )}>
                  {suspect.name.split(' ')[0]}
                </p>
                
                {suspectClue && (
                  <p className="text-[10px] text-muted-foreground leading-tight mt-1 line-clamp-3">
                    {formatClueText(suspectClue.text, suspect.name)}
                  </p>
                )}
                
                {isVictim && (
                  <p className="text-[9px] text-red-600 mt-1">
                    Vítima
                  </p>
                )}
                </div>

              {/* Placed indicator */}
              {isPlaced && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                  <span className="text-lg font-pixel-title text-primary">✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
