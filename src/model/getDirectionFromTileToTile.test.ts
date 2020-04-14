import { getDirectionFromTileToTile } from './getDirectionFromTileToTile';

describe('getDirectionFromTileToTile()', () => {
  it('returns the direction in which the neighbour tile is', () => {
    expect(getDirectionFromTileToTile({ x: 1, y: 1 }, { x: 2, y: 1 })).toEqual(
      'RIGHT'
    );
    expect(getDirectionFromTileToTile({ x: 2, y: 1 }, { x: 1, y: 1 })).toEqual(
      'LEFT'
    );
    expect(getDirectionFromTileToTile({ x: 1, y: 1 }, { x: 1, y: 2 })).toEqual(
      'DOWN'
    );
    expect(getDirectionFromTileToTile({ x: 1, y: 2 }, { x: 1, y: 1 })).toEqual(
      'UP'
    );
  });

  it('handles the tunnel', () => {
    expect(
      getDirectionFromTileToTile({ x: 27, y: 14 }, { x: 0, y: 14 })
    ).toEqual('RIGHT');
    expect(
      getDirectionFromTileToTile({ x: 0, y: 14 }, { x: 27, y: 14 })
    ).toEqual('LEFT');
  });
});
