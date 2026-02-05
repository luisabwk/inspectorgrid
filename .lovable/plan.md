

# Corrigir Proporção Geladeira vs Fogão

## Problema Atual

| Asset | Dimensões Atuais | Altura Calculada |
|-------|------------------|------------------|
| Geladeira | top=3, bottom=29 | 26px |
| Fogão | top=4, bottom=28 | 24px |
| **Diferença** | | **Apenas 2px** |

A diferença de apenas 2px não representa a escala real onde a geladeira é praticamente o dobro da altura do fogão.

---

## Proporções Corrigidas

Para refletir a escala real:
- Geladeira real: ~170-180cm de altura
- Fogão real: ~90-100cm de altura (bancada)

### Novas Dimensões

| Asset | Dimensões Novas | Altura Calculada |
|-------|-----------------|------------------|
| Geladeira | top=2, bottom=30 | **28px** (máximo) |
| Fogão | top=8, bottom=28 | **20px** |
| **Diferença** | | **8px (40% menor)** |

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## 1. FridgeIcon - Aumentar Altura

Aumentar a altura máxima da geladeira para ocupar quase toda a célula verticalmente.

```tsx
// Fridge - 85° perspective (taller than stove)
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  const left = 5;
  const right = 27;
  const top = 2;      // Mais alto (era 3)
  const bottom = 30;  // Mais baixo (era 29)
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />
      
      {/* Main body */}
      <rect x={left + 2} y={top} width={right - left - 2} height={bottom - top} 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Top surface (85° depth indicator) */}
      <rect x={left} y={top} width={right - left} height="2.5" fill={COLORS.metal.top} />
      
      {/* Freezer compartment - slightly taller */}
      <rect x={left + 4} y={top + 4} width={right - left - 6} height="8" fill={COLORS.appliance.top} />
      <rect x={right - 5} y={top + 6} width="1.5" height="4" fill={COLORS.metal.handle} rx="0.3" />
      
      {/* Divider line */}
      <rect x={left + 4} y={top + 12.5} width={right - left - 6} height="1" fill={COLORS.metal.shadow} />
      
      {/* Fridge compartment - larger */}
      <rect x={left + 4} y={top + 14} width={right - left - 6} height="13" fill={COLORS.appliance.top} />
      <rect x={right - 5} y={top + 18} width="1.5" height="5" fill={COLORS.metal.handle} rx="0.3" />
    </svg>
  );
};
```

---

## 2. StoveIcon - Reduzir Altura (Estilo Bancada)

Representar o fogão como um equipamento de bancada, mais baixo.

```tsx
// Stove - 85° perspective (counter-height, shorter than fridge)
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  const left = connectedLeft ? 0 : 5;
  const right = connectedRight ? 32 : 27;
  const top = 8;      // Mais baixo (era 4)
  const bottom = 28;  // Mantém (bancada termina antes)
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
      
      {/* 4 Burners - adjusted for new height */}
      <ellipse cx={center - 5} cy={top + 2.5} rx="3" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center - 5} cy={top + 2.5} rx="1.8" ry="0.7" fill={COLORS.metal.side} />
      <ellipse cx={center + 5} cy={top + 2.5} rx="3" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center + 5} cy={top + 2.5} rx="1.8" ry="0.7" fill={COLORS.metal.side} />
      
      {/* Body */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top + 5} width={right - left - (connectedLeft ? 0 : 2)} height={bottom - top - 5} 
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Control panel with knobs */}
      <rect x={left + (connectedLeft ? 1 : 3)} y={top + 6} width={right - left - (connectedLeft ? 2 : 4)} height="2.5" 
        fill={COLORS.metal.side} />
      <circle cx={center - 5} cy={top + 7.2} r="1" fill={COLORS.metal.handle} />
      <circle cx={center - 1.5} cy={top + 7.2} r="1" fill={COLORS.metal.handle} />
      <circle cx={center + 1.5} cy={top + 7.2} r="1" fill={COLORS.metal.handle} />
      <circle cx={center + 5} cy={top + 7.2} r="1" fill={COLORS.metal.handle} />
      
      {/* Oven door */}
      <rect x={left + (connectedLeft ? 2 : 4)} y={top + 9.5} width={right - left - (connectedLeft ? 4 : 6)} height="7" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {/* Oven handle */}
      <rect x={left + (connectedLeft ? 3 : 5)} y={top + 10.5} width={right - left - (connectedLeft ? 6 : 8)} height="1.2" 
        fill={COLORS.metal.chrome} rx="0.5" />
      {/* Oven window */}
      <rect x={left + (connectedLeft ? 4 : 6)} y={top + 12.5} width={right - left - (connectedLeft ? 8 : 10)} height="3" 
        fill={COLORS.screen.display} opacity="0.4" />
    </svg>
  );
};
```

---

## Comparação Visual

```text
ANTES (proporção errada):
┌──────────────────┐
│   ┌──────────┐   │  Geladeira: 26px altura
│   │ Geladeira│   │  
│   │          │   │  
│   │          │   │  
│   └──────────┘   │
└──────────────────┘

┌──────────────────┐
│   ┌──────────┐   │  Fogão: 24px altura
│   │  Fogão   │   │  (quase igual!)
│   │          │   │  
│   │          │   │  
│   └──────────┘   │
└──────────────────┘

DEPOIS (proporção corrigida):
┌──────────────────┐
│ ┌──────────────┐ │  Geladeira: 28px altura
│ │              │ │  (ocupa quase tudo)
│ │  Geladeira   │ │  
│ │              │ │  
│ │              │ │  
│ └──────────────┘ │
└──────────────────┘

┌──────────────────┐
│                  │  
│                  │  (espaço vazio acima)
│   ┌──────────┐   │  Fogão: 20px altura
│   │  Fogão   │   │  (estilo bancada)
│   └──────────┘   │
└──────────────────┘
```

---

## Seção Técnica

### Hierarquia de Escala Final

| Asset | Altura (px) | Proporção Real |
|-------|-------------|----------------|
| Geladeira | 28px | ~175cm |
| Pia | 24px | ~115cm (com gabinete) |
| Fogão | 20px | ~95cm |

### Ajustes Internos do Fogão

- Cooktop reduzido de 7px → 5px
- Knobs menores (r=1.2 → r=1.0)
- Forno menor (9px → 7px)
- Janela do forno menor (4px → 3px)

