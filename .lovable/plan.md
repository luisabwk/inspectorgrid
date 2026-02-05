
# Correção da Perspectiva 85° dos Móveis

## Análise Visual dos Problemas Atuais

Baseado na verificação visual do jogo e comparação com a imagem de referência, identifiquei os seguintes problemas específicos:

### 1. Mesa (TableIcon) - PROBLEMA CRÍTICO
**Problema**: As pernas aparecem como pequenos quadrados flutuando no meio da célula, muito distantes dos cantos do tampo.
**Esperado na Ref**: Pernas devem estar nos 4 cantos do tampo, quase invisíveis (apenas 2px cada).

| Atual | Esperado |
|-------|----------|
| Pernas desconectadas do tampo | Pernas nos 4 cantos |
| Pernas y="topY + 9" muito abaixo | Pernas imediatamente abaixo do tampo |

**Correção**: Mover as pernas para ficarem diretamente abaixo dos cantos do tampo (não no meio).

### 2. Sofá (SofaIcon) - PROBLEMA MODERADO
**Problema**: A estrutura está muito "plana" e os elementos estão separados visualmente - braços, encosto e assento não formam uma unidade coesa.
**Esperado na Ref**: Sofá deve parecer uma única peça arredondada vista de cima.

**Correção**: 
- Unificar encosto + assento como uma forma contínua
- Braços como extensões arredondadas nas laterais
- Reduzir altura total para parecer mais top-down

### 3. Cama (BedIcon - Single) - PROBLEMA MODERADO
**Problema**: A cabeceira de madeira está muito visível e detalhada, e a moldura lateral é excessiva.
**Esperado na Ref**: Vista de cima com travesseiro e cobertor dominando, cabeceira mínima.

**Correção**:
- Reduzir altura da cabeceira de madeira (de 4px para 2px)
- Tornar frames laterais mais sutis
- Travesseiros mais proeminentes (elipses maiores)
- Cobertor ocupando mais espaço visual

### 4. Cadeira (ChairIcon) - OK com ajuste
**Problema**: O arco do encosto está muito longe do assento.
**Esperado**: Arco mais próximo do assento oval.

**Correção**: Ajustar posição Y do arco para ficar mais integrado ao assento.

### 5. Poltrona (ArmchairIcon) - PROBLEMA MODERADO
**Problema**: Estrutura muito retangular, não parece vista de cima.
**Esperado na Ref**: Forma mais arredondada vista de cima.

**Correção**: 
- Usar formas arredondadas (ellipse) em vez de rect para assento
- Braços como arcos laterais

## Detalhes Técnicos das Correções

### TableIcon (Linhas 356-401)

```typescript
// ANTES: Pernas flutuando no meio
<rect x={padding + 1} y={topY + 9} width="2" height="2" ... />
<rect x={padding + 1} y={bottomY - 2} width="2" height="2" ... />

// DEPOIS: Pernas nos cantos do tampo, conectadas
{!connectedLeft && !connectedTop && (
  <rect x={left + 1} y={topY + 5} width="2" height="2" fill={COLORS.wood.shadow} />
)}
{!connectedLeft && !connectedBottom && (
  <rect x={left + 1} y={bottomY - 3} width="2" height="2" fill={COLORS.wood.shadow} />
)}
{!connectedRight && !connectedTop && (
  <rect x={right - 3} y={topY + 5} width="2" height="2" fill={COLORS.wood.shadow} />
)}
{!connectedRight && !connectedBottom && (
  <rect x={right - 3} y={bottomY - 3} width="2" height="2" fill={COLORS.wood.shadow} />
)}
```

### SofaIcon (Linhas 273-353)

Redesenhar para perspectiva 85° mais coesa:

