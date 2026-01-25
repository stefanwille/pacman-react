import { screenFromTile } from '../Coordinates';
import { getPillsMatrix } from '../MazeData';
import {
  StoreState,
  GameState,
  PacManState,
  GhostState,
  MazeState,
  DebugState,
  TimerState,
  INITIAL_PACMAN_STATE,
  INITIAL_GHOST_STATE,
  GhostNumber,
  GhostStateValue,
} from './types';
import {
  DEFAULT_SPEED,
  CHASE_PHASE_LENGTH,
  SCATTER_PHASE_LENGTH,
} from './constants';

// Local helper to avoid circular dependency with gameStore
const getStatePhaseLength = (state: GhostStateValue): number => {
  switch (state) {
    case 'chase':
      return CHASE_PHASE_LENGTH;
    case 'scatter':
      return SCATTER_PHASE_LENGTH;
    default:
      return 9999999999;
  }
};

const ENERGIZER_DURATION = 5000;
const DEAD_WAITING_IN_BOX_DURATION = 3000;

export const createTimerState = (duration: number): TimerState => ({
  running: false,
  timeSpent: 0,
  duration,
});

export const createPacManState = (): PacManState => ({
  state: INITIAL_PACMAN_STATE,
  screenCoordinates: screenFromTile({ x: 14, y: 23 }),
  direction: 'LEFT',
  nextDirection: 'LEFT',
  diedAtTimestamp: -1,
  extraLivesLeft: 2,
});

const GHOST_CONFIGS: Array<{
  ghostNumber: GhostNumber;
  name: string;
  color: string;
  colorCode: string;
  initialWaitingTimeInBox: number;
  initialTile: { x: number; y: number };
  initialDirection: 'LEFT' | 'RIGHT';
}> = [
  {
    ghostNumber: 0,
    name: 'Blinky',
    color: 'red',
    colorCode: '#ff0000',
    initialWaitingTimeInBox: 1000,
    initialTile: { x: 12, y: 14 },
    initialDirection: 'LEFT',
  },
  {
    ghostNumber: 1,
    name: 'Pinky',
    color: 'pink',
    colorCode: '#fcb5ff',
    initialWaitingTimeInBox: 1300,
    initialTile: { x: 13, y: 14 },
    initialDirection: 'RIGHT',
  },
  {
    ghostNumber: 2,
    name: 'Inky',
    color: 'blue',
    colorCode: '#00ffff',
    initialWaitingTimeInBox: 1600,
    initialTile: { x: 14, y: 14 },
    initialDirection: 'LEFT',
  },
  {
    ghostNumber: 3,
    name: 'Clyde',
    color: 'orange',
    colorCode: '#f9ba55',
    initialWaitingTimeInBox: 1900,
    initialTile: { x: 15, y: 14 },
    initialDirection: 'RIGHT',
  },
];

export const createGhostState = (ghostNumber: GhostNumber): GhostState => {
  const config = GHOST_CONFIGS[ghostNumber];
  const initialPhaseDuration = getStatePhaseLength(INITIAL_GHOST_STATE);
  return {
    state: INITIAL_GHOST_STATE,
    previousStateBeforeFrightened: 'scatter',
    ghostNumber: config.ghostNumber,
    name: config.name,
    color: config.color,
    colorCode: config.colorCode,
    screenCoordinates: screenFromTile(config.initialTile),
    direction: config.initialDirection,
    targetTile: { x: 1, y: 1 },
    ghostPaused: false,
    speedFactor: 1,
    deadWaitingTimeInBoxLeft: 0,
    initialWaitingTimeInBox: config.initialWaitingTimeInBox,
    stateChanges: 0,
    statePhaseTimer: createTimerState(initialPhaseDuration),
  };
};

export const createGhostsState = (): GhostState[] => {
  const ghosts = GHOST_CONFIGS.map((_, i) => createGhostState(i as GhostNumber));
  // Start all state phase timers
  ghosts.forEach(ghost => {
    ghost.statePhaseTimer.running = true;
  });
  return ghosts;
};

export const createMazeState = (): MazeState => ({
  pills: getPillsMatrix(),
});

export const createDebugState = (): DebugState => ({
  gameViewOptions: {
    hitBox: false,
  },
  ghostViewOptions: {
    target: false,
    wayPoints: false,
  },
  pacManViewOptions: {
    somePlaceholder: false,
  },
});

export const createGameState = (): GameState => ({
  externalTimeStamp: null,
  timestamp: 0,
  lastFrameLength: 17,
  frameCount: 0,
  gamePaused: false,
  speed: DEFAULT_SPEED,
  score: 0,
  killedGhosts: 0,
  pacMan: createPacManState(),
  ghosts: createGhostsState(),
  maze: createMazeState(),
  energizerTimer: createTimerState(ENERGIZER_DURATION),
});

export const createInitialState = (): StoreState => ({
  game: createGameState(),
  debugState: createDebugState(),
});
