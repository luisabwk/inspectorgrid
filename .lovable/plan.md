
## Ajuste Visual da Cama Horizontal

### O que você quer (baseado na imagem de referência)

A cama horizontal deve ter:

```text
┌─────────────────────────┬─────────────────────────┐
│   CÉLULA ESQUERDA       │   CÉLULA DIREITA        │
│   (Cabeceira)           │   (Pé da cama)          │
│                         │                         │
│ ┌───┬─────────┬───────┐ │ ┌───────────────────┐  │
│ │   │TRAVESS. │COBERTA│─┼─│    COBERTOR       │  │
│ │CAB│ ÚNICO   │ verde │ │ │      VERDE        │  │
│ │   │(grande) │parcial│ │ │                   │  │
│ └───┴─────────┴───────┘ │ └───────────────────┘  │
│                         │                         │
└─────────────────────────┴─────────────────────────┘
```

### Mudanças no BedIcon (isLeftEnd - célula da cabeceira)

**Arquivo:** `src/components/game/assets/AssetIcons.tsx`

Alterações no bloco `isLeftEnd` (linhas 122-138):

1. **Travesseiro único grande** em vez de dois separados
   - Remover as duas elipses de travesseiro (linhas 133-136)
   - Adicionar um único retângulo arredondado ocupando a área central

2. **Adicionar porção de cobertor** no lado direito
   - O lençol bege/creme fica da cabeceira até ~60% da célula
   - O cobertor verde entra pelos últimos ~40% da direita
   - Isso cria continuidade visual com a célula seguinte

### Detalhes Técnicos da Implementação

**Célula esquerda (isLeftEnd) - nova estrutura:**

```text
viewBox 0-32:
x=0-5:   Cabeceira de madeira (vertical)
x=5-20:  Lençol bege + travesseiro único
x=20-32: Cobertor verde (porção que conecta com a próxima célula)
```

Elementos SVG propostos:
- Frame lateral esquerdo (cabeceira): `rect x=0 y=2 width=5`
- Frames superior/inferior: `rect y=1 height=2` e `rect y=29 height=2`
- Colchão base: `rect x=5 y=3 width=27`
- Lençol bege: `rect x=6 y=4 width=14` (até x=20)
- Cobertor verde: `rect x=18 y=4 width=14` (de x=18 até borda direita)
- Transição suave: linha de dobra em x=18-20
- Travesseiro único: `rect x=7 y=8 width=8 height=16 rx=3` (arredondado)

### Resultado Visual Esperado

Quando as duas células estiverem lado a lado, a cama formará uma unidade coesa:

```text
┌─────────────────────────────────────────────────┐
│ [CAB] [TRAVESSEIRO] [==COBERTOR VERDE=======>] │
│       [  ÚNICO    ] [                        ] │
│       [           ] [    (continuidade)      ] │
└─────────────────────────────────────────────────┘
```

O cobertor começará na metade direita da célula esquerda e continuará por toda a célula direita, criando a ilusão de uma cama única.

### Arquivos a modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/components/game/assets/AssetIcons.tsx` | Refatorar bloco `isLeftEnd` do BedIcon: travesseiro único + porção de cobertor |

### Validação

1. Abrir `/game` e verificar o quarto
2. A cama deve mostrar:
   - Cabeceira à esquerda
   - Travesseiro único grande (não dois separados)
   - Lençol bege na área do travesseiro
   - Cobertor verde começando na célula esquerda e continuando na direita
   - Visual de "cama única" coerente
