import { FormEvent, useState } from "react";
import type { Match } from "../types";

type Props = {
  match: Match;
  index?: number;
  onSave: (id: number, homeGoals: number, awayGoals: number) => Promise<void>;
};

export function MatchCard({ match, index = 0, onSave }: Props) {
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    try {
      await onSave(
        match.id,
        Number(form.get("homeGoals")),
        Number(form.get("awayGoals")),
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <article
      data-reveal
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
      className="glass-panel group overflow-hidden rounded-2xl transition duration-500 hover:-translate-y-2 hover:border-blue-400/40"
    >
      <div className="flex justify-between border-b border-white/10 bg-white/[.02] px-5 py-4 text-[9px] font-extrabold uppercase tracking-[.16em] text-white/35">
        <span>
          {match.phase} • Rodada {match.round}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 ${match.completed ? "bg-blue-500/15 text-blue-300" : "bg-amber-400/10 text-amber-300"}`}
        >
          <i className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-current" />
          {match.completed ? "Finalizada" : "Agendada"}
        </span>
      </div>
      <form
        onSubmit={(event) => void submit(event)}
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-5"
      >
        <TeamScore
          side="home"
          name={match.homeTeam.name}
          acronym={match.homeTeam.acronym}
          flag={match.homeTeam.flag}
          goals={match.homeGoals}
        />
        <span className="font-display text-xl font-bold text-white/20">×</span>
        <TeamScore
          side="away"
          name={match.awayTeam.name}
          acronym={match.awayTeam.acronym}
          flag={match.awayTeam.flag}
          goals={match.awayGoals}
        />
        <button
          disabled={saving}
          className="col-span-full mt-3 rounded-xl border border-blue-400/20 bg-blue-600/15 px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-blue-200 transition hover:bg-blue-600 hover:text-white disabled:cursor-wait disabled:opacity-60"
        >
          {saving ? "Salvando…" : "Salvar placar"}
        </button>
      </form>
    </article>
  );
}

type TeamScoreProps = {
  side: "home" | "away";
  name: string;
  acronym: string;
  flag: string;
  goals: number | null;
};
function TeamScore({ side, name, acronym, flag, goals }: TeamScoreProps) {
  const input = (
    <input
      name={`${side}Goals`}
      type="number"
      min="0"
      required
      defaultValue={goals ?? ""}
      aria-label={`Gols de ${name}`}
      className="h-12 w-12 rounded-xl border border-white/10 bg-black/20 text-center text-xl font-extrabold text-white outline-none transition focus:border-blue-400 focus:bg-blue-500/10 focus:ring-3 focus:ring-blue-500/10"
    />
  );
  const team = (
    <>
      <span className="overflow-hidden rounded-md border border-white/15">
        <img
          src={flag}
          alt={`Bandeira de ${name}`}
          className="h-6 w-9 object-cover"
        />
      </span>
      <strong className="text-sm text-white">{acronym}</strong>
    </>
  );
  return (
    <label
      className={`flex items-center gap-2.5 ${side === "away" ? "justify-end" : ""}`}
    >
      {side === "home" ? (
        <>
          {team}
          {input}
        </>
      ) : (
        <>
          {input}
          {team}
        </>
      )}
    </label>
  );
}
