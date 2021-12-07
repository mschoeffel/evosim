import { MapRegrowStrategy } from './map-regrow-strategy.interface';
import { Tile } from '../tile/Tile';

export class PercentageRegrow extends MapRegrowStrategy {
  private readonly PERCENTAGE_REGROW_RATE;

  constructor(regrowRate: number) {
    super();
    this.PERCENTAGE_REGROW_RATE = regrowRate;
  }

  regrowTile(tile: Tile): void {
    if (tile.energy > 0) {
      tile.energy *= this.PERCENTAGE_REGROW_RATE;
      if (tile.energy > 100) {
        tile.energy = 100;
      }
    }
  }
}
