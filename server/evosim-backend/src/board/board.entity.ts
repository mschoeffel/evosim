import { BlobEntity } from '../blob/blob.entity';
import { Tile } from '../map/tile/Tile';
import { MultiLayerNetEntity } from '../blob/brain/net/multi-layer-net.entity';
import { Utils } from '../utils/utils';
import { GamestateEntity } from './gamestate.entity';
import { SimpleMapEntity } from '../map/predefined/simple-map.entity';
import { MapEntity } from '../map/map.entity';

export class BoardEntity {
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
  private _gamestate: GamestateEntity;

  constructor() {
    this._blobs = [];
    this._populationNetSchemas = [];

    //this._map.generateMap();
    this._map = new SimpleMapEntity();
    this._gamestate = new GamestateEntity(
      this.POPULATIONS,
      this.CREATURES_PER_POPULATION,
    );
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

  private getBlobToCopyFrom(population: number): BlobEntity {
    if (this.blobs.length > 0) {
      const blobsOfSamePopulation = this.blobs.filter(
        (b) => b.population === population,
      );
      if (blobsOfSamePopulation.length > 0) {
        return blobsOfSamePopulation.reduce((a, b) =>
          a.ticksAlive > b.ticksAlive ? a : b,
        );
      }
    }
    return null;
  }

  public addNewBlob(population: number): void {
    const mostAdvancedBlob = this.getBlobToCopyFrom(population);
    const net = new MultiLayerNetEntity();
    if (mostAdvancedBlob === null || mostAdvancedBlob === undefined) {
      net.initializeNet(this.populationNetSchemas[population]);
      this.addBlob(
        new BlobEntity(this.map, population, net, this.gamestate.currentTick),
      );
    } else {
      this.addBlob(
        new BlobEntity(
          this.map,
          population,
          net,
          this.gamestate.currentTick,
          mostAdvancedBlob,
        ),
      );
    }
  }

  public addBlob(blob: BlobEntity): void {
    this.blobs.push(blob);
  }

  public runOneTick(): void {
    this.gamestate.addTick();
    this.map.regenerate();
    for (const blob of this.blobs) {
      blob.addTickAlive();
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

  get gamestate(): GamestateEntity {
    return this._gamestate;
  }

  set gamestate(value: GamestateEntity) {
    this._gamestate = value;
  }
}
