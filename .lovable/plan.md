
# Correção dos Móveis para Perspectiva 85° Consistente (Isométrica Sutil)

## Problema Principal

Os móveis foram incorretamente convertidos para perspectiva 90° (top-down), quando deveriam manter a perspectiva **85° isométrica** com profundidade sutil visível - similar ao estilo original mas com menos profundidade.

## Análise Visual dos Problemas

| Móvel | Problema Atual | Correção Necessária |
|-------|---------------|---------------------|
| **Mesa** | Pernas são pequenos quadrados flutuando | Restaurar pernas trapezoidais (menores que antes) |
| **Sofá** | Muito plano, perdeu elipses nos braços | Restaurar elipses de topo nos braços para curvatura |
| **Poltrona** | Muito plana, sem profundidade nos braços | Restaurar elipses de topo nos braços |
| **Cama** | Travesseiros em elipse top-down | Manter travesseiros retangulares com profundidade |
| **Cadeira** | Arco + elipse são muito top-down | Restaurar encosto retangular com slats, assento com profundidade |
| **Escrivaninha** | Pernas como quadrados | Restaurar pernas retangulares com altura |

## Perspectiva 85° Explicada

A perspectiva 85° é uma **perspectiva isométrica sutil**:
- Não é 90° (completamente top-down/plana)
- Não é 75° (isométrica exagerada com lados grandes)
- É um meio-termo: **objetos mostram frente/profundidade, mas minimamente**

```text
75° (muito lateral):     85° (sutil):           90° (top-down):
   _______                  _______                _______
  /      /|                /      /|              |       |
 /______/ |               /______/ |              |       |
|      | /               |______|/                |_______|
|______|/
  Lado grande            Lado mínimo              Sem lado
```

## Solução

### 1. Restaurar SofaIcon com elipses nos braços

```typescript
{/* Left armrest - curved top for 85° depth */}
{!connectedLeft && (
  <>
    <rect x={padding} y={top + 2} width="5" height="14" 
      fill={COLORS.sofa.arm} stroke={OUTLINE} />
    {/* Elipse de topo para curvatura */}
    <ellipse cx={padding + 2.5} cy={top + 2} rx="2.5" ry="1.2" 
      fill={COLORS.sofa.top} />
  </>
)}
```

### 2. Restaurar ArmchairIcon com elipses nos braços

```typescript
{/* Left arm - curved */}
<rect x={left} y={top + 2} width="5" height="14" fill={COLORS.armchair.side} />
<ellipse cx={left + 2.5} cy={top + 2} rx="2.5" ry="1.2" 
  fill={COLORS.armchair.top} />
```

### 3. Restaurar TableIcon com pernas trapezoidais (menores)

```typescript
{/* Legs - smaller trapezoids for 85° */}
{!connectedLeft && (
  <>
    {/* Trapézio menor que 75° original */}
    <polygon points={`${padding+1},${topY+8} ${padding+4},${topY+8} ${padding+3.5},${bottomY} ${padding+1.5},${bottomY}`} 
      fill={COLORS.wood.shadow} />
  </>
)}
```

### 4. Restaurar ChairIcon com encosto retangular

```typescript
{/* Backrest - rectangle with depth, not arc */}
<rect x="8" y="3" width="16" height="7" 
  fill={COLORS.chair.back} stroke={OUTLINE} />
<rect x="8" y="3" width="16" height="2" fill={COLORS.chair.seat} />

{/* Seat - rectangle with depth */}
<rect x="6" y="12" width="20" height="10" 
  fill={COLORS.chair.seat} stroke={OUTLINE} />
<rect x="6" y="12" width="20" height="2" fill="#F0E8D8" />

{/* Legs - small trapezoids */}
<polygon points="7,22 10,22 9.5,28 7.5,28" fill={COLORS.chair.legs} />
```

### 5. Restaurar BedIcon Single com travesseiros retangulares

```typescript
{/* Pillows - rectangles with depth, not ellipses */}
<rect x={left + 2} y="8" width="10" height="5" rx="1" 
  fill={COLORS.bed.pillow} stroke={OUTLINE} />
<rect x={left + 2} y="8" width="10" height="1.5" 
  fill={COLORS.bed.pillowShade} />
```

### 6. Restaurar DeskIcon com pernas retangulares com altura

```typescript
{/* Left legs - rectangles with height */}
{!connectedLeft && (
  <>
    <rect x={padding + 1} y={topY + 5} width="3" height={bottomY - topY - 5} 
      fill={COLORS.wood.side} />
    <rect x={padding + 1} y={topY + 5} width="3" height="2" 
      fill={COLORS.wood.front} />
  </>
)}
```

## Elementos Chave da Perspectiva 85°

1. **Elipses de topo** - Braços de sofá/poltrona têm elipse curvada no topo
2. **Pernas trapezoidais** - Mas menores que na perspectiva 75°
3. **Faixas de highlight** - 2px de cor mais clara no topo dos elementos
4. **Travesseiros retangulares** - Com arredondamento sutil (rx="1")
5. **Profundidade lateral mínima** - Apenas indicação sutil, não lados grandes

## Arquivo a Modificar

| Arquivo | Mudanças |
|---------|----------|
| `src/components/game/assets/AssetIcons.tsx` | Restaurar ~6 ícones para perspectiva 85° isométrica |

## Ordem de Implementação

1. **SofaIcon** - Adicionar elipses de volta nos braços
2. **ArmchairIcon** - Adicionar elipses de volta nos braços
3. **TableIcon** - Restaurar pernas trapezoidais menores
4. **ChairIcon** - Substituir arco por retângulo com profundidade
5. **BedIcon (Single)** - Substituir elipses por retângulos arredondados
6. **DeskIcon** - Restaurar pernas retangulares com altura

## Validação

1. Verificar que sofá e poltrona têm braços curvados (elipses no topo)
2. Verificar que mesa e cadeira têm pernas trapezoidais
3. Verificar que cama tem travesseiros retangulares
4. Confirmar que todos os móveis têm profundidade sutil consistente (85°)
5. Comparar visualmente para garantir que a perspectiva é coesa entre todos os móveis
