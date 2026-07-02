const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

type Props = { selected: string; onChange: (group: string) => void };

export function GroupTabs({ selected, onChange }: Props) {
  return (
    <nav
      aria-label="Escolher grupo"
      className="flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur"
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
            className={`grid size-9 place-items-center rounded-lg text-xs font-extrabold transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${active ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,.35)]" : "text-white/45 hover:bg-white/10 hover:text-white"}`}
          >
            {group}
          </button>
        );
      })}
    </nav>
  );
}
