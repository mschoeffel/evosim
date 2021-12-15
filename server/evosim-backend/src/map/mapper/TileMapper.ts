import { GrassTile } from '../tile/GrassTile';
import { WaterTile } from '../tile/WaterTile';
import { Tile } from '../tile/Tile';

export class TileMapper {
  public static readonly BORDER = 30;

  public static map(mapData: Array<Array<number>>): Array<Array<Tile>> {
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
          mappedMapRowTiles.push(new GrassTile(indexX, indexY, energy));
        } else {
          mappedMapRowTiles.push(new WaterTile(indexX, indexY));
        }
        indexX++;
      }
      mappedMapColumns.push(mappedMapRowTiles);
      indexY++;
    }
    return mappedMapColumns;
  }
}
