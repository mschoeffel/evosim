import { MapRegrowStrategy } from './map-regrow.strategy';
import { TileEntity } from '../tile/tile.entity';

export class PercentageRegrowStrategy extends MapRegrowStrategy {
  private readonly regrowRate;

  constructor(regrowRate: number) {
    super();
    this.regrowRate = regrowRate;
  }

  getRegrowAmountForTile(tile: TileEntity): number {
    return tile.energy * this.regrowRate;
  }
}
