// Shared samizdat primitives

const { useState, useEffect, useRef, useMemo, useContext, createContext } = React;

// ============ Language context ============
const LangContext = createContext({ lang: 'ru', setLang: () => {} });
window.LangContext = LangContext;

// Bilingual helper: `{ru: "...", en: "..."}` or just string
function T({ ru, en, children }){
  const { lang } = useContext(LangContext);
  if (children && typeof children === 'object' && children.ru){
    return lang === 'en' ? (children.en || children.ru) : children.ru;
  }
  if (ru !== undefined || en !== undefined) return lang === 'en' ? (en || ru) : ru;
  return children;
}

// ============ Rubber stamp ============
function Stamp({ children, color = "stamp", rotate = -4, size = 1, style = {}, className = "" }){
  const colorVar = color === "blue" ? "var(--accent-blue)" : "var(--stamp)";
  return (
    <div className={`stamp ${className}`} style={{
      display:"inline-block",
      border:`${3*size}px double ${colorVar}`,
      padding:`${4*size}px ${14*size}px`,
      fontFamily:"var(--typed)",
      fontWeight:700,
      color:colorVar,
      letterSpacing:"0.08em",
      fontSize:`${14*size}px`,
      transform:`rotate(${rotate}deg)`,
      textTransform:"uppercase",
      opacity:0.82,
      mixBlendMode:"multiply",
      position:"relative",
      ...style
    }}>
      <span style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence baseFrequency='0.8' numOctaves='1'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1.4 -0.5'/></filter><rect width='100' height='100' filter='url(%23n)'/></svg>\")",
        mixBlendMode:"screen",opacity:0.5
      }}></span>
      {children}
    </div>
  );
}

// ============ Room number plate ============
function RoomPlate({ num, total = 8, label, sub }){
  const { lang } = useContext(LangContext);
  return (
    <div style={{display:"flex",alignItems:"baseline",gap:24,flexWrap:"wrap",marginBottom:12}}>
      <div style={{
        fontFamily:"var(--serif)",fontSize:"clamp(80px, 14vw, 180px)",
        lineHeight:0.85,fontWeight:700,color:"var(--ink)",
        textShadow:"2px 2px 0 var(--paper-shadow)",letterSpacing:"-0.04em"
      }}>
        {String(num).padStart(2,"0")}
      </div>
      <div style={{flex:"1 1 300px"}}>
        <div style={{
          fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.3em",
          color:"var(--ink-soft)",textTransform:"uppercase",marginBottom:8,
          borderBottom:"1px dashed var(--ink-soft)",paddingBottom:6,display:"inline-block"
        }}>
          {lang === 'en' ? `HALL ${num} OF ${total}` : `ЗАЛ ${num} ИЗ ${total}`}
        </div>
        <div style={{
          fontFamily:"var(--serif)",fontSize:"clamp(28px, 3.6vw, 52px)",
          fontWeight:700,lineHeight:1.05,color:"var(--ink)",letterSpacing:"-0.01em"
        }}>{label}</div>
        {sub && <div style={{
          fontFamily:"var(--typed)",fontSize:"clamp(14px, 1.4vw, 18px)",
          marginTop:10,color:"var(--ink-soft)",fontStyle:"italic"
        }}>{sub}</div>}
      </div>
    </div>
  );
}

// Corner tag inside the Quote component — shows the quote's source language
// using the alphabet of the active UI language, so RU mode never leaks Latin.
function quoteLangTag(quoteLang, uiLang){
  const CYR = { ru: "РУС", ua: "УКР", en: "АНГЛ" };
  const LAT = { ru: "RU",  ua: "UA",  en: "EN"   };
  const table = uiLang === "en" ? LAT : CYR;
  return table[quoteLang] || (uiLang === "en" ? String(quoteLang).toUpperCase() : "");
}

