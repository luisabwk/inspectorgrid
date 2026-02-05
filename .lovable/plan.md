

# Remoção do Texto de Instrução de Posicionamento

## Problema

O texto "Toque em uma célula para posicionar [SUSPEITO]" está aparecendo na interface e o usuário solicitou sua remoção por ser desnecessário.

## Localização

Arquivo: `src/pages/Game.tsx` - linhas 212-219

```typescript
{/* Selected suspect indicator */}
{selectedSuspect && (
  <p className="font-pixel text-xs text-muted-foreground text-center">
    Toque em uma célula para posicionar{' '}
    <span className="font-bold text-foreground">
      {gameCase.suspects.find(s => s.id === selectedSuspect)?.name}
    </span>
  </p>
)}
```

## Solução

Remover completamente este bloco de código, mantendo apenas o container do grid e os controles abaixo.

## Mudança

Deletar as linhas 211-219 (o comentário e o bloco condicional inteiro).

