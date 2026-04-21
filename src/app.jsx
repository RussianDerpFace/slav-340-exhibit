// Main app shell with hash-based routing + language persistence

const { useState: useSa, useEffect: useEa } = React;

function App(){
  // persistent lang
  const [lang, setLang] = useSa(() => {
    try { return localStorage.getItem("exhibit_lang") || "ru"; } catch { return "ru"; }
  });
  useEa(() => { try { localStorage.setItem("exhibit_lang", lang); } catch {} }, [lang]);

  // current view: "plan" | 0..8
  const parseHash = () => {
    const h = (window.location.hash || "").replace("#", "");
    if (h === "" || h === "plan") return "plan";
    const n = parseInt(h.replace("room-", ""), 10);
    return isNaN(n) ? "plan" : Math.max(0, Math.min(8, n));
  };
  const [view, setView] = useSa(parseHash());

  useEa(() => {
    const onHash = () => setView(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEa(() => {
    const target = view === "plan" ? "plan" : `room-${view}`;
    if (window.location.hash !== `#${target}`) {
      window.location.hash = target;
    }
    // Scroll to top on view change
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  const goto = (v) => setView(v);
  const toPlan = () => setView("plan");

  const ctx = { lang, setLang };
  const Rooms = [
    window.Room0, window.Room1, window.Room2, window.Room3,
    window.Room4, window.Room5, window.Room6, window.Room7, window.Room8
  ];

  return (
    <window.LangContext.Provider value={ctx}>
      {view === "plan"
        ? <window.FloorPlan onEnter={goto}/>
        : (() => {
            const RoomC = Rooms[view];
            return <RoomC onExit={toPlan} onNav={goto}/>;
          })()}
    </window.LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
