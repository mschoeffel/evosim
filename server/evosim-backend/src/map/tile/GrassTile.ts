import { Tile } from './Tile';

export class GrassTile extends Tile {
  constructor(energy: number) {
    super();
    this._name = 'grass';
    this._short = 'G';
    this._energy = energy;
  }
}
