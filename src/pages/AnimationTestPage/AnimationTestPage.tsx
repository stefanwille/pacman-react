import React, { useEffect } from "react";
import { Ghost } from "../../components/Ghost";
import { observer } from "mobx-react-lite";
import { Sprite } from "../../components/Sprite";
import { GameStore, GhostStore } from "../../lib/Store";

const store = new GameStore();

export const AnimationTestPage: React.FC = observer(() => {
  const animationStep = (timestamp: number) => {
    store.update(timestamp);
    if (store.gameRunning) {
      window.requestAnimationFrame(animationStep);
    }
  };

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return store.stopGame;
  }, []);
  return (
    <div>
      <Sprite className="Sprite-maze" name="maze-state-full" x={0} y={10} />

      {store.ghosts.map((ghost: GhostStore, index: number) => (
        <Ghost
          key={index}
          direction={ghost.direction}
          phase={ghost.phase}
          x={ghost.x}
          y={ghost.y}
          ghostNumber={ghost.ghostNumber}
        />
      ))}
    </div>
  );
});
