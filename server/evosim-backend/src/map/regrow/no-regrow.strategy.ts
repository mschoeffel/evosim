import { MapRegrowStrategy } from './map-regrow.strategy';

export class NoRegrowStrategy extends MapRegrowStrategy {
  constructor() {
    super();
  }

  getRegrowAmountForTile(): number {
    return 0;
  }
}
