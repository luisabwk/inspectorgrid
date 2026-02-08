

# Calibração Correta dos Sprites de Banheiro

## Análise Visual da Tileset

Após examinar detalhadamente a imagem `tileB_inside3.png`, identifiquei a estrutura correta:

```text
TILESET tileB_inside3.png (256x256px = 16x16 tiles de 16px)
┌─────────────────────────────────────────────────────────────┐
│ Col: 0    1    2    3    4    5    6    7    8    ...  15   │
│ ┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────────────┐ │
│0│pia │fogã│gelad│ □  │ □  │🚽  │🛁  │    │    │ janelas   │ │
│ │    │o   │eira │    │    │VASO│BANH│    │    │ espelhos  │ │
│ ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────────────┤ │
│1│ balcões azuis/vermelhos/marrons              │ camas     │ │
│ ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────────────┤ │
│...  (resto da tileset)                                      │
└─────────────────────────────────────────────────────────────┘
```

## Coordenadas Corretas Identificadas

| Asset | Coordenada X | Coordenada Y | Descrição Visual |
|-------|-------------|--------------|------------------|
| **Vaso Sanitário** | **5** | **0** | Vaso branco com tampa e tanque |
| **Banheira/Chuveiro** | **6** | **0** | Banheira branca retangular |

## Problema Atual

Os sprites estão configurados com coordenadas erradas:
- ToiletIcon: `tileX=0, tileY=12` (mostrando tapete/estante)
- ShowerIcon: `tileX=2, tileY=12` (mostrando outro móvel)

## Correção a Implementar

Atualizar `src/components/game/assets/AssetIcons.tsx`:

```tsx
// ANTES (incorreto):
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <TileSprite tileX={0} tileY={12} className={className} />
);

export const ShowerIcon = ({ className }: AssetIconProps) => (
  <TileSprite tileX={2} tileY={12} className={className} />
);

// DEPOIS (correto):
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <TileSprite tileX={5} tileY={0} className={className} />
);

export const ShowerIcon = ({ className }: AssetIconProps) => (
  <TileSprite tileX={6} tileY={0} className={className} />
);
```

## Arquivos Afetados

1. **`src/components/game/assets/AssetIcons.tsx`**
   - Linhas 956-966: Atualizar coordenadas do ToiletIcon e ShowerIcon

## Seção Técnica: Como o Sistema de Sprites Funciona

O componente `TileSprite` usa CSS `background-position` para extrair tiles específicos:

```tsx
backgroundPosition: `-${tileX * 16}px -${tileY * 16}px`
```

Para `tileX=5, tileY=0`:
- `backgroundPosition: -80px -0px` → Desloca 80px horizontalmente (5 × 16)

Para `tileX=6, tileY=0`:  
- `backgroundPosition: -96px -0px` → Desloca 96px horizontalmente (6 × 16)

## Critérios de Sucesso

1. O vaso sanitário no grid deve mostrar o sprite branco com tampa visível
2. A banheira/chuveiro deve mostrar o sprite branco retangular  
3. Os assets devem manter `image-rendering: pixelated` para fidelidade visual
4. Nenhum recorte incorreto ou deslocamento de pixels

