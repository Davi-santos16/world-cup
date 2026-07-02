type Props = { onOpenAdmin: () => void };

const features = [
  { number: "01", title: "Classificação", text: "Grupos atualizados" },
  { number: "02", title: "Confrontos", text: "Todos os placares" },
  { number: "03", title: "Em tempo real", text: "Dados da competição" },
];

export function Hero({ onOpenAdmin }: Props) {
  return (
    <header className="hero-blue relative min-h-screen overflow-hidden text-white">
      <div className="noise pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-glow pointer-events-none fixed z-30 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity md:opacity-100" />
      <div className="stars pointer-events-none absolute inset-0" />

      <nav className="relative z-40 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-12">
        <a
          href="#"
          className="flex items-center gap-3 font-display text-xl font-extrabold uppercase tracking-wide"
        >
          <span className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-lg shadow-[inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-xl">
            ⚽
          </span>
          WC<span className="text-blue-400">26</span>
        </a>
        <div className="hidden items-center gap-8 text-[10px] font-extrabold uppercase tracking-[.2em] text-white/50 md:flex">
          <a href="#classificacao" className="transition hover:text-white">
            Tabela
          </a>
          <a href="#partidas" className="transition hover:text-white">
            Partidas
          </a>
          <span className="flex items-center gap-2">
            <i className="size-1.5 animate-pulse rounded-full bg-blue-400" />{" "}
            Live data
          </span>
        </div>
        <button
          onClick={onOpenAdmin}
          className="glass-button group rounded-full px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wider"
        >
          Dashboard{" "}
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            ↗
          </span>
        </button>
      </nav>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-[1400px] items-center px-6 pb-40 pt-10 lg:grid-cols-[1fr_.85fr] lg:px-12 lg:pb-48">
        <div className="relative z-20 animate-rise">
          <span className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-[9px] font-extrabold uppercase tracking-[.25em] text-blue-200 backdrop-blur-xl">
            <i className="size-1.5 animate-pulse rounded-full bg-blue-400" />{" "}
            The home of football
          </span>
          <h1 className="max-w-3xl font-display text-[clamp(4.5rem,9vw,9rem)] font-extrabold uppercase leading-[.72] tracking-[-.045em]">
            O mundo
            <br />
            <span className="text-gradient-blue">joga aqui.</span>
          </h1>
          <p className="mt-9 max-w-md text-sm leading-7 text-blue-100/55 sm:text-base">
            Uma nova forma de acompanhar cada rodada, cada seleção e cada
            momento que muda a história do campeonato.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#classificacao"
              className="group rounded-full bg-blue-600 px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-[.16em] shadow-[0_0_35px_rgba(37,99,235,.45)] transition hover:-translate-y-1 hover:bg-blue-500"
            >
              Explorar campeonato{" "}
              <span className="ml-2 inline-block transition group-hover:translate-y-1">
                ↓
              </span>
            </a>
            <a
              href="#partidas"
              className="glass-button rounded-full px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-[.16em]"
            >
              Ver resultados
            </a>
          </div>
        </div>

        <div className="trophy-stage pointer-events-none absolute right-[-18%] top-[5%] h-[75%] w-[82%] sm:right-[-8%] lg:relative lg:right-auto lg:top-auto lg:h-[680px] lg:w-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_42%,rgba(32,82,255,.38),transparent_58%)] blur-xl" />
          <img
            src="/assets/world-cup-hero.svg"
            alt="Arte oficial da competição 2026"
            className="animate-trophy relative z-10 h-full w-full object-contain object-center [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
          />
          <div className="absolute bottom-[12%] left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-full bg-blue-500/25 blur-2xl" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto max-w-[1400px] px-6 pb-7 lg:px-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {features.map((feature, index) => (
            <a
              key={feature.number}
              href={index === 0 ? "#classificacao" : "#partidas"}
              className="feature-glass group flex items-center gap-4 rounded-2xl p-4 transition duration-500 hover:-translate-y-2 hover:border-blue-400/50"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-black/20 font-display text-xl font-extrabold text-blue-300">
                {feature.number}
              </span>
              <span>
                <strong className="block text-xs uppercase tracking-wider">
                  {feature.title}
                </strong>
                <small className="mt-1 block text-[10px] text-white/35">
                  {feature.text}
                </small>
              </span>
              <span className="ml-auto text-white/25 transition group-hover:translate-x-1 group-hover:text-blue-300">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="field-lines pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-30" />
    </header>
  );
}
