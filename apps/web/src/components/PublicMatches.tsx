import type { Match } from "../types";
import { SectionHeading } from "./SectionHeading";

type Props = {
  matches: Match[];
  round?: number;
  loading: boolean;
  onRoundChange: (round?: number) => void;
};

export function PublicMatches({
  matches,
  round,
  loading,
  onRoundChange,
}: Props) {
  const filter = (
    <select
      aria-label="Filtrar rodada"
      value={round ?? ""}
      onChange={(e) =>
        onRoundChange(e.target.value ? Number(e.target.value) : undefined)
      }
      className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-white outline-none backdrop-blur focus:border-blue-400"
    >
      <option className="bg-[#071126]" value="">
        Todas as rodadas
      </option>
      <option className="bg-[#071126]" value="1">
        Rodada 1
      </option>
      <option className="bg-[#071126]" value="2">
        Rodada 2
      </option>
    </select>
  );
  return (
    <section id="partidas" className="relative overflow-hidden bg-[#01040c]">
      <div className="absolute -right-40 top-0 size-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Calendário oficial"
          title="Últimos confrontos"
          action={filter}
          light
        />
        {loading ? (
          <p className="py-20 text-center text-white/40">
            Carregando partidas…
          </p>
        ) : matches.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((match, index) => (
              <PublicMatchCard key={match.id} match={match} index={index} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-white/10 p-16 text-center text-white/35">
            Nenhuma partida nesta rodada.
          </p>
        )}
      </div>
    </section>
  );
}

function PublicMatchCard({ match, index }: { match: Match; index: number }) {
  return (
    <article
      data-reveal
      style={{ transitionDelay: `${index * 70}ms` }}
      className="glass-panel group rounded-3xl p-6 transition duration-500 hover:-translate-y-2 hover:border-blue-400/45"
    >
      <div className="mb-7 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-[.18em] text-white/35">
        <span>
          {match.phase} • R{match.round}
        </span>
        <span className={match.completed ? "text-blue-400" : "text-amber-400"}>
          {match.completed ? "Encerrado" : "Em breve"}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Team team={match.homeTeam} />
        <div className="flex items-center gap-2 font-display text-4xl font-extrabold transition-transform duration-500 group-hover:scale-110">
          <span>{match.homeGoals ?? "–"}</span>
          <span className="text-lg text-white/20">:</span>
          <span>{match.awayGoals ?? "–"}</span>
        </div>
        <Team team={match.awayTeam} away />
      </div>
    </article>
  );
}

function Team({
  team,
  away = false,
}: {
  team: Match["homeTeam"];
  away?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-3 ${away ? "flex-row-reverse text-right" : ""}`}
    >
      <img
        src={team.flag}
        alt=""
        className="h-9 w-12 rounded-md object-cover shadow-lg"
      />
      <div className="min-w-0">
        <strong className="block truncate text-sm">{team.acronym}</strong>
        <small className="block truncate text-[10px] text-white/35">
          {team.name}
        </small>
      </div>
    </div>
  );
}
