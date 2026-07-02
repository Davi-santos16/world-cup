type Props = { onOpenAdmin: () => void };

export function Hero({ onOpenAdmin }: Props) {
  return (
    <header className="hero-pattern relative min-h-screen overflow-hidden text-white">
      <div className="noise absolute inset-0 opacity-20" />
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 px-6 py-5 lg:px-10">
        <a href="#" className="flex items-center gap-3 font-display text-xl font-extrabold uppercase tracking-wide"><span className="grid size-9 place-items-center rounded-full bg-lime-400 text-base text-emerald-950">⚽</span>World Cup <span className="text-lime-400">Center</span></a>
        <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-emerald-100 sm:flex"><span className="size-2 rounded-full bg-lime-400 shadow-[0_0_12px_#a3e635]" />Temporada 2026</div><button onClick={onOpenAdmin} className="rounded-full border border-white/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white/70 transition hover:border-lime-400 hover:text-lime-400">Dashboard</button></div>
      </nav>
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_420px] lg:px-10">
        <div className="animate-rise"><span className="eyebrow">A competição em suas mãos</span><h1 className="mt-5 max-w-3xl font-display text-[clamp(4.5rem,9vw,8rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.04em]">Cada jogo.<br /><span className="text-lime-400">Cada lance.</span></h1><p className="mt-8 max-w-lg text-sm leading-7 text-emerald-100/60 sm:text-base">Resultados, classificação e toda a emoção da maior competição do mundo em uma experiência feita para o torcedor.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#classificacao" className="rounded-full bg-lime-400 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-emerald-950 transition hover:scale-105 hover:bg-lime-300">Explorar campeonato ↓</a><a href="#partidas" className="rounded-full border border-white/15 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-white/10">Ver partidas</a></div></div>
        <div className="animate-float relative hidden aspect-square place-items-center lg:grid" aria-hidden="true"><div className="absolute inset-0 rounded-full border border-white/10" /><div className="absolute inset-10 rounded-full border border-dashed border-lime-400/20" /><div className="ball-glow grid size-56 place-items-center rounded-full border border-white/15 bg-white/10 text-[8.5rem] backdrop-blur">⚽</div><span className="absolute left-0 top-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-lime-400">Resultados ao vivo</span><span className="absolute right-0 top-1/4 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-lime-400">Classificação</span></div>
      </div>
      <div className="absolute -bottom-52 -right-28 size-[600px] rounded-full bg-lime-400/10 blur-[100px]" />
    </header>
  );
}
