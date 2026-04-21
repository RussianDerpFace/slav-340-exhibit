// Room 5: Solzhenitsyn — Almost happy day + 3653 counter
const { useState: useS_R5, useEffect: useE_R5, useRef: useR_R5 } = React;

function Room5({ onExit, onNav }){
  const { lang } = React.useContext(window.LangContext);
  return (
    <Room num={5} totalRooms={8} onExit={onExit} onNav={onNav}
      label={lang==='en' ? "Solzhenitsyn · An Almost Happy Day" : "Солженицын · Почти счастливый день"}
      sub={lang==='en' ? "Irony as a verdict on the system" : "Ирония как приговор системе"}
      audio={{
        title: lang==='en' ? "3,653 days: the arithmetic of annihilation" : "3 653 дня: арифметика уничтожения",
        narrator: lang==='en' ? "АУДИОГИД · SOLZHENITSYN III" : "АУДИОГИД · СОЛЖЕНИЦЫН III",
        src: window.AUDIO && window.AUDIO.solz3,
        duration: "4:22"
      }}
      tint="linear-gradient(180deg, oklch(0.88 0.012 70) 0%, oklch(0.78 0.018 55) 100%)"
    >
      <window.FrostOverlay intensity={1.0}/>
      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.55vw, 18px)",lineHeight:1.75,color:"var(--ink-soft)",maxWidth:740,margin:"0 0 24px"}}>
        {lang==='en'
          ? "Solzhenitsyn shows that even a prisoner's thought is subordinated to the camp. On the march to the worksite, the only minutes when the zeks can think, Shukhov cannot break out of the camp's categories:"
          : "Солженицын показывает: даже мысль заключённого подчинена лагерю. На марше к рабочему объекту — единственные минуты, когда зэки могут думать — Шухов не способен выйти за пределы лагерных категорий:"}
      </p>
      <Quote>Дума арестантская — и та несвободная, всё к тому ж возвращается, всё снова ворошит: не нащупают ли пайку в матрасе? В санчасти освободят ли вечером? Посадят капитана или не посадят?</Quote>
      <Analysis>
        {lang==='en'
          ? "The system does not merely control the body; it occupies consciousness. And the more valuable are the moments when Shukhov breaks out of this circle, thinking of his wife, of carpets, of freedom. Each such departure is a small escape from the mental prison."
          : "Система не просто контролирует тело — она оккупирует сознание. И тем ценнее моменты, когда Шухов вырывается из этого круга, думает о жене, о коврах, о воле. Каждое такое отступление — маленький побег из ментальной тюрьмы."}
      </Analysis>

      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.55vw, 18px)",lineHeight:1.75,color:"var(--ink-soft)",maxWidth:740,margin:"28px 0 16px"}}>
        {lang==='en'
          ? "The final lines of the novella contain one of the most devastating formulations in twentieth-century Russian literature:"
          : "Последние строки повести содержат одну из самых разрушительных формулировок в русской литературе XX века:"}
      </p>

      <div style={{
        background:"var(--paper-2)",border:"2px double var(--ink)",
        padding:"clamp(24px, 4vw, 44px)",margin:"24px 0",position:"relative"
      }}>
        <blockquote style={{
          fontFamily:"var(--serif)",fontSize:"clamp(17px, 1.9vw, 22px)",
          lineHeight:1.55,margin:0,fontStyle:"italic",color:"var(--ink)"
        }}>
          «Засыпал Шухов вполне удовлетворённый. На дню у него выдалось сегодня много удач: в карцер не посадили, на Соцгородок бригаду не выгнали, в обед он закосил кашу, бригадир хорошо закрыл процентовку, стену Шухов клал весело, с ножёвкой на шмоне не попался, подработал вечером у Цезаря и табачку купил. И не заболел, перемогся. <strong style={{color:"var(--stamp)",fontStyle:"normal"}}>Прошёл день, ничем не омрачённый, почти счастливый.</strong>»
        </blockquote>
      </div>

      <Analysis>
        {lang==='en'
          ? "\"Almost happy\" is not Shukhov's assessment. It is the author's verdict on the system. The reader, having walked through this entire day — the cold, the hunger, the search, the humiliation, the fear of the isolator — learns that for a prisoner all of this qualifies as \"good luck\". Solzhenitsyn does not shout about injustice; he forces the reader to grasp the monstrousness of the norm."
          : "«Почти счастливый» — это не оценка Шухова. Это приговор системе устами автора. Читатель, прошедший весь этот день — холод, голод, шмон, унижение, страх карцера — узнаёт, что для заключённого всё это является «удачей». Солженицын не кричит о несправедливости, он заставляет читателя самого осознать чудовищность нормы."}
      </Analysis>

      {/* Big number: 3653 */}
      <DaysCounter lang={lang}/>

      <div style={{
        marginTop:32,padding:"24px 28px",background:"var(--ink)",color:"var(--paper)",textAlign:"center"
      }}>
        <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.3em",opacity:0.5,marginBottom:10}}>
          {lang==='en'?"FINAL LINE":"ФИНАЛЬНАЯ СТРОКА"}
        </div>
        <blockquote style={{
          fontFamily:"var(--serif)",fontSize:"clamp(18px, 2vw, 24px)",
          lineHeight:1.5,margin:0,fontStyle:"italic"
        }}>
          «Таких дней в его сроке от звонка до звонка было{" "}
          <window.Redacted tone="paper" lang={lang}>три тысячи шестьсот пятьдесят три</window.Redacted>.
          Из-за високосных годов — три дня лишних набавлялось...»
        </blockquote>
      </div>

      <p style={{fontFamily:"var(--typed)",fontSize:"clamp(15px, 1.55vw, 18px)",lineHeight:1.75,color:"var(--ink-soft)",maxWidth:740,margin:"24px auto 0",textAlign:"center",fontStyle:"italic"}}>
        {lang==='en'
          ? "3,653 days. One day mathematically expands into an entire decade. The novella becomes an epic of annihilation through routine."
          : "3 653 дня. Один день математически расширяется до целого десятилетия. Повесть превращается в эпос уничтожения через рутину."}
      </p>
    </Room>
  );
}

