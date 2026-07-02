import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { AdminDashboard } from "./components/AdminDashboard";
import { Hero } from "./components/Hero";
import { PublicMatches } from "./components/PublicMatches";
import { StandingsSection } from "./components/StandingsSection";
import type { Match, Standing, Team } from "./types";

export function App() {
  const [group, setGroup] = useState("A");
  const [round, setRound] = useState<number>();
  const [standings, setStandings] = useState<Standing[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<"public" | "admin">(() => window.location.pathname === "/admin" ? "admin" : "public");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [standingData, matchData, teamData] = await Promise.all([api.standings(group), api.matches(round), api.teams()]);
      setStandings(standingData.tabela); setMatches(matchData.matches); setTeams(teamData.teams);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Erro inesperado"); }
    finally { setLoading(false); }
  }, [group, round]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const onPopState = () => setView(window.location.pathname === "/admin" ? "admin" : "public");
    window.addEventListener("popstate", onPopState); return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(next: "public" | "admin") {
    if (next === "admin") setRound(undefined);
    window.history.pushState({}, "", next === "admin" ? "/admin" : "/"); setView(next); window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function saveResult(id: number, home: number, away: number) {
    try { await api.updateResult(id, home, away); await load(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Erro ao salvar resultado"); }
  }
  async function createMatch(data: { homeTeamId: number; awayTeamId: number; round: number; phase: string }) {
    setError("");
    try { await api.createMatch(data); await load(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Erro ao criar partida"); throw reason; }
  }

  if (view === "admin") return <AdminDashboard teams={teams} matches={matches} loading={loading} error={error} onBack={() => navigate("public")} onCreateMatch={createMatch} onSaveResult={saveResult} />;

  return (
    <main className="min-h-screen overflow-hidden bg-[#031712] text-white">
      <Hero onOpenAdmin={() => navigate("admin")} />
      {error && <div role="alert" className="bg-red-900 px-6 py-3 text-center text-sm font-bold text-white">{error}</div>}
      <StandingsSection group={group} standings={standings} loading={loading} onGroupChange={setGroup} />
      <PublicMatches matches={matches} round={round} loading={loading} onRoundChange={setRound} />
    </main>
  );
}
