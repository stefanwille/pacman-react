import { Machine, interpret } from 'xstate';

interface GhostEventHandler {
  onDead(): void;
  onScatterToChase(): void;
  onChaseToScatter(): void;
}

const GhostStateChart = Machine({
  id: 'ghost',
  initial: 'scatter',
  states: {
    chase: {
      on: {
        ENERGIZER_EATEN: 'frightened',
        PHASE_END: {
          target: 'scatter',
          actions: 'onChaseToScatter',
        },
        COLLISION_WITH_PAC_MAN: 'scatter',
      },
    },
    scatter: {
      on: {
        ENERGIZER_EATEN: 'frightened',
        PHASE_END: {
          target: 'chase',
          actions: 'onScatterToChase',
        },
        COLLISION_WITH_PAC_MAN: 'scatter',
      },
    },
    frightened: {
      on: {
        ENERGIZER_TIMED_OUT: 'chase',
        COLLISION_WITH_PAC_MAN: {
          target: 'dead',
          actions: 'onDead',
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

export const makeGhostStateChart = (eventHandler: GhostEventHandler) => {
  const extended = GhostStateChart.withConfig({
    actions: {
      onDead: () => {
        eventHandler.onDead();
      },
      onScatterToChase: () => {
        eventHandler.onScatterToChase();
      },
      onChaseToScatter: () => {
        eventHandler.onChaseToScatter();
      },
    },
  });
  const stateChart = interpret(extended);
  return stateChart;
};
