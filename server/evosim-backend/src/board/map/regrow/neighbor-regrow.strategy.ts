import { MapRegrowStrategy } from './map-regrow.strategy';
import { TileEntity } from '../tile/tile.entity';
import { MapEntity } from '../map.entity';
import { TileType } from '../tile/tile-type.enum';

export class NeighborRegrowStrategy extends MapRegrowStrategy {
  private readonly regrowRate;

  constructor(regrowRate: number) {
    super();
    this.regrowRate = regrowRate;
  }

  private static findNeighborsOfTile(
    tile: TileEntity,
    map: Array<Array<TileEntity>>,
  ): Array<TileEntity> {
    const neighborTiles = [];
    const neighborSet = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];
    const x = tile.x;
    const y = tile.y;

    for (const neighbor of neighborSet) {
      if (NeighborRegrowStrategy.isOnMap(x + neighbor.x, y + neighbor.y, map)) {
        neighborTiles.push(map[y + neighbor.y][x + neighbor.x]);
      }
    }

    return neighborTiles;
  }

  private static isOnMap(
    x: number,
    y: number,
    map: Array<Array<TileEntity>>,
  ): boolean {
    return x >= 0 && y >= 0 && x < map[0].length && y < map.length;
  }

  getRegrowAmountForTile(tile: TileEntity, map?: MapEntity): number {
    const neighborTiles = NeighborRegrowStrategy.findNeighborsOfTile(
      tile,
      map.map,
    );
    let countGrassNeighbors = 0;
    let sumGrassNeighborsEnergy = 0;
    for (const neighborTile of neighborTiles) {
      if (neighborTile.type === TileType.GRASS) {
        countGrassNeighbors++;
        sumGrassNeighborsEnergy += neighborTile.energy;
      }
    }
    const maxSumGrassNeighborsEnergy = countGrassNeighbors * 100;
    const p = sumGrassNeighborsEnergy / maxSumGrassNeighborsEnergy;

    return this.regrowRate * p;
  }
}
