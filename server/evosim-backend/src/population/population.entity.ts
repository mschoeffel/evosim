import { BlobEntity } from '../blob/blob.entity';
import { OptimizationStrategy } from '../blob/brain/net/optimization/optimization.strategy';
import { ActivationStrategyInterface } from '../blob/brain/net/nodes/activation/activation-strategy.interface';
import { MapEntity } from '../map/map.entity';
import { MultiLayerNetEntity } from '../blob/brain/net/multi-layer-net.entity';

export class PopulationEntity {
  private readonly num: number;
  private _blobs: Array<BlobEntity>;
  private readonly optimizationStrategy: OptimizationStrategy;
  private readonly activationStrategy: ActivationStrategyInterface;
  private readonly map: MapEntity;
  private readonly netSchema: Array<number>;

  constructor(
    num: number,
    optimizationStrategy: OptimizationStrategy,
    activationStrategy: ActivationStrategyInterface,
    map: MapEntity,
    netSchema: Array<number>,
  ) {
    this.num = num;
    this.optimizationStrategy = optimizationStrategy;
    this.activationStrategy = activationStrategy;
    this.map = map;
    this.netSchema = netSchema;
    this._blobs = [];
  }

  public spawnNewBlob(tick: number): BlobEntity {
    const mostAdvancedBlob = this.getFittestBlobOfPopulation();
    const net = new MultiLayerNetEntity();
    let blob;
    if (mostAdvancedBlob === null || mostAdvancedBlob === undefined) {
      net.initializeNet(this.netSchema);
      blob = new BlobEntity(
        this.map,
        this.num,
        net,
        this.optimizationStrategy,
        tick,
      );
    } else {
      blob = new BlobEntity(
        this.map,
        this.num,
        net,
        this.optimizationStrategy,
        tick,
        mostAdvancedBlob,
      );
    }
    this.addDirectBlob(blob);
    return blob;
  }

  public addDirectBlob(blob: BlobEntity): void {
    this._blobs.push(blob);
  }

  public getFittestBlobOfPopulation(): BlobEntity | undefined {
    if (this._blobs.length > 0) {
      return this._blobs.reduce((a, b) =>
        a.ticksAlive > b.ticksAlive ? a : b,
      );
    }
    return undefined;
  }

  public size(): number {
    return this._blobs.length;
  }

  public removeBlob(blob: BlobEntity): void {
    const i = this.blobs.findIndex((b) => b.id == blob.id);
    this.blobs.splice(i, 1);
  }

  get blobs(): Array<BlobEntity> {
    return this._blobs;
  }

  set blobs(value: Array<BlobEntity>) {
    this._blobs = value;
  }
}
