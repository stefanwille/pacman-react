import { chooseNewTargetTile } from './chooseNewTargetTile';
import { chooseNextTile } from './chooseNextTile';
import {
  TileCoordinates,
  MAZE_WIDTH_IN_SCREEN_COORDINATES,
  MAZE_HEIGHT_IN_SCREEN_COORDINATES,
  tileFromScreen,
} from './Coordinates';
import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';
import { Direction } from './Types';
import { directionToVector, isTileCenter, DIRECTION_TO_OPPOSITE_DIRECTION } from './Ways';
import { Vector } from './Vector';
import {
  useGameStore,
  createGhostData,
  GhostData,
  getStatePhaseLength,
} from './store';

export const updateGhosts = () => {
  const store = useGameStore.getState();
  const ghostCount = store.game.ghosts.length;

  for (let i = 0; i < ghostCount; i++) {
    updateGhost(i);
  }
};

const updateGhost = (ghostIndex: number) => {
  const store = useGameStore.getState();
  const ghost = store.game.ghosts[ghostIndex];

  if (ghost.ghostPaused) {
    return;
  }

  updateGhostStatePhaseTime(ghostIndex);
  updateDeadWaitingTimeInBoxLeft(ghostIndex);
  updateGhostStatePhase(ghostIndex);
  routeAndMoveGhost(ghostIndex);
};

const updateGhostStatePhaseTime = (ghostIndex: number) => {
  const store = useGameStore.getState();
  const lastFrameLength = store.game.lastFrameLength;

  useGameStore.setState((state) => {
    const timer = state.game.ghosts[ghostIndex].statePhaseTimer;
    if (timer.running) {
      timer.timeSpent += lastFrameLength;
    }
  });
};

const updateDeadWaitingTimeInBoxLeft = (ghostIndex: number) => {
  const store = useGameStore.getState();
  const ghost = store.game.ghosts[ghostIndex];
  const isDead = ghost.state === 'dead';

  if (isDead && ghost.deadWaitingTimeInBoxLeft > 0) {
    useGameStore.setState((state) => {
      state.game.ghosts[ghostIndex].deadWaitingTimeInBoxLeft -= state.game.lastFrameLength;
    });
  }
};

const updateGhostStatePhase = (ghostIndex: number) => {
  const ghostData = createGhostData(ghostIndex);

  if (!ghostData.atTileCenter) {
    return;
  }

  const timer = ghostData.statePhaseTimer;
  const isTimedOut = timer.timeSpent >= timer.duration;

  if (isTimedOut) {
    // Send PHASE_END event - this will trigger direction change for scatter<->chase
    const store = useGameStore.getState();
    const ghost = store.game.ghosts[ghostIndex];
    const currentState = ghost.state;

    store.sendGhostEvent(ghostIndex, 'PHASE_END');

    // If transitioning between scatter and chase, change direction to opposite
    const updatedGhost = useGameStore.getState().game.ghosts[ghostIndex];
    if (
      (currentState === 'scatter' && updatedGhost.state === 'chase') ||
      (currentState === 'chase' && updatedGhost.state === 'scatter')
    ) {
      useGameStore.setState((state) => {
        const g = state.game.ghosts[ghostIndex];
        g.direction = DIRECTION_TO_OPPOSITE_DIRECTION[g.direction];
      });
    }

    // Restart timer with new duration
    const newDuration = getStatePhaseLength(updatedGhost.state);
    useGameStore.setState((state) => {
      const timer = state.game.ghosts[ghostIndex].statePhaseTimer;
      timer.duration = newDuration;
      timer.running = true;
      timer.timeSpent = 0;
    });
  }
};

const routeAndMoveGhost = (ghostIndex: number) => {
  const store = useGameStore.getState();
  const pacManDead = store.game.pacMan.state === 'dead';

  if (pacManDead) {
    return;
  }

  const ghostData = createGhostData(ghostIndex);

  if (ghostData.atTileCenter) {
    reRouteGhost(ghostIndex, ghostData);
  }

  moveGhost(ghostIndex);
};

