import type { Match, Standing, Team } from "./types";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message ?? "Não foi possível concluir a operação");
  return data;
}

export const api = {
  teams: () => request<{ teams: Team[] }>("/team"),
  standings: (group: string) =>
    request<{ grupo: string; tabela: Standing[] }>(`/classificacao/${group}`),
  matches: (round?: number) =>
    request<{ matches: Match[] }>(round ? `/partidas/rodada/${round}` : "/partidas"),
  updateResult: (id: number, golsMandante: number, golsVisitante: number) =>
    request<{ match: Match }>(`/partidas/${id}/resultado`, {
      method: "PATCH",
      body: JSON.stringify({ golsMandante, golsVisitante }),
    }),
  createMatch: (data: { homeTeamId: number; awayTeamId: number; round: number; phase: string }) =>
    request<{ match: Match }>("/partidas", { method: "POST", body: JSON.stringify(data) }),
};
