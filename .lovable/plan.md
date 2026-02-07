
## Situação atual (o que está renderizando no grid agora)

- No caso carregado em `/game` (“O Mistério da Mansão Blackwood”, grid 6x6), o **vaso sanitário** está no **banheiro** em:
  - **row=2, col=4** (visualmente: **L3 / C5**)
  - Ao lado do chuveiro (row=2, col=5).
- O `ToiletIcon` atual (diff que você enviou) usa um `<g transform="rotate(-25, 16, 16)">` e **muitas elipses claras** (tons próximos de branco/cinza) com detalhes internos também claros.

## Diagnóstico (por que ainda não está inteligível)

1. **Rotação em SVG tende a “borrar”/anti-alias** em tamanhos pequenos, o que enfraquece a leitura “pixel art nítida”.
2. **A abertura do assento está clara demais**: hoje ela usa `COLORS.metal.top` (quase branco). Em escala pequena, isso não comunica “buraco”; vira apenas mais um highlight.
3. **Faltam pistas de profundidade 85° no corpo do vaso** (principalmente no assento/bacia): o tanque tem “side/top”, mas o restante parece “oval chapado”.
4. **Silhueta pouco icônica**: tanque + dois ovais empilhados pode parecer “qualquer coisa” quando reduzido e com opacidade aplicada na célula.

## Objetivo do próximo ajuste

Fazer o vaso ser reconhecido em 1 segundo, mesmo pequeno:
- Sem vista frontal “placa”
- Sem vista aérea/top-down
- Com **perspectiva 85°** consistente com os demais assets (top strip + side depth), e **silhueta de vaso** (tanque atrás + bacia/pedestal na frente).

---

## Mudança proposta (ToiletIcon v3 – 85° com leitura forte, sem rotação)

### Estratégia de desenho
- **Remover a rotação** (eliminar o `transform="rotate(...)"`) para manter linhas mais nítidas.
- Construir o vaso com 3 blocos claros, todos com padrão 85°:
  1. **Tanque (atrás)**: retângulos com `side` (2px) + `top` (1.5–2px) + front com outline.
  2. **Assento / tampa (meio)**: formato mais “U/oval” mas com **top strip** e **side depth** (mesmo que simplificado).
  3. **Bacia + pedestal (frente)**: corpo com front + base (um “frontal base” como cama/sofá) para dar volume.
- **Abertura do vaso escura** (ex.: `COLORS.metal.handle` ou `COLORS.metal.shadow`) para leitura imediata.
- **Água** com turquesa/claro (`COLORS.water.front/top`) em uma área menor, para reforçar “banheiro” sem virar “piscina”.
- **Composição em ¾ sem rotação**: ao invés de girar tudo, deslocar levemente a bacia para **baixo/direita** em relação ao tanque (2px), criando sensação de diagonal/perspectiva sem blur.

### Esboço técnico (como ficará o código)
No `src/components/game/assets/AssetIcons.tsx`, substituir o `ToiletIcon` atual por uma versão baseada em constantes, algo assim (valores finais ajustados “no olho” para não encher a célula e manter respiro):

- Constantes sugeridas:
  - `const PAD = 6;`
  - `const TOP_STRIP = 1.5;`
  - `const DEPTH = 2;`
- Tanque:
  - side depth: `rect x={PAD} ... width={DEPTH}`
  - body: `rect x={PAD+DEPTH} ... stroke={OUTLINE}`
  - top strip: `rect height={2}`
- Assento:
  - usar `rect` arredondado (rx) para manter “pixel nítido” e evitar elipse rotacionada/blur
  - abertura com fill escuro
- Bacia/pedestal:
  - corpo principal (rounded rect)
  - base frontal (um retângulo na parte inferior com `appliance.front` + top strip) para sugerir volume
- Opcional: `shapeRendering="crispEdges"` no `<svg>` do vaso para reforçar leitura pixel.

### Ajustes críticos de legibilidade
- Trocar a cor da abertura do assento de `COLORS.metal.top` para algo **bem mais escuro**, por exemplo:
  - `COLORS.metal.handle` (mais contrastado) ou `COLORS.metal.shadow`
- Aumentar levemente a presença do outline no vaso (sem mudar o padrão global):
  - ou usar `strokeWidth={OUTLINE_WIDTH}` mas com mais áreas sólidas e menos detalhes finos,
  - ou (se necessário) um `const TOILET_OUTLINE_W = 1` apenas no vaso (último recurso).

---

## Verificação visual (obrigatória) após implementar

1. Abrir `/game` e ir direto ao banheiro:
   - Confirmar o vaso em **L3/C5** (row=2 col=4) e o chuveiro em **L3/C6**.
2. Checar em 2 tamanhos:
   - Desktop (grid ~420–480px)
   - Mobile (largura ~390px)
3. Critérios de sucesso:
   - O usuário identifica “vaso sanitário” sem precisar de popover/dicionário.
   - Abertura escura é evidente.
   - Volume 85° (top strip + depth) é percebido.
   - Não “enche” a célula: mantém respiro (padding visual).

---

## Escopo e arquivos afetados

- **Editar**: `src/components/game/assets/AssetIcons.tsx`
  - Apenas o `ToiletIcon` (mantendo o restante intacto).

---

## Plano B (se ainda ficar ambíguo)

Se mesmo assim a leitura ficar fraca, aí sim faremos um ajuste mínimo de renderização no grid:
- **Aumentar a opacidade do asset especificamente para `toilet`** no `GameCell` (ex.: 0.85 só para o vaso), sem mexer na opacidade dos demais assets.
- Isso é opcional e só entra se o redesenho v3 ainda não resolver.

