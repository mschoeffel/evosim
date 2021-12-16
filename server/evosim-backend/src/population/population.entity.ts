import { BlobEntity } from '../blob/blob.entity';
import { OptimizationStrategy } from '../blob/brain/net/optimization/optimization.strategy';
import { ActivationStrategy } from '../blob/brain/net/nodes/activation/activation.strategy';
import { MapEntity } from '../map/map.entity';
import { MultiLayerNetEntity } from '../blob/brain/net/multi-layer-net.entity';
import { BrainEntity } from '../blob/brain/brain.entity';

export class PopulationEntity {
  private readonly _index: number;
  private readonly _blobs: Array<BlobEntity>;
  private readonly _optimizationStrategy: OptimizationStrategy;
  private readonly _activationStrategy: ActivationStrategy;
  private readonly _netSchema: Array<number>;
  private readonly _size: number;

  constructor(
    index: number,
    optimizationStrategy: OptimizationStrategy,
    activationStrategy: ActivationStrategy,
    netSchema: Array<number>,
    size: number,
  ) {
    this._index = index;
    this._optimizationStrategy = optimizationStrategy;
    this._activationStrategy = activationStrategy;
    this._netSchema = netSchema;
    this._size = size;
    this._blobs = [];
  }

  public initialize(map: MapEntity): void {
    for (let i = 0; i < this.size; i++) {
      const brain = new BrainEntity(
        new MultiLayerNetEntity(this.netSchema, this.activationStrategy),
      );
      this.blobs.push(
        new BlobEntity(
          map,
          this.index,
          brain,
          0,
          0,
          this.optimizationStrategy.name,
          this.activationStrategy.name,
        ),
      );
    }
  }

  public addEvolvedNewBlobToPopulation(
    blobDied: BlobEntity,
    map: MapEntity,
    tick: number,
  ): BlobEntity {
    const net = this.optimizationStrategy.evolve(blobDied, this);
    const brain = new BrainEntity(net);

    const blob = new BlobEntity(
      map,
      this.index,
      brain,
      tick,
      blobDied.generation + 1,
      this.optimizationStrategy.name,
      this.activationStrategy.name,
    );
    this.addNewBlobToPopulation(blob);
    return blob;
  }

  private addNewBlobToPopulation(blob: BlobEntity): void {
    this.blobs.push(blob);
  }

  public getFittestBlobOfPopulation(): BlobEntity | undefined {
    if (this.blobs.length > 0) {
      return this.blobs.reduce((a, b) => (a.ticksAlive > b.ticksAlive ? a : b));
    }
    return undefined;
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
}
