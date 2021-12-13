import { MapGeneratorStrategy } from './map-generator-strategy.interface';
import SimplexNoise = require('simplex-noise');

export class SimplexNoiseGenerator implements MapGeneratorStrategy {
  private simplex;

  constructor() {
    this.simplex = new SimplexNoise(Math.random);
  }

  generate(width: number, height: number): Array<Array<number>> {
    const mapColumns = [];
    for (let w = 0; w < width; w++) {
      const mapRows = [];
      for (let h = 0; h < height; h++) {
        const value = Math.round((this.simplex.noise2D(w, h) + 1) * 50);
        mapRows.push(value);
      }
      mapColumns.push(mapRows);
    }
    return mapColumns;
  }

  seed(seed: number): void {
    this.simplex = new SimplexNoise(seed);
  }
}
