// Per-room visual themes. Each theme tints the room, adds an accent color,
// a decorative motif strip and optional ornamental corners.

const THEMES = {
  0: {
    // Entry — neutral samizdat
    name: "Вестибюль",
    accent: "oklch(0.48 0.16 28)",
    tint: "transparent",
    motif: "samizdat",
    subtitle: "ВЕСТИБЮЛЬ · VESTIBULE",
  },
  1: {
    // Khvylovy — Ukrainian folk, wheat + cornflower
    name: "Хвильовий",
    accent: "oklch(0.45 0.14 55)",   // ochre
    secondary: "oklch(0.45 0.14 250)", // cornflower
    tint: "oklch(0.93 0.03 85)",      // warm wheat paper
    motif: "rushnyk",                 // embroidery band
    subtitle: "УКРАЇНСЬКИЙ ЗАЛ · UKRAINIAN HALL",
  },
  2: {
    // Dovlatov — editorial gray + censor red, coffee rings
    name: "Довлатов",
    accent: "oklch(0.45 0.18 25)",
    secondary: "oklch(0.4 0.01 60)",
    tint: "oklch(0.91 0.008 80)",
    motif: "coffee",
    subtitle: "РЕДАКЦИЯ · EDITORIAL OFFICE",
  },
  3: {
    // Solzhenitsyn I — frost + barbed wire
    name: "АРХИПЕЛАГ I",
    accent: "oklch(0.35 0.02 240)",
    secondary: "oklch(0.25 0.01 60)",
    tint: "oklch(0.92 0.008 220)",    // cool frost
    motif: "barbed",
    subtitle: "ЛАГЕРЬ · CAMP I",
  },
  4: {
    name: "АРХИПЕЛАГ II",
    accent: "oklch(0.35 0.02 240)",
    secondary: "oklch(0.25 0.01 60)",
    tint: "oklch(0.90 0.008 220)",
    motif: "barbed",
    subtitle: "ЛАГЕРЬ · CAMP II",
  },
  5: {
    name: "АРХИПЕЛАГ III",
    accent: "oklch(0.35 0.02 240)",
    secondary: "oklch(0.25 0.01 60)",
    tint: "oklch(0.91 0.008 220)",
    motif: "barbed",
    subtitle: "ЛАГЕРЬ · CAMP III",
  },
  6: {
    // Bulgakov — midnight + moon silver
    name: "Мастер",
    accent: "oklch(0.45 0.09 280)",
    secondary: "oklch(0.75 0.02 90)",
    tint: "oklch(0.89 0.015 280)",    // pale moonlit paper
    motif: "stars",
    subtitle: "МОСКВА · MOSCOW",
  },
  7: {
    name: "Маргарита",
    accent: "oklch(0.45 0.09 280)",
    secondary: "oklch(0.75 0.02 90)",
    tint: "oklch(0.88 0.018 280)",
    motif: "stars",
    subtitle: "ПОЛЁТ · THE FLIGHT",
  },
  8: {
    // Café Bulgakov — amber, green banker's lamp, tablecloth
    name: "Кафе «Булгаков»",
    accent: "oklch(0.45 0.12 145)",   // banker's green
    secondary: "oklch(0.55 0.14 60)", // amber
    tint: "oklch(0.90 0.035 75)",     // warm candlelight
    motif: "cafe",
    subtitle: "ЛИТЕРАТУРНОЕ КАФЕ · LITERARY CAFÉ",
  },
};

