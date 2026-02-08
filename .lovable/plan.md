

# Usar Assets da Tileset Diretamente (Sprites)

## Problema Atual

Os assets de banheiro estão sendo recriados manualmente em SVG, resultando em:
- Interpretações visuais inconsistentes com a referência
- Trabalho repetitivo de ajuste fino
- Dificuldade em reproduzir o estilo exato da tileset

## Solução: Sistema de Sprites

Usar a tileset PNG diretamente como spritesheet, recortando as regiões exatas de cada asset.

```text
ANTES (SVG recriado):          DEPOIS (Sprite da tileset):
┌────────────────┐             ┌────────────────┐
│ <svg>          │             │ <div>          │
│  <ellipse>     │      →      │  background:   │
│  <rect>        │             │    url(tile..)│
│  ...           │             │  position: ... │
│ </svg>         │             │ </div>         │
└────────────────┘             └────────────────┘
   ~50 linhas                     ~5 linhas
```

---

## Implementação

### 1. Salvar a Tileset no Projeto

Copiar `tileB_inside3.png` para `/public/tiles/tileB_inside3.png`.

### 2. Criar Componente de Sprite

Novo arquivo: `src/components/game/assets/TileSprite.tsx`

```tsx
interface TileSpriteProps {
  tileX: number;      // Coluna do tile (0-indexed)
  tileY: number;      // Linha do tile (0-indexed)
  tileSize?: number;  // Tamanho do tile (default: 16px)
  className?: string;
}

export const TileSprite = ({ 
  tileX, 
  tileY, 
  tileSize = 16, 
  className 
}: TileSpriteProps) => {
  return (
    <div 
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/tiles/tileB_inside3.png)',
        backgroundPosition: `-${tileX * tileSize}px -${tileY * tileSize}px`,
        backgroundSize: 'auto',
        imageRendering: 'pixelated',
      }}
    />
  );
};
```

### 3. Mapear Coordenadas dos Tiles de Banheiro

Analisando a tileset (parte inferior esquerda):

| Asset | Tile X | Tile Y | Descrição |
|-------|--------|--------|-----------|
| Vaso Sanitário | 0 | 14 | Vaso completo (tile 16x16) |
| Banheira | 1 | 14 | Banheira/base chuveiro |
| Pia Banheiro | 2 | 14 | Pia compacta |

*(Os valores exatos serão ajustados após medição precisa da tileset)*

### 4. Criar Componentes de Asset com Sprites

```tsx
// ToiletIcon usando sprite
export const ToiletSpriteIcon = ({ className }: AssetIconProps) => (
  <TileSprite tileX={0} tileY={14} className={className} />
);

// ShowerIcon usando sprite  
export const ShowerSpriteIcon = ({ className }: AssetIconProps) => (
  <TileSprite tileX={1} tileY={14} className={className} />
);
```

### 5. Atualizar o AssetIconMap

Em `AssetIcons.tsx`, substituir os ícones SVG pelos sprites:

```tsx
export const AssetIconMap: Record<AssetType, React.FC<AssetIconProps>> = {
  // ... outros assets
  toilet: ToiletSpriteIcon,  // Antes: ToiletIcon (SVG)
  shower: ShowerSpriteIcon,  // Antes: ShowerIcon (SVG)
};
```

---

## Vantagens

| Aspecto | SVG Manual | Sprite |
|---------|-----------|--------|
| Fidelidade visual | Aproximada | Exata |
| Manutenção | Complexa | Simples |
| Performance | Mais pesado | Mais leve |
| Consistência | Variável | Garantida |

---

## Arquivos Afetados

1. **Criar**: `/public/tiles/tileB_inside3.png` - tileset copiada
2. **Criar**: `src/components/game/assets/TileSprite.tsx` - componente base
3. **Editar**: `src/components/game/assets/AssetIcons.tsx` - usar sprites nos assets

---

## Próximos Passos Após Implementação

1. Medir coordenadas exatas de cada tile na imagem
2. Implementar componentes de sprite para toilet e shower
3. Testar visualmente no grid
4. Se funcionar bem, expandir para outros assets conforme necessário

---

## Seção Técnica

### Sobre Coordenadas de Tile

A tileset usa grid de 16x16 pixels por tile. As coordenadas são calculadas como:
- `backgroundPosition: -${col * 16}px -${row * 16}px`

### Escala no Grid

O CSS `background-size: auto` mantém o tamanho original. Para ajustar ao tamanho da célula do grid, podemos usar:
- `background-size: contain` para ajustar ao container
- Ou escalar com `transform: scale(X)` se precisar de controle fino

### Fallback

Se um tile específico não existir, podemos manter o SVG como fallback ou criar um tile placeholder.

