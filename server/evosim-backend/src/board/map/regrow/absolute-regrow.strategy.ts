import { MapRegrowStrategy } from './map-regrow.strategy';

export class AbsoluteRegrowStrategy extends MapRegrowStrategy {
  private readonly regrowRate;

  constructor(regrowRate: number) {
    super();
    this.regrowRate = regrowRate;
  }

  getRegrowAmountForTile(): number {
    return this.regrowRate;
  }
}
