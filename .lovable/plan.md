
# Diminuir Altura do Fogão

## Diagnóstico Atual

| Asset | Dimensões | Altura |
|-------|-----------|--------|
| Fogão | top=4, bottom=28 | 24px |
| Pia | top=4, bottom=28 | 24px (com gabinete) |
| Geladeira | top=2, bottom=30 | 28px |

O fogão está com a mesma altura da pia, o que não é proporcional pois a pia inclui um gabinete embaixo.

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## Correção Proposta

Reduzir a altura do fogão de 24px para 20px, movendo o `top` de 4 para 8:

| Dimensão | Antes | Depois |
|----------|-------|--------|
| top | 4 | 8 |
| bottom | 28 | 28 |
| **Altura** | 24px | **20px** |

Isso representa um fogão de bancada mais baixo que a pia com gabinete, mantendo proporções realistas.

---

## Código Corrigido

```tsx
// Stove - 85° perspective (narrower, counter-height)
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  const left = connectedLeft ? 0 : 7;
  const right = connectedRight ? 32 : 25;
  const top = 8;      // Mais baixo (era 4)
  const bottom = 28;
  const center = (left + right) / 2;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      {!connectedLeft && (
        <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />
      )}
      
      {/* Cooktop surface */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top} width={right - left - (connectedLeft ? 0 : 2)} height="5" 
        fill={COLORS.metal.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* 2 Burners */}
      <ellipse cx={center - 3.5} cy={top + 2.5} rx="2.5" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center - 3.5} cy={top + 2.5} rx="1.5" ry="0.7" fill={COLORS.metal.side} />
      <ellipse cx={center + 3.5} cy={top + 2.5} rx="2.5" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center + 3.5} cy={top + 2.5} rx="1.5" ry="0.7" fill={COLORS.metal.side} />
      
      {/* Body */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top + 5} width={right - left - (connectedLeft ? 0 : 2)} height={bottom - top - 5} 
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Control panel with knobs */}
      <rect x={left + (connectedLeft ? 1 : 3)} y={top + 6} width={right - left - (connectedLeft ? 2 : 4)} height="2" 
        fill={COLORS.metal.side} />
      <circle cx={center - 3} cy={top + 7} r="0.8" fill={COLORS.metal.handle} />
      <circle cx={center} cy={top + 7} r="0.8" fill={COLORS.metal.handle} />
      <circle cx={center + 3} cy={top + 7} r="0.8" fill={COLORS.metal.handle} />
      
      {/* Oven door */}
      <rect x={left + (connectedLeft ? 2 : 4)} y={top + 9} width={right - left - (connectedLeft ? 4 : 6)} height="7" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {/* Oven handle */}
      <rect x={left + (connectedLeft ? 3 : 5)} y={top + 10} width={right - left - (connectedLeft ? 6 : 8)} height="1" 
        fill={COLORS.metal.chrome} rx="0.5" />
      {/* Oven window */}
      <rect x={left + (connectedLeft ? 4 : 6)} y={top + 12} width={right - left - (connectedLeft ? 8 : 10)} height="3" 
        fill={COLORS.screen.display} opacity="0.4" />
    </svg>
  );
};
```

---

## Comparação Visual

```text
ANTES (fogão altura 24px):
┌──────────────────┐
│     ┌────────┐   │  top=4
│     │ ○   ○  │   │  
│     │ ▫▫▫    │   │  
│     │ ┌────┐ │   │  Mesma altura que pia
│     │ │    │ │   │  
│     └────────┘   │  bottom=28
└──────────────────┘

DEPOIS (fogão altura 20px):
┌──────────────────┐
│                  │  
│                  │  Espaço vazio acima
│     ┌────────┐   │  top=8
│     │ ○   ○  │   │  
│     │ ┌────┐ │   │  Mais compacto
│     └────────┘   │  bottom=28
└──────────────────┘
```

---

## Hierarquia de Altura Final

| Asset | Top | Bottom | Altura |
|-------|-----|--------|--------|
| Geladeira | 2 | 30 | 28px (mais alto) |
| Pia | 4 | 28 | 24px (com gabinete) |
| Fogão | 8 | 28 | **20px** (bancada) |

---

## Seção Técnica

### Ajustes Internos

| Elemento | Antes | Depois |
|----------|-------|--------|
| Cooktop height | 6px | 5px |
| Burners cy | top + 3 | top + 2.5 |
| Control panel height | 2.5px | 2px |
| Knobs r | 0.9 | 0.8 |
| Oven door height | 8px | 7px |
| Oven handle height | 1.2px | 1px |
| Oven window height | 4px | 3px |
