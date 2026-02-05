

# Corrigir Perspectiva 85° do Vaso Sanitário e Chuveiro

## Diagnóstico

### Problemas Identificados

| Asset | Problema | Comparação com Referência (Geladeira) |
|-------|----------|--------------------------------------|
| **Toilet** | Usa elipses/formas ovais | Deveria usar retângulos para tanque e base |
| **Toilet** | Falta indicador de profundidade esquerda claro | Geladeira: `fill={COLORS.metal.side}` sólido |
| **Shower** | Opacidade muito baixa (0.12-0.25) | Deveria ter elementos sólidos visíveis |
| **Shower** | Base do chuveiro muito fina | Deveria ter profundidade lateral sólida |

### Padrão Correto (85°)

Os assets que funcionam bem seguem este padrão:

```text
┌─────────────────────┐
│■■■ Top surface      │  ← Faixa superior (1.5-2px) com COLORS.*.top
├─■───────────────────┤
│ ■                   │  ← Lado esquerdo (1.5-2px) com COLORS.*.side  
│ ■    Front face     │  ← Face frontal principal com COLORS.*.front
│ ■                   │
└─────────────────────┘
```

---

## Correções Propostas

### 1. ToiletIcon - Redesenho Completo

**Antes:** Formas ovais (elipses) para tanque e assento
**Depois:** Retângulos com perspectiva 85° consistente

```tsx
export const ToiletIcon = ({ className }: AssetIconProps) => {
  const left = 5;
  const right = 27;
  const top = 4;
  const tankHeight = 8;
  const seatTop = top + tankHeight + 1;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* TANK - perspectiva 85° */}
      {/* Tank left side depth */}
      <rect x={left} y={top} width="2" height={tankHeight} fill={COLORS.appliance.side} />
      
      {/* Tank body */}
      <rect x={left + 2} y={top} width={right - left - 2} height={tankHeight} 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Tank top surface */}
      <rect x={left} y={top} width={right - left} height="2" fill={COLORS.appliance.top} />
      
      {/* Flush button */}
      <ellipse cx="16" cy={top + 3} rx="2" ry="1" fill={COLORS.metal.chrome} />
      
      {/* SEAT/LID - perspectiva 85° com formato arredondado na frente */}
      {/* Seat left side depth */}
      <rect x={left - 1} y={seatTop} width="2" height="5" fill={COLORS.appliance.side} />
      
      {/* Seat lid (ovalado mas com base plana) */}
      <rect x={left + 1} y={seatTop} width={right - left - 2} height="5" rx="2"
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left - 1} y={seatTop} width={right - left} height="1.5" rx="1"
        fill={COLORS.appliance.top} />
      
      {/* Seat opening (interior oval) */}
      <ellipse cx="16" cy={seatTop + 3} rx="6" ry="2.5" fill={COLORS.metal.top} />
      
      {/* BOWL - com profundidade */}
      {/* Bowl left side depth */}
      <rect x={left - 2} y={seatTop + 5} width="2" height="8" fill={COLORS.appliance.side} 
        rx="1" />
      
      {/* Bowl body - forma ovalada com frente arredondada */}
      <path d="M {left} {seatTop + 5} 
               L {left} {seatTop + 11} 
               Q {left} {seatTop + 14} 16 {seatTop + 14}
               Q {right} {seatTop + 14} {right} {seatTop + 11}
               L {right} {seatTop + 5} Z" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Water inside */}
      <ellipse cx="16" cy={seatTop + 8} rx="5" ry="3" fill={COLORS.water.top} />
      
      {/* Base shadow */}
      <ellipse cx="16" cy={seatTop + 13.5} rx="6" ry="1.5" fill={COLORS.appliance.shadow} />
    </svg>
  );
};
```

### 2. ShowerIcon - Opacidade Sólida

**Problema:** Opacidades muito baixas (0.12-0.35) tornam a profundidade invisível
**Solução:** Usar cores sólidas como na geladeira, mantendo translucidez apenas no vidro

