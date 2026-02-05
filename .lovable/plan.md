
# Correção dos Móveis para Perspectiva 85° (Top-Down com Sutil Profundidade)

## Análise da Referência

A imagem de referência mostra móveis com perspectiva quase top-down (85°), com características específicas:

| Elemento | Característica na Referência |
|----------|------------------------------|
| **Cama** | Travesseiro bege retangular arredondado, cobertor verde-oliva liso, moldura mínima |
| **Cadeira** | Encosto em arco curvo, assento oval bege claro, pernas como pequenos pontos |
| **Mesa** | Tampo amarelo/bege liso, pernas minúsculas nos cantos (quase invisíveis) |
| **Planta** | Vaso azul-turquesa trapezoidal, folhas verdes alongadas |
| **TV** | Monitor preto fino, rack/mesa preta embaixo (sem pescoço alto) |
| **Estante** | Face única marrom, livros coloridos, SEM lado lateral visível |
| **Sofá/Poltrona** | Formas arredondadas, braços baixos, vista quase plana |

## Problemas Atuais vs Referência

### Ícones com Perspectiva Exagerada (75°)

| Ícone | Problema | Solução |
|-------|----------|---------|
| **TableIcon** | Pernas em polygon trapezoidal | Pernas como pequenos rect (2x2px) nos cantos |
| **DeskIcon** | Perna em polygon trapezoidal | Perna como rect simples |
| **ChairIcon** | Encosto retangular alto, pernas trapezoidais | Encosto em arco, assento oval, pernas como círculos |
| **FridgeIcon** | Polygon lateral de profundidade (linha 641-642) | Remover polygon, manter corpo retangular |
| **BookshelfIcon** | Polygon lateral (linha 709-710) | Remover polygon lateral |
| **StoveIcon** | Polygon lateral (linha 462) | Remover polygon lateral |
| **ArmchairIcon** | Elipses de topo nos braços sugerem 3D excessivo | Reduzir altura das elipses ou remover |
| **SofaIcon** | Elipses de topo nos braços (linhas 329, 340) | Reduzir ou remover |

### Cores a Ajustar

A referência usa cores mais pastel/suaves:

| Elemento | Cor Atual | Cor da Referência |
|----------|-----------|-------------------|
| Travesseiro | `#FFFFFF` branco | `#F5E8D0` bege claro |
| Cobertor | `#6B9BD1` azul | `#8B9B68` verde-oliva |
| Vaso da planta | `#D08050` laranja | `#78B8A8` azul-turquesa |
| Mesa (tampo) | `#DCC8A8` | `#E8C878` amarelo claro |
| Cadeira (assento) | `#DCC8A8` | `#E8DCC8` bege mais claro |

## Transformações Detalhadas

### 1. ChairIcon (Maior Mudança)

A cadeira na referência tem:
- Encosto como arco curvo fino (não retângulo)
- Assento oval/arredondado (não retangular)
- Pernas como 4 pequenos círculos/pontos nos cantos

```text
ATUAL:                    REFERÊNCIA (85°):
+--------+                   \_____/      <- Arco curvo
|  rect  |                  (       )     <- Assento oval
+--------+                   o     o      <- Pernas circulares
```

Mudanças no código:
- Substituir `<rect>` do encosto por `<path>` em arco
- Substituir `<rect>` do assento por `<ellipse>`
- Substituir `<polygon>` das pernas por `<circle>` pequenos

### 2. TableIcon

Mudanças:
- Manter tampo como está
- Substituir `<polygon>` das pernas por `<rect width="2" height="2">`

### 3. FridgeIcon

Remover a linha 641-642:
```typescript
// REMOVER:
<polygon points={`${right},${top + 3} ${right + 2},${top + 1}...`} />
```

### 4. BookshelfIcon

Remover a linha 709-710:
```typescript
// REMOVER:
<polygon points={`${right},${top + 2} ${right + 1},${top + 1}...`} />
```

### 5. StoveIcon

