import { interpret } from 'xstate';
import { GhostStateChart } from './GhostStateChart';

describe('GhostStateChart', () => {
  const ghostStateChart = interpret(GhostStateChart);

  beforeEach(() => {
    ghostStateChart.start();
  });

  it('starts in hunting state', () => {
    expect(ghostStateChart.state.value).toBe('hunting');
  });

  it('reacts to energizer', () => {
    expect(ghostStateChart.state.value).toBe('hunting');

    ghostStateChart.send('ENERGIZER_EATEN');
    expect(ghostStateChart.state.value).toBe('scared');

    ghostStateChart.send('ENERGIZER_TIMED_OUT');
    expect(ghostStateChart.state.value).toBe('hunting');
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
