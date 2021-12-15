import { BlobEntity } from '../blob/blob.entity';
import { Tile } from '../map/tile/Tile';
import { GamestateEntity } from './gamestate.entity';
import { SimpleMapEntity } from '../map/predefined/simple-map.entity';
import { MapEntity } from '../map/map.entity';
import { BoardConfig } from './board.config';
import { PopulationEntity } from '../population/population.entity';

export class BoardEntity {
  public readonly TICK_ENERGY_COST = 0.5;

  private _map: MapEntity;
  private _populationNetSchemas: Array<Array<number>>;
  private _gamestate: GamestateEntity;
  private _populations: Array<PopulationEntity>;

  constructor() {
    this._populationNetSchemas = [];

    this._map = new SimpleMapEntity();
    this._gamestate = new GamestateEntity(
      BoardConfig.NUMBER_OF_POPULATIONS,
      BoardConfig.CREATURES_PER_POPULATION,
    );

    this._populations = [];
    for (
      let population = 0;
      population < BoardConfig.NUMBER_OF_POPULATIONS;
      population++
    ) {
      const pop = BoardConfig.POPULATIONS_DATA.at(population);
      const p = new PopulationEntity(
        population,
        pop.optimization,
        pop.activationFunction,
        this._map,
        pop.netSchema,
      );
      this._populations.push(p);

      for (let i = 0; i < BoardConfig.CREATURES_PER_POPULATION; i++) {
        this.addNewBlobToPopulation(p);
      }
    }
  }

  public getTileOfBlobPosition(x: number, y: number): Tile {
    return this.map.getTileAt(x, y);
  }

  public addNewBlobToPopulation(population: PopulationEntity): void {
    population.spawnNewBlob(this.gamestate.currentTick);
  }

  public runOneTick(): void {
    this.gamestate.addTick();
    this.map.regenerate();
    for (const population of this._populations) {
      for (const blob of population.blobs) {
        blob.addTickAlive();
        blob.energy -= this.TICK_ENERGY_COST;
        blob.act();
        this.checkBlob(blob, population);
      }
    }
  }

  private checkBlob(blob: BlobEntity, population: PopulationEntity): void {
    if (blob.energy <= 0) {
      this.addNewBlobToPopulation(population);
      population.removeBlob(blob);
    } else {
      const tile = this.getTileOfBlobPosition(blob.positionX, blob.positionY);
      if (tile === undefined || tile.short === 'W') {
        this.addNewBlobToPopulation(population);
        population.removeBlob(blob)
      }
    }
  }

  public blobs(): Array<BlobEntity> {
    const blobs = [];
    for (const population of this._populations) {
      for (const blob of population.blobs) {
        blobs.push(blob);
      }
    }
    return blobs;
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
