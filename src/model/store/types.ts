import { TileId } from '../MazeData';
import { Direction, MilliSeconds, PixelsPerFrame } from '../Types';
import { ScreenCoordinates, TileCoordinates } from '../Coordinates';
import { GhostViewOptions } from '../GhostViewOptions';
import { PacManViewOptions } from '../../pages/GamePage/components/PacManViewOptions';
import { GameViewOptions } from '../GameViewOptions';

// PacMan State Machine
export type PacManStateValue = 'eating' | 'chasing' | 'dead';
export const INITIAL_PACMAN_STATE: PacManStateValue = 'eating';

export type PacManEventType =
  | 'ENERGIZER_EATEN'
  | 'ENERGIZER_TIMED_OUT'
  | 'COLLISION_WITH_GHOST'
  | 'REVIVED';

// Ghost State Machine
export type GhostStateValue = 'chase' | 'scatter' | 'frightened' | 'dead';
export const INITIAL_GHOST_STATE: GhostStateValue = 'scatter';

export type GhostEventType =
  | 'RESET'
  | 'ENERGIZER_EATEN'
  | 'ENERGIZER_TIMED_OUT'
  | 'PHASE_END'
  | 'COLLISION_WITH_PAC_MAN'
  | 'REVIVED';

// Ghost types
export type GhostNumber = 0 | 1 | 2 | 3;
export const GhostNumbers: GhostNumber[] = [0, 1, 2, 3];
export type GhostAnimationPhase = 0 | 1;
export const GhostAnimationPhases: GhostAnimationPhase[] = [0, 1];
export type FrightenedGhostTime = 0 | 1;
export const FrightenedGhostTimes: FrightenedGhostTime[] = [0, 1];

// Timer state
export interface TimerState {
  running: boolean;
  timeSpent: MilliSeconds;
  duration: MilliSeconds;
}

// PacMan state
export interface PacManState {
  state: PacManStateValue;
  screenCoordinates: ScreenCoordinates;
  direction: Direction;
  nextDirection: Direction;
  diedAtTimestamp: MilliSeconds;
  extraLivesLeft: number;
}

// Ghost state
export interface GhostState {
  state: GhostStateValue;
  previousStateBeforeFrightened: 'chase' | 'scatter';
  ghostNumber: GhostNumber;
  name: string;
  color: string;
  colorCode: string;
  screenCoordinates: ScreenCoordinates;
  direction: Direction;
  targetTile: TileCoordinates;
  ghostPaused: boolean;
  speedFactor: number;
  deadWaitingTimeInBoxLeft: MilliSeconds;
  initialWaitingTimeInBox: number;
  stateChanges: number;
  statePhaseTimer: TimerState;
}

// Maze state
export interface MazeState {
  pills: TileId[][];
}

// Debug state
export interface DebugState {
  gameViewOptions: GameViewOptions;
  ghostViewOptions: GhostViewOptions;
  pacManViewOptions: PacManViewOptions;
}

// Game state
export interface GameState {
  externalTimeStamp: MilliSeconds | null;
  timestamp: MilliSeconds;
  lastFrameLength: MilliSeconds;
  frameCount: number;
  gamePaused: boolean;
  speed: PixelsPerFrame;
  score: number;
  killedGhosts: number;
  pacMan: PacManState;
  ghosts: GhostState[];
  maze: MazeState;
  energizerTimer: TimerState;
}

// Root store state
export interface StoreState {
  game: GameState;
  debugState: DebugState;
}

// Store actions
export interface StoreActions {
  // Game actions
  resetGame: () => void;
  setGamePaused: (paused: boolean) => void;
  advanceGame: (timestamp: MilliSeconds, delta: MilliSeconds) => void;

  // PacMan actions
  setPacManDirection: (direction: Direction) => void;
  setPacManNextDirection: (direction: Direction) => void;
  setPacManScreenCoordinates: (coords: ScreenCoordinates) => void;
  setPacManTileCoordinates: (tile: TileCoordinates) => void;
  sendPacManEvent: (event: PacManEventType) => void;

  // Ghost actions
  sendGhostEvent: (ghostIndex: number, event: GhostEventType) => void;
  setGhostScreenCoordinates: (ghostIndex: number, coords: ScreenCoordinates) => void;
  setGhostDirection: (ghostIndex: number, direction: Direction) => void;
  setGhostTargetTile: (ghostIndex: number, tile: TileCoordinates) => void;
  setGhostPaused: (ghostIndex: number, paused: boolean) => void;
  resetGhost: (ghostIndex: number) => void;

  // Timer actions
  startEnergizerTimer: () => void;
  advanceEnergizerTimer: (delta: MilliSeconds) => void;
  stopEnergizerTimer: () => void;
  advanceGhostStatePhaseTimer: (ghostIndex: number, delta: MilliSeconds) => void;
  restartGhostStatePhaseTimer: (ghostIndex: number, duration: MilliSeconds) => void;

  // Maze actions
  setPill: (x: number, y: number, value: TileId) => void;

  // Score actions
  addScore: (points: number) => void;
  incrementKilledGhosts: () => void;

  // Debug actions
  setGameViewOption: <K extends keyof GameViewOptions>(key: K, value: GameViewOptions[K]) => void;
  setGhostViewOption: <K extends keyof GhostViewOptions>(key: K, value: GhostViewOptions[K]) => void;
  setPacManViewOption: <K extends keyof PacManViewOptions>(key: K, value: PacManViewOptions[K]) => void;
}

export type Store = StoreState & StoreActions;
