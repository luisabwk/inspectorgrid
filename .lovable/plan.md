
# Correção da Cama Conectada

## Problema Identificado

A cama no grid está conectada **horizontalmente** (duas células lado a lado na mesma linha), mas o ícone `BedIcon` foi desenhado assumindo conexão **vertical** (topo-baixo).

**Dados do testCase:**
- `grid[0][3].asset = 'bed'` e `grid[0][4].asset = 'bed'`
- Mesma linha (row 0), colunas adjacentes (3 e 4)

**Resultado atual:**
- Ambas as células mostram a "parte inferior" da cama (cobertor)
- Cabeceira e travesseiros não aparecem em nenhuma

## Solução

Redesenhar o `BedIcon` para suportar **AMBOS** os modos de conexão:

1. **Conexão Vertical (top-bottom)** - Padrão esperado
   - Célula superior: cabeceira + travesseiros  
   - Célula inferior: cobertor + pés

2. **Conexão Horizontal (left-right)** - Caso atual
   - Célula esquerda: cabeceira lateral + travesseiros
   - Célula direita: cobertor + lateral dos pés

## Alterações no Código

### Arquivo: `src/components/game/assets/AssetIcons.tsx`

Refatorar o componente `BedIcon` para:

1. **Detectar o tipo de conexão:**
```text
Se connectedLeft OU connectedRight → conexão horizontal
Se connectedTop OU connectedBottom → conexão vertical
```

2. **Renderização condicional:**
   - **Horizontal:**
     - Célula esquerda (`isLeftEnd`): mostrar cabeceira no lado esquerdo, travesseiros
     - Célula direita (`isRightEnd`): mostrar cobertor estendendo, pés na direita
   
   - **Vertical:**
     - Célula superior (`isHead`): mostrar cabeceira no topo, travesseiros
     - Célula inferior (`isFoot`): mostrar cobertor, pés na base

3. **Manter compatibilidade com cama única** (não conectada)

## Detalhes Técnicos

```text
┌─────────────────────────────────────┐
│        CONEXÃO HORIZONTAL           │
├──────────────┬──────────────────────┤
│  Célula 1    │    Célula 2          │
│ (isLeftEnd)  │   (isRightEnd)       │
│              │                      │
│ ┌──────┐     │     ┌──────────┐     │
│ │CABEÇ │TRAV │COBR │   COBR   │PÉS  │
│ └──────┘     │     └──────────┘     │
└──────────────┴──────────────────────┘

┌─────────────────────────────────────┐
│         CONEXÃO VERTICAL            │
├─────────────────────────────────────┤
│  Célula 1 (isHead)                  │
│  ┌───────────────────────────┐      │
│  │  CABECEIRA                │      │
│  │  [TRAV]  [TRAV]           │      │
│  │  LENÇOL                   │      │
├──┼───────────────────────────┼──────┤
│  │  COBERTOR                 │      │
│  │  COBERTOR                 │      │
│  └───────────────────────────┘      │
│  Célula 2 (isFoot)                  │
└─────────────────────────────────────┘
```

## Impacto

- **Arquivo modificado:** `src/components/game/assets/AssetIcons.tsx` (apenas `BedIcon`)
- **Sem alterações em:** `GameCell.tsx`, `GameGrid.tsx` ou `testCase.ts`
- As props de conexão já são passadas corretamente

## Validação

Após implementação, verificar:
1. Cama horizontal no quarto (row 0, cols 3-4) mostra cabeceira à esquerda e cobertor à direita
2. Camas verticais (se existirem) mostram cabeceira no topo e pés na base
3. Cama única (sem conexões) mostra design completo em uma célula