Remover a linha 462:
```typescript
// REMOVER:
{!connectedRight && <polygon points={...} fill={COLORS.metal.side} />}
```

### 6. ArmchairIcon e SofaIcon

Reduzir elipses de topo dos braços:
- Mudar `ry="1.5"` para `ry="0.8"` (mais plano)
- Ou remover completamente as elipses

### 7. PlantIcon

Mudar cor do vaso:
```typescript
// ANTES:
pot: '#D08050',     // Laranja
// DEPOIS:
pot: '#78B8A8',     // Azul-turquesa
```

### 8. BedIcon (Single)

Ajustar cores:
```typescript
// ANTES:
pillow: '#FFFFFF',
blanket: '#6B9BD1',
// DEPOIS:
pillow: '#F5E8D0',  // Bege
blanket: '#8B9B68', // Verde-oliva
```

## Arquivo a Modificar

| Arquivo | Alterações |
|---------|-----------|
| `src/components/game/assets/AssetIcons.tsx` | ~12 ícones para perspectiva 85° + cores |

## Detalhes Técnicos

### Paleta de Cores Atualizada

```typescript
const COLORS = {
  wood: {
    top: '#E8C878',      // Amarelo mais claro
    front: '#B89870',
    side: '#8C6C48',
    shadow: '#604428',
  },
  bed: {
    pillow: '#F5E8D0',   // Bege (antes branco)
    pillowShade: '#E8DCC0',
    blanket: '#8B9B68',  // Verde-oliva (antes azul)
    blanketLight: '#A0B080',
  },
  plant: {
    pot: '#78B8A8',      // Azul-turquesa (antes laranja)
    potSide: '#5A9A8A',
  },
  chair: {
    seat: '#E8DCC8',     // Bege claro
    back: '#C8B898',
  },
  // ... resto mantido
};
```

### Estrutura da Nova ChairIcon

```typescript
export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Encosto em arco */}
      <path d="M8,10 Q16,4 24,10" 
        stroke={COLORS.wood.front} strokeWidth="3" fill="none" />
      
      {/* Assento oval */}
      <ellipse cx="16" cy="16" rx="9" ry="6" 
        fill="#E8DCC8"
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Pernas como pequenos círculos */}
      <circle cx="9" cy="22" r="1.5" fill={COLORS.wood.shadow} />
      <circle cx="23" cy="22" r="1.5" fill={COLORS.wood.shadow} />
      <circle cx="9" cy="12" r="1.5" fill={COLORS.wood.shadow} />
      <circle cx="23" cy="12" r="1.5" fill={COLORS.wood.shadow} />
    </svg>
  );
};
```

### Remoção de Polygons Laterais

Para cada ícone com polygon de profundidade:

```typescript
// ANTES (perspectiva 75°):
<polygon points={`${right},${top} ${right+2},${top-2} ...`} 
  fill={COLORS.xxx.side} />

// DEPOIS (perspectiva 85°):
// Simplesmente não incluir o polygon
// Manter apenas a face principal
```

## Ordem de Implementação

1. Atualizar paleta `COLORS` com novas cores da referência
2. **ChairIcon** - Redesenhar completamente (arco + oval + círculos)
3. **TableIcon** - Substituir polygons por rects
4. **DeskIcon** - Substituir polygon por rect
5. **FridgeIcon** - Remover polygon lateral
6. **BookshelfIcon** - Remover polygon lateral
7. **StoveIcon** - Remover polygon lateral
8. **ArmchairIcon** - Reduzir/remover elipses de braço
9. **SofaIcon** - Reduzir/remover elipses de braço
10. **PlantIcon** - Aplicar nova cor do vaso
11. **BedIcon** - Aplicar novas cores (travesseiro/cobertor)

## Validação

1. Abrir `/game` e verificar todos os móveis
2. Confirmar que nenhum móvel tem "lado" visível exagerado
3. Verificar que as cores correspondem à referência (beges, verde-oliva, turquesa)
4. Confirmar perspectiva 85° (sutil profundidade, mas não isométrica)
5. Comparar visualmente com a imagem de referência fornecida
