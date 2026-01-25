import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { screenFromTile, tileFromScreen } from '../Coordinates';
import { getPillsMatrix } from '../MazeData';
import {
  Store,
  PacManEventType,
  GhostEventType,
  GhostStateValue,
  PacManStateValue,
  INITIAL_PACMAN_STATE,
  INITIAL_GHOST_STATE,
} from './types';
import {
  createInitialState,
  createPacManState,
  createGhostsState,
  createMazeState,
  createTimerState,
} from './initialState';
import { KILL_GHOST_SCORE, CHASE_PHASE_LENGTH, SCATTER_PHASE_LENGTH } from './constants';

const ENERGIZER_DURATION = 5000;

export const getStatePhaseLength = (state: GhostStateValue): number => {
  switch (state) {
    case 'chase':
      return CHASE_PHASE_LENGTH;
    case 'scatter':
      return SCATTER_PHASE_LENGTH;
    default:
      return 9999999999;
  }
};

// PacMan state machine transitions
const pacManTransition = (
  currentState: PacManStateValue,
  event: PacManEventType
): { nextState: PacManStateValue; action?: 'onChasing' | 'onDead' } | null => {
  switch (currentState) {
    case 'eating':
      switch (event) {
        case 'ENERGIZER_EATEN':
          return { nextState: 'chasing', action: 'onChasing' };
        case 'COLLISION_WITH_GHOST':
          return { nextState: 'dead', action: 'onDead' };
        default:
          return null;
      }
    case 'chasing':
      switch (event) {
        case 'ENERGIZER_TIMED_OUT':
          return { nextState: 'eating' };
        default:
          return null;
      }
    case 'dead':
      switch (event) {
        case 'REVIVED':
          return { nextState: 'eating' };
        default:
          return null;
      }
    default:
      return null;
  }
};

// Ghost state machine transitions
const ghostTransition = (
  currentState: GhostStateValue,
  event: GhostEventType
): { nextState: GhostStateValue; action?: 'onScatterToChase' | 'onChaseToScatter' | 'onDead' } | null => {
  // Global RESET transition
  if (event === 'RESET') {
    return { nextState: INITIAL_GHOST_STATE };
  }

  switch (currentState) {
    case 'chase':
      switch (event) {
        case 'ENERGIZER_EATEN':
          return { nextState: 'frightened' };
        case 'PHASE_END':
          return { nextState: 'scatter', action: 'onChaseToScatter' };
        case 'COLLISION_WITH_PAC_MAN':
          return { nextState: 'scatter' };
        default:
          return null;
      }
    case 'scatter':
      switch (event) {
        case 'ENERGIZER_EATEN':
          return { nextState: 'frightened' };
        case 'PHASE_END':
          return { nextState: 'chase', action: 'onScatterToChase' };
        case 'COLLISION_WITH_PAC_MAN':
          return { nextState: 'scatter' };
        default:
          return null;
      }
    case 'frightened':
      switch (event) {
        case 'ENERGIZER_TIMED_OUT':
          return { nextState: 'chase' };
        case 'COLLISION_WITH_PAC_MAN':
          return { nextState: 'dead', action: 'onDead' };
        default:
          return null;
      }
    case 'dead':
      switch (event) {
        case 'REVIVED':
          return { nextState: 'scatter' };
        case 'ENERGIZER_TIMED_OUT':
          return { nextState: 'scatter' };
        default:
          return null;
      }
    default:
      return null;
  }
};

