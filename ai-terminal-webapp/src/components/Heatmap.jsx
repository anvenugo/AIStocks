import { SECTORS } from "../data";

export default function Heatmap({ onSelect }) {
  return (
    <div className="heatmap">
      {Object.entries(SECTORS).map(([secName, data]) => {
        const stocks = Object.entries(data.stocks);
        const avgPct = stocks.reduce((s, [, v]) => s + v.pct, 0) / stocks.length;

        return (
          <div key={secName} className="heatmap-sector">
            <div className="heatmap-sector-header">
              <span className="heatmap-sector-short" style={{ color: data.color }}>{data.short}</span>
              <span className="heatmap-sector-dot">·</span>
              <span className="heatmap-sector-name">{secName}</span>
              <span className="heatmap-sector-desc">{data.desc}</span>
              <span className="heatmap-sector-avg" style={{ color: avgPct >= 0 ? "#22c55e" : "#f87171" }}>
                avg {avgPct >= 0 ? "+" : ""}{avgPct.toFixed(2)}%
              </span>
            </div>

            <div className="heatmap-cells">
              {stocks.map(([ticker, s]) => {
                const intensity = Math.min(Math.abs(s.pct) / 6, 1);
                const up = upside(s);
                const bg = s.pct >= 0
                  ? `rgba(34,197,94,${0.07 + intensity * 0.22})`
                  : `rgba(248,113,113,${0.07 + intensity * 0.22})`;
                const border = s.pct >= 0
                  ? `rgba(34,197,94,${0.25 + intensity * 0.45})`
                  : `rgba(248,113,113,${0.25 + intensity * 0.45})`;
                const tc = s.pct >= 0 ? "#22c55e" : "#f87171";
                const uc = up > 15 ? "#22c55e" : up > 0 ? "#f59e0b" : "#f87171";

                return (
                  <div
                    key={ticker}
                    className="heatmap-cell"
                    style={{ background: bg, borderColor: border }}
                    onClick={() => onSelect(ticker)}
                  >
                    <div className="cell-ticker">{ticker}</div>
                    <div className="cell-price">${s.price < 100 ? s.price.toFixed(2) : s.price.toFixed(0)}</div>
                    <div className="cell-pct" style={{ color: tc }}>{s.pct >= 0 ? "▲" : "▼"}{Math.abs(s.pct).toFixed(2)}%</div>
                    <div className="cell-upside" style={{ color: uc }}>{up >= 0 ? "+" : ""}{up.toFixed(0)}% target</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function upside(s) {
  return s.price > 0 ? ((s.target / s.price) - 1) * 100 : 0;
}
