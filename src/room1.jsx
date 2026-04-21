// Room 1: Mykhailo Khvylovy — "I (Romance)"
function Room1({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  return (
    <Room num={1} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Mykhailo Khvylovy · \"I (Romance)\"" : "Михайло Хвильовий · «Я (Романтика)»"}
      sub={lang==='en' ? "When the revolution devours its children" : "Когда революция пожирает своих детей"}
      audio={{
        title: lang==='en' ? "Khvylovy and the Executed Renaissance" : "Хвылевой и расстрелянное возрождение",
        narrator: lang==='en' ? "PARTNER · MYKHAILO KHVYLOVY" : "АУДИОГИД · МИХАЙЛО ХВИЛЬОВИЙ",
        src: window.audioFor && window.audioFor('khvylovy', lang),
        duration: "5:10"
      }}
      tint="linear-gradient(180deg, oklch(0.91 0.015 75) 0%, oklch(0.86 0.03 30 / 0.3) 100%)"
    >
      {/* Author card */}
      <div style={{
        display:"grid",gridTemplateColumns:"minmax(0, 220px) 1fr",gap:28,
        marginBottom:36,padding:"24px 28px",background:"var(--paper)",
        border:"1px solid var(--ink-soft)",boxShadow:"3px 4px 0 var(--paper-shadow)"
      }}>
        <window.RealPortrait src={window.IMG.khvylovy} video={window.PORTRAIT && window.PORTRAIT.khvylovy} name="Микола Хвильовий" years="1893 — 1933" tag="УКРАЇНА"/>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.25em",color:"var(--stamp)",fontWeight:700,marginBottom:8}}>
            {lang==='en'?"AUTHOR FILE":"ДЕЛО АВТОРА"}
          </div>
          <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(22px,2.4vw,30px)",margin:"0 0 10px",fontWeight:700}}>
            {lang==='en'?"Mykhailo Khvylovy":"Михайло Хвильовий"}
          </h3>
          <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:0}}>
            {lang==='en'
              ? "Ukrainian writer, former Bolshevik, participant in what is called the \"Executed Renaissance\", the generation of Ukrainian intellectuals of the 1920s deliberately destroyed by the Stalinist regime. Khvylovy argued for an independent Ukraine oriented toward Europe rather than Moscow. In the late 1920s he was fiercely attacked and forced to recant. In 1933 he took his own life."
              : "Украинский писатель, бывший большевик, участник так называемого «расстрелянного возрождения» — поколения украинских интеллектуалов 1920-х годов, целенаправленно уничтоженного сталинским режимом. Хвылевой выступал за независимую Украину, ориентированную на Европу, а не на Москву. В конце 1920-х годов он подвергся жёсткой критике и был вынужден отречься от своих взглядов. В 1933 году покончил с собой."}
          </p>
          <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",marginTop:12}}>
            {lang==='en'
              ? "His novella \"I (Romance)\", written under the influence of his own experience in the Civil War and Red Army, shows how revolutionary ideology destroys the human personality. The protagonist is a Cheka officer who is at once revolutionary and a man tormented by what he does. His protest is quiet but extraordinarily strong: the reader understands how terrifying a power can be that demands renunciation of humanity itself."
              : "Его новелла «Я (Романтика)», написанная под влиянием собственного опыта участия в Гражданской войне и службы в Красной армии, показывает, как революционная идеология уничтожает человеческую личность. Главный герой — чекист, который одновременно является и революционером, и человеком, мучающимся от своих поступков. Его протест тихий, но чрезвычайно сильный: читатель сам понимает, насколько страшной может быть власть, которая требует отказаться от человечности."}
          </p>
        </div>
      </div>

      <Exhibit num={1} title={lang==='en'?"The split self":"Раскол личности"}>
        <Quote attr="Хвильовий" lang="ua" big>Я — чекіст, але і людина.</Quote>
        <Analysis>
          {lang==='en'
            ? "This short phrase contains the entire tragedy of the novella. The hero defines himself through two incompatible concepts: \"chekist\" and \"liudyna\" (human being). The conjunction \"але\" (but) is the fissure splitting his \"I\" into a function of the system and a living soul. The system demands that only the first remain."
            : "Эта короткая фраза содержит всю трагедию новеллы. Герой определяет себя через два несовместимых понятия: «чекист» и «людина» (человек). Союз «але» (но) — это трещина, расколовшая его «я» на функцию системы и живую душу. Система требует, чтобы осталось только первое."}
        </Analysis>
      </Exhibit>

      <Exhibit num={2} title={lang==='en'?"The mother as conscience":"Мать как символ совести"}>
        <Quote attr="Хвильовий" lang="ua">І в той же момент раптом переді мною підводиться образ моєї матері... «Розстрілять»??? І мати тихо, зажуренно дивиться на мене.</Quote>
        <Analysis>
          {lang==='en'
            ? "The mother in the novella is not merely a character but a symbol of morality, of humanity, of everything the revolution demands be destroyed. When the hero gives the order to execute and sees before him his mother's face, Khvylovy shows that the system does not only kill the body, it kills the bond between a person and their conscience. The word \"розстрілять\" between question marks is a cry of horror the hero cannot say aloud."
            : "Мать в новелле — это не просто персонаж, а символ морали, человечности, всего того, что революция требует уничтожить. Когда герой отдаёт приказ о расстреле и видит перед собой лицо матери, Хвылевой показывает: система не просто убивает тело — она убивает связь между человеком и его совестью. Слово «розстрілять» между вопросительными знаками — это крик ужаса, который герой не может произнести вслух."}
        </Analysis>
      </Exhibit>

      <Exhibit num={3} title={lang==='en'?"The impossibility of the word":"Невозможность слова"}>
        <Quote attr="Хвильовий" lang="ua" big>Нікому, ніколи й нічого не говорити, як розкололось моє власне «я».</Quote>
        <Analysis>
          {lang==='en'
            ? "Triple negation, \"nikomu, nikoly, nichoho\" (to no one, never, nothing), creates an impression of absolute silence. The hero cannot speak of his inner fracture: the system leaves no space for truth. This very text becomes the word the hero cannot utter. Khvylovy speaks for him, through literature."
            : "Тройное отрицание — «нікому, ніколи, нічого» — создаёт ощущение абсолютного молчания. Герой не может рассказать о своём внутреннем расколе: система не оставляет пространства для правды. Именно этот текст сам становится тем словом, которое герой не может произнести. Хвылевой говорит за него — через литературу."}
        </Analysis>
      </Exhibit>

      <div style={{
        margin:"40px auto 0",maxWidth:520,textAlign:"center",
        fontFamily:"var(--serif)",fontSize:18,fontStyle:"italic",
        color:"var(--stamp)",opacity:0.85,lineHeight:1.5
      }}>
        {lang==='en' ? (
          <>† In 1933, after writing the final lines, Khvylovy{" "}
            <window.Redacted lang="en">put a bullet through his head</window.Redacted>.
            His books were banned for fifty years.</>
        ) : (
          <>† В 1933 году, дописав последние строки, Хвылевой{" "}
            <window.Redacted lang="ru">пустил себе пулю в висок</window.Redacted>.
            Его книги были запрещены пятьдесят лет.</>
        )}
      </div>
    </Room>
  );
}