```tsx
export const ShowerIcon = ({ className }: AssetIconProps) => {
  const left = 4;
  const right = 28;
  const top = 4;
  const bottom = 28;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* BASE/PISO - elemento mais sólido */}
      {/* Base left side depth (85°) - SÓLIDO */}
      <rect x={left} y={bottom - 4} width="2" height="4" fill={COLORS.appliance.side} />
      
      {/* Base floor */}
      <rect x={left + 2} y={bottom - 4} width={right - left - 2} height="4" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Base top surface */}
      <rect x={left} y={bottom - 4} width={right - left} height="1.5" fill={COLORS.appliance.top} />
      
      {/* Drain */}
      <ellipse cx="16" cy={bottom - 2} rx="2.5" ry="1" fill={COLORS.metal.shadow} />
      
      {/* GLASS PANELS - com profundidade esquerda visível */}
      {/* Left glass side depth (85°) - mais visível */}
      <rect x={left} y={top} width="2" height={bottom - top - 4} 
        fill={COLORS.water.front} opacity="0.5" />
      
      {/* Glass main panel - translúcido */}
      <rect x={left + 2} y={top} width={right - left - 2} height={bottom - top - 4} 
        fill={COLORS.water.top} opacity="0.2"
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Glass top edge */}
      <rect x={left} y={top} width={right - left} height="2" 
        fill={COLORS.water.top} opacity="0.6" />
      
      {/* Chrome frame left edge */}
      <rect x={left} y={top} width="1" height={bottom - top - 4} 
        fill={COLORS.metal.chrome} />
      
      {/* SHOWERHEAD */}
      {/* Pipe - com profundidade */}
      <rect x={right - 6} y={top + 1} width="1.5" height="5" fill={COLORS.metal.side} />
      <rect x={right - 4.5} y={top + 1} width="2" height="5" fill={COLORS.metal.chrome} />
      
      {/* Showerhead */}
      <ellipse cx="17" cy={top + 6} rx="5" ry="2.5" 
        fill={COLORS.metal.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <ellipse cx="17" cy={top + 6} rx="3.5" ry="1.7" fill={COLORS.metal.front} />
      
      {/* Water droplets */}
      <ellipse cx="14" cy={top + 12} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx="17" cy={top + 14} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx="20" cy={top + 11} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx="16" cy={top + 18} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
    </svg>
  );
};
```

---

## Mudanças Principais

| Elemento | ToiletIcon | ShowerIcon |
|----------|------------|------------|
| **Profundidade esquerda** | Retângulo sólido (não elipse) | Opacidade 0.5 (era 0.25) |
| **Superfície superior** | Faixa retangular 2px | Opacidade 0.6 (era 0.35) |
| **Forma geral** | Retângulos com cantos arredondados | Base sólida (era translúcida) |
| **Frame cromado** | - | Borda esquerda sólida |

---

## Comparação Visual Esperada

```text
ANTES (formas orgânicas/transparentes):
┌──────────────────┐
│     ◯  ◯         │  Elipses flutuando
│    ◯    ◯        │  Sem profundidade clara
│     ◯◯◯◯         │
└──────────────────┘


DEPOIS (perspectiva 85° sólida):
┌──────────────────┐
│■■■■■■■■■■■■■■■■■■│  ← Top surface
│■┌──────────────┐ │  ← Left depth + body
│■│     ○○       │ │
│■└──────────────┘ │
└──────────────────┘
```

---

## Arquivos Afetados

- `src/components/game/assets/AssetIcons.tsx` (linhas 955-1057)

---

## Seção Técnica

### Paleta de Cores para Profundidade 85°

| Superfície | Cor | Uso |
|------------|-----|-----|
| Top | `COLORS.appliance.top` (#FFFFFF) | Topo do objeto (2px) |
| Side/Depth | `COLORS.appliance.side` (#D0D0D0) | Lateral esquerda (2px) |
| Front | `COLORS.appliance.front` (#F0F0F0) | Face principal |
| Shadow | `COLORS.appliance.shadow` (#B0B0B0) | Base/sombra |

### Elementos-chave do Padrão

1. **Profundidade esquerda**: Sempre `width="2"`, cor `.side`, opacidade 1.0 (sólido)
2. **Superfície superior**: Sempre `height="1.5"` a `"2"`, cor `.top`
3. **Corpo principal**: Retângulo com stroke OUTLINE
4. **Posicionamento**: Lado esquerdo da profundidade alinhado com `left`, corpo inicia em `left + 2`

