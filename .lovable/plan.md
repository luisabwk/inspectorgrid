
# Plano: Casos Dinâmicos e Sistema de Progressão

## Status: ✅ Implementado

## O que foi feito

### 1. Inserir caso de teste no banco ✅
- Caso "O Mistério da Mansão Blackwood" inserido na tabela `cases`
- UUID gerado automaticamente: `62508631-51b6-4150-91c7-1ec4a553a217`
- Todos os dados convertidos para formato JSONB

### 2. Hook useCases ✅
- `useCases()` - Lista todos os casos ordenados por dificuldade
- `useCase(caseId)` - Carrega um caso específico
- `useNextCase(playerLevel)` - Carrega próximo caso baseado no nível do jogador
- Transformação automática de DB → GameCase

### 3. Hook useProgress ✅
- `saveProgress(caseId, difficulty, time)` - Salva progresso do jogador
- `getPlayerStats()` - Retorna nível, pontuação total, casos completados
- **Cálculo de Score**:
  - Base: 100 pontos
  - Bônus de tempo: até +100 pontos (decresce após 60s)
  - Multiplicador: × dificuldade

### 4. Game.tsx atualizado ✅
- Carrega caso dinamicamente do banco via `useNextCase`
- Loading state durante carregamento
- Error state se não encontrar caso
- Modal de vitória com:
  - Pontuação conquistada
  - Indicador de level up
  - Botões "Menu" e "Próximo Caso"

### 5. useGame adaptado ✅
- Aceita `GameCase | null`
- Reset automático ao trocar de caso

## Lógica de Progressão

```
Nível do jogador = (casos completados ÷ 3) + 1
Dificuldade do caso = ceil(nível ÷ 3)
```

Exemplo:
- Casos 1-3 → Nível 1-2 → Dificuldade 1
- Casos 4-6 → Nível 2-3 → Dificuldade 1
- Casos 7-9 → Nível 3-4 → Dificuldade 2

## Próximos Passos (Opcional)

- [ ] Adicionar mais casos no banco com diferentes dificuldades
- [ ] Tela de seleção de casos para jogadores avançados
- [ ] Leaderboard com ranking de pontuação
- [ ] Histórico de casos completados
