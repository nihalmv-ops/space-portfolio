# Space Portfolio — Setup

A full new portfolio, inspired by the Noomo Showcase style: full-screen
WebGL 3D background, buttery smooth scroll, and a preloader.

## What's in it

- **`SpaceScene.jsx`** — full infinite-galaxy scene:
  - **20,000 stars** rendered as a single GPU shader point-cloud (one draw
    call, not 20,000 separate objects — this is what keeps it smooth) with
    per-star twinkle animation
  - **5 planets** at different depths, one with rings, rotating on their
    own axes as you fly past
  - **Nebula background** — a custom GLSL shader painting drifting violet/
    magenta cloud color onto a giant background sphere
  - **Mouse parallax** — the camera drifts slightly toward your cursor,
    layered on top of the scroll-driven fly-through
  - **GSAP** eases the camera's forward motion (smoother than a plain lerp)
  - Camera position is driven by scroll progress from Lenis
- **`SmoothScroll.jsx`** — wraps the page in [Lenis](https://github.com/darkroomengineering/lenis)
  for smooth, weighted scrolling, and exposes scroll progress (0→1) for the
  3D scene to read every frame.
- **`MusicPlayer.jsx`** — floating play/pause + volume control, bottom-right.
  Expects an MP3 at `public/audio/track.mp3` — see `public/audio/README.txt`.
  **Note:** the actual audio file isn't included since music is copyrighted;
  add your own licensed copy.
- **`Preloader.jsx`** — 0→100% counter before the site reveals.
- **`Navbar.jsx`**, **`Sections/`** — Hero, About, Projects, Skills, Contact.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Where to edit your content

- `src/components/Sections/Hero.jsx` — headline + intro text
- `src/components/Sections/About.jsx` — your bio
- `src/components/Sections/Projects.jsx` — the `projects` array at the top.
  For each project set `title`, `desc`, `tags`, `link` (your GitHub/live URL),
  and `image` (path to your screenshot). Drop your actual screenshot files
  into `public/projects/` — see `public/projects/README.txt` for sizing
  tips. If an image path is missing/wrong, the card just falls back to a
  dark gradient block instead of breaking.
- `src/components/Sections/Skills.jsx` — the `skills` array
- `src/components/Sections/Contact.jsx` — your email + social links
- `src/components/Navbar.jsx` — your name/logo

## Tuning the galaxy effect

In `SpaceScene.jsx`:
- `STAR_COUNT` — currently 20,000; lower it if it feels heavy on older
  phones/laptops (the shader approach means even 20k is one draw call, but
  GPU fill-rate still has limits)
- `FIELD_DEPTH` — how "deep" the star/planet field is; also controls how
  far the camera travels across your whole page scroll
- `PlanetField()` — edit the `planets` array to reposition/recolor/resize,
  toggle `ringed: true`, or add more
- `ScrollCamera` — the GSAP `duration`/`ease` control how smoothly the
  camera catches up to your scroll position; the `0.04` multipliers control
  how strong the mouse-parallax drift is

## Deploying

```bash
npm run build
```

Outputs a static `dist/` folder — deploy to Vercel, Netlify, GitHub Pages,
or any static host.
