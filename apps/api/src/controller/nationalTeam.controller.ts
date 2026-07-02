import { prisma } from "@/database/prisma";
import { Request, Response } from "express";

class NationalTeam {
  async index(request: Request, response: Response) {
    const teams = await prisma.nationalTeam.findMany({
      orderBy: [
        {
          group: "asc",
        },
        {
          name: "asc",
        },
      ],
    });

    return response.json({ teams });
  }

  async showByGroup(request: Request, response: Response) {
    const { letra } = request.params;

    const teams = await prisma.nationalTeam.findMany({
      where: {
        group: letra.toLocaleString().toLocaleUpperCase()
      },
      orderBy: {
        name: "asc",
      },
    });

    return response.json({ teams });
  }
}

export { NationalTeam };  
