import { Ghost } from './Ghost';
import { DIRECTION_TO_OPPOSITE_DIRECTION } from './Ways';

export const changeDirectionToOpposite = (ghost: Ghost) => {
  ghost.direction = DIRECTION_TO_OPPOSITE_DIRECTION[ghost.direction];
};
