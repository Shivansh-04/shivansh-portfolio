# SHIVANSH: THE DEVELOPER CHRONICLES

`VOL.01` · `MANGA PORTFOLIO` · `REACT + VITE`

---

```text
+--------------------------------------------------------------+
|                                                              |
|   ######  ##   ## #### ##    ##    ###    ##    ##  ######   |
|  ##       ##   ##  ##  ##    ##   ## ##   ###   ## ##        |
|   #####   #######  ##  ##    ##  ##   ##  ####  ##  #####    |
|       ##  ##   ##  ##   ##  ##   #######  ## ## ##      ##   |
|  ######   ##   ## ####   ####    ##   ##  ##  #### ######    |
|                                                              |
|              THE DEVELOPER CHRONICLES: PORTFOLIO             |
+--------------------------------------------------------------+
```

A cinematic developer portfolio built like a manga chapter release. The site mixes bold panel-based layouts, chapter navigation, scroll-driven storytelling, and layered animations so the whole experience feels more like reading a stylized issue than browsing a standard portfolio.

Live portfolio: [iamshivansh.in](https://iamshivansh.in)

## Chapter Hook

This project is designed around one idea:

> a portfolio should feel memorable before it feels conventional.

So instead of a plain hero-plus-projects layout, this build leans into:

- manga issue framing
- chapter-based section navigation
- ink, burst, stamp, and reveal motion
- interactive hidden details
- a mobile experience that still feels intentional

## Main Arcs

### 1. Story-first portfolio structure

Each section behaves like a chapter in a comic issue:

- `Hero` opens with a bold cover-page vibe
- `About` reads like a character dossier
- `Skills` uses upgraded stat-bar style animation
- `Projects` and `Open Source` continue the story arc
- `Achievement Wall` acts like an unlock board
- `Contact` closes the issue before the final `To Be Continued`

### 2. Motion system with Anime.js + Framer Motion

The experience combines layout animation and impact animation:

- Framer Motion for section transitions and staged entrances
- Anime.js for unlock effects, impact bursts, line reveals, and stat energy
- reusable interaction hooks added through component-level triggers

### 3. Advanced interactive details

This build now includes some less-common touches that make it stand out:

- `ContextAwareFX` for section-aware hover labels and click impact bursts
- `SecretTerminal` hidden command console for power-user interaction
- `AchievementWall` unlock-chain animation and badge reveal styling
- `PlotTwist` impact trigger for manga-style shock moments
- `MobileChapterDock` for cleaner small-screen chapter navigation

## Feature Panels

| Panel | What it does |
| --- | --- |
| `IntroAnimation` | Opens the portfolio like a cover reveal |
| `MangaProgress` | Desktop chapter navigation styled like manga progress |
| `MobileChapterDock` | Quick mobile navigation with chapter shortcuts |
| `TimeAware` | Time-based context layer for the page mood |
| `PlotTwist` | Surprise manga-panel interaction moment |
| `AchievementWall` | Badge wall with unlock energy and stat-card framing |
| `ContextAwareFX` | Global hover/click feedback tied to nearby sections |
| `SecretTerminal` | Hidden terminal with commands like `help`, `goto`, and `plottwist` |
| `ToBeContinued` | Closing panel that ends the issue cleanly |

## Secret Terminal

There is a hidden terminal built into the portfolio.

Open it with:

- `` ` `` (backtick)
- `Ctrl/Cmd + K`

Available commands include:

- `help`
- `chapters`
- `goto hero`
- `goto skills`
- `goto achievements`
- `plottwist`
- `time`
- `clear`
- `close`

## Tech Stack

| Tool | Purpose |
| --- | --- |
| `React 19` | Component architecture |
| `Vite` | Fast development and production builds |
| `Tailwind CSS` | Utility-first styling |
| `Framer Motion` | Motion choreography |
| `Anime.js` | High-impact custom animations |
| `Lucide React` | Icon system |
| `React Icons` | Supplemental iconography |

## Local Setup

```bash
git clone https://github.com/Shivansh-04/shivansh-portfolio.git
cd shivansh-portfolio
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Project Structure

```text
src/
  components/
    AchievementWall.jsx
    ContextAwareFX.jsx
    MangaProgress.jsx
    MobileChapterDock.jsx
    PlotTwist.jsx
    SecretTerminal.jsx
    ToBeContinued.jsx
  sections/
    About.jsx
    Contact.jsx
    Hero.jsx
    OpenSource.jsx
    Projects.jsx
    Skills.jsx
  App.jsx
```

## Design Notes

This portfolio intentionally avoids the default "clean SaaS card grid" look.

It is built around:

- expressive typography
- paper-like contrast and manga framing
- strong section identity
- playful hidden interactions
- desktop drama without breaking mobile usability

## Recent Upgrades

- refined mobile chapter navigation for smaller screens
- upgraded achievement wall presentation and badge alignment
- added context-aware hover labels and click-burst feedback
- added hidden command terminal
- restored a cleaner classic `To Be Continued` ending

## Build Status

Latest production verification completed successfully on `April 14, 2026` with:

```bash
npm run build
```

## Contact

- Portfolio: [iamshivansh.in](https://iamshivansh.in)
- GitHub: [@Shivansh-04](https://github.com/Shivansh-04)
- LinkedIn: [gupta-shivansh](https://www.linkedin.com/in/gupta-shivansh/)
- Email: [shivanshgupta0987@gmail.com](mailto:shivanshgupta0987@gmail.com)

---

```text
[ NEXT ISSUE PREVIEW ]
More interaction. More motion. More story.
The portfolio is meant to feel alive, and this chapter keeps evolving.
```
