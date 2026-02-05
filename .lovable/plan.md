
# Ajustar Proporcoes entre Sofa, Poltrona e Cadeira

## Diagnostico

As proporcoes atuais estao desbalanceadas:

| Elemento | Largura Total | Largura Bracos | Largura Assento |
|----------|---------------|----------------|-----------------|
| Sofa     | 24px          | 5px cada       | ~14px           |
| Poltrona | 24px          | 3px cada       | 18px            |
| Cadeira  | 20px          | -              | 20px            |

O sofa tem bracos 67% mais largos que a poltrona, criando uma silhueta desproporcional.

## Alteracoes Propostas

### Arquivo: `src/components/game/assets/AssetIcons.tsx`

#### 1. Reduzir largura dos bracos do sofa (linhas 396 e 408)

```tsx
// Antes
<rect x={padding} y={top + 2} width="5" height="14" ...

// Depois
<rect x={padding} y={top + 2} width="4" height="14" ...
```

Mesmo ajuste para o braco direito:
```tsx
// Antes
<rect x={32 - padding - 5} y={top + 2} width="5" height="14" ...

// Depois
<rect x={32 - padding - 4} y={top + 2} width="4" height="14" ...
```

#### 2. Ajustar elipses dos bracos para novo tamanho

```tsx
// Antes
<ellipse cx={padding + 2.5} cy={top + 2} rx="2.5" ry="1.2" ...

// Depois
<ellipse cx={padding + 2} cy={top + 2} rx="2" ry="1" ...
```

#### 3. Ajustar largura interna do assento e encosto

Reduzir os offsets de 5 para 4 nas linhas 362, 364, 369, 371, 377, 379, 384, 386:

```tsx
// Antes
x={left + (connectedLeft ? 0 : 5)}
width={right - left - (connectedLeft ? 0 : 5) - (connectedRight ? 0 : 5)}

// Depois
x={left + (connectedLeft ? 0 : 4)}
width={right - left - (connectedLeft ? 0 : 4) - (connectedRight ? 0 : 4)}
```

## Tabela de Proporcoes Finais

| Elemento | Largura Bracos | Proporcao |
|----------|----------------|-----------|
| Sofa     | 4px            | Referencia base para assento amplo |
| Poltrona | 3px            | 75% do sofa (individual, mais delicado) |
| Cadeira  | -              | Sem bracos, assento simples |

## Resultado Esperado

- Sofa com silhueta mais proporcional aos outros assentos
- Harmonia visual entre sofa conectado e poltrona isolada
- Cadeira mantida como referencia menor sem bracos
