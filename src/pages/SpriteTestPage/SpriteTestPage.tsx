import React, { useEffect, useState } from 'react';
import {
  PacManPhase,
  PacManPhases,
  PacManSprite,
  DyingPacManSprite,
} from '../../components/PacMacView';
import {
  GhostNumber,
  GhostNumbers,
  GhostPhases,
  GhostPhase,
  GhostSprite,
} from '../../components/GhostsView';
import { Directions, Direction } from '../../components/Types';
import { Sprite } from '../../components/Sprite';
import { DyingPacManPhases, DyingPacManPhase } from '../../lib/PacMan';

export const SpriteTestPage: React.FC = () => {
  const [phaseCounter, setPhaseCounter] = useState<number>(0);
  const [directionIndex, setDirectionIndex] = useState<number>(0);
  const pacManPhase = (phaseCounter % PacManPhases.length) as PacManPhase;
  const ghostPhase = (phaseCounter % GhostPhases.length) as GhostPhase;
  const dyingPacManPhase = (phaseCounter %
    DyingPacManPhases.length) as DyingPacManPhase;

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
            <GhostSprite
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

      {DyingPacManPhases.map((dyingPacManPhase: DyingPacManPhase) => (
        <DyingPacManSprite
          key={dyingPacManPhase}
          phase={dyingPacManPhase}
          x={30 + dyingPacManPhase * 45}
          y={380}
        />
      ))}

      <PacManSprite direction={direction} phase={pacManPhase} x={30} y={450} />
      <DyingPacManSprite phase={dyingPacManPhase} x={160} y={450} />

      {GhostNumbers.map(ghostNumber => (
        <GhostSprite
          key={ghostNumber}
          direction={direction}
          phase={ghostPhase}
          x={30 + ghostNumber * 80}
          y={510}
          ghostNumber={ghostNumber}
        />
      ))}
      <Sprite x={30} y={600} name="basic-pill"></Sprite>
      <Sprite x={70} y={600} name="energizer"></Sprite>
    </div>
  );
};
