import { Machine, interpret } from 'xstate';

interface GhostEventHandler {
  onDead(): void;
  onScatterToChase(): void;
  onChaseToScatter(): void;
}

export const makeGhostStateChart = (eventHandler: GhostEventHandler) => {
  const GhostStateChart = Machine({
    id: 'ghost',
    initial: 'scatter',
    context: {},
    states: {
      chase: {
        on: {
          ENERGIZER_EATEN: 'frightened',
          PHASE_END: {
            target: 'scatter',
            actions: context => {
              eventHandler.onChaseToScatter();
            },
          },
          COLLISION_WITH_PAC_MAN: 'scatter',
        },
      },
      scatter: {
        on: {
          ENERGIZER_EATEN: 'frightened',
          PHASE_END: {
            target: 'chase',
            actions: context => {
              eventHandler.onScatterToChase();
            },
          },
          COLLISION_WITH_PAC_MAN: 'scatter',
        },
      },
      frightened: {
        on: {
          ENERGIZER_TIMED_OUT: 'chase',
          COLLISION_WITH_PAC_MAN: {
            target: 'dead',
            actions: context => {
              eventHandler.onDead();
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
