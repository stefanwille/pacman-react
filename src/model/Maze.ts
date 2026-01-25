import { observable, makeObservable } from 'mobx';
import { getPillsMatrix, TileId } from './MazeData';

export class Maze {
  constructor() {
    makeObservable(this);
  }

  @observable
  pills: TileId[][] = getPillsMatrix();
}
