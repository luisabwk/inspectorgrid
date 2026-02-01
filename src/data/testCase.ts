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
        roomId: 'main',
      };
    }
  }
  
  // Add some furniture and blocked cells
  // Living room area (top-left)
  grid[0][0].asset = 'sofa';
  grid[0][1].asset = 'tv';
  grid[1][0].asset = 'armchair';
  grid[1][2].asset = 'plant';
  
  // Bedroom area (top-right)
  grid[0][4].asset = 'bed';
  grid[0][5].asset = 'bed';
  grid[1][5].asset = 'window';
  
  // Kitchen area (bottom-left)
  grid[4][0].asset = 'table';
  grid[4][1].asset = 'table';
  grid[5][0].asset = 'debris';
  
  // Study area (bottom-right)
  grid[4][4].asset = 'bookshelf';
  grid[5][5].asset = 'rug';
  
  // Add walls to create rooms
  // Wall between living room and bedroom
  grid[0][2].walls.push('right');
  grid[0][3].walls.push('left');
  grid[1][2].walls.push('right');
  grid[1][3].walls.push('left');
  
  // Wall between top and bottom sections
  grid[2][0].walls.push('bottom');
  grid[2][1].walls.push('bottom');
  grid[3][0].walls.push('top');
  grid[3][1].walls.push('top');
  
  // Update room IDs
  grid[0][0].roomId = 'living';
  grid[0][1].roomId = 'living';
  grid[0][2].roomId = 'living';
  grid[1][0].roomId = 'living';
  grid[1][1].roomId = 'living';
  grid[1][2].roomId = 'living';
  
  grid[0][3].roomId = 'bedroom';
  grid[0][4].roomId = 'bedroom';
  grid[0][5].roomId = 'bedroom';
  grid[1][3].roomId = 'bedroom';
  grid[1][4].roomId = 'bedroom';
  grid[1][5].roomId = 'bedroom';
  
  grid[4][0].roomId = 'kitchen';
  grid[4][1].roomId = 'kitchen';
  grid[5][0].roomId = 'kitchen';
  grid[5][1].roomId = 'kitchen';
  
  grid[4][4].roomId = 'study';
  grid[4][5].roomId = 'study';
  grid[5][4].roomId = 'study';
  grid[5][5].roomId = 'study';
  
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
      { id: 'main', name: 'Corredor', color: 'hsl(30 20% 90%)' },
    ],
  },
  suspects: [
    { id: 'suspect-1', name: 'Coronel Mostarda', portraitId: 'portrait6', color: 'hsl(45 90% 50%)' },
    { id: 'suspect-2', name: 'Professora Violeta', portraitId: 'portrait2', color: 'hsl(280 60% 65%)' },
    { id: 'suspect-3', name: 'Srta. Scarlet', portraitId: 'portrait7', color: 'hsl(0 85% 60%)' },
    { id: 'suspect-4', name: 'Dr. Orchid', portraitId: 'portrait3', color: 'hsl(150 60% 45%)' },
    { id: 'suspect-5', name: 'Chef White', portraitId: 'portrait8', color: 'hsl(0 0% 95%)' },
    { id: 'suspect-6', name: 'Mordomo Black', portraitId: 'portrait4', color: 'hsl(220 15% 30%)' },
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
    { id: 'clue-1', text: 'O Coronel Mostarda estava relaxando no sofá da sala quando ouviu o grito.', type: 'position' },
    { id: 'clue-2', text: 'A Professora Violeta estava dormindo no quarto.', type: 'room' },
    { id: 'clue-3', text: 'A Srta. Scarlet estava no corredor, mas não perto da cozinha.', type: 'position' },
    { id: 'clue-4', text: 'O Dr. Orchid não estava adjacente a nenhuma parede externa.', type: 'position' },
    { id: 'clue-5', text: 'O Chef White estava próximo à cozinha, mas não dentro dela.', type: 'adjacency' },
    { id: 'clue-6', text: 'O Mordomo Black foi visto pela última vez no escritório.', type: 'room' },
  ],
};
