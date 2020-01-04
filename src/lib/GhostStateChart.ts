import { Machine } from 'xstate';

export const GhostStateChart = Machine({
  id: 'ghost',
  initial: 'hunting',
  context: {
    deadCount: 0,
  },
  states: {
    hunting: {
      on: {
        ENERGIZER_EATEN: 'scared',
        COLLISION_WITH_PAC_MAN: 'hunting',
      },
    },
    scared: {
      on: {
        ENERGIZER_TIMED_OUT: 'hunting',
        COLLISION_WITH_PAC_MAN: {
          target: 'dead',
          actions: context => {
            context.deadCount++;
          },
        },
      },
    },
    dead: {
      on: {
        REVIVED: 'hunting',
      },
    },
  },
});
