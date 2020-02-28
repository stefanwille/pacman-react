import { screenFromTile } from './Coordinates';
import { BASIC_PILL_POINTS, ghostCollidesWithPacMan } from './detectCollisions';
import { Game } from './Game';
import { Ghost } from './Ghost';
import { BASIC_PILL_ID, EMPTY_TILE_ID } from './MazeData';
import { DYING_PAC_PHASE_LENGTH } from './PacMan';
import {
  simulateFrames,
  simulateTimeElapsed,
  FRAME_LENGTH,
} from './simulateFrames';
import { DELAY_TO_REVIVE_PAC_MAN } from './updatePacMan';
import { SPEED } from './Types';

describe('updatePacMan()', () => {
  it('advances PacMans position', () => {
    // Arrange
    const game = new Game();
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    game.pacMan.direction = 'RIGHT';
    game.pacMan.nextDirection = 'RIGHT';

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(30 + SPEED);

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(30 + 2 * SPEED);
  });

  it('stops pac man once he is dead', () => {
    // Arrange
    const game = new Game();
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    game.pacMan.direction = 'RIGHT';
    game.pacMan.nextDirection = 'RIGHT';

    // Act
    game.pacMan.send('COLLISION_WITH_GHOST');
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(30);
  });

  it('stops PacMan when he hits a wall', () => {
    // Arrange
    const game = new Game();
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    game.pacMan.direction = 'LEFT';
    game.pacMan.nextDirection = 'LEFT';

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(30);
  });

  it('changes PacMans direction once he reachs a tile center and the the way is free', () => {
    // Arrange
    const game = new Game();
    game.pacMan.setScreenCoordinates({ x: 32, y: 30 });
    game.pacMan.direction = 'LEFT';
    game.pacMan.nextDirection = 'DOWN';

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    expect(game.pacMan.direction).toBe('LEFT');

    // Act
    simulateFrames(1, game);

    // Assert
    expect(game.pacMan.direction).toBe('DOWN');

    expect(game.pacMan.screenCoordinates.x).toBe(30);
    expect(game.pacMan.screenCoordinates.y).toBe(32);
  });

  it('lets pac man eat basic pills', () => {
    // Arrange
    const BASIC_PILL_TILE = { x: 9, y: 20 };

    const game = new Game();
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

    const game = new Game();
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
    const game = new Game();
    game.timestamp = 1;
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    game.pacMan.direction = 'UP';
    game.pacMan.nextDirection = 'UP';
    game.pacMan.stateChart.state.value = 'dead';
    game.pacMan.diedAtTimestamp = 1;

    expect(game.pacMan.dyingPhase).toBe(0);

    expect(game.timestamp).toBe(1);

    // Act
    simulateTimeElapsed(DYING_PAC_PHASE_LENGTH, game);

    expect(game.timestamp).toBe(201);

    // Assert
    expect(game.pacMan.dyingPhase).toBe(1);

    // Act
    simulateTimeElapsed(DYING_PAC_PHASE_LENGTH, game);

    // Assert
    expect(game.pacMan.dyingPhase).toBe(2);
  });

  describe('with some lives left', () => {
    it('revives pac man after his death', () => {
      // Arrange
      const game = new Game();
      game.timestamp = 1;
      game.pacMan.setTileCoordinates({ x: 1, y: 1 });
      game.pacMan.direction = 'UP';
      game.pacMan.nextDirection = 'UP';
      game.pacMan.extraLivesLeft = 2;
      ghostCollidesWithPacMan(game);
      expect(game.pacMan.state).toBe('dead');

      // Act
      simulateTimeElapsed(DELAY_TO_REVIVE_PAC_MAN, game);

      // Assert
      expect(game.pacMan.state).not.toBe('dead');
      expect(game.pacMan.state).toBe('eating');
      expect(game.pacMan.diedAtTimestamp).toBe(0);
      expect(game.ghosts[0].ghostPaused).toBeFalsy();
      expect(game.ghosts[1].ghostPaused).toBeFalsy();
      expect(game.pacMan.extraLivesLeft).toBe(1);
    });
  });

  describe('with all lives lost', () => {
    it('hides pac man and the ghosts and shows game over', () => {
      // Arrange
      const game = new Game();
      game.timestamp = 1;
      game.pacMan.setTileCoordinates({ x: 1, y: 1 });
      game.pacMan.direction = 'UP';
      game.pacMan.nextDirection = 'UP';
      game.pacMan.extraLivesLeft = 0;

      // Act
      ghostCollidesWithPacMan(game);
      expect(game.pacMan.state).toBe('dead');
      // TODO: Use simulateTime instead
      simulateFrames(1 + DELAY_TO_REVIVE_PAC_MAN / FRAME_LENGTH, game);

      // Assert
      expect(game.pacMan.state).toBe('dead');
      expect(game.ghosts.every(ghost => ghost.ghostPaused)).toBeTruthy();
      expect(game.ghosts[1].ghostPaused).toBeTruthy();
      expect(game.gameOver).toBeTruthy();
    });
  });
});
