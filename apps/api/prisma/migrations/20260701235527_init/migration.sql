-- CreateTable
CREATE TABLE "national_team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "national_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "id" SERIAL NOT NULL,
    "home_team_id" INTEGER NOT NULL,
    "away_team_id" INTEGER NOT NULL,
    "home_goals" INTEGER,
    "away_goals" INTEGER,
    "phase" TEXT NOT NULL DEFAULT 'Fase de Grupos',
    "round" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "national_team_acronym_key" ON "national_team"("acronym");

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "national_team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "national_team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
