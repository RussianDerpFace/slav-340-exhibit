# Literature as an Instrument of Resistance in the USSR
### SLAV 242/340B · Digital Exhibit

A bilingual (RU/EN) React-based digital museum exhibit exploring Soviet
literature as resistance, through four authors and nine halls.

```
Вестибюль → Хвильовий → Довлатов → Солженицын (I, II, III) → Булгаков (Мастер, Маргарита) → Кафе «Булгаков»
```

---

## Running locally

This is a static site — no build step. React 18 and Babel Standalone
are loaded from a CDN, and every `src/*.jsx` file is transformed in the
browser.

Open a terminal at the repo root and serve the folder over HTTP (the app
will **not** run correctly from `file://` because of browser audio/CORS
rules):

```bash
# any of these work — pick whichever is already installed
npx http-server -p 8080 .
python -m http.server 8080
php -S localhost:8080
```

Then visit <http://localhost:8080/>.

---

## Deploying to Cloudflare Pages

Cloudflare Pages serves the repo as-is — no build command, no framework
preset.

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In the Cloudflare dashboard → **Pages → Create a project → Connect to Git**, pick this repo.
3. Configure the build:

   | Field                     | Value  |
   | ------------------------- | ------ |
   | Framework preset          | `None` |
   | Build command             | *(leave empty)* |
   | Build output directory    | `/`    |
   | Root directory            | `/`    |

4. **Save and deploy**. Subsequent pushes to `main` auto-deploy.

All audio and images live in the repo (`audio/`, `images/`), so there
are no external CDN dependencies at runtime — narration plays full
quality, not a compressed data-URI.

---

## Project layout

```
index.html                   # entry — loads React, Babel, and every src/*.jsx
src/
  app.jsx                    # hash router (#plan, #room-0..8), lang persistence
  primitives.jsx             # Room shell, AudioPlayer, BridgeAudio, Stamp, Quote, Analysis, Exhibit, ...
  themes.jsx                 # per-room colors + decorative MotifBand
  translations.jsx           # RU/EN dictionary + tr() helper
  images.jsx                 # window.IMG and window.AUDIO path registry
  interactions.jsx           # FrostOverlay, MoneyRain, TypewriterCursor, Redacted, RedactedBlock, ...
  floorplan.jsx              # architectural blueprint landing page
  room0.jsx … room8.jsx      # nine halls, one file each
audio/                       # narration recorded by the exhibit partner
  Intro.m4a                  # landing-page overview (~2 min)
  Khvylovy.m4a               # Room 1 deep dive
  Dovlatov.m4a               # Room 2 deep dive
  Synthesis-Khvylovy-Dovlatov.m4a   # R2 bridge into Solzhenitsyn
images/                      # Wikimedia Commons portraits + thematic shots (see CREDITS.txt)
uploads/                     # original content source (docx reference, unused at runtime)
Claude_Code_Enhancement_Spec.md   # build spec
```

---

## Adding / replacing narration

The narration registry lives in [`src/images.jsx`](src/images.jsx) as
`window.AUDIO`. Each entry is a path; a `null` slot makes the matching
AudioPlayer render inactive without breaking layout. Drop an `.m4a`
into `audio/` and update one line:

```js
window.AUDIO = {
  intro:     "audio/Intro.m4a",
  khvylovy:  "audio/Khvylovy.m4a",
  dovlatov:  "audio/Dovlatov.m4a",
  synthesis: "audio/Synthesis-Khvylovy-Dovlatov.m4a",
};
```

To hook a new file up to a room, pass it through the `audio.src` prop
on the `<Room>` shell (see any `src/roomN.jsx` for the pattern) or via
the standalone `<BridgeAudio src={...}/>` component used at the end of
Room 2.

---

## Attribution

Image credits and Wikimedia file references: [`images/CREDITS.txt`](images/CREDITS.txt).
All images are Public Domain or Creative Commons.