// ============ Typewritten quote block ============
function Quote({ children, attr, lang: quoteLang = "ru", big = false, redacted = [] }){
  const { lang: uiLang } = useContext(LangContext);
  const content = typeof children === "string" ? children : "";
  return (
    <figure style={{
      margin:"28px 0",
      padding:"26px 32px 26px 40px",
      background:"var(--paper-2)",
      boxShadow:"2px 3px 0 var(--paper-shadow), 6px 8px 20px oklch(0.3 0.02 60 / 0.12)",
      borderLeft:"3px double var(--ink)",
      position:"relative",
      fontFamily:"var(--typed)",
      fontSize: big ? "clamp(20px, 2.2vw, 28px)" : "clamp(15px, 1.5vw, 18px)",
      lineHeight:1.55,
      color:"var(--ink)",
      transform:`rotate(${((attr||'').length % 3 - 1) * 0.18}deg)`
    }}>
      <div style={{
        position:"absolute",top:8,left:8,fontFamily:"var(--mono)",
        fontSize:10,color:"var(--ink-ghost)",letterSpacing:"0.2em"
      }}>» {quoteLangTag(quoteLang, uiLang)}</div>
      <blockquote style={{margin:"8px 0 0 0",fontStyle:"italic"}}>
        «{children}»
      </blockquote>
      {attr && <figcaption style={{
        marginTop:14,fontFamily:"var(--mono)",fontSize:12,
        color:"var(--ink-soft)",letterSpacing:"0.08em",textTransform:"uppercase"
      }}>— {attr}</figcaption>}
    </figure>
  );
}

// ============ Analysis / commentary paragraph ============
function Analysis({ children, label = "АНАЛИЗ" }){
  return (
    <div style={{
      display:"grid",gridTemplateColumns:"auto 1fr",gap:18,
      margin:"18px 0",alignItems:"start"
    }}>
      <div style={{
        fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
        color:"var(--stamp)",writingMode:"vertical-rl",transform:"rotate(180deg)",
        padding:"4px 2px",borderLeft:"1px solid var(--stamp)",borderRight:"1px solid var(--stamp)",
        height:"fit-content",fontWeight:700
      }}>{label}</div>
      <div style={{
        fontFamily:"var(--typed)",fontSize:"clamp(14px, 1.4vw, 17px)",
        lineHeight:1.75,color:"var(--ink-soft)"
      }}>{children}</div>
    </div>
  );
}

// ============ Exhibit card / vitrine ============
function Exhibit({ num, title, children, tint }){
  return (
    <article style={{
      background:`linear-gradient(180deg, var(--paper) 0%, ${tint || 'var(--paper-2)'} 100%)`,
      padding:"28px 32px",
      marginBottom:28,
      boxShadow:"0 1px 0 var(--paper-shadow), 4px 6px 16px oklch(0.3 0.02 60 / 0.1)",
      position:"relative",
      border:"1px solid oklch(0.78 0.02 70)"
    }}>
      <div style={{
        display:"flex",alignItems:"baseline",gap:14,marginBottom:14,
        borderBottom:"1px dashed var(--ink-soft)",paddingBottom:10
      }}>
        <div style={{
          fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.25em",
          color:"var(--stamp)",fontWeight:700
        }}>ЭКСПОНАТ №{num}</div>
        <div style={{
          fontFamily:"var(--serif)",fontSize:"clamp(20px, 2.2vw, 28px)",
          fontWeight:700,color:"var(--ink)",lineHeight:1.15,flex:1
        }}>{title}</div>
      </div>
      {children}
    </article>
  );
}

