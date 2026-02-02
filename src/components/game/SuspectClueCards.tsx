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

  const selectedSuspectData = suspects.find(s => s.id === selectedSuspect);
  const selectedClue = selectedSuspectData ? findClueForSuspect(selectedSuspectData, clues) : null;

  return (
    <div 
      ref={containerRef}
      className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin items-stretch justify-center"
    >
      {suspects.map((suspect) => {
        const isPlaced = placedSuspects.has(suspect.id);
        const isSelected = selectedSuspect === suspect.id;
        const Portrait = PortraitMap[suspect.portraitId];
        const clue = findClueForSuspect(suspect, clues);
        const isVictim = suspect.isVictim;

        return (
          <div
            key={suspect.id}
            ref={isSelected ? selectedRef : null}
            draggable={!isPlaced}
            onDragStart={(e) => onSuspectDragStart(e, suspect.id)}
            onClick={() => !isPlaced && onSuspectSelect(suspect.id)}
            className={cn(
              "relative flex-shrink-0 flex items-center rounded-lg border transition-all duration-300 ease-out cursor-pointer bg-card overflow-hidden",
              "hover:shadow-md active:scale-[0.98]",
              isPlaced && "opacity-40 cursor-not-allowed",
              isSelected 
                ? "ring-2 ring-offset-1 ring-offset-background shadow-lg" 
                : "border-border",
              isSelected && isVictim && "ring-red-500 border-red-400",
              isSelected && !isVictim && "ring-primary border-primary",
              !isSelected && isVictim && "border-red-300 bg-red-50/50",
            )}
          >
            {/* Portrait section */}
            <div className={cn(
              "flex flex-col items-center p-1 flex-shrink-0",
              isSelected && clue && "border-r border-border/50"
            )}>
              <div 
                className={cn(
                  "w-9 h-11 sm:w-10 sm:h-12 rounded overflow-hidden border",
                  isVictim ? "border-red-500" : "border-transparent"
                )}
              >
                {Portrait && <Portrait className="w-full h-full" />}
              </div>
              
              <p className={cn(
                "text-[9px] sm:text-[10px] font-bold leading-tight mt-0.5 text-center whitespace-nowrap",
                isVictim ? "text-red-700" : "text-foreground"
              )}>
                {suspect.name.split(' ')[0]}
              </p>
            </div>

            {/* Clue section - only visible when selected */}
            {isSelected && clue && (
              <div className="px-2 py-1.5 animate-fade-in max-w-[180px]">
                <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">
                  {formatClueText(clue.text, suspect.name)}
                </p>
              </div>
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
