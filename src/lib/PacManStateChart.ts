import { Machine, interpret } from 'xstate';

interface EventHandler {
  onDead(): void;
}

export const makePacManStateChart = (eventHandler: EventHandler) => {
  const PacManStateChart = Machine({
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
        entry: () => {
          eventHandler.onDead();
        },
        on: {
          REVIVED: 'eating',
        },
      },
    },
  });

  const stateChart = interpret(PacManStateChart);
  return stateChart;
};