```typescript
// Nova estrutura:
// 1. Base arredondada única (não separar encosto/assento)
// 2. Almofada central oval
// 3. Braços como extensões arredondadas

<svg viewBox="0 0 32 32">
  {/* Base do sofá - retângulo arredondado */}
  <rect x={left} y={top} width={right - left} height="16" 
    fill={COLORS.sofa.front}
    rx="3" ry="3"
    stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
  
  {/* Topo mais claro */}
  <rect x={left} y={top} width={right - left} height="3" 
    fill={COLORS.sofa.top} rx="3" ry="0" />
  
  {/* Almofadas */}
  <ellipse cx="12" cy={top + 9} rx="5" ry="4" fill={COLORS.sofa.cushionTop} />
  <ellipse cx="20" cy={top + 9} rx="5" ry="4" fill={COLORS.sofa.cushionTop} />
  
  {/* Braços arredondados */}
  {!connectedLeft && (
    <ellipse cx={left + 2} cy={top + 8} rx="2" ry="6" fill={COLORS.sofa.arm} />
  )}
  {!connectedRight && (
    <ellipse cx={right - 2} cy={top + 8} rx="2" ry="6" fill={COLORS.sofa.arm} />
  )}
</svg>
```

### BedIcon Single (Linhas 247-270)

Ajustes para perspectiva 85°:

```typescript
// Reduzir cabeceira de 4px para 2px
<rect x="2" y="0" width="28" height="2" fill={COLORS.wood.front} ... />

// Frames laterais mais finos (de 2px para 1.5px)
<rect x="1" y="2" width="1.5" height="28" fill={COLORS.bed.frame} ... />
<rect x="29.5" y="2" width="1.5" height="28" fill={COLORS.bed.frame} ... />

// Travesseiros maiores
<ellipse cx="10" cy="8" rx="6" ry="4" fill={COLORS.bed.pillow} />
<ellipse cx="22" cy="8" rx="6" ry="4" fill={COLORS.bed.pillow} />

// Cobertor começando mais cedo
<rect x="4" y="12" width="24" height="14" fill={COLORS.bed.blanket} />
```

### ChairIcon (Linhas 594-629)

Ajustar posicionamento do arco:

```typescript
// Arco mais próximo do assento
<path d="M9,12 Q16,6 23,12" ... />

// Assento um pouco mais alto
<ellipse cx="16" cy="18" rx="8" ry="6" ... />

// Pernas reposicionadas
<circle cx="10" cy="24" r="1.2" ... />
<circle cx="22" cy="24" r="1.2" ... />
```

### ArmchairIcon (Linhas 547-591)

Redesenhar com formas arredondadas:

```typescript
<svg viewBox="0 0 32 32">
  {/* Assento oval */}
  <ellipse cx="16" cy="16" rx="10" ry="8" 
    fill={COLORS.armchair.cushion}
    stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
  
  {/* Encosto como arco */}
  <path d="M7,10 Q16,2 25,10" 
    stroke={COLORS.armchair.front} strokeWidth="4" fill="none" />
  
  {/* Braços arredondados nas laterais */}
  <ellipse cx="7" cy="14" rx="2" ry="5" fill={COLORS.armchair.side} />
  <ellipse cx="25" cy="14" rx="2" ry="5" fill={COLORS.armchair.side} />
  
  {/* Pés pequenos */}
  <circle cx="8" cy="24" r="1.5" fill={COLORS.wood.shadow} />
  <circle cx="24" cy="24" r="1.5" fill={COLORS.wood.shadow} />
</svg>
```

## Arquivo a Modificar

| Arquivo | Alterações |
|---------|-----------|
| `src/components/game/assets/AssetIcons.tsx` | Ajustar TableIcon, SofaIcon, BedIcon, ChairIcon, ArmchairIcon |

## Ordem de Implementação

1. **TableIcon** - Corrigir posição das pernas para os cantos
2. **SofaIcon** - Redesenhar com formas mais arredondadas e coesas
3. **BedIcon (Single)** - Reduzir cabeceira e frames, aumentar travesseiros
4. **ChairIcon** - Reposicionar arco mais próximo do assento
5. **ArmchairIcon** - Redesenhar com assento oval e braços arredondados

## Validação

1. Verificar que a mesa tem pernas nos 4 cantos do tampo
2. Confirmar que o sofá parece uma peça única arredondada
3. Verificar que a cama tem vista top-down com travesseiros proeminentes
4. Confirmar que a cadeira tem arco integrado ao assento
5. Verificar que a poltrona tem forma arredondada
