import { TileCoordinates, tileFromScreen, screenFromTile } from '../Coordinates';
import { isTileCenter, isTileInBox as isTileInBoxWalls, isTileInBoxSpace } from '../Ways';
import { useGameStore } from './gameStore';
import { GhostState, GhostStateValue, PacManState } from './types';

// Helper to compute tile coordinates from screen coordinates
export const getGhostTileCoordinates = (ghost: GhostState): TileCoordinates => {
  return tileFromScreen(ghost.screenCoordinates);
};

// Helper to check if ghost is at tile center
export const isGhostAtTileCenter = (ghost: GhostState): boolean => {
  return isTileCenter(ghost.screenCoordinates);
};

// Helper to check if ghost is inside box walls
export const isGhostInsideBoxWalls = (ghost: GhostState): boolean => {
  return isTileInBoxWalls(getGhostTileCoordinates(ghost));
};

// Helper to check if ghost is outside box space
export const isGhostOutsideBoxSpace = (ghost: GhostState): boolean => {
  return !isTileInBoxSpace(getGhostTileCoordinates(ghost));
};

// Helper to check if ghost can pass through box door
export const canGhostPassThroughBoxDoor = (ghost: GhostState, timestamp: number): boolean => {
  const isDead = ghost.state === 'dead';
  const isAlive = !isDead;
  const isInsideBoxWalls = isGhostInsideBoxWalls(ghost);
  const isOutsideBoxSpace = isGhostOutsideBoxSpace(ghost);

  if (isAlive) {
    if (isInsideBoxWalls) {
      if (timestamp > ghost.initialWaitingTimeInBox) {
        return true;
      }
    }
  }

  if (isDead) {
    if (isOutsideBoxSpace) {
      return true;
    }

    // Dead && Inside box
    if (ghost.deadWaitingTimeInBoxLeft <= 0) {
      return true;
    }
  }

  return false;
};

// Helper to get PacMan tile coordinates
export const getPacManTileCoordinates = (pacMan: PacManState): TileCoordinates => {
  return tileFromScreen(pacMan.screenCoordinates);
};

// Interface for ghost data needed by game logic functions
export interface GhostData {
  state: GhostStateValue;
  ghostNumber: number;
  screenCoordinates: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  targetTile: TileCoordinates;
  ghostPaused: boolean;
  speedFactor: number;
  deadWaitingTimeInBoxLeft: number;
  initialWaitingTimeInBox: number;
  statePhaseTimer: { running: boolean; timeSpent: number; duration: number };
  // Computed
  tileCoordinates: TileCoordinates;
  atTileCenter: boolean;
  isInsideBoxWalls: boolean;
  isOutsideBoxSpace: boolean;
  dead: boolean;
  alive: boolean;
  frightened: boolean;
  canPassThroughBoxDoor: boolean;
}

// Create a GhostData object from Zustand state
export const createGhostData = (ghostIndex: number): GhostData => {
  const store = useGameStore.getState();
  const ghost = store.game.ghosts[ghostIndex];
  const timestamp = store.game.timestamp;

  return {
    state: ghost.state,
    ghostNumber: ghost.ghostNumber,
    screenCoordinates: ghost.screenCoordinates,
    direction: ghost.direction,
    targetTile: ghost.targetTile,
    ghostPaused: ghost.ghostPaused,
    speedFactor: ghost.speedFactor,
    deadWaitingTimeInBoxLeft: ghost.deadWaitingTimeInBoxLeft,
    initialWaitingTimeInBox: ghost.initialWaitingTimeInBox,
    statePhaseTimer: ghost.statePhaseTimer,
    // Computed
    tileCoordinates: getGhostTileCoordinates(ghost),
    atTileCenter: isGhostAtTileCenter(ghost),
    isInsideBoxWalls: isGhostInsideBoxWalls(ghost),
    isOutsideBoxSpace: isGhostOutsideBoxSpace(ghost),
    dead: ghost.state === 'dead',
    alive: ghost.state !== 'dead',
    frightened: ghost.state === 'frightened',
    canPassThroughBoxDoor: canGhostPassThroughBoxDoor(ghost, timestamp),
  };
};

// Interface for PacMan data
export interface PacManData {
  state: 'eating' | 'chasing' | 'dead';
  screenCoordinates: { x: number; y: number };
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  // Computed
  tileCoordinates: TileCoordinates;
  dead: boolean;
  alive: boolean;
}

// Create a PacManData object from Zustand state
export const createPacManData = (): PacManData => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;

  return {
    state: pacMan.state,
    screenCoordinates: pacMan.screenCoordinates,
    direction: pacMan.direction,
    tileCoordinates: getPacManTileCoordinates(pacMan),
    dead: pacMan.state === 'dead',
    alive: pacMan.state !== 'dead',
  };
};
