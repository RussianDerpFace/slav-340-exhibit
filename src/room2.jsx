// Room 2: Sergei Dovlatov — "The Compromise" + censor's desk interaction
const { useState: useS_R2 } = React;

function Room2({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  return (
    <Room num={2} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Sergei Dovlatov · \"The Compromise\"" : "Сергей Довлатов · «Компромисс»"}
      sub={lang==='en' ? "Laughter as a hidden weapon" : "Смех как скрытое оружие"}
      audio={{
        title: lang==='en' ? "Dovlatov: the absurd as diagnosis" : "Довлатов: абсурд как диагноз",
        narrator: lang==='en' ? "PARTNER · SERGEI DOVLATOV" : "АУДИОГИД · СЕРГЕЙ ДОВЛАТОВ",
        src: window.AUDIO && window.AUDIO.dovlatov,
        duration: "4:48"
      }}
    >
      <window.TypewriterCursor/>
      <div style={{
        display:"grid",gridTemplateColumns:"minmax(0, 220px) 1fr",gap:28,
        marginBottom:36,padding:"24px 28px",background:"var(--paper)",
        border:"1px solid var(--ink-soft)",boxShadow:"3px 4px 0 var(--paper-shadow)"
      }}>
        <window.RealPortrait src={window.IMG.dovlatov} name="Сергей Довлатов" years="1941 — 1990" tag="ТАЛЛИН · Н-Й"/>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.25em",color:"var(--stamp)",fontWeight:700,marginBottom:8}}>
            {lang==='en'?"AUTHOR FILE":"ДЕЛО АВТОРА"}
          </div>
          <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(22px,2.4vw,30px)",margin:"0 0 10px",fontWeight:700}}>
            {lang==='en'?"Sergei Dovlatov":"Сергей Довлатов"}
          </h3>
          <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:0}}>
            {lang==='en'
              ? "Russian writer and journalist, correspondent for the Soviet Estonia newspaper in Tallinn. His style is ironic, alive, free of moralizing. He did not condemn his characters; he simply showed them as they were. His work was published in the West and banned in the USSR; he was eventually forced out of the country."
              : "Русский писатель и журналист, работавший корреспондентом газеты «Советская Эстония» в Таллине. Его стиль — ироничный, живой, без морализаторства. Он не осуждал своих героев, а просто показывал их такими, какие они есть. Его произведения публиковались на Западе, а в СССР были запрещены; в итоге он был выслан из страны."}
          </p>
          <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",marginTop:12}}>
            {lang==='en'
              ? "\"The Compromise\", a cycle of stories based on his journalistic experience, shows how Soviet journalists were forced into constant \"compromise\" between the truth and what they were allowed to write. Dovlatov does not attack power directly. Through humor, sarcasm, and absurd situations he shows how ridiculous and hypocritical the system was."
              : "Сборник «Компромисс» — серия историй, основанных на его журналистском опыте, — показывает, как советские журналисты постоянно вынуждены были идти на «компромисс» между правдой и тем, что разрешено писать. Довлатов не нападает на власть напрямую, но через юмор, сарказм и абсурдные ситуации он показывает, насколько нелепой и лицемерной была система."}
          </p>
        </div>
      </div>

      {/* Interactive: the censor's desk */}
      <CensorsDesk lang={lang}/>

      <Exhibit num={1} title={lang==='en'?"The alphabet as ideological error":"Алфавит как идеологическая ошибка"}>
        <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:"0 0 12px"}}>
          {lang==='en'
            ? "In the first \"compromise\", the hero writes an article about a scientific conference and lists the participating countries in alphabetical order. The editor is horrified:"
            : "В первом «компромиссе» герой пишет статью о научной конференции и перечисляет страны-участницы в алфавитном порядке. Редактор в ужасе:"}
        </p>
        <Quote attr="Довлатов, «Компромисс» 1">Вы допустили грубую идеологическую ошибку.</Quote>
        <Quote attr="Довлатов, «Компромисс» 1">Опять по алфавиту?! Забудьте это оппортунистическое слово!</Quote>
        <Analysis>
          {lang==='en'
            ? "The alphabet, the most neutral possible principle of ordering, turns out to be ideologically dangerous because it places socialist countries after capitalist ones. Through this tiny absurd situation Dovlatov shows that in the Soviet system nothing is apolitical, not even the letters of the alphabet are free of ideology."
            : "Алфавит — нейтральнейший принцип упорядочивания — оказывается идеологически опасным, потому что ставит социалистические страны после капиталистических. Через эту крошечную абсурдную ситуацию Довлатов показывает: в советской системе нет ничего аполитичного, даже буквы алфавита подчинены идеологии."}
        </Analysis>
      </Exhibit>

      <Exhibit num={2} title={lang==='en'?"The Estonian bear and Party control":"Медведь-эстонец и партийный контроль"}>
        <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:"0 0 12px"}}>
          {lang==='en'
            ? "In the fourth \"compromise\" the hero writes a harmless children's poem about children who meet a beast speaking Estonian. The Central Committee instructor's reaction:"
            : "В четвёртом «компромиссе» герой пишет безобидное стихотворение для детской рубрики о детях, встретивших зверя, который говорил по-эстонски. Реакция инструктора ЦК:"}
        </p>
        <Quote attr="Довлатов, «Компромисс» 4">Это что же получается? Выходит, эстонец — зверь? Я — зверь? Я, инструктор Центрального Комитета партии, — зверь?!</Quote>
        <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:"12px 0"}}>
          {lang==='en'
            ? "They suggest the beast instead speak \"the language of one of the capitalist countries\". When a trip \"West, to East Germany\" is mentioned, someone asks: \"And the worst of the worst? To the East?\" Reply: \"Japan, that is the West. Ideologically speaking.\""
            : "Предлагают, чтобы зверь говорил «на языке одной из капиталистических стран». Когда упоминают поездку «на Запад, в ГДР», звучит вопрос: «А худший из худших — на Восток?» Ответ: «Вот Япония — это Запад! В идейном смысле.»"}
        </p>
        <Analysis>
          {lang==='en'
            ? "Ideology has so distorted language and logic that words have lost all contact with reality. \"West\" and \"East\" are no longer geography but political labels the system assigns at will."
            : "Идеология настолько извратила язык и логику, что слова потеряли связь с реальностью. «Запад» и «Восток» — уже не география, а политические ярлыки, которые система наклеивает по своему усмотрению."}
        </Analysis>
      </Exhibit>

      <Exhibit num={3} title={lang==='en'?"The ideal Soviet child":"Идеальный советский ребёнок"}>
        <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:"0 0 12px"}}>
          {lang==='en'
            ? "In the fifth \"compromise\", the editorial office is to write a piece about Tallinn's 400,000th resident. But the child must meet requirements:"
            : "В пятом «компромиссе» редакция должна написать статью о 400 000-м жителе Таллина. Но ребёнок должен соответствовать требованиям:"}
        </p>
        <Quote attr="Довлатов, «Компромисс» 5">Никаких матерей-одиночек. Полный комплект родителей. Здоровый, социально полноценный мальчик.</Quote>
        <Quote attr="Довлатов, «Компромисс» 5">Дождитесь нормального — вы слышите меня? — нормального человеческого ребенка!</Quote>
        <Analysis>
          {lang==='en'
            ? "A real child is not suitable for a Soviet newspaper; an ideologically correct one is needed. When one is finally found, the editor insists the boy be named Lembit because it is \"symbolic\". The system does not merely control the present, it tries to rewrite reality itself. Dovlatov's humor here is especially sharp: behind the comic situation lies the fact that in the USSR even the birth of a child became a matter of Party control."
            : "Реальный ребёнок не годится для советской газеты — нужен идеологически правильный. Когда подходящий наконец находится, редактор требует назвать его Лембитом, потому что это «символично». Система не просто контролирует настоящее — она пытается переписать саму реальность. Юмор Довлатова здесь особенно остр: за смешной ситуацией скрывается факт, что в СССР даже рождение ребёнка превращалось в предмет партийного контроля."}
        </Analysis>
      </Exhibit>

      {/* Bridge moment: carries the viewer from Khvylovy & Dovlatov into the Gulag rooms */}
      <window.BridgeAudio
        label={lang==='en' ? "SYNTHESIS · KHVYLOVY ↔ DOVLATOV" : "СИНТЕЗ · ХВИЛЬОВИЙ ↔ ДОВЛАТОВ"}
        title={lang==='en'
          ? "From tragedy to irony — two answers to the same silence."
          : "От трагедии к иронии — два ответа на одно молчание."}
        subtitle={lang==='en'
          ? "A short bridge before we step into Solzhenitsyn's camp."
          : "Короткий мост перед входом в лагерь Солженицына."}
        src={window.AUDIO && window.AUDIO.synthesis}
        duration="0:45"
      />
    </Room>
  );
}

