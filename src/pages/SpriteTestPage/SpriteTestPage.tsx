import React, { useEffect, useState } from 'react';
import {
  PacManPhase,
  PacManPhases,
  PacManSprite,
} from '../../components/PacMac';
import {
  GhostNumber,
  GhostNumbers,
  GhostPhases,
  GhostPhase,
  Ghost,
} from '../../components/Ghost';
import { Directions, Direction } from '../../components/Types';
import { Sprite } from '../../components/Sprite';

export const SpriteTestPage: React.FC = () => {
  const [phaseCounter, setPhaseCounter] = useState<number>(0);
  const [directionIndex, setDirectionIndex] = useState<number>(0);
  const pacManPhase = (phaseCounter % PacManPhases.length) as PacManPhase;
  const ghostPhase = (phaseCounter % GhostPhases.length) as GhostPhase;

  useEffect(() => {
    const timerId = setInterval(() => {
      setPhaseCounter((phaseCounter: number) => phaseCounter + 1);
    }, 300);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setDirectionIndex((directionIndex: number) =>
        directionIndex === 3 ? 0 : directionIndex + 1
      );
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const direction = Directions[directionIndex];
  return (
    <div className="Maze">
      {GhostNumbers.map((ghostNumber: GhostNumber) =>
        Directions.map((direction: Direction, directionIndex: number) =>
          GhostPhases.map((ghostPhase: GhostPhase) => (
            <Ghost
              key={ghostPhase}
              direction={direction}
              phase={ghostPhase}
              x={30 + directionIndex * 160 + ghostPhase * 80}
              y={0 + ghostNumber * 60}
              ghostNumber={ghostNumber}
            />
          ))
        )
      )}

      {Directions.map((direction: Direction, directionIndex: number) =>
        PacManPhases.map((pacManPhase: PacManPhase) => (
          <PacManSprite
            key={pacManPhase}
            direction={direction}
            phase={pacManPhase}
            x={30 + directionIndex * 160 + pacManPhase * 80}
            y={270}
          />
        ))
      )}

      <PacManSprite direction={direction} phase={pacManPhase} x={30} y={400} />

      {GhostNumbers.map(ghostNumber => (
        <Ghost
          key={ghostNumber}
          direction={direction}
          phase={ghostPhase}
          x={30 + ghostNumber * 80}
          y={480}
          ghostNumber={ghostNumber}
        />
      ))}

      <Sprite x={30} y={550} name="pill"></Sprite>
      <Sprite x={70} y={550} name="energizer"></Sprite>
    </div>
  );
};
