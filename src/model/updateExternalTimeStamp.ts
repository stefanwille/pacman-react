import { Game } from './Game';
import { MilliSeconds } from './Types';

export const TYPICAL_FRAME_DURATION: MilliSeconds = 17;

export const updateExternalTimestamp = ({
  game,
  externalTimeStamp,
}: {
  game: Game;
  externalTimeStamp: number;
}) => {
  if (game.externalTimeStamp === null) {
    // The very first frame
    // 1000ms / 60 frames per second
    game.timeSinceLastFrame = TYPICAL_FRAME_DURATION;
  } else {
    // Later frames
    game.timeSinceLastFrame = externalTimeStamp - game.externalTimeStamp;
  }
  game.externalTimeStamp = externalTimeStamp;
};
