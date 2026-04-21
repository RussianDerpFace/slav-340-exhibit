# Enhancement Spec for Claude Code — FINAL v2

## Context
This is a React-based digital museum exhibit website for a Slavic literature course (SLAV 242/340B). The theme is Soviet literature as resistance. Built with React 18 + Babel Standalone, loaded via `<script>` tags from `exhibit.html`. The prebuilt standalone is `Literature_as_Resistance_-_Standalone.html` (2.3 MB).

Architecture (already built by Claude Design):
- src/app.jsx — hash router (#plan / #room-0..8), exhibit_lang persisted in localStorage
- src/primitives.jsx — Room shell, Stamp, Quote, Analysis, Exhibit, AudioPlayer, TopBar, RoomNav
- src/themes.jsx — per-room accent + MotifBand (rushnyk, coffee, barbed, stars, cafe, samizdat)
- src/translations.jsx — TR dictionary + tr()
- src/interactions.jsx — TypewriterReveal, MargaritaFlight, FrozenRation, CarbonStack
- src/floorplan.jsx — SVG blueprint with 9 rooms
- src/room0.jsx through src/room8.jsx — individual room content
- src/images.jsx — Wikimedia URLs with fallback system

Nine rooms:
- 0 Вестибюль — intro + 4-author strip
- 1 Хвильовий · «Я (Романтика)» — tragedy
- 2 Довлатов · «Компромисс» — irony + CensorsDesk
- 3 Солженицын · закон тайги — three prohibitions + FrozenRation
- 4 Хлеб / Ложка / Мастерок — clickable vitrines
- 5 «Почти счастливый день» — animated 3653 counter
- 6 Булгаков · Варьете — "изменились ли горожане?"
- 7 «Рукописи не горят» — BurningManuscript + Margarita's flight + carbon stack
- 8 Кафе «Булгаков» — menu synthesis + localStorage guestbook

---

## CRITICAL: REAL IMAGES (not Wikimedia URL hotlinks)

Claude Code MUST download all images directly into the project folder so they work offline and don't depend on external URLs that could break or get blocked.

**Process:**
1. Download each image from Wikimedia Commons (or other source)
2. Save to a local `images/` folder in the project directory
3. Update src/images.jsx (or images.standalone.jsx) to reference local paths instead of Wikimedia URLs
4. All images should be reasonable size (compress to ~100-200KB each for web)

**Required images:**

### Author Portraits (one per author, used in floor plan + their rooms)
- Mykhailo Khvylovy — https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Mykola_Khvylovy.jpg/400px-Mykola_Khvylovy.jpg
- Sergei Dovlatov — https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sergei_Dovlatov_1980.jpg/400px-Sergei_Dovlatov_1980.jpg
- Aleksandr Solzhenitsyn — https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Aleksandr_Solzhenitsyn_1974crop.jpg/400px-Aleksandr_Solzhenitsyn_1974crop.jpg
- Mikhail Bulgakov — https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Mikhail_Boelgakov.jpg/400px-Mikhail_Boelgakov.jpg

### Atmospheric / Thematic Images (find appropriate ones for each room)
- Room 0 (Intro): Soviet-era propaganda poster or Red Square — setting the USSR context
- Room 1 (Khvylovy): Ukrainian Executed Renaissance era photo, or 1920s Ukraine
- Room 2 (Dovlatov): Soviet newspaper / printing press / typewriter image
- Room 3 (Solzhenitsyn): Gulag camp photo — https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Perm-36-2.jpg/800px-Perm-36-2.jpg
- Room 4 (Solzhenitsyn artifacts): Black bread, tin spoon, brick trowel — find real photos
- Room 5 (Solzhenitsyn ending): Barbed wire / snow / frozen landscape
- Room 6 (Bulgakov Varieté): Moscow theater or 1930s Moscow street scene
- Room 7 (Bulgakov manuscripts): Old manuscript pages, burning paper, or Bulgakov's actual manuscript — Samizdat pages: https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Samizdat_2.jpg/600px-Samizdat_2.jpg
- Room 8 (Café): Vintage Russian café or literary salon vibe

Claude Code should find the best available public domain / Creative Commons images for any gaps. Download ALL of them locally into `images/`. No external URL dependencies in the final build.

---

## AUDIO — THREE FILES FROM PARTNER + EMPTY SLOTS

The partner has recorded audio narration for her sections. Three .m4a files will be in the project folder. Claude Code must wire each one into the correct AudioPlayer slot.

### Audio File 1: `Intro.m4a` (~2 minutes)
**Placement: Floor plan / landing page (src/floorplan.jsx)**

This is a general overview of all four authors and the exhibit thesis. It should play on the very first screen — the architectural blueprint of the museum.

- Add an AudioPlayer to the FloorPlan component
- NOT autoplay — user clicks to start
- Label: "ГОЛОС ЭКСКУРСОВОДА · GUIDE NARRATION" or similar
- Content summary: General thesis about literature as hidden resistance → brief overview of Khvylovy → Dovlatov → Solzhenitsyn → Bulgakov → conclusion tying all four together.

### Audio File 2: `Khvylovy.m4a` (~5 minutes)
**Placement: Room 1 (src/room1.jsx)**

This is a deep dive into Khvylovy and "I (Romance)". It covers his biography, the Executed Renaissance, his internal conflict, and close analysis of the text with quotes.

- Wire into the existing AudioPlayer slot in Room 1
- Label: "АУДИОГИД · МИХАЙЛО ХВИЛЬОВИЙ" or similar
- Content summary: Khvylovy as figure of Ukrainian modernism → Executed Renaissance → his revolutionary beliefs and disillusionment → "I (Romance)" plot (the Cheka executioner, the mother as Mary, the internal split) → literary analysis of key quotes ("я - чекіст, але і людина", the mother vision, "розстрілять", the split self) → conclusion on the novella as hidden resistance.

### Audio File 3: `Dovlatov.m4a` (COMING SOON — not yet received)
**Placement: Room 2 (src/room2.jsx)**

Expected to be a deep dive into Dovlatov and "The Compromise". Wire into Room 2's AudioPlayer when the file arrives.

- Label: "АУДИОГИД · СЕРГЕЙ ДОВЛАТОВ" or similar
- Leave the AudioPlayer in Room 2 ready to accept this file

### Rooms 3-8: NO AUDIO (keep infrastructure)

DO NOT remove AudioPlayer slots from Rooms 3-8. Keep them wired in but with no audio source — they should gracefully hide or show an inactive state.

**Stretch goal (ElevenLabs AI voiceover):** If time permits, use ElevenLabs to generate Russian-language AI narration for Rooms 3-7 using the exhibit text as script. This is OPTIONAL — only if student requests it.

### Technical notes for all audio:
- Save all m4a files in `audio/` folder in the project directory
- For standalone HTML build: base64 encode audio into the bundle
- Ensure play/pause works on mobile (iOS requires user gesture to start audio)
- All players should show: play/pause button, progress bar, current time / total duration
- Style consistently with samizdat aesthetic

---

## EASTER EGGS & INTERACTIONS

### 1. "СЕКРЕТНО" Stamp Animation (Room 0 / Intro)
When the intro room loads, a Soviet-style red rubber stamp reading "СЕКРЕТНО" (SECRET) slams down onto the title area with a thud animation, then fades to ~15% opacity as a watermark.

- Red double-bordered rectangle, slightly rotated (-3 to -5 deg), Cyrillic all caps
- Animation: starts 2x scale, slams to 1x with slight bounce
- Optional: subtle screen shake on impact (100ms translate jitter)
- Fades to watermark after 2 seconds
- Plays once per visit

### 2. Redacted Text / Censorship Reveal (Rooms 1, 3, 5)
Sentences blacked out like a censored document. Hover/tap to reveal.

Placements:
- Room 1 (Khvylovy): Redact "В 1933 году покончил с собой"
- Room 3 (Solzhenitsyn): Redact Kuzëmin's full law quote — click to "declassify"
- Room 5 (Solzhenitsyn): Redact the number "3653"

- Black rectangle overlay, cursor: pointer
- On interaction: black bar slides away / dissolves
- "[РАССЕКРЕЧЕНО]" (DECLASSIFIED) label appears after reveal

### 3. "Manuscripts Don't Burn" Interaction (Room 7)
The Master's manuscript text visible. Click a match/burn icon to trigger burning paper animation. Text consumed by flames, then reforms from ashes with "Рукописи не горят."

- CSS fire gradient + hue-rotate for flames
- clip-path for advancing burn edge
- Text re-materializes letter by letter from darkness
- Woland's quote appears bold after reformation
- Once per visit

### 4. Money Rain in Room 6 (Bulgakov / Varieté)
On Room 6 load, banknotes fall from top of screen. After 3-4 seconds each dissolves into blank paper.

- 15-25 falling rectangles styled as Soviet rubles
- translateY + rotateZ wobble, randomized delays
- At 70% fall, fades to white/blank then opacity: 0
- pointer-events: none, plays once, ~5 seconds

### 5. Publication Timeline (Room 8 or sidebar)
When written vs. when published, gaps = censorship.

| Author | Written | Published | Gap |
|--------|---------|-----------|-----|
| Khvylovy | 1924 | 1924 (suppressed 1930s) | Dead 1933 |
| Solzhenitsyn | 1959 | 1962 (banned 1974) | 3 yrs then re-banned |
| Bulgakov | 1928-1940 | 1966-1967 | 26 yrs post-death |
| Dovlatov | 1970s | 1981 (USA only) | Exile publication only |

Two dots per author connected by censorship-styled line. Hover tooltips.

### 6. Frost Effect (Rooms 3, 4, 5)
Subtle frost/ice from screen edges during Solzhenitsyn rooms.

- Semi-transparent white/blue SVG frost on viewport edges
- 10-15% opacity, slow CSS animation
- Intensifies Room 3 → 4 → 5
- Fades on exit to Room 6

### 7. Typewriter Cursor (Room 2)
Cursor becomes blinking typewriter "|" in Dovlatov's room.

- cursor: none + custom mousemove div
- 530ms blink toggle
- Desktop only (skip touch)
- Room 2 only

### 8. Woland's Exit Line (Room 8 bottom)
After conclusion, Woland's parting quote fades in at absolute bottom:

«Ну что ж... они - люди как люди. Любят деньги, но ведь это всегда было... Ну, легкомысленны... ну, что ж... и милосердие иногда стучится в их сердца... обыкновенные люди...»

- Slow 2-3 second fade-in on scroll
- Theatrical styling, sulfur-yellow glow
- Last thing visitor sees

---

## Implementation Priority
1. **Real images** — download all, embed locally (functional necessity)
2. **Audio files** — wire Intro.m4a to floor plan, Khvylovy.m4a to Room 1, Dovlatov.m4a to Room 2 when available
3. **Redacted text reveals** — high thematic impact, easy CSS
4. **"Manuscripts don't burn"** — centerpiece interaction
5. **Frost effect** — atmospheric, CSS-only
6. **СЕКРЕТНО stamp** — strong first impression
7. **Money rain** — fun, memorable
8. **Woland's exit line** — perfect ending
9. **Publication timeline** — scholarly depth
10. **Typewriter cursor** — nice touch
11. **ElevenLabs voiceover for Rooms 3-7** — stretch goal if time permits
