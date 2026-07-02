import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";

class StandingsController {
  async show(request: Request, response: Response) {
    const groupParam = request.params.grupo;
    const grupo = (Array.isArray(groupParam) ? groupParam[0] : groupParam)
      .trim()
      .toUpperCase();

    const teams = await prisma.nationalTeam.findMany({
      where: { group: grupo },
      orderBy: { name: "asc" },
    });

    if (teams.length === 0) {
      throw new AppError(`Grupo ${grupo} não encontrado`, 404);
    }

    const teamIds = teams.map((team) => team.id);
    const matches = await prisma.match.findMany({
      where: {
        homeGoals: { not: null },
        awayGoals: { not: null },
        homeTeamId: { in: teamIds },
        awayTeamId: { in: teamIds },
      },
    });

    const tabela = teams.map((team) => {
      let vitorias = 0;
      let empates = 0;
      let derrotas = 0;
      let golsPro = 0;
      let golsContra = 0;

      const teamMatches = matches.filter(
        (match) =>
          match.homeTeamId === team.id || match.awayTeamId === team.id,
      );

      for (const match of teamMatches) {
        const isHomeTeam = match.homeTeamId === team.id;
        const goalsFor = isHomeTeam ? match.homeGoals! : match.awayGoals!;
        const goalsAgainst = isHomeTeam ? match.awayGoals! : match.homeGoals!;

        golsPro += goalsFor;
        golsContra += goalsAgainst;

        if (goalsFor > goalsAgainst) vitorias++;
        else if (goalsFor === goalsAgainst) empates++;
        else derrotas++;
      }

      return {
        selecao: {
          id: team.id,
          nome: team.name,
          sigla: team.acronym,
          bandeira: team.flag,
        },
        jogosDisputados: teamMatches.length,
        vitorias,
        empates,
        derrotas,
        pontos: vitorias * 3 + empates,
        golsPro,
        golsContra,
        saldoGols: golsPro - golsContra,
      };
    });

    tabela.sort(
      (a, b) =>
        b.pontos - a.pontos ||
        b.saldoGols - a.saldoGols ||
        b.golsPro - a.golsPro,
    );

    return response.json({ grupo, tabela });
  }
}

export { StandingsController };
