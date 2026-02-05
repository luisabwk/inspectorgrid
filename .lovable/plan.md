

# Aplicar Perspectiva 85° aos Assets do Banheiro

## Diagnóstico Atual

| Asset | Estado | Problema |
|-------|--------|----------|
| SinkIcon | ✓ Correto | Já possui lateral esquerda de 2px e perspectiva 85° |
| ToiletIcon | ✗ Incorreto | Sem lateral de profundidade, visão frontal plana |
| ShowerIcon | ✗ Incorreto | Sem lateral de profundidade, box plano |

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## 1. ToiletIcon - Adicionar Perspectiva 85°

### Problemas Atuais
- Tanque sem lateral esquerda
- Vaso completamente frontal
- Sem indicador de profundidade no topo

### Código Corrigido

```tsx
// Toilet - 85° perspective with depth
export const ToiletIcon = ({ className }: AssetIconProps) => {
  const left = 6;
  const right = 26;
  const top = 4;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Tank - left side depth (85°) */}
      <rect x={left + 3} y={top} width="1.5" height="8" fill={COLORS.appliance.side} />
      
      {/* Tank main body */}
      <rect x={left + 4.5} y={top} width="11" height="8" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Tank top surface (85° depth) */}
      <rect x={left + 3} y={top} width="12.5" height="1.5" fill={COLORS.appliance.top} />
      
      {/* Flush button */}
      <ellipse cx="16" cy={top + 2.5} rx="1.5" ry="0.7" fill={COLORS.metal.chrome} />
      
      {/* Seat lid - with left depth */}
      <ellipse cx="16" cy={top + 10} rx="9" ry="4.5" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx="16" cy={top + 10} rx="7" ry="3.5" fill={COLORS.metal.top} />
      
      {/* Bowl - with left depth indicator */}
      <path d="M 7 19 Q 5 22 7 26 Q 12 30 16 30 Q 20 30 25 26 Q 27 22 25 19 Z" 
        fill={COLORS.appliance.side} />
      <ellipse cx="16" cy="21" rx="9" ry="6" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Water inside bowl */}
      <ellipse cx="16" cy="19.5" rx="6" ry="4" fill={COLORS.water.top} />
      <ellipse cx="16" cy="18.5" rx="4" ry="2.5" fill={COLORS.water.front} />
      
      {/* Base shadow */}
      <ellipse cx="16" cy="26" rx="7" ry="1.8" fill={COLORS.appliance.shadow} />
    </svg>
  );
};
```

---

## 2. ShowerIcon - Adicionar Perspectiva 85°

### Problemas Atuais
- Box de vidro completamente plano
- Sem lateral esquerda indicando profundidade
- Sem superfície de topo visível

### Código Corrigido

```tsx
// Shower - 85° perspective with glass box depth
export const ShowerIcon = ({ className }: AssetIconProps) => {
  const left = 4;
  const right = 28;
  const top = 4;
  const bottom = 28;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) - glass tint */}
      <rect x={left} y={top} width="2" height={bottom - top} 
        fill={COLORS.water.front} opacity="0.25" />
      
      {/* Glass box background */}
      <rect x={left + 2} y={top} width={right - left - 2} height={bottom - top} 
        fill={COLORS.water.top} opacity="0.12" />
      
      {/* Top surface (85° depth indicator) */}
      <rect x={left} y={top} width={right - left} height="2" 
        fill={COLORS.water.top} opacity="0.35" />
      
      {/* Frame with subtle outline */}
      <rect x={left} y={top} width={right - left} height={bottom - top} 
        fill="none" 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Left frame edge (vertical) */}
      <rect x={left} y={top} width="0.8" height={bottom - top} 
        fill={COLORS.metal.chrome} opacity="0.6" />
      
      {/* Showerhead pipe - with depth */}
      <rect x={right - 6} y={top} width="1" height="6" fill={COLORS.metal.side} />
      <rect x={right - 5} y={top} width="2" height="6" fill={COLORS.metal.chrome} />
      
      {/* Showerhead */}
      <ellipse cx={(left + right) / 2 + 2} cy={top + 5} rx="5" ry="2.5" 
        fill={COLORS.metal.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <ellipse cx={(left + right) / 2 + 2} cy={top + 5} rx="3.5" ry="1.7" fill={COLORS.metal.front} />
      
      {/* Water droplets */}
      <ellipse cx={(left + right) / 2 - 2} cy={top + 11} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2 + 1} cy={top + 13} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2 + 4} cy={top + 10} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2} cy={top + 17} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2 + 3} cy={top + 19} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      
      {/* Floor base with depth */}
      <rect x={left} y={bottom - 3} width="2" height="3" fill={COLORS.appliance.side} />
      <rect x={left + 2} y={bottom - 3} width={right - left - 2} height="3" 
        fill={COLORS.appliance.front} opacity="0.5" />
      
      {/* Drain */}
      <ellipse cx={(left + right) / 2} cy={bottom - 1.5} rx="2.5" ry="1" fill={COLORS.metal.shadow} />
    </svg>
  );
};
```

---

## Resumo Visual

```text
ANTES (ToiletIcon):
┌──────────────────┐
│    ┌──────┐      │  Tanque plano
│    │      │      │
│    ╭──────╮      │  Assento frontal
│   (  ~~~   )     │  
│    ╰──────╯      │  
└──────────────────┘

DEPOIS (ToiletIcon):
┌──────────────────┐
│   ▌┌──────┐      │  Tanque com lateral + topo
│   ▌│      │      │
│    ╭──────╮      │  
│   (  ~~~   )     │  Tigela com indicador lateral
│    ╰──────╯      │  
└──────────────────┘

ANTES (ShowerIcon):
┌──────────────────┐
│ ┌──────────────┐ │  Box plano
│ │   ●  água    │ │
│ │   ○  ○      │ │
│ │      ○      │ │
│ └──────────────┘ │
└──────────────────┘

DEPOIS (ShowerIcon):
┌──────────────────┐
│ █┌─────────────┐ │  Lateral esquerda de vidro
│ █│   ●  água   │ │  Topo com superfície visível
│ █│   ○  ○     │ │  Moldura cromada na borda
│ █│      ○     │ │
│ █└▄▄▄▄▄▄▄▄▄▄▄▄┘ │  Base com profundidade
└──────────────────┘
```

---

## Seção Técnica

### Padrões de Perspectiva 85° Aplicados

| Elemento | Largura | Cor |
|----------|---------|-----|
| Lateral esquerda (sólido) | 1.5-2px | `COLORS.appliance.side` |
| Lateral esquerda (vidro) | 2px | `COLORS.water.front` opacity="0.25" |
| Topo (sólido) | 1.5px | `COLORS.appliance.top` |
| Topo (vidro) | 2px | `COLORS.water.top` opacity="0.35" |

### Hierarquia de Escala do Banheiro

| Asset | Dimensões | Ocupação Vertical |
|-------|-----------|-------------------|
| Pia (com gabinete) | top=4, bottom=28 | 24px |
| Chuveiro (box) | top=4, bottom=28 | 24px |
| Vaso Sanitário | top=4, bottom=27 | 23px |

