// Room 7: Bulgakov - Manuscripts don't burn
const { useState: useS_R7, useEffect: useE_R7, useRef: useR_R7 } = React;

function Room7({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  return (
    <Room num={7} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Bulgakov · \"Manuscripts don't burn\"" : "Булгаков · «Рукописи не горят»"}
      sub={lang==='en' ? "Truth, cowardice, and love as rebellion" : "Правда, трусость и любовь как бунт"}
      audio={{ title: lang==='en' ? "Master, Pilate, Margarita" : "Мастер, Пилат, Маргарита", narrator:"YOUR AUDIO · АУДИО", duration:"6:10" }}
      tint="linear-gradient(180deg, oklch(0.82 0.025 280 / 0.4) 0%, oklch(0.78 0.04 30 / 0.35) 100%)"
    >
      {/* Burning manuscript interaction */}
      <BurningManuscript lang={lang}/>

      {/* Margarita's flight */}
      <window.MargaritaFlight lang={lang}/>

      {/* Samizdat carbon copies */}
      <window.CarbonStack lang={lang}/>

      <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(24px, 2.6vw, 32px)",marginTop:40,marginBottom:14,fontWeight:700,color:"var(--ink)"}}>
        {lang==='en'?"I. The Master and suppressed truth":"I. Мастер и подавленная правда"}
      </h3>
      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.5vw, 17px)",lineHeight:1.75,color:"var(--ink-soft)",margin:"0 0 16px"}}>
        {lang==='en'
          ? "The Master is the single character in the novel who writes not on state commission but from inner necessity. For this alone the system destroys him: the baiting by critics, the loss of his apartment, the psychiatric clinic, which in Soviet context is where dissidents were sent. The Master burns his novel. But Woland pronounces: \"Manuscripts don't burn.\" This is a manifesto: truth is indestructible. Publication can be forbidden, the author imprisoned; but a text containing truth will exist. Bulgakov's novel is itself living proof: written for the drawer, lying there twenty-six years, and then reaching the light."
          : "Мастер — единственный персонаж романа, который пишет не по заказу государства, а по внутренней необходимости. Именно за это система его уничтожает: травля критиков, потеря квартиры, психиатрическая клиника, в советском контексте — место, куда отправляют инакомыслящих. Мастер сжигает свой роман. Но Воланд произносит: «Рукописи не горят.» Это манифест: правда неуничтожима. Можно запретить публикацию, посадить автора, но текст, содержащий правду, будет существовать. Сам роман Булгакова — живое доказательство: написан в стол, пролежал 26 лет и вышел в свет."}
      </p>

      <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(24px, 2.6vw, 32px)",marginTop:40,marginBottom:14,fontWeight:700,color:"var(--ink)"}}>
        {lang==='en'?"II. Pontius Pilate: cowardice as the chief vice":"II. Понтий Пилат: трусость как главный порок"}
      </h3>
      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.5vw, 17px)",lineHeight:1.75,color:"var(--ink-soft)",margin:"0 0 16px"}}>
        {lang==='en'
          ? "The Master's novel about Pilate is a mirror of Soviet reality. Pilate is not a villain; he is clever, skeptical, sympathetic. He understands that Yeshua is innocent. But he signs the sentence out of fear for his career, status, safety. Bulgakov places cowardice above cruelty in the hierarchy of vices. It is a commentary on a reality where millions of people knew the truth and kept silent. In the finale Pilate torments himself and begs forgiveness:"
          : "Роман Мастера о Пилате — зеркало советской действительности. Пилат не злодей; он умный, скептический, сочувствующий. Он понимает, что Иешуа невиновен. Но подписывает приговор из страха за карьеру, статус, безопасность. Булгаков ставит трусость выше жестокости в иерархии пороков. Это комментарий к реальности, где миллионы людей знали правду, но молчали. В финале Пилат мучается и просит прощения:"}
      </p>
      <Quote attr={lang==='en'?"Pontius Pilate, Ivan's final dream":"Понтий Пилат · финальный сон Ивана"}>Боги, боги, — говорит, обращая надменное лицо к своему спутнику, тот человек в плаще, — какая пошлая казнь! Но ты мне, пожалуйста, скажи... ведь её не было! Молю тебя, скажи, не было?</Quote>
      <Analysis>
        {lang==='en'
          ? "Pilate begs for confirmation that the execution never happened, that is, he begs to be freed of guilt for his cowardice. It is the prayer of every Soviet conformist: tell us we are not to blame."
          : "Пилат просит подтверждения, что казни не было, то есть просит освободить его от вины за трусость. Это мольба каждого советского конформиста: скажите, что мы не виноваты."}
      </Analysis>

      <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(24px, 2.6vw, 32px)",marginTop:40,marginBottom:14,fontWeight:700,color:"var(--ink)"}}>
        {lang==='en'?"III. Margarita: love as the last rebellion":"III. Маргарита: любовь как последний бунт"}
      </h3>
      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.5vw, 17px)",lineHeight:1.75,color:"var(--ink-soft)",margin:"0 0 16px"}}>
        {lang==='en'
          ? "Margarita is the one character who performs an open, conscious act of rebellion. She takes Azazello's cream, becomes a witch, and destroys the critic Latunsky's apartment. This is not revenge; it is an uprising of love against the system. Her flight over Moscow is one of the greatest images of freedom in Russian literature. The finale grants the Master and Margarita \"peace\", not paradise, not fame, only quiet and the possibility of being together:"
          : "Маргарита — единственный персонаж, совершающий открытый, сознательный акт бунта. Она принимает крем Азазелло, становится ведьмой, разрушает квартиру критика Латунского. Это не месть, это восстание любви против системы. Её полёт над Москвой — один из величайших образов свободы в русской литературе. Финал дарует Мастеру и Маргарите «покой» — не рай, не славу, а тишину и возможность быть вместе:"}
      </p>
      <Quote attr={lang==='en'?"Margarita, in Ivan's final dream":"Маргарита · в финальном сне Ивана"} big>Всё кончилось и всё кончается... И я вас поцелую в лоб, и всё у вас будет так, как надо.</Quote>
      <Analysis>
        {lang==='en'
          ? "\"Everything has ended and everything is ending\" is both consolation and prophecy. Bulgakov, dying, believed the system was not eternal. History proved him right."
          : "«Всё кончилось и всё кончается» — и утешение, и пророчество. Булгаков, умирая, верил, что система не вечна. История доказала его правоту."}
      </Analysis>
    </Room>
  );
}

