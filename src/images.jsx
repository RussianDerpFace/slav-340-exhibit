// Real historical images — downloaded locally from Wikimedia Commons.
// All images live in the project's /images folder; no external URL deps at runtime.
// Attribution: see images/CREDITS.txt
window.IMG = {
  // Author portraits
  khvylovy:     "images/khvylovy.jpg",      // File:Mykola Khvylovy.jpg (PD)
  dovlatov:     "images/dovlatov.jpg",      // File:Dovlatov-memorial-plaque-spb.jpg (no free portrait exists)
  solzhenitsyn: "images/solzhenitsyn.jpg",  // File:Aleksandr Solzhenitsyn 1974crop.jpg (CC BY 3.0)
  bulgakov:     "images/bulgakov.jpg",      // File:Mikhail Bulgakov Russian writer.jpg (PD)

  // Background / thematic imagery
  redSquare:  "images/redSquare.jpg",       // File:Red Square, Moscow, Russia.jpg
  gulag:      "images/gulag.jpg",           // File:The fence at the old GULag in Perm-36.JPG
  samizdat:   "images/samizdat.jpg",        // File:Russian samizdat and photo negatives...jpg
  typewriter: "images/typewriter.jpg",      // File:Olivetti Lettera 22 at the MOMA.jpg
};

// Narration recorded by the exhibit partner + AI-generated overlays.
// Each slot points at a file in audio/. A null slot renders the
// AudioPlayer in an inactive "FORTHCOMING" state without breaking
// layout, so new narration can be dropped in with a one-line change.
window.AUDIO = {
  // Partner-recorded
  intro:     "audio/Intro.m4a",                        // floor plan overview
  khvylovy:  "audio/Khvylovy.m4a",                     // Room 1 deep dive
  dovlatov:  "audio/Dovlatov.m4a",                     // Room 2 deep dive
  synthesis: "audio/Synthesis-Khvylovy-Dovlatov.m4a",  // Room 2 bridge / R1↔R2 synthesis

  // Per-room narration
  vestibule:    "audio/Vestibule.mp3",                 // Room 0 entry
  solz1:        "audio/Solzhenitsyn-Taiga.mp3",        // Room 3 · law of the taiga
  solz2:        "audio/Solzhenitsyn-Artifacts.mp3",    // Room 4 · bread / spoon / trowel
  solz3:        "audio/Solzhenitsyn-HappyDay.mp3",     // Room 5 · 3653 days
  bulg1:        "audio/Bulgakov-Variete.mp3",          // Room 6 · Variety Theater
  bulg2:        "audio/Bulgakov-Manuscripts.mp3",      // Room 7 · manuscripts don't burn
  cafeClosing:  "audio/Cafe-Closing.mp3",              // Room 8 · conclusion
};

// A portrait card that loads a real image with a sepia archival filter
function RealPortrait({ src, name, years, tag, fallbackInitials }){
  const [err, setErr] = React.useState(false);
  return (
    <div style={{
      aspectRatio:"3/4",
      position:"relative",
      border:"2px solid var(--ink)",
      boxShadow:"3px 4px 0 var(--paper-shadow), inset 0 0 0 1px oklch(0.6 0.02 70)",
      background:"oklch(0.3 0.01 60)",
      overflow:"hidden"
    }}>
      {!err ? (
        <img src={src} alt={name} onError={() => setErr(true)} style={{
          width:"100%",height:"100%",objectFit:"cover",
          filter:"sepia(0.55) contrast(1.05) brightness(0.92) saturate(0.65)",
          display:"block"
        }}/>
      ) : (
        <div style={{
          width:"100%",height:"100%",
          background:"repeating-linear-gradient(45deg, oklch(0.4 0.01 60) 0px, oklch(0.4 0.01 60) 2px, oklch(0.48 0.015 60) 2px, oklch(0.48 0.015 60) 4px)",
          display:"flex",alignItems:"center",justifyContent:"center",
          color:"oklch(0.85 0.02 70)",fontFamily:"var(--serif)",fontWeight:700,fontSize:42
        }}>
          {fallbackInitials || name.split(" ").map(w=>w[0]).join("").slice(0,2)}
        </div>
      )}
      {/* halftone overlay */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:"radial-gradient(oklch(0.1 0.01 60 / 0.35) 1px, transparent 1.5px)",
        backgroundSize:"3px 3px",mixBlendMode:"multiply",opacity:0.5
      }}/>
      {/* scratches */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        background:"linear-gradient(100deg, transparent 40%, oklch(0.95 0.02 75 / 0.08) 50%, transparent 55%)"
      }}/>
      {/* film border */}
      <div style={{
        position:"absolute",inset:6,border:"1px dashed oklch(0.85 0.02 75 / 0.3)",pointerEvents:"none"
      }}/>
      {/* label bar */}
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,
        background:"linear-gradient(0deg, oklch(0.1 0.01 60 / 0.92), transparent)",
        color:"oklch(0.93 0.02 75)",padding:"24px 12px 10px"
      }}>
        <div style={{fontFamily:"var(--serif)",fontSize:15,fontWeight:700,lineHeight:1.1}}>{name}</div>
        <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.2em",opacity:0.8,marginTop:3}}>{years}</div>
        {tag && <div style={{
          display:"inline-block",marginTop:6,padding:"2px 6px",
          border:"1px solid oklch(0.85 0.02 75 / 0.4)",
          fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.2em"
        }}>{tag}</div>}
      </div>
      {/* corner archive number */}
      <div style={{
        position:"absolute",top:10,left:10,
        fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.25em",
        color:"oklch(0.9 0.02 75)",opacity:0.7,
        textShadow:"0 1px 2px oklch(0.1 0.01 60)"
      }}>ФОТОАРХИВ · №{Math.abs((name||"").length*31+7) % 9999}</div>
    </div>
  );
}
window.RealPortrait = RealPortrait;
