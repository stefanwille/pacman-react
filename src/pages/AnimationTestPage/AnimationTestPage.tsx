import React, { useEffect, useState, useCallback } from "react";
import { Ghost } from "../../components/Ghost";
import { observer } from "mobx-react-lite";
import { Sprite } from "../../components/Sprite";
import { GameStore, GhostStore } from "../../lib/Store";
import { PacMan } from "../../components/PacMac";

export const AnimationTestPage: React.FC = observer(() => {
  const [store] = useState(() => new GameStore());

  const animationStep = (timestamp: number) => {
    store.update(timestamp);
    if (store.gameRunning) {
      window.requestAnimationFrame(animationStep);
    }
  };

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    console.log("onKeyDown", event.key);
    store.pacMan.setPressedKey(event.key);
  }, []);

  const onKeyUp = useCallback(() => {
    console.log("onKeyUp");
    store.pacMan.setPressedKey("");
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  useEffect(() => {
    window.requestAnimationFrame(animationStep);
    return store.stopGame;
  }, []);
  return (
    <div>
      <Sprite className="Sprite-maze" name="maze-state-full" x={0} y={10} />

      <PacMan
        direction={store.pacMan.direction}
        phase={store.pacMan.phase}
        x={store.pacMan.x}
        y={store.pacMan.y}
      />

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
