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

// Map suspect names to their clues (simplistic matching by name in clue text)
const findClueForSuspect = (suspect: Suspect, clues: Clue[]): Clue | undefined => {
  // Extract first name for matching
  const firstName = suspect.name.split(' ')[0];
  const lastName = suspect.name.split(' ').slice(1).join(' ');
  
  return clues.find(clue => 
    clue.text.toLowerCase().includes(suspect.name.toLowerCase()) ||
    clue.text.toLowerCase().includes(firstName.toLowerCase()) ||
    (lastName && clue.text.toLowerCase().includes(lastName.toLowerCase()))
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                  "relative flex flex-col items-center p-2 rounded-lg border-4 transition-all cursor-pointer bg-card",
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
                  className="w-12 h-14 sm:w-14 sm:h-16 drop-shadow-sm"
                  style={{ color: suspect.color }}
                >
                  {Portrait && <Portrait className="w-full h-full" />}
                </div>
                
                {/* Name Banner */}
                <div 
                  className="w-full text-center py-1 -mx-2 mt-1 rounded-b"
                  style={{ 
                    backgroundColor: suspect.color,
                  }}
                >
                  <p className="text-xs font-bold text-white drop-shadow-sm leading-tight px-1" style={{
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}>
                    {suspect.name.split(' ')[0]}
                  </p>
                </div>

                {/* Placed indicator */}
                {isPlaced && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-lg">
                    <span className="text-xs font-medium text-muted-foreground">✓</span>
                  </div>
                )}
              </div>

              {/* Clue attached below */}
              {clue && (
                <div 
                  className="relative mt-[-4px] mx-1 p-2 bg-card border border-border rounded-b-lg shadow-sm"
                  style={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <p className="text-[10px] sm:text-xs text-foreground leading-tight">
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

// Format clue text to highlight key terms
const formatClueText = (text: string, suspectName: string): React.ReactNode => {
  // Bold certain keywords
  const keywords = ['sofá', 'cama', 'quarto', 'cozinha', 'escritório', 'sala', 'corredor', 'adjacente', 'parede', 'janela', 'tapete'];
  
  let result = text;
  
  // Remove suspect name from the beginning if present
  const firstName = suspectName.split(' ')[0];
  const patterns = [
    new RegExp(`^O ${suspectName} `, 'i'),
    new RegExp(`^A ${suspectName} `, 'i'),
    new RegExp(`^O ${firstName} `, 'i'),
    new RegExp(`^A ${firstName} `, 'i'),
  ];
  
  for (const pattern of patterns) {
    result = result.replace(pattern, '');
  }
  
  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  return result;
};
