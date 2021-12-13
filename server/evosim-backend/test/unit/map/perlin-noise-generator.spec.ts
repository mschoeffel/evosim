import { PerlinNoiseGenerator } from '../../../src/map/generaror/perlin-noise.generator';

describe('PerlinNoiseGenerator', () => {
  let perlinNoiseGenerator: PerlinNoiseGenerator;

  beforeEach(() => {
    perlinNoiseGenerator = new PerlinNoiseGenerator();
  });

  it.each([
    [1, 1],
    [5, 5],
    [10, 20],
    [50, 30],
    [100, 100],
  ])(
    'generated map has exactly width(%s) x height(%s) elements',
    (width, height) => {
      const mapWidth = perlinNoiseGenerator.generate(width, height);
      expect(mapWidth.length).toBe(width);
      for (const mapHeight of mapWidth) {
        expect(mapHeight.length).toBe(height);
      }
    },
  );

  it('generated map values are between 0 and 100 and different', () => {
    const map = perlinNoiseGenerator.generate(100, 100);
    for (const mapHeight of map) {
      for (const value of mapHeight) {
        expect(value).toBeLessThanOrEqual(100);
        expect(value).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
