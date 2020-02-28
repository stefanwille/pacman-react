import { SCREEN_TILE_SIZE } from './Coordinates';
import { DEFAULT_SPEED } from './Game';

describe('Game', () => {
  describe('DEFAULT_SPEED', () => {
    it('DEFAULT_SPEED must be a divisor of SCREEN_TILE_SIZE. Otherwise our logic breaks.', () => {
      expect(SCREEN_TILE_SIZE % DEFAULT_SPEED).toBe(0);
    });
  });
});
