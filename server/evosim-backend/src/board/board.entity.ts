import { BlobEntity } from '../blob/blob.entity';
import { MapEntity } from '../map/map.entity';
import { PerlinNoiseGeneratorEntity } from '../map/generaror/perlin-noise-generator.entity';
import { Tile } from '../map/tile/Tile';
import { PercentageRegrow } from '../map/regrow/percentage-regrow.entity';
import { MultiLayerNetEntity } from '../blob/brain/net/multi-layer-net.entity';
import { Utils } from '../utils/utils';

export class BoardEntity {
  public readonly MAP_WIDTH = 75;
  public readonly MAP_HEIGHT = 75;
  public readonly MAP_TILE_SIZE = 5;
  public readonly MAP_GENERATOR = new PerlinNoiseGeneratorEntity();
  public readonly PERCENTAGE_REGROW = 1.0005;
  public readonly MAP_REGROW_STRATEGY = new PercentageRegrow(
    this.PERCENTAGE_REGROW,
  );
  public readonly POPULATIONS = 5;
  public readonly CREATURES_PER_POPULATION = 10;
  public readonly TICK_ENERGY_COST = 0.5;
  public readonly MAX_HIDDEN_LAYER = 5;
  public readonly MIN_HIDDEN_LAYER = 1;
  public readonly MAX_NODES = 8;
  public readonly MIN_NODES = 2;

  private _blobs: Array<BlobEntity>;
  private _map: MapEntity;
  private _populationNetSchemas: Array<Array<number>>;

  constructor() {
    this._blobs = [];
    this._map = new MapEntity(
      this.MAP_GENERATOR,
      this.MAP_REGROW_STRATEGY,
      this.MAP_WIDTH,
      this.MAP_HEIGHT,
      this.MAP_TILE_SIZE,
    );
    this._populationNetSchemas = [];

    this._map.generateMap();
    for (let population = 0; population < this.POPULATIONS; population++) {
      const schema = [];
      const hiddenLayer = Utils.randomBetweenInclusive(
        this.MIN_HIDDEN_LAYER,
        this.MAX_HIDDEN_LAYER,
      );
      for (let i = 0; i < hiddenLayer; i++) {
        schema.push(
          Utils.randomBetweenInclusive(this.MIN_NODES, this.MAX_NODES),
        );
      }
      this.populationNetSchemas.push(schema);

      for (let i = 0; i < this.CREATURES_PER_POPULATION; i++) {
        this.addNewBlob(population);
      }
    }
  }

  public getTileOfBlobPosition(x: number, y: number): Tile {
    return this.map.getTileAt(x, y);
  }

  private getBlobWithMostEnergyOfPopulation(population: number): BlobEntity {
    if (this.blobs.length > 0) {
      const blobsOfSamePopulation = this.blobs.filter(
        (b) => b.population === population,
      );
      if (blobsOfSamePopulation.length > 0) {
        return blobsOfSamePopulation.reduce((a, b) =>
          a.energy > b.energy ? a : b,
        );
      }
    }
    return null;
  }

  public addNewBlob(population: number): void {
    const mostAdvancedBlob = this.getBlobWithMostEnergyOfPopulation(population);
    const net = new MultiLayerNetEntity();
    if (mostAdvancedBlob === null || mostAdvancedBlob === undefined) {
      net.initializeNet(this.populationNetSchemas[population]);
      this.addBlob(new BlobEntity(this.map, population, net));
    } else {
      this.addBlob(new BlobEntity(this.map, population, net, mostAdvancedBlob));
    }
  }

  public addBlob(blob: BlobEntity): void {
    this.blobs.push(blob);
  }

  public runOneTick(): void {
    this.map.regenerate();
    for (const blob of this.blobs) {
      blob.energy -= this.TICK_ENERGY_COST;
      blob.act();
      this.checkBlob(blob);
    }
  }

  private checkBlob(blob: BlobEntity): void {
    if (blob.energy <= 0) {
      this.addNewBlob(blob.population);
      this.removeBlobFromBoard(blob);
    } else {
      const tile = this.getTileOfBlobPosition(blob.positionX, blob.positionY);
      if (tile === undefined || tile.short === 'W') {
        this.addNewBlob(blob.population);
        this.removeBlobFromBoard(blob);
      }
    }
  }

  private removeBlobFromBoard(blob: BlobEntity): void {
    const i = this.blobs.findIndex((b) => b.id == blob.id);
    this.blobs.splice(i, 1);
  }

  get blobs(): Array<BlobEntity> {
    return this._blobs;
  }

  set blobs(value: Array<BlobEntity>) {
    this._blobs = value;
  }

  get map(): MapEntity {
    return this._map;
  }

  set map(value: MapEntity) {
    this._map = value;
  }

  get populationNetSchemas(): Array<Array<number>> {
    return this._populationNetSchemas;
  }

  set populationNetSchemas(value: Array<Array<number>>) {
    this._populationNetSchemas = value;
  }
}
