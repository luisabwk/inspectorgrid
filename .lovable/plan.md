

# Murdoku - Plano de Desenvolvimento

## Visão Geral
Um WebApp de investigação lógica baseado em Quadrados Latinos ambientado em cenas de crime. Jogadores posicionam suspeitos em uma grade respeitando pistas narrativas e propriedades físicas do cenário.

---

## Fase 1: Fundação e Autenticação

### Sistema de Autenticação
- Tela de login/cadastro com tema noir (preto, branco, cinza e detalhes em vermelho)
- Login obrigatório para acessar o jogo
- Proteção de rotas para usuários não autenticados

### Estrutura do Banco de Dados
- **Usuários e Perfis**: Dados do jogador e preferências
- **Casos**: Informações dos puzzles (título, dificuldade, configuração da grade)
- **Progresso**: Casos completados, pontuação e nível atual do jogador
- **Sistema de Roles**: Controle de acesso seguro (admin, jogador)

---

## Fase 2: Motor do Jogo

### Grade Dinâmica
- Renderização de cenas baseada em configuração JSON
- Sistema de salas (rooms) e paredes (walls) que afetam adjacência
- Assets visuais: camas, sofás, mesas, plantas, TVs, etc.

### Lógica de Ocupação
- **Células Permitidas**: Vazias, camas, sofás, poltronas, tapetes, janelas
- **Células Bloqueadas**: Plantas, mesas, TVs, estantes, pedras, entulho
- Validação de adjacência respeitando paredes

### Sistema de Suspeitos
- Avatares ilustrados para cada personagem
- Visualização em camada sobreposta (avatar semi-transparente sobre o asset)
- Drag & Drop para posicionamento

---

## Fase 3: Mecânicas de Gameplay

### Notas de Lápis
- Marcar múltiplos suspeitos potenciais em uma célula
- Interface intuitiva para adicionar/remover marcações

### Sistema de Pistas
- Painel lateral com cards de pistas narrativas
- Pistas descrevem relações entre suspeitos e posições

### Validação e Veredito
- Validação automática ao preencher última célula válida
- Regra de Quadrado Latino: 1 suspeito por linha/coluna
- Modal de veredito para apontar o culpado

---

## Fase 4: Progressão e Dificuldade

### Sistema de Níveis
- Grade inicial: 6x6 com 6 suspeitos
- Aumento de dificuldade a cada 3 puzzles completados
- Grids maiores e cenários mais complexos conforme progresso

### Salvamento de Progresso
- Casos completados e pontuação salvos no Supabase
- Continuar de onde parou ao retornar ao jogo

---

## Estética Visual
- **Tema Crime Noir**: Paleta de preto, branco, cinza com acentos em vermelho
- Tipografia estilizada evocando investigações policiais
- Atmosfera misteriosa e imersiva

