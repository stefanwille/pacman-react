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

- **Zustand** for reactive state with Immer middleware for immutable updates
- `src/model/store/` - Zustand store directory:
  - `gameStore.ts` - main store with state and actions
  - `types.ts` - TypeScript type definitions for state
  - `initialState.ts` - factory functions for initial state
  - `ghostHelpers.ts` - helper functions for ghost computed values
  - `constants.ts` - game constants (timers, speeds)
- `useGameStore` hook provides state access with selectors

### State Machines

State machine logic is implemented directly in the Zustand store:

- `sendPacManEvent` - PacMan state transitions: eating → chasing → dead
- `sendGhostEvent` - Ghost state transitions: scatter ↔ chase ↔ frightened → dead
- Events: ENERGIZER_EATEN, COLLISION_WITH_GHOST, PHASE_END, REVIVED, etc.

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
- `src/model/store/` - Zustand store and state management
- `src/pages/GamePage/` - main game UI components
- `src/components/` - shared components (Board, Sprite, Grid)
- `src/mapData/` - maze tile data

### Tech Stack

- React 18, TypeScript, Zustand, Immer, styled-components, Ant Design, react-router-dom

## Deployment

Auto-deployed to Vercel: https://pacman-react.stefanwille.com/
