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
  const lowerText = text.toLowerCase();
  const lowerName = suspectName.toLowerCase();
  let result = text;
  if (lowerText.startsWith(lowerName)) {
    result = text.slice(suspectName.length).trimStart();
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
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
        className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin items-start justify-center"
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
                // Layout vertical quando não selecionado
                !isSelected && "flex flex-col items-center p-2 w-16 sm:w-20",
                // Layout horizontal quando selecionado
                isSelected && "flex flex-row gap-3 p-3 w-56 sm:w-64",
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
                  "flex-shrink-0 overflow-hidden",
                  !isSelected && "w-10 h-12",
                  isSelected && "w-12 h-14",
                  isVictim && "border-2 border-red-600"
                )}
                style={{ imageRendering: 'pixelated' }}
              >
                {Portrait && <Portrait className="w-full h-full" />}
              </div>
              
              {/* Info */}
              <div className={cn(
                "min-w-0 flex flex-col",
                !isSelected && "items-center mt-1",
                isSelected && "flex-1 justify-center"
              )}>
                <div className={cn(
                  "flex items-center gap-1.5",
                  !isSelected && "flex-col gap-0.5"
                )}>
                  <p className={cn(
                    "font-bold leading-tight truncate",
                    !isSelected && "text-[10px] text-center",
                    isSelected && "text-xs",
                    isVictim ? "text-red-700" : "text-foreground"
                  )}>
                    {suspect.name.split(' ')[0]}
                  </p>
                  
                  {isVictim && (
                    <span className={cn(
                      "text-red-600 font-medium",
                      !isSelected && "text-[8px]",
                      isSelected && "text-[9px]"
                    )}>
                      (Vítima)
                    </span>
                  )}
                </div>
                
                {isSelected && suspectClue && (
                  <p className="text-[11px] text-muted-foreground leading-snug mt-1 line-clamp-4">
                    {formatClueText(suspectClue.text, suspect.name)}
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
