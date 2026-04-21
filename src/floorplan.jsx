// Floor plan: architectural blueprint of the museum

const { useState: useS_FP, useContext: useC_FP } = React;

function FloorPlan({ onEnter }){
  const { lang, setLang } = useC_FP(window.LangContext);
  const [hover, setHover] = useS_FP(null);

  // Rooms laid out on a 1000x560 blueprint canvas.
  // Walking path: 00 Entry (bottom) → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 Exit (top-right)
  // Arranged as a U-shape like a real gallery circuit.
  const rooms = [
    // id, x, y, w, h, thick walls where doorways are (gaps)
    { id:0, x:400, y:460, w:200, h:90,  label:"00", key:"entry" },
    { id:1, x:40,  y:280, w:210, h:170, key:"khvylovy" },
    { id:2, x:260, y:280, w:210, h:170, key:"dovlatov" },
    { id:3, x:480, y:280, w:140, h:170, key:"solz1" },
    { id:4, x:630, y:280, w:140, h:170, key:"solz2" },
    { id:5, x:780, y:280, w:180, h:170, key:"solz3" },
    { id:6, x:40,  y:60,  w:350, h:200, key:"bulg1" },
    { id:7, x:400, y:60,  w:370, h:200, key:"bulg2" },
    { id:8, x:780, y:60,  w:180, h:200, key:"exit" },
  ];

  const titles = {
    entry:    { ru:"ВЕСТИБЮЛЬ",  en:"VESTIBULE" },
    khvylovy: { ru:"ЗАЛ ХВИЛЬОВОГО",  en:"KHVYLOVY HALL" },
    dovlatov: { ru:"ЗАЛ ДОВЛАТОВА",   en:"DOVLATOV HALL" },
    solz1:    { ru:"АРХИПЕЛАГ I", en:"GULAG I" },
    solz2:    { ru:"АРХИПЕЛАГ II",en:"GULAG II" },
    solz3:    { ru:"АРХИПЕЛАГ III",en:"GULAG III" },
    bulg1:    { ru:"МАСТЕР",    en:"THE MASTER" },
    bulg2:    { ru:"МАРГАРИТА", en:"MARGARITA" },
    exit:     { ru:"КАФЕ «БУЛГАКОВ»", en:"CAFÉ BULGAKOV" },
  };

  // Interior fixtures drawn inside each room
  const FixturesFor = (key) => {
    // Each room gets small symbolic fixtures so the plan "reads" as a curated space
    const stroke = "var(--ink)";
    const thin = { stroke, strokeWidth: 1, fill: "none" };
    switch(key){
      case "entry":
        return (<>
          {/* reception desk */}
          <rect x="70" y="25" width="60" height="14" {...thin}/>
          {/* bench */}
          <rect x="150" y="60" width="40" height="8" {...thin}/>
          <text x="100" y="78" fontSize="8" fontFamily="var(--mono)" fill="var(--ink-soft)" letterSpacing="1">КАССА</text>
        </>);
      case "khvylovy":
        return (<>
          {/* writing desk + chair */}
          <rect x="20" y="30" width="50" height="22" {...thin}/>
          <rect x="32" y="56" width="26" height="16" {...thin}/>
          {/* vitrine */}
          <rect x="110" y="30" width="80" height="16" {...thin}/>
          <line x1="150" y1="30" x2="150" y2="46" {...thin}/>
          {/* wall text */}
          <rect x="30" y="120" width="150" height="30" {...thin} strokeDasharray="2,2"/>
          <text x="40" y="140" fontSize="9" fontFamily="var(--serif)" fill="var(--ink-soft)" fontStyle="italic">«Геть від Москви!»</text>
        </>);
      case "dovlatov":
        return (<>
          {/* censor's desk + typewriter */}
          <rect x="20" y="30" width="70" height="28" {...thin}/>
          <rect x="36" y="36" width="38" height="16" {...thin}/>
          <text x="42" y="47" fontSize="6" fontFamily="var(--mono)" fill="var(--ink-soft)">{lang==='en' ? "TYPE" : "ПЕЧ."}</text>
          {/* stacked files */}
          <rect x="120" y="30" width="70" height="8" {...thin}/>
          <rect x="120" y="40" width="70" height="8" {...thin}/>
          <rect x="120" y="50" width="70" height="8" {...thin}/>
          {/* stool */}
          <rect x="45" y="65" width="20" height="10" {...thin}/>
          <rect x="30" y="115" width="150" height="30" {...thin} strokeDasharray="2,2"/>
          <text x="38" y="134" fontSize="9" fontFamily="var(--serif)" fill="var(--ink-soft)" fontStyle="italic">«Зона»</text>
        </>);
      case "solz1":
        return (<>
          {/* barbed wire vitrine */}
          <rect x="20" y="30" width="100" height="20" {...thin}/>
          <line x1="20" y1="40" x2="120" y2="40" stroke="var(--stamp)" strokeWidth="0.5" strokeDasharray="2,2"/>
          {/* plinth */}
          <rect x="40" y="70" width="60" height="40" {...thin}/>
          <circle cx="70" cy="90" r="8" {...thin}/>
          <text x="32" y="135" fontSize="8" fontFamily="var(--mono)" fill="var(--ink-soft)" letterSpacing="1">ПАЙКА</text>
        </>);
      case "solz2":
        return (<>
          {/* 3653 counter placard */}
          <rect x="20" y="30" width="100" height="32" {...thin}/>
          <text x="70" y="52" fontSize="14" fontFamily="var(--serif)" fontWeight="700" fill="var(--stamp)" textAnchor="middle">3653</text>
          <rect x="30" y="80" width="80" height="30" {...thin} strokeDasharray="2,2"/>
          <text x="36" y="98" fontSize="7" fontFamily="var(--mono)" fill="var(--ink-soft)">ДНЕЙ</text>
        </>);
      case "solz3":
        return (<>
          {/* thermometer vitrine */}
          <rect x="20" y="30" width="140" height="22" {...thin}/>
          <line x1="90" y1="30" x2="90" y2="52" {...thin}/>
          <circle cx="50" cy="41" r="4" fill="var(--stamp)"/>
          <circle cx="130" cy="41" r="4" {...thin}/>
          <rect x="40" y="70" width="100" height="40" {...thin} strokeDasharray="2,2"/>
          <text x="48" y="92" fontSize="9" fontFamily="var(--serif)" fill="var(--ink-soft)" fontStyle="italic">−30° … +15°</text>
        </>);
      case "bulg1":
        return (<>
          {/* hearth + manuscript */}
          <rect x="30" y="40" width="60" height="40" {...thin}/>
          <path d="M 45,80 Q 50,70 55,80 Q 60,70 65,80 Q 70,70 75,80" stroke="var(--stamp)" fill="none" strokeWidth="1"/>
          <rect x="130" y="40" width="70" height="50" {...thin}/>
          <line x1="140" y1="50" x2="190" y2="50" {...thin}/>
          <line x1="140" y1="60" x2="190" y2="60" {...thin}/>
          <line x1="140" y1="70" x2="170" y2="70" {...thin}/>
          {/* armchairs */}
          <rect x="240" y="60" width="30" height="30" {...thin}/>
          <rect x="280" y="60" width="30" height="30" {...thin}/>
          <text x="40" y="165" fontSize="8" fontFamily="var(--mono)" fill="var(--ink-soft)" letterSpacing="1">ОЧАГ · РУКОПИСЬ</text>
        </>);
      case "bulg2":
        return (<>
          {/* balcony & moon */}
          <circle cx="70" cy="55" r="22" {...thin}/>
          <circle cx="70" cy="55" r="14" {...thin} strokeDasharray="2,2"/>
          {/* flight path */}
          <path d="M 110,120 Q 200,40 320,90" stroke="var(--stamp)" fill="none" strokeWidth="1" strokeDasharray="3,3"/>
          <rect x="30" y="140" width="80" height="30" {...thin} strokeDasharray="2,2"/>
          <text x="38" y="160" fontSize="9" fontFamily="var(--serif)" fill="var(--ink-soft)" fontStyle="italic">полёт</text>
        </>);
      case "exit":
        return (<>
          {/* bar counter */}
          <rect x="15" y="22" width="150" height="12" {...thin}/>
          <line x1="15" y1="28" x2="165" y2="28" stroke="var(--stamp)" strokeWidth="0.5" strokeDasharray="2,2"/>
          {/* stools at bar */}
          <circle cx="35" cy="44" r="4" {...thin}/>
          <circle cx="60" cy="44" r="4" {...thin}/>
          <circle cx="85" cy="44" r="4" {...thin}/>
          <circle cx="110" cy="44" r="4" {...thin}/>
          <circle cx="135" cy="44" r="4" {...thin}/>
          {/* round café tables with 2 chairs each */}
          <g>
            <circle cx="40" cy="80" r="9" {...thin}/>
            <circle cx="40" cy="80" r="1.5" fill="var(--stamp)"/>
            <rect x="34" y="92" width="12" height="5" {...thin}/>
            <rect x="34" y="63" width="12" height="5" {...thin}/>
          </g>
          <g>
            <circle cx="90" cy="80" r="9" {...thin}/>
            <circle cx="90" cy="80" r="1.5" fill="var(--stamp)"/>
            <rect x="84" y="92" width="12" height="5" {...thin}/>
            <rect x="84" y="63" width="12" height="5" {...thin}/>
          </g>
          <g>
            <circle cx="140" cy="80" r="9" {...thin}/>
            <circle cx="140" cy="80" r="1.5" fill="var(--stamp)"/>
            <rect x="134" y="92" width="12" height="5" {...thin}/>
            <rect x="134" y="63" width="12" height="5" {...thin}/>
          </g>
          {/* guestbook podium */}
          <rect x="30" y="115" width="60" height="20" {...thin}/>
          <line x1="38" y1="123" x2="82" y2="123" {...thin}/>
          <line x1="38" y1="129" x2="75" y2="129" {...thin}/>
          <text x="30" y="150" fontSize="7" fontFamily="var(--mono)" fill="var(--ink-soft)" letterSpacing="1">КНИГА ОТЗЫВОВ</text>
          {/* exit arrow */}
          <path d="M 110,155 L 165,155 M 155,147 L 165,155 L 155,163" stroke="var(--stamp)" strokeWidth="1.5" fill="none"/>
          <text x="110" y="150" fontSize="7" fontFamily="var(--mono)" fill="var(--stamp)" letterSpacing="1" fontWeight="700">{lang==='en' ? "EXIT" : "ВЫХОД"}</text>
        </>);
      default: return null;
    }
  };

  // Doorway gaps (openings in walls). Each door is drawn on the PARENT svg so they cleanly cut through walls.
  // Format: [x, y, horizontal?, length]
  const doors = [
    // 00 entry -> 02 dovlatov (up through top wall of entry)
    { x: 470, y: 460, horiz: true, len: 40 },
    // hallway between row-1 rooms (vertical walls)
    { x: 250, y: 360, horiz: false, len: 40 },  // 01 ↔ 02
    { x: 470, y: 360, horiz: false, len: 40 },  // 02 ↔ 03
    { x: 620, y: 360, horiz: false, len: 40 },  // 03 ↔ 04
    { x: 770, y: 360, horiz: false, len: 40 },  // 04 ↔ 05
    // row-1 → row-2 (horizontal doors up into Bulgakov rooms)
    { x: 140, y: 280, horiz: true, len: 40 },   // 01 → 06
    { x: 860, y: 280, horiz: true, len: 40 },   // 05 → 08
    // within row 2
    { x: 390, y: 160, horiz: false, len: 40 },  // 06 ↔ 07
    { x: 770, y: 160, horiz: false, len: 40 },  // 07 ↔ 08
  ];

  return (
    <div style={{minHeight:"100vh",padding:"40px clamp(20px, 5vw, 80px)"}}>
      <div style={{maxWidth:1240,margin:"0 auto"}}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,gap:24,flexWrap:"wrap"}}>
          <div style={{flex:"1 1 400px"}}>
            <div style={{
              fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.35em",
              color:"var(--ink-soft)",textTransform:"uppercase",marginBottom:10
            }}>
              {lang === 'en'
                ? "SLAV 242/340B · REVOLUTIONS OF THE MIND"
                : "SLAV 242/340B · РЕВОЛЮЦИИ СОЗНАНИЯ"}
            </div>
            <h1 style={{
              fontFamily:"var(--serif)",fontSize:"clamp(36px, 5vw, 64px)",
              lineHeight:1.02,margin:"0 0 6px",fontWeight:700,letterSpacing:"-0.015em",
              color:"var(--ink)"
            }}>
              {lang==='en'
                ? "Literature as an Instrument of Resistance in the USSR"
                : "Литература — инструмент противостояния во времена СССР"}
            </h1>
            <div style={{
              fontFamily:"var(--typed)",fontSize:"clamp(14px, 1.5vw, 18px)",
              color:"var(--ink-soft)",fontStyle:"italic",marginTop:10
            }}>
              {lang==='en'
                ? "A curated digital exhibit across nine halls"
                : "Цифровая выставка в девяти залах"}
            </div>
          </div>

          <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{display:"flex",border:"1px solid var(--ink)"}}>
              <button onClick={() => setLang("ru")} style={{
                background: lang === "ru" ? "var(--ink)" : "transparent",
                color: lang === "ru" ? "var(--paper)" : "var(--ink)",
                border:"none",padding:"10px 16px",fontFamily:"var(--mono)",
                fontSize:11,letterSpacing:"0.15em",cursor:"pointer"
              }}>RU/UA</button>
              <button onClick={() => setLang("en")} style={{
                background: lang === "en" ? "var(--ink)" : "transparent",
                color: lang === "en" ? "var(--paper)" : "var(--ink)",
                border:"none",borderLeft:"1px solid var(--ink)",padding:"10px 16px",
                fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.15em",cursor:"pointer"
              }}>EN</button>
            </div>
            <Stamp rotate={-5} size={1.1}>
              {lang==='en' ? "CLEARED · 1987" : "ПРОВЕРЕНО · 1987"}
            </Stamp>
          </div>
        </div>

        {/* Guide narration — intro overview of all four authors */}
        <AudioPlayer
          title={lang==='en'
            ? "Welcome to the exhibit · four voices, one resistance"
            : "Добро пожаловать на выставку · четыре голоса, одно сопротивление"}
          narrator={lang==='en' ? "GUIDE NARRATION" : "ГОЛОС ЭКСКУРСОВОДА"}
          src={window.AUDIO && window.AUDIO.intro}
          duration="2:00"
        />

        {/* Document metadata strip */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",
          gap:0,margin:"12px 0 28px",border:"1px solid var(--ink-soft)",
          background:"var(--paper-2)"
        }}>
          {[
            [lang==='en'?"DRAWING №":"ЧЕРТЁЖ №", "SLAV-340-A01"],
            [lang==='en'?"SCALE":"МАСШТАБ", "1 : 200"],
            [lang==='en'?"HALLS":"ЗАЛОВ", "09"],
            [lang==='en'?"AUTHORS":"АВТОРОВ", "04"],
            [lang==='en'?"PERIOD":"ПЕРИОД", "1920–1989"],
            [lang==='en'?"DRAWN BY":"ЧЕРТИЛ", "А.К."],
          ].map(([k,v],i) => (
            <div key={i} style={{
              padding:"10px 14px",
              borderRight:"1px dashed var(--ink-soft)",
              fontFamily:"var(--mono)",fontSize:11
            }}>
              <div style={{color:"var(--ink-ghost)",letterSpacing:"0.2em",marginBottom:3,fontSize:9}}>{k}</div>
              <div style={{color:"var(--ink)",letterSpacing:"0.1em",fontWeight:700}}>{v}</div>
            </div>
          ))}
        </div>

        {/* THE BLUEPRINT */}
        <div style={{
          position:"relative",
          background:"var(--paper-2)",
          border:"2px solid var(--ink)",
          boxShadow:"4px 6px 0 var(--paper-shadow), 0 20px 40px oklch(0.2 0.02 60 / 0.2)",
          padding:"20px 22px 24px"
        }}>
          {/* top drawing bar */}
          <div style={{
            display:"flex",justifyContent:"space-between",alignItems:"center",
            marginBottom:14,flexWrap:"wrap",gap:12,
            borderBottom:"1px dashed var(--ink-soft)",paddingBottom:10
          }}>
            <div style={{
              fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
              color:"var(--ink-soft)",textTransform:"uppercase"
            }}>
              {lang==='en'?"Architectural plan · Ground floor · Select a hall":"Архитектурный план · Первый этаж · Выберите зал"}
            </div>
            <div style={{
              fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.2em",
              color: hover !== null ? "var(--stamp)" : "var(--ink-ghost)",fontWeight:700
            }}>
              {hover !== null
                ? `→ ${titles[rooms[hover].key][lang]}`
                : (lang==='en' ? "— hover to inspect —" : "— наведите курсор —")}
            </div>
          </div>

          {/* Blueprint SVG */}
          <div style={{
            position:"relative",
            background:"var(--paper-grid)",
            border:"1px solid var(--ink-soft)",
            padding:0
          }}>
            <svg
              viewBox="0 0 1000 580"
              preserveAspectRatio="xMidYMid meet"
              style={{width:"100%",display:"block",background:`
                repeating-linear-gradient(0deg, transparent 0 19px, oklch(0.78 0.02 70 / 0.45) 19px 20px),
                repeating-linear-gradient(90deg, transparent 0 19px, oklch(0.78 0.02 70 / 0.45) 19px 20px),
                oklch(0.91 0.018 75)
              `}}
            >
              {/* Outer drawing border ticks */}
              <rect x="10" y="10" width="980" height="560" fill="none" stroke="var(--ink-soft)" strokeWidth="0.8" strokeDasharray="3,3"/>
              {/* Corner crop marks */}
              {[[10,10],[990,10],[10,570],[990,570]].map(([x,y],i)=>(
                <g key={i}>
                  <line x1={x-6} y1={y} x2={x+6} y2={y} stroke="var(--ink)" strokeWidth="1"/>
                  <line x1={x} y1={y-6} x2={x} y2={y+6} stroke="var(--ink)" strokeWidth="1"/>
                </g>
              ))}

              {/* Dimension lines — bottom */}
              <g fontFamily="var(--mono)" fontSize="9" fill="var(--ink-soft)">
                <line x1="40" y1="560" x2="960" y2="560" stroke="var(--ink-soft)" strokeWidth="0.5"/>
                <line x1="40" y1="555" x2="40" y2="565" stroke="var(--ink-soft)" strokeWidth="0.5"/>
                <line x1="960" y1="555" x2="960" y2="565" stroke="var(--ink-soft)" strokeWidth="0.5"/>
                <text x="500" y="575" textAnchor="middle" letterSpacing="1.5">46.00 м</text>
              </g>
              {/* Dimension lines — left */}
              <g fontFamily="var(--mono)" fontSize="9" fill="var(--ink-soft)">
                <line x1="20" y1="60" x2="20" y2="550" stroke="var(--ink-soft)" strokeWidth="0.5"/>
                <line x1="15" y1="60" x2="25" y2="60" stroke="var(--ink-soft)" strokeWidth="0.5"/>
                <line x1="15" y1="550" x2="25" y2="550" stroke="var(--ink-soft)" strokeWidth="0.5"/>
                <text x="12" y="310" textAnchor="middle" letterSpacing="1.5" transform="rotate(-90, 12, 310)">24.50 м</text>
              </g>

              {/* Path of circulation */}
              <path
                d="M 500,505 L 500,540 M 500,505 L 145,365 M 145,365 L 365,365 L 550,365 L 700,365 L 870,365 L 870,180 L 580,180 L 215,180 L 215,145"
                fill="none" stroke="var(--stamp)" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.35"
              />
              {/* Footprints along the path */}
              {[
                [500,520],[440,490],[380,460],[320,430],[260,400],
                [180,370],[300,345],[440,345],[580,345],[720,345],[860,345],
                [860,270],[860,200],[720,160],[560,160],[400,160],[260,160],[215,120]
              ].map(([x,y],i)=>(
                <g key={i} opacity="0.35" fill="var(--stamp)">
                  <ellipse cx={x} cy={y} rx="3" ry="5"/>
                </g>
              ))}

              {/* Rooms */}
              {rooms.map((r) => {
                const isHover = hover === r.id;
                return (
                  <g key={r.id}
                     onMouseEnter={() => setHover(r.id)}
                     onMouseLeave={() => setHover(null)}
                     onClick={() => onEnter(r.id)}
                     style={{cursor:"pointer"}}>
                    {/* room fill */}
                    <rect
                      x={r.x} y={r.y} width={r.w} height={r.h}
                      fill={isHover ? "oklch(0.93 0.04 60)" : "oklch(0.95 0.012 75)"}
                      stroke="var(--ink)"
                      strokeWidth={isHover ? 3 : 2}
                    />
                    {/* Hatched floor pattern when hovered */}
                    {isHover && (
                      <rect x={r.x} y={r.y} width={r.w} height={r.h}
                        fill="url(#floor-hatch)" pointerEvents="none"/>
                    )}
                    {/* Interior fixtures (translated into room coords) */}
                    <g transform={`translate(${r.x}, ${r.y})`} pointerEvents="none">
                      {FixturesFor(r.key)}
                    </g>
                    {/* Room stencil label at top-left */}
                    <g pointerEvents="none">
                      <rect
                        x={r.x + 6} y={r.y + 6}
                        width={30} height={18}
                        fill="var(--ink)" stroke="var(--ink)"
                      />
                      <text
                        x={r.x + 21} y={r.y + 19}
                        textAnchor="middle"
                        fontFamily="var(--mono)" fontSize="11" fontWeight="700"
                        fill="var(--paper)" letterSpacing="1"
                      >{r.label || String(r.id).padStart(2,"0")}</text>
                    </g>
                    {/* Room name at bottom */}
                    <text
                      x={r.x + r.w/2} y={r.y + r.h - 8}
                      textAnchor="middle"
                      fontFamily="var(--serif)" fontSize="11" fontWeight="700"
                      fill="var(--ink)"
                      pointerEvents="none"
                      style={{letterSpacing:"0.08em"}}
                    >{titles[r.key][lang].toUpperCase()}</text>
                  </g>
                );
              })}

              {/* Doorways — drawn as paper-colored gaps + small arc swings */}
              {doors.map((d,i) => {
                if (d.horiz){
                  return (
                    <g key={i}>
                      <rect x={d.x} y={d.y - 2} width={d.len} height={5} fill="oklch(0.95 0.012 75)" stroke="none"/>
                      <path d={`M ${d.x} ${d.y} A ${d.len} ${d.len} 0 0 1 ${d.x + d.len} ${d.y}`}
                        fill="none" stroke="var(--ink-soft)" strokeWidth="0.6" strokeDasharray="2,2"/>
                    </g>
                  );
                } else {
                  return (
                    <g key={i}>
                      <rect x={d.x - 2} y={d.y} width={5} height={d.len} fill="oklch(0.95 0.012 75)" stroke="none"/>
                      <path d={`M ${d.x} ${d.y} A ${d.len} ${d.len} 0 0 1 ${d.x} ${d.y + d.len}`}
                        fill="none" stroke="var(--ink-soft)" strokeWidth="0.6" strokeDasharray="2,2"/>
                    </g>
                  );
                }
              })}

              {/* Entry arrow at front of building */}
              <g>
                <path d="M 500,555 L 500,515 M 494,525 L 500,515 L 506,525"
                  stroke="var(--stamp)" strokeWidth="2" fill="none"/>
                <text x="510" y="545" fontFamily="var(--mono)" fontSize="10" fill="var(--stamp)" letterSpacing="2" fontWeight="700">
                  {lang==='en'?'ENTRY':'ВХОД'}
                </text>
              </g>
              {/* Exit arrow at top-right */}
              <g>
                <path d="M 960,120 L 985,120 M 975,114 L 985,120 L 975,126"
                  stroke="var(--stamp)" strokeWidth="2" fill="none"/>
                <text x="935" y="108" fontFamily="var(--mono)" fontSize="10" fill="var(--stamp)" letterSpacing="2" fontWeight="700" textAnchor="end">
                  {lang==='en'?'EXIT →':'ВЫХОД →'}
                </text>
              </g>

              {/* North arrow */}
              <g transform="translate(920, 475)">
                <circle r="26" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1"/>
                <path d="M 0,-18 L 6,10 L 0,4 L -6,10 Z" fill="var(--ink)"/>
                <text y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink)" fontWeight="700">С</text>
                <text y="28" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-soft)">Ю</text>
              </g>

              {/* Scale bar */}
              <g transform="translate(40, 500)">
                <rect x="0" y="0" width="20" height="6" fill="var(--ink)"/>
                <rect x="20" y="0" width="20" height="6" fill="none" stroke="var(--ink)" strokeWidth="1"/>
                <rect x="40" y="0" width="20" height="6" fill="var(--ink)"/>
                <rect x="60" y="0" width="20" height="6" fill="none" stroke="var(--ink)" strokeWidth="1"/>
                <text x="0" y="20" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-soft)">0</text>
                <text x="38" y="20" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-soft)">5</text>
                <text x="78" y="20" fontFamily="var(--mono)" fontSize="9" fill="var(--ink-soft)">10 м</text>
              </g>

              {/* Title block bottom-right */}
              <g transform="translate(770, 475)">
                <rect x="0" y="0" width="140" height="80" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1"/>
                <line x1="0" y1="20" x2="140" y2="20" stroke="var(--ink)" strokeWidth="0.5"/>
                <line x1="0" y1="40" x2="140" y2="40" stroke="var(--ink)" strokeWidth="0.5"/>
                <line x1="0" y1="60" x2="140" y2="60" stroke="var(--ink)" strokeWidth="0.5"/>
                <line x1="70" y1="20" x2="70" y2="80" stroke="var(--ink)" strokeWidth="0.5"/>
                <text x="6" y="14" fontFamily="var(--mono)" fontSize="8" fill="var(--ink)" letterSpacing="1" fontWeight="700">{lang==='en'?'PROJECT':'ПРОЕКТ'}</text>
                <text x="6" y="34" fontFamily="var(--mono)" fontSize="7" fill="var(--ink-soft)">SLAV-340-2026</text>
                <text x="76" y="34" fontFamily="var(--mono)" fontSize="7" fill="var(--ink-soft)">A-01</text>
                <text x="6" y="54" fontFamily="var(--mono)" fontSize="7" fill="var(--ink-soft)">{lang==='en'?'GROUND FLOOR':'1-Й ЭТАЖ'}</text>
                <text x="76" y="54" fontFamily="var(--mono)" fontSize="7" fill="var(--ink-soft)">1:200</text>
                <text x="6" y="74" fontFamily="var(--mono)" fontSize="7" fill="var(--ink-soft)">{lang==='en'?'REV':'РЕД'}. 04</text>
                <text x="76" y="74" fontFamily="var(--mono)" fontSize="7" fill="var(--ink-soft)">2026.04</text>
              </g>

              {/* Hatch pattern def for hovered rooms */}
              <defs>
                <pattern id="floor-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="var(--stamp)" strokeWidth="0.4" opacity="0.35"/>
                </pattern>
              </defs>
            </svg>

            {/* Stamp overlay */}
            <div style={{
              position:"absolute",top:14,right:16,pointerEvents:"none",
              transform:"rotate(-8deg)",opacity:0.9
            }}>
              <Stamp rotate={0} color="blue" size={1}>
                {lang==='en'?"APPROVED · MINKULT":"УТВЕРЖДЕНО · МИНКУЛЬТ"}
              </Stamp>
            </div>
          </div>

          {/* Legend — annotated list below blueprint */}
          <div style={{
            marginTop:16,
            borderTop:"1px dashed var(--ink-soft)",paddingTop:14,
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",
            gap:10
          }}>
            {rooms.map((r,i) => (
              <button key={r.id}
                onMouseEnter={() => setHover(r.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onEnter(r.id)}
                style={{
                  display:"flex",gap:12,alignItems:"flex-start",
                  padding:"10px 12px",
                  background: hover === r.id ? "var(--ink)" : "transparent",
                  color: hover === r.id ? "var(--paper)" : "var(--ink)",
                  border:"1px dashed var(--ink-soft)",
                  cursor:"pointer",textAlign:"left",
                  fontFamily:"var(--typed)",
                  transition:"all 0.12s"
                }}>
                <div style={{
                  fontFamily:"var(--mono)",
                  background: hover === r.id ? "var(--paper)" : "var(--ink)",
                  color: hover === r.id ? "var(--ink)" : "var(--paper)",
                  fontSize:13,fontWeight:700,padding:"4px 8px",
                  letterSpacing:"0.1em",minWidth:32,textAlign:"center"
                }}>{r.label}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,lineHeight:1.25,marginBottom:3,fontWeight:700,letterSpacing:"0.03em"}}>
                    {window.TR.rooms[r.id][lang==='en'?'en':'ru']}
                  </div>
                  <div style={{fontSize:11,opacity: hover === r.id ? 0.85 : 0.6,letterSpacing:"0.05em",lineHeight:1.3}}>
                    {window.TR.subs[r.id][lang==='en'?'en':'ru']}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Thesis card */}
        <div style={{
          marginTop:40,
          padding:"28px 32px",
          background:"var(--ink)",
          color:"var(--paper)",
          position:"relative"
        }}>
          <div style={{
            fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
            opacity:0.6,marginBottom:10
          }}>
            {lang==='en'?"CENTRAL THESIS":"ЦЕНТРАЛЬНЫЙ ТЕЗИС"}
          </div>
          <div style={{
            fontFamily:"var(--serif)",fontSize:"clamp(18px, 2vw, 24px)",
            lineHeight:1.4,fontStyle:"italic"
          }}>
            {lang==='en'
              ? "Soviet literature functions as resistance not through open rebellion, but through exposing the system’s effects on the human mind, daily life, survival, and truth itself."
              : "Советская литература функционирует как сопротивление не через открытый бунт, а через обнажение влияния системы на человеческий разум, повседневную жизнь, выживание и саму правду."}
          </div>
          <div style={{position:"absolute",top:-12,right:24}}>
            <Stamp rotate={6} color="blue">
              {lang==='en'?"EXHIBIT 2026":"ВЫСТАВКА 2026"}
            </Stamp>
          </div>
        </div>

        {/* Enter CTA */}
        <div style={{marginTop:32,textAlign:"center"}}>
          <button onClick={() => onEnter(0)} style={{
            background:"var(--stamp)",color:"var(--paper)",
            border:"none",padding:"18px 48px",
            fontFamily:"var(--serif)",fontSize:22,fontWeight:700,
            letterSpacing:"0.08em",cursor:"pointer",
            boxShadow:"4px 6px 0 var(--ink)",
            textTransform:"uppercase"
          }}>
            {lang==='en'?"Begin the Tour →":"Начать экскурсию →"}
          </button>
        </div>

        <div style={{
          marginTop:60,textAlign:"center",
          fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.2em",
          color:"var(--ink-ghost)"
        }}>
          {lang === 'en'
            ? "· SAMIZDAT EDITION · COPY №1 · READ AND PASS IT ON ·"
            : "· САМИЗДАТ · КОПИЯ №1 · ЧИТАЙ И ПЕРЕДАЙ ДРУГОМУ ·"}
        </div>
      </div>
    </div>
  );
}

window.FloorPlan = FloorPlan;
