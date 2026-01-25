# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start          # Dev server at localhost:3000
yarn build          # Production build
yarn test           # Tests in watch mode
yarn test:ci        # Tests in CI mode (single run)
yarn compile        # TypeScript type check
yarn lint           # ESLint
```

Run single test:

```bash
yarn test:ci src/model/Game.test.ts
```

Pre-push hook runs: `yarn compile && yarn lint && yarn test:ci`

## Architecture

React + TypeScript PacMan game using Create React App.

### State Management

- **MobX** for reactive state
- `Store` (src/model/Store.ts) - root store containing `Game` and `DebugState`
- `Game` (src/model/Game.ts) - game state: PacMan, Ghosts, Maze, score, timers
- React context provides store access via `useStore()`

### State Machines

- **XState** for PacMan and Ghost behavior
- `PacManStateChart` - states: eating, chasing, dead
- `GhostStateChart` - states: chase, scatter, frightened, dead
- Events trigger transitions (ENERGIZER_EATEN, COLLISION_WITH_GHOST, etc.)

### Game Loop

- `useGameLoop` hook drives animation via requestAnimationFrame
- `onAnimationFrame` updates PacMan, Ghosts, timers each frame
- `TimeoutTimer` / `IntervalTimer` for game timing (energizer duration, state phases)

### Coordinate System

- `TileCoordinates` - grid position (x, y in tiles)
- `ScreenCoordinates` - pixel position
- Conversion functions in src/model/Coordinates.ts

### Key Directories

- `src/model/` - game logic, state machines, movement, collision
- `src/pages/GamePage/` - main game UI components
- `src/components/` - shared components (Board, Sprite, Grid)
- `src/mapData/` - maze tile data

### Tech Stack

- React 18, TypeScript, MobX 5, XState, styled-components, Ant Design, react-router-dom

## Deployment

Auto-deployed to Vercel: https://pacman-react.stefanwille.com/
