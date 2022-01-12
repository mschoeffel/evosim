import { BlobEntity } from '../blob/blob.entity';
import { OptimizationStrategy } from '../blob/brain/net/optimization/optimization.strategy';
import { ActivationStrategy } from '../blob/brain/net/nodes/activation/activation.strategy';
import { MapEntity } from '../map/map.entity';
import { BrainEntity } from '../blob/brain/brain.entity';
import { MultiLayerNetFactory } from '../blob/brain/net/multi-layer-net.factory';
import { BoardConfig } from '../board/board.config';
import { GamestateEntity } from '../board/gamestate.entity';
import { PopulationStatsEntity } from './population-stats.entity';

export class PopulationEntity {
  protected readonly _index: number;
  protected readonly _blobs: Array<BlobEntity>;
  protected readonly _optimizationStrategy: OptimizationStrategy;
  protected readonly _activationStrategy: ActivationStrategy;
  protected readonly _netSchema: Array<number>;
  protected readonly _size: number;
  protected readonly _map: MapEntity;
  protected readonly _gamestate: GamestateEntity;

  constructor(
    index: number,
    optimizationStrategy: OptimizationStrategy,
    activationStrategy: ActivationStrategy,
    netSchema: Array<number>,
    size: number,
    map: MapEntity,
    gamestate: GamestateEntity,
  ) {
    this._index = index;
    this._optimizationStrategy = optimizationStrategy;
    this._activationStrategy = activationStrategy;
    this._netSchema = netSchema;
    this._size = size;
    this._blobs = [];
    this._map = map;
    this._gamestate = gamestate;
    for (let i = 0; i < this.size; i++) {
      const brain = new BrainEntity(
        MultiLayerNetFactory.newMultiLayerNet(
          this._netSchema,
          this._activationStrategy,
        ),
      );
      this.addNewBlobToPopulation(
        new BlobEntity(
          this._map,
          this._index,
          brain,
          0,
          0,
          this._optimizationStrategy.name,
          this._activationStrategy.name,
        ),
      );
    }
  }

  public getStats(): PopulationStatsEntity {
    let generationSum = 0;
    let energySum = 0;
    let energyMax = 0;
    let tickSum = 0;
    let tickMax = 0;
    let blobCount = 0;
    for (const blob of this.blobs) {
      generationSum += blob.generation;
      energySum += blob.energy;
      tickSum += blob.ticksAlive;
      if (blob.ticksAlive > tickMax) {
        tickMax = blob.ticksAlive;
      }
      if (blob.energy > energyMax) {
        energyMax = blob.energy;
      }
      blobCount++;
    }
    const stats = new PopulationStatsEntity();
    stats.avgGeneration = Math.round(generationSum / blobCount);
    stats.avgEnergy = Math.round(energySum / blobCount);
    stats.maxEnergy = energyMax;
    stats.avgLifetime = Math.round(tickSum / blobCount);
    stats.maxLifetime = tickMax;
    return stats;
  }

  public addEvolvedNewBlobToPopulation(blobDied: BlobEntity): BlobEntity {
    const net = this.optimizationStrategy.evolve(blobDied, this);
    const brain = new BrainEntity(net);

    const blob = new BlobEntity(
      this.map,
      this.index,
      brain,
      this.gamestate.currentTick,
      blobDied.generation + 1,
      this.optimizationStrategy.name,
      this.activationStrategy.name,
    );
    this.addNewBlobToPopulation(blob);
    return blob;
  }

  protected addNewBlobToPopulation(blob: BlobEntity): void {
    this.blobs.push(blob);
  }

  public getFittestBlobOfPopulation(): BlobEntity | undefined {
    let score = 0;
    let fittestBlob = null;
    for (const blob of this.blobs) {
      if (blob.score() > score) {
        score = blob.score();
        fittestBlob = blob;
      }
    }
    return fittestBlob;
  }

  public tick(): void {
    for (const blob of this.blobs) {
      blob.addTickAlive();
      blob.act();
      blob.energy -= BoardConfig.TICK_ENERGY_COST;
      this.checkBlob(blob);
    }
  }

  protected checkBlob(blob: BlobEntity): void {
    if (Number.isNaN(blob.energy) || blob.energy <= 0) {
      blob.alive = false;
      this.removeBlobFromPopulation(blob);
      this.addEvolvedNewBlobToPopulation(blob);
    } else {
      const tile = this.map.getTileAt(blob.positionX, blob.positionY);
      if (tile === undefined || tile.short === 'W') {
        blob.alive = false;
        this.removeBlobFromPopulation(blob);
        this.addEvolvedNewBlobToPopulation(blob);
      }
    }
  }

  public getRandomBlobOfPopulation(): BlobEntity {
    return this.blobs.at(Math.round(Math.random() * (this.blobs.length - 1)));
  }

  public removeBlobFromPopulation(blob: BlobEntity): void {
    const i = this.blobs.findIndex((b) => b.id == blob.id);
    this.blobs.splice(i, 1);
  }

  get blobs(): Array<BlobEntity> {
    return this._blobs;
  }

  get index(): number {
    return this._index;
  }

  get size(): number {
    return this._size;
  }

  get optimizationStrategy(): OptimizationStrategy {
    return this._optimizationStrategy;
  }

  get activationStrategy(): ActivationStrategy {
    return this._activationStrategy;
  }

  get netSchema(): Array<number> {
    return this._netSchema;
  }

  get map(): MapEntity {
    return this._map;
  }

  get gamestate(): GamestateEntity {
    return this._gamestate;
  }
}
