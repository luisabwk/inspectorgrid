

# Corrigir Cards de Avatares - Pistas Aparecem Apenas ao Clicar

## Diagnostico

No arquivo `src/components/game/SuspectClueCards.tsx`, as pistas sao exibidas incondicionalmente para todos os suspeitos (linha 111-115):

```tsx
{suspectClue && (
  <p className="text-[10px] text-muted-foreground leading-tight mt-1 line-clamp-3">
    {formatClueText(suspectClue.text, suspect.name)}
  </p>
)}
```

## Alteracao Proposta

Condicionar a exibicao da pista ao estado `isSelected`, mostrando-a apenas quando o avatar for clicado/selecionado.

### Arquivo: `src/components/game/SuspectClueCards.tsx`

**Linhas 111-115 (antes):**
```tsx
{suspectClue && (
  <p className="text-[10px] text-muted-foreground leading-tight mt-1 line-clamp-3">
    {formatClueText(suspectClue.text, suspect.name)}
  </p>
)}
```

**Linhas 111-115 (depois):**
```tsx
{isSelected && suspectClue && (
  <p className="text-[10px] text-muted-foreground leading-tight mt-1 line-clamp-3">
    {formatClueText(suspectClue.text, suspect.name)}
  </p>
)}
```

## Resultado Esperado

- Cards nao selecionados exibem apenas o avatar e o primeiro nome do suspeito
- Ao clicar em um card, a pista correspondente aparece abaixo do nome
- Cards de vitimas continuam exibindo a label "Vitima" independentemente da selecao
- O layout dos cards fica mais limpo e compacto quando nao selecionados

