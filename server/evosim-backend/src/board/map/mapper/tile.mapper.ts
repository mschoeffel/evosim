import { GrassTileEntity } from '../tile/grass-tile.entity';
import { WaterTileEntity } from '../tile/water-tile.entity';
import { TileEntity } from '../tile/tile.entity';

export class TileMapper {
  public static readonly BORDER = 35;

  public static map(mapData: Array<Array<number>>): Array<Array<TileEntity>> {
    const mappedMapColumns = [];
    let indexY = 0;
    for (const mapColumns of mapData) {
      const mappedMapRowTiles = [];
      let indexX = 0;
      for (const mapRowTiles of mapColumns) {
        if (mapRowTiles >= this.BORDER) {
          const energy = Math.round(
            ((mapRowTiles - this.BORDER) / (100 - this.BORDER)) * 100,
          );
          mappedMapRowTiles.push(new GrassTileEntity(indexX, indexY, energy));
        } else {
          mappedMapRowTiles.push(new WaterTileEntity(indexX, indexY));
        }
        indexX++;
      }
      mappedMapColumns.push(mappedMapRowTiles);
      indexY++;
    }
    return mappedMapColumns;
  }
}
