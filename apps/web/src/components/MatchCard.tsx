import { FormEvent, useState } from "react";
import type { Match } from "../types";

type Props = { match: Match; onSave: (id: number, homeGoals: number, awayGoals: number) => Promise<void> };

export function MatchCard({ match, onSave }: Props) {
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true);
    try { await onSave(match.id, Number(form.get("homeGoals")), Number(form.get("awayGoals"))); }
    finally { setSaving(false); }
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white text-emerald-950 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10">
      <div className="flex justify-between border-b border-stone-100 px-5 py-4 text-[10px] font-extrabold uppercase tracking-[0.14em] text-stone-400">
        <span>Rodada {match.round}</span>
        <span className={`rounded-full px-2.5 py-1 ${match.completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}><span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />{match.completed ? "Finalizada" : "Agendada"}</span>
      </div>
      <form onSubmit={(event) => void submit(event)} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-5">
        <TeamScore side="home" name={match.homeTeam.name} acronym={match.homeTeam.acronym} flag={match.homeTeam.flag} goals={match.homeGoals} />
        <span className="font-display text-xl font-bold text-stone-300">×</span>
        <TeamScore side="away" name={match.awayTeam.name} acronym={match.awayTeam.acronym} flag={match.awayTeam.flag} goals={match.awayGoals} />
        <button disabled={saving} className="col-span-full mt-3 rounded-xl bg-emerald-950 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-white transition group-hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60">
          {saving ? "Salvando…" : "Salvar placar"}
        </button>
      </form>
    </article>
  );
}

type TeamScoreProps = { side: "home" | "away"; name: string; acronym: string; flag: string; goals: number | null };

function TeamScore({ side, name, acronym, flag, goals }: TeamScoreProps) {
  const input = <input name={`${side}Goals`} type="number" min="0" required defaultValue={goals ?? ""} aria-label={`Gols de ${name}`} className="h-12 w-12 rounded-xl border border-stone-200 bg-stone-50 text-center text-xl font-extrabold outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-3 focus:ring-emerald-100" />;
  const team = <><span className="overflow-hidden rounded-md border border-stone-200"><img src={flag} alt={`Bandeira de ${name}`} className="h-6 w-9 object-cover" /></span><strong className="text-sm">{acronym}</strong></>;
  return <label className={`flex items-center gap-2.5 ${side === "away" ? "justify-end" : ""}`}>{side === "home" ? <>{team}{input}</> : <>{input}{team}</>}</label>;
}
