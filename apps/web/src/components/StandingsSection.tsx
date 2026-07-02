import type { Standing } from "../types";
import { GroupTabs } from "./GroupTabs";
import { SectionHeading } from "./SectionHeading";

type Props = { group: string; standings: Standing[]; loading: boolean; onGroupChange: (group: string) => void };
const columns = ["#", "Seleção", "PTS", "J", "V", "E", "D", "GP", "GC", "SG"];

export function StandingsSection({ group, standings, loading, onGroupChange }: Props) {
  return (
    <section id="classificacao" className="relative mx-auto max-w-7xl scroll-mt-6 px-6 py-24 lg:px-10 lg:py-32" aria-labelledby="standings-title">
      <SectionHeading eyebrow={`Fase de grupos  /  Grupo ${group}`} title="Classificação" action={<GroupTabs selected={group} onChange={onGroupChange} />} light />
      <div data-reveal className="glass-panel overflow-hidden rounded-3xl">
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse"><caption id="standings-title" className="sr-only">Classificação do grupo {group}</caption>
          <thead className="border-b border-white/10 bg-white/[.035]"><tr>{columns.map((column, index) => <th key={column} className={`px-4 py-4 text-[10px] font-extrabold uppercase tracking-[.14em] text-white/35 ${index === 1 ? "text-left" : "text-center"}`}>{column}</th>)}</tr></thead>
          <tbody className={`transition-opacity ${loading ? "opacity-40" : "opacity-100"}`}>{standings.map((row, index) => <tr key={row.selecao.id} className="border-b border-white/[.07] transition hover:bg-white/[.04] last:border-0">
            <td className="px-4 py-5 text-center"><span className={`inline-grid size-8 place-items-center rounded-full text-xs font-bold ${index < 2 ? "bg-blue-600 text-white shadow-[0_0_16px_rgba(37,99,235,.35)]" : "bg-white/10 text-white/40"}`}>{index + 1}</span></td>
            <td className="px-4 py-5"><div className="flex items-center gap-4"><span className="overflow-hidden rounded-md border border-white/15"><img src={row.selecao.bandeira} alt={`Bandeira de ${row.selecao.nome}`} className="h-7 w-10 object-cover" /></span><div><strong className="block text-sm text-white">{row.selecao.nome}</strong><small className="text-[10px] font-bold uppercase tracking-widest text-white/30">{row.selecao.sigla}</small></div></div></td>
            <td className="px-4 py-5 text-center text-xl font-extrabold text-blue-400">{row.pontos}</td>
            {[row.jogosDisputados, row.vitorias, row.empates, row.derrotas, row.golsPro, row.golsContra, row.saldoGols].map((value, i) => <td key={i} className="px-4 py-5 text-center text-sm font-semibold text-white/65">{value}</td>)}
          </tr>)}</tbody>
        </table>{!loading && !standings.length && <p className="p-10 text-center text-sm text-white/40">Nenhuma seleção encontrada neste grupo.</p>}</div>
        <div className="flex items-center gap-2 border-t border-white/10 bg-white/[.025] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white/35"><span className="size-2 rounded-full bg-blue-500" /> Os dois primeiros avançam</div>
      </div>
    </section>
  );
}
