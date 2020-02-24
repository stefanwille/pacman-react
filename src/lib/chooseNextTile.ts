import { TileCoordinates } from './Coordinates';
import { Direction, Directions } from './Types';
import { getNextTile } from './Ways';

interface CandidateTile {
  neighbourTile: TileCoordinates;
  distanceToTarget: number;
}

export const chooseNextTile = ({
  currentTile,
  currentDirection,
  targetTile,
}: {
  currentTile: TileCoordinates;
  currentDirection: Direction;
  targetTile: TileCoordinates;
}): TileCoordinates => {
  const candidates = [] as CandidateTile[];
  for (const direction of Directions) {
    // Prevent the ghost from going backwards
    // if (firstStep && isBackwardDirection(direction, currentDirection)) {
    //   continue;
    // }
    const neighbourTile = getNextTile(currentTile, direction);
    // if (!isValidTileCoordinates(next)) {
    //   continue;
    // }
    const distanceToTarget = getTileDistance(neighbourTile, targetTile);
    candidates.push({ neighbourTile, distanceToTarget });
  }

  return { x: 2, y: 1 };
};

// for (const direction of Directions) {
//   // Prevent the ghost from going backwards
//   if (firstStep && isBackwardDirection(direction, currentDirection)) {
//     continue;
//   }
//   const next = getNextTile(current, direction);
//   if (!isValidTileCoordinates(next)) {
//     continue;
//   }

//   // Is this way free?
//   if (!isWayFreeAt(next)) {
//     continue;
//   }
//   // Has another way arrived at these coordinate before?
//   if (comesFrom[next.y][next.x]) {
//     continue;
//   }

//   // Extend the frontier with this candidate
//   frontier.push(next);
//   // and track where it came from
//   comesFrom[next.y][next.x] = current;
// }

// firstStep = false;
// }

export const getTileDistance = (
  neighbourTile: TileCoordinates,
  targetTile: TileCoordinates
) => {
  const dx = Math.abs(neighbourTile.x - targetTile.x);
  const dy = Math.abs(neighbourTile.y - targetTile.y);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};
