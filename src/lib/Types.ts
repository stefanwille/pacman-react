import { assert } from '../util/assert';

export type PixelsPerFrame = number;

export type Direction = 'UP' | 'DOWN' | 'RIGHT' | 'LEFT';

export const Directions: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

export type MilliSeconds = number;

export const assertValidDirection = (direction: Direction) => {
  assert(Directions.includes(direction), `Bad direction ${direction}`);
};
