// Room 6: Bulgakov — "Have the citizens changed?"
function Room6({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  return (
    <Room num={6} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Bulgakov · \"Have the citizens changed?\"" : "Булгаков · «Изменились ли горожане?»"}
      sub={lang==='en' ? "The devil as the only truth-teller" : "Дьявол как единственный правдоруб"}
      audio={{
        title: lang==='en' ? "Woland in the Variety Theater" : "Воланд в Варьете",
        narrator: lang==='en' ? "АУДИОГИД · BULGAKOV I" : "АУДИОГИД · БУЛГАКОВ I",
        src: window.audioFor && window.audioFor('bulg1', lang),
        duration: "5:45"
      }}
      tint="linear-gradient(180deg, oklch(0.86 0.015 320 / 0.35) 0%, oklch(0.82 0.025 280 / 0.4) 100%)"
    >
      <window.MoneyRain/>
      <div style={{
        display:"grid",gridTemplateColumns:"minmax(0, 220px) 1fr",gap:28,
        marginBottom:36,padding:"24px 28px",background:"var(--paper)",
        border:"1px solid var(--ink-soft)",boxShadow:"3px 4px 0 var(--paper-shadow)"
      }}>
        <window.RealPortrait src={window.IMG.bulgakov} name="Михаил Булгаков" years="1891 — 1940" tag="МОСКВА"/>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.25em",color:"var(--stamp)",fontWeight:700,marginBottom:8}}>
            {lang==='en'?"AUTHOR FILE":"ДЕЛО АВТОРА"}
          </div>
          <h3 style={{fontFamily:"var(--serif)",fontSize:"clamp(22px,2.4vw,30px)",margin:"0 0 10px",fontWeight:700}}>
            {lang==='en'?"Mikhail Bulgakov":"Михаил Булгаков"}
          </h3>
          <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.65,color:"var(--ink-soft)",margin:0}}>
            {lang==='en'
              ? "Mikhail Bulgakov (1891 — 1940) wrote \"The Master and Margarita\" from 1928 to 1940, knowing the novel would probably never be published. It appeared only in 1966–67, twenty-six years after his death. If Solzhenitsyn resists by fixing reality in documentary prose, Bulgakov destroys Soviet reality from within, replacing it with an absurdity truer than reality itself."
              : "Михаил Булгаков (1891—1940) писал «Мастера и Маргариту» с 1928 по 1940 год, зная, что роман, вероятно, никогда не будет опубликован. Он был опубликован только в 1966–1967 годах, через 26 лет после смерти автора. Если Солженицын сопротивляется через фиксацию реальности, то Булгаков разрушает советскую действительность изнутри, заменяя её абсурдом, который оказывается правдивее самой реальности."}
          </p>
        </div>
      </div>

      {/* Theater marquee */}
      <div style={{
        background:"linear-gradient(180deg, oklch(0.2 0.04 30) 0%, oklch(0.14 0.03 25) 100%)",
        color:"oklch(0.88 0.06 80)",padding:"clamp(30px, 5vw, 50px)",
        margin:"0 0 40px",position:"relative",overflow:"hidden",
        border:"3px double oklch(0.45 0.1 60)"
      }}>
        <div style={{
          position:"absolute",inset:0,
          background:"radial-gradient(ellipse at 50% 20%, oklch(0.7 0.12 60 / 0.15), transparent 60%)"
        }}/>
        <div style={{
          fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.4em",
          color:"oklch(0.75 0.1 60)",textAlign:"center",marginBottom:16,opacity:0.8
        }}>{lang === 'en'
          ? "· VARIETY THEATRE · MOSCOW · BLACK MAGIC SÉANCE ·"
          : "· ТЕАТР ВАРЬЕТЕ · МОСКВА · СЕАНС ЧЁРНОЙ МАГИИ ·"}</div>
        <div style={{
          fontFamily:"var(--serif)",fontSize:"clamp(28px, 4vw, 48px)",
          textAlign:"center",fontStyle:"italic",lineHeight:1.15,fontWeight:700,
          color:"oklch(0.92 0.08 75)",position:"relative"
        }}>
          {lang==='en'
            ? "«Have these citizens changed inwardly?»"
            : "«Изменились ли эти горожане внутренне?»"}
        </div>
        <div style={{
          fontFamily:"var(--mono)",fontSize:12,letterSpacing:"0.2em",
          color:"oklch(0.7 0.08 60)",textAlign:"center",marginTop:18,textTransform:"uppercase"
        }}>— Воланд</div>
      </div>

      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.5vw, 17px)",lineHeight:1.75,color:"var(--ink-soft)",maxWidth:740,margin:"0 0 16px"}}>
        {lang==='en'
          ? "The key scene is the devil Woland's performance at the Moscow Variety Theater. Observing the audience, Woland poses a question:"
          : "Ключевая сцена — выступление дьявола Воланда в московском театре Варьете. Воланд, наблюдая за публикой, задаёт вопрос:"}
      </p>

      <Quote attr="Воланд" big>Но меня, конечно, не столько интересуют автобусы, телефоны и прочая... аппаратура... сколько гораздо более важный вопрос: изменились ли эти горожане внутренне?</Quote>

      <Analysis>
        {lang==='en'
          ? "This is a direct strike against the Soviet ideology of the \"new man\". The regime claimed it was building an entirely new society. Woland poses a simple question: and inwardly? The entire \"séance of black magic\" that follows — the rain of banknotes, the free fashions, the head torn from the master of ceremonies — proves the answer: no. People remain the same. Greed, cowardice, venality. The Soviet project did not change human nature; it merely gave it a new costume."
          : "Это прямой удар по советской идеологии «нового человека». Режим утверждал, что строит совершенно новое общество. Воланд задаёт простой вопрос: а внутренне? И весь последующий «сеанс чёрной магии» — дождь денег, бесплатные наряды, отрывание головы конферансье — доказывает ответ: нет. Люди остались теми же. Жадность, трусость, продажность. Советский проект не изменил природу человека — только дал ему новый костюм."}
      </Analysis>

      <Exhibit num={1} title={lang==='en'?"MASSOLIT and the burning of Griboedov's":"МАССОЛИТ и сожжение Грибоедова"}>
        <p style={{fontFamily:"var(--typed)",fontSize:15,lineHeight:1.7,color:"var(--ink-soft)",margin:"0 0 14px"}}>
          {lang==='en'
            ? "Bulgakov opens the novel in the world of MASSOLIT, the Soviet literary organization, where writers think not of creation but of travel vouchers, dachas, and lunches. The Griboedov House is not a temple of culture but a restaurant. When Griboedov's burns in the finale, the maître d' Archibald Archibaldovich walks calmly out a side door:"
            : "Булгаков открывает роман в мире МАССОЛИТа — советской литературной организации, где писатели думают не о творчестве, а о путёвках, дачах и обедах. Дом Грибоедова — не храм культуры, а ресторан. Когда Грибоедов горит в финале, ресторатор Арчибальд Арчибальдович спокойно выходит через боковой выход:"}
        </p>
        <Quote attr={lang==='en'?"Bulgakov, MM":"Булгаков, ММ"}>...как капитан, который обязан покинуть горящий бриг последним, стоял спокойный Арчибальд Арчибальдович в летнем пальто на шёлковой подкладке, с двумя балыковыми брёвнами под мышкой.</Quote>
        <Analysis>
          {lang==='en'
            ? "The house burns and the restaurateur carries out the smoked sturgeon. There is all of Soviet culture: the shell is ideology, the content is cured meat."
            : "Дом горит, а ресторатор выносит балыки. Вот вся советская культура: оболочка — идеология, содержание — колбаса."}
        </Analysis>
      </Exhibit>
    </Room>
  );
}
window.Room6 = Room6;
