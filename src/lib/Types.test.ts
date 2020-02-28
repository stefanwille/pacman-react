import { SPEED } from './Types';
import { SCREEN_TILE_SIZE } from './Coordinates';

describe('Types', () => {
  describe('SPEED', () => {
    it('must be a divisor of TILE_SIZE. Otherwise our movement logic breaks', () => {
      expect(SCREEN_TILE_SIZE % SPEED).toBe(0);
    });
  });
});