// ============ Audio player ============
// If `src` is a resolvable audio URL, we drive a real <audio> element.
// If `src` is falsy, the player renders in an "inactive" state — narration
// for this hall hasn't been recorded yet, but the slot stays wired so it
// can light up the moment a file is dropped in.
function fmtTime(s){
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

function AudioPlayer({ title, narrator, src, duration: durationHint }){
  const { lang } = useContext(LangContext);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const inactive = !src || failed;

  useEffect(() => {
    setReady(false); setFailed(false); setCurrent(0); setDuration(0); setPlaying(false);
  }, [src]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => setFailed(true));
    } else {
      a.pause();
    }
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * duration;
    setCurrent(a.currentTime);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div style={{
      background: inactive ? "oklch(0.28 0.008 60)" : "oklch(0.22 0.008 60)",
      color:"oklch(0.88 0.015 80)",
      padding:"14px 18px",display:"flex",alignItems:"center",gap:14,
      fontFamily:"var(--mono)",fontSize:12,
      border:"1px solid oklch(0.15 0.005 60)",
      boxShadow:"inset 0 1px 0 oklch(0.35 0.01 60), 2px 3px 0 var(--paper-shadow)",
      margin:"18px 0",
      opacity: inactive ? 0.65 : 1
    }}>
      <button
        onClick={togglePlay}
        disabled={inactive || !ready}
        aria-label={playing ? "Pause narration" : "Play narration"}
        style={{
          width:36,height:36,borderRadius:"50%",
          border:"1px solid oklch(0.6 0.01 60)",
          background:"oklch(0.18 0.005 60)",color:"oklch(0.9 0.015 80)",
          cursor: inactive || !ready ? "not-allowed" : "pointer",
          fontSize:14,flexShrink:0,
          opacity: inactive || !ready ? 0.55 : 1
        }}>
        {playing ? "❙❙" : "▶"}
      </button>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:10,opacity:0.6,letterSpacing:"0.2em",marginBottom:4}}>
          {(narrator || "АУДИОГИД")}{inactive && ` · ${failed
            ? (lang === 'en' ? "UNAVAILABLE" : "НЕДОСТУПНО")
            : (lang === 'en' ? "FORTHCOMING" : "СКОРО")}`}
        </div>
        <div style={{fontSize:13,marginBottom:6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
          {title}
        </div>
        <div
          onClick={inactive ? undefined : seek}
          style={{
            height:4,
            background:"oklch(0.35 0.01 60)",position:"relative",
            cursor: inactive ? "default" : "pointer"
          }}>
          <div style={{
            height:"100%",width:`${progress}%`,
            background: inactive ? "oklch(0.45 0.01 60)" : "var(--stamp)",
            transition:"width 0.15s linear"
          }}/>
        </div>
      </div>
      <div style={{fontSize:11,opacity:0.75,letterSpacing:"0.1em",fontVariantNumeric:"tabular-nums"}}>
        {fmtTime(current)} / {duration ? fmtTime(duration) : (durationHint || "—:—")}
      </div>
      {src && !failed && (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => { setDuration(e.currentTarget.duration); setReady(true); }}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setCurrent(0); }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

// ============ Bridge audio — an intermezzo between two authors ============
// Used at the end of Room 2 to carry the listener from Khvylovy/Dovlatov
// toward Solzhenitsyn. Visually distinct from the standard narration
// player: paper-toned, italic label-set, horizontal rules — reads as a
// marginal note, not a repeat of the main audio slot.
function BridgeAudio({ title, subtitle, src, duration: durationHint, label }){
  const { lang } = useContext(LangContext);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const inactive = !src || failed;

  useEffect(() => {
    setReady(false); setFailed(false); setCurrent(0); setDuration(0); setPlaying(false);
  }, [src]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setFailed(true));
    else a.pause();
  };
  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * duration;
    setCurrent(a.currentTime);
  };
  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <section style={{
      margin:"56px 0 8px",
      position:"relative"
    }}>
      {/* Top ornamental rule with centered label */}
      <div style={{
        position:"relative",
        borderTop:"1px dashed var(--ink-soft)",
        textAlign:"center",
        height:0
      }}>
        <span style={{
          position:"relative",
          top:-11,
          display:"inline-block",
          padding:"2px 18px",
          background:"var(--paper)",
          fontFamily:"var(--mono)",
          fontSize:10,letterSpacing:"0.45em",
          color:"var(--stamp)",
          fontWeight:700,
          textTransform:"uppercase"
        }}>
          ⟿ {label || (lang === 'en' ? "SYNTHESIS" : "СИНТЕЗ")} ⟿
        </span>
      </div>

      <div style={{
        background:"var(--paper-2)",
        padding:"clamp(20px, 3vw, 32px)",
        marginTop:6,
        borderLeft:"3px double var(--stamp)",
        borderRight:"3px double var(--stamp)",
        boxShadow:"inset 0 0 40px oklch(0.82 0.02 60 / 0.18)",
        fontFamily:"var(--typed)"
      }}>
        <div style={{
          fontFamily:"var(--serif)",
          fontStyle:"italic",
          fontSize:"clamp(18px, 2vw, 22px)",
          color:"var(--ink)",
          lineHeight:1.35,
          marginBottom: subtitle ? 6 : 14
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.2em",
            color:"var(--ink-soft)",textTransform:"uppercase",marginBottom:18
          }}>
            {subtitle}
          </div>
        )}

        <div style={{
          display:"flex",alignItems:"center",gap:14,
          paddingTop:10,
          borderTop:"1px dotted var(--ink-soft)"
        }}>
          <button
            onClick={togglePlay}
            disabled={inactive || !ready}
            aria-label={playing ? "Pause synthesis" : "Play synthesis"}
            style={{
              width:42,height:42,borderRadius:"50%",
              border:"1.5px solid var(--stamp)",
              background:"var(--paper)",color:"var(--stamp)",
              cursor: inactive || !ready ? "not-allowed" : "pointer",
              fontSize:15,flexShrink:0,fontWeight:700,
              boxShadow:"2px 2px 0 var(--paper-shadow)",
              opacity: inactive || !ready ? 0.5 : 1
            }}>
            {playing ? "❙❙" : "▶"}
          </button>
          <div style={{flex:1,minWidth:0}}>
            <div
              onClick={inactive ? undefined : seek}
              style={{
                height:2,background:"oklch(0.78 0.02 70)",position:"relative",
                cursor: inactive ? "default" : "pointer",
                marginBottom:4
              }}>
              <div style={{
                height:"100%",width:`${progress}%`,
                background:"var(--stamp)",
                transition:"width 0.15s linear"
              }}/>
            </div>
            <div style={{
              display:"flex",justifyContent:"space-between",
              fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.15em",
              color:"var(--ink-soft)",fontVariantNumeric:"tabular-nums"
            }}>
              <span>{inactive
                ? (failed
                    ? (lang === 'en' ? "UNAVAILABLE" : "НЕДОСТУПНО")
                    : (lang === 'en' ? "FORTHCOMING" : "СКОРО"))
                : (playing
                    ? (lang === 'en' ? "PLAYING" : "ИГРАЕТ")
                    : (lang === 'en' ? "READY"  : "ГОТОВО"))}</span>
              <span>{(function(){
                const f = (s)=>{ if(!isFinite(s)||s<0) return "0:00"; const m=Math.floor(s/60),r=Math.floor(s%60); return `${m}:${String(r).padStart(2,"0")}`; };
                return `${f(current)} / ${duration ? f(duration) : (durationHint || "—:—")}`;
              })()}</span>
            </div>
          </div>
        </div>

        {src && !failed && (
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            onLoadedMetadata={(e) => { setDuration(e.currentTarget.duration); setReady(true); }}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => { setPlaying(false); setCurrent(0); }}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {/* Bottom ornamental rule */}
      <div style={{
        borderBottom:"1px dashed var(--ink-soft)",
        marginTop:6
      }}/>
    </section>
  );
}

