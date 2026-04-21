// New signature interactions: typewriter text, parallax Moscow flight, frozen breath, spoon carving

const { useState: useSi, useEffect: useEi, useRef: useRi } = React;

// ============ Redacted text — click (or tap) to declassify ============
// Inline redaction: wraps a piece of running text with a black censor bar.
// Click / tap / keyboard-activate to reveal. Once revealed, a small mono
// "[РАССЕКРЕЧЕНО]" marker appears, matching the exhibit's archival tone.
function Redacted({ children, tone = "ink", lang }){
  const [revealed, setRevealed] = useSi(false);
  const bar = tone === "paper" ? "var(--paper)" : "var(--redact)";
  return (
    <span
      role="button"
      tabIndex={revealed ? -1 : 0}
      aria-label={revealed ? undefined : (lang === 'en' ? "Click to declassify" : "Нажмите, чтобы рассекретить")}
      onClick={() => setRevealed(true)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRevealed(true); } }}
      style={{
        position:"relative",
        display:"inline",
        cursor: revealed ? "default" : "pointer",
        background: revealed ? "transparent" : bar,
        color: revealed ? "inherit" : bar,
        padding: revealed ? "0" : "0 3px",
        boxShadow: revealed ? "none" : "0 0 0 1px oklch(0.08 0.005 60) inset",
        transition: "background 450ms ease-out, color 450ms ease-out, box-shadow 450ms ease-out",
        whiteSpace:"normal"
      }}>
      {children}
      {revealed && (
        <sup style={{
          fontFamily:"var(--mono)",fontSize:"0.55em",letterSpacing:"0.2em",
          color:"var(--stamp)",marginLeft:6,verticalAlign:"super",
          opacity:0.75,fontWeight:700,fontStyle:"normal"
        }}>
          [{lang === 'en' ? 'DECLASSIFIED' : 'РАССЕКРЕЧЕНО'}]
        </sup>
      )}
    </span>
  );
}
window.Redacted = Redacted;

// ============ Redacted block — whole paragraph / quote behind a bar ============
// Renders its children, then lays an opaque "REDACTED" plate on top that the
// viewer can click to dissolve. Used for Kuzëmin's full law in Room 3.
function RedactedBlock({ children, lang }){
  const [revealed, setRevealed] = useSi(false);
  return (
    <div style={{position:"relative"}}>
      {children}
      {!revealed && (
        <button
          onClick={() => setRevealed(true)}
          aria-label={lang === 'en' ? "Declassify this passage" : "Рассекретить этот фрагмент"}
          style={{
            position:"absolute",inset:0,
            background:"var(--redact)",
            border:"2px solid oklch(0.08 0.005 60)",
            boxShadow:"inset 0 0 0 4px oklch(0.14 0.005 60), 4px 5px 0 var(--paper-shadow)",
            color:"oklch(0.85 0.02 70)",
            cursor:"pointer",
            display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",
            padding:"24px",
            fontFamily:"var(--mono)",
            letterSpacing:"0.3em",fontWeight:700,
            textTransform:"uppercase",
            gap:10,
            transition:"opacity 500ms ease-out, transform 500ms ease-out"
          }}>
          <span style={{
            fontSize:"clamp(14px, 1.6vw, 18px)",
            color:"oklch(0.55 0.14 28)",
            borderBottom:"1px solid oklch(0.55 0.14 28)",paddingBottom:6
          }}>
            {lang === 'en' ? '⛔ CLASSIFIED · TOP SECRET' : '⛔ СЕКРЕТНО · ОСОБАЯ ПАПКА'}
          </span>
          <span style={{
            fontSize:"clamp(10px, 1.1vw, 12px)",
            opacity:0.7,letterSpacing:"0.2em"
          }}>
            {lang === 'en' ? '▸ click to declassify ◂' : '▸ нажмите, чтобы рассекретить ◂'}
          </span>
        </button>
      )}
      {revealed && (
        <div style={{
          position:"absolute",top:-14,right:14,
          fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.2em",
          color:"var(--stamp)",fontWeight:700,
          background:"var(--paper-2)",padding:"3px 10px",
          border:"1px solid var(--stamp)",
          animation:"redactFadeIn 500ms ease-out"
        }}>
          {lang === 'en' ? '[DECLASSIFIED]' : '[РАССЕКРЕЧЕНО]'}
        </div>
      )}
      {/* Local keyframes live in each component so interactions.jsx remains
          self-contained; duplicates are harmless since names match. */}
      <style>{`@keyframes redactFadeIn { from { opacity: 0; transform: translateY(-4px) rotate(-3deg);} to { opacity: 1; transform: translateY(0) rotate(-3deg);} }`}</style>
    </div>
  );
}
window.RedactedBlock = RedactedBlock;

