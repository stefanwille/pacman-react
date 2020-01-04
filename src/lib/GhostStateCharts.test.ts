import { Machine, interpret } from 'xstate';

const GhostStateChart = Machine({
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

const ghostStateChart = interpret(GhostStateChart)
  // .onTransition(state => console.log(state.value))
  .start();

describe('GhostStateChart', () => {
  it('starts in hunting state', () => {
    expect(ghostStateChart.state.value).toBe('hunting');
  });

  it('reacts to energizer', () => {
    expect(ghostStateChart.state.value).toBe('hunting');

    ghostStateChart.send('ENERGIZER_EATEN');

    expect(ghostStateChart.state.value).toBe('scared');

    ghostStateChart.send('ENERGIZER_TIMED_OUT');
  });

  it('reacts to collision with Pac Man', () => {
    expect(ghostStateChart.state.value).toBe('hunting');

    ghostStateChart.send('ENERGIZER_EATEN');
    expect(ghostStateChart.state.value).toBe('scared');

    expect(ghostStateChart.state.context.deadCount).toBe(0);

    ghostStateChart.send('COLLISION_WITH_PAC_MAN');

    expect(ghostStateChart.state.value).toBe('dead');
    expect(ghostStateChart.state.context.deadCount).toBe(1);

    ghostStateChart.send('REVIVED');

    expect(ghostStateChart.state.value).toBe('hunting');
  });
});
