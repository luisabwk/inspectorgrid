

# Ajustes na Cozinha: Fogão e Pia

## Problemas Diagnosticados

| Problema | Asset | Estado Atual |
|----------|-------|--------------|
| Desalinhamento vertical | Fogão vs Pia | Fogão: top=8, Pia: top=4 |
| Fogão muito largo | StoveIcon | 22px largura (left=5, right=27) |
| Pia oval | SinkIcon | Bacia usa `<ellipse>` |

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## 1. Alinhar Fogão e Pia

Ambos devem começar na mesma altura vertical para parecerem parte de uma bancada contínua quando conectados.

**Correção:** Manter pia em `top=4` e ajustar fogão para `top=4` também (aumentando sua altura de 20px para 24px).

---

## 2. Diminuir Largura do Fogão

Fogões reais são mais estreitos que pias. Reduzir a largura do fogão de 22px para 18px.

| Dimensão | Antes | Depois |
|----------|-------|--------|
| left | 5 | 7 |
| right | 27 | 25 |
| **Largura** | 22px | **18px** |

---

## 3. Pia Retangular

Substituir a bacia oval por formato retangular com cantos arredondados, típico de pias de cozinha.

```tsx
// ANTES (oval)
<ellipse cx={center} cy={top + counterH / 2 + 1} rx="5.5" ry="2.5" ... />

// DEPOIS (retangular)
<rect x={center - 5} y={top + 2} width="10" height="4" rx="1" ... />
```

---

## Código Corrigido

### StoveIcon

```tsx
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  // Mais estreito (18px) e alinhado com pia (top=4)
  const left = connectedLeft ? 0 : 7;
  const right = connectedRight ? 32 : 25;
  const top = 4;      // Alinhado com pia
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
      
      {/* 2 Burners (narrower stove) */}
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

### SinkIcon

```tsx
export const SinkIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  const left = connectedLeft ? 0 : 5;
  const right = connectedRight ? 32 : 27;
  const center = (left + right) / 2;
  const top = 4;
  const counterH = 8;
  const cabinetTop = top + counterH;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      {!connectedLeft && (
        <rect x={left} y={top} width="2" height="24" fill={COLORS.appliance.side} />
      )}
      
      {/* Counter with depth - thicker */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top} width={right - left - (connectedLeft ? 0 : 2)} height={counterH} 
        fill={COLORS.appliance.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Basin - RETANGULAR (pia de cozinha) */}
      <rect x={center - 5.5} y={top + 2} width="11" height="4.5" rx="1"
        fill={COLORS.metal.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={center - 4.5} y={top + 2.8} width="9" height="3" rx="0.8" 
        fill={COLORS.water.top} />
      {/* Drain */}
      <ellipse cx={center} cy={top + 4.5} rx="1" ry="0.5" fill={COLORS.metal.shadow} />
      
      {/* Faucet - simpler and smaller */}
      <rect x={center - 1} y={top} width="2" height="2" fill={COLORS.metal.chrome} />
      <rect x={center + 1} y={top + 0.5} width="2.5" height="1" fill={COLORS.metal.chrome} />
      <circle cx={center + 3.2} cy={top + 1.5} r="0.5" fill={COLORS.metal.side} />
      
      {/* Cabinet */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={cabinetTop} width={right - left - (connectedLeft ? 0 : 2)} height="14" 
        fill={COLORS.appliance.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Cabinet doors */}
      <rect x={left + (connectedLeft ? 1 : 3)} y={cabinetTop + 1} width={(right - left - (connectedLeft ? 2 : 4)) / 2 - 1} height="11" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={center + 0.5} y={cabinetTop + 1} width={(right - left - (connectedLeft ? 2 : 4)) / 2 - 1} height="11" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      
      {/* Door handles */}
      <rect x={center - 2} y={cabinetTop + 5} width="1" height="2.5" fill={COLORS.metal.handle} rx="0.3" />
      <rect x={center + 1} y={cabinetTop + 5} width="1" height="2.5" fill={COLORS.metal.handle} rx="0.3" />
    </svg>
  );
};
```

---

## Comparação Visual

```text
ANTES:
┌────────────────────┐
│                    │  Pia: top=4, larga (22px)
│   ┌────────────┐   │  Bacia oval
│   │  (  ~~~  ) │   │
│   └────────────┘   │
└────────────────────┘

┌────────────────────┐
│                    │  
│                    │  Fogão: top=8, largo (22px)
│   ┌────────────┐   │  Desalinhado verticalmente
│   │  ○    ○    │   │
│   └────────────┘   │
└────────────────────┘


DEPOIS:
┌────────────────────┐
│   ┌────────────┐   │  Pia: top=4, larga (22px)
│   │ ┌────────┐ │   │  Bacia RETANGULAR
│   │ │  ~~~   │ │   │
│   └────────────┘   │
└────────────────────┘

┌────────────────────┐
│     ┌────────┐     │  Fogão: top=4, ESTREITO (18px)
│     │ ○   ○  │     │  Alinhado com pia
│     │        │     │  2 bocas (mais proporcional)
│     └────────┘     │
└────────────────────┘
```

---

## Resumo das Alterações

| Mudança | Antes | Depois |
|---------|-------|--------|
| Fogão top | 8 | 4 (alinhado com pia) |
| Fogão largura | 22px | 18px |
| Fogão bocas | 4 | 2 (proporcional) |
| Pia bacia | Oval (ellipse) | Retangular (rect rx=1) |

---

## Seção Técnica

### Hierarquia de Proporções Cozinha

| Asset | Largura | Altura | Top |
|-------|---------|--------|-----|
| Pia | 22px | 24px | 4 |
| Fogão | 18px | 24px | 4 |
| Geladeira | 22px | 28px | 2 |

### Alinhamento de Bancada

Quando conectados lado a lado, fogão e pia formam uma bancada contínua com:
- Mesmo nível de topo (`top=4`)
- Superfícies de trabalho alinhadas
- Profundidade lateral consistente (2px)

