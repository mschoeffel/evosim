import { MapGeneratorStrategy } from './map-generator.interface';

export class RandomGenerator implements MapGeneratorStrategy {
  generate(width: number, height: number): Array<Array<number>> {
    const mapColumns = [];
    for (let w = 0; w < width; w++) {
      const mapRows = [];
      for (let h = 0; h < height; h++) {
        const value = Math.random() * 100;
        mapRows.push(value);
      }
      mapColumns.push(mapRows);
    }
    return mapColumns;
  }
}
