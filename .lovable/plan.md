
# Correção da Poltrona - Proporções mais Amplas

## Problema Identificado

A poltrona está visualmente "apertada" e difícil de reconhecer porque:

1. **Padding lateral excessivo**: `left=6`, `right=26` deixa apenas 20px de largura total
2. **Área interna muito estreita**: `width = right - left - 4 = 16px` para encosto/assento
3. **Braços muito finos**: apenas 4px de largura vs 5px do sofá
4. **Proporções não harmônicas**: elementos comprimidos demais

### Comparação com o Sofá (referência)

| Elemento | Sofá | Poltrona Atual | Problema |
|----------|------|----------------|----------|
| Padding lateral | 4px | 6px | Muito grande |
| Largura braços | 5px | 4px | Muito fino |
| Área interna | ~18px | ~12px | Muito estreita |
| Proporção geral | Equilibrada | Apertada | Sem respiro interno |

## Solução

Reduzir o padding lateral e aumentar a largura dos elementos para a poltrona parecer mais "aberta" e reconhecível:

### Novas Proporções

```text
Antes (apertado):          Depois (amplo):
┌──────────────────┐       ┌────────────────────────┐
│ ▌  ▄▄▄▄▄▄▄▄  ▐ │       │ ▌    ▄▄▄▄▄▄▄▄▄▄▄▄   ▐ │
│ ▌  █████████  ▐ │       │ ▌    ██████████████   ▐ │
│ ▌  █████████  ▐ │   →   │ ▌    ██████████████   ▐ │
│ ▌  ▀▀▀▀▀▀▀▀▀  ▐ │       │ ▌    ▀▀▀▀▀▀▀▀▀▀▀▀   ▐ │
└──────────────────┘       └────────────────────────┘
   left=6, right=26           left=4, right=28
   braços=4px                  braços=5px
```

## Detalhes Técnicos

### Arquivo a Modificar
`src/components/game/assets/AssetIcons.tsx` - linhas 637-686 (ArmchairIcon)

### Mudanças Específicas

1. **Reduzir padding lateral** (como o sofá)
   - `left = 4` (antes: 6)
   - `right = 28` (antes: 26)
   - Largura total: 24px (antes: 20px)

2. **Aumentar largura dos braços**
   - Braços: `width="5"` (antes: 4) - igual ao sofá
   - Altura dos braços: manter 14px

3. **Ajustar área interna**
   - Área de encosto/assento/base: `width = right - left - 10 = 14px` (5px cada braço)
   - Proporção mais equilibrada entre braços e corpo

4. **Manter estrutura vertical unificada**
   - Encosto: y=5 até y=10 (5px altura)
   - Assento: y=10 até y=16 (6px altura)
   - Base: y=16 até y=21 (5px altura)
   - Pés: y=21 até y=23 (2px)

### Código Corrigido

```typescript
export const ArmchairIcon = ({ className }: AssetIconProps) => {
  // Match sofa proportions - less padding, wider arms
  const left = 4;
  const right = 28;
  const top = 5;
  const armWidth = 5; // Same as sofa
  
  // Inner area starts after left arm, ends before right arm
  const innerLeft = left + armWidth;
  const innerRight = right - armWidth;
  const innerWidth = innerRight - innerLeft; // 14px
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Back rest - connected to seat */}
      <rect x={innerLeft} y={top} width={innerWidth} height="5" 
        fill={COLORS.armchair.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={innerLeft} y={top} width={innerWidth} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Seat cushion - directly below backrest */}
      <rect x={innerLeft} y={top + 5} width={innerWidth} height="6" 
        fill={COLORS.armchair.cushion}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={innerLeft} y={top + 5} width={innerWidth} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Base/front - directly below seat (85° depth) */}
      <rect x={innerLeft} y={top + 11} width={innerWidth} height="5" 
        fill={COLORS.armchair.front} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={innerLeft} y={top + 11} width={innerWidth} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Left armrest - full height covering back+seat */}
      <rect x={left} y={top + 1} width={armWidth} height="14" 
        fill={COLORS.armchair.side}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx={left + armWidth/2} cy={top + 1} rx={armWidth/2} ry="1.2" 
        fill={COLORS.armchair.top} />
      
      {/* Right armrest - full height */}
      <rect x={right - armWidth} y={top + 1} width={armWidth} height="14" 
        fill={COLORS.armchair.side}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx={right - armWidth/2} cy={top + 1} rx={armWidth/2} ry="1.2" 
        fill={COLORS.armchair.top} />
      
      {/* Small feet */}
      <rect x={innerLeft} y={top + 16} width="2" height="2" 
        fill={COLORS.wood.shadow} rx="0.5" />
      <rect x={innerRight - 2} y={top + 16} width="2" height="2" 
        fill={COLORS.wood.shadow} rx="0.5" />
    </svg>
  );
};
```

## Validação

1. A poltrona deve parecer mais "aberta" e reconhecível
2. Proporções similares ao sofá (braços de 5px, menos padding)
3. Estrutura unificada mantida (sem gaps entre elementos)
4. Perspectiva 85° preservada (elipses no topo dos braços)
5. Não deve preencher a célula toda - ainda tem respiro de 4px nas laterais