// Portrait placeholder (reusable across rooms)
function PortraitPlaceholder({ name, years, tag }){
  return (
    <div style={{
      aspectRatio:"3/4",
      background:`
        repeating-linear-gradient(45deg, oklch(0.4 0.01 60) 0px, oklch(0.4 0.01 60) 2px, oklch(0.48 0.015 60) 2px, oklch(0.48 0.015 60) 4px),
        oklch(0.35 0.01 60)
      `,
      position:"relative",
      border:"2px solid var(--ink)",
      boxShadow:"3px 4px 0 var(--paper-shadow)",
      color:"var(--paper)",
      display:"flex",flexDirection:"column",justifyContent:"space-between",
      padding:14
    }}>
      {/* archival frame */}
      <div style={{
        border:"1px dashed oklch(0.7 0.01 60 / 0.4)",
        position:"absolute",inset:8,pointerEvents:"none"
      }}/>
      <div style={{
        fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.25em",
        opacity:0.7,position:"relative"
      }}>
        ФОТОАРХИВ · №{Math.abs(name.length*7+17) % 999}
      </div>
      <div style={{
        position:"absolute",top:"38%",left:"50%",transform:"translate(-50%,-50%)",
        width:80,height:80,borderRadius:"50%",
        background:"oklch(0.55 0.01 60)",
        border:"2px solid oklch(0.7 0.01 60)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:"var(--serif)",fontSize:28,fontWeight:700,
        color:"oklch(0.3 0.01 60)"
      }}>
        {name.split(" ").map(w=>w[0]).join("").slice(0,2)}
      </div>
      <div style={{position:"relative"}}>
        <div style={{fontFamily:"var(--serif)",fontSize:14,fontWeight:700,lineHeight:1.1,marginBottom:4}}>
          {name}
        </div>
        <div style={{fontFamily:"var(--mono)",fontSize:10,opacity:0.75,letterSpacing:"0.15em"}}>
          {years}
        </div>
        {tag && <div style={{
          marginTop:8,display:"inline-block",fontFamily:"var(--mono)",fontSize:9,
          letterSpacing:"0.2em",padding:"2px 6px",
          border:"1px solid oklch(0.7 0.01 60 / 0.5)"
        }}>{tag}</div>}
      </div>
    </div>
  );
}

window.Room1 = Room1;
window.PortraitPlaceholder = PortraitPlaceholder;