// Decorative motif band rendered above room content
function MotifBand({ type, accent, secondary }){
  if (type === "rushnyk"){
    // Red & black Ukrainian embroidery (rushnyk) pattern
    return (
      <svg viewBox="0 0 400 28" preserveAspectRatio="none" style={{width:"100%",height:22,display:"block",marginBottom:14}}>
        <defs>
          <pattern id="rushnyk" x="0" y="0" width="40" height="28" patternUnits="userSpaceOnUse">
            <rect width="40" height="28" fill="transparent"/>
            <path d="M 4,14 L 10,4 L 16,14 L 10,24 Z M 24,14 L 30,4 L 36,14 L 30,24 Z"
              fill={accent} opacity="0.85"/>
            <path d="M 14,14 L 20,8 L 26,14 L 20,20 Z" fill={secondary || "oklch(0.18 0.01 60)"} opacity="0.85"/>
            <circle cx="10" cy="14" r="1.5" fill="oklch(0.95 0.02 80)"/>
            <circle cx="30" cy="14" r="1.5" fill="oklch(0.95 0.02 80)"/>
          </pattern>
        </defs>
        <rect width="400" height="28" fill="url(#rushnyk)"/>
      </svg>
    );
  }
  if (type === "coffee"){
    return (
      <svg viewBox="0 0 400 28" preserveAspectRatio="none" style={{width:"100%",height:20,display:"block",marginBottom:14}}>
        <defs>
          <pattern id="redact-strip" x="0" y="0" width="60" height="28" patternUnits="userSpaceOnUse">
            <rect x="4" y="10" width="32" height="8" fill="oklch(0.18 0.01 60)"/>
            <rect x="42" y="10" width="14" height="8" fill="oklch(0.18 0.01 60)"/>
          </pattern>
        </defs>
        <rect width="400" height="28" fill="url(#redact-strip)" opacity="0.85"/>
      </svg>
    );
  }
  if (type === "barbed"){
    return (
      <svg viewBox="0 0 400 22" preserveAspectRatio="none" style={{width:"100%",height:18,display:"block",marginBottom:14}}>
        <line x1="0" y1="11" x2="400" y2="11" stroke={accent} strokeWidth="1.2"/>
        {Array.from({length:20}).map((_,i) => (
          <g key={i} transform={`translate(${i*20 + 10}, 11) rotate(${i%2?30:-30})`}>
            <line x1="-6" y1="0" x2="6" y2="0" stroke={accent} strokeWidth="1.2"/>
            <line x1="0" y1="-4" x2="0" y2="4" stroke={accent} strokeWidth="1.2"/>
          </g>
        ))}
      </svg>
    );
  }
  if (type === "stars"){
    return (
      <svg viewBox="0 0 400 28" preserveAspectRatio="none" style={{width:"100%",height:22,display:"block",marginBottom:14}}>
        {Array.from({length:30}).map((_,i) => {
          const x = (i * 13.3 + (i%3)*4) % 400;
          const y = 4 + (i*7 % 20);
          const r = (i % 3) * 0.5 + 0.8;
          return <circle key={i} cx={x} cy={y} r={r} fill={accent} opacity={0.4 + (i%4)*0.15}/>;
        })}
        <path d="M 90,14 L 94,8 L 98,14 L 94,20 Z M 240,10 L 244,4 L 248,10 L 244,16 Z M 330,18 L 334,12 L 338,18 L 334,24 Z"
          fill={secondary} opacity="0.9"/>
      </svg>
    );
  }
  if (type === "cafe"){
    return (
      <div style={{
        width:"100%",height:22,marginBottom:14,
        backgroundImage:`repeating-linear-gradient(
          45deg,
          ${accent} 0 10px,
          oklch(0.95 0.02 80) 10px 20px,
          ${secondary} 20px 30px,
          oklch(0.95 0.02 80) 30px 40px
        )`,
        opacity:0.35
      }}/>
    );
  }
  if (type === "samizdat"){
    return (
      <div style={{
        width:"100%",height:14,marginBottom:14,
        borderTop:`1px solid ${accent}`,
        borderBottom:`1px dashed ${accent}`,
        backgroundImage:`repeating-linear-gradient(90deg, transparent 0 8px, ${accent} 8px 9px)`,
        opacity:0.4
      }}/>
    );
  }
  return null;
}

window.THEMES = THEMES;
window.MotifBand = MotifBand;
