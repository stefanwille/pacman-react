import { Machine, interpret } from 'xstate';

const PacManStateChart = Machine({
  id: 'pac-man',
  initial: 'eating',
  context: {
    deadCount: 0,
  },
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

const pacManStateChart = interpret(PacManStateChart).start();

describe('PacManStateChart', () => {
  it('starts in eating state', () => {
    expect(pacManStateChart.state.value).toBe('eating');
  });

  it('reacts to energizer', () => {
    expect(pacManStateChart.state.value).toBe('eating');

    pacManStateChart.send('ENERGIZER_EATEN');
    expect(pacManStateChart.state.value).toBe('hunting');

    pacManStateChart.send('ENERGIZER_TIMED_OUT');
    expect(pacManStateChart.state.value).toBe('eating');
  });

  it('reacts to collision with ghost', () => {
    expect(pacManStateChart.state.value).toBe('eating');

    pacManStateChart.send('ENERGIZER_EATEN');
    expect(pacManStateChart.state.value).toBe('hunting');

    pacManStateChart.send('COLLISION_WITH_GHOST');
    expect(pacManStateChart.state.value).toBe('hunting');

    pacManStateChart.send('ENERGIZER_TIMED_OUT');
    expect(pacManStateChart.state.value).toBe('eating');

    pacManStateChart.send('COLLISION_WITH_GHOST');
    expect(pacManStateChart.state.value).toBe('dead');

    pacManStateChart.send('REVIVED');
    expect(pacManStateChart.state.value).toBe('eating');
  });
});
