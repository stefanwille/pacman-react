import { Game } from './Game';
import { MilliSeconds } from './Types';

// The typical duration of a frame: 1000ms for 60 frames per second = 17ms.
export const TYPICAL_FRAME_LENGTH: MilliSeconds = 17;

export const updateExternalTimestamp = ({
  game,
  externalTimeStamp,
}: {
  game: Game;
  externalTimeStamp: number;
}) => {
  if (game.externalTimeStamp === null) {
    // The very first frame
    // We cannot measure its duration. Therefore we have to make an assumption.
    game.lastFrameLength = TYPICAL_FRAME_LENGTH;
  } else {
    // A later frame.
    // We can calculate its duration.
    game.lastFrameLength = externalTimeStamp - game.externalTimeStamp;
  }
  game.externalTimeStamp = externalTimeStamp;
};
