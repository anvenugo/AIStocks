import { ALL_STOCKS, upside, upsideColor } from "../data";

export default function Summary({ onSelect }) {
  const all = Object.values(ALL_STOCKS).filter(s => s.price > 0);
  const avgUp = all.reduce((sum, s) => sum + upside(s), 0) / all.length;
  const green = all.filter(s => upside(s) > 15).length;
  const gainers = all.filter(s => s.pct > 0).length;
  const bestUp = Object.entries(ALL_STOCKS).sort((a, b) => upside(b[1]) - upside(a[1]))[0];
  const bestDay = Object.entries(ALL_STOCKS).sort((a, b) => b[1].pct - a[1].pct)[0];
  const worstDay = Object.entries(ALL_STOCKS).sort((a, b) => a[1].pct - b[1].pct)[0];

  const kpis = [
    { label: "STOCKS TRACKED", value: Object.keys(ALL_STOCKS).length, color: "#94a3b8", sub: "7 sub-sectors" },
    { label: "AVG ANALYST UPSIDE", value: (avgUp >= 0 ? "+" : "") + avgUp.toFixed(0) + "%", color: avgUp > 10 ? "#22c55e" : "#f59e0b", sub: "consensus targets" },
    { label: "STRONG BUYS", value: green, color: "#22c55e", sub: ">15% upside to target" },
    { label: "GAINERS TODAY", value: `${gainers}/${all.length}`, color: "#22c55e", sub: "up on the session" },
    { label: "BEST UPSIDE", value: bestUp[0], color: bestUp[1].sectorColor, sub: "+" + upside(bestUp[1]).toFixed(0) + "% to analyst target", ticker: bestUp[0] },
    { label: "BEST TODAY", value: bestDay[0], color: "#22c55e", sub: "+" + bestDay[1].pct.toFixed(2) + "% today", ticker: bestDay[0] },
    { label: "WORST TODAY", value: worstDay[0], color: "#f87171", sub: worstDay[1].pct.toFixed(2) + "% today", ticker: worstDay[0] },
  ];

  return (
    <div className="summary-grid">
      {kpis.map((k, i) => (
        <div key={i} className="kpi-card" onClick={k.ticker ? () => onSelect(k.ticker) : undefined} style={{ cursor: k.ticker ? "pointer" : "default" }}>
          <div className="kpi-label">{k.label}</div>
          <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
          <div className="kpi-sub">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}
