import { MapRegrowStrategy } from './map-regrow.strategy';
import { Tile } from '../tile/Tile';
import { MapConfig } from '../map.config';

export class AbsoluteRegrowStrategy extends MapRegrowStrategy {
  private readonly regrowRate;

  constructor(regrowRate: number) {
    super();
    this.regrowRate = regrowRate;
  }

  regrowTile(tile: Tile): void {
    if (tile.energy >= 0) {
      let amount = this.regrowRate;
      if (tile.energy + amount > MapConfig.MAX_ENERGY_OF_TILE) {
        amount = MapConfig.MAX_ENERGY_OF_TILE - tile.energy;
      }
      tile.energy += amount;
    }
  }
}
