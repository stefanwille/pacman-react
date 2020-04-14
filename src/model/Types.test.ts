import { SCREEN_TILE_SIZE } from './Coordinates';
import { DEFAULT_SPEED } from './Game';

describe('Types', () => {
  describe('SPEED', () => {
    it('must be a divisor of TILE_SIZE. Otherwise our movement logic breaks', () => {
      expect(SCREEN_TILE_SIZE % DEFAULT_SPEED).toBe(0);
    });
  });
});
