
# Aplicar Perspectiva 85° à Estante e TV

## Diagnóstico dos Problemas Atuais

### TvIcon (linhas 791-819)
- Moldura da tela completamente frontal
- Sem lateral esquerda indicando profundidade
- Pescoço do suporte muito fino e centralizado
- Base do suporte sem perspectiva lateral

### BookshelfIcon (linhas 822-865)
- Caixa retangular sem indicador de profundidade lateral
- Prateleiras completamente planas
- Livros sem indicador de volume/espessura
- Apenas faixa de topo, falta lateral esquerda

---

## Arquivo Afetado

`src/components/game/assets/AssetIcons.tsx`

---

## 1. TvIcon - Correções

### Problemas
- Moldura sem lateral esquerda de profundidade
- Base do suporte sem perspectiva 85°
- Pescoço muito fino

### Código Corrigido

```tsx
// TV - 85° perspective with depth
export const TvIcon = ({ className }: AssetIconProps) => {
  const left = 4;
  const right = 28;
  const top = 5;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      <rect x={left} y={top} width="2" height="14" fill={COLORS.metal.shadow} />
      
      {/* Screen frame */}
      <rect x={left + 2} y={top} width={right - left - 2} height="14" 
        fill={COLORS.screen.frame}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Top surface (85° depth indicator) */}
      <rect x={left} y={top} width={right - left} height="2" fill={COLORS.metal.side} />
      
      {/* Display */}
      <rect x={left + 3} y={top + 2.5} width={right - left - 5} height="10" fill={COLORS.screen.display} />
      {/* Screen reflection */}
      <rect x={left + 4} y={top + 3.5} width="7" height="2.5" fill={COLORS.screen.glow} opacity="0.25" />
      
      {/* Stand neck - thicker */}
      <rect x="13" y={top + 14} width="6" height="3" fill={COLORS.metal.shadow} />
      <rect x="13" y={top + 14} width="1.5" height="3" fill={COLORS.metal.side} opacity="0.5" />
      
      {/* Stand base with 85° depth */}
      <rect x="10" y={top + 17} width="1.5" height="4" fill={COLORS.metal.side} />
      <rect x="11.5" y={top + 17} width="10" height="4" 
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="10" y={top + 17} width="11.5" height="1.5" fill={COLORS.metal.top} />
    </svg>
  );
};
```

---

## 2. BookshelfIcon - Correções

### Problemas
- Sem lateral esquerda de profundidade
- Prateleiras sem volume
- Livros todos completamente frontais

### Código Corrigido

