import { FormEvent, ReactNode, useState } from "react";
import type { Match, Team } from "../types";
import { MatchCard } from "./MatchCard";

type MatchData = {
  homeTeamId: number;
  awayTeamId: number;
  round: number;
  phase: string;
};
type Props = {
  teams: Team[];
  matches: Match[];
  loading: boolean;
  error: string;
  onBack: () => void;
  onCreateMatch: (data: MatchData) => Promise<void>;
  onSaveResult: (id: number, home: number, away: number) => Promise<void>;
};

export function AdminDashboard({
  teams,
  matches,
  loading,
  error,
  onBack,
  onCreateMatch,
  onSaveResult,
}: Props) {
  const [creating, setCreating] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setCreating(true);
    try {
      await onCreateMatch({
        homeTeamId: Number(form.get("homeTeamId")),
        awayTeamId: Number(form.get("awayTeamId")),
        round: Number(form.get("round")),
        phase: String(form.get("phase")),
      });
      event.currentTarget.reset();
    } finally {
      setCreating(false);
    }
  }
  const completed = matches.filter((match) => match.completed).length;
  return (
    <main className="admin-surface relative min-h-screen overflow-hidden bg-[#020611] text-white">
      <div className="noise pointer-events-none fixed inset-0 opacity-15" />
      <div className="stars pointer-events-none fixed inset-0 opacity-20" />
      <div className="pointer-glow pointer-events-none fixed z-30 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl md:opacity-100" />
      <div className="pointer-events-none fixed -right-48 -top-52 size-[650px] rounded-full bg-blue-600/15 blur-[110px]" />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020611]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <span className="grid size-10 place-items-center rounded-xl border border-blue-400/30 bg-blue-500/15 shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_0_25px_rgba(37,99,235,.15)]">
              ⚽
            </span>
            <div>
              <span className="text-[9px] font-extrabold uppercase tracking-[.25em] text-blue-400">
                Control center
              </span>
              <h1 className="font-display text-xl font-extrabold uppercase sm:text-2xl">
                World Cup <span className="text-blue-400">26</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/35 sm:flex">
              <i className="size-1.5 animate-pulse rounded-full bg-blue-400" />{" "}
              Sistema online
            </span>
            <button
              onClick={onBack}
              className="glass-button rounded-full px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider"
            >
              ← Ver site
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
        <div
          data-reveal
          className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <span className="eyebrow">Visão geral</span>
            <h2 className="mt-2 font-display text-5xl font-extrabold uppercase leading-none sm:text-6xl">
              Painel da
              <br />
              <span className="text-gradient-blue">competição.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-6 text-white/35">
            Cadastre confrontos, atualize resultados e acompanhe o progresso do
            campeonato em um único lugar.
          </p>
        </div>
        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200 backdrop-blur-xl">
            {error}
          </div>
        )}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <Stat icon="◫" label="Partidas" value={matches.length} delay={0} />
          <Stat
            icon="✓"
            label="Finalizadas"
            value={completed}
            accent
            delay={80}
          />
          <Stat
            icon="◷"
            label="Agendadas"
            value={matches.length - completed}
            delay={160}
          />
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[380px_1fr]">
          <section
            data-reveal
            className="glass-panel rounded-3xl p-6 lg:sticky lg:top-28"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-[.22em] text-blue-400">
                  Nova partida
                </span>
                <h3 className="mt-2 font-display text-3xl font-extrabold uppercase">
                  Definir confronto
                </h3>
              </div>
              <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-xl shadow-[0_0_25px_rgba(37,99,235,.35)]">
                +
              </span>
            </div>
            <p className="mb-6 text-xs leading-5 text-white/35">
              Escolha as seleções e organize a próxima rodada.
            </p>
            <form
              onSubmit={(event) => void submit(event)}
              className="space-y-4"
            >
              <SelectTeam name="homeTeamId" label="Mandante" teams={teams} />
              <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[.25em] text-white/20">
                <i className="h-px flex-1 bg-white/10" /> versus{" "}
                <i className="h-px flex-1 bg-white/10" />
              </div>
              <SelectTeam name="awayTeamId" label="Visitante" teams={teams} />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Rodada">
                  <input
                    name="round"
                    type="number"
                    min="1"
                    required
                    className="admin-input"
                  />
                </Field>
                <Field label="Fase">
                  <select name="phase" className="admin-input">
                    <option>Fase de Grupos</option>
                    <option>Oitavas de Final</option>
                    <option>Quartas de Final</option>
                    <option>Semifinal</option>
                    <option>Final</option>
                  </select>
                </Field>
              </div>
              <button
                disabled={creating}
                className="w-full rounded-xl bg-blue-600 py-3.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-white shadow-[0_0_30px_rgba(37,99,235,.3)] transition hover:-translate-y-1 hover:bg-blue-500 disabled:opacity-50"
              >
                {creating ? "Criando…" : "+ Criar partida"}
              </button>
            </form>
          </section>
          <section>
            <div data-reveal className="mb-6 flex items-end justify-between">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-[.22em] text-blue-400">
                  Gerenciar resultados
                </span>
                <h3 className="mt-2 font-display text-3xl font-extrabold uppercase sm:text-4xl">
                  Partidas cadastradas
                </h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-white/35">
                {matches.length} jogos
              </span>
            </div>
            {loading ? (
              <div className="glass-panel rounded-3xl p-16 text-center text-white/35">
                Carregando partidas…
              </div>
            ) : (
              <div className="grid gap-4 xl:grid-cols-2">
                {matches.map((match, index) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    index={index}
                    onSave={onSaveResult}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
  accent = false,
  delay,
}: {
  icon: string;
  label: string;
  value: number;
  accent?: boolean;
  delay: number;
}) {
  return (
    <div
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={`glass-panel group flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-1 ${accent ? "border-blue-400/35 bg-blue-500/10" : ""}`}
    >
      <span
        className={`grid size-11 place-items-center rounded-xl text-lg ${accent ? "bg-blue-600 shadow-[0_0_25px_rgba(37,99,235,.35)]" : "bg-white/5 text-white/40"}`}
      >
        {icon}
      </span>
      <div>
        <span className="text-[9px] font-bold uppercase tracking-[.18em] text-white/35">
          {label}
        </span>
        <strong
          className={`block font-display text-4xl leading-none ${accent ? "text-blue-400" : "text-white"}`}
        >
          {value.toString().padStart(2, "0")}
        </strong>
      </div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-[9px] font-bold uppercase tracking-[.16em] text-white/40">
      {label}
      {children}
    </label>
  );
}
function SelectTeam({
  name,
  label,
  teams,
}: {
  name: string;
  label: string;
  teams: Team[];
}) {
  return (
    <Field label={label}>
      <select name={name} required defaultValue="" className="admin-input">
        <option value="" disabled>
          Selecione uma equipe
        </option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name} ({team.acronym})
          </option>
        ))}
      </select>
    </Field>
  );
}
