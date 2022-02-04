import { TileEntity } from './tile.entity';
import { TileType } from './tile-type.enum';

export class GrassTileEntity extends TileEntity {
  constructor(x: number, y: number, energy: number) {
    super(x, y, TileType.GRASS);
    this._energy = energy;
  }
}
