import { useState, useEffect } from "react";
import { ALL_STOCKS, upside, upsideColor, RISK_COLORS } from "../data";

function Spark({ pct, color, w = 80, h = 36 }) {
  const pts = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const noise = (Math.sin(i * 2.1 + pct * 0.4) + Math.sin(i * 0.9 + 1)) * h * 0.2;
    const trend = pct < 0 ? i * 0.9 : -i * 0.6;
    const y = Math.max(2, Math.min(h - 2, h / 2 + noise + trend));
    pts.push(`${(i / steps) * w},${y}`);
  }
  const path = "M" + pts.join(" L");
  const fill = `M0,${h} L` + pts.join(" L") + ` L${w},${h} Z`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <path d={fill} fill={color} opacity={0.12} />
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function Slider({ label, value, min, max, step = 1, onChange, format, color }) {
  return (
    <div className="slider-group">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-value">{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ accentColor: color }}
      />
    </div>
  );
}

export default function Detail({ ticker, onClose }) {
  const s = ALL_STOCKS[ticker];
  if (!s) return null;

  const [pe, setPE] = useState(s.pe);
  const [tpe, setTPE] = useState(Math.round(s.pe * 1.3));
  const [rg, setRG] = useState(s.revG);
  const [mg, setMG] = useState(3);

  useEffect(() => {
    setPE(s.pe);
    setTPE(Math.round(s.pe * 1.3));
    setRG(s.revG);
    setMG(3);
  }, [ticker]);

  const up = upside(s);
  const uc = upsideColor(up);
  const dc = s.pct >= 0 ? "#22c55e" : "#f87171";

  const eps = rg + mg * 1.5;
  const ret2 = (tpe / pe * Math.pow(1 + eps / 100, 2) - 1) * 100;
  const ann = (Math.pow(1 + ret2 / 100, 0.5) - 1) * 100;
  const maxB = Math.max(Math.abs((tpe / pe - 1) * 100), rg * 2, mg * 3, Math.abs(ret2), 10);

  const waterfall = [
    { label: "P/E RE-RATING", val: (tpe / pe - 1) * 100, color: "#818cf8" },
    { label: "REVENUE GROWTH", val: rg * 2, color: "#22c55e" },
    { label: "MARGIN EXPANSION", val: mg * 3, color: "#38bdf8" },
    { label: "TOTAL 2YR RETURN", val: ret2, color: "#f59e0b", total: true },
  ];

  return (
    <div className="detail-panel">
      {/* Header */}
      <div className="detail-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="detail-ticker" style={{ color: s.sectorColor }}>{ticker}</span>
          <span className="detail-sector-badge" style={{ background: s.sectorColor + "20", color: s.sectorColor }}>
            {s.sectorShort}
          </span>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {/* Price block */}
      <div className="detail-price-block" style={{ borderColor: s.sectorColor + "40" }}>
        <div>
          <div className="detail-price">${s.price.toFixed(2)}</div>
          <div className="detail-change" style={{ color: dc }}>
            {s.pct >= 0 ? "▲" : "▼"} ${Math.abs(s.chg).toFixed(2)} ({s.pct >= 0 ? "+" : ""}{s.pct.toFixed(2)}%) today
          </div>
        </div>
        <Spark pct={s.pct} color={dc} />
      </div>

      {/* KPI grid */}
      <div className="detail-kpis">
        {[
          ["TARGET", "$" + s.target, uc],
          ["UPSIDE", (up >= 0 ? "+" : "") + up.toFixed(0) + "%", uc],
          ["FWD P/E", s.pe + "x", s.pe < 30 ? "#22c55e" : s.pe < 55 ? "#f59e0b" : "#f87171"],
          ["REV GROWTH", "+" + s.revG + "%", "#22c55e"],
          ["RISK", s.risk.toUpperCase(), RISK_COLORS[s.risk]],
          ["MKT CAP", s.mktCap, "#94a3b8"],
        ].map(([l, v, c]) => (
          <div key={l} className="detail-kpi">
            <div className="detail-kpi-val" style={{ color: c }}>{v}</div>
            <div className="detail-kpi-label">{l}</div>
          </div>
        ))}
      </div>

      {/* AI Value */}
      <div className="ai-value-block" style={{ borderColor: s.sectorColor + "40", background: s.sectorColor + "08" }}>
        <div className="ai-value-title" style={{ color: s.sectorColor }}>🤖 AI VALUE PROPOSITION</div>
        <p className="ai-value-text">{s.aiValue}</p>
      </div>

      {/* Catalyst */}
      <div className="catalyst-block">
        <div className="catalyst-title">CATALYST / ENTRY NOTE</div>
        <p className="catalyst-text">{s.catalyst}</p>
      </div>

      {/* Valuation Model */}
      <div className="model-section-title">VALUATION MODEL</div>

      <Slider label="CURRENT FWD P/E" value={pe} min={8} max={100} step={0.5} onChange={setPE} format={v => v + "x"} color={s.sectorColor} />
      <Slider label="TARGET P/E" value={tpe} min={8} max={120} step={0.5} onChange={setTPE} format={v => v + "x"} color={s.sectorColor} />
      <Slider label="REVENUE CAGR (2YR)" value={rg} min={-10} max={120} onChange={setRG} format={v => v + "%"} color={s.sectorColor} />
      <Slider label="MARGIN EXPANSION" value={mg} min={-5} max={15} onChange={setMG} format={v => (v >= 0 ? "+" : "") + v + " pts"} color={s.sectorColor} />

      {/* Output KPIs */}
      <div className="model-outputs">
        {[
          ["2YR RETURN", (ret2 >= 0 ? "+" : "") + ret2.toFixed(0) + "%", ret2 > 0 ? "#22c55e" : "#f87171"],
          ["ANN. RETURN", (ann >= 0 ? "+" : "") + ann.toFixed(0) + "%", ann > 12 ? "#22c55e" : ann > 0 ? "#f59e0b" : "#f87171"],
          ["2YR PRICE", "$" + (s.price * (1 + ret2 / 100)).toFixed(0), s.sectorColor],
          ["EPS GROWTH", "+" + eps.toFixed(0) + "%", "#f59e0b"],
        ].map(([l, v, c]) => (
          <div key={l} className="model-output-kpi">
            <div className="model-kpi-val" style={{ color: c }}>{v}</div>
            <div className="model-kpi-label">{l}</div>
          </div>
        ))}
      </div>

      {/* Waterfall */}
      <div className="waterfall">
        {waterfall.map(({ label, val, color, total }) => (
          <div key={label} className={`waterfall-row ${total ? "total" : ""}`}>
            <div className="waterfall-label">{label}</div>
            <div className="waterfall-track">
              <div
                className="waterfall-fill"
                style={{
                  width: Math.max(3, Math.min(100, Math.abs(val) / maxB * 100)) + "%",
                  background: val < 0 ? "#f87171" : color,
                }}
              >
                {val >= 0 ? "+" : ""}{val.toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
