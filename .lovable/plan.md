
# Correção da Poltrona (ArmchairIcon)

## Problema Identificado

Visualmente, a poltrona tem o **assento desconectado do restante** porque:

1. **Gap visual** entre o encosto (y: 6-12) e o assento (y: 12-18) e a base (y: 21-25)
2. Os elementos estão empilhados verticalmente com espaços entre eles
3. O assento flutua no meio, sem conexão visual com a base abaixo

### Estrutura Atual (Problemática)

```text
┌─────────────────┐  y=6   ← Encosto
│   Back rest     │
└─────────────────┘  y=12
                     ← GAP VISUAL
┌─────────────────┐  y=12  ← Assento
│  Seat cushion   │
└─────────────────┘  y=18
                     ← GAP VISUAL (3px)
┌─────────────────┐  y=21  ← Base
│   Base frame    │
└─────────────────┘  y=25
```

## Solução

Unificar a poltrona como uma **peça contínua**, seguindo a linguagem do sofá:

1. **Encosto + assento conectados** - sem gap entre eles
2. **Base estendida** - subir a base para tocar o assento
3. **Braços mais longos** - estender para conectar encosto ao assento
4. **Proporções integradas** - tudo como uma única peça de mobiliário

### Nova Estrutura (Corrigida)

```text
┌─────────────────┐  y=5   ← Encosto
│   Back rest     │
├─────────────────┤  y=10  ← Conexão direta
│  Seat cushion   │
├─────────────────┤  y=16  ← Conexão direta
│   Base/Front    │
└─────────────────┘  y=22
      ▼▼            y=24  ← Pés pequenos
```

## Detalhes Técnicos

### Arquivo a Modificar
`src/components/game/assets/AssetIcons.tsx` - linhas 637-685 (ArmchairIcon)

### Mudanças Específicas

1. **Remover gaps entre elementos**
   - Encosto: y=5 até y=10 (5px altura)
   - Assento: y=10 até y=16 (6px altura, conectado ao encosto)
   - Base frontal: y=16 até y=22 (6px altura, conectada ao assento)

2. **Estender braços para cobrir toda a altura**
   - Braços: y=6 até y=18 (12px, cobrindo encosto + assento)
   - Elipses de topo mantidas para curvatura 85°

3. **Ajustar pés**
   - Pés: y=22 até y=24 (2px, pequenos sob a base)

4. **Manter proporções gerais**
   - Padding lateral: 6px cada lado (left=6, right=26)
   - Largura total: 20px (adequada para célula 32x32)

### Código Corrigido

```typescript
export const ArmchairIcon = ({ className }: AssetIconProps) => {
  const left = 6;
  const right = 26;
  const top = 5;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Back rest - connected to seat */}
      <rect x={left + 2} y={top} width={right - left - 4} height="5" 
        fill={COLORS.armchair.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left + 2} y={top} width={right - left - 4} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Seat cushion - directly below backrest */}
      <rect x={left + 2} y={top + 5} width={right - left - 4} height="6" 
        fill={COLORS.armchair.cushion}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left + 2} y={top + 5} width={right - left - 4} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Base/front - directly below seat (85° depth) */}
      <rect x={left + 2} y={top + 11} width={right - left - 4} height="5" 
        fill={COLORS.armchair.front} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left + 2} y={top + 11} width={right - left - 4} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Left armrest - full height covering back+seat */}
      <rect x={left} y={top + 1} width="4" height="14" 
        fill={COLORS.armchair.side}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx={left + 2} cy={top + 1} rx="2" ry="1" 
        fill={COLORS.armchair.top} />
      
      {/* Right armrest - full height */}
      <rect x={right - 4} y={top + 1} width="4" height="14" 
        fill={COLORS.armchair.side}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx={right - 2} cy={top + 1} rx="2" ry="1" 
        fill={COLORS.armchair.top} />
      
      {/* Small feet */}
      <rect x={left + 2} y={top + 16} width="2" height="2" 
        fill={COLORS.wood.shadow} rx="0.5" />
      <rect x={right - 4} y={top + 16} width="2" height="2" 
        fill={COLORS.wood.shadow} rx="0.5" />
    </svg>
  );
};
```

## Comparação Visual

| Antes | Depois |
|-------|--------|
| Encosto separado do assento | Encosto conectado ao assento |
| Assento flutuando | Assento apoiado na base |
| Base desconectada | Base como continuação do assento |
| Braços curtos | Braços cobrindo toda a altura |

## Validação

1. A poltrona deve parecer uma **peça única** como o sofá
2. Não deve haver gaps visíveis entre encosto, assento e base
3. Os braços devem conectar visualmente o encosto ao assento
4. A perspectiva 85° deve ser mantida (elipses no topo dos braços)
5. Proporções adequadas para a célula (não muito grande/pequena)
