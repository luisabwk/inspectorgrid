
# Contorno e Respiro Visual para Moveis Pendentes

## Icones a Atualizar

| Icone | Status Atual | Problema |
|-------|-------------|----------|
| BedIcon | Sem outline, preenche ate a borda | Falta stroke e padding interno |
| StoveIcon | Sem outline, sem padding | Conectavel mas falta stroke |
| SinkIcon | Sem outline, sem padding | Conectavel mas falta stroke |
| ToiletIcon | Sem outline, preenche ate x=6 | Falta stroke e mais respiro |
| ShowerIcon | Borda de 2px mas sem padrao | Falta padding e stroke sutil |
| RugIcon | Sem outline, elipse vai ate x=2 | Falta stroke sutil |

## Solucao Proposta

### 1. BedIcon

Adicionar `stroke={OUTLINE}` nas formas principais (frames e colchao). O BedIcon e conectavel, entao o padding ja e tratado pelas extremidades.

Elementos a adicionar stroke:
- Frames superior/inferior
- Cabeceira/pe da cama
- Colchao base

### 2. StoveIcon

Adicionar outline e padding nas extremidades quando nao conectado.

```text
ANTES:                    DEPOIS:
x=2 a x=30                x=4 a x=28 (quando nao conectado)
Sem stroke                Com stroke=#5D4E37
```

Elementos a atualizar:
- Body rect (principal)
- Oven rect

### 3. SinkIcon

Adicionar outline e padding nas extremidades.

Elementos a atualizar:
- Counter rect
- Cabinet rects
- Basin ellipses

### 4. ToiletIcon

Adicionar padding (~4px) e outline nas formas principais.

```text
ANTES (x=6-26):           DEPOIS (x=7-25):
Sem stroke                Com stroke=#5D4E37
                          Respiro de ~5px
```

Elementos a atualizar:
- Tank rect (fundo)
- Seat ellipses
- Base ellipse

### 5. ShowerIcon

Adicionar padding e mudar o stroke atual para o padrao sutil.

```text
ANTES:                    DEPOIS:
x=1 a x=31                x=4 a x=28
stroke=2px chrome         stroke=0.8px #5D4E37
```

Elementos a atualizar:
- Box frame rect
- Showerhead ellipses

### 6. RugIcon

Adicionar respiro visual e outline sutil.

```text
ANTES (rx=14):            DEPOIS (rx=12):
Sem stroke                Com stroke=#5D4E37 (sutil)
```

Elementos a atualizar:
- Elipses concentricas (reduzir raio em ~2px)

## Arquivos a Modificar

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/game/assets/AssetIcons.tsx` | Atualizar BedIcon, StoveIcon, SinkIcon, ToiletIcon, ShowerIcon, RugIcon |

## Detalhes Tecnicos

### Padrao de Outline

Todos os icones usarao:
```typescript
stroke={OUTLINE}        // #5D4E37
strokeWidth={OUTLINE_WIDTH}  // 0.8
```

### Padding por Tipo

| Tipo | Padding Lateral | Padding Vertical |
|------|-----------------|------------------|
| Conectavel (Bed, Stove, Sink) | 0 quando conectado, 4px quando nao | Similar |
| Individual (Toilet, Shower, Rug) | 4-5px fixo | 4-5px fixo |

### Implementacao

**BedIcon**: Adicionar stroke aos rects de frame e colchao em todos os 6 casos (horizontal left/right/middle, vertical head/foot/middle, single).

**StoveIcon**: Atualizar left/right de 2/30 para 4/28, adicionar stroke ao body e oven.

**SinkIcon**: Atualizar left/right de 2/30 para 4/28, adicionar stroke ao counter e cabinets.

**ToiletIcon**: Redimensionar tank de x=10 para x=8, adicionar stroke aos elementos principais.

**ShowerIcon**: Reduzir de x=1-31 para x=4-28, mudar stroke para padrao sutil.

**RugIcon**: Reduzir elipses de rx=14 para rx=12, adicionar stroke sutil com opacidade 0.5.

## Validacao

1. Abrir `/game` e verificar os moveis no quarto, cozinha e banheiro
2. Confirmar que todos os icones tem:
   - Contorno sutil marrom (#5D4E37)
   - Respiro visual entre o icone e a borda da celula
   - Consistencia visual com os moveis ja atualizados
