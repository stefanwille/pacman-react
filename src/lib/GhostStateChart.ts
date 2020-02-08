import { Machine } from 'xstate';

export const GhostStateChart = Machine({
  id: 'ghost',
  initial: 'chase',
  context: {
    deadCount: 0,
  },
  states: {
    chase: {
      on: {
        ENERGIZER_EATEN: 'scared',
        PHASE_TIMED_OUT: 'scatter',
        COLLISION_WITH_PAC_MAN: 'scatter',
      },
    },
    scatter: {
      on: {
        ENERGIZER_EATEN: 'scared',
        PHASE_TIMED_OUT: 'chase',
        COLLISION_WITH_PAC_MAN: 'chase',
      },
    },
    scared: {
      on: {
        ENERGIZER_TIMED_OUT: 'chase',
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
        REVIVED: 'chase',
      },
    },
  },
});
