import { GameStore, GhostStore } from "./Store";
import { action } from "mobx";
import { PacManStore } from "./PacManStore";
import { SPEED } from "../components/Types";

export const onTimeElapsed = action(
  ({ store, timestamp }: { store: GameStore; timestamp: number }) => {
    updatePacMan({ pacManStore: store.pacMan, timestamp });
    for (const ghost of store.ghosts) {
      updateGhost({ ghostStore: ghost, timestamp });
    }
  }
);

export const updatePacMan = ({
  pacManStore,
  timestamp
}: {
  pacManStore: PacManStore;
  timestamp: number;
}) => {
  pacManStore.timestamp = timestamp;
  if (pacManStore.pressedKey) {
    if (pacManStore.direction === "LEFT") {
      pacManStore.x -= SPEED;
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
  }
};

export const updateGhost = ({
  ghostStore,
  timestamp
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
