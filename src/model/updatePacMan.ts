import {
  ScreenCoordinates,
  tileFromScreen,
  MAZE_WIDTH_IN_SCREEN_COORDINATES,
  screenFromTile,
} from './Coordinates';
import { useGameStore, PacManState, GhostState, INITIAL_PACMAN_STATE } from './store';
import { MilliSeconds } from './Types';
import {
  directionToVector as directionAsVector,
  isTileCenter,
  isWayFreeInDirection,
} from './Ways';
import { TotalPacManDyingAnimationLength } from './pacManDyingPhase';
import { Vector } from './Vector';
import { getStatePhaseLength } from './store/gameStore';
import { INITIAL_GHOST_STATE } from './store/types';

export const DELAY_TO_REVIVE_PAC_MAN: MilliSeconds = TotalPacManDyingAnimationLength;

export const updatePacMan = (): void => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;
  const isDead = pacMan.state === 'dead';

  if (!isDead) {
    updateLivingPacMan();
  } else {
    updateDeadPacMan();
  }
};

const updateLivingPacMan = () => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;

  if (isTileCenter(pacMan.screenCoordinates)) {
    const tile = tileFromScreen(pacMan.screenCoordinates);

    // Change direction if necessary
    if (
      pacMan.direction !== pacMan.nextDirection &&
      isWayFreeInDirection(tile, pacMan.nextDirection)
    ) {
      useGameStore.setState((state) => {
        state.game.pacMan.direction = state.game.pacMan.nextDirection;
      });
    }

    // Get updated direction after potential change
    const updatedPacMan = useGameStore.getState().game.pacMan;

    // Move
    if (isWayFreeInDirection(tile, updatedPacMan.direction)) {
      movePacMan();
    }
  } else {
    movePacMan();
  }
};

const movePacMan = (): void => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;
  const speed = store.game.speed;
  const delta: ScreenCoordinates = directionAsVector(pacMan.direction, speed);
  movePacManBy(delta);
};

const movePacManBy = (vector: Vector) => {
  useGameStore.setState((state) => {
    const pacMan = state.game.pacMan;
    pacMan.screenCoordinates.x =
      (pacMan.screenCoordinates.x + vector.x + MAZE_WIDTH_IN_SCREEN_COORDINATES) %
      MAZE_WIDTH_IN_SCREEN_COORDINATES;
    pacMan.screenCoordinates.y += vector.y;
  });
};

const updateDeadPacMan = () => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;
  const timeSinceDeath = store.game.timestamp - pacMan.diedAtTimestamp;

  if (timeSinceDeath >= TotalPacManDyingAnimationLength) {
    revivePacMan();
  }
};

const revivePacMan = () => {
  const store = useGameStore.getState();
  const pacMan = store.game.pacMan;

  if (pacMan.extraLivesLeft > 0) {
    useGameStore.setState((state) => {
      state.game.pacMan.extraLivesLeft -= 1;
    });
    doRevivePacMan();
  }
};

const doRevivePacMan = () => {
  const store = useGameStore.getState();

  // Send REVIVED event to pacman
  store.sendPacManEvent('REVIVED');

  // Reset game timestamp and pacman position
  useGameStore.setState((state) => {
    state.game.timestamp = 0;
    // Reset pacman
    state.game.pacMan.diedAtTimestamp = -1;
    state.game.pacMan.state = INITIAL_PACMAN_STATE;
    state.game.pacMan.screenCoordinates = screenFromTile({ x: 14, y: 23 });
    state.game.pacMan.nextDirection = 'LEFT';
    state.game.pacMan.direction = 'LEFT';

    // Reset ghosts
    const ghostPositions = [
      { x: 12, y: 14, direction: 'LEFT' as const },
      { x: 13, y: 14, direction: 'RIGHT' as const },
      { x: 14, y: 14, direction: 'LEFT' as const },
      { x: 15, y: 14, direction: 'RIGHT' as const },
    ];

    state.game.ghosts.forEach((ghost, index) => {
      ghost.screenCoordinates = screenFromTile(ghostPositions[index]);
      ghost.direction = ghostPositions[index].direction;
      ghost.ghostPaused = false;
      ghost.state = INITIAL_GHOST_STATE;
      ghost.statePhaseTimer.duration = getStatePhaseLength(INITIAL_GHOST_STATE);
      ghost.statePhaseTimer.running = true;
      ghost.statePhaseTimer.timeSpent = 0;
      ghost.stateChanges++;
    });
  });
};
