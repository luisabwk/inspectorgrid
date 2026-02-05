
# Corrigir Perspectiva 85° dos Assets de Cozinha e Mobiliario

## Resumo Visual dos Problemas

Os assets ainda nao seguem a perspectiva 85 graus harmonizada. Os principais defeitos sao:
- Proporcoes inconsistentes entre partes do mesmo movel
- Elementos muito finos ou muito grossos
- Falta de indicadores de profundidade uniformes
- Elementos mal centralizados ou desalinhados

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## 1. Mesa (TableIcon) - Linhas 426-463

### Problemas
- Tampo de 6px altura, mas pernas de apenas 3px largura (desproporcional)
- Avental de 3px muito alto
- Sem indicador de profundidade lateral

### Correcoes

```tsx
// Table - 85° isometric perspective with rectangular legs and depth
export const TableIcon = ({ 
  className, 
  connectedTop = false, 
  connectedBottom = false, 
  connectedLeft = false, 
  connectedRight = false 
}: ConnectableAssetProps) => {
  const padding = 4;
  const left = connectedLeft ? 0 : padding;
  const right = connectedRight ? 32 : 32 - padding;
  const topY = connectedTop ? 0 : 6;
  const bottomY = 27;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) - only when not connected */}
      {!connectedLeft && (
        <rect x={left} y={topY} width="1.5" height="5" fill={COLORS.wood.side} />
      )}
      
      {/* Tabletop with 85° depth - thinner (5px) */}
      <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="5" 
        fill={COLORS.wood.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="1.5" 
        fill={COLORS.wood.top} />
      
      {/* Apron - thinner (2px) */}
      <rect x={left + (connectedLeft ? 1 : 2.5)} y={topY + 5} width={right - left - (connectedLeft ? 2 : 5)} height="2" 
        fill={COLORS.wood.side} />
      
      {/* Legs - wider (4px) for better proportion */}
      {!connectedLeft && (
        <rect x={left + 2} y={topY + 7} width="4" height={bottomY - topY - 7} 
          fill={COLORS.wood.shadow} 
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      )}
      {!connectedRight && (
        <rect x={right - 6} y={topY + 7} width="4" height={bottomY - topY - 7} 
          fill={COLORS.wood.shadow} 
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      )}
    </svg>
  );
};
```

---

## 2. Escrivaninha (DeskIcon) - Linhas 468-516

### Problemas
- Pedestal muito largo (11px) e dominante
- Perna esquerda isolada e fina
- Proporcoes desbalanceadas

### Correcoes

```tsx
// Desk - 85° isometric perspective with balanced pedestal
export const DeskIcon = ({
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const padding = 4;
  const left = connectedLeft ? 0 : padding;
  const right = connectedRight ? 32 : 32 - padding;
  const topY = connectedTop ? 0 : 6;
  const bottomY = 27;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      {!connectedLeft && (
        <rect x={left} y={topY} width="1.5" height="5" fill={COLORS.wood.side} />
      )}
      
      {/* Desktop surface with 85° depth - thinner */}
      <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="5" 
        fill={COLORS.wood.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="1.5" 
        fill={COLORS.wood.top} />
      
      {/* Drawer pedestal - narrower (9px) */}
      <rect x={right - 10} y={topY + 5} width="9" height={bottomY - topY - 5} 
        fill={COLORS.wood.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {/* Left side of pedestal (85° depth) */}
      <rect x={right - 11} y={topY + 5} width="1.5" height={bottomY - topY - 5} 
        fill={COLORS.wood.side} />
      {/* Top drawer */}
      <rect x={right - 9} y={topY + 7} width="7" height="4" fill={COLORS.wood.top} />
      <rect x={right - 7} y={topY + 8.5} width="3" height="1" fill={COLORS.metal.handle} rx="0.5" />
      {/* Bottom drawer */}
      <rect x={right - 9} y={topY + 12} width="7" height="5" fill={COLORS.wood.top} />
      <rect x={right - 7} y={topY + 14} width="3" height="1" fill={COLORS.metal.handle} rx="0.5" />
      
      {/* Left support panel (instead of thin leg) */}
      {!connectedLeft && (
        <>
          <rect x={left + 2} y={topY + 5} width="5" height={bottomY - topY - 5} 
            fill={COLORS.wood.side} 
            stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
          <rect x={left + 2} y={topY + 5} width="5" height="1.5" 
            fill={COLORS.wood.front} />
        </>
      )}
    </svg>
  );
};
```

