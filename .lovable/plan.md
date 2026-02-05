
# Correção dos Ângulos de Perspectiva dos Móveis

## Análise da Referência vs. Atual

A imagem de referência mostra móveis com perspectiva **quase completamente top-down (90°)**, enquanto os ícones atuais usam uma perspectiva **isométrica de 75°** com profundidade lateral visível.

```text
REFERÊNCIA (90°):           ATUAL (75°):
+------------------+        +------------------+
|                  |        |                 /|
|  [MESA VISTA     |        |  [MESA COM     / |
|   DE CIMA]       |        |   LADO        /  |
|                  |        |   VISÍVEL]   /   |
+------------------+        +--------------+---+
   Vista plana               Perspectiva lateral
```

## Problemas Específicos por Ícone

| Ícone | Problema | Correção Necessária |
|-------|----------|---------------------|
| **TableIcon** | Tem `polygon` com pernas em ângulo | Pernas retas verticais, sem trapézio |
| **DeskIcon** | Pernas em ângulo isométrico | Pernas retangulares verticais |
| **ChairIcon** | Pernas em trapézio, encosto com profundidade | Formas retangulares simples |
| **SofaIcon** | Base frame tem altura excessiva | Reduzir altura do frame base |
| **ArmchairIcon** | Braços muito altos lateralmente | Braços mais curtos e planos |
| **BookshelfIcon** | Tem `polygon` de profundidade lateral | Remover polígono lateral |
| **FridgeIcon** | Tem polígono lateral visível | Remover profundidade lateral |
| **TvIcon** | Stand com perspectiva | Simplificar para retângulos |
| **StoveIcon** | Tem polígono lateral no corpo | Remover lado visível |
| **BedIcon** | Frame tem profundidade visível | Manter retangular sem ângulo |

## Solução Proposta

### Princípios da Nova Perspectiva (90° Top-Down)

1. **Eliminar polígonos laterais** - Todos os `<polygon>` que criam efeito de profundidade devem ser removidos
2. **Pernas retangulares** - Em vez de trapézios, usar `<rect>` simples
3. **Sem inclinação** - Nenhuma forma deve ter inclinação lateral
4. **Altura mínima de "front"** - A face frontal deve ser apenas uma linha fina (1-2px)

### Transformações por Ícone

#### TableIcon (Mesa)
```text
ANTES:                      DEPOIS:
Pernas em trapézio          Pernas em retângulo
<polygon points="...">      <rect x="..." width="2" />
```

#### ChairIcon (Cadeira)
- Remover trapézio das pernas
- Encosto apenas 2px de altura de "frente"
- Assento completamente plano

#### BookshelfIcon (Estante)
- Remover o `<polygon>` de profundidade lateral
- Manter apenas face frontal retangular

#### FridgeIcon (Geladeira)
- Remover o polígono lateral (`points="${right},${top + 3}..."`)
- Corpo puramente retangular

#### TvIcon
- Stand simplificado sem perspectiva
- Apenas retângulos

#### ArmchairIcon e SofaIcon
- Reduzir altura dos braços
- Eliminar elipses de "topo curvo" que sugerem profundidade
- Base mais fina (2-3px em vez de 4-5px)

#### StoveIcon
- Remover polígono lateral do corpo

## Arquivos a Modificar

| Arquivo | Alterações |
|---------|------------|
| `src/components/game/assets/AssetIcons.tsx` | Refatorar ~12 ícones para perspectiva 90° |

## Detalhes Técnicos

### Padrão de Estrutura (Nova)

```typescript
// ANTES (75° isométrico):
<polygon points={`${left},${top} ${left+2},${top-2} ${left+2},${bottom} ${left},${bottom+2}`} 
  fill={COLORS.wood.side} />

// DEPOIS (90° top-down):
// Simplesmente remover polígonos laterais
// Usar apenas <rect> para todas as formas
```

### Proporções da Referência

Baseado na imagem de referência:
- **Cama**: Vista completamente de cima, travesseiro em elipse achatada
- **Cadeira**: Encosto fino (2px), assento quadrado arredondado
- **Mesa**: Tampa plana, pernas como pequenos retângulos nos cantos
- **Planta**: Vaso trapezoidal, folhas como elipses alongadas
- **TV**: Monitor retangular, base simples
- **Estante**: Face única, prateleiras horizontais

### Cores de Sombra

Em vez de faces laterais, usar apenas:
- Linha de sombra na base (1-2px mais escura)
- Highlight no topo (1px mais claro)

## Validação

1. Abrir `/game` e verificar todos os móveis
2. Confirmar que nenhum móvel tem "lado" visível
3. Verificar que a perspectiva é consistentemente top-down
4. Comparar com a imagem de referência fornecida
