import { ALL_STOCKS } from "../data";

export default function TickerBand() {
  const stocks = Object.entries(ALL_STOCKS).sort((a, b) => Math.abs(b[1].pct) - Math.abs(a[1].pct));
  const items = [...stocks, ...stocks, ...stocks];

  return (
    <div className="ticker-band">
      <div className="ticker-scroll">
        {items.map(([t, s], i) => {
          const c = s.pct >= 0 ? "#22c55e" : "#f87171";
          return (
            <span key={i} className="ticker-item">
              <span style={{ color: s.sectorColor, fontWeight: 700 }}>{t}</span>
              <span style={{ color: "#64748b" }}> ${s.price < 100 ? s.price.toFixed(2) : s.price.toFixed(0)}</span>
              <span style={{ color: c }}> {s.pct >= 0 ? "▲" : "▼"}{Math.abs(s.pct).toFixed(2)}%</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
