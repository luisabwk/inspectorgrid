

# Redesenho do Vaso Sanitário com Perspectiva ¾ Diagonal

## Problema Identificado

O vaso sanitário atual é composto por retângulos empilhados verticalmente (tanque → assento → bacia), formando uma "caixa" genérica que não se diferencia visualmente de outros eletrodomésticos como geladeira ou fogão.

```text
ATUAL (vista frontal empilhada):
┌──────────────────┐
│ ┌──────────────┐ │  ← Tanque (retângulo)
│ └──────────────┘ │
│ ┌──────────────┐ │  ← Assento (retângulo)
│ └──────────────┘ │
│ ┌──────────────┐ │  ← Bacia (retângulo)
│ └──────────────┘ │
└──────────────────┘
```

O formato **não comunica** que é um vaso sanitário porque:
- Falta a silhueta característica (tanque atrás + bacia oval na frente)
- Todos os elementos estão alinhados no mesmo eixo vertical
- Parece mais uma estante ou armário empilhado

---

## Solução Proposta: Perspectiva ¾ com Rotação Sutil

Redesenhar o vaso com uma **orientação diagonal (~30°)** que mostra:
1. O tanque posicionado na parte de trás (canto superior)
2. A bacia oval saindo em direção ao observador
3. A silhueta icônica do vaso sanitário reconhecível

```text
PROPOSTO (perspectiva ¾ diagonal):
┌──────────────────┐
│      ┌───┐       │  ← Tanque (canto superior-direito)
│     ┌┘   └┐      │     rotacionado
│    ┌───────┐     │  
│   │   ◯    │     │  ← Assento oval com abertura
│    ╲       ╱     │
│     ╲_____╱      │  ← Bacia arredondada (frente)
└──────────────────┘
```

---

## Implementação Técnica

### Abordagem com SVG Transform

```tsx
export const ToiletIcon = ({ className }: AssetIconProps) => {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Grupo principal rotacionado -25° em torno do centro */}
      <g transform="rotate(-25, 16, 16)">
        
        {/* TANQUE - posicionado atrás */}
        <rect x="11" y="3" width="2" height="7" fill={COLORS.appliance.side} />
        <rect x="13" y="3" width="8" height="7" 
          fill={COLORS.appliance.front}
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="11" y="3" width="10" height="1.5" fill={COLORS.appliance.top} />
        <ellipse cx="17" cy="5.5" rx="1.5" ry="0.7" fill={COLORS.metal.chrome} />
        
        {/* ASSENTO/TAMPA - formato oval */}
        <ellipse cx="16" cy="14" rx="9" ry="5" 
          fill={COLORS.appliance.front}
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <ellipse cx="16" cy="13" rx="8" ry="4" fill={COLORS.appliance.top} />
        <ellipse cx="16" cy="14" rx="6" ry="3" fill={COLORS.metal.top} />
        
        {/* BACIA - oval alongada */}
        <ellipse cx="16" cy="22" rx="10" ry="6" 
          fill={COLORS.appliance.front}
          stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <ellipse cx="16" cy="21" rx="6" ry="3.5" fill={COLORS.water.top} />
        
      </g>
      
      {/* Sombra base (NÃO rotacionada para ancorar) */}
      <ellipse cx="16" cy="28" rx="9" ry="2" 
        fill={COLORS.appliance.shadow} opacity="0.4" />
    </svg>
  );
};
```

---

## Parâmetros de Design

| Parâmetro | Valor | Justificativa |
|-----------|-------|---------------|
| **Ângulo de rotação** | -25° | Diagonal suave, reconhecível |
| **Centro de rotação** | (16, 16) | Centro do viewBox |
| **Formas do assento/bacia** | Elipses | Mais natural para vasos |
| **Forma do tanque** | Retângulo | Mantém indicador de profundidade 85° |
| **Sombra** | Não rotacionada | Ancora o asset no grid |

---

## Elementos Visuais

| Componente | Forma | Posição | Cor |
|------------|-------|---------|-----|
| Tanque | Retângulo 8x7 | Canto superior | `appliance.front` + depth |
| Botão descarga | Elipse pequena | Centro do tanque | `metal.chrome` |
| Tampa/Assento | Elipse 18x10 | Centro | `appliance.top` |
| Abertura | Elipse 12x6 | Centro do assento | `metal.top` (escuro) |
| Bacia | Elipse 20x12 | Parte inferior | `appliance.front` |
| Água | Elipse 12x7 | Centro da bacia | `water.top` |
| Sombra | Elipse 18x4 | Base (não rotacionada) | `appliance.shadow` |

---

## Comparação Visual

```text
ANTES (não reconhecível):     DEPOIS (icônico):
┌────────────────┐            ┌────────────────┐
│ ████████████   │            │      ▄██▄      │
│ ████████████   │            │    ▄██████▄    │
│ ████████████   │    →       │   ██  ○○  ██   │
│ ████████████   │            │    ▀██████▀    │
│ ████████████   │            │     ▀▀▀▀▀▀     │
└────────────────┘            └────────────────┘
   "Uma caixa?"                 "Ah, um vaso!"
```

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx` - linhas 955-1013

---

## Seção Técnica

### Por que rotação e não redesenho completo?

1. **Simplicidade**: `transform="rotate(-25, 16, 16)"` aplica a rotação a todos os elementos internos
2. **Manutenibilidade**: Os elementos individuais mantêm coordenadas relativas simples
3. **Consistência**: Ainda segue o padrão de cores da paleta `COLORS`

### Preservação da Perspectiva 85°

- O **tanque** mantém os indicadores de profundidade lateral (`appliance.side`)
- O **assento e bacia** usam elipses que naturalmente comunicam perspectiva de cima
- A **rotação do grupo** cria a sensação de ¾ sem quebrar o estilo

### Hierarquia de Z-Index (ordem de desenho)

1. Tanque (fundo)
2. Assento/Tampa
3. Bacia (frente)
4. Sombra (último, mas fora do grupo rotacionado)

