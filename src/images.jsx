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

  // Room 4 artifact photographs — camp-scene renderings of the three
  // objects Solzhenitsyn treats as vessels of dignity.
  bread:      "images/bread.png",
  spoon:      "images/spoon.png",           // note the prisoner number "Ш-854" carved in the handle
  trowel:     "images/trowel.png",
};

// Living portraits — short looped videos used by RealPortrait. The still
// image in window.IMG stays attached as the <video> poster so every
// portrait has an instant first paint + a graceful fallback if the video
// can't load (e.g. on a bandwidth-limited mobile).
window.PORTRAIT = {
  khvylovy:     "portraits/khvylovy.mp4",
  dovlatov:     "portraits/dovlatov.mp4",
  solzhenitsyn: "portraits/solzhenitsyn.mp4",
  bulgakov:     "portraits/bulgakov.mp4",
};

// Narration is bilingual — each slot holds a RU track and an EN track
// (AI-generated twin). The exhibit's UI language toggle swaps the
// <audio> src at render time via window.audioFor(). If a language is
// missing for a given slot, AudioPlayer gracefully falls into its
// "FORTHCOMING" inactive state rather than silently playing the wrong
// language.
window.AUDIO = {
  intro:       { ru: "audio/Intro.ru.m4a",                        en: "audio/Intro.en.mp3" },                        // floor-plan overview
  khvylovy:    { ru: "audio/Khvylovy.ru.m4a",                     en: "audio/Khvylovy.en.mp3" },                     // Room 1
  dovlatov:    { ru: "audio/Dovlatov.ru.m4a",                     en: "audio/Dovlatov.en.mp3" },                     // Room 2
  synthesis:   { ru: "audio/Synthesis-Khvylovy-Dovlatov.ru.m4a",  en: "audio/Synthesis-Khvylovy-Dovlatov.en.mp3" },  // R2 bridge
  vestibule:   { ru: "audio/Vestibule.ru.mp3",                    en: "audio/Vestibule.en.mp3" },                    // Room 0
  solz1:       { ru: "audio/Solzhenitsyn-Taiga.ru.mp3",           en: "audio/Solzhenitsyn-Taiga.en.mp3" },           // Room 3
  solz2:       { ru: "audio/Solzhenitsyn-Artifacts.ru.mp3",       en: "audio/Solzhenitsyn-Artifacts.en.mp3" },       // Room 4
  solz3:       { ru: "audio/Solzhenitsyn-HappyDay.ru.mp3",        en: "audio/Solzhenitsyn-HappyDay.en.mp3" },        // Room 5
  bulg1:       { ru: "audio/Bulgakov-Variete.ru.mp3",             en: "audio/Bulgakov-Variete.en.mp3" },             // Room 6
  bulg2:       { ru: "audio/Bulgakov-Manuscripts.ru.mp3",         en: "audio/Bulgakov-Manuscripts.en.mp3" },         // Room 7
  cafeClosing: { ru: "audio/Cafe-Closing.ru.mp3",                 en: "audio/Cafe-Closing.en.mp3" },                 // Room 8
};

// Lookup helper. Returns null if either the slot or the language is
// missing — AudioPlayer's `inactive` branch takes over from there.
window.audioFor = function(slot, lang){
  const entry = window.AUDIO && window.AUDIO[slot];
  if (!entry) return null;
  return entry[lang] || null;
};

// A portrait card that — when given a `video` source — plays a silent
// looped "living portrait" of the author behind the archival sepia
// treatment. Falls back to the still `src` (shown as poster) if the
// video fails or isn't provided, and finally to initials if both are
// missing. Muted + playsInline + autoPlay lets iOS Safari start
// without a user gesture.
function RealPortrait({ src, video, name, years, tag, fallbackInitials }){
  const [mediaErr, setMediaErr] = React.useState(false);
  const portraitFilter = "sepia(0.55) contrast(1.05) brightness(0.92) saturate(0.65)";
  return (
    <div style={{
      aspectRatio:"3/4",
      position:"relative",
      border:"2px solid var(--ink)",
      boxShadow:"3px 4px 0 var(--paper-shadow), inset 0 0 0 1px oklch(0.6 0.02 70)",
      background:"oklch(0.3 0.01 60)",
      overflow:"hidden"
    }}>
      {video && !mediaErr ? (
        <video
          src={video}
          poster={src}
          autoPlay loop muted playsInline
          preload="auto"
          aria-label={name}
          onError={() => setMediaErr(true)}
          style={{
            width:"100%",height:"100%",objectFit:"cover",
            filter:portraitFilter,
            display:"block"
          }}
        />
      ) : src && !mediaErr ? (
        <img src={src} alt={name} onError={() => setMediaErr(true)} style={{
          width:"100%",height:"100%",objectFit:"cover",
          filter:portraitFilter,
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
