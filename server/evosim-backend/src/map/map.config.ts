import { PercentageRegrowStrategy } from './regrow/percentage-regrow.strategy';

export class MapConfig {
  public static readonly MAP_WIDTH = 75;
  public static readonly MAP_HEIGHT = 75;
  public static readonly MAP_TILESIZE = 5;
  public static readonly MAP_REGROW_STRATEGY = new PercentageRegrowStrategy(
    1.0005,
  );
}
