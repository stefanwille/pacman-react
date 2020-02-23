import { Machine, interpret } from 'xstate';

interface GhostEventHandler {
  onDead(): void;
}

export const makeGhostStateChart = (eventHandler: GhostEventHandler) => {
  const GhostStateChart = Machine({
    id: 'ghost',
    initial: 'scatter',
    context: {
      deadCount: 0,
    },
    states: {
      chase: {
        on: {
          ENERGIZER_EATEN: 'frightened',
          PHASE_END: 'scatter',
          COLLISION_WITH_PAC_MAN: 'scatter',
        },
      },
      scatter: {
        on: {
          ENERGIZER_EATEN: 'frightened',
          PHASE_END: 'chase',
          COLLISION_WITH_PAC_MAN: 'scatter',
        },
      },
      frightened: {
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

  const stateChart = interpret(GhostStateChart);
  return stateChart;
};
