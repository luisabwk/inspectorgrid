

# Tornar Marcações de Portas e Janelas Mais Evidentes

## Diagnóstico do Problema

As marcações atuais de portas e janelas são muito sutis e difíceis de identificar visualmente:

### Janelas (atual)
- 3 listras finas azuis (1px cada) ocupando apenas 50% da largura
- Baixo contraste contra a parede cinza
- Sem indicador visual de "abertura" ou vidro

### Portas (atual)
- Faixa marrom sólida (40% da largura)
- Sem indicador de abertura/passagem
- Confunde-se visualmente com a parede

---

## Arquivo Afetado

`src/components/game/GameCell.tsx`

---

## Solução Proposta

### 1. Janelas - Estilo "Vidraça com Moldura"

Trocar as listras finas por uma representação mais clara de janela com:
- Moldura externa em marrom claro (madeira)
- Interior com gradiente azul claro (vidro)
- Ocupar 60-70% da parede para maior visibilidade
- Linha de divisão central (estilo janela de 2 folhas)

```tsx
{/* Window marking - horizontal (top/bottom walls) */}
{hasWindowTop && (
  <div className="absolute inset-x-[15%] inset-y-0 flex items-center justify-center">
    {/* Frame exterior */}
    <div className="w-full h-full bg-amber-800 flex items-center justify-center p-[1px]">
      {/* Glass panes */}
      <div className="w-full h-full flex gap-[1px]">
        <div className="flex-1 bg-sky-300 opacity-80" />
        <div className="flex-1 bg-sky-200 opacity-80" />
      </div>
    </div>
  </div>
)}
```

### 2. Portas - Estilo "Vão de Passagem"

Representar a porta como uma abertura/passagem visível:
- Cor da porta mais escura (mogno) com borda
- Indicador de maçaneta/puxador pequeno
- Quebra visual clara na parede (gap nos cantos)
- Ocupar 50-55% da parede

```tsx
{/* Door marking - horizontal (top/bottom walls) */}
{hasDoorTop && (
  <div className="absolute inset-x-[22%] inset-y-0 flex items-center justify-center">
    {/* Door frame */}
    <div className="w-full h-full bg-amber-900 border-x border-amber-950 flex items-center justify-end pr-[2px]">
      {/* Door handle */}
      <div className="w-[2px] h-[40%] bg-yellow-600 rounded-full" />
    </div>
  </div>
)}
```

---

## Alterações Detalhadas

### Paredes Horizontais (Top/Bottom)

| Elemento | Atual | Novo |
|----------|-------|------|
| Janela largura | 50% (`inset-x-1/4`) | 70% (`inset-x-[15%]`) |
| Janela estilo | 3 listras azuis | Moldura + 2 painéis de vidro |
| Janela cor | `bg-blue-300/200` | `bg-sky-300/200` com moldura `bg-amber-800` |
| Porta largura | 40% | 55% (`inset-x-[22%]`) |
| Porta estilo | Faixa sólida | Porta com maçaneta visível |
| Porta cor | `bg-amber-700` | `bg-amber-900` + bordas + maçaneta `bg-yellow-600` |

### Paredes Verticais (Left/Right)

As mesmas alterações, mas com orientação vertical (altura ao invés de largura).

---

## Código Completo das Alterações

### Janela Horizontal (Top)
```tsx
{hasWindowTop && (
  <div className="absolute inset-x-[15%] inset-y-0 flex items-center justify-center">
    <div className="w-full h-full bg-amber-800 flex items-center justify-center" style={{ padding: '0.5px' }}>
      <div className="w-full h-full flex gap-[1px]">
        <div className="flex-1 bg-sky-300" />
        <div className="flex-1 bg-sky-200" />
      </div>
    </div>
  </div>
)}
```

### Janela Vertical (Left)
```tsx
{hasWindowLeft && (
  <div className="absolute inset-y-[15%] inset-x-0 flex items-center justify-center">
    <div className="w-full h-full bg-amber-800 flex flex-col items-center justify-center" style={{ padding: '0.5px' }}>
      <div className="w-full h-full flex flex-col gap-[1px]">
        <div className="flex-1 bg-sky-300" />
        <div className="flex-1 bg-sky-200" />
      </div>
    </div>
  </div>
)}
```

### Porta Horizontal (Top)
```tsx
{hasDoorTop && (
  <div className="absolute inset-x-[20%] inset-y-0">
    <div className="w-full h-full bg-amber-900 border-x border-amber-950 flex items-center justify-end" style={{ paddingRight: '1px' }}>
      <div className="w-[2px] h-[35%] bg-yellow-500 rounded-sm" />
    </div>
  </div>
)}
```

### Porta Vertical (Left)
```tsx
{hasDoorLeft && (
  <div className="absolute inset-y-[20%] inset-x-0">
    <div className="w-full h-full bg-amber-900 border-y border-amber-950 flex flex-col items-end justify-center" style={{ paddingBottom: '1px' }}>
      <div className="h-[2px] w-[35%] bg-yellow-500 rounded-sm" />
    </div>
  </div>
)}
```

---

## Resumo Visual

```text
ANTES (sutil):
┌───────────────┐
│   ═══ ═══    │  ← janela: 3 listras finas azuis
└───────────────┘

DEPOIS (evidente):
┌───────────────┐
│ ╔═══╦═══╗    │  ← janela: moldura marrom + 2 painéis azuis
└───────────────┘

ANTES (sutil):
┌───────────────┐
│    ████      │  ← porta: barra marrom simples
└───────────────┘

DEPOIS (evidente):
┌───────────────┐
│   █████│●    │  ← porta: moldura + maçaneta dourada
└───────────────┘
```

---

## Seção Técnica

### Cores Utilizadas

| Elemento | Cor | Código |
|----------|-----|--------|
| Moldura janela | Marrom madeira | `bg-amber-800` |
| Vidro claro | Azul céu | `bg-sky-200` |
| Vidro escuro | Azul céu | `bg-sky-300` |
| Porta | Mogno escuro | `bg-amber-900` |
| Borda porta | Mogno muito escuro | `border-amber-950` |
| Maçaneta | Dourado | `bg-yellow-500` / `bg-yellow-600` |

### Dimensões

| Elemento | Ocupação | Classes |
|----------|----------|---------|
| Janela horizontal | 70% | `inset-x-[15%]` |
| Janela vertical | 70% | `inset-y-[15%]` |
| Porta horizontal | 60% | `inset-x-[20%]` |
| Porta vertical | 60% | `inset-y-[20%]` |

