import { screenFromTile } from './Coordinates';
import { BASIC_PILL_POINTS, ghostCollidesWithPacMan } from './detectCollisions';
import { Game, DEFAULT_SPEED } from './Game';
import { Ghost } from './Ghost';
import { BASIC_PILL_ID, EMPTY_TILE_ID } from './MazeData';
import { simulateFrames, simulateFrame, simulateTime } from './simulateFrames';
import { DELAY_TO_REVIVE_PAC_MAN } from './updatePacMan';
import { Store } from './Store';
import { TYPICAL_FRAME_LENGTH } from './updateExternalTimeStamp';
import {
  PacManDyingPhaseLength,
  getPacManDyingPhase,
} from './pacManDyingPhase';

describe('updatePacMan()', () => {
  it('advances PacMans position', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(game.pacMan.screenCoordinates.x).toBe(20);
    game.pacMan.direction = 'RIGHT';
    game.pacMan.nextDirection = 'RIGHT';

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(20 + DEFAULT_SPEED);

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(20 + 2 * DEFAULT_SPEED);
  });

  it('stops pac man once he is dead', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(game.pacMan.screenCoordinates.x).toBe(20);
    game.pacMan.direction = 'RIGHT';
    game.pacMan.nextDirection = 'RIGHT';

    // Act
    game.pacMan.send('COLLISION_WITH_GHOST');
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(20);
  });

  it('stops PacMan when he hits a wall', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(game.pacMan.screenCoordinates.x).toBe(20);
    game.pacMan.direction = 'LEFT';
    game.pacMan.nextDirection = 'LEFT';

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(20);
  });

  it('changes PacMans direction once he reachs a tile center and the the way is free', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    game.pacMan.screenCoordinates = { x: 22, y: 20 };
    game.pacMan.direction = 'LEFT';
    game.pacMan.nextDirection = 'DOWN';

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(20);
    expect(game.pacMan.screenCoordinates.x).toBe(20);
    expect(game.pacMan.direction).toBe('LEFT');

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.direction).toBe('DOWN');

    expect(game.pacMan.screenCoordinates.x).toBe(20);
    expect(game.pacMan.screenCoordinates.y).toBe(22);
  });

  it('lets pac man eat basic pills', () => {
    // Arrange
    const BASIC_PILL_TILE = { x: 9, y: 20 };

    const store = new Store();
    const game = new Game(store);
    game.pacMan.setTileCoordinates(BASIC_PILL_TILE);
    game.pacMan.direction = 'DOWN';
    game.pacMan.nextDirection = 'DOWN';

    expect(game.maze.pills[BASIC_PILL_TILE.y][BASIC_PILL_TILE.x]).toBe(
      BASIC_PILL_ID
    );

    expect(game.score).toBe(0);

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.score).toBe(BASIC_PILL_POINTS);
    expect(game.pacMan.screenCoordinates).toEqual(
      screenFromTile(BASIC_PILL_TILE)
    );

    expect(game.maze.pills[BASIC_PILL_TILE.y][BASIC_PILL_TILE.x]).toBe(
      EMPTY_TILE_ID
    );
  });

  it('lets pac man die from meeting a ghost', () => {
    // Arrange
    const GHOST_TX = 1;
    const GHOST_TY = 1;

    const store = new Store();
    const game = new Game(store);
    const ghost: Ghost = game.ghosts[0];
    ghost.setTileCoordinates({ x: GHOST_TX, y: GHOST_TY });
    ghost.ghostPaused = true;
    game.pacMan.setTileCoordinates({ x: GHOST_TX, y: GHOST_TY + 1 });
    game.pacMan.direction = 'UP';
    game.pacMan.nextDirection = 'UP';

    // Act
    simulateFrames(10, game);

    // Assert
    expect(game.pacMan.state).toBe('dead');
    expect(game.pacMan.timeSinceDeath > 0).toBeTruthy();
  });

  it('animates pac mans death', () => {
    // Arrange
    const store = new Store();
    const game = new Game(store);
    const { pacMan } = game;
    pacMan.setTileCoordinates({ x: 1, y: 1 });
    pacMan.direction = 'UP';
    pacMan.nextDirection = 'UP';
    killPacMan(game);

    expect(getPacManDyingPhase(pacMan)).toBe(0);

    simulateFrame(game);

    expect(getPacManDyingPhase(pacMan)).toBe(0);

    // Act
    expect(game.timestamp).toBe(TYPICAL_FRAME_LENGTH);
    simulateTime(game, PacManDyingPhaseLength - TYPICAL_FRAME_LENGTH);

    expect(game.timestamp).toBe(PacManDyingPhaseLength);

    // Assert
    expect(getPacManDyingPhase(pacMan)).toBe(1);

    // Act
    simulateTime(game, PacManDyingPhaseLength);

    // Assert
    expect(getPacManDyingPhase(pacMan)).toBe(2);
  });

  describe('with some lives left', () => {
    it('revives pac man after his death', () => {
      // Arrange
      const store = new Store();
      const game = new Game(store);
      game.timestamp = 1;
      game.pacMan.setTileCoordinates({ x: 1, y: 1 });
      game.pacMan.direction = 'UP';
      game.pacMan.nextDirection = 'UP';
      game.pacMan.extraLivesLeft = 2;
      killPacMan(game);

      // Act
      simulateTime(game, DELAY_TO_REVIVE_PAC_MAN);

      // Assert
      expect(game.pacMan.state).not.toBe('dead');
      expect(game.pacMan.state).toBe('eating');
      expect(game.pacMan.diedAtTimestamp).toBe(-1);
      expect(game.ghosts[0].ghostPaused).toBeFalsy();
      expect(game.ghosts[1].ghostPaused).toBeFalsy();
      expect(game.pacMan.extraLivesLeft).toBe(1);
    });
  });

  describe('with all lives lost', () => {
    it('hides pac man and the ghosts and shows game over', () => {
      // Arrange
      const store = new Store();
      const game = new Game(store);
      game.timestamp = 1;
      game.pacMan.setTileCoordinates({ x: 1, y: 1 });
      game.pacMan.direction = 'UP';
      game.pacMan.nextDirection = 'UP';
      game.pacMan.extraLivesLeft = 0;

      // Act
      killPacMan(game);
      simulateFrames(TYPICAL_FRAME_LENGTH + DELAY_TO_REVIVE_PAC_MAN, game);

      // Assert
      expect(game.pacMan.state).toBe('dead');
      expect(game.gameOver).toBeTruthy();
    });
  });
});

const killPacMan = (game: Game) => {
  ghostCollidesWithPacMan(game.ghosts[0]);
  expect(game.pacMan.state).toBe('dead');
};