function BurningManuscript({ lang }){
  const [burn, setBurn] = useS_R7(false);
  const [revealed, setRevealed] = useS_R7(false);
  useE_R7(() => {
    if (!burn) return;
    const t = setTimeout(() => setRevealed(true), 2800);
    return () => clearTimeout(t);
  }, [burn]);

  const reset = () => { setBurn(false); setRevealed(false); };

  return (
    <div style={{
      background:"linear-gradient(180deg, oklch(0.18 0.02 30) 0%, oklch(0.12 0.015 25) 100%)",
      padding:"clamp(24px, 4vw, 40px)",marginBottom:40,
      color:"oklch(0.9 0.02 75)",position:"relative",overflow:"hidden",
      border:"1px solid oklch(0.35 0.05 30)",
      boxShadow:"inset 0 0 60px oklch(0.5 0.15 30 / 0.2)"
    }}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",color:"oklch(0.7 0.1 60)",marginBottom:4}}>
            INTERACTIVE · {lang==='en'?"BURN THE MANUSCRIPT":"СОЖГИТЕ РУКОПИСЬ"}
          </div>
          <div style={{fontFamily:"var(--serif)",fontSize:"clamp(22px, 2.4vw, 30px)",fontWeight:700,fontStyle:"italic"}}>
            {lang==='en'?"«Manuscripts don't burn»":"«Рукописи не горят»"}
          </div>
        </div>
        <button onClick={burn ? reset : () => setBurn(true)} style={{
          background: burn ? "transparent" : "oklch(0.55 0.16 35)",
          color: burn ? "oklch(0.85 0.08 60)" : "oklch(0.95 0.02 80)",
          border: burn ? "1px solid oklch(0.7 0.08 60)" : "none",
          padding:"10px 22px",fontFamily:"var(--mono)",fontSize:12,
          letterSpacing:"0.15em",cursor:"pointer",textTransform:"uppercase",
          boxShadow: burn ? "none" : "3px 3px 0 oklch(0.18 0.02 30)"
        }}>
          {burn ? (lang==='en'?"↻ Restore":"↻ Восстановить") : (lang==='en'?"🔥 Ignite":"🔥 Поджечь")}
        </button>
      </div>

      <div style={{
        position:"relative",minHeight:320,
        display:"flex",alignItems:"center",justifyContent:"center"
      }}>
        {/* Manuscript paper */}
        <div style={{
          width:"min(100%, 520px)",
          background: revealed ? "transparent" : "oklch(0.9 0.025 75)",
          color:"oklch(0.2 0.01 60)",
          padding:"36px 38px",
          position:"relative",
          boxShadow: burn && !revealed
            ? "0 0 40px oklch(0.7 0.2 40 / 0.7), 0 0 80px oklch(0.65 0.2 30 / 0.4)"
            : "3px 4px 0 oklch(0.08 0.01 30), 0 10px 30px oklch(0.05 0 30 / 0.5)",
          fontFamily:"var(--typed)",fontSize:14,lineHeight:1.7,
          transition:"all 1.8s ease-out",
          opacity: revealed ? 0 : 1,
          transform: burn ? "rotate(-2deg) scale(0.96)" : "rotate(0deg) scale(1)",
          filter: burn && !revealed ? "sepia(0.6) brightness(0.7) contrast(1.2)" : "none"
        }}>
          <div style={{
            fontFamily:"var(--serif)",fontSize:20,fontStyle:"italic",fontWeight:700,
            textAlign:"center",marginBottom:16,letterSpacing:"0.02em"
          }}>«Мастер и Маргарита»</div>
          <div style={{
            fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.2em",
            textAlign:"center",color:"oklch(0.4 0.02 60)",marginBottom:24
          }}>РУКОПИСЬ · 1928–1940</div>
          <p style={{margin:"0 0 10px"}}>Глава 13. Явление героя.</p>
          <p style={{margin:"0 0 10px",fontStyle:"italic",opacity:0.85}}>
            Когда я вынес из коридора в переднюю последние, уже немногочисленные, экземпляры, я включил электричество...
          </p>
          <p style={{margin:"0 0 10px",opacity:0.7}}>
            ... роман, надо мной довлел; он сделал меня больным, и я сжёг его. Но как же его теперь...
          </p>
          {/* Flame overlay */}
          {burn && !revealed && (
            <>
              <div style={{
                position:"absolute",inset:0,
                background:`
                  radial-gradient(ellipse at 50% 110%, oklch(0.75 0.22 45) 0%, oklch(0.65 0.22 30) 15%, oklch(0.4 0.15 25) 35%, transparent 65%),
                  linear-gradient(0deg, oklch(0.25 0.05 30 / 0.9) 0%, transparent 40%)
                `,
                mixBlendMode:"multiply",
                animation:"flicker 0.4s infinite alternate"
              }}/>
              <div style={{
                position:"absolute",bottom:-30,left:"50%",transform:"translateX(-50%)",
                width:"90%",height:80,
                background:"radial-gradient(ellipse at center top, oklch(0.8 0.25 60 / 0.8), oklch(0.6 0.25 30 / 0.5), transparent 70%)",
                filter:"blur(6px)",
                animation:"flicker 0.3s infinite alternate"
              }}/>
            </>
          )}
        </div>

        {/* Revealed truth */}
        {revealed && (
          <div style={{
            position:"absolute",inset:0,display:"flex",
            alignItems:"center",justifyContent:"center",padding:20,
            animation:"fadeUp 1.4s ease-out"
          }}>
            <div style={{textAlign:"center",maxWidth:640}}>
              <div style={{
                fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.4em",
                color:"oklch(0.75 0.12 60)",marginBottom:16
              }}>— ВОЛАНД —</div>
              <div style={{
                fontFamily:"var(--serif)",fontSize:"clamp(32px, 6vw, 72px)",
                fontWeight:700,fontStyle:"italic",lineHeight:1.05,
                color:"oklch(0.95 0.04 75)",letterSpacing:"-0.02em",
                textShadow:"0 0 40px oklch(0.7 0.15 40 / 0.4)"
              }}>
                «Рукописи<br/>не&nbsp;горят.»
              </div>
              {lang === 'en' && (
                <div style={{
                  marginTop:20,fontFamily:"var(--typed)",fontSize:16,
                  fontStyle:"italic",color:"oklch(0.8 0.04 75)",opacity:0.85
                }}>"Manuscripts don't burn."</div>
              )}
              <div style={{
                marginTop:28,fontFamily:"var(--mono)",fontSize:11,
                letterSpacing:"0.2em",color:"oklch(0.65 0.08 60)",maxWidth:420,margin:"28px auto 0",lineHeight:1.6
              }}>
                {lang==='en'
                  ? "Written 1928–40 · buried 26 years · published 1966 · still read in 2026"
                  : "Написано 1928–40 · пролежало 26 лет · опубликовано 1966 · читается в 2026"}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes flicker {
          0% { opacity: 0.85; }
          100% { opacity: 1; filter: brightness(1.15); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

window.Room7 = Room7;
