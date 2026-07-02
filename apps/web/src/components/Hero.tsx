type Props = { onOpenAdmin: () => void };

const features = [
  { icon: "🏆", number: "01", title: "Classificação", text: "Grupos atualizados em tempo real" },
  { icon: "⚔️", number: "02", title: "Confrontos", text: "Todos os placares ao vivo" },
  { icon: "📊", number: "03", title: "Estatísticas", text: "Dados completos da competição" },
];

export function Hero({ onOpenAdmin }: Props) {
  return (
    <header className="hero-blue relative min-h-screen overflow-hidden text-white">
      {/* Background layers */}
      <div className="noise pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-glow pointer-events-none fixed z-30 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity md:opacity-100" />
      <div className="stars pointer-events-none absolute inset-0" />

      {/* Ambient glow orbs */}
      <div className="glow-orb -left-32 top-1/4 size-[500px] bg-indigo-600/20 animate-pulse-glow" />
      <div className="glow-orb -right-48 top-1/3 size-[600px] bg-violet-600/15 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="glow-orb left-1/3 -bottom-32 size-[400px] bg-cyan-500/10 animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Navbar */}
      <nav className="relative z-40 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-12">
        <a
          href="#"
          className="flex items-center gap-3 font-display text-xl font-extrabold tracking-wide"
        >
          <span className="relative grid size-11 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-lg shadow-[inset_0_1px_0_rgba(255,255,255,.2)] backdrop-blur-xl">
            ⚽
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,.6)]" />
          </span>
          <span className="font-display text-xl font-extrabold">
            WC<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">26</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[.2em] text-white/40 md:flex">
          <a href="#classificacao" className="transition-colors duration-300 hover:text-white">
            Tabela
          </a>
          <a href="#partidas" className="transition-colors duration-300 hover:text-white">
            Partidas
          </a>
          <span className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        </div>
        <button
          onClick={onOpenAdmin}
          className="glass-button group rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider"
        >
          Dashboard{" "}
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-[1400px] items-center px-6 pb-44 pt-10 lg:grid-cols-[1fr_.85fr] lg:px-12 lg:pb-52">
        <div className="relative z-20 animate-rise">
          {/* Badge */}
          <span className="mb-7 inline-flex items-center gap-3 rounded-full border border-indigo-400/20 bg-indigo-500/8 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[.25em] text-indigo-200 shadow-[0_0_30px_rgba(99,102,241,.1)] backdrop-blur-xl">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-indigo-400" />
            </span>
            The home of football
          </span>

          {/* Main heading */}
          <h1 className="max-w-3xl font-display text-[clamp(4.5rem,9vw,9rem)] font-black leading-[.72] tracking-[-.045em]">
            O mundo
            <br />
            <span className="text-gradient-blue">joga aqui.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-10 max-w-md text-[15px] font-medium leading-8 text-white/40">
            Uma nova forma de acompanhar cada rodada, cada seleção e cada
            momento que muda a história do campeonato.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#classificacao"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-4 text-[10px] font-bold uppercase tracking-[.16em] shadow-[0_0_40px_rgba(99,102,241,.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(99,102,241,.5)]"
            >
              <span className="relative z-10">
                Explorar campeonato{" "}
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-y-1">
                  ↓
                </span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </a>
            <a
              href="#partidas"
              className="glass-button rounded-full px-7 py-4 text-[10px] font-bold uppercase tracking-[.16em]"
            >
              Ver resultados
            </a>
          </div>
        </div>

        {/* Trophy / Hero image */}
        <div className="trophy-stage pointer-events-none absolute right-[-18%] top-[5%] h-[75%] w-[82%] sm:right-[-8%] lg:relative lg:right-auto lg:top-auto lg:h-[680px] lg:w-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_42%,rgba(99,102,241,.3),transparent_58%)] blur-xl" />
          <img
            src="/assets/world-cup-hero.svg"
            alt="Arte oficial da competição 2026"
            className="animate-trophy relative z-10 h-full w-full object-contain object-center [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
          />
          <div className="absolute bottom-[12%] left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-2xl" />
        </div>
      </div>

      {/* Feature cards at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto max-w-[1400px] px-6 pb-8 lg:px-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {features.map((feature, index) => (
            <a
              key={feature.number}
              href={index === 0 ? "#classificacao" : "#partidas"}
              className="feature-glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/40 hover:shadow-[0_0_40px_rgba(99,102,241,.1)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 text-xl shadow-[inset_0_1px_0_rgba(255,255,255,.1)]">
                {feature.icon}
              </span>
              <span>
                <strong className="block text-[13px] font-bold tracking-wide">
                  {feature.title}
                </strong>
                <small className="mt-1 block text-[10px] font-medium text-white/30">
                  {feature.text}
                </small>
              </span>
              <span className="ml-auto text-lg text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-300">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="field-lines pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-20" />
    </header>
  );
}
