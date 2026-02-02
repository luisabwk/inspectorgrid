
# Plano: Refazer Todos os Avatares Usando a Cartela

## Objetivo
Recriar completamente os 8 retratos de suspeitos seguindo fielmente o estilo visual da cartela de referência.

## Analise da Cartela

A cartela define um sistema modular com elementos especificos:

### Elementos Visuais Extraidos

| Categoria | Elementos |
|-----------|-----------|
| **Cabeca** | Forma oval simples, sem contorno, 6 tons de pele |
| **Cabelos** | Silhuetas solidas com contorno escuro, formas geometricas limpas |
| **Olhos** | Base branca oval, iris marrom grande, pupila preta pequena |
| **Sobrancelhas** | Arcos finos ou grossos, cor do cabelo |
| **Nariz** | Forma simples de "L" ou triangular |
| **Acessorios** | Oculos retangulares ou redondos com ponte |
| **Fundos** | Cores pasteis solidas |

### Paleta de Cores

```text
Tons de Pele:
- Claro:   #FADCBC, #F5D0B0
- Medio:   #E8C4A0, #D4A574  
- Escuro:  #A07850, #8B6B4A

Cores de Cabelo:
- Preto/Cinza: #4A4A4A (contorno #2C2C2C)
- Castanho:    #5C4033 (contorno #3C2818)
- Loiro:       #A08050 (contorno #6B5030)
- Grisalho:    #808080 (contorno #606060)

Fundos Pasteis:
- Cinza:       #D4D4D4
- Creme:       #F5ECD7
- Bege:        #E8DCC8
- Azul:        #C8DDE8
- Verde agua:  #C8E8E0
- Menta:       #D0E8D4
- Amarelo:     #F5F0C8
- Rosa:        #F0D4D4
```

## Mudancas por Avatar

### Portrait 1 - Alberto
- Cabelo curto escuro "bagunçado" (estilo linha 2 da cartela)
- Pele media
- Camisa verde
- Fundo verde agua

### Portrait 2 - Beatriz
- Cabelo longo liso (estilo linha 4 da cartela)
- Cor loira/castanha clara
- Pele clara
- Blusa roxa
- Fundo creme

### Portrait 3 - Carlos
- Cabelo medio masculino (estilo linha 2 da cartela)
- Oculos retangulares (como na cartela)
- Camisa vermelha
- Fundo bege

### Portrait 4 - Diana
- Cabelo afro/curly volumoso (estilo linha 5 da cartela)
- Pele escura
- Brincos dourados
- Blusa azul
- Fundo azul claro

### Portrait 5 - Eduardo
- Cabelo com coque/rabo (estilo linha 6 da cartela)
- Pele media
- Camisa amarela
- Fundo amarelo claro

### Portrait 6 - Vitoria (Vitima)
- Cabelo medio ondulado (variacao linha 4)
- Colar e brincos dourados
- Blusa rosa
- Fundo rosa

### Portrait 7 - Senhor Idoso
- Cabelo grisalho/calvo (estilo linha 1 cartela)
- Bigode cheio (como na cartela)
- Camisa ciano
- Fundo cinza

### Portrait 8 - Homem Careca
- Careca com brilho
- Oculos redondos (como na cartela)
- Camisa laranja
- Fundo bege

## Estrutura Tecnica do SVG

Cada avatar seguira esta estrutura padronizada:

```text
viewBox="0 0 32 40"

Camadas (ordem de renderizacao):
1. Retangulo de fundo (cor pastel solida)
2. Cabelo traseiro (se cabelo longo)
3. Pescoco
4. Camisa/roupa
5. Acessorios traseiros (brincos)
6. Cabeca oval
7. Cabelo frontal (silhueta com stroke)
8. Olhos (branco + iris marrom + pupila preta)
9. Sobrancelhas
10. Nariz (opcional, sutil)
11. Acessorios frontais (oculos, bigode)
```

### Proporcoes Padronizadas

```text
- Cabeca: ellipse cx=16, cy=18, rx=8-9, ry=9-10
- Olhos: posicao y=18, distancia x=12 e x=20
- Iris: raio ~1.5-2
- Pupila: raio ~0.8-1
- Sobrancelhas: y=15-16
- Pescoco: x=12, y=27, width=8, height=6
```

## Arquivo a Modificar

- `src/components/game/assets/SuspectPortraits.tsx`

## Resultado Esperado

Avatares com visual limpo e consistente, seguindo fielmente:
- Silhuetas de cabelo geometricas com contorno escuro
- Olhos expressivos (branco + iris + pupila)
- Proporcoes da cartela
- Cores pasteis de fundo
- Acessorios fieis ao estilo (oculos, bigodes, joias)
