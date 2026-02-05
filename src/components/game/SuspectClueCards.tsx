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
    <div className="space-y-2">
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
                "w-16 sm:w-20",
                isPlaced && "opacity-40 cursor-not-allowed",
                isSelected && "translate-y-[-2px]",
                isVictim && !isSelected && "bg-red-100",
              )}
              style={{
                boxShadow: isSelected 
                  ? isVictim 
                    ? '4px 4px 0 hsl(0 65% 40%)' 
                    : '4px 4px 0 hsl(140 45% 30%)'
                  : undefined
              }}
            >
              {/* Portrait section */}
              <div className="flex flex-col items-center p-1.5">
                <div 
                  className={cn(
                    "w-10 h-12 sm:w-12 sm:h-14 overflow-hidden",
                    isVictim && "border-2 border-red-600"
                  )}
                  style={{ imageRendering: 'pixelated' }}
                >
                  {Portrait && <Portrait className="w-full h-full" />}
                </div>
                
                <p className={cn(
                  "text-[10px] sm:text-xs leading-tight mt-1 text-center whitespace-nowrap truncate w-full",
                  isVictim ? "text-red-700 font-semibold" : "text-foreground"
                )}>
                  {suspect.name.split(' ')[0]}
                </p>
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
      
      {/* Selected suspect clue */}
      {selectedSuspectData && selectedClue && (
        <div 
          className="pixel-border-thin bg-card/80 px-3 py-2 text-center mx-auto max-w-md"
          style={{
            borderColor: selectedSuspectData.isVictim 
              ? 'hsl(0 65% 50%)' 
              : selectedSuspectData.color
          }}
        >
          <p className="font-pixel text-xs sm:text-sm text-foreground leading-relaxed">
            <span 
              className="font-bold"
              style={{ color: selectedSuspectData.isVictim ? 'hsl(0 65% 40%)' : selectedSuspectData.color }}
            >
              {selectedSuspectData.name}:
            </span>{' '}
            {formatClueText(selectedClue.text, selectedSuspectData.name)}
          </p>
        </div>
      )}
      
      {/* Victim indicator when selected */}
      {selectedSuspectData?.isVictim && (
        <div className="text-center">
          <span className="font-pixel text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded">
            ☠ Vítima - Não posicionar
          </span>
        </div>
      )}
    </div>
  );
};
