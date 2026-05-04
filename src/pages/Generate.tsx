import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { GameGrid } from "@/components/game/GameGrid";
import { generateCase, type GeneratorOptions } from "@/lib/puzzleGenerator";
import { solvePuzzle } from "@/lib/puzzleSolver";
import { saveGeneratedCase } from "@/lib/caseRepository";
import { useApi } from "@/hooks/useApi";
import type { GameCase, PlacementState } from "@/types/game";

type GridSize = 5 | 6 | 7 | 8 | 9;
type Difficulty = 1 | 2 | 3;

const Generate = () => {
  const navigate = useNavigate();
  const api = useApi();

  const [sceneName, setSceneName] = useState("Mansão Vitoriana");
  const [gridSize, setGridSize] = useState<GridSize>(6);
  const [difficulty, setDifficulty] = useState<Difficulty>(1);

  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [gameCase, setGameCase] = useState<GameCase | null>(null);
  const [solution, setSolution] = useState<PlacementState | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setGameCase(null);
    setSolution(null);
    setGenerating(true);
    try {
      const options: GeneratorOptions = { gridSize, difficulty, sceneName };
      const candidate = await generateCase(options);
      const verdict = solvePuzzle(candidate);
      if (verdict.solutionCount !== 1 || !verdict.solution) {
        throw new Error(`Solver disagrees with generator (${verdict.solutionCount} solutions)`);
      }
      setGameCase(candidate);
      setSolution(verdict.solution);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!gameCase || !solution) return;
    setError(null);
    setSaving(true);
    try {
      await saveGeneratedCase(api, gameCase, solution, sceneName);
      navigate("/game");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const noop = () => {};
  const noopDrag = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="font-pixel text-2xl">Generate Puzzle (admin)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="scene">Scene name</Label>
          <Input
            id="scene"
            value={sceneName}
            onChange={(e) => setSceneName(e.target.value)}
            disabled={generating || saving}
          />
        </div>

        <div className="space-y-2">
          <Label>Grid size</Label>
          <Select
            value={String(gridSize)}
            onValueChange={(v) => setGridSize(Number(v) as GridSize)}
            disabled={generating || saving}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 6, 7, 8, 9].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} × {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select
            value={String(difficulty)}
            onValueChange={(v) => setDifficulty(Number(v) as Difficulty)}
            disabled={generating || saving}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 — Easy</SelectItem>
              <SelectItem value="2">2 — Medium</SelectItem>
              <SelectItem value="3">3 — Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} disabled={generating || saving || !sceneName.trim()}>
          {generating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {gameCase ? "Regenerate" : "Generate"}
        </Button>
        {gameCase && (
          <Button onClick={handleSave} disabled={saving || generating} variant="default">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save & Publish
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription className="whitespace-pre-wrap break-words">{error}</AlertDescription>
        </Alert>
      )}

      {gameCase && (
        <div className="space-y-4">
          <div>
            <h2 className="font-pixel text-lg">{gameCase.title}</h2>
            <p className="text-sm text-muted-foreground">{gameCase.description}</p>
          </div>

          <div className="w-full max-w-[480px] mx-auto p-2 pointer-events-none">
            <GameGrid
              cells={gameCase.layoutConfig.cells}
              suspects={gameCase.suspects}
              placements={{}}
              pencilMarks={{}}
              selectedCell={null}
              selectedSuspect={null}
              isPencilMode={false}
              rooms={gameCase.layoutConfig.rooms}
              onCellClick={noop}
              onCellDrop={noop}
              onDragOver={noopDrag}
            />
          </div>

          <section className="space-y-2">
            <h3 className="font-pixel text-base">Suspects</h3>
            <ul className="text-sm space-y-1">
              {gameCase.suspects.map((s) => (
                <li key={s.id}>
                  <span className="font-medium">{s.name}</span>{" "}
                  <span className="text-muted-foreground">({s.id})</span>
                  {s.isVictim && <span className="ml-2 text-red-500">VICTIM</span>}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-pixel text-base">Clues</h3>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              {gameCase.clues.map((c) => (
                <li key={c.id}>
                  <span>{c.text}</span>
                  <code className="ml-2 text-xs text-muted-foreground">
                    [{c.type}] {JSON.stringify(c.constraint)}
                  </code>
                </li>
              ))}
            </ol>
          </section>

          {solution && (
            <section className="space-y-2">
              <h3 className="font-pixel text-base">Ground-truth solution (server-side only)</h3>
              <pre className="text-xs bg-muted p-2 overflow-x-auto">
                {JSON.stringify(solution, null, 2)}
              </pre>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Generate;
