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
      className="glass-panel group overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/35 hover:shadow-[0_0_40px_rgba(99,102,241,.1)]"
    >
      <div className="flex justify-between border-b border-white/[.06] bg-gradient-to-r from-white/[.02] to-transparent px-5 py-4 text-[9px] font-bold uppercase tracking-[.16em] text-white/30">
        <span>
          {match.phase} • Rodada {match.round}
        </span>
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${match.completed ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-400/10 text-amber-300"}`}
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-current" />
          </span>
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
        <span className="font-display text-xl font-bold text-white/15">×</span>
        <TeamScore
          side="away"
          name={match.awayTeam.name}
          acronym={match.awayTeam.acronym}
          flag={match.awayTeam.flag}
          goals={match.awayGoals}
        />
        <button
          disabled={saving}
          className="col-span-full mt-3 overflow-hidden relative rounded-xl border border-indigo-400/20 bg-indigo-600/10 px-4 py-3.5 text-[10px] font-bold uppercase tracking-wider text-indigo-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-violet-600 hover:text-white hover:shadow-[0_0_30px_rgba(99,102,241,.25)] disabled:cursor-wait disabled:opacity-50"
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
      className="h-12 w-12 rounded-xl border border-white/8 bg-white/[.04] text-center font-display text-xl font-black text-white outline-none transition-all duration-300 focus:border-indigo-400/50 focus:bg-indigo-500/8 focus:shadow-[0_0_0_3px_rgba(99,102,241,.12)] tabular-nums"
    />
  );
  const team = (
    <>
      <span className="overflow-hidden rounded-lg border border-white/10">
        <img
          src={flag}
          alt={`Bandeira de ${name}`}
          className="h-7 w-10 object-cover"
        />
      </span>
      <strong className="text-sm font-bold text-white">{acronym}</strong>
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