const reRouteGhost = (ghostIndex: number, ghostData: GhostData) => {
  const newTargetTile = chooseNewTargetTileForGhost(ghostIndex, ghostData);

  useGameStore.setState((state) => {
    state.game.ghosts[ghostIndex].targetTile = newTargetTile;
  });

  updateDirection(ghostIndex);
  updateSpeed(ghostIndex);
};

const chooseNewTargetTileForGhost = (ghostIndex: number, ghostData: GhostData): TileCoordinates => {
  // Create a ghost-like object for chooseNewTargetTile
  const store = useGameStore.getState();
  const game = store.game;

  // Build a compatible ghost object for the existing chooseNewTargetTile function
  const ghostLike = {
    state: ghostData.state,
    ghostNumber: ghostData.ghostNumber,
    tileCoordinates: ghostData.tileCoordinates,
    direction: ghostData.direction,
    isInsideBoxWalls: ghostData.isInsideBoxWalls,
    deadWaitingTimeInBoxLeft: ghostData.deadWaitingTimeInBoxLeft,
    game: {
      pacMan: {
        tileCoordinates: tileFromScreen(game.pacMan.screenCoordinates),
        direction: game.pacMan.direction,
      },
      ghosts: game.ghosts.map((g) => ({
        tileCoordinates: tileFromScreen(g.screenCoordinates),
      })),
    },
  };

  return chooseNewTargetTile(ghostLike as any);
};

const updateDirection = (ghostIndex: number) => {
  const ghostData = createGhostData(ghostIndex);
  const newDirection = getNewDirection(ghostData);

  useGameStore.setState((state) => {
    state.game.ghosts[ghostIndex].direction = newDirection;
  });
};

const updateSpeed = (ghostIndex: number) => {
  const ghostData = createGhostData(ghostIndex);
  const newSpeedFactor = getNewSpeedFactor(ghostData);

  useGameStore.setState((state) => {
    state.game.ghosts[ghostIndex].speedFactor = newSpeedFactor;
  });
};

export const getNewDirection = (ghostData: GhostData): Direction => {
  const currentTile = ghostData.tileCoordinates;
  const currentDirection = ghostData.direction;
  const targetTile = ghostData.targetTile;
  const boxDoorIsOpen = ghostData.canPassThroughBoxDoor;

  const nextTile: TileCoordinates = chooseNextTile({
    currentTile,
    currentDirection,
    targetTile,
    boxDoorIsOpen,
  });

  return getDirectionFromTileToTile(currentTile, nextTile);
};

const moveGhost = (ghostIndex: number) => {
  const store = useGameStore.getState();
  const ghost = store.game.ghosts[ghostIndex];
  const speed = store.game.speed * ghost.speedFactor;
  const vector: Vector = directionToVector(ghost.direction, speed);

  useGameStore.setState((state) => {
    const g = state.game.ghosts[ghostIndex];
    g.screenCoordinates.x =
      (g.screenCoordinates.x + vector.x + MAZE_WIDTH_IN_SCREEN_COORDINATES) %
      MAZE_WIDTH_IN_SCREEN_COORDINATES;
    g.screenCoordinates.y =
      (g.screenCoordinates.y + vector.y + MAZE_HEIGHT_IN_SCREEN_COORDINATES) %
      MAZE_HEIGHT_IN_SCREEN_COORDINATES;
  });
};

const isInTunnel = (tile: TileCoordinates) =>
  tile.y === 14 && (tile.x >= 22 || tile.x <= 5);

export const SPEED_FACTOR_HIGH = 2;
export const SPEED_FACTOR_NORMAL = 1;
export const SPEED_FACTOR_SLOW = 0.5;

const getNewSpeedFactor = (ghostData: GhostData): number => {
  if (ghostData.dead) {
    return SPEED_FACTOR_HIGH;
  }
  if (isInTunnel(ghostData.tileCoordinates) || ghostData.state === 'frightened') {
    return SPEED_FACTOR_SLOW;
  }
  return SPEED_FACTOR_NORMAL;
};
