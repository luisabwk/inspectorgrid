import { Clue } from "@/types/game";
import { FileText, MapPin, Users, XCircle } from "lucide-react";

interface CluesPanelProps {
  clues: Clue[];
}

const ClueIcon = ({ type }: { type: Clue['type'] }) => {
  switch (type) {
    case 'position':
      return <MapPin className="w-4 h-4 text-primary" />;
    case 'adjacency':
      return <Users className="w-4 h-4 text-info" />;
    case 'room':
      return <FileText className="w-4 h-4 text-warning" />;
    case 'negation':
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export const CluesPanel = ({ clues }: CluesPanelProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Pistas
      </h3>
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {clues.map((clue, index) => (
          <div 
            key={clue.id}
            className="flex gap-3 p-3 rounded-md bg-muted/30 border border-border/50"
          >
            <div className="flex-shrink-0 mt-0.5">
              <ClueIcon type={clue.type} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Pista #{index + 1}</p>
              <p className="text-sm text-foreground leading-relaxed">{clue.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