// ============ Torn paper edge divider ============
function TornEdge({ color = "var(--paper)", flip = false }){
  return (
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none" style={{
      width:"100%",height:24,display:"block",
      transform: flip ? "scaleY(-1)" : "none"
    }}>
      <path d="M0,0 L0,16 L30,10 L60,18 L90,8 L130,20 L170,12 L210,22 L250,10 L300,18 L350,6 L400,20 L450,14 L500,8 L550,22 L600,12 L650,18 L700,8 L750,20 L800,10 L850,18 L900,6 L950,22 L1000,12 L1050,18 L1100,8 L1150,20 L1200,12 L1200,0 Z" fill={color}/>
    </svg>
  );
}

// ============ Room shell ============
function Room({ num, label, sub, audio, children, onExit, onNav, totalRooms, tint }){
  const { lang } = useContext(LangContext);
  const theme = (window.THEMES && window.THEMES[num]) || {};
  const accent = theme.accent || "var(--stamp)";
  const secondary = theme.secondary;
  const bg = tint || theme.tint || "transparent";
  // Theme subtitle is { ru, en }; pick based on UI language.
  const subtitleText = theme.subtitle
    ? (typeof theme.subtitle === "string" ? theme.subtitle : (theme.subtitle[lang] || theme.subtitle.ru))
    : null;
  return (
    <div style={{
      minHeight:"100vh",padding:"40px clamp(20px, 5vw, 80px) 80px",
      background: bg,
      position:"relative"
    }}>
      {/* Ornamental corner brackets */}
      <RoomCorners accent={accent}/>
      <div style={{
        maxWidth:960,margin:"0 auto",position:"relative"
      }}>
        <TopBar onExit={onExit}/>
        {subtitleText && (
          <div style={{
            fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.4em",
            color:accent,textTransform:"uppercase",marginBottom:14,fontWeight:700,
            display:"inline-block",padding:"3px 10px",
            border:`1px solid ${accent}`,
            transform:"rotate(-0.4deg)"
          }}>
            {subtitleText}
          </div>
        )}
        {theme.motif && window.MotifBand && (
          <window.MotifBand type={theme.motif} accent={accent} secondary={secondary}/>
        )}
        <RoomPlate num={num} total={totalRooms} label={label} sub={sub} accent={accent}/>
        {audio && <AudioPlayer {...audio} accent={accent}/>}
        <div style={{marginTop:28}}>
          {children}
        </div>
        <RoomNav onNav={onNav} num={num} total={totalRooms}/>
      </div>
    </div>
  );
}

