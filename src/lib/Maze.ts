import { observable } from 'mobx';
import { getPillsMatrix, TileId } from './MazeData';

export class Maze {
  @observable
  pills: TileId[][] = getPillsMatrix();
}
