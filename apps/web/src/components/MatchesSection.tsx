import type { Match } from "../types";
import { MatchCard } from "./MatchCard";
import { SectionHeading } from "./SectionHeading";

type Props = {
  matches: Match[];
  round?: number;
  loading: boolean;
  onRoundChange: (round?: number) => void;
  onSaveResult: (
    id: number,
    homeGoals: number,
    awayGoals: number,
  ) => Promise<void>;
};

export function MatchesSection({
  matches,
  round,
  loading,
  onRoundChange,
  onSaveResult,
}: Props) {
  const filter = (
    <label className="flex flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100/60">
      Filtrar partidas
      <select
        value={round ?? ""}
        onChange={(event) =>
          onRoundChange(
            event.target.value ? Number(event.target.value) : undefined,
          )
        }
        className="min-w-48 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-semibold normal-case tracking-normal text-emerald-950 shadow-sm outline-none focus:border-emerald-500"
      >
        <option value="">Todas as rodadas</option>
        <option value="1">Rodada 1</option>
        <option value="2">Rodada 2</option>
      </select>
    </label>
  );

  return (
    <section
      className="border-t border-stone-200 bg-stone-50"
      aria-labelledby="matches-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div id="matches-title">
          <SectionHeading
            eyebrow="Agenda & placares"
            title="Partidas"
            action={filter}
          />
        </div>
        {loading ? (
          <div
            className="grid min-h-32 place-items-center text-sm text-stone-400"
            role="status"
          >
            Carregando partidas…
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} onSave={onSaveResult} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 p-10 text-center text-sm text-stone-400">
            Nenhuma partida encontrada para este filtro.
          </div>
        )}
      </div>
    </section>
  );
}
