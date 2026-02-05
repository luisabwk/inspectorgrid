

# Vaso Sanitário com Orientação Diagonal

## Objetivo

Redesenhar o `ToiletIcon` com uma orientação diagonal (aproximadamente 45°) para tornar o asset mais reconhecível e diferenciado dos outros elementos retangulares do grid.

---

## Problema Atual

O vaso sanitário usa formas puramente retangulares alinhadas aos eixos X/Y, o que o torna visualmente similar a outros eletrodomésticos e dificulta o reconhecimento imediato.

```text
ATUAL (retangular):
┌──────────────────┐
│   ┌──────────┐   │  Tank
│   └──────────┘   │
│   ┌──────────┐   │  Seat
│   └──────────┘   │
│   ┌──────────┐   │  Bowl
│   └──────────┘   │
└──────────────────┘
```

---

## Solução Proposta

Rotacionar o vaso sanitário ~30-45° usando uma combinação de:
1. **SVG transform** para rotação do grupo principal
2. **Ajuste de coordenadas** para manter o asset centralizado na célula

```text
PROPOSTO (diagonal):
┌──────────────────┐
│        ┌─┐       │  Tank (rotacionado)
│       ┌┘ └┐      │  
│      ┌─────┐     │  Seat (rotacionado)
│     ┌───────┐    │  Bowl (diagonal)
│    └─────────┘   │
└──────────────────┘
```

---

## Implementação Técnica

### Abordagem: Transform Group com Rotação

```tsx
export const ToiletIcon = ({ className }: AssetIconProps) => {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Grupo rotacionado em torno do centro */}
      <g transform="rotate(-30, 16, 16)">
        {/* TANK - na parte superior */}
        {/* Tank left side depth */}
        <rect x="10" y="2" width="2" height="8" fill={COLORS.appliance.side} />
        
        {/* Tank body */}
        <rect x="12" y="2" width="10" height="8" 
          fill={COLORS.appliance.front}
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        
        {/* Tank top surface */}
        <rect x="10" y="2" width="12" height="2" fill={COLORS.appliance.top} />
        
        {/* Flush button */}
        <ellipse cx="17" cy="5" rx="1.5" ry="0.8" fill={COLORS.metal.chrome} />
        
        {/* SEAT/LID */}
        {/* Seat left side depth */}
        <rect x="8" y="11" width="2" height="7" fill={COLORS.appliance.side} />
        
        {/* Seat body - forma oval */}
        <ellipse cx="16" cy="14.5" rx="8" ry="4" 
          fill={COLORS.appliance.front}
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        
        {/* Seat top surface */}
        <ellipse cx="16" cy="12" rx="7" ry="2.5" fill={COLORS.appliance.top} />
        
        {/* Seat opening */}
        <ellipse cx="16" cy="14.5" rx="5" ry="2.5" fill={COLORS.metal.top} />
        
        {/* BOWL */}
        {/* Bowl left side depth */}
        <rect x="7" y="18" width="2" height="8" fill={COLORS.appliance.side} rx="1" />
        
        {/* Bowl body - forma ovalada alongada */}
        <ellipse cx="16" cy="22" rx="9" ry="6" 
          fill={COLORS.appliance.front}
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        
        {/* Water inside */}
        <ellipse cx="16" cy="22" rx="5" ry="3" fill={COLORS.water.top} />
      </g>
      
      {/* Base shadow (não rotacionada para ancorar) */}
      <ellipse cx="16" cy="28" rx="10" ry="2" fill={COLORS.appliance.shadow} opacity="0.5" />
    </svg>
  );
};
```

---

## Parâmetros de Rotação

| Parâmetro | Valor | Justificativa |
|-----------|-------|---------------|
| **Ângulo** | -30° | Diagonal suave, ainda reconhecível como vaso |
| **Centro X** | 16 | Centro horizontal do viewBox |
| **Centro Y** | 16 | Centro vertical do viewBox |

---

## Elementos Visuais

| Componente | Forma | Cor |
|------------|-------|-----|
| Tank | Retângulo pequeno | `appliance.front` + depth |
| Seat/Lid | Elipse horizontal | `appliance.top` (tampa) |
| Bowl | Elipse alongada | `appliance.front` + água |
| Shadow | Elipse não rotacionada | `appliance.shadow` |

---

## Preservação da Perspectiva 85°

Mesmo com a rotação, mantemos os indicadores de profundidade:
- **Left depth**: Retângulos à esquerda de cada componente
- **Top surface**: Faixa superior no tanque e tampa do assento
- A rotação é aplicada ao grupo inteiro, preservando a relação entre as partes

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx` - linhas 955-1012

