import { screenFromTileCoordinate } from './Coordinates';
import { Game } from './Game';
import { Ghost } from './Ghost';
import { BASIC_PILL_ID, EMPTY_TILE_ID } from './MazeData';
import { onTimeElapsed } from './onTimeElapsed';
import { simulateFrames } from './simulateFrames';

const MILLISECONDS_PER_FRAME = 17;

describe('updatePacMan()', () => {
  it('advances PacMans position', () => {
    // Arrange
    const game = new Game();
    game.pacMan.setTileCoordinates({ x: 1, y: 1 });
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    game.pacMan.direction = 'RIGHT';
    game.pacMan.nextDirection = 'RIGHT';

    // Act
    onTimeElapsed({ game, timestamp: 1 });

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(32);

    // Act
    onTimeElapsed({ game, timestamp: 2 });

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(34);
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
    onTimeElapsed({ game, timestamp: 1 });

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
    onTimeElapsed({ game, timestamp: 1 });

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(30);
  });

  it('changes PacMans direction once the way is free', () => {
    // Arrange
    const game = new Game();
    game.pacMan.setScreenCoordinates({ x: 32, y: 30 });
    game.pacMan.direction = 'LEFT';
    game.pacMan.nextDirection = 'DOWN';

    // Act
    onTimeElapsed({ game, timestamp: 1 });

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    expect(game.pacMan.direction).toBe('LEFT');

    // Act
    onTimeElapsed({ game, timestamp: 2 });

    // Assert
    expect(game.pacMan.direction).toBe('DOWN');
    expect(game.pacMan.screenCoordinates.x).toBe(30);
    expect(game.pacMan.screenCoordinates.y).toBe(32);
  });

  it('lets pac man eat basic pills', () => {
    // Arrange
    const BASIC_PILL_TX = 9;
    const BASIC_PILL_TY = 20;

    const game = new Game();
    game.pacMan.setTileCoordinates({
      x: BASIC_PILL_TX,
      y: BASIC_PILL_TY - 1,
    });
    game.pacMan.direction = 'DOWN';
    game.pacMan.nextDirection = 'DOWN';

    expect(game.maze.pills[BASIC_PILL_TY][BASIC_PILL_TX]).toBe(BASIC_PILL_ID);

    // Act
    simulateFrames(10, game);

    // Assert
    expect(game.pacMan.screenCoordinates.x).toBe(
      screenFromTileCoordinate(BASIC_PILL_TX)
    );
    expect(game.pacMan.screenCoordinates.y).toBe(
      screenFromTileCoordinate(BASIC_PILL_TY)
    );

    expect(game.maze.pills[BASIC_PILL_TY][BASIC_PILL_TX]).toBe(EMPTY_TILE_ID);

    expect(game.score).toBe(10);
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
    expect(game.pacMan.timePassedSinceDeath > 0).toBeTruthy();
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

    // Act
    simulateFrames(300 / MILLISECONDS_PER_FRAME, game);

    // Assert
    expect(game.pacMan.dyingPhase).toBe(1);

    // Act
    simulateFrames(600 / MILLISECONDS_PER_FRAME, game);

    // Assert
    expect(game.pacMan.dyingPhase).toBe(2);
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

    // Act
    simulateFrames(300 / MILLISECONDS_PER_FRAME, game);

    // Assert
    expect(game.pacMan.dyingPhase).toBe(1);

    // Act
    simulateFrames(600 / MILLISECONDS_PER_FRAME, game);

    // Assert
    expect(game.pacMan.dyingPhase).toBe(2);
  });
});
