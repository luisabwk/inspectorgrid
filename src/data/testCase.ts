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
  grid[0][1].asset = 'tv';
  grid[1][0].asset = 'armchair';
  grid[1][2].asset = 'plant';
  
  // === QUARTO (top-right 3x2 - rows 0-1, cols 3-5) ===
  for (let r = 0; r <= 1; r++) {
    for (let c = 3; c <= 5; c++) {
      grid[r][c].roomId = 'bedroom';
    }
  }
  // Cama dupla horizontal (2 células conectadas) - nunca duas camas separadas lado a lado
  grid[0][3].asset = 'bed';
  grid[0][4].asset = 'bed';
  grid[0][5].asset = 'window';
  
  // === CORREDOR (middle row 2 - full width) ===
  // Already set as default 'corridor'
  
  // === COZINHA (bottom-left 3x3 - rows 3-5, cols 0-2) ===
  for (let r = 3; r <= 5; r++) {
    for (let c = 0; c <= 2; c++) {
      grid[r][c].roomId = 'kitchen';
    }
  }
  grid[3][0].asset = 'table';
  grid[3][1].asset = 'table';
  grid[5][0].asset = 'debris';
  grid[4][2].asset = 'plant';
  
  // === ESCRITÓRIO (bottom-right 3x3 - rows 3-5, cols 3-5) ===
  for (let r = 3; r <= 5; r++) {
    for (let c = 3; c <= 5; c++) {
      grid[r][c].roomId = 'study';
    }
  }
  grid[3][4].asset = 'bookshelf';
  grid[5][5].asset = 'rug';
  grid[4][3].asset = 'window';
  
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
      { id: 'kitchen', name: 'Cozinha', color: 'hsl(45 50% 85%)' },
      { id: 'study', name: 'Escritório', color: 'hsl(150 30% 85%)' },
      { id: 'corridor', name: 'Corredor', color: 'hsl(30 20% 90%)' },
    ],
  },
  suspects: [
    { id: 'suspect-1', name: 'Alberto', portraitId: 'portrait6', color: 'hsl(45 90% 50%)' },
    { id: 'suspect-2', name: 'Beatriz', portraitId: 'portrait2', color: 'hsl(280 60% 65%)' },
    { id: 'suspect-3', name: 'Carlos', portraitId: 'portrait3', color: 'hsl(150 60% 45%)' },
    { id: 'suspect-4', name: 'Diana', portraitId: 'portrait7', color: 'hsl(0 85% 60%)' },
    { id: 'suspect-5', name: 'Eduardo', portraitId: 'portrait8', color: 'hsl(200 70% 50%)' },
    { id: 'suspect-6', name: 'Vitória', portraitId: 'portrait4', color: 'hsl(0 0% 25%)', isVictim: true },
  ],
  solution: {
    'suspect-1': { row: 0, col: 0 }, // Coronel no sofá
    'suspect-2': { row: 0, col: 4 }, // Professora na cama
    'suspect-3': { row: 2, col: 3 }, // Srta. Scarlet no corredor
    'suspect-4': { row: 3, col: 2 }, // Dr. Orchid no corredor
    'suspect-5': { row: 5, col: 2 }, // Chef no corredor perto da cozinha
    'suspect-6': { row: 5, col: 5 }, // Mordomo no tapete do escritório
  },
  clues: [
    { id: 'clue-1', text: 'Alberto estava relaxando no sofá da sala quando ouviu o grito.', type: 'position' },
    { id: 'clue-2', text: 'Beatriz estava dormindo no quarto.', type: 'room' },
    { id: 'clue-3', text: 'Carlos estava no corredor, mas não perto da cozinha.', type: 'position' },
    { id: 'clue-4', text: 'Diana não estava adjacente a nenhuma parede externa.', type: 'position' },
    { id: 'clue-5', text: 'Eduardo estava próximo à cozinha, mas não dentro dela.', type: 'adjacency' },
    { id: 'clue-6', text: 'Vitória foi vista pela última vez no escritório.', type: 'room' },
  ],
};
