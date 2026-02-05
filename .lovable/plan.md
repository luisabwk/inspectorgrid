
# Padronizacao Visual dos Moveis

## Analise da Referencia

A imagem de referencia mostra um estilo visual especifico:

```text
CARACTERISTICAS-CHAVE:
+----------------------------------+
| 1. Contorno sutil marrom/cinza   |
|    (stroke ~1px, cor escura)     |
|                                  |
| 2. Vista mais top-down (~85-90°) |
|    (menos perspectiva lateral)   |
|                                  |
| 3. Respiro visual (~15-20%)      |
|    (padding interno na celula)   |
|                                  |
| 4. Proporcoes consistentes       |
|    (poltrona = cadeira em escala)|
|                                  |
| 5. Cores pastel suaves           |
|    (bege, verde musgo, azul)     |
+----------------------------------+
```

## Problemas Atuais

| Movel | Problema |
|-------|----------|
| ArmchairIcon | Preenche 100% da celula (x=2 a x=30), sem respiro |
| SofaIcon | Muito grande, preenche toda a celula |
| ChairIcon | Tamanho diferente da poltrona |
| Todos | Sem contorno/stroke definido |
| Todos | Perspectiva muito isometrica (75°) |

## Solucao Proposta

### 1. Adicionar contorno sutil a todos os moveis

Cada SVG tera um stroke sutil na cor `#5D4E37` (marrom escuro) com `stroke-width="0.8"` nas formas principais.

### 2. Ajustar proporcoes com respiro visual

```text
ANTES (sem respiro):           DEPOIS (com respiro):
+------------------------+     +------------------------+
|                        |     |    +--------------+    |
|  [MOVEL PREENCHE TUDO] |     |    |    MOVEL     |    |
|                        |     |    |   (~75-80%)  |    |
|                        |     |    +--------------+    |
+------------------------+     +------------------------+
      viewBox 0-32                 padding ~3-4px
```

Ajustes especificos:
- **ArmchairIcon**: De (x=2-30) para (x=6-26) = ~62% da largura
- **SofaIcon**: Reduzir altura e largura, deixar margens de ~3px
- **ChairIcon**: Proporcao similar a poltrona

### 3. Atualizar perspectiva para ~85-90°

Reduzir elementos laterais/profundidade. Os moveis serao mais "achatados" verticalmente, com enfase na vista de cima.

### 4. Padronizar cores

Manter paleta existente mas aplicar de forma mais consistente.

## Arquivos a Modificar

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/game/assets/AssetIcons.tsx` | Refatorar ArmchairIcon, SofaIcon, ChairIcon, TableIcon, PlantIcon, BookshelfIcon, TvIcon |

## Detalhes Tecnicos

### ArmchairIcon (Nova Estrutura)

```text
viewBox 0-32 com respiro:
+---------------------------+
|       +-------------+     |
|  [6]  |   POLTRONA  | [6] |  <- padding lateral 6px
|       |             |     |
|       +-------------+     |
+---------------------------+

Elementos:
- Contorno: stroke="#5D4E37" stroke-width="0.8"
- Base: x=6, width=20 (em vez de x=2, width=28)
- Cor: bege/creme (#E8DCC8) similar a referencia
```

### SofaIcon (Nova Estrutura - 2 celulas)

```text
CELULA 1 (esquerda):    CELULA 2 (direita):
+----------------+      +----------------+
|  +-------------|      |-------------+  |
|  |   ALMOFADA  |------|   ALMOFADA  |  |
|  |             |      |             |  |
|  +-------------|      |-------------+  |
+----------------+      +----------------+
    braco esq                braco dir

- Reduzir altura total (y=4 a y=26 em vez de y=2 a y=30)
- Manter conexao mas com respiro nas pontas
```

### ChairIcon (Padronizada com Poltrona)

```text
- Tamanho similar ao ArmchairIcon
- Vista mais top-down
- Contorno definido
- Padding de ~4px em cada lado
```

### PlantIcon, BookshelfIcon, TvIcon, TableIcon

Todos receberao:
1. Contorno sutil (`stroke="#5D4E37"`)
2. Respiro visual (padding ~3-4px)
3. Ajuste de perspectiva

## Validacao

1. Abrir `/game` e verificar visualmente:
   - Todos os moveis tem contorno sutil
   - Ha respiro visual entre o movel e a borda da celula
   - Poltrona e cadeira tem tamanhos consistentes
   - Sofa ocupa duas celulas mas nao as preenche totalmente
