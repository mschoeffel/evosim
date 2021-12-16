import { BlobEntity } from '../blob/blob.entity';
import { Tile } from '../map/tile/Tile';
import { GamestateEntity } from './gamestate.entity';
import { MapEntity } from '../map/map.entity';
import { BoardConfig } from './board.config';
import { PopulationEntity } from '../population/population.entity';
import { MapConfig } from '../map/map.config';

export class BoardEntity {
  public readonly TICK_ENERGY_COST = 0.5;

  private readonly _map: MapEntity;
  private readonly _gamestate: GamestateEntity;
  private readonly _populations: Array<PopulationEntity>;

  constructor() {
    this._map = MapConfig.MAP;
    this._gamestate = new GamestateEntity(
      BoardConfig.NUMBER_OF_POPULATIONS,
      BoardConfig.CREATURES_PER_POPULATION,
    );

    this._populations = [];
    for (
      let populationIndex = 0;
      populationIndex < BoardConfig.NUMBER_OF_POPULATIONS;
      populationIndex++
    ) {
      const populationData = BoardConfig.POPULATIONS_DATA.at(populationIndex);
      const population = new PopulationEntity(
        populationIndex,
        populationData.optimization,
        populationData.activationFunction,
        populationData.netSchema,
        BoardConfig.CREATURES_PER_POPULATION,
      );
      population.initialize(this._map);
      this._populations.push(population);
    }
  }

  public getTileOfBlobPosition(x: number, y: number): Tile {
    return this.map.getTileAt(x, y);
  }

  public addNewBlobToPopulation(
    blobDied: BlobEntity,
    population: PopulationEntity,
  ): void {
    population.addEvolvedNewBlobToPopulation(
      blobDied,
      this.map,
      this.gamestate.currentTick,
    );
  }

  public runOneTick(): void {
    this.gamestate.addTick();
    this.map.regenerate();
    for (const population of this.populations) {
      for (const blob of population.blobs) {
        blob.addTickAlive();
        blob.act();
        blob.energy -= this.TICK_ENERGY_COST;
        this.checkBlob(blob, population);
      }
    }
  }

  private checkBlob(blob: BlobEntity, population: PopulationEntity): void {
    if (Number.isNaN(blob.energy) || blob.energy <= 0) {
      population.removeBlobFromPopulation(blob);
      this.addNewBlobToPopulation(blob, population);
    } else {
      const tile = this.getTileOfBlobPosition(blob.positionX, blob.positionY);
      if (tile === undefined || tile.short === 'W') {
        population.removeBlobFromPopulation(blob);
        this.addNewBlobToPopulation(blob, population);
      }
    }
  }

  public blobs(): Array<BlobEntity> {
    const blobs = [];
    for (const population of this.populations) {
      for (const blob of population.blobs) {
        blobs.push(blob);
      }
    }
    return blobs;
  }

  get populations(): Array<PopulationEntity> {
    return this._populations;
  }

  get map(): MapEntity {
    return this._map;
  }

  get gamestate(): GamestateEntity {
    return this._gamestate;
  }
}