// ============ Typewriter cursor — Dovlatov's editorial office ============
// Replaces the mouse pointer with a blinking typewriter caret while the
// host room is mounted. Desktop + hover-capable devices only; skipped on
// touch so mobile users keep their normal tap interaction.
function TypewriterCursor(){
  const supportsHover = React.useMemo(() => {
    try { return window.matchMedia('(hover: hover) and (pointer: fine)').matches; }
    catch { return false; }
  }, []);
  const [pos, setPos] = useSi({x: -100, y: -100});
  const [visible, setVisible] = useSi(false);
  const [blink, setBlink] = useSi(true);

  useEi(() => {
    if (!supportsHover) return;
    const move = (e) => { setPos({x: e.clientX, y: e.clientY}); setVisible(true); };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [supportsHover]);

  useEi(() => {
    if (!supportsHover) return;
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, [supportsHover]);

  if (!supportsHover) return null;
  return (
    <>
      {/* Force cursor:none on every element inside the room. Scoped via a
          custom attribute on <html> so other rooms never see this. */}
      <style>{`
        html[data-typewriter-cursor="1"],
        html[data-typewriter-cursor="1"] * { cursor: none !important; }
      `}</style>
      <CursorAttr/>
      <div aria-hidden="true" style={{
        position:"fixed",
        top: pos.y - 11, left: pos.x - 1,
        width: 2, height: 22,
        background: blink ? "var(--ink)" : "transparent",
        boxShadow: blink ? "0 0 0 0.5px oklch(0.18 0.01 60 / 0.4)" : "none",
        pointerEvents:"none",
        zIndex: 2000,
        opacity: visible ? 1 : 0,
        transition:"opacity 80ms linear"
      }}/>
    </>
  );
}
// Attaches / removes data-typewriter-cursor on <html>. Split out so the
// mount/unmount lifecycle is guaranteed even when parent re-renders.
function CursorAttr(){
  useEi(() => {
    document.documentElement.setAttribute('data-typewriter-cursor', '1');
    return () => document.documentElement.removeAttribute('data-typewriter-cursor');
  }, []);
  return null;
}
window.TypewriterCursor = TypewriterCursor;

// ============ Money rain — Woland's Variety Theater shower of rubles ============
// Plays once per session when Room 6 mounts: 20 Soviet banknotes fall from
// above, wobble as they rotate, and at ~70 % fade to blank paper — the same
// fate they meet in the novel the morning after the séance.
function MoneyRain(){
  const [mounted, setMounted] = useSi(false);
  useEi(() => {
    let alreadySeen = false;
    try { alreadySeen = !!sessionStorage.getItem('seen_money_rain'); } catch {}
    if (alreadySeen) return;
    try { sessionStorage.setItem('seen_money_rain', '1'); } catch {}
    setMounted(true);
    const t = setTimeout(() => setMounted(false), 5800);
    return () => clearTimeout(t);
  }, []);
  if (!mounted) return null;

  const notes = Array.from({length: 22}, (_, i) => ({
    i,
    left: (i * 41 + 7) % 100,
    delay: (i * 0.23) % 2.8,
    duration: 3.4 + ((i * 0.17) % 1.7),
    tilt: ((i * 37) % 70) - 35,
    spin: 180 + ((i * 53) % 280)
  }));

  return (
    <div aria-hidden="true" style={{
      position:"fixed",inset:0,pointerEvents:"none",
      zIndex:1003,overflow:"hidden"
    }}>
      {notes.map(n => (
        <div key={n.i} style={{
          position:"absolute",
          top:"-80px",
          left:`${n.left}%`,
          width:84,height:40,
          transform:`rotate(${n.tilt}deg)`,
          animation:`rubleFall ${n.duration}s ${n.delay}s cubic-bezier(.4,.05,.6,.95) forwards`,
          ['--spin']: `${n.spin}deg`
        }}>
          <Ruble note={n.i}/>
        </div>
      ))}
      <style>{`
        @keyframes rubleFall {
          0%   { transform: translateY(-40px) rotate(0deg);  opacity: 1; filter: none; }
          65%  { transform: translateY(70vh) rotate(var(--spin)); opacity: 1; filter: none; }
          80%  { opacity: 0.9; filter: saturate(0.3) brightness(1.4); }
          100% { transform: translateY(102vh) rotate(var(--spin)); opacity: 0; filter: saturate(0) brightness(1.6); }
        }
      `}</style>
    </div>
  );
}
window.MoneyRain = MoneyRain;

function Ruble({ note = 0 }){
  // Two stylized note faces alternate — a червонец-style red and a
  // десятка-style plum. Readable at 84 × 40 px but not impersonating
  // real currency at any scale.
  const red = note % 2 === 0;
  const bg = red ? "oklch(0.78 0.14 30)" : "oklch(0.55 0.12 340)";
  const ink = red ? "oklch(0.25 0.12 25)" : "oklch(0.22 0.08 320)";
  return (
    <svg viewBox="0 0 84 40" width="84" height="40" style={{
      filter:"drop-shadow(0 2px 3px oklch(0.2 0.02 40 / 0.4))"
    }}>
      <rect x="1" y="1" width="82" height="38" fill={bg} stroke={ink} strokeWidth="1"/>
      <rect x="4" y="4" width="76" height="32" fill="none" stroke={ink} strokeWidth="0.5" strokeDasharray="1,2"/>
      {/* Guilloché rosette */}
      <circle cx="18" cy="20" r="9" fill="none" stroke={ink} strokeWidth="0.6"/>
      <circle cx="18" cy="20" r="6" fill="none" stroke={ink} strokeWidth="0.6"/>
      <circle cx="18" cy="20" r="3" fill="none" stroke={ink} strokeWidth="0.6"/>
      <text x="18" y="23" textAnchor="middle" fontFamily="serif" fontSize="9" fontWeight="700" fill={ink}>10</text>
      {/* Value plate right */}
      <text x="62" y="17" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="700" fill={ink}>10</text>
      <text x="62" y="28" textAnchor="middle" fontFamily="serif" fontSize="5" fontWeight="700" fill={ink} letterSpacing="1">РУБЛЕЙ</text>
      {/* Center strip */}
      <text x="42" y="14" textAnchor="middle" fontFamily="monospace" fontSize="4" fill={ink} letterSpacing="1.5">{red ? "ЧЕРВОНЕЦ" : "ДЕСЯТЬ"}</text>
      <line x1="30" y1="30" x2="54" y2="30" stroke={ink} strokeWidth="0.5"/>
      <text x="42" y="36" textAnchor="middle" fontFamily="monospace" fontSize="3" fill={ink} opacity="0.7" letterSpacing="1">ГОСБАНК СССР</text>
    </svg>
  );
}

// ============ Frost overlay — Solzhenitsyn's taiga at the viewport edges ============
// Renders a fixed-position semi-transparent frost around the whole viewport.
// `intensity` runs 0 → 1; Room 3 uses 0.4, Room 4 uses 0.7, Room 5 uses 1.0
// so the cold visibly deepens as the viewer walks further into the camp.
function FrostOverlay({ intensity = 1 }){
  const alpha = 0.06 + intensity * 0.08;          // 0.06 – 0.14
  const crystalOp = 0.12 + intensity * 0.18;      // 0.12 – 0.30
  const edge = 12 + intensity * 6;                // vignette thickness %
  return (
    <div aria-hidden="true" style={{
      position:"fixed",inset:0,pointerEvents:"none",zIndex:1002,
      background:`
        linear-gradient(180deg, oklch(0.98 0.02 235 / ${alpha}) 0%, transparent ${edge}%),
        linear-gradient(0deg,   oklch(0.98 0.02 235 / ${alpha}) 0%, transparent ${edge}%),
        linear-gradient(90deg,  oklch(0.98 0.02 235 / ${alpha*0.8}) 0%, transparent ${edge*0.7}%),
        linear-gradient(270deg, oklch(0.98 0.02 235 / ${alpha*0.8}) 0%, transparent ${edge*0.7}%)
      `
    }}>
      {/* Corner frost crystals — SVG fern patterns */}
      <svg viewBox="0 0 1000 600" preserveAspectRatio="none" style={{
        position:"absolute",inset:0,width:"100%",height:"100%",
        opacity: crystalOp,
        animation:"frostBreathe 14s ease-in-out infinite"
      }}>
        <defs>
          <linearGradient id="frostGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="oklch(0.98 0.03 235)" stopOpacity="0.9"/>
            <stop offset="1" stopColor="oklch(0.9 0.04 230)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Top-left fern */}
        <g fill="url(#frostGrad)" stroke="oklch(0.95 0.03 235)" strokeWidth="0.5" opacity="0.9">
          <path d="M0,0 L60,4 L52,18 L40,14 L30,30 L24,20 L12,32 L8,18 Z"/>
          <path d="M0,40 L30,48 L26,60 L18,56 L14,66 L10,58 Z"/>
          <path d="M40,0 L56,16 L48,22 L44,12 Z"/>
        </g>
        {/* Top-right */}
        <g transform="translate(1000,0) scale(-1,1)" fill="url(#frostGrad)" stroke="oklch(0.95 0.03 235)" strokeWidth="0.5" opacity="0.9">
          <path d="M0,0 L70,6 L62,22 L48,16 L36,36 L28,22 L16,38 L10,22 Z"/>
          <path d="M0,46 L36,54 L30,68 L22,62 L16,74 L12,64 Z"/>
        </g>
        {/* Bottom-left */}
        <g transform="translate(0,600) scale(1,-1)" fill="url(#frostGrad)" stroke="oklch(0.95 0.03 235)" strokeWidth="0.5" opacity="0.85">
          <path d="M0,0 L50,8 L44,22 L32,18 L22,32 L16,22 L8,32 L4,18 Z"/>
          <path d="M0,44 L28,50 L22,60 Z"/>
        </g>
        {/* Bottom-right */}
        <g transform="translate(1000,600) scale(-1,-1)" fill="url(#frostGrad)" stroke="oklch(0.95 0.03 235)" strokeWidth="0.5" opacity="0.85">
          <path d="M0,0 L64,6 L54,22 L42,18 L32,34 L24,24 L14,36 L8,22 Z"/>
          <path d="M0,46 L34,54 L28,66 L20,62 Z"/>
        </g>
      </svg>
      <style>{`
        @keyframes frostBreathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
window.FrostOverlay = FrostOverlay;

// ============ Typewriter text reveal (triggered on scroll) ============
function TypewriterReveal({ text, speed = 30, style }){
  const [shown, setShown] = useSi("");
  const [active, setActive] = useSi(false);
  const ref = useRi(null);
  useEi(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) setActive(true);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEi(() => {
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return <span ref={ref} style={style}>{shown}{active && shown.length < text.length && <span style={{animation:"blink 0.8s infinite",opacity:0.7}}>▊</span>}</span>;
}
window.TypewriterReveal = TypewriterReveal;

// ============ Margarita's flight over Moscow (parallax scroll) ============
function MargaritaFlight({ lang }){
  const [scroll, setScroll] = useSi(0);
  const ref = useRi(null);
  useEi(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress from when top enters view to when bottom leaves
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      setScroll(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const moonX = 60 + scroll * 20;
  const margX = 5 + scroll * 90;
  const margY = 55 - Math.sin(scroll * Math.PI) * 25;

  return (
    <div ref={ref} style={{
      position:"relative",height:"clamp(340px, 46vw, 520px)",
      margin:"36px 0",overflow:"hidden",
      background:"linear-gradient(180deg, oklch(0.15 0.04 280) 0%, oklch(0.22 0.05 300) 50%, oklch(0.18 0.06 320) 100%)",
      border:"2px solid var(--ink)",
      boxShadow:"3px 4px 0 var(--paper-shadow)"
    }}>
      {/* stars */}
      <div style={{
        position:"absolute",inset:0,
        backgroundImage:`
          radial-gradient(1px 1px at 20% 30%, oklch(0.95 0.02 75), transparent),
          radial-gradient(1px 1px at 45% 15%, oklch(0.9 0.03 75), transparent),
          radial-gradient(1px 1px at 70% 45%, oklch(0.95 0.02 75), transparent),
          radial-gradient(1px 1px at 85% 20%, oklch(0.9 0.02 75), transparent),
          radial-gradient(1.5px 1.5px at 30% 60%, oklch(0.95 0.02 75), transparent),
          radial-gradient(1px 1px at 55% 75%, oklch(0.85 0.02 75), transparent),
          radial-gradient(1px 1px at 15% 85%, oklch(0.9 0.02 75), transparent)
        `,
        backgroundSize:"100% 100%",opacity:0.8
      }}/>
      {/* moon */}
      <div style={{
        position:"absolute",top:"18%",left:`${moonX}%`,
        width:72,height:72,borderRadius:"50%",
        background:"radial-gradient(circle at 35% 35%, oklch(0.95 0.06 90), oklch(0.78 0.08 70))",
        boxShadow:"0 0 60px oklch(0.85 0.1 80 / 0.4), 0 0 120px oklch(0.75 0.1 70 / 0.25)",
        transform:"translateX(-50%)",
        transition:"left 0.1s linear"
      }}/>
      {/* Moscow skyline silhouette (far) */}
      <svg viewBox="0 0 1200 200" preserveAspectRatio="none" style={{
        position:"absolute",bottom:0,left:0,width:"100%",height:"55%",
        transform:`translateX(${-scroll * 40}px)`
      }}>
        <path d="M0,200 L0,150 L40,150 L40,120 L80,120 L80,140 L120,140 L120,100 L160,100 L160,130 L200,130 L200,90 L220,90 L220,70 L240,50 L260,70 L260,90 L300,90 L300,130 L360,130 L360,110 L400,110 L400,140 L460,140 L460,105 L480,105 L500,85 L520,105 L520,140 L580,140 L580,115 L620,115 L620,95 L640,75 L660,95 L660,130 L720,130 L720,100 L760,100 L760,135 L820,135 L820,90 L840,90 L860,70 L880,90 L880,130 L940,130 L940,110 L980,110 L980,145 L1040,145 L1040,100 L1080,100 L1080,135 L1140,135 L1140,115 L1200,115 L1200,200 Z" fill="oklch(0.1 0.02 280)"/>
        {/* Kremlin stars */}
        <circle cx="250" cy="48" r="2.5" fill="oklch(0.7 0.2 25)"/>
        <circle cx="650" cy="72" r="2" fill="oklch(0.7 0.2 25)"/>
        <circle cx="850" cy="68" r="2" fill="oklch(0.7 0.2 25)"/>
      </svg>
      {/* Near skyline */}
      <svg viewBox="0 0 1200 140" preserveAspectRatio="none" style={{
        position:"absolute",bottom:0,left:0,width:"100%",height:"32%",
        transform:`translateX(${-scroll * 120}px)`
      }}>
        <path d="M0,140 L0,80 L60,80 L60,60 L120,60 L120,90 L200,90 L200,50 L260,50 L260,75 L340,75 L340,45 L400,45 L400,70 L480,70 L480,55 L560,55 L560,85 L640,85 L640,40 L720,40 L720,65 L800,65 L800,80 L880,80 L880,50 L960,50 L960,75 L1040,75 L1040,60 L1120,60 L1120,85 L1200,85 L1200,140 Z" fill="oklch(0.06 0.02 280)"/>
      </svg>
      {/* Margarita on broom */}
      <div style={{
        position:"absolute",left:`${margX}%`,top:`${margY}%`,
        transform:"translate(-50%, -50%) rotate(-5deg)",
        transition:"left 0.1s linear, top 0.1s linear",
        filter:"drop-shadow(0 0 12px oklch(0.9 0.1 75 / 0.5))"
      }}>
        <svg width="130" height="60" viewBox="0 0 130 60">
          {/* broom */}
          <rect x="10" y="30" width="70" height="3" fill="oklch(0.35 0.05 40)" transform="rotate(-8 45 32)"/>
          <g transform="rotate(-8 45 32)">
            <path d="M0,32 L12,26 L12,40 Z" fill="oklch(0.55 0.08 55)"/>
            <line x1="0" y1="32" x2="-6" y2="28" stroke="oklch(0.55 0.08 55)" strokeWidth="1"/>
            <line x1="0" y1="32" x2="-6" y2="34" stroke="oklch(0.55 0.08 55)" strokeWidth="1"/>
            <line x1="0" y1="32" x2="-8" y2="32" stroke="oklch(0.55 0.08 55)" strokeWidth="1"/>
            <line x1="0" y1="32" x2="-6" y2="36" stroke="oklch(0.55 0.08 55)" strokeWidth="1"/>
          </g>
          {/* figure */}
          <g transform="translate(60, 18)">
            <path d="M10,0 Q20,5 18,18 Q12,25 5,22 Q0,15 10,0 Z" fill="oklch(0.25 0.02 320)"/>
            <circle cx="12" cy="6" r="4" fill="oklch(0.85 0.03 60)"/>
            {/* hair trailing */}
            <path d="M12,3 Q22,-2 34,4 Q28,6 14,7 Z" fill="oklch(0.35 0.06 40)"/>
          </g>
        </svg>
      </div>
      {/* caption */}
      <div style={{
        position:"absolute",top:20,left:20,right:20,
        fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
        color:"oklch(0.85 0.04 75)",opacity:0.7
      }}>
        {lang==='en'?"SCROLL · MARGARITA'S FLIGHT OVER MOSCOW":"ПРОКРУЧИВАЙТЕ · ПОЛЁТ МАРГАРИТЫ НАД МОСКВОЙ"}
      </div>
      <div style={{
        position:"absolute",bottom:18,left:20,right:20,
        fontFamily:"var(--serif)",fontSize:"clamp(16px, 2vw, 22px)",
        fontStyle:"italic",color:"oklch(0.92 0.03 75)",
        textShadow:"0 2px 8px oklch(0.1 0.02 280)",textAlign:"center",lineHeight:1.4
      }}>
        «{lang==='en'
          ? "Invisible and free! Invisible and free!"
          : "Невидима и свободна! Невидима и свободна!"}»
      </div>
    </div>
  );
}
window.MargaritaFlight = MargaritaFlight;

// ============ Cold breath counter: drag to see warmth/cold ============
function FrozenRation({ lang }){
  const [drag, setDrag] = useSi(50);
  // 100 = warm, 0 = frozen. Shows ration weight in grams.
  const grams = Math.round(200 + (100 - drag) * 4); // 200-600g
  const temp = Math.round(-30 + (drag/100) * 45); // -30 to 15

  return (
    <div style={{
      background:"linear-gradient(180deg, oklch(0.88 0.015 240) 0%, oklch(0.82 0.02 230) 100%)",
      padding:"clamp(24px, 4vw, 40px)",margin:"32px 0",
      border:"1px solid var(--ink-soft)",boxShadow:"3px 4px 0 var(--paper-shadow)",
      position:"relative",overflow:"hidden"
    }}>
      {/* frost edges */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        background:`
          radial-gradient(ellipse at 0% 0%, oklch(0.95 0.01 240 / ${(100-drag)/200}) 0%, transparent 30%),
          radial-gradient(ellipse at 100% 100%, oklch(0.95 0.01 240 / ${(100-drag)/200}) 0%, transparent 30%)
        `
      }}/>
      <div style={{position:"relative"}}>
        <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",color:"var(--stamp)",fontWeight:700,marginBottom:4}}>
          {lang==='en' ? "INTERACTIVE · THE RATION" : "ИНТЕРАКТИВ · ПАЙКА"}
        </div>
        <div style={{fontFamily:"var(--serif)",fontSize:"clamp(22px, 2.4vw, 28px)",fontWeight:700,marginBottom:8}}>
          {lang==='en'?"How cold was the bread?":"Насколько холодным был хлеб?"}
        </div>
        <div style={{fontFamily:"var(--typed)",fontSize:13,fontStyle:"italic",color:"var(--ink-soft)",marginBottom:24}}>
          {lang==='en'
            ? "Slide the thermometer. See what Shukhov's ration weighed at each temperature the brigade walked through."
            : "Подвиньте термометр. Посмотрите, сколько весила пайка Шухова при каждой температуре, через которую шла бригада."}
        </div>

        <div style={{
          display:"grid",gridTemplateColumns:"1fr auto",gap:"clamp(20px, 4vw, 40px)",alignItems:"center"
        }}>
          <div>
            {/* thermometer */}
            <div style={{marginBottom:14}}>
              <div style={{
                display:"flex",justifyContent:"space-between",
                fontFamily:"var(--mono)",fontSize:10,color:"var(--ink-soft)",letterSpacing:"0.15em",marginBottom:6
              }}>
                <span>−30°C</span><span>−7°C</span><span>+15°C</span>
              </div>
              <input type="range" min="0" max="100" value={drag}
                onChange={e => setDrag(parseInt(e.target.value,10))}
                style={{
                  width:"100%",accentColor:"var(--stamp)",cursor:"pointer"
                }}/>
              <div style={{
                fontFamily:"var(--serif)",fontSize:"clamp(40px, 6vw, 72px)",
                fontWeight:700,color:"var(--ink)",marginTop:8,lineHeight:1,
                fontVariantNumeric:"tabular-nums"
              }}>
                {temp > 0 ? "+" : ""}{temp}°<span style={{fontSize:"0.5em",color:"var(--ink-soft)"}}>C</span>
              </div>
            </div>
            <div style={{
              padding:"12px 16px",background:"var(--paper-2)",
              fontFamily:"var(--typed)",fontSize:14,lineHeight:1.6,
              borderLeft:"3px solid var(--stamp)"
            }}>
              {temp < -27 && (lang==='en'?"Brigades marched through −30°. Only at −41° were they held back.":"Бригады шли и при −30°. Только при −41° их задерживали.")}
              {temp >= -27 && temp < -10 && (lang==='en'?"The air freezes the rag around the bread. Shukhov unwraps it in his mitten.":"Воздух замораживает тряпицу вокруг хлеба. Шухов разворачивает её в рукавице.")}
              {temp >= -10 && temp < 5 && (lang==='en'?"Ordinary lagerkhod weather. 200g of bread and whatever kasha the ladler decides.":"Обычная лагерная погода. 200 г хлеба и сколько каши раздатчик решит.")}
              {temp >= 5 && (lang==='en'?"Summer labor. Bricklaying. Shukhov's day almost ends as 'happy'.":"Летний труд. Кладка стен. День Шухова почти заканчивается как «счастливый».")}
            </div>
          </div>

          {/* Bread block */}
          <div style={{textAlign:"center"}}>
            <div style={{
              width:"clamp(140px, 18vw, 200px)",height:"clamp(90px, 12vw, 130px)",
              background:`linear-gradient(180deg, oklch(${0.68 - (100-drag)/500} 0.09 ${60+((100-drag)/3)}), oklch(${0.58 - (100-drag)/500} 0.08 ${50+((100-drag)/3)}))`,
              borderRadius:"8px 10px 6px 12px",
              boxShadow:`0 0 0 2px oklch(0.25 0.02 40), 4px 6px 12px oklch(0.15 0.02 30 / 0.3), inset 0 0 ${(100-drag)/3}px oklch(0.95 0.01 240 / ${(100-drag)/150})`,
              position:"relative",margin:"0 auto 10px",
              filter: drag < 30 ? "contrast(1.1) brightness(0.9)" : "none"
            }}>
              {/* frost crystals */}
              {drag < 40 && Array.from({length:12}).map((_,i) => (
                <div key={i} style={{
                  position:"absolute",
                  top:`${(i*37)%90}%`,left:`${(i*53)%90}%`,
                  width:3,height:3,background:"oklch(0.95 0.01 240)",
                  opacity:(40-drag)/40,borderRadius:"50%",
                  boxShadow:"0 0 3px oklch(0.95 0.01 240)"
                }}/>
              ))}
            </div>
            <div style={{
              fontFamily:"var(--serif)",fontSize:"clamp(26px, 3.4vw, 40px)",fontWeight:700,lineHeight:1,
              fontVariantNumeric:"tabular-nums"
            }}>{grams} <span style={{fontSize:"0.5em",color:"var(--ink-soft)"}}>г</span></div>
            <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.2em",color:"var(--ink-soft)",marginTop:4,textTransform:"uppercase"}}>
              {lang==='en'?"daily ration":"дневная пайка"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.FrozenRation = FrozenRation;

// ============ Samizdat carbon-copy stack (decorative + clickable) ============
function CarbonStack({ lang }){
  const [depth, setDepth] = useSi(0);
  const layers = [
    { opacity:1, title:lang==='en'?"ORIGINAL MS":"ОРИГИНАЛ РУКОПИСИ", note:lang==='en'?"Author's typewriter · 1-ply":"Авторская машинка · 1-й слой" },
    { opacity:0.82, title:lang==='en'?"CARBON COPY 1":"КОПИЯ ЧЕРЕЗ КАЛЬКУ 1", note:lang==='en'?"Typed through carbon · 2-ply":"Через копирку · 2-й слой" },
    { opacity:0.64, title:lang==='en'?"CARBON COPY 2":"КОПИЯ 2", note:lang==='en'?"Dimmer ink · passed hand to hand":"Слабее чернила · из рук в руки" },
    { opacity:0.46, title:lang==='en'?"CARBON COPY 3":"КОПИЯ 3", note:lang==='en'?"Barely legible · last reader":"Едва читаемо · последний читатель" },
  ];
  return (
    <div style={{
      margin:"32px 0",padding:"clamp(20px, 3vw, 32px)",
      background:"var(--paper-2)",border:"1px solid var(--ink-soft)",
      boxShadow:"3px 4px 0 var(--paper-shadow)"
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,marginBottom:20,flexWrap:"wrap"}}>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",color:"var(--stamp)",fontWeight:700,marginBottom:4}}>
            {lang==='en' ? "INTERACTIVE · SAMIZDAT CARBON COPIES" : "ИНТЕРАКТИВ · САМИЗДАТ · КОПИИ ЧЕРЕЗ КОПИРКУ"}
          </div>
          <div style={{fontFamily:"var(--serif)",fontSize:"clamp(22px, 2.4vw, 28px)",fontWeight:700,marginBottom:4}}>
            {lang==='en'?"Peel back the layers":"Разберите стопку"}
          </div>
          <div style={{fontFamily:"var(--typed)",fontSize:13,fontStyle:"italic",color:"var(--ink-soft)"}}>
            {lang==='en'
              ? "Each copy typed through carbon paper. By the fourth, text fades. Read and pass on."
              : "Каждая копия печаталась через кальку. К четвёртой текст блёкнет. Читай и передай другому."}
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {layers.map((_,i) => (
            <button key={i} onClick={() => setDepth(i)} style={{
              width:32,height:32,border:"1px solid var(--ink)",
              background: depth === i ? "var(--ink)" : "var(--paper)",
              color: depth === i ? "var(--paper)" : "var(--ink)",
              fontFamily:"var(--mono)",fontSize:12,cursor:"pointer",fontWeight:700
            }}>{i+1}</button>
          ))}
        </div>
      </div>
      <div style={{position:"relative",minHeight:260}}>
        {layers.map((l, i) => {
          const show = i >= depth;
          if (!show) return null;
          const d = i - depth;
          return (
            <div key={i} style={{
              position: d === 0 ? "relative" : "absolute",
              inset: d === 0 ? "auto" : 0,
              top: d === 0 ? "auto" : d*12,
              left: d === 0 ? "auto" : d*10,
              background:"oklch(0.9 0.02 75)",
              padding:"20px 24px",
              fontFamily:"var(--typed)",
              fontSize: d === 0 ? 15 : 14,lineHeight:1.7,
              color:`oklch(0.2 0.01 60 / ${l.opacity})`,
              boxShadow: d === 0 ? "2px 3px 0 var(--paper-shadow)" : "2px 3px 8px oklch(0.2 0.01 60 / 0.2)",
              border:"1px solid oklch(0.75 0.02 70)",
              zIndex: 10 - d,
              transform: d === 0 ? "none" : `scale(${1 - d*0.02})`,
              transition:"all 0.25s ease-out",
              filter: d === 0 ? "none" : "blur(0.4px)"
            }}>
              <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.25em",color:"var(--stamp)",fontWeight:700,marginBottom:10}}>
                {l.title} · {l.note}
              </div>
              <p style={{margin:"0 0 8px"}}>
                Рукописи не горят. Рукописи не горят. Рукописи не горят.
              </p>
              <p style={{margin:"0 0 8px"}}>
                В лагере вот кто подыхает: кто миски лижет, кто на санчасть надеется да кто к куму ходит стучать.
              </p>
              <p style={{margin:"0 0 8px"}}>
                Прошёл день, ничем не омрачённый, почти счастливый.
              </p>
              <p style={{margin:"0 0 0",fontStyle:"italic"}}>
                {lang==='en'?"... Read and pass it on.":"... Читай и передай другому."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
window.CarbonStack = CarbonStack;
