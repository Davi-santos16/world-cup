import type { Standing } from "../types";
import { GroupTabs } from "./GroupTabs";
import { SectionHeading } from "./SectionHeading";

type Props = { group: string; standings: Standing[]; loading: boolean; onGroupChange: (group: string) => void };
const columns = ["#", "Seleção", "PTS", "J", "V", "E", "D", "GP", "GC", "SG"];

export function StandingsSection({ group, standings, loading, onGroupChange }: Props) {
  return (
    <section id="classificacao" className="relative mx-auto max-w-7xl scroll-mt-6 px-6 py-24 lg:px-10 lg:py-32" aria-labelledby="standings-title">
      {/* Decorative orbs */}
      <div className="glow-orb -left-40 top-20 size-[400px] bg-indigo-600/10" />
      <div className="glow-orb -right-32 bottom-20 size-[300px] bg-violet-500/8" />

      <SectionHeading eyebrow={`Fase de grupos  /  Grupo ${group}`} title="Classificação" action={<GroupTabs selected={group} onChange={onGroupChange} />} light />
      <div data-reveal className="glass-panel overflow-hidden rounded-3xl animate-border-glow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <caption id="standings-title" className="sr-only">Classificação do grupo {group}</caption>
            <thead className="border-b border-white/8 bg-gradient-to-r from-white/[.03] to-transparent">
              <tr>
                {columns.map((column, index) => (
                  <th key={column} className={`px-4 py-5 text-[10px] font-bold uppercase tracking-[.14em] text-white/30 ${index === 1 ? "text-left" : "text-center"}`}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody className={`transition-opacity duration-500 ${loading ? "opacity-30" : "opacity-100"}`}>
              {standings.map((row, index) => (
                <tr key={row.selecao.id} className="group border-b border-white/[.05] transition-all duration-300 hover:bg-white/[.04] last:border-0">
                  <td className="px-4 py-5 text-center">
                    <span className={`inline-grid size-8 place-items-center rounded-full text-xs font-bold transition-all duration-300 ${
                      index < 2
                        ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_0_18px_rgba(99,102,241,.35)]"
                        : "bg-white/8 text-white/35"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-4">
                      <span className="overflow-hidden rounded-lg border border-white/10 shadow-md transition-transform duration-300 group-hover:scale-110">
                        <img src={row.selecao.bandeira} alt={`Bandeira de ${row.selecao.nome}`} className="h-7 w-10 object-cover" />
                      </span>
                      <div>
                        <strong className="block text-sm font-bold text-white">{row.selecao.nome}</strong>
                        <small className="text-[10px] font-bold uppercase tracking-widest text-white/25">{row.selecao.sigla}</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="inline-block font-display text-xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                      {row.pontos}
                    </span>
                  </td>
                  {[row.jogosDisputados, row.vitorias, row.empates, row.derrotas, row.golsPro, row.golsContra, row.saldoGols].map((value, i) => (
                    <td key={i} className="px-4 py-5 text-center text-sm font-semibold tabular-nums text-white/50">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !standings.length && <p className="p-10 text-center text-sm font-medium text-white/35">Nenhuma seleção encontrada neste grupo.</p>}
        </div>
        <div className="flex items-center gap-2.5 border-t border-white/8 bg-gradient-to-r from-indigo-500/5 to-transparent px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-white/30">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-indigo-400" />
          </span>
          Os dois primeiros avançam para as oitavas
        </div>
      </div>
    </section>
  );
}
