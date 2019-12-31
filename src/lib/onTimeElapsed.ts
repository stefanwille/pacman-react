import { GameStore } from "./GameStore";
import { GhostStore } from "./GhostStore";
import { action } from "mobx";
import { PacManStore } from "./PacManStore";
import { SPEED } from "../components/Types";
import { waysMatrix, WAY_FREE_ID } from "./MazeData";
import { screenFromTileCoordinate, tileFromScreen } from "./Coordinates";

export const onTimeElapsed = action(
  ({ store, timestamp }: { store: GameStore; timestamp: number }) => {
    store.previousTimestamp = store.timestamp;
    store.timestamp = timestamp;
    updatePacMan({ pacManStore: store.pacMan, timestamp });
    for (const ghost of store.ghosts) {
      updateGhost({ ghostStore: ghost, timestamp });
    }
  }
);

export const isWayFreeAt = (tx: number, ty: number): boolean => {
  return waysMatrix[ty][tx] === WAY_FREE_ID;
};

export const getPacManMinX = (currentSX: number, currentSY: number) => {
  const [tx, ty] = tileFromScreen(currentSX, currentSY);
  if (isWayFreeAt(tx, ty)) {
    return screenFromTileCoordinate(0);
  }
  // The way is blocked. Can't continue beyond current tx.
  const sx = screenFromTileCoordinate(tx);
  return sx;
};

export const updatePacMan = ({
  pacManStore,
  timestamp,
}: {
  pacManStore: PacManStore;
  timestamp: number;
}) => {
  pacManStore.timestamp = timestamp;
  if (pacManStore.direction === "LEFT") {
    pacManStore.x -= SPEED;
    const minX = getPacManMinX(pacManStore.x, pacManStore.y);
    if (pacManStore.x < minX) {
      pacManStore.x = minX;
    }
  }
  if (pacManStore.direction === "RIGHT") {
    pacManStore.x += SPEED;
  }
  if (pacManStore.direction === "UP") {
    pacManStore.y -= SPEED;
  }
  if (pacManStore.direction === "DOWN") {
    pacManStore.y += SPEED;
  }
};

export const updateGhost = ({
  ghostStore,
  timestamp,
}: {
  ghostStore: GhostStore;
  timestamp: number;
}) => {
  ghostStore.timestamp = timestamp;

  ghostStore.x += ghostStore.vx;
  if (ghostStore.x > ghostStore.maxX) {
    ghostStore.x = ghostStore.maxX;
    ghostStore.vx = -1 * ghostStore.vx;
  }
  if (ghostStore.x <= ghostStore.minX) {
    ghostStore.x = ghostStore.minX;
    ghostStore.vx = -1 * ghostStore.vx;
  }

  ghostStore.y += ghostStore.vy;
  if (ghostStore.y > ghostStore.maxY) {
    ghostStore.y = ghostStore.maxY;
    ghostStore.vy = -1 * ghostStore.vy;
  }
  if (ghostStore.y <= ghostStore.minY) {
    ghostStore.y = ghostStore.minY;
    ghostStore.vy = -1 * ghostStore.vy;
  }
};
