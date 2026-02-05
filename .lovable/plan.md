
# Remover Poltrona da Coluna 5 no Escritório

## Diagnóstico

O problema foi identificado no **banco de dados**, não no código. O layout armazenado na tabela `cases` possui:

| Posição | Row | Col | Asset Atual |
|---------|-----|-----|-------------|
| L5, C6 | 4 | 5 | `armchair` |
| L6, C5 | 4 | 4 | `sofa` (renderiza como poltrona pois está sozinho) |

A segunda poltrona em L6, C5 é causada por um `sofa` solitário que, pela lógica do jogo, é automaticamente exibido como poltrona quando não está conectado a outros sofás.

## Solução

Atualizar o registro no banco de dados para alterar a célula em **row 5, col 4** (L6, C5) de `sofa` para `empty`.

## Alteração no Banco

```sql
-- Atualizar o layout_config do caso existente
-- Mudar cells[5][4].asset de 'sofa' para 'empty'
```

A alteração será feita via função SQL que modifica o JSON do `layout_config`, substituindo o asset da célula correspondente.

## Resultado Esperado

- L6, C5 ficará vazia (sem móvel)
- Apenas uma poltrona permanecerá no escritório (L5, C6)
- O grid ficará menos carregado visualmente
