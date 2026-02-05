
Objetivo (escopo desta rodada)
- Confirmar visualmente a consistência da perspectiva 85° no /game e corrigir apenas a CAMA por enquanto, pois ela ainda está parecendo “top view/top down”.
- Listar outras melhorias/inconsistências encontradas, sem corrigi-las agora.

Verificação visual (estado atual no /game)
- Sofá: tem leitura de 85° (faixa de “topo” + face “frontal” na base e pequenos elementos de volume), então ele dá sensação de profundidade sem ser top-down.
- Cama (no “QUARTO”, 2 células conectadas): está muito “plana” e com leitura de top view porque:
  - O colchão/cobertor são basicamente retângulos “de cima” sem uma face frontal consistente (como a base do sofá).
  - As bordas superiores/inferiores da cama são linhas finas (frame) que não comunicam volume.
  - Resultado: mesmo com cores corretas, falta o mesmo “ângulo”/volumetria que o sofá tem.

Causa técnica provável (no código)
- O BedIcon em `src/components/game/assets/AssetIcons.tsx` (variantes horizontal/vertical/single) foi desenhado principalmente como “superfícies planas” (retângulos) e, nas variantes conectadas, praticamente não existe “face frontal” (espessura) como no sofá.
- A variante “single bed” já tentou introduzir profundidade, mas as variantes horizontal e vertical (que aparecem no mapa) ainda ficam com sensação de top-down por ausência de base/frente consistente.

O que será corrigido (somente a cama)
Arquivo alvo
- `src/components/game/assets/AssetIcons.tsx` (somente o `export const BedIcon`)

Estratégia de correção (para ficar no mesmo ângulo do sofá, sem top-down)
1) Introduzir uma “base frontal” consistente (espessura) em TODAS as variantes da cama
- Replicar a linguagem do sofá:
  - Uma faixa “top” (highlight) no topo da base
  - Uma faixa “front/side” na parte de baixo (face voltada ao observador)
- Isso é o principal que tira a cama do top-down, porque adiciona leitura de volume e direção (o “frente” fica embaixo, como o sofá).

2) Reestruturar as variantes da cama usando um mesmo sistema de medidas (padding e profundidade)
- Definir constantes internas (ex.: `PAD = 4~5`, `TOP = 5`, `BOTTOM = 26`, `BASE_H = 4~5`, `TOP_STRIP = 1.5~2`), para:
  - Garantir “respiro visual” (não encostar nas bordas da célula).
  - Garantir proporção consistente com o sofá (cama não deve preencher 100% do quadrado).
- As conexões (connectedLeft/right/top/bottom) continuam funcionando, mas:
  - A cama terá “miolo” (colchão/cobertor) com padding superior/inferior fixo.
  - O alongamento para conexão ocorre principalmente nos lados conectados (esquerda/direita ou cima/baixo), sem perder o respiro vertical.

3) Ajustar travesseiros para leitura 85° (não top-down)
- Evitar formatos que “pareçam vistos de cima” como elipses grandes na vertical bed head.
- Usar travesseiros como retângulos arredondados com:
  - Faixa clara no topo (highlight)
  - Sombra sutil (pillowShade) deslocada ou em faixa
- Isso mantém a linguagem do sofá (top strip) e dá volume sem cair no top view.

4) Aplicar a mesma lógica a todas as variantes que podem aparecer
- Horizontal:
  - Left end (com cabeceira lateral): manter cabeceira, mas adicionar a base frontal e ajustar o colchão/cobertor para encaixar com respiro e volume.
  - Middle: adicionar base frontal e ajustar cobertor/lençol para continuar.
  - Right end: adicionar base frontal + pé/terminação mais “3D” (pequena face lateral/foot piece), sem exagerar.
- Vertical:
  - Head segment: substituir as elipses dos travesseiros por travesseiros “com topo” (retângulos arredondados + highlight) e adicionar base frontal na parte inferior.
  - Foot segment: adicionar base frontal; manter continuidade do cobertor.
  - Middle: adicionar base frontal e continuidade.
- Single:
  - Ajustar para se alinhar ao mesmo “modelo” de base do sofá (se necessário), garantindo que não pareça diferente das conectadas.

5) Garantir contorno e padding coerentes com o estilo do projeto
- Manter OUTLINE `#5D4E37` e `0.8px`.
- Não “lotar” a célula: garantir 4–6px de respiro (exceto quando a conexão exigir encostar lateralmente para formar um mesh contínuo).

Critérios de aceite (o que vamos checar no /game após a mudança)
- A cama, quando conectada em 2 células (como no QUARTO do screenshot), deve:
  - Ter uma base com face frontal visível na parte de baixo (como o sofá).
  - Não parecer um retângulo plano visto de cima.
  - Manter proporção e respiro (não preencher o quadrado todo).
  - Ter travesseiros com “top highlight” e leve volume, sem leitura top-down.
- A cama single e a vertical (se houver em outros casos) devem manter a mesma linguagem de profundidade do sofá.

Lista de melhorias/inconsistências encontradas (não corrigir agora, apenas registrar)
1) Consistência de volumetria entre assets conectáveis
- Alguns assets conectáveis (ex.: cama em variantes conectadas) não estão usando a mesma “base frontal” que sofá/mesa já usam, gerando mistura de leituras.

2) Móveis que parecem “planos demais” vs “com base”
- Em várias peças, quando a base frontal (face) está ausente, a leitura volta a top-down mesmo mantendo 85° em outros itens.

3) Proporção/escala relativa (a revisar depois, sem mexer agora)
- Alguns itens podem estar visualmente “altos/grandes” para a célula (dependendo do caso), o que quebra harmonia do grid. (Você já sinalizou isso anteriormente com poltrona; eu não vou mexer nessa rodada.)

4) Micro-alinhamentos de detalhes
- Linhas internas (dobras/linhas de divisão) em alguns móveis podem reforçar sensação de top-down se estiverem muito “gráficas” e sem sombras/face frontal.

Sequência de implementação (quando eu sair do modo plano)
1) Editar somente `BedIcon` em `AssetIcons.tsx`
2) Aplicar o novo “modelo” (base frontal + topo highlight + padding) em horizontal/vertical/single
3) Verificar no /game:
   - Quarto (cama horizontal 2 células)
   - Qualquer caso com cama vertical/single (se existir no dataset atual)
4) Ajuste fino de 1–2px em alturas de base/padding até bater com a leitura do sofá

Riscos e como vamos mitigar
- Risco: a cama conectada ficar com “emenda” visível entre células.
  - Mitigação: evitar stroke interno nas bordas de conexão; usar preenchimentos contínuos e aplicar contorno apenas nas bordas externas (condicionalmente).
- Risco: cama ficar grande demais ou “encostando”.
  - Mitigação: padronizar padding vertical fixo e só estender horizontalmente quando conectado.
