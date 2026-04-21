// Room 3: Solzhenitsyn — Law of the taiga
function Room3({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  return (
    <Room num={3} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Solzhenitsyn · Law of the Taiga" : "Солженицын · Закон тайги"}
      sub={lang==='en' ? "A code of dignity in inhuman conditions" : "Кодекс достоинства в нечеловеческих условиях"}
      audio={{
        title: lang==='en' ? "Shukhov's code of survival" : "Кодекс выживания Шухова",
        narrator: lang==='en' ? "АУДИОГИД · SOLZHENITSYN I" : "АУДИОГИД · СОЛЖЕНИЦЫН I",
        src: window.audioFor && window.audioFor('solz1', lang),
        duration: "6:02"
      }}
      tint="linear-gradient(180deg, oklch(0.88 0.012 70) 0%, oklch(0.82 0.015 60) 100%)"
    >
      <window.FrostOverlay intensity={0.4}/>
      <div style={{
        display:"grid",gridTemplateColumns:"minmax(0, 220px) 1fr",gap:28,
        marginBottom:36,padding:"24px 28px",background:"var(--paper)",
        border:"1px solid var(--ink-soft)",boxShadow:"3px 4px 0 var(--paper-shadow)"
      }}>
        <window.RealPortrait src={window.IMG.solzhenitsyn} name="Александр Солженицын" years="1918 — 2008" tag="Щ-854 · ГУЛАГ"/>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.25em",color:"var(--stamp)",fontWeight:700,marginBottom:8}}>
            {lang==='en'?"AUTHOR FILE":"ДЕЛО АВТОРА"}
          </div>
          <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(22px,2.4vw,30px)",margin:"0 0 10px",fontWeight:700}}>
            {lang==='en'?"Aleksandr Solzhenitsyn":"Александр Солженицын"}
          </h3>
          <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:0}}>
            {lang==='en'
              ? "Aleksandr Solzhenitsyn (1918 — 2008) spent eight years inside the Gulag system. \"One Day in the Life of Ivan Denisovich\" (1962) was the first work in Soviet literature to describe the camp system openly. The novella records a single day of the prisoner Shukhov, from reveille to lights out. There is no heroic escape, no underground organization, no fiery protest. Only a man trying to preserve his dignity in a system designed for his destruction."
              : "Александр Солженицын (1918—2008) провёл восемь лет в системе ГУЛАГа. Повесть «Один день Ивана Денисовича» (1962) — первое произведение в советской литературе, открыто описавшее лагерную систему. Повесть фиксирует один день заключённого Шухова — от подъёма до отбоя. В ней нет героического побега, нет подпольной организации, нет пламенного протеста. Есть только человек, пытающийся сохранить достоинство в системе, которая создана для его уничтожения."}
          </p>
        </div>
      </div>

      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.5vw, 17px)",lineHeight:1.75,color:"var(--ink-soft)",maxWidth:720,margin:"0 0 24px"}}>
        {lang==='en'
          ? "From its first pages the text establishes the rules of this world. Shukhov's first brigade leader, Kuzyomin, gives the law of the camp:"
          : "С первых страниц текст устанавливает правила этого мира. Первый бригадир Шухова, Кузёмин, формулирует закон лагеря:"}
      </p>

      {/* Big epigraph quote — Kuzëmin's law, revealed only when the viewer clicks */}
      <window.RedactedBlock lang={lang}>
        <div style={{
          background:"var(--ink)",color:"var(--paper)",padding:"36px clamp(24px, 4vw, 48px)",
          margin:"24px 0",position:"relative",
          backgroundImage:`linear-gradient(180deg, oklch(0.12 0.01 60 / 0.9), oklch(0.18 0.01 60 / 0.94)), url("${window.IMG.gulag}")`,
          backgroundSize:"cover",backgroundPosition:"center"
        }}>
          <div style={{
            fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",opacity:0.5,marginBottom:14
          }}>» {lang === 'en' ? "HALL EPIGRAPH" : "ЭПИГРАФ ЗАЛА"}</div>
          <blockquote style={{
            fontFamily:"var(--serif)",fontSize:"clamp(20px, 2.6vw, 32px)",
            lineHeight:1.4,margin:0,fontStyle:"italic"
          }}>
            «Здесь, ребята, закон — тайга. Но люди и здесь живут. В лагере вот кто подыхает: кто миски лижет, кто на санчасть надеется да кто к куму ходит стучать.»
          </blockquote>
          <div style={{
            marginTop:20,fontFamily:"var(--mono)",fontSize:12,letterSpacing:"0.15em",
            color:"var(--stamp-soft)",textTransform:"uppercase"
          }}>— Кузёмин · первый бригадир Шухова</div>
          <div style={{position:"absolute",top:-14,right:30}}>
            <Stamp rotate={4}>СССР · УСТЬ-ИЖМА</Stamp>
          </div>
        </div>
      </window.RedactedBlock>

      <Analysis label={lang==='en'?"READING":"АНАЛИЗ"}>
        {lang==='en'
          ? "This is not cynicism but a code of survival founded on dignity. Three prohibitions: do not degrade yourself (lick bowls), do not rely on the system (sick bay), do not betray (inform). Shukhov lives by this code for the entire day."
          : "Это не цинизм — это кодекс выживания, основанный на достоинстве. Три табу: не унижаться (лизать миски), не полагаться на систему (санчасть), не предавать (стучать). Шухов живёт по этому кодексу весь день."}
      </Analysis>

      {/* Three prohibitions visual */}
      <div style={{
        display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",
        gap:2,background:"var(--ink)",border:"1px solid var(--ink)",margin:"28px 0"
      }}>
        {[
          { n:"I", ru:"НЕ УНИЖАТЬСЯ", en:"DO NOT DEGRADE YOURSELF", sub:"«кто миски лижет»" },
          { n:"II", ru:"НЕ ПОЛАГАТЬСЯ НА СИСТЕМУ", en:"DO NOT RELY ON THE SYSTEM", sub:"«кто на санчасть надеется»" },
          { n:"III", ru:"НЕ ПРЕДАВАТЬ", en:"DO NOT BETRAY", sub:"«кто к куму ходит стучать»" },
        ].map((p,i)=>(
          <div key={i} style={{background:"var(--paper)",padding:"22px 20px"}}>
            <div style={{
              fontFamily:"var(--serif)",fontSize:48,fontWeight:700,lineHeight:1,
              color:"var(--stamp)",opacity:0.3,marginBottom:10
            }}>{p.n}</div>
            <div style={{fontFamily:"var(--mono)",fontSize:13,letterSpacing:"0.18em",fontWeight:700,color:"var(--ink)"}}>
              {lang==='en'?p.en:p.ru}
            </div>
            <div style={{fontFamily:"var(--typed)",fontSize:13,fontStyle:"italic",color:"var(--ink-soft)",marginTop:8}}>
              {p.sub}
            </div>
          </div>
        ))}
      </div>

      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.5vw, 17px)",lineHeight:1.75,color:"var(--ink-soft)",maxWidth:720,margin:"28px 0 0"}}>
        {lang==='en'
          ? "His antithesis is Fetiukov, a man who has lost his inner spine. Solzhenitsyn shows what becomes of those who surrender to the system completely:"
          : "Его антитеза — Фетюков, человек, утративший внутренний стержень. Солженицын показывает, что происходит с теми, кто подчиняется системе полностью:"}
      </p>
      <Quote>Разобраться, так жаль его. Срока ему не дожить. Не умеет он себя поставить.</Quote>

      <window.FrozenRation lang={lang}/>

      <Analysis>
        {lang==='en'
          ? "The loss of dignity is not merely moral collapse. For Solzhenitsyn it is literally a death sentence. The system kills not the body but the will, and whoever allows it to do so is doomed."
          : "Потеря достоинства — не просто моральное падение; для Солженицына это буквально смертный приговор. Система убивает не тело, а волю, и тот, кто позволяет ей это сделать, обречён."}
      </Analysis>
    </Room>
  );
}
window.Room3 = Room3;
