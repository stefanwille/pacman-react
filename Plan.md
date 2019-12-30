## Keyboard / Change Direction

### Advance through tile centers

Make sure that we always advance through tile centers. That means we must always

- advance by a fixed divisor of TILE_SIZE
  For TILE_SIZE=20 we can advance by 1,2,4,5 or 10.

## Flexible speed

To achieve different speeds, we can advance e.g. by 2 pixels every n milliseconds.

=> But I will only implement it once simply advancing by tick becomes a problem.

## PacMac Movement

- If PacMan arrived in a tile center:
  - check if next tile is blocked. If not:
    - Move PacMan in his vx/vy.
  - check if keyPressedDirection != direction and way is free in keyPressedDirection. If yes:
    - direction = keyPressedDirection
    - derive vx/vy
- else:
  - Move PacMan in his vx/vy.
