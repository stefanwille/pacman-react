import { PacMan } from './PacMan';
import { Coordinates } from './Coordinates';

export const getGhostDestination = ({
  ghostNumber,
  pacMan,
}: {
  ghostNumber: number;
  pacMan: PacMan;
}): Coordinates => {
  return [0, 0];
};