---

## 3. Cadeira (ChairIcon) - Linhas 693-716

### Problemas
- Apenas 2 pernas visiveis (deveria mostrar 4)
- Encosto muito plano sem volume
- Proporcoes assento vs encosto desbalanceadas
- Lado esquerdo do encosto desalinhado

### Correcoes

```tsx
// Chair - 85° isometric perspective with 4 visible legs
export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  const PAD = 6;
  const TOP = 4;
  const SEAT_Y = 13;
  const SEAT_H = 6;
  const LEG_H = 8;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Back legs (behind, slightly visible) */}
      <rect x={PAD + 1} y={SEAT_Y + SEAT_H - 1} width="3" height={LEG_H + 1} 
        fill={COLORS.wood.shadow} opacity="0.6" />
      <rect x={32 - PAD - 4} y={SEAT_Y + SEAT_H - 1} width="3" height={LEG_H + 1} 
        fill={COLORS.wood.shadow} opacity="0.6" />
      
      {/* Backrest - taller and narrower */}
      <rect x={PAD} y={TOP} width={32 - PAD * 2} height="10" 
        fill={COLORS.chair.back} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={PAD} y={TOP} width={32 - PAD * 2} height="2" fill={COLORS.chair.seat} />
      {/* Backrest left side depth */}
      <rect x={PAD - 1} y={TOP} width="1.5" height="10" fill={COLORS.wood.side} />
      {/* Backrest vertical slats detail */}
      <rect x={PAD + 3} y={TOP + 3} width="2" height="5" fill={COLORS.wood.side} rx="0.5" />
      <rect x="15" y={TOP + 3} width="2" height="5" fill={COLORS.wood.side} rx="0.5" />
      <rect x={32 - PAD - 5} y={TOP + 3} width="2" height="5" fill={COLORS.wood.side} rx="0.5" />
      
      {/* Seat - thinner */}
      <rect x={PAD} y={SEAT_Y} width={32 - PAD * 2} height={SEAT_H} 
        fill={COLORS.chair.seat} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={PAD} y={SEAT_Y} width={32 - PAD * 2} height="1.5" fill="#F0E8D8" />
      {/* Seat left side depth */}
      <rect x={PAD - 1} y={SEAT_Y} width="1.5" height={SEAT_H} fill={COLORS.wood.grain} />
      
      {/* Front legs - wider */}
      <rect x={PAD} y={SEAT_Y + SEAT_H} width="3.5" height={LEG_H} fill={COLORS.chair.legs} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={32 - PAD - 3.5} y={SEAT_Y + SEAT_H} width="3.5" height={LEG_H} fill={COLORS.chair.legs} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
    </svg>
  );
};
```

---

## 4. Geladeira (FridgeIcon) - Linhas 720-753

### Problemas
- Outline duplicado no topo (sobrepoe)
- Proporcao muito achatada
- Handles mal posicionados

### Correcoes

```tsx
// Fridge - 85° perspective with proper proportions
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  const left = 5;
  const right = 27;
  const top = 3;
  const bottom = 29;
  
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
      
      {/* Freezer compartment */}
      <rect x={left + 4} y={top + 4} width={right - left - 6} height="7" fill={COLORS.appliance.top} />
      <rect x={right - 5} y={top + 6} width="1.5" height="3" fill={COLORS.metal.handle} rx="0.3" />
      
      {/* Divider line */}
      <rect x={left + 4} y={top + 11.5} width={right - left - 6} height="1" fill={COLORS.metal.shadow} />
      
      {/* Fridge compartment */}
      <rect x={left + 4} y={top + 13} width={right - left - 6} height="12" fill={COLORS.appliance.top} />
      <rect x={right - 5} y={top + 17} width="1.5" height="4" fill={COLORS.metal.handle} rx="0.3" />
    </svg>
  );
};
```

---

## 5. Fogao (StoveIcon) - Linhas 521-573

### Problemas
- Queimadores muito pequenos
- Forno muito alto
- Knobs muito proximos do topo

### Correcoes

