import { TileCoordinates } from './Coordinates';
import {
  chooseNewTargetTile,
  chooseGhost2IntermediateTile,
  TILE_FOR_RETURNING_TO_BOX,
  SCATTER_TILE_FOR_GHOST_0,
  GhostTargetingContext,
} from './chooseNewTargetTile';

const TILE_OUTSIDE_THE_BOX: TileCoordinates = { x: 13, y: 11 };

const createContext = (overrides: Partial<{
  ghostState: 'scatter' | 'chase' | 'frightened' | 'dead';
  ghostNumber: number;
  ghostTileCoordinates: TileCoordinates;
  ghostDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  isInsideBoxWalls: boolean;
  pacManTileCoordinates: TileCoordinates;
  pacManDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  blinkyTileCoordinates: TileCoordinates;
}> = {}): GhostTargetingContext => ({
  ghost: {
    state: overrides.ghostState ?? 'scatter',
    ghostNumber: overrides.ghostNumber ?? 0,
    tileCoordinates: overrides.ghostTileCoordinates ?? TILE_OUTSIDE_THE_BOX,
    direction: overrides.ghostDirection ?? 'LEFT',
    isInsideBoxWalls: overrides.isInsideBoxWalls ?? false,
  },
  pacMan: {
    tileCoordinates: overrides.pacManTileCoordinates ?? { x: 1, y: 1 },
    direction: overrides.pacManDirection ?? 'LEFT',
  },
  blinkyTileCoordinates: overrides.blinkyTileCoordinates ?? { x: 1, y: 1 },
});

describe('chooseNewTargetTile', () => {
  describe('chooseNewTargetTile()', () => {
    describe('in scatter state', () => {
      it('returns the ghosts scatter tile', () => {
        const ctx = createContext({
          ghostState: 'scatter',
          ghostNumber: 0,
          ghostTileCoordinates: TILE_OUTSIDE_THE_BOX,
        });
        const tile: TileCoordinates = chooseNewTargetTile(ctx);
        expect(tile).toEqual(SCATTER_TILE_FOR_GHOST_0);
      });
    });

    describe('in chase state', () => {
      describe('for Blinky (0)', () => {
        it('returns pac mans tile', () => {
          const ctx = createContext({
            ghostState: 'chase',
            ghostNumber: 0,
            ghostTileCoordinates: TILE_OUTSIDE_THE_BOX,
            pacManTileCoordinates: { x: 1, y: 1 },
          });
          const tile: TileCoordinates = chooseNewTargetTile(ctx);
          expect(tile).toEqual({ x: 1, y: 1 });
        });
      });

      describe('for Pinky (1)', () => {
        it('returns the tile 4 ahead of pac man', () => {
          const ctx = createContext({
            ghostState: 'chase',
            ghostNumber: 1,
            ghostTileCoordinates: TILE_OUTSIDE_THE_BOX,
            pacManTileCoordinates: { x: 1, y: 1 },
            pacManDirection: 'RIGHT',
          });
          const tile: TileCoordinates = chooseNewTargetTile(ctx);
          expect(tile).toEqual({ x: 5, y: 1 });
        });

        describe('when pac man faces up', () => {
          it('returns the tile 4 ahead and to the left of pac man', () => {
            const ctx = createContext({
              ghostState: 'chase',
              ghostNumber: 1,
              ghostTileCoordinates: TILE_OUTSIDE_THE_BOX,
              pacManTileCoordinates: { x: 6, y: 5 },
              pacManDirection: 'UP',
            });
            const tile: TileCoordinates = chooseNewTargetTile(ctx);
            expect(tile).toEqual({ x: 2, y: 1 });
          });
        });
      });

      describe('for Inky (2)', () => {
        it('returns the tile based on blinky position', () => {
          const ctx = createContext({
            ghostState: 'chase',
            ghostNumber: 2,
            ghostTileCoordinates: TILE_OUTSIDE_THE_BOX,
            pacManTileCoordinates: { x: 6, y: 5 },
            pacManDirection: 'DOWN',
            blinkyTileCoordinates: { x: 6, y: 1 },
          });

          expect(chooseGhost2IntermediateTile(ctx)).toEqual({ x: 6, y: 7 });

          const tile: TileCoordinates = chooseNewTargetTile(ctx);
          expect(tile).toEqual({ x: 6, y: 13 });
        });
      });

      describe('for Clyde (3)', () => {
        describe('when pac man is >= 8 tiles away', () => {
          it('returns pac mans tile', () => {
            const ctx = createContext({
              ghostState: 'chase',
              ghostNumber: 3,
              ghostTileCoordinates: { x: 21, y: 20 },
              pacManTileCoordinates: { x: 6, y: 5 },
            });
            const tile: TileCoordinates = chooseNewTargetTile(ctx);
            expect(tile).toEqual({ x: 6, y: 5 });
          });
        });

        describe('when pac man is < 8 tiles away', () => {
          it('returns clydes scatter tile', () => {
            const ctx = createContext({
              ghostState: 'chase',
              ghostNumber: 3,
              ghostTileCoordinates: { x: 1, y: 8 },
              pacManTileCoordinates: { x: 6, y: 5 },
            });
            const tile: TileCoordinates = chooseNewTargetTile(ctx);
            expect(tile).toEqual({ x: 1, y: 29 });
          });
        });
      });
    });

    describe('in frightened state', () => {
      it('returns a random direction that is not backward and not in to a wall', () => {
        const ctx = createContext({
          ghostState: 'frightened',
          ghostNumber: 0,
          ghostTileCoordinates: { x: 1, y: 1 },
          ghostDirection: 'DOWN',
        });

        const tile: TileCoordinates = chooseNewTargetTile(ctx);

        expect(tile).toEqual({ x: 2, y: 1 });
      });
    });

    describe('in dead state', () => {
      it('returns a tile inside the box', () => {
        const ctx = createContext({
          ghostState: 'dead',
          ghostNumber: 0,
          ghostTileCoordinates: TILE_OUTSIDE_THE_BOX,
          ghostDirection: 'LEFT',
        });

        const tile: TileCoordinates = chooseNewTargetTile(ctx);

        expect(tile).toEqual(TILE_FOR_RETURNING_TO_BOX);
      });
    });
  });
});
