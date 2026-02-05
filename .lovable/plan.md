
# Correção da Cama: Suporte a Conexão Horizontal E Vertical

## Problema Atual (Diagnóstico Visual)

No screenshot, a cama no quarto (células L1-C5 e L2-C5) aparece como **duas camas de 1 quadrado cada** em vez de uma cama conectada.

### Causa raiz:
1. No `GameGrid.tsx`, as linhas 217-218 **desabilitam** as conexões horizontais:
   ```typescript
   const hasBedLeft = false; // Disabled
   const hasBedRight = false; // Disabled
   ```
2. O layout do testCase está com cama **vertical** (`grid[0][4]` e `grid[1][4]`)
3. Mas o `BedIcon` só detecta `connectedTop/Bottom`, que ESTÃO sendo passados corretamente
4. O bug visual indica que o ícone não está usando esses valores corretamente

Revisando o código do `BedIcon`, vejo que a lógica de segmentos está correta, mas o problema é que **as props não estão sendo passadas ao componente** devido ao bug no GameGrid.

## Solução Completa

### 1. GameGrid.tsx - Reativar conexões horizontais da cama
Alterar as linhas 217-218 para calcular corretamente:

```typescript
// ANTES (desabilitado):
const hasBedLeft = false;
const hasBedRight = false;

// DEPOIS (ativado):
const hasBedLeft = hasBedAsset(cell) && hasBedAsset(leftCell) && !hasWallLeft;
const hasBedRight = hasBedAsset(cell) && hasBedAsset(rightCell) && !hasWallRight;
```

### 2. BedIcon em AssetIcons.tsx - Adicionar suporte dual-orientation

Refatorar para detectar qual tipo de conexão está ativa:

```text
┌─────────────────────────────────────────────────────┐
│                  LÓGICA DE DETECÇÃO                 │
├─────────────────────────────────────────────────────┤
│ isHorizontal = connectedLeft || connectedRight      │
│ isVertical = connectedTop || connectedBottom        │
│                                                     │
│ Se HORIZONTAL:                                      │
│   - isLeftEnd = !connectedLeft && connectedRight    │
│     → Cabeceira esquerda + travesseiros            │
│   - isRightEnd = connectedLeft && !connectedRight   │
│     → Cobertor + pé da cama                        │
│                                                     │
│ Se VERTICAL:                                        │
│   - isHeadSegment = !connectedTop && connectedBottom│
│     → Cabeceira no topo + travesseiros             │
│   - isFootSegment = connectedTop && !connectedBottom│
│     → Cobertor + peseira                           │
└─────────────────────────────────────────────────────┘
```

### 3. Ilustração Visual do Resultado Esperado

**Cama Horizontal (2 células lado a lado):**
```text
┌──────────────────┬──────────────────┐
│ CÉLULA ESQUERDA  │  CÉLULA DIREITA  │
│   (isLeftEnd)    │   (isRightEnd)   │
│                  │                  │
│ ┌──────┬───────┐ │ ┌──────────────┐ │
│ │CABEC │ TRAV  │─┼─│  COBERTOR    │ │
│ │EIRA  │ ESSEI │ │ │    AZUL      │ │
│ └──────┴───────┘ │ └──────────────┘ │
│   FRAME LEFT     │   FRAME RIGHT    │
└──────────────────┴──────────────────┘
```

**Cama Vertical (2 células em coluna):**
```text
┌──────────────────┐
│ CÉLULA SUPERIOR  │
│   (isHeadSegment)│
│                  │
│ ┌──────────────┐ │
│ │ CABECEIRA    │ │
│ │ [TRAV][TRAV] │ │
│ │   LENÇOL     │ │
│ └──────────────┘ │
├──────────────────┤
│ CÉLULA INFERIOR  │
│   (isFootSegment)│
│                  │
│ ┌──────────────┐ │
│ │  COBERTOR    │ │
│ │    AZUL      │ │
│ │  PESEIRA     │ │
│ └──────────────┘ │
└──────────────────┘
```

### 4. Atualizar testCase.ts para testar horizontal

Trocar a cama de vertical para horizontal no quarto:

```typescript
// ANTES (vertical):
grid[0][4].asset = 'bed';  // row 0, col 4
grid[1][4].asset = 'bed';  // row 1, col 4

// DEPOIS (horizontal):
grid[0][3].asset = 'bed';  // row 0, col 3 (cabeceira esquerda)
grid[0][4].asset = 'bed';  // row 0, col 4 (pé direita)
```

E ajustar o solution para manter coerência:
```typescript
'suspect-2': { row: 0, col: 3 }, // Beatriz na cabeceira da cama
```

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/components/game/GameGrid.tsx` | Reativar `hasBedLeft`/`hasBedRight` (linhas 217-218) |
| `src/components/game/assets/AssetIcons.tsx` | Refatorar `BedIcon` para dual-orientation |
| `src/data/testCase.ts` | Trocar cama para horizontal (testar a nova feature) |

## Validação

1. Abrir `/game` e verificar o quarto:
   - A cama horizontal deve mostrar cabeceira à ESQUERDA e cobertor à DIREITA
   - As duas células devem formar uma cama única visualmente coerente

2. (Opcional) Testar cama vertical em outro layout futuro para garantir retrocompatibilidade