```tsx
// Stove - 85° perspective with proper proportions
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
  const top = 4;
  const bottom = 28;
  const center = (left + right) / 2;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      {!connectedLeft && (
        <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />
      )}
      
      {/* Cooktop surface - thicker for 85° */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top} width={right - left - (connectedLeft ? 0 : 2)} height="7" 
        fill={COLORS.metal.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* 4 Burners - larger and properly spaced */}
      <ellipse cx={center - 5} cy={top + 3.5} rx="3.5" ry="1.5" fill={COLORS.metal.shadow} />
      <ellipse cx={center - 5} cy={top + 3.5} rx="2" ry="0.8" fill={COLORS.metal.side} />
      <ellipse cx={center + 5} cy={top + 3.5} rx="3.5" ry="1.5" fill={COLORS.metal.shadow} />
      <ellipse cx={center + 5} cy={top + 3.5} rx="2" ry="0.8" fill={COLORS.metal.side} />
      
      {/* Body */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top + 7} width={right - left - (connectedLeft ? 0 : 2)} height={bottom - top - 7} 
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Control panel with knobs - lower position */}
      <rect x={left + (connectedLeft ? 1 : 3)} y={top + 8} width={right - left - (connectedLeft ? 2 : 4)} height="3" 
        fill={COLORS.metal.side} />
      <circle cx={center - 6} cy={top + 9.5} r="1.2" fill={COLORS.metal.handle} />
      <circle cx={center - 2} cy={top + 9.5} r="1.2" fill={COLORS.metal.handle} />
      <circle cx={center + 2} cy={top + 9.5} r="1.2" fill={COLORS.metal.handle} />
      <circle cx={center + 6} cy={top + 9.5} r="1.2" fill={COLORS.metal.handle} />
      
      {/* Oven door - smaller */}
      <rect x={left + (connectedLeft ? 2 : 4)} y={top + 12} width={right - left - (connectedLeft ? 4 : 6)} height="9" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {/* Oven handle */}
      <rect x={left + (connectedLeft ? 3 : 5)} y={top + 13} width={right - left - (connectedLeft ? 6 : 8)} height="1.5" 
        fill={COLORS.metal.chrome} rx="0.5" />
      {/* Oven window */}
      <rect x={left + (connectedLeft ? 4 : 6)} y={top + 15.5} width={right - left - (connectedLeft ? 8 : 10)} height="4" 
        fill={COLORS.screen.display} opacity="0.4" />
    </svg>
  );
};
```

---

## 6. Pia (SinkIcon) - Linhas 576-626

### Problemas
- Torneira muito complexa e desproporcional
- Bacia muito alta
- Gabinete muito grande

### Correcoes

```tsx
// Sink - 85° perspective with balanced proportions
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
      
      {/* Basin - properly centered and sized */}
      <ellipse cx={center} cy={top + counterH / 2 + 1} rx="5.5" ry="2.5" 
        fill={COLORS.metal.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <ellipse cx={center} cy={top + counterH / 2 + 1} rx="4" ry="1.8" fill={COLORS.water.top} />
      <ellipse cx={center} cy={top + counterH / 2 + 1.5} rx="1" ry="0.4" fill={COLORS.metal.shadow} />
      
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

## Resumo das Correcoes

| Asset | Problemas Corrigidos |
|-------|---------------------|
| Mesa | Pernas mais largas (4px), avental mais fino (2px), lateral esquerda de profundidade |
| Escrivaninha | Pedestal mais estreito (9px), painel lateral esquerdo (nao perna fina), proporcoes balanceadas |
| Cadeira | 4 pernas visiveis (traseiras em opacidade), encosto mais alto (10px), lateral de profundidade, slats decorativos |
| Geladeira | Topo sem duplicacao de outline, proporcoes mais altas, handles menores |
| Fogao | Queimadores maiores (rx=3.5), painel de controle mais baixo, forno menor |
| Pia | Torneira simplificada, bacia centralizada, counter mais espesso (8px), gabinete menor (14px) |

---

## Secao Tecnica

### Padroes de Perspectiva 85°

1. **Lateral esquerda**: 1.5-2px de largura, cor `*.side`
2. **Faixa de topo**: 1.5-2.5px de altura, cor `*.top`
3. **Proporcao de pernas**: Largura minima 3.5-4px para equilibrio visual
4. **Avental/apron**: Maximo 2px de altura

### Hierarquia de Tamanho (Comparativo)

```text
Geladeira > Fogao/Pia > Mesa > Escrivaninha > Cadeira
  (maior)                                      (menor)
```

Isso reflete a escala real dos moveis em uma planta baixa.
