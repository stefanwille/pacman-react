import {
  rotateVectorBy180Degrees,
  multiplyVector,
  divideVector,
} from './Vector';

describe('Vector', () => {
  describe('rotateVectorBy180Degrees()', () => {
    it('works', () => {
      expect(rotateVectorBy180Degrees({ x: 2, y: -11 })).toEqual({
        x: -2,
        y: 11,
      });
    });
  });

  describe('multiplyVector()', () => {
    it('works', () => {
      expect(multiplyVector(3, { x: 2, y: -11 })).toEqual({
        x: 6,
        y: -33,
      });
    });
  });

  describe('divideVector()', () => {
    it('works', () => {
      expect(divideVector({ x: 2, y: -12 }, 2)).toEqual({
        x: 1,
        y: -6,
      });
    });
  });
});
