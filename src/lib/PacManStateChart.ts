import { Machine } from 'xstate';

export const PacManStateChart = Machine({
  id: 'pac-man',
  initial: 'eating',
  states: {
    eating: {
      on: {
        ENERGIZER_EATEN: 'hunting',
        COLLISION_WITH_GHOST: 'dead',
      },
    },
    hunting: {
      on: {
        ENERGIZER_TIMED_OUT: 'eating',
        COLLISION_WITH_GHOST: 'hunting',
      },
    },
    dead: {
      on: {
        REVIVED: 'eating',
      },
    },
  },
});
