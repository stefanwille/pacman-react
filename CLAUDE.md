# CLAUDE.md

## Project

PacMan game clone — React + TypeScript. Personal project; deployed to https://pacman-react.stefanwille.com/ (auto-deploy from master via Vercel).

## Non-obvious workflows

### Editing the maze

The maze is authored in [Tiled](https://www.mapeditor.org/) as `src/mapData/pacman6.tmx`. After editing in Tiled, export to `src/mapData/pacman6.json` — the game loads the JSON, not the TMX. Forgetting to re-export means your changes won't appear.

### Pre-push hook

Runs `pnpm compile && pnpm lint && pnpm test:ci`. Don't `--no-verify` without a reason.

## Architectural notes (not obvious from code)

- **State machines live inside the Zustand store**, not in a library like XState. Transitions are handled by `sendPacManEvent` / `sendGhostEvent` reducers. An earlier XState version was removed — don't reintroduce it.
- **Two coordinate systems** (`TileCoordinates` vs `ScreenCoordinates`) are distinct branded types in `src/model/Coordinates.ts`. Always convert explicitly; don't pass raw `{x, y}` between layers.
- Immer middleware is on the Zustand store, so actions mutate draft state directly.
