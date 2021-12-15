import { MapGeneratorStrategy } from './map-generator.interface';
import PerlinNoise = require('perlin-noise');

export class PerlinNoiseGenerator implements MapGeneratorStrategy {
  generate(width: number, height: number): Array<Array<number>> {
    let noise: Array<number> = PerlinNoise.generatePerlinNoise(width, height);
    noise = noise.reverse();
    const mapColumns = [];
    for (let w = 0; w < width; w++) {
      const mapRows = [];
      for (let h = 0; h < height; h++) {
        mapRows.push(noise.pop() * 100);
      }
      mapColumns.push(mapRows);
    }
    return mapColumns;
  }
}
