

# Redesenho dos Assets de Banheiro Baseado na Tileset

## Análise da Tileset de Referência (Parte Inferior Esquerda)

Analisando a imagem, identifiquei os padrões para assets de banheiro:

```text
VASO SANITÁRIO (tileset):
┌────────────────┐
│    ╭──────╮    │  ← Tanque arredondado (retângulo com rx alto)
│   ╭────────╮   │  ← Tampa/Assento oval com borda
│   │  ●●●   │   │  ← Abertura ESCURA bem definida
│   ╰────────╯   │  ← Bacia arredondada
│    ╭────╮      │  ← Base/pedestal
└────────────────┘

BANHEIRA/CHUVEIRO (tileset):
┌────────────────┐
│╭──────────────╮│  ← Borda externa elevada (clara)
││  ░░░░░░░░░░  ││  ← Interior com fundo claro
││  ░░░░░░░░░░  ││  
│╰──────────────╯│  ← Bordas arredondadas
└────────────────┘

PIA DE BANHEIRO vs COZINHA:
┌─────────┐  ┌─────────┐
│ Banheiro│  │ Cozinha │
├─────────┤  ├─────────┤
│ Compacta│  │  Larga  │
│ c/espel.│  │ c/gabine│
│ Cuba ova│  │ Cuba ret│
└─────────┘  └─────────┘
```

---

## Mudanças Propostas

### 1. ToiletIcon v4 - Silhueta Orgânica

**Problema atual**: Formas retangulares demais, não reconhecíveis como vaso sanitário.

**Solução baseada na tileset**:
- Usar **elipses** para tanque, assento e bacia (formas orgânicas)
- Manter **abertura escura** (`COLORS.metal.handle`) como elemento-chave de reconhecimento
- Aplicar perspectiva 85° com **depth lateral** apenas onde faz sentido (tanque)
- Base/pedestal arredondado para ancorar visualmente

**Estrutura visual**:
```text
   ╭────────╮     ← Tanque (elipse + retângulo arredondado)
  ╭──────────╮    ← Tampa/Assento (elipse horizontal)
  │   ●●●    │    ← Abertura escura (contraste forte)
  ╰──────────╯    ← Bacia (elipse alongada)
     ╭──╮         ← Base/pedestal
```

---

### 2. ShowerIcon v2 - Base de Banheira Sólida

**Problema atual**: Parece um box de vidro abstrato, não uma banheira/chuveiro reconhecível.

**Solução baseada na tileset**:
- **Borda externa sólida** com cantos arredondados (como na referência)
- **Interior claro** (quase branco) representando a banheira
- Chuveiro reduzido e posicionado como elemento secundário
- Ralo visível no centro

**Estrutura visual**:
```text
╭────────────────╮  ← Borda elevada (appliance.front)
│╭──────────────╮│  ← Interior da banheira (metal.top)
││              ││
││      ○       ││  ← Ralo
│╰──────────────╯│
╰────────────────╯
      ┃┃            ← Chuveiro (pequeno, no canto)
```

---

### 3. Pia (Manter Atual ou Criar Variação Futura)

**Status atual**: A pia (`sink`) é usada apenas na **cozinha** (row 5, col 0).

**Decisão**: Como o banheiro atual não tem pia, manteremos o `SinkIcon` atual (estilo cozinha com gabinete e portas). 

**Nota para o futuro**: Se precisarmos de pia de banheiro, podemos:
- Criar um novo tipo `bathroom-sink` 
- Ou detectar o roomId e renderizar diferentemente

---

## Implementação Técnica Detalhada

### ToiletIcon v4 (Formas Orgânicas)

```tsx
export const ToiletIcon = ({ className }: AssetIconProps) => {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* ===== TANQUE (atrás) ===== */}
      {/* Profundidade lateral 85° */}
      <ellipse cx="11" cy="8" rx="2" ry="4" fill={COLORS.appliance.side} />
      
      {/* Corpo do tanque - arredondado */}
      <rect x="11" y="4" width="10" height="8" rx="2"
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Topo do tanque */}
      <rect x="11" y="4" width="10" height="2" rx="1" 
        fill={COLORS.appliance.top} />
      
      {/* Botão de descarga */}
      <ellipse cx="16" cy="6.5" rx="1.5" ry="0.8" fill={COLORS.metal.chrome} />
      
      {/* ===== ASSENTO/TAMPA (meio) ===== */}
      {/* Profundidade lateral */}
      <ellipse cx="8" cy="14" rx="1.5" ry="3" fill={COLORS.appliance.side} />
      
      {/* Tampa oval */}
      <ellipse cx="16" cy="14" rx="10" ry="4"
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Superfície do assento */}
      <ellipse cx="16" cy="13.5" rx="9" ry="3.2" fill={COLORS.appliance.top} />
      
      {/* ABERTURA ESCURA - elemento crucial de reconhecimento */}
      <ellipse cx="16" cy="14" rx="6" ry="2.5" fill={COLORS.metal.handle} />
      
      {/* ===== BACIA (frente) ===== */}
      {/* Profundidade lateral */}
      <ellipse cx="8" cy="21" rx="1.5" ry="4" fill={COLORS.appliance.side} />
      
      {/* Bacia oval alongada */}
      <ellipse cx="16" cy="21" rx="9" ry="5"
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Água no interior */}
      <ellipse cx="16" cy="20.5" rx="5" ry="3" fill={COLORS.water.top} />
      
      {/* ===== BASE/PEDESTAL ===== */}
      <ellipse cx="16" cy="26" rx="5" ry="2" fill={COLORS.appliance.side} />
      <ellipse cx="16" cy="26" rx="4" ry="1.5" fill={COLORS.appliance.front} />
    </svg>
  );
};
```

