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
      <div className="stars pointer-events-none fixed inset-0 opacity-15" />
      <div className="pointer-glow pointer-events-none fixed z-30 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl md:opacity-100" />

      {/* Ambient glow orbs */}
      <div className="glow-orb fixed -right-48 -top-52 size-[650px] bg-indigo-600/12" />
      <div className="glow-orb fixed -left-32 bottom-0 size-[400px] bg-violet-600/8" />

      <header className="sticky top-0 z-40 border-b border-white/[.06] bg-[#020611]/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <span className="relative grid size-11 place-items-center rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_0_25px_rgba(99,102,241,.12)]">
              ⚽
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,.6)]" />
            </span>
            <div>
              <span className="eyebrow text-[9px]">
                Control center
              </span>
              <h1 className="font-display text-xl font-black sm:text-2xl">
                World Cup{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  26
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/30 sm:flex">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Sistema online
            </span>
            <button
              onClick={onBack}
              className="glass-button rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider"
            >
              ← Ver site
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-14">
        <div
          data-reveal
          className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <span className="eyebrow">Visão geral</span>
            <h2 className="mt-3 font-display text-5xl font-black leading-none sm:text-6xl">
              Painel da
              <br />
              <span className="text-gradient-blue">competição.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs font-medium leading-6 text-white/30">
            Cadastre confrontos, atualize resultados e acompanhe o progresso do
            campeonato em um único lugar.
          </p>
        </div>
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-400/20 bg-rose-500/8 p-4 text-sm font-medium text-rose-200 backdrop-blur-xl">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-rose-500/15 text-base">⚠</span>
            {error}
          </div>
        )}

        {/* Stats row */}
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <Stat icon="◫" label="Partidas" value={matches.length} delay={0} />
          <Stat
            icon="✓"
            label="Finalizadas"
            value={completed}
            accent="emerald"
            delay={80}
          />
          <Stat
            icon="◷"
            label="Agendadas"
            value={matches.length - completed}
            accent="amber"
            delay={160}
          />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[380px_1fr]">
          {/* Create match form */}
          <section
            data-reveal
            className="glass-panel rounded-3xl p-7 lg:sticky lg:top-28"
          >
            <div className="mb-7 flex items-start justify-between">
              <div>
                <span className="eyebrow text-[9px]">
                  Nova partida
                </span>
                <h3 className="mt-2 font-display text-3xl font-black">
                  Definir confronto
                </h3>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl shadow-[0_0_30px_rgba(99,102,241,.3)]">
                +
              </span>
            </div>
            <p className="mb-7 text-xs font-medium leading-5 text-white/30">
              Escolha as seleções e organize a próxima rodada.
            </p>
            <form
              onSubmit={(event) => void submit(event)}
              className="space-y-4"
            >
              <SelectTeam name="homeTeamId" label="Mandante" teams={teams} />
              <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[.25em] text-white/15">
                <i className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                versus
                <i className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
                className="w-full overflow-hidden relative rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-[10px] font-bold uppercase tracking-[.16em] text-white shadow-[0_0_35px_rgba(99,102,241,.3)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(99,102,241,.45)] disabled:opacity-50"
              >
                {creating ? "Criando…" : "+ Criar partida"}
              </button>
            </form>
          </section>

          {/* Match list */}
          <section>
            <div data-reveal className="mb-7 flex items-end justify-between">
              <div>
                <span className="eyebrow text-[9px]">
                  Gerenciar resultados
                </span>
                <h3 className="mt-2 font-display text-3xl font-black sm:text-4xl">
                  Partidas cadastradas
                </h3>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[.03] px-4 py-2 text-[10px] font-bold tabular-nums text-white/30 backdrop-blur">
                <span className="size-1.5 rounded-full bg-indigo-400" />
                {matches.length} jogos
              </span>
            </div>
            {loading ? (
              <div className="grid gap-4 xl:grid-cols-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="glass-panel shimmer h-48 rounded-2xl" />
                ))}
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
  accent,
  delay,
}: {
  icon: string;
  label: string;
  value: number;
  accent?: "emerald" | "amber";
  delay: number;
}) {
  const accentStyles = {
    emerald: {
      card: "border-emerald-400/20 bg-emerald-500/5",
      icon: "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,.3)]",
      value: "text-emerald-400",
    },
    amber: {
      card: "border-amber-400/20 bg-amber-500/5",
      icon: "bg-gradient-to-br from-amber-500 to-orange-500 shadow-[0_0_25px_rgba(245,158,11,.3)]",
      value: "text-amber-400",
    },
  };
  const styles = accent ? accentStyles[accent] : null;

  return (
    <div
      data-reveal
      style={{ transitionDelay: `${delay}ms` }}
      className={`glass-panel group flex items-center gap-4 rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(99,102,241,.08)] ${styles?.card ?? ""}`}
    >
      <span
        className={`grid size-12 place-items-center rounded-2xl text-lg font-bold ${styles?.icon ?? "bg-white/5 text-white/35"}`}
      >
        {icon}
      </span>
      <div>
        <span className="text-[9px] font-bold uppercase tracking-[.18em] text-white/30">
          {label}
        </span>
        <strong
          className={`block font-display text-4xl font-black leading-none tabular-nums animate-count ${styles?.value ?? "text-white"}`}
        >
          {value.toString().padStart(2, "0")}
        </strong>
      </div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-[9px] font-bold uppercase tracking-[.16em] text-white/35">
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
