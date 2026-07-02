export type Team = {
  id: number;
  name: string;
  acronym: string;
  group: string;
  flag: string;
};

export type Match = {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeGoals: number | null;
  awayGoals: number | null;
  phase: string;
  round: number;
  completed: boolean;
  homeTeam: Team;
  awayTeam: Team;
};

export type Standing = {
  selecao: { id: number; nome: string; sigla: string; bandeira: string };
  jogosDisputados: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  pontos: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
};
