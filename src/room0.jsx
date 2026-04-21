// Room 0: Entry / Introduction
function Room0({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  return (
    <Room num={0} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Entrance" : "Вход в экспозицию"}
      sub={lang==='en' ? "A general introduction" : "Общее введение"}
      audio={{
        title: lang==='en' ? "Welcome to the exhibit" : "Добро пожаловать на выставку",
        narrator: lang==='en' ? "АУДИОГИД · VESTIBULE" : "АУДИОГИД · ВЕСТИБЮЛЬ",
        src: window.AUDIO && window.AUDIO.vestibule,
        duration: "2:14"
      }}
    >
      <div style={{
        background:"var(--ink)",color:"var(--paper)",
        padding:"clamp(30px, 5vw, 70px)",position:"relative",marginBottom:40,
        backgroundImage:`linear-gradient(180deg, oklch(0.12 0.01 60 / 0.88), oklch(0.18 0.01 60 / 0.95)), url("${window.IMG.redSquare}")`,
        backgroundSize:"cover",backgroundPosition:"center",
        overflow:"hidden"
      }}>
        <SecretSlam/>
        <div style={{
          position:"absolute",top:20,right:20,fontFamily:"var(--mono)",
          fontSize:10,letterSpacing:"0.3em",opacity:0.5
        }}>{lang === 'en' ? "ROOM 00" : "ЗАЛ 00"}</div>
        <h2 style={{
          fontFamily:"var(--serif)",fontSize:"clamp(32px, 5vw, 56px)",
          margin:"0 0 28px",lineHeight:1.02,fontWeight:700,letterSpacing:"-0.02em"
        }}>
          {lang==='en'
            ? <><span style={{color:"var(--stamp-soft)"}}>Literature</span> as a weapon.<br/>The pen that could not be silenced.</>
            : <><span style={{color:"var(--stamp-soft)"}}>Литература</span> — скрытое оружие.<br/>Перо, которое невозможно заглушить.</>}
        </h2>
        <p style={{
          fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.6vw, 19px)",
          lineHeight:1.7,maxWidth:680,margin:"0 0 18px",opacity:0.92
        }}>
          {lang==='en'
            ? "In many works of the Soviet era, writers used literature as a hidden weapon against the regime. They could not always criticize power openly; it was dangerous, often fatal. So they spoke through symbols, humor, inner conflict, and absurd situations. That is precisely why their works acted so powerfully: the reader saw for themselves the cruelty, the lies, and the hypocrisy of the system."
            : "Во многих произведениях советской эпохи писатели использовали литературу как скрытое оружие против режима. Они не всегда могли открыто критиковать власть — это было опасно, а часто и смертельно. Поэтому они говорили о проблемах через символы, юмор, внутренние конфликты и абсурдные ситуации. Именно поэтому их произведения действовали так сильно: читатель сам видел жестокость, ложь и лицемерие системы."}
        </p>
        <p style={{
          fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.6vw, 19px)",
          lineHeight:1.7,maxWidth:680,margin:"0",opacity:0.92
        }}>
          {lang==='en'
            ? "This exhibit presents four authors, each of whom found their own way of resisting: from tragedy and psychology to humor and phantasmagoria, from documentary realism to absurdity and metaphysics. All of them arrived at the same place: literature preserves the truth when everything else falls silent."
            : "Эта выставка представляет четырёх авторов, каждый из которых нашёл свой способ противостояния: от трагедии и психологизма до юмора и фантасмагории, от документального реализма до абсурда и метафизики. Но все они пришли к одному и тому же: литература способна сохранить правду, когда всё остальное молчит."}
        </p>
        <div style={{position:"absolute",bottom:-18,left:40}}>
          <Stamp rotate={-4} size={1.1}>
            {lang==='en'?"CLASSIFIED · SECRET":"СЕКРЕТНО · ИЗЪЯТО"}
          </Stamp>
        </div>
      </div>

      <div style={{
        padding:"36px 40px",background:"var(--paper-2)",
        border:"2px double var(--ink)",position:"relative"
      }}>
        <div style={{
          fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
          color:"var(--stamp)",fontWeight:700,marginBottom:12
        }}>
          {lang==='en'?"CENTRAL THESIS":"ЦЕНТРАЛЬНЫЙ ТЕЗИС"}
        </div>
        <p style={{
          fontFamily:"var(--serif)",fontSize:"clamp(19px, 2.2vw, 28px)",
          lineHeight:1.4,margin:0,fontStyle:"italic"
        }}>
          {lang==='en'
            ? "Soviet literature functions as resistance not through open rebellion, but through exposing the system’s effects on the human mind, daily life, survival, and truth itself."
            : "Советская литература функционирует как сопротивление не через открытый бунт, а через обнажение влияния системы на человеческий разум, повседневную жизнь, выживание и саму правду."}
        </p>
      </div>

      {/* Four-author strip */}
      <div style={{
        marginTop:40,display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",
        gap:1,background:"var(--ink)",border:"1px solid var(--ink)"
      }}>
        {[
          { name:"Хвылевой", en:"Khvylovy", yrs:"1893–1933", tag: lang==='en'?"Tragedy":"Трагедия" },
          { name:"Довлатов", en:"Dovlatov", yrs:"1941–1990", tag: lang==='en'?"Irony":"Ирония" },
          { name:"Солженицын", en:"Solzhenitsyn", yrs:"1918–2008", tag: lang==='en'?"Realism":"Реализм" },
          { name:"Булгаков", en:"Bulgakov", yrs:"1891–1940", tag: lang==='en'?"Fantasy":"Фантасмагория" },
        ].map((a,i)=>(
          <div key={i} style={{
            background:"var(--paper)",padding:"22px 18px",textAlign:"center"
          }}>
            <div style={{
              fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.25em",
              color:"var(--stamp)",fontWeight:700,marginBottom:8
            }}>№ {i+1}</div>
            <div style={{
              fontFamily:"var(--serif)",fontSize:22,fontWeight:700,
              color:"var(--ink)",lineHeight:1.1
            }}>{lang==='en'?a.en:a.name}</div>
            <div style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--ink-soft)",marginTop:4}}>
              {a.yrs}
            </div>
            <div style={{
              marginTop:10,display:"inline-block",
              fontFamily:"var(--mono)",fontSize:10,
              letterSpacing:"0.2em",padding:"3px 8px",
              border:"1px solid var(--ink-soft)",color:"var(--ink-soft)",
              textTransform:"uppercase"
            }}>{a.tag}</div>
          </div>
        ))}
      </div>
    </Room>
  );
}
// ═══════════════════════════════════════════════════════════════════════════
// СЕКРЕТНО — a Soviet rubber stamp slams down onto the hero on first visit,
// then fades to a 15 %-opacity watermark. Skipped if the stamp already
// landed in this session (sessionStorage flag), and skipped entirely when
// the viewer has `prefers-reduced-motion: reduce` set.
// ═══════════════════════════════════════════════════════════════════════════
function SecretSlam(){
  const reduce = React.useMemo(() => {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
    catch { return false; }
  }, []);
  const [phase, setPhase] = React.useState(() => {
    try { return sessionStorage.getItem('seen_secret') ? 'watermark' : 'pre'; }
    catch { return 'pre'; }
  });

  React.useEffect(() => {
    if (phase !== 'pre') return;
    if (reduce) {
      setPhase('watermark');
      try { sessionStorage.setItem('seen_secret', '1'); } catch {}
      return;
    }
    const raf = requestAnimationFrame(() => setPhase('slammed'));
    const toWatermark = setTimeout(() => {
      setPhase('watermark');
      try { sessionStorage.setItem('seen_secret', '1'); } catch {}
    }, 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(toWatermark); };
  }, [phase, reduce]);

  const watermark = phase === 'watermark';
  const slammed   = phase === 'slammed';

  return (
    <div aria-hidden="true" style={{
      position:"absolute", inset:0,
      pointerEvents:"none",
      zIndex: watermark ? 1 : 40,
      display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden"
    }}>
      <div style={{
        // Impact translates scale + opacity + a tiny rotation overshoot
        transform: watermark
          ? "rotate(-6deg) scale(1)"
          : slammed
            ? "rotate(-4deg) scale(1)"
            : "rotate(-8deg) scale(2.2)",
        opacity: watermark ? 0.15 : slammed ? 0.92 : 0,
        transition: slammed
          ? "transform 260ms cubic-bezier(.2,1.8,.4,1), opacity 120ms ease-out"
          : watermark
            ? "transform 900ms ease-out, opacity 900ms ease-out"
            : "none",
        willChange:"transform, opacity",
        mixBlendMode: watermark ? "multiply" : "normal"
      }}>
        <div style={{
          border:"6px double var(--stamp)",
          padding:"10px 34px 14px",
          fontFamily:"var(--serif)",
          fontSize:"clamp(40px, 7vw, 84px)",
          fontWeight:700,
          letterSpacing:"0.2em",
          color:"var(--stamp)",
          textTransform:"uppercase",
          background:"transparent",
          boxShadow:"0 0 0 2px var(--stamp) inset",
          textShadow: slammed ? "0 2px 0 oklch(0.3 0.1 28 / 0.35)" : "none",
          position:"relative"
        }}>
          СЕКРЕТНО
          {/* Paper-grain noise to roughen the stamp edges */}
          <div style={{
            position:"absolute", inset:-2, pointerEvents:"none",
            backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' seed='7'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.6 -0.7'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>\")",
            mixBlendMode:"screen", opacity:0.55
          }}/>
        </div>
      </div>
    </div>
  );
}

window.Room0 = Room0;
