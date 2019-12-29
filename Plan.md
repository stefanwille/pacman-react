## Keyboard / Change Direction

### Advance through tile centers

Make sure that we always advance through tile centers. That means we must always

- advance by a fixed divisor of TILE_SIZE
  For TILE_SIZE=16 we can advance by 1,2,4,8 or 16.

## Flexible speed

To achieve different speeds, we can advance e.g. by 2 pixels every n milliseconds.

=> But I will only implement it once simply advancing by tick becomes a problem.
