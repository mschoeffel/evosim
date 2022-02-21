import { TileEntity } from '../tile/tile.entity';
import { MapEntity } from '../map.entity';
import { TileType } from '../tile/tile-type.enum';
import { MapConfig } from '../map.config';

export abstract class MapRegrowStrategy {
  abstract getRegrowAmountForTile(tile: TileEntity, map?: MapEntity): number;

  regrowTileAt(x: number, y: number, map: MapEntity): void {
    const tile = map.getTileAt(x, y);
    if (tile !== undefined) {
      this.regrowTile(tile, map);
    }
  }

  regrowTile(tile: TileEntity, map?: MapEntity): void {
    if (tile.type === TileType.GRASS) {
      let amount = this.getRegrowAmountForTile(tile, map);
      if (tile.energy + amount > MapConfig.MAX_ENERGY_OF_TILE) {
        amount = MapConfig.MAX_ENERGY_OF_TILE - tile.energy;
      }
      tile.energy += amount;
    }
  }
}
