import React, { useEffect, useState } from 'react';
import {
  PacManPhase,
  PacManPhases,
  PacManSprite,
  DyingPacManSprite,
} from '../../components/PacMacView';
import {
  GhostSprite,
  DeadGhostSprite,
  FrightenedGhostSprite,
} from '../../components/GhostsView';
import { Directions, Direction } from '../../lib/Types';
import { Sprite } from '../../components/Sprite';
import {
  DyingPacManPhaseCount,
  DyingPacManPhase,
  DyingPacManPhases,
} from '../../lib/PacMan';
import {
  GhostAnimationPhases,
  GhostNumbers,
  GhostAnimationPhase,
  GhostNumber,
  FrightenedGhostTimes,
} from '../../lib/Ghost';
import styled from 'styled-components/macro';

export const SpriteTestPage: React.FC = () => {
  const [phaseCounter, setPhaseCounter] = useState<number>(0);
  const [directionIndex, setDirectionIndex] = useState<number>(0);
  const pacManPhase = (phaseCounter % PacManPhases.length) as PacManPhase;
  const ghostPhase = (phaseCounter %
    GhostAnimationPhases.length) as GhostAnimationPhase;
  const dyingPacManPhase = (phaseCounter %
    DyingPacManPhaseCount) as DyingPacManPhase;

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
    <Layout className="SpriteTestPage">
      {GhostNumbers.map((ghostNumber: GhostNumber) =>
        Directions.map((direction: Direction, directionIndex: number) =>
          GhostAnimationPhases.map((ghostPhase: GhostAnimationPhase) => (
            <GhostSprite
              key={`${ghostPhase}-${direction}-${ghostPhase}`}
              direction={direction}
              ghostAnimationPhase={ghostPhase}
              x={30 + directionIndex * 160 + ghostPhase * 80}
              y={0 + ghostNumber * 60}
              ghostNumber={ghostNumber}
            />
          ))
        )
      )}

      {FrightenedGhostTimes.map(frightenedGhostTime =>
        GhostAnimationPhases.map(ghostAnimationPhase => (
          <FrightenedGhostSprite
            key={`${ghostAnimationPhase}-${frightenedGhostTime}`}
            ghostAnimationPhase={ghostAnimationPhase}
            frightenedGhostTime={frightenedGhostTime}
            x={30 + ghostAnimationPhase * 80 + frightenedGhostTime * 160}
            y={0 + 4 * 60}
          />
        ))
      )}

      {Directions.map((direction: Direction, directionIndex: number) => (
        <DeadGhostSprite
          key={directionIndex}
          direction={direction}
          x={30 + directionIndex * 80}
          y={0 + 5 * 60}
        />
      ))}

      {Directions.map((direction: Direction, directionIndex: number) =>
        PacManPhases.map((pacManPhase: PacManPhase) => (
          <PacManSprite
            key={pacManPhase}
            direction={direction}
            phase={pacManPhase}
            x={30 + directionIndex * 160 + pacManPhase * 80}
            y={0 + 6 * 60}
          />
        ))
      )}

      {DyingPacManPhases.map(dyingPacManPhase => (
        <DyingPacManSprite
          key={dyingPacManPhase}
          phase={dyingPacManPhase}
          x={30 + dyingPacManPhase * 45}
          y={0 + 7 * 60}
        />
      ))}

      <PacManSprite
        direction={direction}
        phase={pacManPhase}
        x={30 + 380}
        y={0 + 8 * 60}
      />

      {GhostNumbers.map(ghostNumber => (
        <GhostSprite
          key={ghostNumber}
          direction={direction}
          ghostAnimationPhase={ghostPhase}
          x={30 + ghostNumber * 80}
          y={0 + 8 * 60}
          ghostNumber={ghostNumber}
        />
      ))}
      <DeadGhostSprite direction={direction} x={30 + 4 * 80} y={0 + 8 * 60} />

      <DyingPacManSprite phase={dyingPacManPhase} x={30} y={0 + 9 * 60} />

      <Sprite x={30} y={0 + 10 * 60} name="basic-pill"></Sprite>
      <Sprite x={70} y={0 + 10 * 60} name="energizer"></Sprite>
    </Layout>
  );
};

const Layout = styled.div`
  position: relative;
  margin-top: 50px;
  margin-left: 100px;
  width: 800px;
  height: 600px;
`;
