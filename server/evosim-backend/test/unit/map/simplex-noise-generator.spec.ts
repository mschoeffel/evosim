import { SimplexNoiseGenerator } from '../../../src/board/map/generaror/simplex-noise.generator';

describe('SimplexNoiseGenerator', () => {
  let simplexNoiseGeneratorEntity: SimplexNoiseGenerator;

  beforeEach(() => {
    simplexNoiseGeneratorEntity = new SimplexNoiseGenerator();
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
      const mapWidth = simplexNoiseGeneratorEntity.generate(width, height);
      expect(mapWidth.length).toBe(width);
      for (const mapHeight of mapWidth) {
        expect(mapHeight.length).toBe(height);
      }
    },
  );

  it('generated map values are between 0 and 100 and different', () => {
    const map = simplexNoiseGeneratorEntity.generate(100, 100);
    for (const mapHeight of map) {
      for (const value of mapHeight) {
        expect(value).toBeLessThanOrEqual(100);
        expect(value).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('maps generated with seed are the same', () => {
    const seed = Math.random();
    simplexNoiseGeneratorEntity.seed(seed);
    const mapFirst = simplexNoiseGeneratorEntity.generate(100, 100);
    const mapSecond = simplexNoiseGeneratorEntity.generate(100, 100);
    expect(mapFirst).toEqual(mapSecond);
  });
});
