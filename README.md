# Pac Man built with React 18

### URL

https://pacman-react.stefanwille.com

### Tile Editor

I have used [Tiled](https://www.mapeditor.org/).

File is called pacman6.tmx. The Export file is pacman6.json.

Basic Editing:

- Make the Pills or Ways layer visible.
- Select one of them
- Use the Stamp Brush to paint tiles from the Assets area onto the active layer.
- Press CMD-S for Save
- Press CMD-E for Export

### Deployment

Automatically deployed to Vercel

## Original Assets Credit

Assets came from Armin Reichert: https://github.com/armin-reichert/pacman

---

Built with [Vite](https://vitejs.dev/) + [Vitest](https://vitest.dev/).

## Install

```
pnpm install
```

## Available Scripts

### `pnpm dev`

Runs the Vite dev server at [http://localhost:3000](http://localhost:3000) with HMR.

### `pnpm test`

Runs Vitest in watch mode.

### `pnpm test:ci`

Runs Vitest once (CI mode).

### `pnpm build`

Typechecks and builds the production bundle into the `build/` folder.

### `pnpm preview`

Serves the production build locally for smoke-testing.
