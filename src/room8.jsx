// Room 8: Café Bulgakov — literary café exit + guestbook
// (Easter egg homage to Café Pushkin, but themed around Griboedov's / MASSOLIT
//  from Master & Margarita)

const { useState: useS_R8, useEffect: useE_R8 } = React;

function Room8({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  const [entries, setEntries] = useS_R8(() => {
    try { return JSON.parse(localStorage.getItem("guestbook") || "[]"); }
    catch { return []; }
  });
  const [name, setName] = useS_R8("");
  const [msg, setMsg] = useS_R8("");
  const [tableNo] = useS_R8(() => Math.floor(Math.random() * 9) + 3);

  const add = () => {
    if (!msg.trim()) return;
    const n = [{ name: name.trim() || (lang==='en'?"Anonymous guest":"Анонимный гость"), msg: msg.trim(), date: new Date().toISOString() }, ...entries].slice(0,40);
    setEntries(n);
    localStorage.setItem("guestbook", JSON.stringify(n));
    setName(""); setMsg("");
  };

  const defaults = [
    { name:"А. Сахаров", msg:"Молчание невозможно. Молчание это согласие.", date:"1975-12-01"},
    { name:"Читатель", msg:"Прочитал ночью, передал другу к утру. Так и живёт эта книга.", date:"1968-07-14"},
    { name:"V. from Taipei", msg:"The phrase «рукописи не горят» stayed with me for weeks.", date:"2023-04-02"},
    { name:"Студентка, SLAV 340", msg:"Кузёмин был прав. Даже в сети не лижи миски, не стучи.", date:"2026-04-18"},
  ];
  const shown = entries.length ? entries : defaults;

  // Café-specific CSS variables applied to this scope
  const cafe = {
    "--cafe-wood": "oklch(0.28 0.06 50)",
    "--cafe-wood-2": "oklch(0.22 0.05 45)",
    "--cafe-brass": "oklch(0.65 0.12 85)",
    "--cafe-lamp": "oklch(0.65 0.18 145)",
    "--cafe-cream": "oklch(0.94 0.03 80)",
    "--cafe-tablecloth-red": "oklch(0.42 0.14 25)",
    "--cafe-wine": "oklch(0.30 0.12 15)",
  };

  return (
    <Room num={8} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Café Bulgakov" : "Кафе «Булгаков»"}
      sub={lang==='en'
        ? "The last hall. A literary café, after Griboedov's. Sit. Leave a note."
        : "Последний зал. Литературное кафе в духе «Грибоедова». Сядьте. Оставьте запись."}
      audio={{
        title: lang==='en' ? "Closing: literature remembers" : "Заключение: литература помнит",
        narrator: lang==='en' ? "АУДИОГИД · CAFÉ BULGAKOV" : "АУДИОГИД · КАФЕ «БУЛГАКОВ»",
        src: window.AUDIO && window.AUDIO.cafeClosing,
        duration: "3:08"
      }}
    >
      <div style={cafe}>

        {/* ─────────── Café façade header ─────────── */}
        <div style={{
          position:"relative",
          background:`
            linear-gradient(180deg, var(--cafe-wood-2) 0%, var(--cafe-wood) 100%)`,
          padding:"clamp(32px, 5vw, 60px) clamp(24px, 4vw, 48px)",
          color:"var(--cafe-cream)",
          marginBottom:32,
          boxShadow:"inset 0 0 80px oklch(0.1 0.02 40 / 0.8), 0 12px 40px oklch(0.2 0.02 40 / 0.35)",
          overflow:"hidden"
        }}>
          {/* Wood grain */}
          <div style={{
            position:"absolute",inset:0,pointerEvents:"none",opacity:0.25,
            backgroundImage:`
              repeating-linear-gradient(90deg,
                transparent 0 60px,
                oklch(0.18 0.04 40 / 0.4) 60px 61px,
                transparent 61px 120px,
                oklch(0.18 0.04 40 / 0.3) 120px 121px)`
          }}/>
          {/* Warm lamp glow */}
          <div style={{
            position:"absolute",top:-60,left:"50%",transform:"translateX(-50%)",
            width:400,height:200,pointerEvents:"none",
            background:"radial-gradient(ellipse at center, oklch(0.75 0.18 85 / 0.5), transparent 70%)",
            filter:"blur(20px)"
          }}/>

          <div style={{position:"relative",textAlign:"center"}}>
            <div style={{
              fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.5em",
              color:"var(--cafe-brass)",marginBottom:14,textTransform:"uppercase",
              fontWeight:700
            }}>
              · ЗАЛ 08 · HALL 08 ·
            </div>

            {/* Gilt signage */}
            <div style={{
              display:"inline-block",padding:"0 40px",position:"relative"
            }}>
              <div style={{
                position:"absolute",top:"50%",left:0,
                width:24,height:1,background:"var(--cafe-brass)"
              }}/>
              <div style={{
                position:"absolute",top:"50%",right:0,
                width:24,height:1,background:"var(--cafe-brass)"
              }}/>
              <div style={{
                fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.4em",
                color:"var(--cafe-brass)",marginBottom:6
              }}>
                {lang==='en' ? "LITERARY" : "ЛИТЕРАТУРНОЕ"}
              </div>
            </div>

            <h1 style={{
              fontFamily:"var(--serif)",
              fontSize:"clamp(54px, 9vw, 120px)",
              fontWeight:700,lineHeight:0.9,margin:"0 0 10px",
              color:"var(--cafe-cream)",letterSpacing:"-0.02em",
              textShadow:"0 2px 0 oklch(0.15 0.02 40), 0 0 40px oklch(0.75 0.15 85 / 0.4)",
              fontStyle:"italic"
            }}>
              Кафе
            </h1>
            <div style={{
              fontFamily:"var(--serif)",
              fontSize:"clamp(36px, 6vw, 72px)",
              fontWeight:700,lineHeight:1,
              color:"var(--cafe-brass)",letterSpacing:"0.04em",
              textTransform:"uppercase",
              marginBottom:14
            }}>
              «Булгаков»
            </div>
            <div style={{
              fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.45em",
              color:"var(--cafe-cream)",opacity:0.75,textTransform:"uppercase"
            }}>
              est. 1928 · Moscow · Patriarch's Ponds
            </div>
            <div style={{
              marginTop:20,fontFamily:"var(--serif)",fontStyle:"italic",
              fontSize:"clamp(14px, 1.4vw, 17px)",
              color:"var(--cafe-cream)",opacity:0.8,maxWidth:520,margin:"20px auto 0"
            }}>
              {lang==='en'
                ? "After Griboedov's, the writers' club in Master & Margarita. The only true literary address in Moscow."
                : "После «Грибоедова», клуба литераторов из «Мастера и Маргариты». Единственный истинный литературный адрес в Москве."}
            </div>
          </div>

          {/* Brass corners */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i) => (
            <div key={i} style={{
              position:"absolute",[v]:12,[h]:12,
              width:40,height:40,
              borderTop: v==="top" ? "2px solid var(--cafe-brass)" : "none",
              borderBottom: v==="bottom" ? "2px solid var(--cafe-brass)" : "none",
              borderLeft: h==="left" ? "2px solid var(--cafe-brass)" : "none",
              borderRight: h==="right" ? "2px solid var(--cafe-brass)" : "none",
              opacity:0.8
            }}/>
          ))}
        </div>

        {/* ─────────── Host stand ─────────── */}
        <div style={{
          textAlign:"center",marginBottom:36,
          padding:"22px",
          background:"var(--paper-2)",
          border:"1px solid var(--cafe-wood)",
          position:"relative"
        }}>
          <div style={{
            fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
            color:"var(--cafe-wood)",marginBottom:8,fontWeight:700
          }}>
            {lang==='en' ? "HOSTESS" : "МЕТРДОТЕЛЬ"}
          </div>
          <div style={{
            fontFamily:"var(--serif)",fontSize:"clamp(18px, 2vw, 22px)",
            fontStyle:"italic",color:"var(--ink)",lineHeight:1.5
          }}>
            {lang==='en'
              ? `Welcome. Your table is №${tableNo}, by the window. A waiter will bring the menu.`
              : `Добро пожаловать. Ваш столик №${tableNo}, у окна. Официант принесёт меню.`}
          </div>
          <div style={{position:"absolute",top:-14,right:20}}>
            <Stamp rotate={-4} size={0.9} color="blue">
              {lang==='en'?`TABLE №${tableNo}`:`СТОЛИК №${tableNo}`}
            </Stamp>
          </div>
        </div>

        {/* ─────────── The Menu (synthesis of 4 authors) ─────────── */}
        <div style={{
          background:"var(--cafe-cream)",
          border:"1px solid var(--cafe-wood)",
          padding:"clamp(28px, 4vw, 44px)",
          marginBottom:36,
          position:"relative",
          boxShadow:"4px 6px 0 var(--cafe-wood-2), 0 10px 30px oklch(0.2 0.02 40 / 0.15)"
        }}>
          <div style={{
            position:"absolute",top:10,left:10,right:10,bottom:10,
            border:"1px dashed var(--cafe-wood)",pointerEvents:"none"
          }}/>

          <div style={{textAlign:"center",marginBottom:28,position:"relative"}}>
            <div style={{
              fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.4em",
              color:"var(--cafe-wood)",marginBottom:10
            }}>
              · МЕНЮ · MENU ·
            </div>
            <div style={{
              fontFamily:"var(--serif)",fontSize:"clamp(26px, 3vw, 36px)",
              fontWeight:700,fontStyle:"italic",color:"var(--ink)",lineHeight:1.1
            }}>
              {lang==='en' ? "Four voices — one resistance" : "Четыре голоса — одно сопротивление"}
            </div>
            <div style={{
              width:80,height:1,background:"var(--cafe-wood)",
              margin:"14px auto"
            }}/>
            <div style={{
              fontFamily:"var(--serif)",fontStyle:"italic",
              fontSize:"clamp(13px, 1.3vw, 15px)",color:"var(--ink-soft)"
            }}>
              {lang==='en'
                ? "Today's selection. Each course, a way of writing against the state."
                : "Сегодняшний выбор. Каждое блюдо способ писать против системы."}
            </div>
          </div>

          {/* Menu items */}
          <div style={{display:"grid",gap:18,position:"relative"}}>
            {[
              { course: lang==='en'?"APERITIF":"АПЕРИТИВ",
                name:"Хвильовий",
                fn: lang==='en'?"tragedy":"трагедия",
                desc: lang==='en'
                  ? "Shows how revolution devours the soul from within. Tragedy, inner conflict, the mother as a last conscience."
                  : "Показывает, как революция пожирает душу изнутри. Трагедия, внутренний конфликт, мать как последняя совесть.",
                price:"1927"
              },
              { course: lang==='en'?"FIRST COURSE":"ПЕРВОЕ",
                name:"Довлатов",
                fn: lang==='en'?"absurdity":"абсурд",
                desc: lang==='en'
                  ? "Exposes the absurdity of the system through humor and sarcasm. Even the alphabet becomes a field of ideological battle."
                  : "Обнажает абсурд системы через юмор и сарказм. Даже алфавит становится полем идеологической битвы.",
                price:"1981"
              },
              { course: lang==='en'?"MAIN":"ОСНОВНОЕ",
                name:"Солженицын",
                fn: lang==='en'?"witness":"свидетельство",
                desc: lang==='en'
                  ? "Camp reality with merciless precision. Preserving dignity in inhuman conditions is itself a form of resistance."
                  : "Реальность лагеря с беспощадной точностью. Сохранение достоинства в нечеловеческих условиях есть форма сопротивления.",
                price:"1962"
              },
              { course: lang==='en'?"DIGESTIF":"ДИЖЕСТИВ",
                name:"Булгаков",
                fn: lang==='en'?"phantasmagoria":"фантасмагория",
                desc: lang==='en'
                  ? "Dismantles Soviet reality through phantasmagoria. Truth, once written down, cannot be destroyed."
                  : "Разрушает советскую действительность фантасмагорией. Правда, однажды записанная, неуничтожима.",
                price:"1940"
              },
            ].map((item,i) => (
              <div key={i} style={{
                display:"grid",gridTemplateColumns:"110px 1fr auto",
                gap:18,alignItems:"baseline",
                paddingBottom:18,
                borderBottom: i < 3 ? "1px dotted var(--cafe-wood)" : "none"
              }}>
                <div style={{
                  fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.25em",
                  color:"var(--cafe-tablecloth-red)",fontWeight:700,textTransform:"uppercase"
                }}>
                  {item.course}
                </div>
                <div>
                  <div style={{
                    fontFamily:"var(--serif)",fontSize:"clamp(18px, 2vw, 22px)",
                    fontWeight:700,color:"var(--ink)",marginBottom:3
                  }}>
                    {item.name}
                    <span style={{
                      fontFamily:"var(--mono)",fontSize:10,
                      fontWeight:400,color:"var(--cafe-wood)",
                      marginLeft:10,letterSpacing:"0.15em",textTransform:"uppercase",fontStyle:"normal"
                    }}>
                      · {item.fn}
                    </span>
                  </div>
                  <div style={{
                    fontFamily:"var(--typed)",fontSize:14,lineHeight:1.6,
                    color:"var(--ink-soft)",fontStyle:"italic"
                  }}>
                    {item.desc}
                  </div>
                </div>
                <div style={{
                  fontFamily:"var(--serif)",fontSize:22,fontWeight:700,
                  color:"var(--cafe-wood)",fontStyle:"italic"
                }}>
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          {/* Wine-ring stain */}
          <div style={{
            position:"absolute",bottom:40,right:60,
            width:70,height:70,borderRadius:"50%",
            border:"2px solid var(--cafe-wine)",opacity:0.2,
            pointerEvents:"none"
          }}/>
          <div style={{
            position:"absolute",bottom:55,right:85,
            width:36,height:36,borderRadius:"50%",
            border:"1px solid var(--cafe-wine)",opacity:0.18,
            pointerEvents:"none"
          }}/>
        </div>

        {/* ─────────── Publication timeline — written vs. published ─────────── */}
        <PublicationTimeline lang={lang}/>

        {/* ─────────── Closing line ─────────── */}
        <div style={{
          padding:"28px 32px",background:"var(--ink)",color:"var(--paper)",
          marginBottom:36,position:"relative",
          backgroundImage:`linear-gradient(180deg, oklch(0.1 0.01 60 / 0.95), oklch(0.15 0.01 60 / 0.95)), url("${window.IMG?.samizdat||''}")`,
          backgroundSize:"cover",backgroundPosition:"center"
        }}>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",opacity:0.55,marginBottom:14}}>
            {lang==='en'?"· AFTER-DINNER ·":"· ПОСЛЕ УЖИНА ·"}
          </div>
          <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.5vw, 17px)",lineHeight:1.75,margin:"0 0 14px",opacity:0.9}}>
            {lang==='en'
              ? "All four used literature as a form of hidden resistance: one through tragedy, another through humor, a third through realism, a fourth through fantasy. All arrived at the same place. Literature can say what cannot be spoken aloud. A person who has preserved even a grain of inner truth is invincible, even if the system has defeated them outwardly."
              : "Все четверо использовали литературу как форму скрытого сопротивления: кто-то через трагедию, кто-то через юмор, кто-то через реализм, кто-то через фантастику. Все пришли к одному. Литература способна сказать то, что невозможно произнести вслух. Человек, сохранивший хотя бы крупицу внутренней правды, непобедим, даже если система победила его внешне."}
          </p>
          <p style={{fontFamily:"var(--serif)",fontSize:"clamp(18px, 2vw, 22px)",fontStyle:"italic",lineHeight:1.5,margin:"10px 0 0"}}>
            {lang==='en'
              ? "Not a slogan. Not a call to arms. A quiet, stubborn insistence. We see. We remember. We know the truth."
              : "Не лозунг. Не призыв к оружию. Тихое, упрямое утверждение. Мы видим. Мы помним. Мы знаем правду."}
          </p>
          <div style={{position:"absolute",bottom:-14,right:40}}>
            <Stamp rotate={-6} size={1.1} color="blue">{lang==='en'?"END OF EXHIBIT":"КОНЕЦ ВЫСТАВКИ"}</Stamp>
          </div>
        </div>

        {/* ─────────── Guestbook (the bar's leather book) ─────────── */}
        <div style={{
          background:`
            linear-gradient(135deg, var(--cafe-tablecloth-red) 0%, oklch(0.32 0.12 20) 100%)`,
          padding:"4px",
          marginBottom:16,
          boxShadow:"0 10px 30px oklch(0.15 0.02 20 / 0.35)"
        }}>
          <div style={{
            background:"var(--cafe-cream)",
            padding:"clamp(26px, 4vw, 44px)",
            position:"relative"
          }}>
            {/* Tablecloth pattern edge */}
            <div style={{
              position:"absolute",top:0,left:0,right:0,height:8,
              backgroundImage:"repeating-linear-gradient(45deg, var(--cafe-tablecloth-red) 0 8px, var(--cafe-cream) 8px 16px)",
              opacity:0.4
            }}/>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22,flexWrap:"wrap",gap:14,marginTop:12}}>
              <div>
                <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",color:"var(--cafe-tablecloth-red)",fontWeight:700,marginBottom:6}}>
                  INTERACTIVE · {lang==='en'?"HOUSE BOOK":"ГОСТЕВАЯ КНИГА"}
                </div>
                <div style={{fontFamily:"var(--serif)",fontSize:"clamp(24px, 2.6vw, 32px)",fontWeight:700,color:"var(--ink)",fontStyle:"italic",lineHeight:1.1}}>
                  {lang==='en'?"Sign before you leave":"Распишитесь перед уходом"}
                </div>
                <div style={{fontFamily:"var(--typed)",fontSize:13,color:"var(--ink-soft)",marginTop:6,fontStyle:"italic"}}>
                  {lang==='en'?"The café keeps every visitor's mark. Even the quiet ones.":"Кафе хранит след каждого гостя. Даже самых тихих."}
                </div>
              </div>
              <Stamp rotate={3}>{lang==='en'?"PAID · 01":"ОПЛАЧЕНО · 01"}</Stamp>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,marginBottom:22}}>
              <input value={name} onChange={e=>setName(e.target.value)}
                placeholder={lang==='en'?"Your name (or travel under a pseudonym)":"Ваше имя (или под псевдонимом)"}
                style={guestInput}/>
              <textarea value={msg} onChange={e=>setMsg(e.target.value)}
                placeholder={lang==='en'?"What stayed with you?":"Что вас зацепило?"}
                rows={3} style={{...guestInput,resize:"vertical"}}/>
              <button onClick={add} style={{
                background:"var(--cafe-tablecloth-red)",color:"var(--cafe-cream)",border:"none",
                padding:"14px 22px",fontFamily:"var(--mono)",fontSize:12,
                letterSpacing:"0.25em",cursor:"pointer",textTransform:"uppercase",
                boxShadow:"3px 3px 0 var(--ink)",alignSelf:"flex-start",width:"fit-content",
                fontWeight:700
              }}>
                {lang==='en'?"✎ Sign the book":"✎ Расписаться"}
              </button>
            </div>

            <div style={{
              borderTop:"1px dashed var(--cafe-wood)",paddingTop:18,
              display:"grid",gap:14,maxHeight:440,overflowY:"auto"
            }}>
              {shown.map((e, i) => (
                <div key={i} style={{
                  background:"var(--paper)",padding:"14px 18px",
                  borderLeft:"3px solid var(--cafe-tablecloth-red)",
                  fontFamily:"var(--typed)",
                  transform:`rotate(${(i%3-1)*0.3}deg)`,
                  boxShadow:"1px 2px 0 var(--paper-shadow)",
                  position:"relative"
                }}>
                  {/* Small wine ring on every 3rd entry */}
                  {i % 3 === 0 && (
                    <div style={{
                      position:"absolute",top:-8,right:20,width:22,height:22,
                      borderRadius:"50%",border:"1.5px solid var(--cafe-wine)",
                      opacity:0.22,pointerEvents:"none"
                    }}/>
                  )}
                  <div style={{fontSize:14,lineHeight:1.5,color:"var(--ink)",fontStyle:"italic",marginBottom:6}}>
                    « {e.msg} »
                  </div>
                  <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.15em",color:"var(--ink-soft)",display:"flex",justifyContent:"space-between",gap:8}}>
                    <span>— {e.name}</span>
                    <span>{e.date.slice(0,10)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Check/receipt */}
        <div style={{
          background:"var(--paper)",
          border:"1px dashed var(--cafe-wood)",
          padding:"16px 22px",marginTop:24,
          fontFamily:"var(--mono)",fontSize:11,
          color:"var(--ink-soft)",letterSpacing:"0.1em",
          maxWidth:400,margin:"24px auto 0",
          textAlign:"center",
          boxShadow:"2px 2px 0 var(--paper-shadow)"
        }}>
          <div style={{fontWeight:700,letterSpacing:"0.3em",marginBottom:6,color:"var(--cafe-wood)"}}>
            КАФЕ «БУЛГАКОВ»
          </div>
          <div style={{fontSize:10,marginBottom:10,opacity:0.7}}>
            SLAV 340B · Patriarch's Ponds · Moscow
          </div>
          <div style={{borderTop:"1px dashed var(--ink-soft)",borderBottom:"1px dashed var(--ink-soft)",padding:"6px 0",margin:"6px 0"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span>{lang==='en'?"VISIT":"ВИЗИТ"}</span><span>× 1</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span>{lang==='en'?"COVER":"ВХОД"}</span><span>{lang==='en'?"FREE":"БЕСПЛ."}</span></div>
            <div style={{display:"flex",justifyContent:"space-between"}}><span>{lang==='en'?"TIP":"ЧАЕВЫЕ"}</span><span>{lang==='en'?"a kind word":"доброе слово"}</span></div>
          </div>
          <div style={{letterSpacing:"0.3em",fontWeight:700}}>
            {lang==='en'?"THANK YOU · COME BACK":"БЛАГОДАРИМ · ЗАХОДИТЕ"}
          </div>
        </div>

        <div style={{
          marginTop:40,textAlign:"center",
          fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
          color:"var(--ink-ghost)",paddingTop:24,borderTop:"1px dashed var(--ink-soft)"
        }}>
          · SAMIZDAT · ЧИТАЙ И ПЕРЕДАЙ ДРУГОМУ · PASS IT ON · КОПИЯ №1 ·
        </div>

        {/* Woland's parting words — the last thing the visitor sees */}
        <WolandExit lang={lang}/>

      </div>
    </Room>
  );
}

const guestInput = {
  background:"var(--paper)",border:"1px solid var(--cafe-wood)",
  padding:"12px 14px",fontFamily:"var(--typed)",fontSize:14,
  color:"var(--ink)",outline:"none",
  boxShadow:"inset 1px 1px 0 var(--paper-shadow)"
};

// ═══════════════════════════════════════════════════════════════════════════
// Publication timeline — for each author, "written" and "published" dots
// connected by a censorship-dashed line. The gap between the two visually
// encodes how long the USSR silenced each voice.
// ═══════════════════════════════════════════════════════════════════════════
function PublicationTimeline({ lang }){
  const [hovered, setHovered] = useS_R8(null);
  // Timeline spans 1920 → 1990
  const YEAR_MIN = 1920, YEAR_MAX = 1990;
  const pct = (y) => ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;

  const rows = [
    { key:"khvylovy", label:"Хвильовий", enLabel:"Khvylovy", written:1924, published:1924,
      gapRu:"Ноты 1933: самоубийство · запрет · 50 лет в забвении",
      gapEn:"Suicide 1933 · banned · erased for 50 years",
      endMark:1933 },
    { key:"solz",     label:"Солженицын", enLabel:"Solzhenitsyn", written:1959, published:1962,
      gapRu:"3 года до печати · повторный запрет с 1974 года",
      gapEn:"3 years to print · re-banned from 1974",
      endMark:1974 },
    { key:"bulgakov", label:"Булгаков", enLabel:"Bulgakov", written:1928, published:1966,
      gapRu:"«В стол» 38 лет · 26 лет после смерти автора",
      gapEn:"In the drawer 38 years · 26 years after the author's death",
      endMark:1940 },
    { key:"dovlatov", label:"Довлатов", enLabel:"Dovlatov", written:1973, published:1981,
      gapRu:"В СССР не напечатан · публикация в эмиграции",
      gapEn:"Never printed in USSR · published only in exile (USA)",
      endMark:null },
  ];

  return (
    <section style={{
      background:"var(--paper-2)",
      border:"1px solid var(--cafe-wood)",
      padding:"clamp(24px, 4vw, 40px)",
      marginBottom:36,
      boxShadow:"3px 4px 0 var(--cafe-wood-2)"
    }}>
      <div style={{textAlign:"center",marginBottom:22}}>
        <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.4em",color:"var(--cafe-wood)",fontWeight:700,marginBottom:6}}>
          · {lang==='en' ? "ARCHIVE" : "АРХИВ"} ·
        </div>
        <div style={{fontFamily:"var(--serif)",fontSize:"clamp(22px, 2.4vw, 30px)",fontWeight:700,fontStyle:"italic",color:"var(--ink)"}}>
          {lang==='en' ? "When it was written · when the public was allowed to read it" : "Когда написано · когда разрешили читать"}
        </div>
        <div style={{fontFamily:"var(--typed)",fontSize:13,color:"var(--ink-soft)",marginTop:6,fontStyle:"italic"}}>
          {lang==='en' ? "The distance between the two is the shape of censorship." : "Расстояние между точками — форма цензуры."}
        </div>
      </div>

      {/* Decade scale */}
      <div style={{
        position:"relative",height:22,marginBottom:4,
        borderBottom:"1px solid var(--ink-soft)"
      }}>
        {[1920,1930,1940,1950,1960,1970,1980,1990].map(y => (
          <div key={y} style={{
            position:"absolute",left:`${pct(y)}%`,bottom:0,
            transform:"translateX(-50%)",
            fontFamily:"var(--mono)",fontSize:10,color:"var(--ink-soft)",
            letterSpacing:"0.1em"
          }}>
            <span style={{display:"block",width:1,height:6,background:"var(--ink-soft)",margin:"0 auto 2px"}}/>
            {y}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{display:"grid",gap:18,marginTop:18}}>
        {rows.map(r => {
          const wLeft = pct(r.written);
          const pLeft = pct(r.published);
          const isHover = hovered === r.key;
          return (
            <div key={r.key}
              onMouseEnter={() => setHovered(r.key)}
              onMouseLeave={() => setHovered(null)}
              style={{position:"relative",padding:"6px 0"}}>
              <div style={{
                fontFamily:"var(--serif)",fontSize:15,fontWeight:700,
                color: isHover ? "var(--cafe-tablecloth-red)" : "var(--ink)",
                marginBottom:8, letterSpacing:"0.03em",
                transition:"color 200ms"
              }}>
                {lang==='en' ? r.enLabel : r.label}
              </div>
              <div style={{position:"relative",height:26}}>
                {/* connector */}
                <div style={{
                  position:"absolute",
                  left:`${Math.min(wLeft,pLeft)}%`,
                  width:`${Math.abs(pLeft - wLeft)}%`,
                  top:12,height:2,
                  backgroundImage:"repeating-linear-gradient(90deg, var(--cafe-wood) 0 6px, transparent 6px 10px)"
                }}/>
                {/* terminal death / re-ban marker */}
                {r.endMark && (
                  <div style={{
                    position:"absolute",left:`${pct(r.endMark)}%`,top:4,
                    transform:"translateX(-50%)"
                  }}>
                    <svg width="16" height="18" viewBox="0 0 16 18">
                      <line x1="2" y1="2" x2="14" y2="14" stroke="var(--cafe-tablecloth-red)" strokeWidth="2"/>
                      <line x1="14" y1="2" x2="2" y2="14" stroke="var(--cafe-tablecloth-red)" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                {/* written dot */}
                <Dot left={wLeft} label={lang==='en'?"WRITTEN":"НАПИСАНО"} year={r.written} color="var(--cafe-wood)" solid/>
                {/* published dot */}
                <Dot left={pLeft} label={lang==='en'?"PUBLISHED":"ОПУБЛ."} year={r.published} color="var(--cafe-tablecloth-red)"/>
              </div>
              {isHover && (
                <div style={{
                  marginTop:8,padding:"8px 12px",
                  background:"var(--paper)",borderLeft:"3px solid var(--cafe-tablecloth-red)",
                  fontFamily:"var(--typed)",fontSize:13,fontStyle:"italic",color:"var(--ink-soft)",
                  boxShadow:"1px 2px 0 var(--paper-shadow)"
                }}>
                  {lang==='en' ? r.gapEn : r.gapRu}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Dot({ left, label, year, color, solid }){
  return (
    <div style={{
      position:"absolute",left:`${left}%`,top:4,transform:"translateX(-50%)",
      display:"flex",flexDirection:"column",alignItems:"center",gap:2
    }}>
      <div style={{
        width:14,height:14,borderRadius:"50%",
        background: solid ? color : "var(--paper)",
        border:`2px solid ${color}`
      }}/>
      <div style={{
        fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.15em",
        color:"var(--ink-soft)",fontWeight:700,whiteSpace:"nowrap"
      }}>
        {year} · {label}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Woland's parting words — fade in on scroll, theatrical sulfur-yellow glow.
// Last thing the visitor sees before they close the exhibit.
// ═══════════════════════════════════════════════════════════════════════════
function WolandExit({ lang }){
  const [visible, setVisible] = useS_R8(false);
  const ref = React.useRef(null);
  useE_R8(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      marginTop:56, padding:"clamp(36px, 6vw, 80px) clamp(20px, 4vw, 48px)",
      background:"linear-gradient(180deg, oklch(0.16 0.04 280) 0%, oklch(0.1 0.02 300) 100%)",
      position:"relative",overflow:"hidden",
      textAlign:"center",
      boxShadow:"inset 0 0 120px oklch(0.5 0.2 70 / 0.25)"
    }}>
      {/* Stage spotlight glow */}
      <div style={{
        position:"absolute",top:"-40%",left:"50%",transform:"translateX(-50%)",
        width:"80%",height:"140%",pointerEvents:"none",
        background:"radial-gradient(ellipse at center, oklch(0.75 0.18 85 / 0.35), transparent 60%)",
        filter:"blur(30px)"
      }}/>
      <div style={{
        position:"relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition:"opacity 2.5s ease-out, transform 2.5s ease-out"
      }}>
        <div style={{
          fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.5em",
          color:"oklch(0.75 0.14 80)",marginBottom:24,fontWeight:700
        }}>
          — {lang==='en' ? "WOLAND, FROM THE BALCONY" : "ВОЛАНД · С БАЛКОНА"} —
        </div>
        <blockquote style={{
          fontFamily:"var(--serif)",
          fontSize:"clamp(18px, 2.4vw, 28px)",
          lineHeight:1.55,
          fontStyle:"italic",
          color:"oklch(0.94 0.06 80)",
          textShadow:"0 0 32px oklch(0.8 0.18 75 / 0.45)",
          margin:"0 auto",maxWidth:780
        }}>
          «Ну что ж… они — люди как люди. Любят деньги, но ведь это всегда было… Ну, легкомысленны… ну, что ж… и милосердие иногда стучится в их сердца… обыкновенные люди…»
        </blockquote>
        {lang === 'en' && (
          <div style={{
            marginTop:18,fontFamily:"var(--typed)",fontSize:15,fontStyle:"italic",
            color:"oklch(0.82 0.04 80)",opacity:0.8,maxWidth:680,margin:"18px auto 0",lineHeight:1.5
          }}>
            "Well then… they are people like any other people. They love money, but that has always been so… They are frivolous, sometimes, yes, but… mercy does still knock at their hearts sometimes… ordinary people…"
          </div>
        )}
      </div>
    </div>
  );
}

window.Room8 = Room8;
