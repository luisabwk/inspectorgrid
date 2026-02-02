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
      className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin items-stretch"
    >
      {suspects.map((suspect) => {
        const isPlaced = placedSuspects.has(suspect.id);
        const isSelected = selectedSuspect === suspect.id;
        const Portrait = PortraitMap[suspect.portraitId];
        const clue = findClueForSuspect(suspect, clues);

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
                ? "ring-2 ring-primary ring-offset-1 ring-offset-background shadow-lg border-primary" 
                : "border-border",
              isSelected ? "w-auto max-w-[280px]" : "w-14",
            )}
          >
            {/* Portrait section */}
            <div className={cn(
              "flex flex-col items-center p-1.5 flex-shrink-0",
              isSelected && "border-r border-border/50"
            )}>
              <div 
                className="w-8 h-10 sm:w-10 sm:h-12"
                style={{ color: suspect.color }}
              >
                {Portrait && <Portrait className="w-full h-full" />}
              </div>
              
              <p className="text-[10px] sm:text-xs font-bold text-foreground leading-tight mt-0.5 text-center whitespace-nowrap">
                {suspect.name.split(' ')[0]}
              </p>
              
              {suspect.isVictim && (
                <span className="text-[8px]">⚰️</span>
              )}
            </div>

            {/* Clue section - only visible when selected */}
            {isSelected && clue && (
              <div className="px-3 py-2 animate-fade-in min-w-0">
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
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
