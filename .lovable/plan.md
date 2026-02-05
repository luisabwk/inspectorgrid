

# Alinhar Altura do Fogão com a Pia

## Problema

O fogão foi incorretamente configurado com `top = 8`, mas a pia está com `top = 4`. Ambos devem ter a **mesma altura** (24px) para formar uma bancada contínua quando conectados.

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## Correção

Reverter o `top` do fogão de 8 para 4:

| Dimensão | Estado Atual | Correção |
|----------|--------------|----------|
| top | 8 | **4** |
| bottom | 28 | 28 |
| **Altura** | 20px | **24px** |

---

## Código Corrigido

```tsx
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
  const top = 4;      // CORRIGIDO: Igual à pia (era 8)
  const bottom = 28;
  const center = (left + right) / 2;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      {!connectedLeft && (
        <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />
      )}
      
      {/* Cooktop surface */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top} width={right - left - (connectedLeft ? 0 : 2)} height="6" 
        fill={COLORS.metal.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* 2 Burners */}
      <ellipse cx={center - 3.5} cy={top + 3} rx="2.5" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center - 3.5} cy={top + 3} rx="1.5" ry="0.7" fill={COLORS.metal.side} />
      <ellipse cx={center + 3.5} cy={top + 3} rx="2.5" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center + 3.5} cy={top + 3} rx="1.5" ry="0.7" fill={COLORS.metal.side} />
      
      {/* Body */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top + 6} width={right - left - (connectedLeft ? 0 : 2)} height={bottom - top - 6} 
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Control panel with knobs */}
      <rect x={left + (connectedLeft ? 1 : 3)} y={top + 7} width={right - left - (connectedLeft ? 2 : 4)} height="2.5" 
        fill={COLORS.metal.side} />
      <circle cx={center - 3} cy={top + 8.2} r="0.9" fill={COLORS.metal.handle} />
      <circle cx={center} cy={top + 8.2} r="0.9" fill={COLORS.metal.handle} />
      <circle cx={center + 3} cy={top + 8.2} r="0.9" fill={COLORS.metal.handle} />
      
      {/* Oven door */}
      <rect x={left + (connectedLeft ? 2 : 4)} y={top + 10.5} width={right - left - (connectedLeft ? 4 : 6)} height="8" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {/* Oven handle */}
      <rect x={left + (connectedLeft ? 3 : 5)} y={top + 11.5} width={right - left - (connectedLeft ? 6 : 8)} height="1.2" 
        fill={COLORS.metal.chrome} rx="0.5" />
      {/* Oven window */}
      <rect x={left + (connectedLeft ? 4 : 6)} y={top + 13.5} width={right - left - (connectedLeft ? 8 : 10)} height="4" 
        fill={COLORS.screen.display} opacity="0.4" />
    </svg>
  );
};
```

---

## Comparação Visual

```text
ANTES (desalinhado):
┌──────────────────┐
│   ┌──────────┐   │  Pia: top=4
│   │  ~~~~    │   │
│   └──────────┘   │
└──────────────────┘

┌──────────────────┐
│                  │  
│                  │  Espaço vazio (fogão top=8)
│     ┌──────┐     │  
│     │ ○  ○ │     │  
│     └──────┘     │
└──────────────────┘


DEPOIS (alinhado):
┌──────────────────┐
│   ┌──────────┐   │  Pia: top=4
│   │  ~~~~    │   │
│   └──────────┘   │
└──────────────────┘

┌──────────────────┐
│     ┌──────┐     │  Fogão: top=4 (IGUAL À PIA)
│     │ ○  ○ │     │  
│     │      │     │  Mesma altura
│     └──────┘     │
└──────────────────┘
```

---

## Proporções Finais da Cozinha

| Asset | Top | Bottom | Altura | Largura |
|-------|-----|--------|--------|---------|
| Geladeira | 2 | 30 | 28px | 22px |
| Pia | 4 | 28 | 24px | 22px |
| Fogão | 4 | 28 | **24px** | 18px |

Fogão e pia ficam alinhados na mesma altura, diferenciados apenas pela largura (fogão mais estreito).

---

## Seção Técnica

### Elementos Internos Revertidos

| Elemento | Estava | Reverter Para |
|----------|--------|---------------|
| Cooktop height | 5 | 6 |
| Burners cy | top + 2.5 | top + 3 |
| Control panel height | 2 | 2.5 |
| Knobs r | 0.8 | 0.9 |
| Knobs cy | top + 7 | top + 8.2 |
| Oven door y | top + 9 | top + 10.5 |
| Oven door height | 7 | 8 |
| Oven handle height | 1 | 1.2 |
| Oven window y | top + 12 | top + 13.5 |
| Oven window height | 3 | 4 |

