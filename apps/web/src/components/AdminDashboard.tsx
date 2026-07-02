import { FormEvent, ReactNode, useState } from "react";
import type { Match, Team } from "../types";
import { MatchCard } from "./MatchCard";

type MatchData = { homeTeamId: number; awayTeamId: number; round: number; phase: string };
type Props = { teams: Team[]; matches: Match[]; loading: boolean; error: string; onBack: () => void; onCreateMatch: (data: MatchData) => Promise<void>; onSaveResult: (id: number, home: number, away: number) => Promise<void> };

export function AdminDashboard({ teams, matches, loading, error, onBack, onCreateMatch, onSaveResult }: Props) {
  const [creating, setCreating] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); setCreating(true);
    try { await onCreateMatch({ homeTeamId: Number(form.get("homeTeamId")), awayTeamId: Number(form.get("awayTeamId")), round: Number(form.get("round")), phase: String(form.get("phase")) }); event.currentTarget.reset(); }
    finally { setCreating(false); }
  }
  const completed = matches.filter((match) => match.completed).length;
  return (
    <main className="min-h-screen bg-[#07110e] text-white">
      <header className="border-b border-white/10 bg-[#091712]/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10"><div><span className="text-[10px] font-extrabold uppercase tracking-[.2em] text-lime-400">Control center</span><h1 className="font-display text-2xl font-extrabold uppercase">Dashboard da competição</h1></div><button onClick={onBack} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition hover:bg-white hover:text-emerald-950">← Ver site</button></div></header>
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {error && <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}
        <div className="mb-8 grid gap-4 sm:grid-cols-3"><Stat label="Partidas" value={matches.length} /><Stat label="Finalizadas" value={completed} accent /><Stat label="Agendadas" value={matches.length - completed} /></div>
        <div className="grid items-start gap-8 lg:grid-cols-[360px_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[.04] p-6 lg:sticky lg:top-6"><span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-lime-400">Nova partida</span><h2 className="mt-2 font-display text-3xl font-extrabold uppercase">Definir confronto</h2><p className="mt-2 text-xs leading-5 text-white/40">Escolha as seleções e organize a próxima rodada.</p>
            <form onSubmit={(e) => void submit(e)} className="mt-6 space-y-4"><SelectTeam name="homeTeamId" label="Mandante" teams={teams} /><SelectTeam name="awayTeamId" label="Visitante" teams={teams} /><div className="grid grid-cols-2 gap-3"><Field label="Rodada"><input name="round" type="number" min="1" required className="admin-input" /></Field><Field label="Fase"><select name="phase" className="admin-input"><option>Fase de Grupos</option><option>Oitavas de Final</option><option>Quartas de Final</option><option>Semifinal</option><option>Final</option></select></Field></div><button disabled={creating} className="w-full rounded-xl bg-lime-400 py-3 text-xs font-extrabold uppercase tracking-wider text-emerald-950 transition hover:bg-lime-300 disabled:opacity-50">{creating ? "Criando…" : "+ Criar partida"}</button></form>
          </section>
          <section><div className="mb-5"><span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-white/35">Gerenciar resultados</span><h2 className="mt-1 font-display text-3xl font-extrabold uppercase">Partidas cadastradas</h2></div>{loading ? <p className="text-white/40">Carregando…</p> : <div className="grid gap-4 xl:grid-cols-2">{matches.map((match) => <MatchCard key={match.id} match={match} onSave={onSaveResult} />)}</div>}</section>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) { return <div className={`rounded-2xl border p-5 ${accent ? "border-lime-400/30 bg-lime-400/10" : "border-white/10 bg-white/[.035]"}`}><span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</span><strong className={`mt-2 block font-display text-4xl ${accent ? "text-lime-400" : "text-white"}`}>{value.toString().padStart(2, "0")}</strong></div>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block text-[10px] font-bold uppercase tracking-wider text-white/45">{label}{children}</label>; }
function SelectTeam({ name, label, teams }: { name: string; label: string; teams: Team[] }) { return <Field label={label}><select name={name} required defaultValue="" className="admin-input"><option value="" disabled>Selecione uma equipe</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name} ({team.acronym})</option>)}</select></Field>; }
