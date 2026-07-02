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
      className="rounded-full border border-white/8 bg-white/[.03] px-6 py-3.5 text-xs font-bold text-white outline-none backdrop-blur-xl transition-all duration-300 focus:border-indigo-400/50 focus:shadow-[0_0_20px_rgba(99,102,241,.1)]"
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
      {/* Ambient glow */}
      <div className="glow-orb -right-40 top-0 size-[500px] bg-indigo-500/8" />
      <div className="glow-orb -left-32 bottom-0 size-[400px] bg-violet-500/6" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          eyebrow="Calendário oficial"
          title="Últimos confrontos"
          action={filter}
          light
        />
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass-panel shimmer h-52 rounded-3xl" />
            ))}
          </div>
        ) : matches.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((match, index) => (
              <PublicMatchCard key={match.id} match={match} index={index} />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-16 text-center">
            <span className="mb-4 inline-block text-4xl">📭</span>
            <p className="font-medium text-white/30">
              Nenhuma partida nesta rodada.
            </p>
          </div>
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
      className="glass-panel group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/35 hover:shadow-[0_0_50px_rgba(99,102,241,.12)]"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/[.06] bg-gradient-to-r from-white/[.02] to-transparent px-6 py-4">
        <span className="text-[10px] font-bold uppercase tracking-[.18em] text-white/30">
          {match.phase} • R{match.round}
        </span>
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider ${
            match.completed
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-400/10 text-amber-300"
          }`}
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-current" />
          </span>
          {match.completed ? "Encerrado" : "Em breve"}
        </span>
      </div>

      {/* Match content */}
      <div className="p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <TeamDisplay team={match.homeTeam} />
          <div className="score-badge flex items-center gap-3 font-display text-3xl font-black transition-transform duration-500 group-hover:scale-110">
            <span className="tabular-nums">{match.homeGoals ?? "–"}</span>
            <span className="text-sm text-white/15">:</span>
            <span className="tabular-nums">{match.awayGoals ?? "–"}</span>
          </div>
          <TeamDisplay team={match.awayTeam} away />
        </div>
      </div>
    </article>
  );
}

function TeamDisplay({
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
      <div className="relative shrink-0">
        <img
          src={team.flag}
          alt=""
          className="h-10 w-14 rounded-lg border border-white/10 object-cover shadow-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]" />
      </div>
      <div className="min-w-0">
        <strong className="block truncate text-sm font-bold">{team.acronym}</strong>
        <small className="block truncate text-[10px] font-medium text-white/30">
          {team.name}
        </small>
      </div>
    </div>
  );
}
