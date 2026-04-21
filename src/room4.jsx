// Room 4: Solzhenitsyn — Bread, kasha, trowel (artifact vitrines)
const { useState: useS_R4 } = React;

function Room4({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  const [open, setOpen] = useS_R4(null);

  const artifacts = [
    {
      id:1,
      name_ru:"Хлеб", name_en:"Bread",
      sub_ru:"единица свободы", sub_en:"a unit of freedom",
      icon:"bread",
      quote:"Шухов достал хлебушек в белой тряпице и, не роняя ни крошки мимо той тряпицы, стал помалу отламывать кусочки и класть в рот.",
      analysis_ru:"Каждое действие с едой ритуализовано. Хлеб завёрнут в чистую тряпочку, каша съедается медленно. Это не жадность, это литургия. В системе, где пайку могут украсть, урезать, отнять, Шухов относится к хлебу как к священному предмету. Ритуал еды — это ритуал сохранения себя.",
      analysis_en:"Every gesture with food is ritualized. Bread is wrapped in a clean rag, kasha eaten slowly. This is not greed; it is liturgy. In a system where the ration can be stolen, cut, taken away, Shukhov treats bread as sacred. The ritual of eating is the ritual of preserving the self."
    },
    {
      id:2,
      name_ru:"Ложка", name_en:"Spoon",
      sub_ru:"памятник идентичности", sub_en:"monument to identity",
      icon:"spoon",
      quote:"Усть-Ижма · 1944",
      isQuoteLabel:true,
      analysis_ru:"Ложка с надписью «Усть-Ижма, 1944» — не столовый прибор, а артефакт личной истории. Шухов носит её в валенке, бережёт. В мире, где номер заменяет имя, ложка — единственное, что связывает его с прошлым, с тем, кто он есть на самом деле.",
      analysis_en:"A spoon inscribed \"Ust-Izhma, 1944\" is not a utensil but an artifact of personal history. Shukhov carries it inside his felt boot, protects it. In a world where a number replaces a name, the spoon is the only thing binding him to the past, to who he actually is."
    },
    {
      id:3,
      name_ru:"Мастерок", name_en:"Trowel",
      sub_ru:"свобода через труд", sub_en:"freedom through labor",
      icon:"trowel",
      quote:"И — как вымело все мысли из головы. Ни о чём Шухов сейчас не вспоминал и не заботился, а только думал — как ему колена трубные составить и вывести, чтоб не дымило.",
      analysis_ru:"Сцена кладки стены на ТЭЦ — кульминация дня. Когда Шухов кладёт шлакоблоки, он перестаёт быть заключённым номер Щ-854 и становится мастером. Работа возвращает ему субъектность: он сам решает, где класть, контролирует качество. Даже при аврале он не может бросить раствор: «Так устроен Шухов по-дурацкому, и никак его отучить не могут: всякую вещь и труд всякий жалеет он, чтоб зря не гинули.» Это «дурацкое» качество — последнее убежище свободной воли.",
      analysis_en:"The scene of laying the wall at the power plant is the climax of the day. As Shukhov lays cinder blocks he ceases to be prisoner Shch-854 and becomes a master craftsman. Work returns agency to him: he decides where to place a block, checks the quality. Even in a rush he cannot abandon the mortar: \"Shukhov is built foolishly that way, and nothing can retrain him: he pities every thing, every labor, so that nothing perishes in vain.\" That \"foolish\" quality is the last refuge of free will."
    },
  ];

  return (
    <Room num={4} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Solzhenitsyn · Bread, Kasha, Trowel" : "Солженицын · Хлеб, каша, мастерок"}
      sub={lang==='en' ? "Objects as acts of resistance" : "Предметы как акты сопротивления"}
      audio={{
        title: lang==='en' ? "Three artifacts, three acts of dignity" : "Три артефакта, три акта достоинства",
        narrator: lang==='en' ? "АУДИОГИД · SOLZHENITSYN II" : "АУДИОГИД · СОЛЖЕНИЦЫН II",
        src: window.AUDIO && window.AUDIO.solz2,
        duration: "5:30"
      }}
      tint="linear-gradient(180deg, oklch(0.88 0.012 70) 0%, oklch(0.82 0.015 60) 100%)"
    >
      <window.FrostOverlay intensity={0.7}/>
      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.55vw, 18px)",lineHeight:1.7,color:"var(--ink-soft)",maxWidth:740,margin:"0 0 32px"}}>
        {lang==='en'
          ? "In a world where a man has been stripped of name (number Shch-854), family, and freedom, objects become the last refuge of personality. Solzhenitsyn turns bread, a spoon, and a mason's trowel into symbols of quiet, daily resistance."
          : "В мире лагеря, где у человека отняты имя (номер Щ-854), семья, свобода, предметы становятся последним прибежищем личности. Солженицын превращает хлеб, ложку и мастерок в символы тихого, ежедневного сопротивления."}
      </p>

      <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",color:"var(--stamp)",fontWeight:700,marginBottom:12,textAlign:"center"}}>
        {lang==='en'?"▾ CLICK A VITRINE TO EXAMINE ▾":"▾ НАЖМИТЕ ВИТРИНУ, ЧТОБЫ РАССМОТРЕТЬ ▾"}
      </div>

      {/* Three vitrines */}
      <div style={{
        display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",
        gap:20,marginBottom:32
      }}>
        {artifacts.map(a => (
          <button key={a.id} onClick={() => setOpen(a.id)} style={{
            background:"linear-gradient(180deg, oklch(0.25 0.01 60), oklch(0.18 0.008 60))",
            border:"none",padding:0,cursor:"pointer",
            color:"var(--paper)",textAlign:"left",
            boxShadow: open === a.id ? "0 0 0 3px var(--stamp), 4px 6px 20px oklch(0.1 0.01 60 / 0.5)" : "3px 4px 0 var(--paper-shadow), 0 10px 30px oklch(0.1 0.01 60 / 0.3)",
            transition:"all 0.15s"
          }}>
            {/* glass vitrine */}
            <div style={{
              aspectRatio:"3/3.2",
              background:`
                linear-gradient(160deg, oklch(0.95 0.015 80 / 0.1) 0%, transparent 40%, oklch(0.95 0.015 80 / 0.08) 100%),
                radial-gradient(ellipse at 50% 80%, oklch(0.35 0.015 60), oklch(0.2 0.01 60))
              `,
              position:"relative",
              borderBottom:"3px solid oklch(0.15 0.01 60)",
              overflow:"hidden"
            }}>
              {/* spotlight */}
              <div style={{
                position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",
                width:"70%",height:"140%",
                background:"radial-gradient(ellipse at top, oklch(0.88 0.04 80 / 0.35) 0%, transparent 50%)"
              }}/>
              {/* the artifact icon */}
              <div style={{
                position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"
              }}>
                <ArtifactIcon kind={a.icon}/>
              </div>
              {/* vitrine glass reflection */}
              <div style={{
                position:"absolute",inset:0,
                background:"linear-gradient(105deg, transparent 0%, transparent 45%, oklch(0.95 0.015 80 / 0.08) 50%, transparent 55%, transparent 100%)",
                pointerEvents:"none"
              }}/>
              <div style={{
                position:"absolute",top:10,left:12,
                fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.25em",
                color:"oklch(0.8 0.02 80)",opacity:0.6
              }}>ЭКСП. №{a.id}</div>
            </div>
            <div style={{padding:"16px 18px"}}>
              <div style={{fontFamily:"var(--serif)",fontSize:24,fontWeight:700,lineHeight:1.05}}>
                {lang==='en'?a.name_en:a.name_ru}
              </div>
              <div style={{
                fontFamily:"var(--typed)",fontSize:13,fontStyle:"italic",
                color:"oklch(0.75 0.02 80)",marginTop:4
              }}>— {lang==='en'?a.sub_en:a.sub_ru}</div>
            </div>
          </button>
        ))}
      </div>

      {open && (() => {
        const a = artifacts.find(x => x.id === open);
        return (
          <div style={{
            background:"var(--paper)",border:"2px solid var(--ink)",
            padding:"28px 32px",marginBottom:24,
            boxShadow:"4px 6px 0 var(--paper-shadow)"
          }}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,marginBottom:16}}>
              <div>
                <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",color:"var(--stamp)",fontWeight:700,marginBottom:4}}>
                  {lang==='en'?`ARTIFACT ${a.id} · OPENED`:`АРТЕФАКТ ${a.id} · ОТКРЫТ`}
                </div>
                <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(26px,3vw,36px)",margin:0,fontWeight:700}}>
                  {lang==='en'?a.name_en:a.name_ru} <span style={{color:"var(--stamp)",fontStyle:"italic",fontSize:"0.65em"}}>— {lang==='en'?a.sub_en:a.sub_ru}</span>
                </h3>
              </div>
              <button onClick={() => setOpen(null)} style={{
                background:"transparent",border:"1px solid var(--ink)",
                padding:"6px 12px",fontFamily:"var(--mono)",fontSize:11,
                cursor:"pointer",letterSpacing:"0.15em"
              }}>× {lang==='en'?"CLOSE":"ЗАКРЫТЬ"}</button>
            </div>
            {a.isQuoteLabel ? (
              <div style={{
                padding:"18px 22px",background:"var(--paper-2)",
                fontFamily:"var(--serif)",fontStyle:"italic",fontSize:20,
                border:"1px solid var(--ink-soft)",textAlign:"center"
              }}>✎ {a.quote}</div>
            ) : (
              <Quote attr={lang==='en'?"Solzhenitsyn":"Солженицын"}>{a.quote}</Quote>
            )}
            <Analysis>{lang==='en'?a.analysis_en:a.analysis_ru}</Analysis>
          </div>
        );
      })()}
    </Room>
  );
}

