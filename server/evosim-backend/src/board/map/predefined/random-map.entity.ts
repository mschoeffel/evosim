import { MapEntity } from '../map.entity';
import { TileEntity } from '../tile/tile.entity';
import { MapConfig } from '../map.config';
import { TileMapper } from '../mapper/tile.mapper';
import { RandomGenerator } from '../generaror/random.generator';

export class RandomMapEntity extends MapEntity {
  constructor() {
    super(
      MapConfig.MAP_WIDTH,
      MapConfig.MAP_HEIGHT,
      MapConfig.MAP_TILESIZE,
      MapConfig.MAP_REGROW_STRATEGY,
    );
  }

  protected generateMap(): Array<Array<TileEntity>> {
    return TileMapper.map(
      new RandomGenerator().generate(this.width, this.height),
    );
  }
}
