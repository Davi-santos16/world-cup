import { prisma } from "@/database/prisma";

async function main() {
  console.log("🌱 Iniciando seed de seleções e partidas...");

  // Apaga partidas primeiro para evitar erro de relacionamento
  await prisma.match.deleteMany();

  // Apaga seleções antigas
  await prisma.nationalTeam.deleteMany();

  await prisma.nationalTeam.createMany({
    data: [
      {
        name: "Brasil",
        acronym: "BRA",
        group: "A",
        flag: "https://flagcdn.com/br.svg",
      },
      {
        name: "Argentina",
        acronym: "ARG",
        group: "A",
        flag: "https://flagcdn.com/ar.svg",
      },
      {
        name: "França",
        acronym: "FRA",
        group: "B",
        flag: "https://flagcdn.com/fr.svg",
      },
      {
        name: "Alemanha",
        acronym: "GER",
        group: "B",
        flag: "https://flagcdn.com/de.svg",
      },
      {
        name: "Espanha",
        acronym: "ESP",
        group: "C",
        flag: "https://flagcdn.com/es.svg",
      },
      {
        name: "Portugal",
        acronym: "POR",
        group: "C",
        flag: "https://flagcdn.com/pt.svg",
      },
      {
        name: "Inglaterra",
        acronym: "ENG",
        group: "D",
        flag: "https://flagcdn.com/gb-eng.svg",
      },
      {
        name: "Uruguai",
        acronym: "URU",
        group: "D",
        flag: "https://flagcdn.com/uy.svg",
      },
      {
        name: "Qatar",
        acronym: "QAT",
        group: "E",
        flag: "https://flagcdn.com/qa.svg",
      },
      {
        name: "Japão",
        acronym: "JPN",
        group: "E",
        flag: "https://flagcdn.com/jp.svg",
      },
      {
        name: "Coreia do Sul",
        acronym: "KOR",
        group: "F",
        flag: "https://flagcdn.com/kr.svg",
      },
      {
        name: "Estados Unidos",
        acronym: "USA",
        group: "F",
        flag: "https://flagcdn.com/us.svg",
      },
      {
        name: "México",
        acronym: "MEX",
        group: "G",
        flag: "https://flagcdn.com/mx.svg",
      },
      {
        name: "Canadá",
        acronym: "CAN",
        group: "G",
        flag: "https://flagcdn.com/ca.svg",
      },
      {
        name: "Marrocos",
        acronym: "MAR",
        group: "H",
        flag: "https://flagcdn.com/ma.svg",
      },
      {
        name: "Croácia",
        acronym: "CRO",
        group: "H",
        flag: "https://flagcdn.com/hr.svg",
      },
    ],
  });

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

  const teamsByGroup = teams.reduce<Record<string, typeof teams>>((acc, team) => {
    if (!acc[team.group]) {
      acc[team.group] = [];
    }

    acc[team.group].push(team);

    return acc;
  }, {});

  const matchesData = Object.values(teamsByGroup).flatMap((groupTeams) => {
    const matches = [];

    for (let i = 0; i < groupTeams.length; i++) {
      for (let j = i + 1; j < groupTeams.length; j++) {
        matches.push(
          {
            homeTeamId: groupTeams[i].id,
            awayTeamId: groupTeams[j].id,
            homeGoals: null,
            awayGoals: null,
            phase: "Fase de Grupos",
            round: 1,
            completed: false,
          },
          {
            homeTeamId: groupTeams[j].id,
            awayTeamId: groupTeams[i].id,
            homeGoals: null,
            awayGoals: null,
            phase: "Fase de Grupos",
            round: 2,
            completed: false,
          }
        );
      }
    }

    return matches;
  });

  await prisma.match.createMany({
    data: matchesData,
  });

  console.log(`✅ ${teams.length} seleções cadastradas com sucesso!`);
  console.log(`✅ ${matchesData.length} partidas criadas com sucesso!`);
}

main()
  .catch((error) => {
    console.error("❌ Erro ao executar seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
