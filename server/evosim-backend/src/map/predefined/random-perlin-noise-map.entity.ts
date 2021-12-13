import { MapEntity } from '../map.entity';
import { MapConfig } from '../map.config';
import { TileMapper } from '../mapper/TileMapper';
import { PerlinNoiseGenerator } from '../generaror/perlin-noise.generator';
import { Tile } from '../tile/Tile';

export class RandomPerlinNoiseMapEntity extends MapEntity {
  constructor() {
    super(
      MapConfig.MAP_WIDTH,
      MapConfig.MAP_HEIGHT,
      MapConfig.MAP_TILESIZE,
      MapConfig.MAP_REGROW_STRATEGY,
    );
  }

  protected generateMap(): Array<Array<Tile>> {
    return TileMapper.map(
      new PerlinNoiseGenerator().generate(this.width, this.height),
    );
  }
}
