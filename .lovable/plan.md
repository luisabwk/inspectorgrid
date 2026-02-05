

# Card de Suspeito Estilo "Carteira de Motorista"

## Objetivo

Transformar cada card de suspeito em um componente unificado que combine avatar e pista, similar a uma carteira de motorista/documento de identidade, removendo o popover separado.

## Layout Proposto

```text
┌─────────────────────────────────────┐
│  ┌──────┐                           │
│  │      │  NOME SUSPEITO            │
│  │ FOTO │  ─────────────            │
│  │      │  Texto da pista que       │
│  └──────┘  descreve onde está...    │
│                                     │
└─────────────────────────────────────┘
```

## Estrutura do Card

### Dimensoes
- Largura fixa: ~160px (expandido de 64-80px)
- Altura: auto (ajusta ao conteúdo)
- Layout: horizontal (flex-row)

### Composicao
1. **Lado Esquerdo - Avatar**
   - Retrato do suspeito (40x48px)
   - Borda colorida se vitima
   
2. **Lado Direito - Informacoes**
   - Nome do suspeito (destaque)
   - Linha separadora sutil
   - Texto da pista formatado (fonte menor)
   - Indicador de vitima se aplicavel

### Estados Visuais
- **Normal**: borda padrao, fundo card
- **Selecionado**: sombra colorida, elevacao sutil
- **Posicionado**: opacidade reduzida, checkmark overlay
- **Vitima**: borda/fundo vermelho sutil

## Mudancas Tecnicas

### Arquivo: `src/components/game/SuspectClueCards.tsx`

1. **Remover Popover**
   - Eliminar imports do Popover
   - Remover wrapper Popover/PopoverTrigger/PopoverContent

2. **Reestruturar Card**
   - Mudar de layout vertical para horizontal (flex-row)
   - Expandir largura: `w-40` ou `w-44` (160-176px)
   - Altura flexivel baseada no conteudo

3. **Adicionar Secao de Texto**
   - Nome do suspeito (primeiro nome, negrito)
   - Pista formatada abaixo (texto menor, cor muted)
   - Indicador de vitima integrado

4. **Ajustar Container**
   - Scroll horizontal mantido
   - Gap entre cards ajustado para acomodar cards maiores
   - Alinhamento centralizado

### Codigo do Card Reestruturado

```tsx
<div
  ref={isSelected ? selectedRef : null}
  draggable={!isPlaced}
  onDragStart={(e) => onSuspectDragStart(e, suspect.id)}
  onClick={() => !isPlaced && onSuspectSelect(suspect.id)}
  className={cn(
    "relative flex-shrink-0 transition-all duration-150 cursor-pointer",
    "pixel-border-thin bg-card",
    "w-40 sm:w-44",
    "flex flex-row gap-2 p-2",
    isPlaced && "opacity-40 cursor-not-allowed",
    isSelected && "translate-y-[-2px]",
    isVictim && "bg-red-50 border-red-400",
  )}
  style={{
    boxShadow: isSelected 
      ? isVictim 
        ? '3px 3px 0 hsl(0 65% 40%)' 
        : '3px 3px 0 hsl(140 45% 30%)'
      : undefined
  }}
>
  {/* Avatar */}
  <div 
    className={cn(
      "flex-shrink-0 w-10 h-12 overflow-hidden",
      isVictim && "border-2 border-red-600"
    )}
    style={{ imageRendering: 'pixelated' }}
  >
    {Portrait && <Portrait className="w-full h-full" />}
  </div>
  
  {/* Info */}
  <div className="flex-1 min-w-0 flex flex-col justify-center">
    <p className={cn(
      "text-xs font-bold leading-tight truncate",
      isVictim ? "text-red-700" : "text-foreground"
    )}>
      {suspect.name.split(' ')[0]}
    </p>
    
    {suspectClue && (
      <p className="text-[10px] text-muted-foreground leading-tight mt-1 line-clamp-3">
        {formatClueText(suspectClue.text, suspect.name)}
      </p>
    )}
    
    {isVictim && (
      <p className="text-[9px] text-red-600 mt-1">
        Vitima
      </p>
    )}
  </div>

  {/* Placed indicator */}
  {isPlaced && (
    <div className="absolute inset-0 flex items-center justify-center bg-background/70">
      <span className="text-lg font-pixel-title text-primary">✓</span>
    </div>
  )}
</div>
```

## Estilo Visual

- Bordas pixel art mantidas (`pixel-border-thin`)
- Fundo consistente com tema (`bg-card`)
- Cores de destaque para vitima em vermelho sutil
- Sombra de selecao em verde (ou vermelho para vitima)
- Texto truncado com `line-clamp-3` para pistas longas

## Validacao

1. Cada card mostra avatar + nome + pista em layout horizontal
2. Scroll horizontal funciona com cards maiores
3. Interacao de selecao/arrastar mantida
4. Estados visuais (selecionado, posicionado, vitima) claros
5. Texto da pista legivel e nao ultrapassa o card

