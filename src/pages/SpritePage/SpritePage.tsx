import React, { useEffect, useState } from 'react';
import {
  PacManAnimationPhase,
  PacManAnimationPhases,
  PacManSprite,
  DyingPacManSprite,
} from '../GamePage/components/PacManView';
import {
  GhostSprite,
  DeadGhostSprite,
  FrightenedGhostSprite,
} from '../GamePage/components/GhostsView';
import { Directions, Direction } from '../../model/Types';
import { Sprite } from '../../components/Sprite';
import {
  GhostAnimationPhases,
  GhostNumbers,
  GhostAnimationPhase,
  GhostNumber,
  FrightenedGhostTimes,
} from '../../model/Ghost';
import styled from 'styled-components/macro';
import {
  PacManDyingPhaseCount,
  PacManDyingPhase,
  PacManDyingPhases,
} from '../../model/pacManDyingPhase';

export const SpritePage: React.FC = () => {
  const [phaseCounter, setPhaseCounter] = useState<number>(0);
  const [directionIndex, setDirectionIndex] = useState<number>(0);
  const pacManPhase = (phaseCounter %
    PacManAnimationPhases.length) as PacManAnimationPhase;
  const ghostPhase = (phaseCounter %
    GhostAnimationPhases.length) as GhostAnimationPhase;
  const dyingPacManAnimationPhase = (phaseCounter %
    PacManDyingPhaseCount) as PacManDyingPhase;

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
    <Layout className="SpriteTestPage" data-testid="SpritePage">
      {GhostNumbers.map((ghostNumber: GhostNumber) =>
        Directions.map((direction: Direction, directionIndex: number) =>
          GhostAnimationPhases.map((ghostPhase: GhostAnimationPhase) => (
            <GhostSprite
              key={`${ghostPhase}-${direction}-${ghostPhase}`}
              direction={direction}
              ghostAnimationPhase={ghostPhase}
              x={directionIndex * 160 + ghostPhase * 80}
              y={ghostNumber * 60}
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
            x={ghostAnimationPhase * 80 + frightenedGhostTime * 160}
            y={4 * 60}
          />
        ))
      )}

      {Directions.map((direction: Direction, directionIndex: number) => (
        <DeadGhostSprite
          key={directionIndex}
          direction={direction}
          x={directionIndex * 80}
          y={5 * 60}
        />
      ))}

      {Directions.map((direction: Direction, directionIndex: number) =>
        PacManAnimationPhases.map((pacManPhase: PacManAnimationPhase) => (
          <PacManSprite
            key={pacManPhase}
            direction={direction}
            pacManAnimationPhase={pacManPhase}
            x={directionIndex * 160 + pacManPhase * 80}
            y={6 * 60}
          />
        ))
      )}

      {PacManDyingPhases.map(dyingPacManPhase => (
        <DyingPacManSprite
          key={dyingPacManPhase}
          dyingPacManAnimationPhase={dyingPacManPhase}
          x={dyingPacManPhase * 45}
          y={7 * 60}
        />
      ))}

      {GhostNumbers.map(ghostNumber => (
        <GhostSprite
          key={ghostNumber}
          direction={direction}
          ghostAnimationPhase={ghostPhase}
          x={ghostNumber * 80}
          y={8 * 60}
          ghostNumber={ghostNumber}
        />
      ))}
      <FrightenedGhostSprite
        ghostAnimationPhase={ghostPhase}
        frightenedGhostTime={0}
        x={4 * 80}
        y={8 * 60}
      />
      <FrightenedGhostSprite
        ghostAnimationPhase={ghostPhase}
        frightenedGhostTime={1}
        x={5 * 80}
        y={8 * 60}
      />

      <DeadGhostSprite direction={direction} x={6 * 80} y={8 * 60} />

      <PacManSprite
        direction={direction}
        pacManAnimationPhase={pacManPhase}
        x={7 * 80}
        y={8 * 60}
      />

      <DyingPacManSprite
        dyingPacManAnimationPhase={dyingPacManAnimationPhase}
        x={0 + 0 * 80}
        y={9 * 60}
      />

      <Sprite x={0 + 0 * 80} y={10 * 60} name="basic-pill"></Sprite>
      <Sprite x={0 + 1 * 80} y={10 * 60} name="energizer"></Sprite>
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
