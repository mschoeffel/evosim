import { Tile } from './Tile';

export class GrassTile extends Tile {
  constructor(x: number, y: number, energy: number) {
    super(x, y, 'grass', 'G');
    this._energy = energy;
  }
}