function DaysCounter({ lang }){
  const [n, setN] = useS_R5(0);
  const [running, setRunning] = useS_R5(false);
  const ref = useR_R5(null);

  useE_R5(() => {
    const obs = new IntersectionObserver((ents) => {
      if (ents[0].isIntersecting && !running) {
        setRunning(true);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [running]);

  useE_R5(() => {
    if (!running) return;
    let raf;
    const start = performance.now();
    const TARGET = 3653, DUR = 3200;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / DUR);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(TARGET * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(TARGET);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <div ref={ref} style={{
      margin:"44px 0 10px",
      background:"var(--paper-2)",
      border:"1px solid var(--ink-soft)",
      padding:"clamp(30px, 5vw, 56px) clamp(20px, 4vw, 44px)",
      textAlign:"center",position:"relative",
      boxShadow:"inset 0 0 80px oklch(0.3 0.02 60 / 0.12)"
    }}>
      <div style={{
        fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.35em",
        color:"var(--ink-soft)",marginBottom:12,textTransform:"uppercase"
      }}>
        {lang==='en'?"TOTAL DAYS IN HIS SENTENCE":"ВСЕГО ТАКИХ ДНЕЙ В ЕГО СРОКЕ"}
      </div>
      <div style={{
        fontFamily:"var(--serif)",fontWeight:700,
        fontSize:"clamp(80px, 18vw, 220px)",lineHeight:0.85,
        color:"var(--ink)",letterSpacing:"-0.04em",
        textShadow:"3px 3px 0 var(--paper-shadow)",
        fontVariantNumeric:"tabular-nums"
      }}>
        {String(n).padStart(4,"0").split("").map((d,i) => (
          <span key={i} style={{display:"inline-block",minWidth:"0.62em"}}>{d}</span>
        ))}
      </div>
      <div style={{
        fontFamily:"var(--typed)",fontSize:"clamp(14px, 1.4vw, 17px)",
        color:"var(--ink-soft)",marginTop:18,fontStyle:"italic"
      }}>
        {lang==='en'?"× one day like this":"× одному такому дню"} — 10 {lang==='en'?"years":"лет"} · 120 {lang==='en'?"months":"месяцев"}
      </div>
      <div style={{position:"absolute",top:-12,right:20}}>
        <Stamp rotate={5}>{lang==='en'?"SRUK 10 LET":"СРОК 10 ЛЕТ"}</Stamp>
      </div>
    </div>
  );
}

window.Room5 = Room5;