function CensorsDesk({ lang }){
  const fullText = lang==='en'
    ? "In alphabetical order the following countries took part in the conference: Austria, Belgium, Bulgaria, Denmark, Finland, France, Hungary, Poland, the Soviet Union, the United States, West Germany. All speeches were received with warm applause."
    : "В алфавитном порядке в конференции приняли участие следующие страны: Австрия, Бельгия, Болгария, Венгрия, Дания, Западная Германия, Польша, Советский Союз, Соединённые Штаты, Финляндия, Франция. Все выступления были встречены тёплыми аплодисментами.";

  const words = fullText.split(/(\s+)/);
  const [redacted, setRedacted] = useS_R2(new Set());
  const toggle = (i) => {
    setRedacted(r => {
      const n = new Set(r);
      if (n.has(i)) n.delete(i); else n.add(i);
      return n;
    });
  };

  return (
    <div style={{
      background:"oklch(0.28 0.02 35)",
      padding:"28px clamp(20px, 4vw, 44px)",
      margin:"0 0 40px",
      color:"oklch(0.88 0.015 80)",
      boxShadow:"inset 0 2px 20px oklch(0.15 0.01 30), 3px 4px 0 var(--paper-shadow)",
      position:"relative"
    }}>
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",
        marginBottom:20,flexWrap:"wrap",gap:12
      }}>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",opacity:0.6}}>
            INTERACTIVE · {lang==='en'?"CENSOR'S DESK":"СТОЛ ЦЕНЗОРА"}
          </div>
          <div style={{fontFamily:"var(--serif)",fontSize:"clamp(22px, 2.4vw, 28px)",fontWeight:700,marginTop:4}}>
            {lang==='en'?"Remove the offending words":"Вычеркните опасные слова"}
          </div>
          <div style={{fontFamily:"var(--typed)",fontSize:13,opacity:0.7,fontStyle:"italic",marginTop:6,maxWidth:560}}>
            {lang==='en'
              ? "Click any word to redact it. Which country names produce an \"ideologically acceptable\" alphabetical order?"
              : "Нажмите любое слово, чтобы его вычеркнуть. Какие названия дают «идеологически приемлемый» алфавитный порядок?"}
          </div>
        </div>
        <button onClick={() => setRedacted(new Set())} style={{
          background:"transparent",color:"oklch(0.85 0.03 30)",
          border:"1px solid oklch(0.85 0.03 30)",padding:"8px 14px",
          fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.15em",
          cursor:"pointer",textTransform:"uppercase"
        }}>{lang==='en'?"Reset":"Очистить"}</button>
      </div>

      <div style={{
        background:"oklch(0.93 0.02 75)",color:"oklch(0.18 0.01 60)",
        padding:"26px 30px",fontFamily:"var(--typed)",
        fontSize:"clamp(15px, 1.6vw, 19px)",lineHeight:1.9,
        border:"1px solid oklch(0.15 0.01 30)",position:"relative"
      }}>
        {/* typewriter header */}
        <div style={{
          fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",
          color:"var(--ink-soft)",marginBottom:12,paddingBottom:8,
          borderBottom:"1px dashed var(--ink-soft)",textTransform:"uppercase"
        }}>
          {lang==='en'?"CABLE · TALLINN · CORRESPONDENT":"ТЕЛЕГРАММА · ТАЛЛИН · КОРР."}
        </div>
        {words.map((w, i) => {
          if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
          const isR = redacted.has(i);
          return (
            <span key={i} onClick={() => toggle(i)} style={{
              cursor:"pointer",
              position:"relative",
              padding:"1px 2px",
              background: isR ? "var(--redact)" : "transparent",
              color: isR ? "var(--redact)" : "var(--ink)",
              userSelect:"none",
              transition:"background 0.1s"
            }}>{w}</span>
          );
        })}
        <div style={{
          marginTop:18,paddingTop:10,borderTop:"1px dashed var(--ink-soft)",
          display:"flex",justifyContent:"space-between",
          fontFamily:"var(--mono)",fontSize:10,color:"var(--ink-soft)",letterSpacing:"0.15em"
        }}>
          <span>{lang==='en'?"REDACTED":"ВЫЧЕРКНУТО"}: {redacted.size}</span>
          <Stamp rotate={-3} size={0.8} style={{opacity:0.7}}>{lang==='en'?"CLEARED BY CENSOR":"ЦЕНЗУРА ПРОВЕРЕНА"}</Stamp>
        </div>
      </div>

      <div style={{
        marginTop:14,fontFamily:"var(--typed)",fontSize:13,
        fontStyle:"italic",opacity:0.8,maxWidth:720
      }}>
        {lang==='en'
          ? "← The real editor's note was: \"You have committed a crude ideological error. Again, alphabetical order?! Forget that opportunist word!\""
          : "← Настоящая реплика редактора: «Вы допустили грубую идеологическую ошибку. Опять по алфавиту?! Забудьте это оппортунистическое слово!»"}
      </div>
    </div>
  );
}

window.Room2 = Room2;
