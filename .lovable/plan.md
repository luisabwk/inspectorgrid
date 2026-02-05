

# Corrigir Altura dos Cards e Texto das Pistas

## Problemas Diagnosticados

1. **Altura excessiva**: O container usa `items-stretch`, esticando todos os cards verticais para a mesma altura do card horizontal selecionado
2. **Pista cortada**: Largura fixa de 160-176px insuficiente para pistas longas

## Alteracoes Propostas

### Arquivo: `src/components/game/SuspectClueCards.tsx`

#### 1. Mudar alinhamento do container (linha 58)

```tsx
// Antes
className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin items-stretch justify-center"

// Depois
className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin items-start justify-center"
```

Isso faz os cards verticais manterem altura propria em vez de esticar.

#### 2. Aumentar largura do card selecionado (linha 80)

```tsx
// Antes
isSelected && "flex flex-row gap-2 p-2 w-40 sm:w-44",

// Depois
isSelected && "flex flex-row gap-3 p-3 w-56 sm:w-64",
```

Aumenta de 160-176px para 224-256px, dando mais espaco para a pista.

#### 3. Ajustar altura fixa do avatar horizontal (linhas 94-102)

```tsx
// Avatar precisa de altura fixa para nao crescer demais
<div 
  className={cn(
    "flex-shrink-0 overflow-hidden",
    !isSelected && "w-10 h-12",
    isSelected && "w-12 h-14",
    isVictim && "border-2 border-red-600"
  )}
>
```

#### 4. Melhorar formatacao do texto da pista (linhas 119-123)

```tsx
// Antes
{isSelected && suspectClue && (
  <p className="text-[10px] text-muted-foreground leading-tight mt-1 line-clamp-3">
    {formatClueText(suspectClue.text, suspect.name)}
  </p>
)}

// Depois
{isSelected && suspectClue && (
  <p className="text-[11px] text-muted-foreground leading-snug mt-1 line-clamp-4">
    {formatClueText(suspectClue.text, suspect.name)}
  </p>
)}
```

Aumenta fonte para 11px, leading mais confortavel e permite ate 4 linhas.

## Resultado Esperado

| Estado | Altura | Largura |
|--------|--------|---------|
| Vertical (nao selecionado) | ~70px (compacto) | 64-80px |
| Horizontal (selecionado) | ~70px | 224-256px |

- Cards verticais com altura propria, nao esticados
- Pistas visiveis sem corte em ate 4 linhas
- Transicao suave entre estados

