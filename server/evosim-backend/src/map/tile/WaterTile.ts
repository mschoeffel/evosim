import { Tile } from './Tile';

export class WaterTile extends Tile {
  constructor() {
    super();
    this._name = 'water';
    this._short = 'W';
    this._energy = -1;
  }
}