// SVG icons for artifacts
function ArtifactIcon({ kind }){
  if (kind === "bread") return (
    <svg viewBox="0 0 120 80" width="60%" style={{filter:"drop-shadow(0 4px 8px oklch(0.1 0.01 60 / 0.6))"}}>
      <ellipse cx="60" cy="50" rx="50" ry="24" fill="oklch(0.58 0.08 60)"/>
      <ellipse cx="60" cy="46" rx="48" ry="22" fill="oklch(0.68 0.09 65)"/>
      <path d="M20,46 Q60,20 100,46" stroke="oklch(0.4 0.06 50)" strokeWidth="1.5" fill="none"/>
      <path d="M25,50 Q60,30 95,50" stroke="oklch(0.45 0.07 55)" strokeWidth="1" fill="none" opacity="0.7"/>
      <line x1="35" y1="38" x2="42" y2="36" stroke="oklch(0.4 0.06 50)" strokeWidth="1.2"/>
      <line x1="60" y1="30" x2="68" y2="30" stroke="oklch(0.4 0.06 50)" strokeWidth="1.2"/>
      <line x1="80" y1="36" x2="88" y2="38" stroke="oklch(0.4 0.06 50)" strokeWidth="1.2"/>
    </svg>
  );
  if (kind === "spoon") return (
    <svg viewBox="0 0 120 160" width="35%" style={{filter:"drop-shadow(0 6px 10px oklch(0.1 0.01 60 / 0.6))"}}>
      <ellipse cx="60" cy="40" rx="26" ry="32" fill="oklch(0.72 0.01 80)"/>
      <ellipse cx="60" cy="38" rx="20" ry="26" fill="oklch(0.55 0.01 80)"/>
      <rect x="54" y="60" width="12" height="90" rx="3" fill="oklch(0.68 0.01 80)"/>
      <text x="60" y="115" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="oklch(0.2 0.01 60)" transform="rotate(90 60 115)">1944</text>
    </svg>
  );
  if (kind === "trowel") return (
    <svg viewBox="0 0 200 120" width="75%" style={{filter:"drop-shadow(0 4px 8px oklch(0.1 0.01 60 / 0.6))"}}>
      <path d="M10,70 L130,40 L150,60 L30,90 Z" fill="oklch(0.65 0.02 70)" stroke="oklch(0.35 0.01 60)" strokeWidth="1.5"/>
      <path d="M10,70 L130,40 L150,60 L30,90 Z" fill="url(#steel)" opacity="0.6"/>
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.9 0.01 80)" stopOpacity="0.6"/>
          <stop offset="0.5" stopColor="transparent"/>
          <stop offset="1" stopColor="oklch(0.9 0.01 80)" stopOpacity="0.2"/>
        </linearGradient>
      </defs>
      <rect x="145" y="55" width="50" height="12" rx="2" fill="oklch(0.35 0.04 40)" transform="rotate(-8 170 61)"/>
      <rect x="145" y="55" width="50" height="12" rx="2" fill="oklch(0.45 0.05 40)" transform="rotate(-8 170 61)" opacity="0.5"/>
    </svg>
  );
  return null;
}

window.Room4 = Room4;
