import { Suspect, Clue, PlacementState } from "@/types/game";
import { cn } from "@/lib/utils";
import { PortraitMap } from "./assets/SuspectPortraits";
import { useRef, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
            <Popover key={suspect.id} open={isSelected && !isPlaced && !!suspectClue}>
              <PopoverTrigger asChild>
                <div
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
              </PopoverTrigger>
              
              {suspectClue && (
                <PopoverContent 
                  side="top" 
                  className="pixel-card w-64 p-3"
                  style={{
                    borderColor: isVictim ? 'hsl(0 65% 50%)' : suspect.color
                  }}
                >
                  <p className="font-pixel text-xs leading-relaxed text-foreground">
                    {formatClueText(suspectClue.text, suspect.name)}
                  </p>
                  {isVictim && (
                    <p className="font-pixel text-[10px] text-red-600 mt-2">
                      ☠ Vítima - Não posicionar
                    </p>
                  )}
                </PopoverContent>
              )}
            </Popover>
          );
        })}
      </div>
    </div>
  );
};
