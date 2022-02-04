import { TileEntity } from './tile.entity';
import { TileType } from './tile-type.enum';

export class WaterTileEntity extends TileEntity {
  constructor(x: number, y: number) {
    super(x, y, TileType.WATER);
    this._energy = -1;
  }
}
