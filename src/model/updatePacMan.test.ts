import { screenFromTile } from './Coordinates';
import { BASIC_PILL_POINTS, ghostCollidesWithPacMan } from './detectCollisions';
import { BASIC_PILL_ID, EMPTY_TILE_ID } from './MazeData';
import { simulateFrames, simulateFrame, simulateTime } from './simulateFrames';
import { DELAY_TO_REVIVE_PAC_MAN } from './updatePacMan';
import { TYPICAL_FRAME_LENGTH } from './onAnimationFrame';
import {
  PacManDyingPhaseLength,
  getPacManDyingPhase,
} from './pacManDyingPhase';
import { useGameStore, createInitialState } from './store';

// Add DEFAULT_SPEED to store constants
const GAME_DEFAULT_SPEED = 2;

// Helper to reset store before each test
const resetStore = () => {
  useGameStore.setState(createInitialState());
};

// Helper to set pacman position
const setPacManTileCoordinates = (tile: { x: number; y: number }) => {
  useGameStore.setState((state) => {
    state.game.pacMan.screenCoordinates = screenFromTile(tile);
  });
};

// Helper to set ghost position
const setGhostTileCoordinates = (ghostIndex: number, tile: { x: number; y: number }) => {
  useGameStore.setState((state) => {
    state.game.ghosts[ghostIndex].screenCoordinates = screenFromTile(tile);
  });
};

// Helper to get game state
const getGame = () => useGameStore.getState().game;

// Helper to get PacMan state
const getPacMan = () => useGameStore.getState().game.pacMan;

// Helper to get timestamp
const getTimestamp = () => useGameStore.getState().game.timestamp;

// Helper to compute time since death
const getTimeSinceDeath = () => {
  const state = useGameStore.getState();
  const pacMan = state.game.pacMan;
  if (pacMan.state !== 'dead') return 0;
  return state.game.timestamp - pacMan.diedAtTimestamp;
};

// Helper to check if game is over
const isGameOver = () => {
  const pacMan = getPacMan();
  return pacMan.state === 'dead' && pacMan.extraLivesLeft === 0;
};

