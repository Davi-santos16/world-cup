import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";

class MatchController {
  async create(request: Request, response: Response) {
    const { homeTeamId, awayTeamId, round, phase = "Fase de Grupos" } = request.body ?? {};

    if (![homeTeamId, awayTeamId, round].every((value) => Number.isInteger(value) && value > 0)) {
      throw new AppError("Seleções e rodada devem ser valores válidos", 400);
    }
    if (homeTeamId === awayTeamId) {
      throw new AppError("Uma seleção não pode jogar contra ela mesma", 400);
    }

    const teams = await prisma.nationalTeam.count({ where: { id: { in: [homeTeamId, awayTeamId] } } });
    if (teams !== 2) throw new AppError("Uma das seleções não foi encontrada", 404);

    const match = await prisma.match.create({
      data: { homeTeamId, awayTeamId, round, phase: String(phase).trim() || "Fase de Grupos" },
      include: { homeTeam: true, awayTeam: true },
    });
    return response.status(201).json({ match });
  }

  async index(request: Request, response: Response) {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
      },
      orderBy: {
        round: "asc",
      },
    });

    return response.json({ matches });
  }

  async showByRound(request: Request, response: Response) {
    const roundParam = request.params.numero;
    const numero = Number(Array.isArray(roundParam) ? roundParam[0] : roundParam);

    if (!Number.isInteger(numero) || numero <= 0) {
      throw new AppError("O número da rodada deve ser um inteiro válido", 400);
    }

    const matches = await prisma.match.findMany({
      where: { round: numero },
      include: {
        homeTeam: true,
        awayTeam: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return response.json({ matches });
  }

  async updateResult(request: Request, response: Response) {
    const idParam = request.params.id;
    const id = Number(Array.isArray(idParam) ? idParam[0] : idParam);
    const { golsMandante, golsVisitante } = request.body ?? {};

    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("ID da partida inválido", 400);
    }

    if (
      !Number.isInteger(golsMandante) ||
      golsMandante < 0 ||
      !Number.isInteger(golsVisitante) ||
      golsVisitante < 0
    ) {
      throw new AppError(
        "golsMandante e golsVisitante devem ser inteiros não negativos",
        400,
      );
    }

    const existingMatch = await prisma.match.findUnique({ where: { id } });

    if (!existingMatch) {
      throw new AppError("Partida não encontrada", 404);
    }

    const match = await prisma.match.update({
      where: { id },
      data: {
        homeGoals: golsMandante,
        awayGoals: golsVisitante,
        completed: true,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    });

    return response.json({ match });
  }
}

export { MatchController };
