import { NeighborRegrowStrategy } from './regrow/neighbor-regrow.strategy';

export class MapConfig {
  public static readonly MAP_WIDTH = 75;
  public static readonly MAP_HEIGHT = 75;
  public static readonly MAP_TILESIZE = 5;
  public static readonly MAP_REGROW_STRATEGY = new NeighborRegrowStrategy(0.1);
  public static readonly MAX_ENERGY_OF_TILE = 100;
}
