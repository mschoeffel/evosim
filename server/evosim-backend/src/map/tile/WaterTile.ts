import { Tile } from './Tile';

export class WaterTile extends Tile {
  constructor(x: number, y: number) {
    super(x, y, 'water', 'W');
    this._energy = -1;
  }
}