export const useGameStore = create<Store>()(
  immer((set, get) => ({
    ...createInitialState(),

    // Game actions
    resetGame: () =>
      set(state => {
        state.game = {
          ...createInitialState().game,
          pacMan: createPacManState(),
          ghosts: createGhostsState(),
          maze: createMazeState(),
          energizerTimer: createTimerState(ENERGIZER_DURATION),
        };
      }),

    setGamePaused: (paused) =>
      set(state => {
        state.game.gamePaused = paused;
      }),

    advanceGame: (timestamp, delta) =>
      set(state => {
        if (state.game.externalTimeStamp === null) {
          state.game.externalTimeStamp = timestamp;
        }
        state.game.lastFrameLength = delta;
        state.game.timestamp += delta;
        state.game.frameCount++;
      }),

    // PacMan actions
    setPacManDirection: (direction) =>
      set(state => {
        state.game.pacMan.direction = direction;
      }),

    setPacManNextDirection: (direction) =>
      set(state => {
        state.game.pacMan.nextDirection = direction;
      }),

    setPacManScreenCoordinates: (coords) =>
      set(state => {
        state.game.pacMan.screenCoordinates = coords;
      }),

    setPacManTileCoordinates: (tile) =>
      set(state => {
        state.game.pacMan.screenCoordinates = screenFromTile(tile);
      }),

    sendPacManEvent: (event) =>
      set(state => {
        const result = pacManTransition(state.game.pacMan.state, event);
        if (result) {
          state.game.pacMan.state = result.nextState;

          // Handle actions
          if (result.action === 'onChasing') {
            state.game.energizerTimer.running = true;
            state.game.energizerTimer.timeSpent = 0;
          } else if (result.action === 'onDead') {
            state.game.pacMan.diedAtTimestamp = state.game.timestamp;
          }
        }
      }),

    // Ghost actions
    sendGhostEvent: (ghostIndex, event) =>
      set(state => {
        const ghost = state.game.ghosts[ghostIndex];

        // Track state before frightened for returning after
        if (event === 'ENERGIZER_EATEN' && (ghost.state === 'chase' || ghost.state === 'scatter')) {
          ghost.previousStateBeforeFrightened = ghost.state;
        }

        const result = ghostTransition(ghost.state, event);
        if (result) {
          ghost.state = result.nextState;
          ghost.stateChanges++;

          // Handle actions
          if (result.action === 'onDead') {
            state.game.killedGhosts++;
            state.game.score += KILL_GHOST_SCORE[state.game.killedGhosts] || 0;
            ghost.deadWaitingTimeInBoxLeft = 3000; // DEAD_WAITING_IN_BOX_DURATION
          }
          // onScatterToChase and onChaseToScatter trigger direction change
          // This is handled by the caller (changeDirectionToOpposite)
        }
      }),

    setGhostScreenCoordinates: (ghostIndex, coords) =>
      set(state => {
        state.game.ghosts[ghostIndex].screenCoordinates = coords;
      }),

    setGhostDirection: (ghostIndex, direction) =>
      set(state => {
        state.game.ghosts[ghostIndex].direction = direction;
      }),

    setGhostTargetTile: (ghostIndex, tile) =>
      set(state => {
        state.game.ghosts[ghostIndex].targetTile = tile;
      }),

    setGhostPaused: (ghostIndex, paused) =>
      set(state => {
        state.game.ghosts[ghostIndex].ghostPaused = paused;
      }),

    resetGhost: (ghostIndex) =>
      set(state => {
        const ghost = state.game.ghosts[ghostIndex];
        ghost.ghostPaused = false;
        ghost.state = INITIAL_GHOST_STATE;
        ghost.statePhaseTimer.duration = getStatePhaseLength(INITIAL_GHOST_STATE);
        ghost.statePhaseTimer.running = true;
        ghost.statePhaseTimer.timeSpent = 0;
        ghost.stateChanges++;
      }),

    // Timer actions
    startEnergizerTimer: () =>
      set(state => {
        state.game.energizerTimer.running = true;
        state.game.energizerTimer.timeSpent = 0;
      }),

    advanceEnergizerTimer: (delta) =>
      set(state => {
        const timer = state.game.energizerTimer;
        if (!timer.running) return;
        timer.timeSpent += delta;
      }),

    stopEnergizerTimer: () =>
      set(state => {
        state.game.energizerTimer.running = false;
      }),

    advanceGhostStatePhaseTimer: (ghostIndex, delta) =>
      set(state => {
        const timer = state.game.ghosts[ghostIndex].statePhaseTimer;
        if (!timer.running) return;
        timer.timeSpent += delta;
      }),

    restartGhostStatePhaseTimer: (ghostIndex, duration) =>
      set(state => {
        const timer = state.game.ghosts[ghostIndex].statePhaseTimer;
        timer.duration = duration;
        timer.running = true;
        timer.timeSpent = 0;
      }),

    // Maze actions
    setPill: (x, y, value) =>
      set(state => {
        state.game.maze.pills[y][x] = value;
      }),

    // Score actions
    addScore: (points) =>
      set(state => {
        state.game.score += points;
      }),

    incrementKilledGhosts: () =>
      set(state => {
        state.game.killedGhosts++;
      }),

    // Debug actions
    setGameViewOption: (key, value) =>
      set(state => {
        state.debugState.gameViewOptions[key] = value;
      }),

    setGhostViewOption: (key, value) =>
      set(state => {
        state.debugState.ghostViewOptions[key] = value;
      }),

    setPacManViewOption: (key, value) =>
      set(state => {
        state.debugState.pacManViewOptions[key] = value;
      }),
  }))
);

// Selectors for computed values
export const selectPacManDead = (state: Store) => state.game.pacMan.state === 'dead';
export const selectPacManAlive = (state: Store) => state.game.pacMan.state !== 'dead';
export const selectPacManChasing = (state: Store) => state.game.pacMan.state === 'chasing';
export const selectGameOver = (state: Store) =>
  state.game.pacMan.state === 'dead' && state.game.pacMan.extraLivesLeft === 0;
export const selectPacManTileCoordinates = (state: Store) =>
  tileFromScreen(state.game.pacMan.screenCoordinates);
export const selectPacManTimeSinceDeath = (state: Store) => {
  if (state.game.pacMan.state !== 'dead') return 0;
  return state.game.timestamp - state.game.pacMan.diedAtTimestamp;
};
export const selectEnergizerTimeLeft = (state: Store) =>
  state.game.energizerTimer.duration - state.game.energizerTimer.timeSpent;
export const selectEnergizerTimedOut = (state: Store) =>
  state.game.energizerTimer.timeSpent >= state.game.energizerTimer.duration;

// Ghost selectors
export const selectGhostDead = (state: Store, ghostIndex: number) =>
  state.game.ghosts[ghostIndex].state === 'dead';
export const selectGhostAlive = (state: Store, ghostIndex: number) =>
  state.game.ghosts[ghostIndex].state !== 'dead';
export const selectGhostFrightened = (state: Store, ghostIndex: number) =>
  state.game.ghosts[ghostIndex].state === 'frightened';
export const selectGhostTileCoordinates = (state: Store, ghostIndex: number) =>
  tileFromScreen(state.game.ghosts[ghostIndex].screenCoordinates);
