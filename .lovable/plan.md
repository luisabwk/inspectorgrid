
# Ajustar Largura dos Braços da Poltrona

## Diagnostico

No arquivo `src/components/game/assets/AssetIcons.tsx`, o componente `ArmchairIcon` define a largura dos bracos na linha 642:

```tsx
const armWidth = 5;  // Valor atual
```

Os bracos sao renderizados como retangulos com essa largura nas linhas 674 e 682.

## Alteracao Proposta

Reduzir `armWidth` de `5` para `3` pixels, tornando os bracos visivelmente mais finos mantendo a proporcao harmonica com o corpo da poltrona.

### Arquivo: `src/components/game/assets/AssetIcons.tsx`

**Linha 642:**
```tsx
// Antes
const armWidth = 5;

// Depois
const armWidth = 3;
```

## Impacto Visual

- Os bracos ficarao 40% mais finos (de 5px para 3px)
- O assento ficara proporcionalmente mais largo (de 14px para 18px de largura interna)
- As elipses de topo dos bracos serao automaticamente ajustadas pois usam `armWidth/2` como raio
- O resultado sera uma poltrona com silhueta mais elegante e bracos delicados
