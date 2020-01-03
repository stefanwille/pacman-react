😍## Keyboard / Change Direction

😍### Advance through tile centers

Make sure that we always advance through tile centers. That means we must always

- advance by a fixed divisor of TILE_SIZE
  For TILE_SIZE=20 we can advance by 1,2,4,5 or 10.

😍## Flexible speed

To achieve different speeds, we can advance e.g. by 2 pixels every n milliseconds.

=> But I will only implement it once simply advancing by tick becomes a problem.

😍## PacMac Movement

- If PacMan arrived in a tile center:
  - check if next tile is free. If true:
    - Move PacMan in his vx/vy.
  - check if keyPressedDirection != direction and way is free in keyPressedDirection. If yes:
    - direction = keyPressedDirection
    - derive vx/vy
- else:
  - Move PacMan in his vx/vy.

## Teleportation

- Check in TileEd if there is a blocker
- If x > MAX_X. If yes: x -= 30 \* TILE_SIZE
- I x < 0: x += 30 \* TILE_SIZE

## Random ghost movement

- Everytime a ghost hits a wall, choose the 3 remaining new directions and select a random one, until the way is free.

## Eat pills

- Have an array with pills and energizer
- Collision detection: check for the surrounding 4 tiles if there is a pill. If yes, perform collision detection.
- If collision: clear that pill and increase the score
