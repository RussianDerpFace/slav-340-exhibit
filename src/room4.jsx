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
      image: window.IMG.bread,
      imageFocus: "center 62%",   // keep the bowl of bread in frame at any crop
      quote:"Шухов достал хлебушек в белой тряпице и, не роняя ни крошки мимо той тряпицы, стал помалу отламывать кусочки и класть в рот.",
      analysis_ru:"Каждое действие с едой ритуализовано. Хлеб завёрнут в чистую тряпочку, каша съедается медленно. Это не жадность, это литургия. В системе, где пайку могут украсть, урезать, отнять, Шухов относится к хлебу как к священному предмету. Ритуал еды — это ритуал сохранения себя.",
      analysis_en:"Every gesture with food is ritualized. Bread is wrapped in a clean rag, kasha eaten slowly. This is not greed; it is liturgy. In a system where the ration can be stolen, cut, taken away, Shukhov treats bread as sacred. The ritual of eating is the ritual of preserving the self."
    },
    {
      id:2,
      name_ru:"Ложка", name_en:"Spoon",
      sub_ru:"памятник идентичности", sub_en:"monument to identity",
      image: window.IMG.spoon,
      imageFocus: "center 70%",   // keep the wooden spoon + carved "Ш-854" in frame
      quote:"Усть-Ижма · 1944",
      isQuoteLabel:true,
      analysis_ru:"Ложка с надписью «Усть-Ижма, 1944» — не столовый прибор, а артефакт личной истории. Шухов носит её в валенке, бережёт. В мире, где номер заменяет имя, ложка — единственное, что связывает его с прошлым, с тем, кто он есть на самом деле.",
      analysis_en:"A spoon inscribed \"Ust-Izhma, 1944\" is not a utensil but an artifact of personal history. Shukhov carries it inside his felt boot, protects it. In a world where a number replaces a name, the spoon is the only thing binding him to the past, to who he actually is."
    },
    {
      id:3,
      name_ru:"Мастерок", name_en:"Trowel",
      sub_ru:"свобода через труд", sub_en:"freedom through labor",
      image: window.IMG.trowel,
      imageFocus: "center center",
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
            background:"linear-gradient(180deg, oklch(0.22 0.008 60), oklch(0.14 0.005 60))",
            border:"none",padding:0,cursor:"pointer",
            color:"var(--paper)",textAlign:"left",
            boxShadow: open === a.id ? "0 0 0 3px var(--stamp), 4px 6px 20px oklch(0.1 0.01 60 / 0.5)" : "3px 4px 0 var(--paper-shadow), 0 10px 30px oklch(0.1 0.01 60 / 0.3)",
            transition:"all 0.15s"
          }}>
            {/* Glass vitrine — now a photograph, not a stylized SVG. */}
            <div style={{
              aspectRatio:"3/2",
              position:"relative",
              borderBottom:"3px solid oklch(0.08 0.005 60)",
              overflow:"hidden"
            }}>
              <img
                src={a.image}
                alt={lang==='en' ? a.name_en : a.name_ru}
                loading="lazy"
                style={{
                  position:"absolute",inset:0,
                  width:"100%",height:"100%",
                  objectFit:"cover",
                  objectPosition: a.imageFocus || "center center",
                  filter:"contrast(1.05) saturate(0.92)",
                  display:"block"
                }}
              />
              {/* Top-edge vignette so the exhibit label stays legible */}
              <div style={{
                position:"absolute",inset:0,pointerEvents:"none",
                background:"linear-gradient(180deg, oklch(0.08 0.01 60 / 0.55) 0%, transparent 28%, transparent 72%, oklch(0.08 0.01 60 / 0.25) 100%)"
              }}/>
              {/* Vitrine glass reflection */}
              <div style={{
                position:"absolute",inset:0,pointerEvents:"none",
                background:"linear-gradient(105deg, transparent 0%, transparent 42%, oklch(0.95 0.015 80 / 0.11) 50%, transparent 58%, transparent 100%)"
              }}/>
              <div style={{
                position:"absolute",top:10,left:12,
                fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.25em",
                color:"oklch(0.95 0.02 80)",opacity:0.75,
                textShadow:"0 1px 2px oklch(0.05 0.01 60 / 0.9)"
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
            {/* Full-bleed banner photograph — the artifact "in situ" */}
            <div style={{
              position:"relative",
              aspectRatio:"16/7",
              overflow:"hidden",
              marginBottom:22,
              border:"1px solid var(--ink)",
              boxShadow:"3px 4px 0 var(--paper-shadow)"
            }}>
              <img
                src={a.image}
                alt={lang==='en' ? a.name_en : a.name_ru}
                style={{
                  position:"absolute",inset:0,
                  width:"100%",height:"100%",
                  objectFit:"cover",
                  objectPosition: a.imageFocus || "center center",
                  filter:"contrast(1.05) saturate(0.95)",
                  display:"block"
                }}
              />
              <div style={{
                position:"absolute",inset:0,pointerEvents:"none",
                background:"linear-gradient(180deg, oklch(0.08 0.01 60 / 0.45) 0%, transparent 22%, transparent 80%, oklch(0.08 0.01 60 / 0.35) 100%)"
              }}/>
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

window.Room4 = Room4;
