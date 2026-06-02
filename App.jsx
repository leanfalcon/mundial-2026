import { useState } from "react";

// ============================================================
// REAL 2026 WORLD CUP DATA
// ============================================================
// FIFA Rankings used at the draw: November 19, 2025
const GROUPS = {
  A: {
    teams: [
      { name: "México", flag: "🇲🇽", rating: 78, fifaRank: 15, confederation: "CONCACAF" },
      { name: "Sudáfrica", flag: "🇿🇦", rating: 65, fifaRank: 61, confederation: "CAF" },
      { name: "Corea del Sur", flag: "🇰🇷", rating: 74, fifaRank: 22, confederation: "AFC" },
      { name: "Chequia", flag: "🇨🇿", rating: 71, fifaRank: 44, confederation: "UEFA" },
    ]
  },
  B: {
    teams: [
      { name: "Canadá", flag: "🇨🇦", rating: 74, fifaRank: 27, confederation: "CONCACAF" },
      { name: "Bosnia y Herz.", flag: "🇧🇦", rating: 70, fifaRank: 63, confederation: "UEFA" },
      { name: "Qatar", flag: "🇶🇦", rating: 64, fifaRank: 53, confederation: "AFC" },
      { name: "Suiza", flag: "🇨🇭", rating: 79, fifaRank: 17, confederation: "UEFA" },
    ]
  },
  C: {
    teams: [
      { name: "Brasil", flag: "🇧🇷", rating: 88, fifaRank: 5, confederation: "CONMEBOL" },
      { name: "Marruecos", flag: "🇲🇦", rating: 79, fifaRank: 11, confederation: "CAF" },
      { name: "Haití", flag: "🇭🇹", rating: 56, fifaRank: 84, confederation: "CONCACAF" },
      { name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", rating: 71, fifaRank: 36, confederation: "UEFA" },
    ]
  },
  D: {
    teams: [
      { name: "Estados Unidos", flag: "🇺🇸", rating: 77, fifaRank: 14, confederation: "CONCACAF" },
      { name: "Paraguay", flag: "🇵🇾", rating: 69, fifaRank: 39, confederation: "CONMEBOL" },
      { name: "Australia", flag: "🇦🇺", rating: 72, fifaRank: 26, confederation: "AFC" },
      { name: "Turquía", flag: "🇹🇷", rating: 74, fifaRank: 25, confederation: "UEFA" },
    ]
  },
  E: {
    teams: [
      { name: "Alemania", flag: "🇩🇪", rating: 86, fifaRank: 9, confederation: "UEFA" },
      { name: "Curazao", flag: "🇨🇼", rating: 58, fifaRank: 82, confederation: "CONCACAF" },
      { name: "Costa de Marfil", flag: "🇨🇮", rating: 73, fifaRank: 42, confederation: "CAF" },
      { name: "Ecuador", flag: "🇪🇨", rating: 71, fifaRank: 23, confederation: "CONMEBOL" },
    ]
  },
  F: {
    teams: [
      { name: "Países Bajos", flag: "🇳🇱", rating: 86, fifaRank: 7, confederation: "UEFA" },
      { name: "Japón", flag: "🇯🇵", rating: 79, fifaRank: 18, confederation: "AFC" },
      { name: "Suecia", flag: "🇸🇪", rating: 73, fifaRank: 43, confederation: "UEFA" },
      { name: "Túnez", flag: "🇹🇳", rating: 68, fifaRank: 41, confederation: "CAF" },
    ]
  },
  G: {
    teams: [
      { name: "Bélgica", flag: "🇧🇪", rating: 83, fifaRank: 8, confederation: "UEFA" },
      { name: "Egipto", flag: "🇪🇬", rating: 69, fifaRank: 35, confederation: "CAF" },
      { name: "Irán", flag: "🇮🇷", rating: 68, fifaRank: 20, confederation: "AFC" },
      { name: "Nueva Zelanda", flag: "🇳🇿", rating: 60, fifaRank: 87, confederation: "OFC" },
    ]
  },
  H: {
    teams: [
      { name: "España", flag: "🇪🇸", rating: 90, fifaRank: 1, confederation: "UEFA" },
      { name: "Cabo Verde", flag: "🇨🇻", rating: 62, fifaRank: 67, confederation: "CAF" },
      { name: "Arabia Saudita", flag: "🇸🇦", rating: 67, fifaRank: 60, confederation: "AFC" },
      { name: "Uruguay", flag: "🇺🇾", rating: 80, fifaRank: 16, confederation: "CONMEBOL" },
    ]
  },
  I: {
    teams: [
      { name: "Francia", flag: "🇫🇷", rating: 91, fifaRank: 3, confederation: "UEFA" },
      { name: "Senegal", flag: "🇸🇳", rating: 77, fifaRank: 19, confederation: "CAF" },
      { name: "Irak", flag: "🇮🇶", rating: 62, fifaRank: 66, confederation: "AFC" },
      { name: "Noruega", flag: "🇳🇴", rating: 75, fifaRank: 29, confederation: "UEFA" },
    ]
  },
  J: {
    teams: [
      { name: "Argentina", flag: "🇦🇷", rating: 92, fifaRank: 2, confederation: "CONMEBOL" },
      { name: "Argelia", flag: "🇩🇿", rating: 70, fifaRank: 34, confederation: "CAF" },
      { name: "Austria", flag: "🇦🇹", rating: 77, fifaRank: 24, confederation: "UEFA" },
      { name: "Jordania", flag: "🇯🇴", rating: 62, fifaRank: 64, confederation: "AFC" },
    ]
  },
  K: {
    teams: [
      { name: "Portugal", flag: "🇵🇹", rating: 87, fifaRank: 6, confederation: "UEFA" },
      { name: "DR Congo", flag: "🇨🇩", rating: 61, fifaRank: 74, confederation: "CAF" },
      { name: "Uzbekistán", flag: "🇺🇿", rating: 65, fifaRank: 50, confederation: "AFC" },
      { name: "Colombia", flag: "🇨🇴", rating: 79, fifaRank: 13, confederation: "CONMEBOL" },
    ]
  },
  L: {
    teams: [
      { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 87, fifaRank: 4, confederation: "UEFA" },
      { name: "Croacia", flag: "🇭🇷", rating: 81, fifaRank: 10, confederation: "UEFA" },
      { name: "Ghana", flag: "🇬🇭", rating: 67, fifaRank: 72, confederation: "CAF" },
      { name: "Panamá", flag: "🇵🇦", rating: 63, fifaRank: 30, confederation: "CONCACAF" },
    ]
  },
};

const ALL_TEAMS = Object.values(GROUPS).flatMap(g => g.teams).filter(t => !t.playoff);

const CONFEDERATION_COLORS = {
  UEFA: "#4a9eff",
  CONMEBOL: "#7ec8e3",
  CONCACAF: "#f4a261",
  CAF: "#2dc653",
  AFC: "#e63946",
  OFC: "#a8dadc",
  varios: "#888",
};

const STAGES = ["Grupos", "Ronda 32", "Octavos", "Cuartos", "Semis", "Final"];

// ============================================================
// REAL BOOKMAKER ODDS — William Hill / Sky Bet / bet365
// Source: footballgroundguide.com — actualizado mayo 2026
// ============================================================
const FAVORITES = [
  { name: "España",        flag: "🇪🇸", fifaRank: 1,  group: "H",
    wmHill: "9/2",  skyBet: "4/1",  bet365: "9/2",  pct: 18.8,
    squadNote: "✅ Yamal, Rodri, Pedri, Nico Williams confirmados",
    squadAlert: "⚠️ Yamal con molestia en isquiotibial", trend: "up" },
  { name: "Francia",       flag: "🇫🇷", fifaRank: 3,  group: "I",
    wmHill: "5/1",  skyBet: "9/2",  bet365: "5/1",  pct: 17.2,
    squadNote: "✅ Mbappé, Dembélé, Kanté, Olise, Cherki listos",
    squadAlert: "❌ Ekitiké baja (tendón de Aquiles)", trend: "up" },
  { name: "Inglaterra",    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", fifaRank: 4,  group: "L",
    wmHill: "11/2", skyBet: "13/2", bet365: "6/1",  pct: 14.3,
    squadNote: "✅ Bellingham, Saka, Kane sin bajas relevantes",
    squadAlert: null, trend: "stable" },
  { name: "Brasil",        flag: "🇧🇷", fifaRank: 5,  group: "C",
    wmHill: "8/1",  skyBet: "8/1",  bet365: "8/1",  pct: 11.1,
    squadNote: "✅ Vinicius Jr., Endrick, Raphinha convocados",
    squadAlert: "⚠️ Rodrygo con dudas físicas", trend: "down" },
  { name: "Argentina",     flag: "🇦🇷", fifaRank: 2,  group: "J",
    wmHill: "8/1",  skyBet: "17/2", bet365: "8/1",  pct: 10.9,
    squadNote: "✅ Messi y Di María convocados",
    squadAlert: "⚠️ Dibu (fractura), Romero (ligamento), Messi (muscular)", trend: "down" },
  { name: "Portugal",      flag: "🇵🇹", fifaRank: 6,  group: "K",
    wmHill: "10/1", skyBet: "11/1", bet365: "11/1", pct: 8.6,
    squadNote: "✅ Ronaldo, Bruno Fernandes, Leão confirmados",
    squadAlert: null, trend: "stable" },
  { name: "Alemania",      flag: "🇩🇪", fifaRank: 9,  group: "E",
    wmHill: "12/1", skyBet: "11/1", bet365: "12/1", pct: 7.9,
    squadNote: "✅ Kimmich, Wirtz, Havertz disponibles",
    squadAlert: null, trend: "stable" },
  { name: "Países Bajos",  flag: "🇳🇱", fifaRank: 7,  group: "F",
    wmHill: "20/1", skyBet: "18/1", bet365: "20/1", pct: 4.9,
    squadNote: "✅ Van Dijk, Gakpo, Dumfries confirmados",
    squadAlert: null, trend: "stable" },
  { name: "Marruecos",     flag: "🇲🇦", fifaRank: 11, group: "C",
    wmHill: "66/1", skyBet: "40/1", bet365: "50/1", pct: 2.0,
    squadNote: "✅ Ziyech, En-Nesyri, Ounahi convocados",
    squadAlert: null, trend: "stable" },
  { name: "Estados Unidos", flag: "🇺🇸", fifaRank: 14, group: "D",
    wmHill: "50/1", skyBet: "50/1", bet365: "66/1", pct: 1.8,
    squadNote: "✅ Pulisic, Reyna, McKennie — sede anfitriona",
    squadAlert: null, trend: "stable" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("grupos");
  const [team1, setTeam1] = useState(ALL_TEAMS.find(t => t.name === "Argentina"));
  const [team2, setTeam2] = useState(ALL_TEAMS.find(t => t.name === "Francia"));
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("J");
  const [tournamentPrediction, setTournamentPrediction] = useState(null);
  const [tournamentLoading, setTournamentLoading] = useState(false);
  const [selectedTeamForPath, setSelectedTeamForPath] = useState(ALL_TEAMS.find(t => t.name === "Argentina"));
  const [pathPrediction, setPathPrediction] = useState(null);
  const [pathLoading, setPathLoading] = useState(false);
  const [groupSims, setGroupSims] = useState({}); // { A: {...}, B: {...}, ... }
  const [groupSimLoading, setGroupSimLoading] = useState({}); // { A: true/false, ... }
  const [simAllLoading, setSimAllLoading] = useState(false);
  const [simAllProgress, setSimAllProgress] = useState(0);

  // ---- MATCH PREDICTOR ----
  const predictMatch = async () => {
    if (!team1 || !team2 || team1.name === team2.name) return;
    setLoading(true); setPrediction(null);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Eres el mejor analista de fútbol del mundo especializado en el Mundial 2026. Responde SOLO con JSON puro sin markdown:
{
  "ganador": "nombre del equipo ganador o 'Empate'",
  "resultado": "X-X",
  "prob_equipo1": 45,
  "prob_empate": 20,
  "prob_equipo2": 35,
  "fase_probable": "Grupos / Ronda de 32 / Octavos / Cuartos / Semis / Final",
  "factor_clave": "El factor determinante en 1 frase",
  "analisis": "Análisis en 3 frases: táctica, historial, contexto Mundial 2026",
  "jugador_decisivo": "Nombre del jugador estrella",
  "momento_clave": "Descripción del momento decisivo del partido en 1 frase"
}`,
          messages: [{ role: "user", content: `Mundial 2026 — Partido: ${team1.name} (${team1.confederation}, rating ${team1.rating}) vs ${team2.name} (${team2.confederation}, rating ${team2.rating}). Considera el contexto del Mundial 2026, sus grupos reales, estilos de juego y momento actual de ambas selecciones.` }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setPrediction(parsed);
    } catch { setPrediction({ error: true }); }
    setLoading(false);
  };

  // ---- TOURNAMENT WINNER ----
  const predictTournament = async () => {
    setTournamentLoading(true); setTournamentPrediction(null);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1200,
          system: `Eres el mejor pronosticador del Mundial 2026. El torneo es en USA/Canadá/México, del 11 jun al 19 jul 2026. Responde SOLO con JSON puro:
{
  "campeon": "nombre",
  "campeon_flag": "emoji",
  "subcampeon": "nombre",
  "subcampeon_flag": "emoji",
  "tercer_puesto": "nombre",
  "final_resultado": "X-X",
  "semifinales": [
    {"equipo1": "...", "equipo2": "...", "ganador": "..."},
    {"equipo1": "...", "equipo2": "...", "ganador": "..."}
  ],
  "sorpresa_del_torneo": "nombre del equipo sorpresa",
  "goleador": "nombre del máximo goleador",
  "analisis": "Por qué este campeón en 3 frases considerando el contexto del Mundial 2026"
}`,
          messages: [{ role: "user", content: "Predice el campeón del Mundial 2026 considerando los grupos reales: Argentina (Grupo J), Francia (Grupo I), España (Grupo H), Brasil (Grupo C), Alemania (Grupo E), Inglaterra (Grupo L), Portugal (Grupo K), Países Bajos (Grupo F), Bélgica (Grupo G), Uruguay (Grupo H), Colombia (Grupo K). Sede: USA/Canadá/México." }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      setTournamentPrediction(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setTournamentPrediction({ error: true }); }
    setTournamentLoading(false);
  };

  // ---- PATH PREDICTOR ----
  const predictPath = async () => {
    if (!selectedTeamForPath) return;
    setPathLoading(true); setPathPrediction(null);
    const team = selectedTeamForPath;
    const groupLetter = Object.entries(GROUPS).find(([, g]) => g.teams.some(t => t.name === team.name))?.[0];
    const groupTeams = groupLetter ? GROUPS[groupLetter].teams.map(t => t.name).join(", ") : "grupo desconocido";
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1200,
          system: `Eres el mejor analista del Mundial 2026. Responde SOLO con JSON puro:
{
  "clasifican_grupo": true,
  "rival_grupos": ["rival1", "rival2", "rival3"],
  "resultados_grupo": ["X-X vs rival1", "X-X vs rival2", "X-X vs rival3"],
  "ronda_32": {"rival": "...", "resultado": "X-X", "avanza": true},
  "octavos": {"rival": "...", "resultado": "X-X", "avanza": true},
  "cuartos": {"rival": "...", "resultado": "X-X", "avanza": true},
  "semifinal": {"rival": "...", "resultado": "X-X", "avanza": true},
  "final": {"rival": "...", "resultado": "X-X", "campeon": true},
  "fase_maxima": "hasta qué fase llega si no gana",
  "estrella": "jugador clave en este torneo",
  "analisis": "Resumen del camino de este equipo en el Mundial 2026 en 3 frases"
}`,
          messages: [{ role: "user", content: `Predice el camino completo de ${team.name} (${team.flag}, rating ${team.rating}, ${team.confederation}) en el Mundial 2026. Está en el Grupo ${groupLetter} junto a: ${groupTeams}. Simula partido a partido hasta el final o su eliminación.` }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      setPathPrediction(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setPathPrediction({ error: true }); }
    setPathLoading(false);
  };

  // ---- SIMULATE ONE GROUP ----
  const simulateGroup = async (letter) => {
    const g = GROUPS[letter];
    setGroupSimLoading(prev => ({ ...prev, [letter]: true }));
    const teams = g.teams;
    const matchups = [];
    for (let i = 0; i < teams.length; i++)
      for (let j = i + 1; j < teams.length; j++)
        matchups.push([teams[i], teams[j]]);

    const prompt = matchups.map(([a, b]) =>
      `${a.name} (rating ${a.rating}, FIFA #${a.fifaRank ?? "?"}) vs ${b.name} (rating ${b.rating}, FIFA #${b.fifaRank ?? "?"})`
    ).join("\n");

    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1200,
          system: `Eres el mejor analista del Mundial 2026. Se te dan los 6 partidos de un grupo. Para cada partido predice el resultado considerando ratings FIFA, historial, estilos de juego y contexto del Mundial 2026. Responde SOLO con JSON puro sin markdown con este formato exacto:
{
  "partidos": [
    { "local": "Nombre equipo A", "visitante": "Nombre equipo B", "goles_local": 2, "goles_visitante": 1, "destaque": "jugador o momento clave en 5 palabras" },
    ...
  ]
}
Devuelve EXACTAMENTE ${matchups.length} partidos en el mismo orden que se te dan.`,
          messages: [{ role: "user", content: `Grupo ${letter} del Mundial 2026. Predice los 6 partidos:\n${prompt}` }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

      // Build standings from match results
      const standings = {};
      teams.forEach(t => { standings[t.name] = { name: t.name, flag: t.flag, pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, gd: 0 }; });

      parsed.partidos.forEach(p => {
        const a = standings[p.local], b = standings[p.visitante];
        if (!a || !b) return;
        a.pj++; b.pj++;
        a.gf += p.goles_local; a.gc += p.goles_visitante;
        b.gf += p.goles_visitante; b.gc += p.goles_local;
        a.gd = a.gf - a.gc; b.gd = b.gf - b.gc;
        if (p.goles_local > p.goles_visitante) { a.pts += 3; a.pg++; b.pp++; }
        else if (p.goles_local < p.goles_visitante) { b.pts += 3; b.pg++; a.pp++; }
        else { a.pts += 1; b.pts += 1; a.pe++; b.pe++; }
      });

      const table = Object.values(standings).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
      setGroupSims(prev => ({ ...prev, [letter]: { partidos: parsed.partidos, table, matchups } }));
    } catch (e) {
      setGroupSims(prev => ({ ...prev, [letter]: { error: true } }));
    }
    setGroupSimLoading(prev => ({ ...prev, [letter]: false }));
  };

  // ---- SIMULATE ALL GROUPS ----
  const simulateAllGroups = async () => {
    setSimAllLoading(true);
    setSimAllProgress(0);
    const letters = Object.keys(GROUPS);
    for (let i = 0; i < letters.length; i++) {
      await simulateGroup(letters[i]);
      setSimAllProgress(i + 1);
    }
    setSimAllLoading(false);
  };

  const tabs = [
    { id: "grupos", label: "🗂️ Grupos" },
    { id: "fasegrp", label: "🔮 Fase de Grupos" },
    { id: "predictor", label: "⚽ Partido" },
    { id: "camino", label: "🗺️ Camino" },
    { id: "campeon", label: "🏆 Campeón" },
    { id: "favoritos", label: "📊 Cuotas" },
  ];

  const confColor = (c) => CONFEDERATION_COLORS[c] || "#888";
  const winnerFlag = prediction?.ganador && prediction.ganador !== "Empate"
    ? (prediction.ganador === team1?.name ? team1.flag : team2?.flag) : "🤝";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #010d1a 0%, #021525 45%, #01101f 100%)",
      fontFamily: "'Georgia', serif",
      color: "#ddd6c8",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100%{ box-shadow:0 0 20px rgba(255,210,0,0.15); } 50%{ box-shadow:0 0 40px rgba(255,210,0,0.35); } }
        @keyframes scoreIn { 0%{transform:scale(0.6);opacity:0;} 70%{transform:scale(1.1);} 100%{transform:scale(1);opacity:1;} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .tab { background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; padding:10px 14px; color:rgba(221,214,200,0.4); transition:all .25s; white-space:nowrap; }
        .tab.on { color:#ffd200; border-bottom:2px solid #ffd200; }
        .tab:hover { color:rgba(255,210,0,0.75); }
        .sel { background:rgba(255,255,255,0.04); border:1px solid rgba(255,210,0,0.18); border-radius:8px; color:#ddd6c8; font-family:'Playfair Display',serif; font-size:14px; padding:11px 36px 11px 14px; width:100%; cursor:pointer; appearance:none; transition:all .25s; }
        .sel:hover,.sel:focus { border-color:rgba(255,210,0,0.45); background:rgba(255,210,0,0.04); outline:none; }
        .sel option { background:#021525; }
        .btn-gold { background:linear-gradient(135deg,#b8920a,#ffd200,#b8920a); border:none; border-radius:4px; color:#010d1a; cursor:pointer; font-family:'Playfair Display',serif; font-size:15px; font-weight:700; letter-spacing:2.5px; padding:14px 0; text-transform:uppercase; width:100%; transition:all .3s; }
        .btn-gold:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 28px rgba(255,210,0,0.35); }
        .btn-gold:disabled { opacity:.55; cursor:not-allowed; }
        .card { background:rgba(255,255,255,0.025); border:1px solid rgba(255,210,0,0.1); border-radius:10px; padding:18px 20px; margin-bottom:10px; transition:all .25s; }
        .card:hover { background:rgba(255,210,0,0.04); border-color:rgba(255,210,0,0.22); }
        .group-tab { background:none; border:1px solid rgba(255,210,0,0.15); border-radius:6px; color:rgba(221,214,200,0.55); cursor:pointer; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:1px; padding:5px 10px; transition:all .2s; }
        .group-tab.on { background:rgba(255,210,0,0.12); border-color:rgba(255,210,0,0.4); color:#ffd200; }
        .group-tab:hover { border-color:rgba(255,210,0,0.3); color:rgba(255,210,0,0.7); }
        .path-step { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:8px; margin-bottom:8px; animation:fadeUp .4s ease-out both; }
        .spinner { display:inline-block; width:16px; height:16px; border:2px solid rgba(1,13,26,0.3); border-top-color:#010d1a; border-radius:50%; animation:spin .7s linear infinite; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign:"center", padding:"40px 20px 0", position:"relative" }}>
        <div style={{ fontSize:"52px", animation:"float 4s ease-in-out infinite", display:"inline-block", filter:"drop-shadow(0 0 24px rgba(255,210,0,0.4))" }}>🏆</div>
        <h1 style={{
          fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,5.5vw,40px)",
          fontWeight:900, letterSpacing:"0.04em",
          background:"linear-gradient(130deg,#9a7a08,#ffd200,#fffacd,#ffd200,#9a7a08)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", margin:"10px 0 4px",
        }}>MUNDIAL 2026</h1>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", letterSpacing:"4px", color:"rgba(221,214,200,0.35)", textTransform:"uppercase" }}>
          USA · Canadá · México &nbsp;|&nbsp; 11 Jun – 19 Jul
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", margin:"16px auto 0", maxWidth:"260px" }}>
          <div style={{ flex:1, height:"1px", background:"linear-gradient(to right,transparent,rgba(255,210,0,0.35))" }}/>
          <span style={{ color:"rgba(255,210,0,0.4)", fontSize:"13px" }}>✦</span>
          <div style={{ flex:1, height:"1px", background:"linear-gradient(to left,transparent,rgba(255,210,0,0.35))" }}/>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth:720, margin:"20px auto 0", padding:"0 16px" }}>
        <div style={{ display:"flex", borderBottom:"1px solid rgba(255,210,0,0.1)", overflowX:"auto", gap:"4px" }}>
          {tabs.map(t => (
            <button key={t.id} className={`tab ${activeTab===t.id?"on":""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:720, margin:"0 auto", padding:"28px 16px 60px" }}>

        {/* ===== GRUPOS ===== */}
        {activeTab==="grupos" && (
          <div style={{ animation:"fadeUp .5s ease-out" }}>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"20px" }}>
              {Object.keys(GROUPS).map(g => (
                <button key={g} className={`group-tab ${selectedGroup===g?"on":""}`} onClick={() => setSelectedGroup(g)}>
                  Grupo {g}
                </button>
              ))}
            </div>

            {/* Selected group */}
            <div className="card" style={{ marginBottom:20, animation:"glow 3s ease-in-out infinite", border:"1px solid rgba(255,210,0,0.2)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"4px" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px", fontWeight:700, color:"#ffd200" }}>
                  Grupo {selectedGroup}
                </div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"2px", color:"rgba(255,210,0,0.3)", textTransform:"uppercase" }}>
                  Ranking FIFA · 19 Nov 2025
                </div>
              </div>
              {/* Header row */}
              <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"6px 0 8px", borderBottom:"1px solid rgba(255,210,0,0.12)", marginBottom:"4px" }}>
                <span style={{ width:"16px" }}/>
                <span style={{ width:"26px" }}/>
                <div style={{ flex:1, fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"2px", color:"rgba(221,214,200,0.25)", textTransform:"uppercase" }}>Selección</div>
                <div style={{ width:"52px", textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"1px", color:"rgba(221,214,200,0.25)", textTransform:"uppercase" }}>FIFA #</div>
                <div style={{ width:"48px", textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"1px", color:"rgba(221,214,200,0.25)", textTransform:"uppercase" }}>Rating</div>
              </div>
              {GROUPS[selectedGroup].teams.map((team, i) => (
                <div key={team.name} style={{
                  display:"flex", alignItems:"center", gap:"12px",
                  padding:"10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"rgba(255,210,0,0.4)", width:"16px", textAlign:"center" }}>{i+1}</span>
                  <span style={{ fontSize:"26px", width:"26px", textAlign:"center" }}>{team.flag}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", color: team.playoff ? "rgba(221,214,200,0.4)" : "#ddd6c8" }}>
                      {team.name}
                    </div>
                    <span style={{
                      fontSize:"9px", letterSpacing:"1px", fontFamily:"'DM Sans',sans-serif",
                      color: confColor(team.confederation),
                      border:`1px solid ${confColor(team.confederation)}44`,
                      borderRadius:"3px", padding:"1px 5px",
                      background:`${confColor(team.confederation)}11`,
                      marginTop:"3px", display:"inline-block",
                    }}>{team.confederation}</span>
                  </div>
                  {/* FIFA Rank circle */}
                  <div style={{ width:"52px", textAlign:"center" }}>
                    {!team.playoff && team.fifaRank ? (
                      <div style={{
                        display:"inline-flex", alignItems:"center", justifyContent:"center",
                        width:"38px", height:"38px", borderRadius:"50%",
                        background: team.fifaRank <= 5 ? "rgba(255,210,0,0.15)" : team.fifaRank <= 15 ? "rgba(255,210,0,0.06)" : "rgba(255,255,255,0.03)",
                        border: team.fifaRank <= 5 ? "1px solid rgba(255,210,0,0.45)" : team.fifaRank <= 15 ? "1px solid rgba(255,210,0,0.2)" : "1px solid rgba(255,255,255,0.07)",
                      }}>
                        <span style={{
                          fontFamily:"'Playfair Display',serif",
                          fontSize: team.fifaRank >= 100 ? "12px" : "16px",
                          fontWeight:700,
                          color: team.fifaRank <= 5 ? "#ffd200" : team.fifaRank <= 20 ? "rgba(255,210,0,0.65)" : "rgba(221,214,200,0.45)",
                        }}>{team.fifaRank}</span>
                      </div>
                    ) : (
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(221,214,200,0.18)" }}>—</span>
                    )}
                  </div>
                  {/* Rating */}
                  <div style={{ width:"48px", textAlign:"center" }}>
                    {!team.playoff && (
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"15px", fontWeight:600, color:"rgba(221,214,200,0.38)" }}>{team.rating}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* All groups mini grid */}
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"12px" }}>
              Todos los grupos
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(168px,1fr))", gap:"8px" }}>
              {Object.entries(GROUPS).map(([letter, g]) => (
                <div key={letter} className="card" style={{ cursor:"pointer", padding:"12px 14px" }}
                  onClick={() => setSelectedGroup(letter)}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"13px", color:"#ffd200", marginBottom:"8px", fontWeight:700 }}>Grupo {letter}</div>
                  {g.teams.map(t => (
                    <div key={t.name} style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"5px" }}>
                      <span style={{ fontSize:"14px" }}>{t.flag}</span>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color: t.playoff ? "rgba(221,214,200,0.3)" : "rgba(221,214,200,0.75)", flex:1 }}>
                        {t.name.length > 13 ? t.name.slice(0,12)+"…" : t.name}
                      </span>
                      {!t.playoff && t.fifaRank && (
                        <span style={{
                          fontFamily:"'DM Sans',sans-serif", fontSize:"10px", fontWeight:600,
                          color: t.fifaRank <= 10 ? "#ffd200" : "rgba(221,214,200,0.32)",
                          minWidth:"22px", textAlign:"right",
                        }}>#{t.fifaRank}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== FASE DE GRUPOS ===== */}
        {activeTab==="fasegrp" && (
          <div style={{ animation:"fadeUp .5s ease-out" }}>
            {/* Header + Simulate All button */}
            <div style={{ marginBottom:"20px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"12px" }}>
                Simula los 72 partidos de la fase de grupos
              </div>
              <button className="btn-gold" onClick={simulateAllGroups}
                disabled={simAllLoading}>
                {simAllLoading ? (
                  <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                    <span className="spinner"/>
                    Simulando grupo {String.fromCharCode(64 + simAllProgress + 1)} de 12... ({simAllProgress}/12)
                  </span>
                ) : Object.keys(groupSims).length === 12
                  ? "🔄 Re-simular todos los grupos"
                  : "🔮 Simular todos los grupos (72 partidos)"}
              </button>
              {simAllLoading && (
                <div style={{ marginTop:"8px", background:"rgba(255,255,255,0.04)", borderRadius:"4px", height:"6px", overflow:"hidden" }}>
                  <div style={{ height:"100%", background:"linear-gradient(90deg,#b8920a,#ffd200)", borderRadius:"4px", width:`${(simAllProgress/12)*100}%`, transition:"width .4s ease-out" }}/>
                </div>
              )}
            </div>

            {/* Group tabs */}
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"20px" }}>
              {Object.keys(GROUPS).map(g => (
                <button key={g} className={`group-tab ${selectedGroup===g?"on":""}`}
                  onClick={() => setSelectedGroup(g)}
                  style={{ position:"relative" }}>
                  Grupo {g}
                  {groupSims[g] && !groupSims[g].error && (
                    <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"8px", height:"8px", borderRadius:"50%", background:"#4ade80" }}/>
                  )}
                  {groupSimLoading[g] && (
                    <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"8px", height:"8px", borderRadius:"50%", background:"#ffd200", animation:"spin .7s linear infinite", display:"inline-block" }}/>
                  )}
                </button>
              ))}
            </div>

            {/* Simulate single group */}
            {!groupSims[selectedGroup] && !groupSimLoading[selectedGroup] && (
              <button className="btn-gold" style={{ marginBottom:"16px" }}
                onClick={() => simulateGroup(selectedGroup)}>
                {`⚽ Simular Grupo ${selectedGroup}`}
              </button>
            )}
            {groupSimLoading[selectedGroup] && (
              <div style={{ textAlign:"center", padding:"32px", color:"rgba(255,210,0,0.5)", fontFamily:"'DM Sans',sans-serif", fontSize:"13px" }}>
                <span className="spinner" style={{ display:"inline-block", borderColor:"rgba(255,210,0,0.2)", borderTopColor:"#ffd200", width:"24px", height:"24px", marginBottom:"10px" }}/><br/>
                Analizando los 6 partidos del Grupo {selectedGroup}...
              </div>
            )}

            {groupSims[selectedGroup] && !groupSims[selectedGroup].error && (() => {
              const sim = groupSims[selectedGroup];
              const grpTeams = GROUPS[selectedGroup].teams;
              return (
                <div style={{ animation:"fadeUp .4s ease-out" }}>
                  {/* Standings table */}
                  <div className="card" style={{ marginBottom:"16px", padding:"16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"12px" }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"18px", fontWeight:700, color:"#ffd200" }}>
                        Grupo {selectedGroup} — Tabla Final
                      </div>
                      <button style={{ background:"none", border:"1px solid rgba(255,210,0,0.2)", borderRadius:"4px", color:"rgba(255,210,0,0.5)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"1px", padding:"4px 8px" }}
                        onClick={() => simulateGroup(selectedGroup)}>
                        🔄 Re-simular
                      </button>
                    </div>

                    {/* Table header */}
                    <div style={{ display:"grid", gridTemplateColumns:"24px 1fr 28px 28px 28px 28px 32px 32px 36px", gap:"4px", padding:"0 4px 8px", borderBottom:"1px solid rgba(255,210,0,0.12)", marginBottom:"4px" }}>
                      {["#","Equipo","PJ","PG","PE","PP","GF","GD","PTS"].map((h,i) => (
                        <div key={h} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"1px", color:"rgba(221,214,200,0.3)", textTransform:"uppercase", textAlign: i > 1 ? "center" : "left" }}>{h}</div>
                      ))}
                    </div>

                    {sim.table.map((row, idx) => {
                      const teamData = grpTeams.find(t => t.name === row.name);
                      const qualify = idx < 2;
                      const maybe = idx === 2;
                      return (
                        <div key={row.name} style={{
                          display:"grid", gridTemplateColumns:"24px 1fr 28px 28px 28px 28px 32px 32px 36px",
                          gap:"4px", padding:"8px 4px",
                          borderBottom: idx < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          background: qualify ? "rgba(74,222,128,0.04)" : maybe ? "rgba(255,210,0,0.03)" : "transparent",
                          borderRadius:"4px",
                        }}>
                          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color: qualify ? "#4ade80" : maybe ? "#ffd200" : "rgba(221,214,200,0.3)", fontWeight:600 }}>{idx+1}</div>
                          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                            <span style={{ fontSize:"16px" }}>{teamData?.flag || "🏳️"}</span>
                            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"rgba(221,214,200,0.85)" }}>{row.name.length > 12 ? row.name.slice(0,11)+"…" : row.name}</span>
                          </div>
                          {[row.pj, row.pg, row.pe, row.pp, row.gf, row.gd >= 0 ? `+${row.gd}` : row.gd].map((v, vi) => (
                            <div key={vi} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"rgba(221,214,200,0.6)", textAlign:"center" }}>{v}</div>
                          ))}
                          <div style={{
                            fontFamily:"'Playfair Display',serif", fontSize:"15px", fontWeight:700,
                            color: qualify ? "#4ade80" : maybe ? "#ffd200" : "rgba(221,214,200,0.5)",
                            textAlign:"center",
                          }}>{row.pts}</div>
                        </div>
                      );
                    })}

                    <div style={{ display:"flex", gap:"16px", marginTop:"10px", paddingTop:"10px", borderTop:"1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                        <div style={{ width:"8px", height:"8px", borderRadius:"2px", background:"rgba(74,222,128,0.4)" }}/>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(221,214,200,0.35)" }}>Clasifican directos</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                        <div style={{ width:"8px", height:"8px", borderRadius:"2px", background:"rgba(255,210,0,0.2)" }}/>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(221,214,200,0.35)" }}>Posible mejor 3º</span>
                      </div>
                    </div>
                  </div>

                  {/* Match results */}
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"10px" }}>
                    Resultados — 6 partidos
                  </div>
                  {sim.partidos.map((p, i) => {
                    const localData = grpTeams.find(t => t.name === p.local);
                    const visitData = grpTeams.find(t => t.name === p.visitante);
                    const localWin = p.goles_local > p.goles_visitante;
                    const visitWin = p.goles_visitante > p.goles_local;
                    const draw = p.goles_local === p.goles_visitante;
                    return (
                      <div key={i} className="card" style={{ padding:"12px 14px", marginBottom:"8px" }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:"8px", alignItems:"center" }}>
                          {/* Local */}
                          <div style={{ display:"flex", alignItems:"center", gap:"6px", justifyContent:"flex-end" }}>
                            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color: localWin ? "#ffd200" : "rgba(221,214,200,0.55)", fontWeight: localWin ? 600 : 400, textAlign:"right" }}>
                              {p.local}
                            </span>
                            <span style={{ fontSize:"18px" }}>{localData?.flag || "🏳️"}</span>
                          </div>
                          {/* Score */}
                          <div style={{
                            fontFamily:"'Playfair Display',serif", fontSize:"20px", fontWeight:700,
                            color: draw ? "rgba(255,210,0,0.7)" : "#fff",
                            background:"rgba(255,255,255,0.05)", borderRadius:"6px",
                            padding:"4px 12px", textAlign:"center", minWidth:"64px",
                          }}>
                            {p.goles_local} – {p.goles_visitante}
                          </div>
                          {/* Visitante */}
                          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                            <span style={{ fontSize:"18px" }}>{visitData?.flag || "🏳️"}</span>
                            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color: visitWin ? "#ffd200" : "rgba(221,214,200,0.55)", fontWeight: visitWin ? 600 : 400 }}>
                              {p.visitante}
                            </span>
                          </div>
                        </div>
                        {p.destaque && (
                          <div style={{ textAlign:"center", marginTop:"6px", fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(255,210,0,0.4)", fontStyle:"italic" }}>
                            ⚽ {p.destaque}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {groupSims[selectedGroup]?.error && (
              <div style={{ background:"rgba(255,60,60,0.07)", border:"1px solid rgba(255,60,60,0.2)", borderRadius:"8px", padding:"16px", textAlign:"center", color:"rgba(255,150,150,0.8)", fontFamily:"'DM Sans',sans-serif", fontSize:"13px" }}>
                Error simulando el grupo. <button style={{ background:"none", border:"none", color:"#ffd200", cursor:"pointer", textDecoration:"underline" }} onClick={() => simulateGroup(selectedGroup)}>Intentar de nuevo</button>
              </div>
            )}
          </div>
        )}

        {/* ===== PREDICTOR ===== */}
        {activeTab==="predictor" && (
          <div style={{ animation:"fadeUp .5s ease-out" }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"16px" }}>
              Predice cualquier partido del Mundial 2026
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 36px 1fr", gap:"12px", alignItems:"center", marginBottom:"20px" }}>
              {[team1, team2].map((team, idx) => (
                <div key={idx}>
                  <div style={{ fontSize:"32px", textAlign:"center", marginBottom:"6px" }}>{team?.flag}</div>
                  <div style={{ position:"relative" }}>
                    <select className="sel" value={team?.name}
                      onChange={e => {
                        const t = ALL_TEAMS.find(x => x.name === e.target.value);
                        idx === 0 ? setTeam1(t) : setTeam2(t);
                        setPrediction(null);
                      }}>
                      {Object.entries(GROUPS).map(([letter, g]) => (
                        <optgroup key={letter} label={`Grupo ${letter}`}>
                          {g.teams.filter(t => !t.playoff).map(t => (
                            <option key={t.name} value={t.name}>{t.flag} {t.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <span style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,210,0,0.4)", fontSize:"11px", pointerEvents:"none" }}>▼</span>
                  </div>
                  <div style={{ textAlign:"center", marginTop:"6px", fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(255,210,0,0.35)", display:"flex", justifyContent:"center", gap:"10px" }}>
                    <span>FIFA <span style={{ color:"#ffd200", fontWeight:600 }}>#{team?.fifaRank}</span></span>
                    <span style={{ color:"rgba(221,214,200,0.2)" }}>·</span>
                    <span>Rating <span style={{ color:"rgba(221,214,200,0.5)" }}>{team?.rating}</span></span>
                  </div>
                </div>
              ))}
              <div style={{ textAlign:"center", fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"rgba(255,210,0,0.3)", fontWeight:700 }}>VS</div>
            </div>

            <button className="btn-gold" onClick={predictMatch}
              disabled={loading || !team1 || !team2 || team1?.name === team2?.name}>
              {loading ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                <span className="spinner" />Analizando partido...
              </span> : "⚽ Predecir Partido"}
            </button>
            {team1?.name === team2?.name && <p style={{ textAlign:"center", marginTop:"6px", fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"rgba(255,80,80,0.65)" }}>Selecciona dos equipos diferentes</p>}

            {prediction && !prediction.error && (
              <div style={{ marginTop:"24px", background:"rgba(255,210,0,0.025)", border:"1px solid rgba(255,210,0,0.18)", borderRadius:"12px", padding:"24px", animation:"fadeUp .5s ease-out", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"160px", height:"1px", background:"linear-gradient(to right,transparent,rgba(255,210,0,0.5),transparent)" }}/>

                {/* Winner */}
                <div style={{ textAlign:"center", marginBottom:"20px" }}>
                  <div style={{ fontSize:"11px", letterSpacing:"3px", color:"rgba(255,210,0,0.4)", fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase", marginBottom:"6px" }}>Resultado Predicho</div>
                  <div style={{ fontSize:"36px", marginBottom:"4px" }}>{winnerFlag}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"24px", fontWeight:900, color:"#ffd200" }}>
                    {prediction.ganador}
                  </div>
                  <div style={{ display:"inline-block", marginTop:"8px", background:"rgba(255,210,0,0.08)", border:"1px solid rgba(255,210,0,0.25)", borderRadius:"4px", padding:"5px 18px", fontFamily:"'Playfair Display',serif", fontSize:"22px", fontWeight:700, color:"#fff", animation:"scoreIn .5s ease-out .2s both" }}>
                    {prediction.resultado}
                  </div>
                  {prediction.fase_probable && (
                    <div style={{ marginTop:"8px", fontFamily:"'DM Sans',sans-serif", fontSize:"11px", color:"rgba(255,210,0,0.5)", letterSpacing:"1px" }}>
                      📍 Posible fase: {prediction.fase_probable}
                    </div>
                  )}
                </div>

                {/* Probabilities */}
                <div style={{ marginBottom:"18px" }}>
                  {[
                    { label: team1?.name, flag: team1?.flag, val: prediction.prob_equipo1, color:"#4a9eff" },
                    { label: "Empate", flag: "🤝", val: prediction.prob_empate, color:"rgba(255,210,0,0.65)" },
                    { label: team2?.name, flag: team2?.flag, val: prediction.prob_equipo2, color:"#ff6b6b" },
                  ].map(({ label, flag, val, color }) => (
                    <div key={label} style={{ marginBottom:"8px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"rgba(221,214,200,0.7)", marginBottom:"3px" }}>
                        <span>{flag} {label}</span><span style={{ color, fontWeight:600 }}>{val}%</span>
                      </div>
                      <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:"3px", height:"5px", overflow:"hidden" }}>
                        <div style={{ height:"100%", borderRadius:"3px", background:color, width:`${val}%`, transition:"width 1.2s ease-out" }}/>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Factor */}
                <div style={{ background:"rgba(255,210,0,0.05)", border:"1px solid rgba(255,210,0,0.12)", borderRadius:"6px", padding:"10px 14px", marginBottom:"14px" }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(255,210,0,0.4)", textTransform:"uppercase", marginBottom:"5px" }}>Factor Clave</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"14px", color:"#ffd200", lineHeight:1.5 }}>"{prediction.factor_clave}"</div>
                </div>

                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"rgba(221,214,200,0.65)", lineHeight:1.7, marginBottom:"14px" }}>{prediction.analisis}</p>

                {prediction.jugador_decisivo && (
                  <div style={{ display:"flex", gap:"10px", alignItems:"flex-start", background:"rgba(255,255,255,0.02)", borderRadius:"6px", padding:"10px 14px" }}>
                    <span style={{ fontSize:"20px" }}>⚽</span>
                    <div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"14px", color:"#ffd200", marginBottom:"3px" }}>{prediction.jugador_decisivo}</div>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"rgba(221,214,200,0.55)", fontStyle:"italic" }}>{prediction.momento_clave}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===== CAMINO ===== */}
        {activeTab==="camino" && (
          <div style={{ animation:"fadeUp .5s ease-out" }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"16px" }}>
              Simula el camino de tu selección hasta la Final
            </div>

            <div style={{ marginBottom:"16px" }}>
              <div style={{ fontSize:"36px", textAlign:"center", marginBottom:"6px" }}>{selectedTeamForPath?.flag}</div>
              <div style={{ position:"relative" }}>
                <select className="sel" value={selectedTeamForPath?.name}
                  onChange={e => { setSelectedTeamForPath(ALL_TEAMS.find(t => t.name === e.target.value)); setPathPrediction(null); }}>
                  {Object.entries(GROUPS).map(([letter, g]) => (
                    <optgroup key={letter} label={`Grupo ${letter}`}>
                      {g.teams.filter(t => !t.playoff).map(t => (
                        <option key={t.name} value={t.name}>{t.flag} {t.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <span style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,210,0,0.4)", fontSize:"11px", pointerEvents:"none" }}>▼</span>
              </div>
              <div style={{ textAlign:"center", marginTop:"6px", fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(255,210,0,0.35)", display:"flex", justifyContent:"center", gap:"10px" }}>
                <span>FIFA <span style={{ color:"#ffd200", fontWeight:600 }}>#{selectedTeamForPath?.fifaRank}</span></span>
                <span style={{ color:"rgba(221,214,200,0.2)" }}>·</span>
                <span>{selectedTeamForPath?.confederation}</span>
              </div>
            </div>

            <button className="btn-gold" onClick={predictPath} disabled={pathLoading || !selectedTeamForPath}>
              {pathLoading ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                <span className="spinner"/>Simulando el camino...
              </span> : "🗺️ Simular Camino al Título"}
            </button>

            {pathPrediction && !pathPrediction.error && (() => {
              const t = selectedTeamForPath;
              const stages = [
                { label:"Fase de Grupos", icon:"🗂️", data: pathPrediction.rival_grupos ? {
                  rivals: pathPrediction.rival_grupos,
                  results: pathPrediction.resultados_grupo,
                  avanza: pathPrediction.clasifican_grupo,
                } : null, type:"group" },
                { label:"Ronda de 32", icon:"⚔️", data: pathPrediction.ronda_32, type:"match" },
                { label:"Octavos de Final", icon:"🥊", data: pathPrediction.octavos, type:"match" },
                { label:"Cuartos de Final", icon:"💎", data: pathPrediction.cuartos, type:"match" },
                { label:"Semifinal", icon:"🌟", data: pathPrediction.semifinal, type:"match" },
                { label:"FINAL", icon:"🏆", data: pathPrediction.final, type:"final" },
              ];
              return (
                <div style={{ marginTop:"24px", animation:"fadeUp .5s ease-out" }}>
                  {stages.map((s, i) => {
                    if (!s.data) return null;
                    const stopped = s.type === "match" && !s.data.avanza;
                    const isFinal = s.type === "final";
                    const won = isFinal && s.data.campeon;
                    const color = won ? "#ffd200" : stopped ? "#ff6b6b" : "#4a9eff";
                    const bg = won ? "rgba(255,210,0,0.08)" : stopped ? "rgba(255,107,107,0.06)" : "rgba(74,158,255,0.05)";
                    return (
                      <div key={i} className="path-step" style={{ background:bg, border:`1px solid ${color}22`, animationDelay:`${i*0.1}s` }}>
                        <div style={{ fontSize:"22px", minWidth:"28px", textAlign:"center" }}>{s.icon}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"2px", color:"rgba(221,214,200,0.35)", textTransform:"uppercase", marginBottom:"3px" }}>{s.label}</div>
                          {s.type === "group" ? (
                            <div>
                              {s.data.rivals.map((r, ri) => (
                                <div key={ri} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"rgba(221,214,200,0.8)", marginBottom:"2px" }}>
                                  {t.flag} <span style={{ color:"rgba(255,210,0,0.9)", fontWeight:600 }}>{s.data.results[ri]}</span> vs {r}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"rgba(221,214,200,0.8)" }}>
                              {t.flag} {t.name} <span style={{ color:"rgba(255,210,0,0.9)", fontWeight:600 }}>{s.data.resultado}</span> vs {s.data.rival}
                            </div>
                          )}
                        </div>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px" }}>
                          {won ? "🏆" : stopped ? "❌" : "✅"}
                        </div>
                      </div>
                    );
                  })}

                  {pathPrediction.analisis && (
                    <div style={{ marginTop:"16px", background:"rgba(255,210,0,0.03)", border:"1px solid rgba(255,210,0,0.1)", borderRadius:"8px", padding:"16px" }}>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"6px" }}>Análisis del Torneo</div>
                      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"rgba(221,214,200,0.65)", lineHeight:1.7 }}>{pathPrediction.analisis}</p>
                      {pathPrediction.estrella && (
                        <div style={{ marginTop:"10px", fontFamily:"'Playfair Display',serif", fontSize:"14px", color:"#ffd200", fontStyle:"italic" }}>
                          ⭐ Figura del torneo: {pathPrediction.estrella}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ===== CAMPEON ===== */}
        {activeTab==="campeon" && (
          <div style={{ animation:"fadeUp .5s ease-out" }}>
            <div style={{ textAlign:"center", marginBottom:"24px" }}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"11px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"16px" }}>
                Predicción completa del torneo
              </p>
              <button className="btn-gold" onClick={predictTournament} disabled={tournamentLoading}>
                {tournamentLoading ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                  <span className="spinner"/>El oráculo trabaja...
                </span> : "🔮 Predecir Campeón del Mundial 2026"}
              </button>
            </div>

            {tournamentPrediction && !tournamentPrediction.error && (
              <div style={{ animation:"fadeUp .5s ease-out" }}>
                {/* Champion */}
                <div style={{ textAlign:"center", background:"rgba(255,210,0,0.06)", border:"1px solid rgba(255,210,0,0.3)", borderRadius:"14px", padding:"28px 20px", marginBottom:"16px", animation:"glow 3s ease-in-out infinite" }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"4px", color:"rgba(255,210,0,0.5)", textTransform:"uppercase", marginBottom:"10px" }}>Campeón Mundial 2026</div>
                  <div style={{ fontSize:"52px", animation:"float 3s ease-in-out infinite" }}>{tournamentPrediction.campeon_flag}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"32px", fontWeight:900, color:"#ffd200", margin:"8px 0 4px" }}>{tournamentPrediction.campeon}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"rgba(221,214,200,0.5)" }}>Final: {tournamentPrediction.final_resultado}</div>
                </div>

                {/* Final matchup */}
                <div className="card" style={{ marginBottom:"12px" }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"12px" }}>Final · MetLife Stadium, Nueva Jersey</div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ textAlign:"center", flex:1 }}>
                      <div style={{ fontSize:"32px" }}>{tournamentPrediction.campeon_flag}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#ffd200", marginTop:"4px" }}>{tournamentPrediction.campeon}</div>
                    </div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"22px", fontWeight:700, color:"rgba(255,255,255,0.9)", padding:"0 12px" }}>{tournamentPrediction.final_resultado}</div>
                    <div style={{ textAlign:"center", flex:1 }}>
                      <div style={{ fontSize:"32px" }}>{tournamentPrediction.subcampeon_flag}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"rgba(221,214,200,0.7)", marginTop:"4px" }}>{tournamentPrediction.subcampeon}</div>
                    </div>
                  </div>
                </div>

                {/* Semis */}
                {tournamentPrediction.semifinales && (
                  <div className="card" style={{ marginBottom:"12px" }}>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"12px" }}>Semifinales</div>
                    {tournamentPrediction.semifinales.map((sf, i) => (
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom: i===0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color: sf.ganador === sf.equipo1 ? "#ffd200" : "rgba(221,214,200,0.5)" }}>{sf.equipo1}</span>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(221,214,200,0.3)", padding:"0 12px" }}>vs</span>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color: sf.ganador === sf.equipo2 ? "#ffd200" : "rgba(221,214,200,0.5)" }}>{sf.equipo2}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Extras */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"14px" }}>
                  {[
                    { label:"Tercer Puesto", val:tournamentPrediction.tercer_puesto, icon:"🥉" },
                    { label:"Sorpresa del torneo", val:tournamentPrediction.sorpresa_del_torneo, icon:"💥" },
                    { label:"Máximo goleador", val:tournamentPrediction.goleador, icon:"🥅" },
                  ].filter(x => x.val).map(x => (
                    <div key={x.label} className="card" style={{ padding:"12px 14px" }}>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"2px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"5px" }}>{x.icon} {x.label}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", color:"rgba(221,214,200,0.85)" }}>{x.val}</div>
                    </div>
                  ))}
                </div>

                {tournamentPrediction.analisis && (
                  <div style={{ background:"rgba(255,210,0,0.03)", border:"1px solid rgba(255,210,0,0.1)", borderRadius:"8px", padding:"16px" }}>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"8px" }}>¿Por qué este campeón?</div>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", color:"rgba(221,214,200,0.65)", lineHeight:1.75 }}>{tournamentPrediction.analisis}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ===== FAVORITOS ===== */}
        {activeTab==="favoritos" && (
          <div style={{ animation:"fadeUp .5s ease-out" }}>
            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"6px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase" }}>
                Cuotas casas de apuestas · Mundial 2026
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", color:"rgba(255,210,0,0.25)" }}>
                Fuente: mayo 2026
              </div>
            </div>

            {/* Bookmaker header row */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 60px 60px 60px 48px", gap:"6px", padding:"8px 12px", marginBottom:"8px", borderBottom:"1px solid rgba(255,210,0,0.1)" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"2px", color:"rgba(221,214,200,0.25)", textTransform:"uppercase" }}>Equipo</div>
              {[
                { name:"Wm Hill", color:"#8ab4f8" },
                { name:"Sky Bet", color:"#81c784" },
                { name:"bet365",  color:"#ffb74d" },
              ].map(b => (
                <div key={b.name} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"1px", color:b.color, textTransform:"uppercase", textAlign:"center", fontWeight:600 }}>{b.name}</div>
              ))}
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"1px", color:"rgba(221,214,200,0.25)", textTransform:"uppercase", textAlign:"center" }}>Prob.</div>
            </div>

            {FAVORITES.map((f, i) => (
              <div key={f.name} className="card" style={{ animationDelay:`${i*0.05}s`, marginBottom:"6px", padding:"10px 12px" }}>
                {/* Main row */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 60px 60px 60px 48px", gap:"6px", alignItems:"center", marginBottom: (f.squadNote || f.squadAlert) ? "8px" : "0" }}>
                  {/* Team */}
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <div style={{
                      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                      width:"30px", height:"30px", borderRadius:"50%", flexShrink:0,
                      background: i < 2 ? "rgba(255,210,0,0.1)" : "rgba(255,255,255,0.03)",
                      border: i < 2 ? "1px solid rgba(255,210,0,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"12px", fontWeight:700, color: i < 2 ? "#ffd200" : "rgba(221,214,200,0.45)", lineHeight:1 }}>{f.fifaRank}</div>
                    </div>
                    <span style={{ fontSize:"20px" }}>{f.flag}</span>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"13px", fontWeight:600, color: i===0 ? "#ffd200" : "#ddd6c8" }}>{f.name}</span>
                        {f.trend === "up"     && <span style={{ fontSize:"10px", color:"#4ade80" }}>▲</span>}
                        {f.trend === "down"   && <span style={{ fontSize:"10px", color:"#f87171" }}>▼</span>}
                      </div>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", color:"rgba(221,214,200,0.28)", marginTop:"1px" }}>Gr. {f.group} · FIFA #{f.fifaRank}</div>
                    </div>
                  </div>
                  {/* Bookmaker odds */}
                  {[
                    { val: f.wmHill,  color:"#8ab4f8" },
                    { val: f.skyBet,  color:"#81c784" },
                    { val: f.bet365,  color:"#ffb74d" },
                  ].map((b, bi) => (
                    <div key={bi} style={{ textAlign:"center" }}>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"14px", fontWeight:700, color:b.color }}>{b.val}</div>
                    </div>
                  ))}
                  {/* Implied prob */}
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", fontWeight:700, color: i===0 ? "#ffd200" : "rgba(221,214,200,0.6)" }}>{f.pct}%</div>
                  </div>
                </div>
                {/* Probability bar */}
                <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:"3px", height:"3px", overflow:"hidden", marginBottom:"6px" }}>
                  <div style={{
                    height:"100%", borderRadius:"3px",
                    background: i===0 ? "#ffd200" : i<=2 ? "rgba(255,210,0,0.5)" : "rgba(255,210,0,0.25)",
                    width:`${(f.pct/18.8)*100}%`, transition:"width 1.5s ease-out",
                  }}/>
                </div>
                {/* Squad notes */}
                {(f.squadNote || f.squadAlert) && (
                  <div style={{ borderTop:"1px solid rgba(255,255,255,0.04)", paddingTop:"6px" }}>
                    {f.squadNote && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(221,214,200,0.4)", lineHeight:1.4 }}>{f.squadNote}</div>}
                    {f.squadAlert && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(251,191,36,0.6)", marginTop:"2px", lineHeight:1.4 }}>{f.squadAlert}</div>}
                  </div>
                )}
              </div>
            ))}
            {/* Disclaimer */}
            <div style={{ marginTop:"12px", padding:"10px 14px", background:"rgba(255,255,255,0.02)", borderRadius:"6px", borderLeft:"2px solid rgba(255,210,0,0.2)" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"10px", color:"rgba(221,214,200,0.3)", lineHeight:1.6 }}>
                Cuotas fraccionales UK reales (William Hill, Sky Bet, bet365). <strong style={{color:"rgba(255,210,0,0.45)"}}>Prob. = promedio de probabilidad implícita</strong> de las 3 casas, calculada como 1/(cuota+1) y sin ajuste por margen. Fuente: footballgroundguide.com · mayo 2026. Las cuotas varían constantemente — verificá siempre en el sitio oficial antes de apostar. No constituye consejo de apuestas.
              </div>
            </div>

            <div style={{ marginTop:"20px", background:"rgba(255,210,0,0.03)", border:"1px solid rgba(255,210,0,0.1)", borderRadius:"8px", padding:"16px" }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(255,210,0,0.35)", textTransform:"uppercase", marginBottom:"8px" }}>📅 Calendario Clave</div>
              {[
                { fase:"Fase de Grupos", fechas:"11–27 Jun 2026", icon:"🗂️" },
                { fase:"Ronda de 32 ★", fechas:"28 Jun – 3 Jul", icon:"⚔️" },
                { fase:"Octavos de Final", fechas:"4–7 Jul", icon:"🥊" },
                { fase:"Cuartos de Final", fechas:"9–11 Jul", icon:"💎" },
                { fase:"Semifinales", fechas:"14–15 Jul", icon:"🌟" },
                { fase:"FINAL · MetLife NJ", fechas:"19 Jul 2026", icon:"🏆" },
              ].map(x => (
                <div key={x.fase} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"rgba(221,214,200,0.65)" }}>{x.icon} {x.fase}</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"12px", color:"rgba(255,210,0,0.6)" }}>{x.fechas}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ textAlign:"center", paddingBottom:"28px", fontFamily:"'DM Sans',sans-serif", fontSize:"10px", letterSpacing:"2px", color:"rgba(221,214,200,0.15)", textTransform:"uppercase" }}>
        Powered by Claude AI · Anthropic
      </div>
    </div>
  );
}