function RoomCorners({ accent }){
  const s = 34;
  const base = {position:"fixed",width:s,height:s,pointerEvents:"none",zIndex:5,opacity:0.75};
  const stroke = 2;
  return (
    <>
      <svg style={{...base,top:14,left:14}} viewBox="0 0 34 34">
        <path d={`M 2 12 L 2 2 L 12 2`} fill="none" stroke={accent} strokeWidth={stroke}/>
        <circle cx="2" cy="2" r="1.5" fill={accent}/>
      </svg>
      <svg style={{...base,top:14,right:14}} viewBox="0 0 34 34">
        <path d={`M 22 2 L 32 2 L 32 12`} fill="none" stroke={accent} strokeWidth={stroke}/>
        <circle cx="32" cy="2" r="1.5" fill={accent}/>
      </svg>
      <svg style={{...base,bottom:14,left:14}} viewBox="0 0 34 34">
        <path d={`M 2 22 L 2 32 L 12 32`} fill="none" stroke={accent} strokeWidth={stroke}/>
        <circle cx="2" cy="32" r="1.5" fill={accent}/>
      </svg>
      <svg style={{...base,bottom:14,right:14}} viewBox="0 0 34 34">
        <path d={`M 22 32 L 32 32 L 32 22`} fill="none" stroke={accent} strokeWidth={stroke}/>
        <circle cx="32" cy="32" r="1.5" fill={accent}/>
      </svg>
    </>
  );
}

function TopBar({ onExit }){
  const { lang, setLang } = useContext(LangContext);
  return (
    <div style={{
      display:"flex",justifyContent:"space-between",alignItems:"center",
      marginBottom:32,paddingBottom:14,borderBottom:"1px solid var(--ink-soft)"
    }}>
      <button onClick={onExit} style={{
        background:"transparent",border:"1px solid var(--ink)",padding:"8px 16px",
        fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.2em",
        color:"var(--ink)",cursor:"pointer",textTransform:"uppercase"
      }}>← {lang === 'en' ? "Floor plan" : "К плану"}</button>
      <div style={{display:"flex",gap:0,border:"1px solid var(--ink)"}}>
        <button onClick={() => setLang("ru")} style={{
          background: lang === "ru" ? "var(--ink)" : "transparent",
          color: lang === "ru" ? "var(--paper)" : "var(--ink)",
          border:"none",padding:"8px 14px",fontFamily:"var(--mono)",
          fontSize:11,letterSpacing:"0.15em",cursor:"pointer"
        }}>RU/UA</button>
        <button onClick={() => setLang("en")} style={{
          background: lang === "en" ? "var(--ink)" : "transparent",
          color: lang === "en" ? "var(--paper)" : "var(--ink)",
          border:"none",borderLeft:"1px solid var(--ink)",padding:"8px 14px",
          fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.15em",cursor:"pointer"
        }}>EN</button>
      </div>
    </div>
  );
}

function RoomNav({ onNav, num, total }){
  const { lang } = useContext(LangContext);
  const word = lang === 'en' ? 'Hall' : 'Зал';
  return (
    <div style={{
      marginTop:60,paddingTop:24,borderTop:"1px dashed var(--ink-soft)",
      display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"
    }}>
      {num > 0 ? (
        <button onClick={() => onNav(num - 1)} style={navBtn}>
          ← {word} {String(num-1).padStart(2,"0")}
        </button>
      ) : <span/>}
      <div style={{
        fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
        color:"var(--ink-soft)"
      }}>
        {num + 1} / {total + 1}
      </div>
      {num < total ? (
        <button onClick={() => onNav(num + 1)} style={navBtn}>
          {word} {String(num+1).padStart(2,"0")} →
        </button>
      ) : <span/>}
    </div>
  );
}
const navBtn = {
  background:"var(--paper-2)",border:"1px solid var(--ink)",padding:"12px 20px",
  fontFamily:"var(--mono)",fontSize:12,letterSpacing:"0.15em",
  color:"var(--ink)",cursor:"pointer",textTransform:"uppercase",
  boxShadow:"2px 2px 0 var(--ink)"
};

// Typing effect (for titles)
function Typed({ text, speed = 40, className, style }){
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <span className={className} style={style}>{shown}<span style={{opacity: shown.length < text.length ? 1 : 0,animation:"blink 0.8s infinite"}}>▊</span></span>;
}

Object.assign(window, {
  LangContext, T,
  Stamp, RoomPlate, Quote, Analysis, Exhibit,
  AudioPlayer, BridgeAudio, TornEdge, Room, Typed, RoomCorners
});
