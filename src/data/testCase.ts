import { GameCase, Cell } from "@/types/game";

// Generate a 6x6 grid for the test case
const generateTestGrid = (): Cell[][] => {
  const grid: Cell[][] = [];
  
  for (let row = 0; row < 6; row++) {
    grid[row] = [];
    for (let col = 0; col < 6; col++) {
      grid[row][col] = {
        row,
        col,
        asset: 'empty',
        walls: [],
        roomId: 'corridor',
      };
    }
  }
  
  // === SALA DE ESTAR (top-left 3x2 - rows 0-1, cols 0-2) ===
  for (let r = 0; r <= 1; r++) {
    for (let c = 0; c <= 2; c++) {
      grid[r][c].roomId = 'living';
    }
  }
  grid[0][0].asset = 'sofa';
  grid[0][1].asset = 'sofa';
  grid[0][2].asset = 'tv';
  grid[1][0].asset = 'armchair';
  grid[1][2].asset = 'plant';
  
  // === QUARTO (top-right 3x2 - rows 0-1, cols 3-5) ===
  for (let r = 0; r <= 1; r++) {
    for (let c = 3; c <= 5; c++) {
      grid[r][c].roomId = 'bedroom';
    }
  }
  // Cama dupla horizontal (2 células conectadas - esquerda/direita)
  grid[0][3].asset = 'bed';  // Head (cabeceira com travesseiros à esquerda)
  grid[0][4].asset = 'bed';  // Foot (cobertor com peseira à direita)
  grid[0][5].asset = 'window';
  
  // === BANHEIRO (middle row 2, cols 4-5) ===
  for (let c = 4; c <= 5; c++) {
    grid[2][c].roomId = 'bathroom';
  }
  grid[2][4].asset = 'toilet';
  grid[2][5].asset = 'shower';
  
  // === CORREDOR (middle row 2, cols 0-3) ===
  // cols 0-3 remain as corridor (default)
  grid[2][0].asset = 'door'; // porta para cozinha
  grid[2][3].asset = 'door'; // porta para escritório
  
  // === COZINHA (bottom-left 3x3 - rows 3-5, cols 0-2) ===
  for (let r = 3; r <= 5; r++) {
    for (let c = 0; c <= 2; c++) {
      grid[r][c].roomId = 'kitchen';
    }
  }
  grid[3][0].asset = 'fridge';
  grid[3][1].asset = 'table';
  grid[3][2].asset = 'table';
  grid[4][0].asset = 'stove';
  grid[4][2].asset = 'chair';
  grid[5][0].asset = 'sink';
  // grid[5][2] - célula vazia (entulho removido)
  
  // === ESCRITÓRIO (bottom-right 3x3 - rows 3-5, cols 3-5) ===
  for (let r = 3; r <= 5; r++) {
    for (let c = 3; c <= 5; c++) {
      grid[r][c].roomId = 'study';
    }
  }
  grid[3][3].asset = 'desk';
  grid[3][4].asset = 'desk';
  grid[3][5].asset = 'computer';
  grid[4][3].asset = 'window';
  grid[4][5].asset = 'bookshelf';
  grid[5][5].asset = 'rug';
  
  return grid;
};

export const testCase: GameCase = {
  id: "case-001",
  title: "O Mistério da Mansão Blackwood",
  description: "Uma noite chuvosa, um grito ecoa pela mansão. Seis suspeitos, seis posições. Apenas um é o culpado. Use as pistas para descobrir onde cada um estava no momento do crime.",
  difficulty: 1,
  gridSize: 6,
  layoutConfig: {
    cells: generateTestGrid(),
    rooms: [
      { id: 'living', name: 'Sala de Estar', color: 'hsl(30 50% 82%)' },
      { id: 'bedroom', name: 'Quarto', color: 'hsl(280 35% 88%)' },
      { id: 'bathroom', name: 'Banheiro', color: 'hsl(195 50% 70%)' },
      { id: 'kitchen', name: 'Cozinha', color: 'hsl(45 50% 85%)' },
      { id: 'study', name: 'Escritório', color: 'hsl(150 30% 85%)' },
      { id: 'corridor', name: 'Corredor', color: 'hsl(30 20% 90%)' },
    ],
  },
  suspects: [
    { id: 'suspect-1', name: 'Alberto', portraitId: 'portrait1', color: 'hsl(150 60% 35%)' },
    { id: 'suspect-2', name: 'Beatriz', portraitId: 'portrait2', color: 'hsl(280 60% 55%)' },
    { id: 'suspect-3', name: 'Carlos', portraitId: 'portrait3', color: 'hsl(0 65% 55%)' },
    { id: 'suspect-4', name: 'Diana', portraitId: 'portrait4', color: 'hsl(210 60% 55%)' },
    { id: 'suspect-5', name: 'Eduardo', portraitId: 'portrait5', color: 'hsl(45 70% 50%)' },
    { id: 'suspect-6', name: 'Vitória', portraitId: 'portrait6', color: 'hsl(340 60% 55%)', isVictim: true },
  ],
  clues: [
    {
      id: 'clue-1',
      text: 'Alberto estava relaxando no sofá da sala quando ouviu o grito.',
      type: 'position',
      constraint: { kind: 'on_asset', suspectId: 'suspect-1', assetType: 'sofa' },
    },
    {
      id: 'clue-2',
      text: 'Beatriz estava dormindo no quarto.',
      type: 'room',
      constraint: { kind: 'in_room', suspectId: 'suspect-2', roomId: 'bedroom' },
    },
    {
      id: 'clue-3',
      text: 'Carlos estava no corredor, mas não perto da cozinha.',
      type: 'position',
      constraint: { kind: 'in_room', suspectId: 'suspect-3', roomId: 'corridor' },
    },
    {
      id: 'clue-4',
      text: 'Diana não estava adjacente a nenhuma parede externa.',
      type: 'position',
      constraint: { kind: 'not_in_room', suspectId: 'suspect-4', roomId: 'corridor' },
    },
    {
      id: 'clue-5',
      text: 'Eduardo estava próximo à cozinha, mas não dentro dela.',
      type: 'adjacency',
      constraint: { kind: 'adjacent_to_asset', suspectId: 'suspect-5', assetType: 'door' },
    },
    {
      id: 'clue-6',
      text: 'Vitória foi vista pela última vez no escritório.',
      type: 'room',
      constraint: { kind: 'in_room', suspectId: 'suspect-6', roomId: 'study' },
    },
  ],
};