### ShowerIcon v2 (Base de Banheira)

```tsx
export const ShowerIcon = ({ className }: AssetIconProps) => {
  const PAD = 4;
  const W = 24; // largura da banheira
  const H = 22; // altura da banheira
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* ===== BORDA EXTERNA DA BANHEIRA ===== */}
      {/* Profundidade lateral 85° */}
      <rect x={PAD} y={PAD + 2} width="2" height={H} fill={COLORS.appliance.side} />
      
      {/* Borda da banheira - retângulo arredondado */}
      <rect x={PAD + 2} y={PAD} width={W} height={H} rx="4"
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Superfície superior da borda */}
      <rect x={PAD} y={PAD} width={W + 2} height="2.5" rx="1" 
        fill={COLORS.appliance.top} />
      
      {/* ===== INTERIOR DA BANHEIRA ===== */}
      {/* Fundo claro (metal.top = quase branco) */}
      <rect x={PAD + 4} y={PAD + 3} width={W - 4} height={H - 5} rx="3"
        fill={COLORS.metal.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      
      {/* Toque de água/reflexo */}
      <rect x={PAD + 5} y={PAD + 4} width={W - 6} height={H - 7} rx="2"
        fill={COLORS.water.top} opacity="0.25" />
      
      {/* Ralo central */}
      <ellipse cx="16" cy={PAD + H - 4} rx="2.5" ry="1" fill={COLORS.metal.shadow} />
      <ellipse cx="16" cy={PAD + H - 4} rx="1.2" ry="0.5" fill={COLORS.metal.handle} />
      
      {/* ===== CHUVEIRO (menor, secundário) ===== */}
      {/* Tubo */}
      <rect x="23" y={PAD} width="1.5" height="5" fill={COLORS.metal.chrome} />
      
      {/* Cabeça do chuveiro */}
      <ellipse cx="19" cy={PAD + 5} rx="4" ry="1.8"
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      
      {/* Furos do chuveiro */}
      <ellipse cx="17" cy={PAD + 5} rx="0.4" ry="0.3" fill={COLORS.metal.shadow} />
      <ellipse cx="19" cy={PAD + 5} rx="0.4" ry="0.3" fill={COLORS.metal.shadow} />
      <ellipse cx="21" cy={PAD + 5} rx="0.4" ry="0.3" fill={COLORS.metal.shadow} />
      
      {/* Gotas de água (sutis) */}
      <ellipse cx="16" cy={PAD + 10} rx="0.6" ry="1.5" fill={COLORS.water.front} opacity="0.5" />
      <ellipse cx="19" cy={PAD + 12} rx="0.6" ry="1.5" fill={COLORS.water.front} opacity="0.5" />
      <ellipse cx="22" cy={PAD + 9} rx="0.6" ry="1.5" fill={COLORS.water.front} opacity="0.5" />
    </svg>
  );
};
```

---

## Resumo das Mudanças

| Asset | Mudança Principal | Elementos-Chave |
|-------|------------------|-----------------|
| **ToiletIcon** | Formas orgânicas (elipses) | Tanque arredondado, assento oval, abertura escura oval, base/pedestal |
| **ShowerIcon** | Base tipo banheira sólida | Borda elevada visível, interior claro, ralo, chuveiro menor |
| **SinkIcon** | Mantido (cozinha) | Sem alterações - não usado no banheiro atualmente |

---

## Hierarquia de Escala (conforme memória)

| Asset | Tamanho Aproximado |
|-------|-------------------|
| Chuveiro | ~24px |
| Vaso Sanitário | ~23px |

---

## Arquivos Afetados

- `src/components/game/assets/AssetIcons.tsx`
  - Linhas 955-1036: ToiletIcon
  - Linhas 1038-1097: ShowerIcon

---

## Critérios de Sucesso Visual

1. **Vaso sanitário**: Silhueta imediatamente reconhecível como vaso (formas ovais + abertura escura)
2. **Chuveiro**: Aparência de banheira/box com borda elevada visível e interior claro
3. **Consistência 85°**: Depth lateral mantido onde aplicável
4. **Proporções**: Vaso ~23px, Chuveiro ~24px
5. **Respiro visual**: Assets não preenchem toda a célula

