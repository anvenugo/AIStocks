import { useState, useEffect } from "react";
import { SECTORS, ALL_STOCKS, upside, upsideColor, RISK_COLORS } from "./data";
import Heatmap from "./components/Heatmap";
import Screener from "./components/Screener";
import Detail from "./components/Detail";
import Summary from "./components/Summary";
import TickerBand from "./components/TickerBand";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("heatmap");
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const sectorAverages = Object.entries(SECTORS).map(([name, data]) => {
    const avg = Object.values(data.stocks).reduce((s, v) => s + v.pct, 0) / Object.keys(data.stocks).length;
    return { name, short: data.short, color: data.color, avg };
  });

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <div className="brand-title">⚡ AI INFRASTRUCTURE TERMINAL</div>
          <div className="brand-sub">{Object.keys(ALL_STOCKS).length} STOCKS · 7 SECTORS · MAY 12 2026</div>
        </div>
        <div className="header-sectors">
          {sectorAverages.map(({ short, color, avg }) => (
            <div key={short} className="sector-pill">
              <div className="sector-pill-label" style={{ color }}>{short}</div>
              <div className="sector-pill-val" style={{ color: avg >= 0 ? "#22c55e" : "#f87171" }}>
                {avg >= 0 ? "+" : ""}{avg.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
        <div className="header-clock">
          <div className="clock-label">NYSE CLOSE</div>
          <div className="clock-time">{time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>
        </div>
      </header>

      <TickerBand />

      <main className="main" style={{ paddingRight: selected ? 420 : 20 }}>
        <Summary onSelect={setSelected} />
        <div className="tab-bar">
          {[["heatmap", "HEATMAP"], ["screener", "SCREENER"]].map(([id, label]) => (
            <button key={id} className={`tab-btn ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        {tab === "heatmap" && <Heatmap onSelect={setSelected} />}
        {tab === "screener" && <Screener onSelect={setSelected} />}
      </main>

      {selected && <Detail ticker={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
