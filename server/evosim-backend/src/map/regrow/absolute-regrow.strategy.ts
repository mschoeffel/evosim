import { MapRegrowStrategy } from './map-regrow.strategy';
import { Tile } from '../tile/Tile';

export class AbsoluteRegrowStrategy extends MapRegrowStrategy {
  private readonly ABSOLUTE_REGROW_RATE;

  constructor(regrowRate: number) {
    super();
    this.ABSOLUTE_REGROW_RATE = regrowRate;
  }

  regrowTile(tile: Tile): void {
    if (tile.energy > 0) {
      tile.energy += this.ABSOLUTE_REGROW_RATE;
      if (tile.energy > 100) {
        tile.energy = 100;
      }
    }
  }
}
