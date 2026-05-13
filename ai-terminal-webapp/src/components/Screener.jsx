import { useState } from "react";
import { ALL_STOCKS, SECTORS, upside, upsideColor, RISK_COLORS } from "../data";

function Spark({ pct, color, w = 64, h = 24 }) {
  const pts = [];
  const steps = 14;
  for (let i = 0; i <= steps; i++) {
    const noise = (Math.sin(i * 2.1 + pct * 0.4) + Math.sin(i * 0.9 + 1)) * h * 0.2;
    const trend = pct < 0 ? i * 0.7 : -i * 0.5;
    const y = Math.max(2, Math.min(h - 2, h / 2 + noise + trend));
    pts.push(`${(i / steps) * w},${y}`);
  }
  const path = "M" + pts.join(" L");
  const fill = `M0,${h} L` + pts.join(" L") + ` L${w},${h} Z`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible", flexShrink: 0 }}>
      <path d={fill} fill={color} opacity={0.1} />
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export default function Screener({ onSelect }) {
  const [sort, setSort] = useState("upside");
  const [dir, setDir] = useState(-1); // -1 = desc
  const [filter, setFilter] = useState("ALL");
  const [showDesc, setShowDesc] = useState(false);

  const sectors = ["ALL", ...Object.keys(SECTORS)];

  const toggleSort = (id) => {
    if (sort === id) setDir(d => -d);
    else { setSort(id); setDir(-1); }
  };

  const rows = Object.entries(ALL_STOCKS)
    .filter(([, s]) => filter === "ALL" || s.sector === filter)
    .map(([t, s]) => ({ t, s, up: upside(s) }))
    .sort((a, b) => {
      let va, vb;
      if (sort === "upside") { va = a.up; vb = b.up; }
      else if (sort === "pe") { va = a.s.pe; vb = b.s.pe; }
      else if (sort === "growth") { va = a.s.revG; vb = b.s.revG; }
      else if (sort === "pct") { va = a.s.pct; vb = b.s.pct; }
      else if (sort === "price") { va = a.s.price; vb = b.s.price; }
      else return 0;
      return dir * (vb - va);
    });

  const SortBtn = ({ id, label }) => (
    <button
      className={`sort-btn ${sort === id ? "active" : ""}`}
      onClick={() => toggleSort(id)}
    >
      {label} {sort === id ? (dir === -1 ? "↓" : "↑") : ""}
    </button>
  );

  return (
    <div className="screener">
      <div className="screener-controls">
        <div className="screener-sort">
          <span className="control-label">SORT</span>
          <SortBtn id="upside" label="UPSIDE" />
          <SortBtn id="growth" label="REV +" />
          <SortBtn id="pe" label="P/E" />
          <SortBtn id="pct" label="TODAY" />
          <SortBtn id="price" label="PRICE" />
        </div>
        <div className="screener-filter">
          <span className="control-label">SECTOR</span>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="sector-select"
          >
            {sectors.map(s => <option key={s} value={s}>{s === "ALL" ? "ALL SECTORS" : s}</option>)}
          </select>
        </div>
        <button
          className={`desc-toggle ${showDesc ? "active" : ""}`}
          onClick={() => setShowDesc(v => !v)}
        >
          {showDesc ? "HIDE" : "SHOW"} AI DESCRIPTIONS
        </button>
      </div>

      <div className="screener-table-wrap">
        <table className="screener-table">
          <thead>
            <tr>
              {["#", "TICKER", "SECTOR", "PRICE", "TODAY", "TARGET", "UPSIDE", "P/E", "REV+", "RISK", "AI ROLE"].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ t, s, up }, i) => {
              const uc = upsideColor(up);
              const dc = s.pct >= 0 ? "#22c55e" : "#f87171";
              const secShort = s.sectorShort;
              return (
                <>
                  <tr key={t} className="screener-row" onClick={() => onSelect(t)}>
                    <td className="rank">{i + 1}</td>
                    <td className="ticker-cell">
                      <span className="pulse" style={{ background: s.sectorColor }} />
                      <span style={{ color: s.sectorColor, fontWeight: 800 }}>{t}</span>
                    </td>
                    <td>
                      <span className="sector-badge" style={{ background: s.sectorColor + "18", color: s.sectorColor }}>
                        {secShort}
                      </span>
                    </td>
                    <td className="mono">${s.price < 100 ? s.price.toFixed(2) : s.price.toFixed(0)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Spark pct={s.pct} color={dc} />
                        <span className="mono" style={{ color: dc, fontWeight: 700 }}>
                          {s.pct >= 0 ? "+" : ""}{s.pct.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="mono" style={{ color: uc }}>${s.target}</td>
                    <td className="mono" style={{ color: uc, fontWeight: 700 }}>{up >= 0 ? "+" : ""}{up.toFixed(0)}%</td>
                    <td className="mono" style={{ color: s.pe < 25 ? "#22c55e" : s.pe < 50 ? "#f59e0b" : "#f87171" }}>{s.pe}x</td>
                    <td className="mono" style={{ color: "#22c55e" }}>+{s.revG}%</td>
                    <td>
                      <span className="risk-badge" style={{ background: RISK_COLORS[s.risk] + "18", color: RISK_COLORS[s.risk] }}>
                        {s.risk.toUpperCase()}
                      </span>
                    </td>
                    <td className="ai-role-cell">{s.aiValue.substring(0, 65)}…</td>
                  </tr>
                  {showDesc && (
                    <tr key={t + "_desc"} className="desc-row">
                      <td colSpan={11}>
                        <div className="desc-content" style={{ borderLeftColor: s.sectorColor }}>
                          <span className="desc-label" style={{ color: s.sectorColor }}>🤖 AI VALUE</span>
                          {s.aiValue}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
