import { GeneEntity } from './gene.entity';
import { NodeGeneEntity } from './node-gene.entity';

export class ConnectionGeneEntity extends GeneEntity {
  private readonly _source: NodeGeneEntity;
  private readonly _destination: NodeGeneEntity;
  private _weight: number;
  private _enabled: boolean;
  private _replacementIndex: number;

  constructor(source: NodeGeneEntity, destination: NodeGeneEntity) {
    super();
    this._source = source;
    this._destination = destination;
    this._enabled = true;
  }

  get source(): NodeGeneEntity {
    return this._source;
  }

  get destination(): NodeGeneEntity {
    return this._destination;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get replacementIndex(): number {
    return this._replacementIndex;
  }

  set replacementIndex(value: number) {
    this._replacementIndex = value;
  }
}
