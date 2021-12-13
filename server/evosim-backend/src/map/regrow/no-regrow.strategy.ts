import { MapRegrowStrategy } from './map-regrow.strategy';

export class NoRegrowStrategy extends MapRegrowStrategy {
  constructor() {
    super();
  }

  regrowTile(): void {
    /* No regrow */
  }
}
