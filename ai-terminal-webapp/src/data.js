export const SECTORS = {
  "AI Power": {
    color: "#22c55e", short: "PWR",
    desc: "Nuclear, gas & renewables powering AI data centers",
    stocks: {
      VST:  { price: 146.87, chg: -5.18,  pct: -3.41, target: 234,  pe: 18, revG: 18, risk: "Low",  mktCap: "53B",
        aiValue: "Operates nuclear, gas, and battery storage sold at peak AI demand prices. Meta and AWS signed 20-year nuclear PPAs with Vistra, locking in decades of contracted revenue. Sells directly into the grid when AI data centers spike demand.",
        catalyst: "~59% analyst upside; Meta & AWS nuclear PPAs locked in" },
      TLN:  { price: 374.61, chg: -8.83,  pct: -2.30, target: 453,  pe: 27, revG: 35, risk: "Med",  mktCap: "12B",
        aiValue: "Owns the Susquehanna nuclear plant in Pennsylvania. Amazon co-located a data center directly next to it, creating the template for nuclear-to-datacenter power delivery. Expanded to 1.92 GW with AWS and evaluating Xe-100 SMRs for future AI campuses.",
        catalyst: "Pure-play AI power; 25% analyst upside; SMR pipeline" },
      CEG:  { price: 293.60, chg: -6.09,  pct: -2.03, target: 368,  pe: 30, revG: 20, risk: "Low",  mktCap: "61B",
        aiValue: "Runs the largest nuclear fleet in the US — 21 reactors providing always-on, carbon-free baseload power. Microsoft restarted Three Mile Island exclusively to power its AI data centers. Nuclear never cycles off, unlike solar or wind.",
        catalyst: "Down 26% from highs — entry window; 20% EPS CAGR 2026–29" },
      GEV:  { price: 1071.98,chg: -1.10,  pct: -0.10, target: 1068, pe: 64, revG: 22, risk: "Med",  mktCap: "291B",
        aiValue: "Builds the gas turbines and grid infrastructure that every AI data center campus requires. $150B backlog and 90% of gas turbine capacity contracted through 2030. The construction company behind the $1 trillion AI power buildout.",
        catalyst: "At consensus; long-duration hold" },
      NEE:  { price: 94.59,  chg: -0.25,  pct: -0.26, target: 110,  pe: 22, revG: 8,  risk: "Low",  mktCap: "196B",
        aiValue: "World's largest renewable energy operator with decades of contracted solar and wind capacity. AI hyperscalers need to meet sustainability mandates — NextEra is their primary counterparty for large-scale clean energy PPAs already contracted into the 2030s.",
        catalyst: "Defensive compounder; 8% EPS growth through 2032" },
      SRE:  { price: 93.41,  chg: +0.58,  pct: +0.62, target: 102,  pe: 18, revG: 6,  risk: "Low",  mktCap: "58B",
        aiValue: "Controls natural gas pipelines and LNG terminals across Texas and California — the two fastest-growing AI data center markets. Gas-fired peakers bridge renewable intermittency gaps that data centers cannot tolerate.",
        catalyst: "Indirect play; regulated returns cap upside" },
      BE:   { price: 280.69, chg: -3.23,  pct: -1.14, target: 166,  pe: 80, revG: 30, risk: "High", mktCap: "18B",
        aiValue: "Makes solid-oxide fuel cells that generate clean electricity on-site from natural gas with no grid connection required. AI data centers cannot tolerate downtime. Oracle signed a major deal for AI data center power resilience using Bloom's fuel cells.",
        catalyst: "Real thesis; stock already above analyst targets" },
    }
  },
  "Semicon Equip": {
    color: "#818cf8", short: "EQP",
    desc: "Machines that physically build every AI chip ever made",
    stocks: {
      AMAT: { price: 431.20, chg: -12.42, pct: -2.80, target: 465,  pe: 32, revG: 22, risk: "Med",  mktCap: "368B",
        aiValue: "Makes the deposition, etch, and CMP machines that physically build AI chips layer by layer. Not a single Nvidia H100 or Google TPU exists without AMAT equipment. Just announced a $5B EPIC Center co-innovation partnership with TSMC for next-gen AI chip manufacturing.",
        catalyst: "Earnings May 14 — beat & raise expected; TSMC EPIC $5B" },
      MCHP: { price: 97.70,  chg: -1.33,  pct: -1.34, target: 115,  pe: 35, revG: 18, risk: "Med",  mktCap: "53B",
        aiValue: "Timing controllers and embedded processors that synchronize every server rack in an AI data center. Without precise sub-nanosecond timing synchronization, high-speed AI networking breaks down. Virtually every AI server ships with MCHP chips inside.",
        catalyst: "Recovery play; timing chips in every AI rack deployed" },
      SWKS: { price: 66.31,  chg: -3.82,  pct: -5.45, target: 75,   pe: 14, revG: 12, risk: "Low",  mktCap: "11B",
        aiValue: "Designs the RF chips enabling wireless connectivity in every AI-capable device — smartphones, IoT sensors, Wi-Fi 7 access points, 5G modules. As AI inference moves to the edge, every endpoint device needs Skyworks RF chips to communicate with AI infrastructure.",
        catalyst: "Best value in semis at 14x fwd P/E; 4%+ dividend" },
    }
  },
  "Custom Silicon": {
    color: "#a78bfa", short: "ASIC",
    desc: "Custom AI accelerators built for specific hyperscaler workloads",
    stocks: {
      AVGO: { price: 419.30, chg: -9.13,  pct: -2.13, target: 280,  pe: 38, revG: 20, risk: "Med",  mktCap: "1900B",
        aiValue: "Designs custom AI ASICs exclusively for Google's TPU and Meta's MTIA programs — the chips powering Google Search AI, YouTube recommendations, and Meta's content feed at trillion-parameter scale. Also dominates AI networking with Tomahawk switch chips connecting GPU clusters.",
        catalyst: "Stock above analyst consensus; core long-term hold" },
      MRVL: { price: 164.50, chg: -6.34,  pct: -3.71, target: 122,  pe: 44, revG: 25, risk: "High", mktCap: "148B",
        aiValue: "Builds custom AI silicon and the optical interconnects linking GPU clusters inside data centers. As AI clusters scale to hundreds of thousands of GPUs, copper wiring runs out of bandwidth — Marvell's PAM4 DSP chips are the solution. Amazon Trainium chips rely on Marvell interconnect.",
        catalyst: "ATH area; stock trades 35% above analyst consensus" },
      ALAB: { price: 204.42, chg: -2.93,  pct: -1.41, target: 153,  pe: 65, revG: 40, risk: "High", mktCap: "24B",
        aiValue: "Makes PCIe and CXL connectivity chips allowing AI accelerators, CPUs, and memory to communicate at maximum speed inside a server. As AI systems require more chips in parallel, the interconnect fabric becomes the bottleneck — Astera Labs is the specialist solving that problem.",
        catalyst: "Pure-play connectivity; trading above Rothschild target" },
    }
  },
  "Connectivity": {
    color: "#f59e0b", short: "NET",
    desc: "Moving data at AI speed — inside racks, between racks, across campuses",
    stocks: {
      CRDO: { price: 198.57, chg: -11.65, pct: -5.54, target: 189,  pe: 55, revG: 80, risk: "High", mktCap: "28B",
        aiValue: "Makes Active Electrical Cables (AECs) connecting GPUs within AI racks at 800G and 1.6T speeds. Every Nvidia GB200 NVL72 rack — the current flagship AI cluster — requires CRDO's AECs to link its 72 GPUs. Revenue grew 201% YoY as hyperscalers raced to deploy clusters.",
        catalyst: "201% YoY rev growth; 1.6T AEC compatibility confirmed" },
      ANET: { price: 142.54, chg: +6.11,  pct: +4.48, target: 160,  pe: 40, revG: 18, risk: "Med",  mktCap: "90B",
        aiValue: "Builds the Ethernet switches forming the spine of AI data center networks. When a training run spans 10,000+ GPUs, Arista's switches ensure every GPU can communicate with every other at line rate. Microsoft, Meta, and Google are all major customers.",
        catalyst: "Green on red tape — institutional accumulation signal" },
      APH:  { price: 127.87, chg: +5.40,  pct: +4.41, target: 145,  pe: 35, revG: 15, risk: "Low",  mktCap: "181B",
        aiValue: "Makes the physical connectors, cables, and antenna systems carrying signals throughout AI hardware. Every GPU board, server, switch, and power supply uses Amphenol connectors. AI racks need 10-100x more connectors than traditional servers — volumes compound with every deployment.",
        catalyst: "Green on red tape; deeply embedded low-profile compounder" },
    }
  },
  "Photonics": {
    color: "#38bdf8", short: "OPT",
    desc: "Fiber optics replacing copper as GPU clusters scale beyond electrical limits",
    stocks: {
      COHR: { price: 374.01, chg: -5.68,  pct: -1.50, target: 420,  pe: 47, revG: 30, risk: "High", mktCap: "38B",
        aiValue: "Makes the transceivers, lasers, and optical components converting electrical signals to light for data center interconnects. Nvidia invested $2B directly — co-packaged optics, where the optical engine sits inside the chip package, is the next frontier of AI chip design.",
        catalyst: "S&P 500 inclusion + $2B Nvidia strategic investment" },
      LITE: { price: 992.37, chg: -60.72, pct: -5.77, target: 900,  pe: 55, revG: 65, risk: "High", mktCap: "23B",
        aiValue: "Builds Optical Circuit Switches allowing hyperscalers to dynamically reconfigure which GPUs communicate — critical for flexible AI training runs. $400M+ OCS backlog. Nvidia invested $4B alongside Coherent. Fiscal Q3 guidance: 85%+ revenue growth year-over-year.",
        catalyst: "+166% YTD; high vol both directions — size carefully" },
      AAOI: { price: 188.28, chg: +3.38,  pct: +1.83, target: 150,  pe: 35, revG: 80, risk: "High", mktCap: "13B",
        aiValue: "Manufactures 800G and 1.6T optical transceivers for AI data centers. Demand is so far ahead of production capacity that management forecasts $378M in monthly orders by mid-2027. The AI buildout has overwhelmed their manufacturing capacity.",
        catalyst: "+441% YTD; above analyst targets — momentum trade" },
      FN:   { price: 634.48, chg: -15.05, pct: -2.32, target: 700,  pe: 38, revG: 25, risk: "Med",  mktCap: "22B",
        aiValue: "Contract manufacturer for COHR, LITE, and all major photonics companies. If AI demand for optical components surges, Fabrinet's factories run hotter regardless of which brand wins. A diversified proxy for the entire photonics buildout with lower single-name concentration risk.",
        catalyst: "Cleaner photonics exposure; customers include Nvidia's suppliers" },
    }
  },
  "Memory": {
    color: "#f87171", short: "MEM",
    desc: "HBM stacked on AI GPU dies — feeds models data at terabyte-per-second",
    stocks: {
      MU:   { price: 766.58, chg: -28.75, pct: -3.61, target: 549,  pe: 25, revG: 45, risk: "Med",  mktCap: "897B",
        aiValue: "One of only 3 global HBM suppliers (alongside SK Hynix and Samsung). HBM is stacked directly beside AI GPUs — without it, an H100 runs at a fraction of rated performance. Micron is sold out of HBM through all of 2026 and was added to the S&P 100 in March.",
        catalyst: "+174% YTD; great business — stock has lapped analysts by 40%" },
    }
  },
  "DC Infrastructure": {
    color: "#e879f9", short: "DCI",
    desc: "Physical layer — cooling, power management, and GPU cloud platforms",
    stocks: {
      VRT:  { price: 367.13, chg: -0.79,  pct: -0.21, target: 339,  pe: 55, revG: 28, risk: "Med",  mktCap: "141B",
        aiValue: "Makes the liquid cooling systems preventing AI GPU clusters from melting. An Nvidia H100 generates 700 watts of heat — multiply by 10,000 GPUs and you need industrial-scale cooling. No Vertiv hardware means no AI chips running. Q1 revenue up 30% YoY with margin expansion.",
        catalyst: "At ATH — essential hardware; wait for 5-8% pullback to enter" },
      NBIS: { price: 179.11, chg: -6.99,  pct: -3.76, target: 200,  pe: 45, revG: 35, risk: "High", mktCap: "14B",
        aiValue: "GPU cloud platform renting H100 and H200 clusters to AI startups and enterprises that cannot build their own data centers. As AI model training costs hundreds of millions in compute, Nebius provides on-demand access to the exact infrastructure needed. Former Yandex spinoff.",
        catalyst: "Speculative; GPU rental economics dependent on utilization" },
    }
  },
};

export const ALL_STOCKS = {};
Object.entries(SECTORS).forEach(([sec, data]) => {
  Object.entries(data.stocks).forEach(([ticker, stock]) => {
    ALL_STOCKS[ticker] = { ...stock, sector: sec, sectorColor: data.color, sectorShort: data.short };
  });
});

export const upside = (s) => s.price > 0 ? ((s.target / s.price) - 1) * 100 : 0;
export const upsideColor = (u) => u > 15 ? "#22c55e" : u > 0 ? "#f59e0b" : "#f87171";
export const RISK_COLORS = { Low: "#22c55e", Med: "#f59e0b", High: "#f87171" };
