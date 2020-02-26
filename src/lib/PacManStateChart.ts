import { Machine, interpret } from 'xstate';

export const INITIAL_PACMAN_STATE = 'eating';

interface EventHandler {
  onDead(): void;
}

type PacManContext = {};

interface PacManStateSchema {
  states: {
    eating: {};
    hunting: {};
    dead: {};
  };
}

export type PacManEventType =
  | 'ENERGIZER_EATEN'
  | 'ENERGIZER_TIMED_OUT'
  | 'COLLISION_WITH_GHOST'
  | 'REVIVED';

type PacManEvent = { type: PacManEventType };

const PacManStateChart = Machine<PacManContext, PacManStateSchema, PacManEvent>(
  {
    id: 'pac-man',
    initial: INITIAL_PACMAN_STATE,
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
        entry: 'onDead',
        on: {
          REVIVED: 'eating',
        },
      },
    },
  }
);

export const makePacManStateChart = (eventHandler: EventHandler) => {
  const extended = PacManStateChart.withConfig({
    actions: {
      onDead: eventHandler.onDead,
    },
  });
  const stateChart = interpret(extended);
  return stateChart;
};
