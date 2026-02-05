
# Cards de Avatares Verticais por Padrao

## Situacao Atual

Os cards dos suspeitos estao sempre em layout horizontal (`flex-row`), com avatar a esquerda e nome/pista a direita, ocupando largura fixa de 160-176px.

## Alteracao Proposta

Mudar para layout condicional:
- **Nao selecionado**: Layout vertical (avatar em cima, nome embaixo) - compacto
- **Selecionado**: Layout horizontal expandido (avatar a esquerda, nome + pista a direita)

### Arquivo: `src/components/game/SuspectClueCards.tsx`

#### Mudancas no card (linhas 74-130):

```tsx
// Layout condicional baseado em isSelected
className={cn(
  "relative flex-shrink-0 transition-all duration-150 cursor-pointer",
  "pixel-border-thin bg-card",
  // Layout vertical quando nao selecionado
  !isSelected && "flex flex-col items-center p-2 w-16 sm:w-20",
  // Layout horizontal quando selecionado  
  isSelected && "flex flex-row gap-2 p-2 w-40 sm:w-44",
  isPlaced && "opacity-40 cursor-not-allowed",
  isSelected && "translate-y-[-2px]",
  isVictim && "bg-red-50 border-red-400",
)}
```

#### Ajustes no avatar:

```tsx
<div 
  className={cn(
    "flex-shrink-0 overflow-hidden",
    // Avatar menor quando vertical
    !isSelected && "w-10 h-12",
    // Avatar mesmo tamanho quando horizontal
    isSelected && "w-10 h-12",
    isVictim && "border-2 border-red-600"
  )}
>
```

#### Ajustes na area de texto:

```tsx
<div className={cn(
  "min-w-0 flex flex-col",
  !isSelected && "items-center mt-1",
  isSelected && "flex-1 justify-center"
)}>
  <p className={cn(
    "font-bold leading-tight truncate",
    !isSelected && "text-[10px] text-center",
    isSelected && "text-xs",
    isVictim ? "text-red-700" : "text-foreground"
  )}>
    {suspect.name.split(' ')[0]}
  </p>
  
  {/* Pista so aparece quando selecionado */}
  {isSelected && suspectClue && (
    <p className="text-[10px] text-muted-foreground leading-tight mt-1 line-clamp-3">
      {formatClueText(suspectClue.text, suspect.name)}
    </p>
  )}
  
  {/* Label vitima sempre visivel */}
  {isVictim && (
    <p className={cn(
      "text-red-600",
      !isSelected && "text-[8px] mt-0.5",
      isSelected && "text-[9px] mt-1"
    )}>
      Vitima
    </p>
  )}
</div>
```

## Resultado Visual

| Estado | Layout | Dimensoes | Conteudo |
|--------|--------|-----------|----------|
| Normal | Vertical | 64-80px largura | Avatar + nome centralizado |
| Selecionado | Horizontal | 160-176px largura | Avatar + nome + pista |
| Posicionado | Vertical + overlay | 64-80px | Avatar + nome + checkmark |

O painel ficara mais compacto por padrao, expandindo apenas o card selecionado para mostrar a pista.
