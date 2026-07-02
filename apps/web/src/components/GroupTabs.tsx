const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

type Props = { selected: string; onChange: (group: string) => void };

export function GroupTabs({ selected, onChange }: Props) {
  return (
    <nav
      aria-label="Escolher grupo"
      className="flex flex-wrap gap-1.5 rounded-2xl border border-white/8 bg-white/[.03] p-1.5 backdrop-blur-xl"
    >
      {groups.map((group) => {
        const active = group === selected;
        return (
          <button
            type="button"
            key={group}
            onClick={() => onChange(group)}
            aria-pressed={active}
            aria-label={`Grupo ${group}`}
            className={`grid size-10 place-items-center rounded-xl text-xs font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${
              active
                ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_0_24px_rgba(99,102,241,.35)]"
                : "text-white/35 hover:bg-white/8 hover:text-white"
            }`}
          >
            {group}
          </button>
        );
      })}
    </nav>
  );
}