```tsx
// Bookshelf - 85° perspective with depth
export const BookshelfIcon = ({ className }: AssetIconProps) => {
  const left = 4;
  const right = 28;
  const top = 4;
  const bottom = 28;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.wood.side} />
      
      {/* Main frame */}
      <rect x={left + 2} y={top} width={right - left - 2} height={bottom - top} 
        fill={COLORS.wood.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Top surface (85° depth indicator) */}
      <rect x={left} y={top} width={right - left} height="2" fill={COLORS.wood.top} />
      
      {/* Shelves with depth */}
      <rect x={left + 2} y={top + 8} width={right - left - 3} height="2" fill={COLORS.wood.shadow} />
      <rect x={left + 2} y={top + 8} width={right - left - 3} height="0.8" fill={COLORS.wood.side} />
      
      <rect x={left + 2} y={top + 15} width={right - left - 3} height="2" fill={COLORS.wood.shadow} />
      <rect x={left + 2} y={top + 15} width={right - left - 3} height="0.8" fill={COLORS.wood.side} />
      
      {/* Top shelf books - with slight 3D effect */}
      <rect x={left + 3} y={top + 2} width="2.5" height="5.5" fill="#C86868" />
      <rect x={left + 3} y={top + 2} width="0.6" height="5.5" fill="#A85050" />
      
      <rect x={left + 5.5} y={top + 2.5} width="3" height="5" fill="#6888B8" />
      <rect x={left + 5.5} y={top + 2.5} width="0.6" height="5" fill="#4868A0" />
      
      <rect x={left + 8.5} y={top + 2} width="2.5" height="5.5" fill="#68B888" />
      <rect x={left + 8.5} y={top + 2} width="0.6" height="5.5" fill="#48A868" />
      
      <rect x={left + 11} y={top + 2.5} width="3.5" height="5" fill="#B8A868" />
      <rect x={left + 11} y={top + 2.5} width="0.6" height="5" fill="#A89050" />
      
      <rect x={left + 14.5} y={top + 2} width="2.5" height="5.5" fill="#8868B8" />
      <rect x={left + 14.5} y={top + 2} width="0.6" height="5.5" fill="#6850A0" />
      
      <rect x={left + 17} y={top + 2.5} width="3.5" height="5" fill="#B86888" />
      <rect x={left + 17} y={top + 2.5} width="0.6" height="5" fill="#A05068" />
      
      <rect x={left + 20.5} y={top + 2} width="2" height="5.5" fill="#689898" />
      <rect x={left + 20.5} y={top + 2} width="0.5" height="5.5" fill="#508080" />
      
      {/* Middle shelf books */}
      <rect x={left + 3} y={top + 10.5} width="4" height="4" fill="#6B8B9B" />
      <rect x={left + 3} y={top + 10.5} width="0.7" height="4" fill="#4B6B7B" />
      
      <rect x={left + 7} y={top + 11} width="3" height="3.5" fill="#9B6B6B" />
      <rect x={left + 7} y={top + 11} width="0.6" height="3.5" fill="#7B4B4B" />
      
      <rect x={left + 10} y={top + 10.5} width="4.5" height="4" fill="#6B9B6B" />
      <rect x={left + 10} y={top + 10.5} width="0.7" height="4" fill="#4B7B4B" />
      
      <rect x={left + 14.5} y={top + 11} width="3" height="3.5" fill="#9B9B6B" />
      <rect x={left + 14.5} y={top + 11} width="0.6" height="3.5" fill="#7B7B4B" />
      
      <rect x={left + 17.5} y={top + 10.5} width="4" height="4" fill="#6B6B9B" />
      <rect x={left + 17.5} y={top + 10.5} width="0.7" height="4" fill="#4B4B7B" />
      
      {/* Bottom shelf books */}
      <rect x={left + 3} y={top + 17.5} width="4.5" height="5" fill="#8B6B8B" />
      <rect x={left + 3} y={top + 17.5} width="0.8" height="5" fill="#6B4B6B" />
      
      <rect x={left + 7.5} y={top + 18} width="3.5" height="4.5" fill="#6B8B8B" />
      <rect x={left + 7.5} y={top + 18} width="0.6" height="4.5" fill="#4B6B6B" />
      
      <rect x={left + 11} y={top + 17.5} width="3" height="5" fill="#8B8B6B" />
      <rect x={left + 11} y={top + 17.5} width="0.6" height="5" fill="#6B6B4B" />
      
      <rect x={left + 14} y={top + 18} width="3.5" height="4.5" fill="#6B6B8B" />
      <rect x={left + 14} y={top + 18} width="0.6" height="4.5" fill="#4B4B6B" />
      
      <rect x={left + 17.5} y={top + 17.5} width="4" height="5" fill="#8B6B6B" />
      <rect x={left + 17.5} y={top + 17.5} width="0.7" height="5" fill="#6B4B4B" />
    </svg>
  );
};
```

---

## Resumo das Correções

| Asset | Problemas Corrigidos |
|-------|---------------------|
| TV | Lateral esquerda na moldura, base com profundidade, pescoço mais robusto, reflexo de tela |
| Estante | Lateral esquerda de 2px, prateleiras com topo visível, livros com faixa de lombada escura |

---

## Seção Técnica

### Padrões de Perspectiva 85° Aplicados

1. **Lateral esquerda**: 2px de largura, cor `*.side` ou `*.shadow`
2. **Faixa de topo**: 1.5-2px de altura, cor `*.top`
3. **Livros 3D**: Faixa escura de 0.5-0.8px na esquerda de cada livro (lombada)
4. **Prateleiras**: Linha de topo mais clara para indicar superfície

### Cores Utilizadas

- `COLORS.wood.side` / `COLORS.wood.top` - para estrutura de madeira da estante
- `COLORS.metal.side` / `COLORS.metal.shadow` - para partes metálicas da TV
- `COLORS.screen.frame` / `COLORS.screen.display` - para tela da TV
- Cores dos livros com variante escura (`-20 hex` por canal RGB) para lombada
