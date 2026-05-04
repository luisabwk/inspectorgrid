import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Loader2,
  Save,
  Skull,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GameGrid } from "@/components/game/GameGrid";
import { PortraitMap } from "@/components/game/assets/SuspectPortraits";
import { generateCase, type GeneratorOptions } from "@/lib/puzzleGenerator";
import { solvePuzzle } from "@/lib/puzzleSolver";
import { saveGeneratedCase } from "@/lib/caseRepository";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { GameCase, PlacementState } from "@/types/game";

type GridSize = 5 | 6 | 7 | 8 | 9;
type Difficulty = 1 | 2 | 3;

const GRID_SIZES: GridSize[] = [5, 6, 7, 8, 9];
const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: 1, label: "Fácil" },
  { value: 2, label: "Médio" },
  { value: 3, label: "Difícil" },
];

const Generate = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { toast } = useToast();

  const [sceneName, setSceneName] = useState("Mansão Vitoriana");
  const [gridSize, setGridSize] = useState<GridSize>(6);
  const [difficulty, setDifficulty] = useState<Difficulty>(1);

  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [gameCase, setGameCase] = useState<GameCase | null>(null);
  const [solution, setSolution] = useState<PlacementState | null>(null);

  const [showSolution, setShowSolution] = useState(false);
  const [showRawConstraints, setShowRawConstraints] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setGameCase(null);
    setSolution(null);
    setShowSolution(false);
    setGenerating(true);
    try {
      const options: GeneratorOptions = { gridSize, difficulty, sceneName };
      const candidate = await generateCase(options);
      const verdict = solvePuzzle(candidate);
      if (verdict.solutionCount !== 1 || !verdict.solution) {
        throw new Error(
          `O solver discorda do gerador (${verdict.solutionCount} soluções). Tente regenerar.`
        );
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
      toast({
        title: "Caso publicado!",
        description: "O caso foi salvo e está disponível para os detetives.",
      });
      navigate("/game");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const noop = () => {};
  const noopDrag = (e: React.DragEvent) => e.preventDefault();

  const busy = generating || saving;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <header className="pixel-card mx-4 mt-4">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            className="pixel-btn-secondary px-3 py-1 text-sm flex items-center gap-2"
            disabled={busy}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="font-pixel-title text-xs text-primary">Lab do Detetive</h1>
          <div className="w-[72px]" />
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <section className="text-center space-y-2">
          <h2 className="font-pixel-title text-lg text-foreground">Gerador de Casos</h2>
          <p className="font-pixel text-sm text-muted-foreground">
            Configure o cenário e gere um quebra-cabeça inédito com IA.
          </p>
        </section>

        <section className="pixel-card p-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="scene" className="font-pixel text-base text-foreground">
              Cenário
            </Label>
            <Input
              id="scene"
              value={sceneName}
              onChange={(e) => setSceneName(e.target.value)}
              disabled={busy}
              className="pixel-input"
              placeholder="Ex: Mansão Vitoriana"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-pixel text-base text-foreground">Tamanho do grid</Label>
            <div className="grid grid-cols-5 gap-2">
              {GRID_SIZES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setGridSize(n)}
                  disabled={busy}
                  className={cn(
                    "py-2 font-pixel text-sm transition-colors",
                    gridSize === n ? "pixel-btn" : "pixel-btn-secondary"
                  )}
                >
                  {n}×{n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-pixel text-base text-foreground">Dificuldade</Label>
            <div className="grid grid-cols-3 gap-2">
              {DIFFICULTIES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDifficulty(value)}
                  disabled={busy}
                  className={cn(
                    "py-2 font-pixel text-sm transition-colors",
                    difficulty === value ? "pixel-btn" : "pixel-btn-secondary"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={busy || !sceneName.trim()}
              className="pixel-btn px-6 py-3 text-base flex-1 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {generating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              {gameCase ? "Gerar novo" : "Gerar caso"}
            </button>
            {gameCase && (
              <button
                type="button"
                onClick={handleSave}
                disabled={busy}
                className="pixel-btn px-6 py-3 text-base flex-1 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Salvar e publicar
              </button>
            )}
          </div>
        </section>

        {error && (
          <Alert variant="destructive" className="pixel-border-thin">
            <AlertTitle className="font-pixel">Algo deu errado</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap break-words font-pixel text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {!gameCase && !generating && !error && (
          <div className="pixel-card p-8 text-center space-y-3">
            <Sparkles className="w-10 h-10 mx-auto text-primary" />
            <p className="font-pixel text-base text-foreground">Pronto para investigar?</p>
            <p className="font-pixel text-sm text-muted-foreground">
              Clique em "Gerar caso" para criar um quebra-cabeça inédito.
            </p>
          </div>
        )}

        {gameCase && solution && (
          <div className="space-y-5">
            <section className="pixel-card p-5 space-y-2">
              <h3 className="font-pixel-title text-base text-foreground">{gameCase.title}</h3>
              <p className="font-pixel text-sm text-muted-foreground leading-relaxed">
                {gameCase.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge label={`${gameCase.gridSize}×${gameCase.gridSize}`} />
                <Badge label={`Dificuldade ${gameCase.difficulty}`} />
                <Badge label={`${gameCase.suspects.length} suspeitos`} />
                <Badge label={`${gameCase.clues.length} pistas`} />
              </div>
            </section>

            <section className="pixel-card p-4">
              <div className="w-full max-w-[480px] mx-auto pointer-events-none">
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
            </section>

            <section className="pixel-card p-5 space-y-3">
              <h3 className="font-pixel-title text-base text-foreground">Suspeitos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {gameCase.suspects.map((s) => {
                  const Portrait = PortraitMap[s.portraitId];
                  return (
                    <div
                      key={s.id}
                      className={cn(
                        "pixel-border-thin p-3 flex flex-col items-center gap-2 bg-card",
                        s.isVictim && "ring-2 ring-destructive ring-offset-2 ring-offset-background"
                      )}
                    >
                      <div
                        className="w-14 h-14 flex items-center justify-center pixel-border-thin"
                        style={{ background: s.color }}
                      >
                        {Portrait ? (
                          <Portrait className="w-12 h-12" />
                        ) : (
                          <span className="font-pixel-title text-base">{s.name[0]}</span>
                        )}
                      </div>
                      <span className="font-pixel text-xs text-center text-foreground line-clamp-1">
                        {s.name}
                      </span>
                      {s.isVictim && (
                        <span className="flex items-center gap-1 text-destructive font-pixel text-[10px] uppercase">
                          <Skull className="w-3 h-3" /> Vítima
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="pixel-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-pixel-title text-base text-foreground">Pistas</h3>
                <button
                  type="button"
                  onClick={() => setShowRawConstraints((v) => !v)}
                  className="font-pixel text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  {showRawConstraints ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      Ocultar JSON
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      Ver JSON (debug)
                    </>
                  )}
                </button>
              </div>
              <ol className="space-y-2">
                {gameCase.clues.map((c, idx) => (
                  <li
                    key={c.id}
                    className="pixel-border-thin p-3 bg-card flex items-start gap-3"
                  >
                    <span className="font-pixel-title text-sm text-primary shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <p className="font-pixel text-sm text-foreground leading-snug">
                        {c.text}
                      </p>
                      <Badge label={c.type} muted />
                      {showRawConstraints && (
                        <pre className="font-mono text-[11px] text-muted-foreground bg-muted/50 p-2 rounded overflow-x-auto">
                          {JSON.stringify(c.constraint, null, 2)}
                        </pre>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="pixel-card p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-pixel-title text-base text-foreground">Gabarito</h3>
                  <p className="font-pixel text-xs text-muted-foreground">
                    Solução verificada pelo solver — não enviada ao cliente em produção.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSolution((v) => !v)}
                  className="pixel-btn-secondary px-3 py-1 text-sm flex items-center gap-2 shrink-0"
                >
                  {showSolution ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Mostrar
                    </>
                  )}
                </button>
              </div>
              {showSolution && (
                <div className="space-y-1">
                  {Object.entries(solution).map(([cellKey, suspectId]) => {
                    const suspect = gameCase.suspects.find((s) => s.id === suspectId);
                    return (
                      <div
                        key={cellKey}
                        className="flex items-center justify-between font-pixel text-sm border-b border-border last:border-b-0 py-1"
                      >
                        <span className="text-muted-foreground">célula {cellKey}</span>
                        <span className="text-foreground">{suspect?.name ?? suspectId}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

const Badge = ({ label, muted = false }: { label: string; muted?: boolean }) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-0.5 font-pixel text-[10px] uppercase tracking-wide pixel-border-thin",
      muted ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
    )}
  >
    {label}
  </span>
);

export default Generate;
