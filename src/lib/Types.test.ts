import { SPEED } from './Types';
import { TILE_SIZE } from './Coordinates';

describe('Types', () => {
  describe('SPEED', () => {
    it('must be a divisor of TILE_SIZE. Otherwise our movement logic breaks', () => {
      expect(TILE_SIZE % SPEED).toBe(0);
    });
  });
});
