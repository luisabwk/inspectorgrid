
# Corrigir Perspectiva e Angulo dos Assets

## Diagnostico dos Problemas

Os assets atualmente misturam elementos de perspectiva frontal (90 graus) com a perspectiva 85 graus declarada. Para harmonizar com sofas, camas e poltronas (que ja usam 85 graus corretamente), precisamos adicionar indicadores visuais de profundidade consistentes.

### Principios da Perspectiva 85 Graus
- Superficies superiores mostram uma fina faixa de "topo" (1.5-2px)
- Partes frontais sao mais altas que partes traseiras
- Pernas/bases tem ligeira inclinacao trapezoidal
- Elipses horizontais (como queimadores) devem ter ry menor que rx

---

## Alteracoes por Asset

### 1. TableIcon (linhas 426-487)

**Problemas atuais:**
- Tampo com apenas 5px de altura (muito fino)
- Pernas completamente desconectadas visualmente do avental
- Avental (apron) sem conexao visual com pernas

**Correcoes:**
- Adicionar faixa de topo destacada no tampo
- Conectar pernas ao avental de forma continua
- Simplificar para 2 pernas visiveis (frente esquerda e frente direita) em perspectiva 85 graus

```tsx
// Novo tampo com profundidade
<rect x={left} y={topY} width={right - left} height="6" 
  fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
<rect x={left} y={topY} width={right - left} height="2" fill={COLORS.wood.top} />

// Avental conectado ao tampo
<rect x={left + 1} y={topY + 6} width={right - left - 2} height="3" fill={COLORS.wood.side} />

// Pernas retangulares simples (mais harmonico com 85 graus)
<rect x={left + 1} y={topY + 9} width="3" height={bottomY - topY - 9} 
  fill={COLORS.wood.shadow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
<rect x={right - 4} y={topY + 9} width="3" height={bottomY - topY - 9} 
  fill={COLORS.wood.shadow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
```

---

### 2. DeskIcon (linhas 491-537)

**Problemas atuais:**
- Pedestal de gavetas posicionado muito a direita
- Perna esquerda isolada e fina
- Sem indicacao visual de profundidade no tampo

**Correcoes:**
- Centralizar melhor o pedestal
- Adicionar painel lateral de profundidade
- Faixa de topo no tampo para 85 graus

```tsx
// Tampo com profundidade 85 graus
<rect x={left} y={topY} width={right - left} height="5" 
  fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
<rect x={left} y={topY} width={right - left} height="2" fill={COLORS.wood.top} />

// Pedestal reposicionado e com lateral visivel
<rect x={right - 11} y={topY + 5} width="10" height={bottomY - topY - 5} 
  fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
<rect x={right - 11} y={topY + 5} width="10" height="2" fill={COLORS.wood.top} />
// Lateral do pedestal (profundidade 85 graus)
<rect x={right - 12} y={topY + 5} width="1.5" height={bottomY - topY - 5} 
  fill={COLORS.wood.side} />

// Perna esquerda mais robusta
<rect x={left + 1} y={topY + 5} width="3.5" height={bottomY - topY - 5} 
  fill={COLORS.wood.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
```

---

### 3. ChairIcon (linhas 700-720)

**Problemas atuais:**
- Encosto muito largo (16px) comparado ao assento (20px)
- Pernas trapezoidais desproporcionais
- Gap entre encosto e assento

**Correcoes:**
- Encosto ligeiramente mais estreito e conectado ao assento
- Pernas retangulares simples (consistente com 85 graus)
- Adicionar espessura lateral no encosto

```tsx
// Encosto com profundidade
<rect x="9" y="4" width="14" height="8" 
  fill={COLORS.chair.back} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
<rect x="9" y="4" width="14" height="2" fill={COLORS.chair.seat} />
// Borda lateral do encosto
<rect x="8" y="4" width="1.5" height="8" fill={COLORS.wood.side} />

// Assento conectado ao encosto
<rect x="7" y="11" width="18" height="8" 
  fill={COLORS.chair.seat} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
<rect x="7" y="11" width="18" height="2" fill="#F0E8D8" />

// Pernas retangulares simples
<rect x="8" y="19" width="2.5" height="7" fill={COLORS.chair.legs} 
  stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
<rect x="21.5" y="19" width="2.5" height="7" fill={COLORS.chair.legs} 
  stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
```

---

### 4. FridgeIcon (linhas 724-754)

**Problemas atuais:**
- Corpo completamente frontal/plano
- Sem indicacao de profundidade lateral
- Portas ocupam toda a frente sem recuo

