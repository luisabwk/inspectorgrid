import { AssetType } from "@/types/game";

export interface AssetInfo {
  name: string;
  description: string;
  canOccupy: boolean;
  occupyReason: string;
}

export const assetDictionary: Record<AssetType, AssetInfo> = {
  empty: {
    name: "Espaço Vazio",
    description: "Uma área livre do cômodo sem nenhum móvel ou objeto.",
    canOccupy: true,
    occupyReason: "Qualquer pessoa pode estar em um espaço vazio.",
  },
  bed: {
    name: "Cama",
    description: "Um móvel para dormir, com cabeceira, colchão e cobertor.",
    canOccupy: true,
    occupyReason: "Uma pessoa pode estar deitada ou sentada na cama.",
  },
  sofa: {
    name: "Sofá",
    description: "Um assento acolchoado para múltiplas pessoas, geralmente na sala.",
    canOccupy: true,
    occupyReason: "Uma pessoa pode estar sentada ou recostada no sofá.",
  },
  armchair: {
    name: "Poltrona",
    description: "Um assento individual confortável com apoio para os braços.",
    canOccupy: true,
    occupyReason: "Uma pessoa pode estar sentada na poltrona.",
  },
  rug: {
    name: "Tapete",
    description: "Uma peça decorativa de tecido que cobre parte do chão.",
    canOccupy: true,
    occupyReason: "Uma pessoa pode estar em pé ou sentada sobre o tapete.",
  },
  window: {
    name: "Janela",
    description: "Uma abertura na parede que permite entrada de luz e ventilação.",
    canOccupy: true,
    occupyReason: "Uma pessoa pode estar próxima à janela, olhando para fora.",
  },
  plant: {
    name: "Planta",
    description: "Um vaso decorativo com vegetação que ocupa espaço no chão.",
    canOccupy: false,
    occupyReason: "A planta ocupa todo o espaço, impedindo a presença de pessoas.",
  },
  table: {
    name: "Mesa",
    description: "Uma superfície elevada usada para refeições ou trabalho.",
    canOccupy: false,
    occupyReason: "A mesa é um obstáculo sólido que impede a ocupação.",
  },
  tv: {
    name: "Televisão",
    description: "Um aparelho eletrônico fixado ou apoiado em um móvel.",
    canOccupy: false,
    occupyReason: "O móvel da TV bloqueia o espaço.",
  },
  bookshelf: {
    name: "Estante",
    description: "Um móvel alto com prateleiras cheias de livros e objetos.",
    canOccupy: false,
    occupyReason: "A estante é um móvel grande que ocupa todo o espaço.",
  },
  rock: {
    name: "Pedra",
    description: "Uma formação rochosa natural ou decorativa.",
    canOccupy: false,
    occupyReason: "A pedra é um obstáculo sólido intransponível.",
  },
  debris: {
    name: "Entulho",
    description: "Destroços, madeira quebrada ou objetos espalhados pelo chão.",
    canOccupy: false,
    occupyReason: "O entulho torna o local perigoso e inacessível.",
  },
};
