
## O que está errado agora (diagnóstico)
Pelo que vejo no código atual do `BedIcon` e pelo layout do caso de teste:

1) **O “cobertor” (blanket) está sendo desenhado em situações em que não deveria**, então a cama acaba parecendo “duas partes inferiores” repetidas (especialmente quando a cama está em 2 células).
   - No modo **horizontal**, o blanket é desenhado sempre (com `x=16` fixo), então a célula da esquerda também ganha “metade de cobertor”, o que quebra a leitura.
   - No modo **vertical**, o blanket também é desenhado sempre a partir de `y=16`, então a célula “de cima” também mostra cobertor, quando o natural é o cobertor ficar no “pé” (célula de baixo) numa cama 2x1.

2) Seu **testCase ainda está com a cama horizontal** (`grid[0][3]` e `grid[0][4]`), mas a regra que você quer é **cama conectada verticalmente**.

Resultado: o desenho não “conta uma história” coerente (cabeceira/travesseiros vs cobertor/peseira) e parece duplicado.

---

## Objetivo desta correção
- Fazer a cama **ficar imediatamente compreensível**:
  - **Cama vertical (2 células):**
    - Célula de cima: cabeceira + travesseiros + lençol (sem cobertor dominante)
    - Célula de baixo: cobertor + dobras + peseira (sem travesseiros)
  - **Cama única (1 célula):** cabeceira + travesseiros + cobertor + peseira (composição completa)
- **Respeitar proporção** no grid 32x32, mantendo o estilo isométrico atual (75°) e evitando elementos “cortados” ou duplicados.
- **Evitar que camas horizontais “quebrem”** caso alguém coloque uma por engano (ou: opcionalmente desabilitar conexão horizontal de vez).

---

## Mudanças planejadas (arquivos e o que será alterado)

### 1) `src/components/game/assets/AssetIcons.tsx` — refatorar o `BedIcon`
**A) Prioridade: tratar cama como “segmentos” (head / middle / foot / single)**
Vamos derivar flags bem claras:

- `isSingle`: sem conexões
- `isHeadSegment`: `!connectedTop && connectedBottom`
- `isFootSegment`: `connectedTop && !connectedBottom`
- `isMiddleSegment`: `connectedTop && connectedBottom`

**B) Blanket (cobertor) passa a ser condicional**
- Em cama vertical 2x1:
  - **Head segment:** não desenha blanket (ou desenha só um “fold” mínimo na borda de baixo, opcional)
  - **Foot segment:** desenha blanket como principal
- Em cama single:
  - desenha blanket ocupando a metade inferior como hoje (ou um pouco mais, mas coerente)

**C) Travesseiros e cabeceira passam a ser condicional**
- `Pillows` + `Headboard` apenas em `isHeadSegment || isSingle`
- `Footboard` apenas em `isFootSegment || isSingle` (e somente quando for uma extremidade real, isto é, `!connectedBottom` no vertical)

**D) Corrigir coordenadas “fixas” que criam sensação de duplicação**
- Remover valores rígidos que não respeitam o “tile”:
  - No modo horizontal atual, `blanket` com `x=16` fixo é uma das fontes de “metade de cobertor” no lugar errado.
- Mesmo que a gente mantenha suporte horizontal, ele ficará **coerente por segmento**:
  - Célula esquerda (head): pillows/headboard
  - Célula direita (foot): blanket/footboard
  - Nunca blanket “metade” em ambas

**E) (Opcional, recomendado) Simplificar: cama oficialmente só vertical**
Como você quer a cama vertical, dá para:
- manter o código horizontal só como fallback “bonito” caso alguém coloque errado, **ou**
- remover/ignorar horizontal definitivamente (mais simples, menos chance de bug visual).

Eu recomendo **manter um fallback decente** (não conectar, ou renderizar como single) para evitar “cama quebrada” em mapas futuros.

---

### 2) `src/components/game/GameGrid.tsx` — (opcional) restringir conexão da cama a vertical
Hoje o grid calcula:
- `hasBedTop`, `hasBedBottom`, **`hasBedLeft`, `hasBedRight`**

Se a regra do jogo é “cama só conecta vertical”, vamos ajustar para:
- `hasBedLeft = false`
- `hasBedRight = false`

Assim, mesmo que alguém coloque 2 beds lado a lado, **não vira uma cama conectada** (fica visualmente “duas camas”, o que denuncia o erro do layout).

---

### 3) `src/data/testCase.ts` — corrigir o layout do quarto para cama vertical
Hoje está:
- `grid[0][3] = 'bed'`
- `grid[0][4] = 'bed'`

Vamos mudar para **duas células na coluna** (mantendo `grid[0][4]` como cama para não quebrar sua solution atual, que usa `row:0,col:4`):
- `grid[0][4].asset = 'bed'`
- `grid[1][4].asset = 'bed'`
- remover o bed de `grid[0][3]`

Isso alinha o teste com a regra e deixa a validação visual direta.

---

## Como vamos validar (checklist bem objetivo)
1) Abrir `/game` e olhar o quarto:
   - A cama deve aparecer como **uma cama vertical 2 peças**:
     - topo com travesseiros/cabeceira
     - base com cobertor/peseira
   - Não pode parecer “duas partes inferiores” duplicadas.

2) Confirmar que **não existe cobertor “forte” na peça de cima** (a menos que seja um detalhe de dobra sutil).

3) Se mantivermos fallback horizontal:
   - colocar (temporariamente, em teste) duas camas lado a lado e checar que:
     - não vira “duas partes inferiores” repetidas
     - ou não conecta (dependendo da opção escolhida)

4) Garantir que cama single (se existir em algum layout futuro) ainda pareça completa.

---

## Riscos / armadilhas que vou evitar
- “Features repetidas” em ambos tiles (blanket em ambos, pillows em ambos).
- Coordenadas absolutas (tipo `x=16`) que ignoram `left/right` calculados e fazem o sprite “parecer metade errada”.
- Conexão horizontal continuar existindo no grid e “enganar” a regra do jogo.

---

## Entregáveis
- Ajustes no `BedIcon` para lógica de segmentos + renderização condicional coerente.
- Ajuste do caso de teste para cama vertical.
- (Opcional) Travar conexão horizontal da cama no `GameGrid`.