**Correcoes:**
- Adicionar lateral visivel (85 graus)
- Faixa de topo mais pronunciada
- Portas com leve recuo visual

```tsx
// Lateral esquerda (profundidade 85 graus)
<rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />

// Corpo principal com profundidade
<rect x={left + 2} y={top} width={right - left - 2} height={bottom - top} 
  fill={COLORS.appliance.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
<rect x={left} y={top} width={right - left} height="3" fill={COLORS.metal.top} />

// Portas com recuo
<rect x={left + 3} y={top + 2} width={right - left - 5} height="8" fill={COLORS.appliance.top} />
<rect x={left + 3} y={top + 11} width={right - left - 5} height="13" fill={COLORS.appliance.top} />
```

---

### 5. StoveIcon (linhas 541-586)

**Problemas atuais:**
- Tampo fino sem profundidade
- Burners como elipses puras (frontais)
- Corpo retangular sem lateral

**Correcoes:**
- Tampo mais grosso com highlight de topo
- Lateral visivel para profundidade
- Burners mais sutis

```tsx
// Lateral esquerda (profundidade 85 graus)
{!connectedLeft && (
  <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />
)}

// Tampo com profundidade
<rect x={left + (connectedLeft ? 0 : 2)} y={top} width={right - left - (connectedLeft ? 0 : 2)} height="6" 
  fill={COLORS.metal.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />

// Corpo principal
<rect x={left + (connectedLeft ? 0 : 2)} y={top + 6} width={right - left - (connectedLeft ? 0 : 2)} height={bottom - top - 6} 
  fill={COLORS.metal.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />

// Burners mais planos (elipses achatadas para 85 graus)
<ellipse cx={center - 4} cy={top + 3} rx="2.5" ry="1" fill={COLORS.metal.shadow} />
<ellipse cx={center + 4} cy={top + 3} rx="2.5" ry="1" fill={COLORS.metal.shadow} />
```

---

### 6. SinkIcon (linhas 588-633)

**Problemas atuais:**
- Contador sem profundidade lateral
- Gabinete completamente frontal
- Torneira desproporcionalmente grande

**Correcoes:**
- Adicionar lateral ao contador e gabinete
- Bacia mais proporcional
- Torneira redimensionada

```tsx
// Lateral esquerda (profundidade 85 graus)
{!connectedLeft && (
  <rect x={left} y="4" width="2" height="22" fill={COLORS.appliance.side} />
)}

// Contador com profundidade
<rect x={left + (connectedLeft ? 0 : 2)} y="4" width={right - left - (connectedLeft ? 0 : 2)} height="6" 
  fill={COLORS.appliance.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />

// Gabinete com lateral
<rect x={left + (connectedLeft ? 0 : 2)} y="10" width={right - left - (connectedLeft ? 0 : 2)} height="16" 
  fill={COLORS.appliance.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />

// Bacia menor e mais centrada
<ellipse cx="16" cy="6.5" rx="6" ry="3" fill={COLORS.metal.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
<ellipse cx="16" cy="6.5" rx="4.5" ry="2.2" fill={COLORS.water.top} />
```

---

## Resumo das Mudancas

| Asset | Problema Principal | Solucao |
|-------|-------------------|---------|
| Mesa | Pernas desconectadas | Pernas retangulares, avental continuo |
| Escrivaninha | Pedestal mal posicionado | Reposicionar, adicionar lateral |
| Cadeira | Pernas trapezoidais | Pernas retangulares, encosto conectado |
| Geladeira | Totalmente frontal | Lateral esquerda visivel |
| Fogao | Sem profundidade | Lateral + tampo mais alto |
| Pia | Gabinete plano | Lateral + contador com profundidade |

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## Secao Tecnica

### Padroes de Profundidade 85 Graus

1. **Faixa de topo**: 1.5-2px de altura com cor mais clara
2. **Lateral esquerda**: 1.5-2px de largura com cor intermediaria
3. **Corpo frontal**: Cor principal do material
4. **Pernas**: Retangulares simples, nao trapezoidais

### Cores Utilizadas

- `COLORS.wood.top` / `COLORS.metal.top` / `COLORS.appliance.top` - superficies superiores
- `COLORS.wood.side` / `COLORS.metal.side` / `COLORS.appliance.side` - laterais
- `COLORS.wood.front` / `COLORS.metal.front` / `COLORS.appliance.front` - frentes
