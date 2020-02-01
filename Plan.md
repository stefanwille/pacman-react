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

## Ghost Movment

https://www.youtube.com/watch?v=ataGotQ7ir8

😍## Eat pills

✔ - Have an array with pills and energizer
✔ - Collision detection: check for the current and surrounding 4 tiles if there is a pill. If yes, perform collision detection.
✔ - If collision: clear that pill
✔ - increase the score

## Web based Game

https://www.webpacman.com/pacman-html5.php

## Player Strategies

https://www.webpacman.com/strategies.php

## Collision Detection refined

Es sieht so aus, als würde die Webversion sehr viel kleinere Hitboxes haben oder sogar Tile-basiert Detection machen.

## Speed

Normalerweise sind die Ghosts und PacMan gleich schnell.

Wenn Ghost scare: langsamer.
Wenn Ghost dead: sehr schnell kehren die Augen zum Zentrum zurück

## Pac Man stirbt

- DyingPacManSprite zeigen, dyingPacManPhase kommt aus einem Timer.
- Anzahl Leben reduzieren
- Anzahl Leben wird angezeigt
- Nach 4 Sekunden: Wiederbeleben
- Game anhalten und "Game Over" anzeigen wenn Spiel zu ende

## Points

- Basic Pill: 10
- Ghost 1: 200
- Ghost 2: 400
- Ghost 3: 800
- Ghost 4: 1600
- Cherry: 100

## Ghost psychology

https://www.webpacman.com/ghosts.php#personalities

Scatter Mode vs. Attack mode - es gibt auf der Seite eine Tabelle, die erklärt, wie sie sich abwechseln.

## Assets

Hier lassen sich Original-Assets abgucken: https://www.nintendo.de/Spiele/NES/PAC-MAN--726036.html