describe('updatePacMan()', () => {
  beforeEach(() => {
    resetStore();
  });

  it('advances PacMans position', () => {
    // Arrange
    setPacManTileCoordinates({ x: 1, y: 1 });
    expect(getPacMan().screenCoordinates.x).toBe(20);
    useGameStore.setState((state) => {
      state.game.pacMan.direction = 'RIGHT';
      state.game.pacMan.nextDirection = 'RIGHT';
    });

    // Act
    simulateFrames(1);

    // Assert
    expect(getPacMan().screenCoordinates.x).toBe(20 + GAME_DEFAULT_SPEED);

    // Act
    simulateFrames(1);

    // Assert
    expect(getPacMan().screenCoordinates.x).toBe(20 + 2 * GAME_DEFAULT_SPEED);
  });

  it('stops pac man once he is dead', () => {
    // Arrange
    setPacManTileCoordinates({ x: 1, y: 1 });
    expect(getPacMan().screenCoordinates.x).toBe(20);
    useGameStore.setState((state) => {
      state.game.pacMan.direction = 'RIGHT';
      state.game.pacMan.nextDirection = 'RIGHT';
    });

    // Act
    useGameStore.getState().sendPacManEvent('COLLISION_WITH_GHOST');
    simulateFrames(1);

    // Assert
    expect(getPacMan().screenCoordinates.x).toBe(20);
  });

  it('stops PacMan when he hits a wall', () => {
    // Arrange
    setPacManTileCoordinates({ x: 1, y: 1 });
    expect(getPacMan().screenCoordinates.x).toBe(20);
    useGameStore.setState((state) => {
      state.game.pacMan.direction = 'LEFT';
      state.game.pacMan.nextDirection = 'LEFT';
    });

    // Act
    simulateFrames(1);

    // Assert
    expect(getPacMan().screenCoordinates.x).toBe(20);
  });

  it('changes PacMans direction once he reachs a tile center and the way is free', () => {
    // Arrange
    useGameStore.setState((state) => {
      state.game.pacMan.screenCoordinates = { x: 22, y: 20 };
      state.game.pacMan.direction = 'LEFT';
      state.game.pacMan.nextDirection = 'DOWN';
    });

    // Act
    simulateFrames(1);

    // Assert
    expect(getPacMan().screenCoordinates.x).toBe(20);
    expect(getPacMan().direction).toBe('LEFT');

    // Act
    simulateFrames(1);

    // Assert
    expect(getPacMan().direction).toBe('DOWN');
    expect(getPacMan().screenCoordinates.x).toBe(20);
    expect(getPacMan().screenCoordinates.y).toBe(22);
  });

  it('lets pac man eat basic pills', () => {
    // Arrange
    const BASIC_PILL_TILE = { x: 9, y: 20 };

    setPacManTileCoordinates(BASIC_PILL_TILE);
    useGameStore.setState((state) => {
      state.game.pacMan.direction = 'DOWN';
      state.game.pacMan.nextDirection = 'DOWN';
    });

    expect(getGame().maze.pills[BASIC_PILL_TILE.y][BASIC_PILL_TILE.x]).toBe(BASIC_PILL_ID);
    expect(getGame().score).toBe(0);

    // Act
    simulateFrames(1);

    // Assert
    expect(getGame().score).toBe(BASIC_PILL_POINTS);
    expect(getPacMan().screenCoordinates).toEqual(screenFromTile(BASIC_PILL_TILE));
    expect(getGame().maze.pills[BASIC_PILL_TILE.y][BASIC_PILL_TILE.x]).toBe(EMPTY_TILE_ID);
  });

  it('lets pac man die from meeting a ghost', () => {
    // Arrange
    const GHOST_TX = 1;
    const GHOST_TY = 1;

    setGhostTileCoordinates(0, { x: GHOST_TX, y: GHOST_TY });
    useGameStore.setState((state) => {
      state.game.ghosts[0].ghostPaused = true;
    });
    setPacManTileCoordinates({ x: GHOST_TX, y: GHOST_TY + 1 });
    useGameStore.setState((state) => {
      state.game.pacMan.direction = 'UP';
      state.game.pacMan.nextDirection = 'UP';
    });

    // Act
    simulateFrames(10);

    // Assert
    expect(getPacMan().state).toBe('dead');
    expect(getTimeSinceDeath() > 0).toBeTruthy();
  });

  it('animates pac mans death', () => {
    // Arrange
    setPacManTileCoordinates({ x: 1, y: 1 });
    useGameStore.setState((state) => {
      state.game.pacMan.direction = 'UP';
      state.game.pacMan.nextDirection = 'UP';
    });
    killPacMan();

    expect(getPacManDyingPhase(getTimeSinceDeath())).toBe(0);

    simulateFrame();

    expect(getPacManDyingPhase(getTimeSinceDeath())).toBe(0);

    // Act
    expect(getTimestamp()).toBe(TYPICAL_FRAME_LENGTH);
    simulateTime(PacManDyingPhaseLength - TYPICAL_FRAME_LENGTH);

    expect(getTimestamp()).toBe(PacManDyingPhaseLength);

    // Assert
    expect(getPacManDyingPhase(getTimeSinceDeath())).toBe(1);

    // Act
    simulateTime(PacManDyingPhaseLength);

    // Assert
    expect(getPacManDyingPhase(getTimeSinceDeath())).toBe(2);
  });

  describe('with some lives left', () => {
    it('revives pac man after his death', () => {
      // Arrange
      useGameStore.setState((state) => {
        state.game.timestamp = 1;
        state.game.pacMan.extraLivesLeft = 2;
      });
      setPacManTileCoordinates({ x: 1, y: 1 });
      useGameStore.setState((state) => {
        state.game.pacMan.direction = 'UP';
        state.game.pacMan.nextDirection = 'UP';
      });
      killPacMan();

      // Act
      simulateTime(DELAY_TO_REVIVE_PAC_MAN);

      // Assert
      expect(getPacMan().state).not.toBe('dead');
      expect(getPacMan().state).toBe('eating');
      expect(getPacMan().diedAtTimestamp).toBe(-1);
      expect(getGame().ghosts[0].ghostPaused).toBeFalsy();
      expect(getGame().ghosts[1].ghostPaused).toBeFalsy();
      expect(getPacMan().extraLivesLeft).toBe(1);
    });
  });

  describe('with all lives lost', () => {
    it('hides pac man and the ghosts and shows game over', () => {
      // Arrange
      useGameStore.setState((state) => {
        state.game.timestamp = 1;
        state.game.pacMan.extraLivesLeft = 0;
      });
      setPacManTileCoordinates({ x: 1, y: 1 });
      useGameStore.setState((state) => {
        state.game.pacMan.direction = 'UP';
        state.game.pacMan.nextDirection = 'UP';
      });

      // Act
      killPacMan();
      simulateFrames(TYPICAL_FRAME_LENGTH + DELAY_TO_REVIVE_PAC_MAN);

      // Assert
      expect(getPacMan().state).toBe('dead');
      expect(isGameOver()).toBeTruthy();
    });
  });
});

const killPacMan = () => {
  ghostCollidesWithPacMan(0);
  expect(getPacMan().state).toBe('dead');
};
