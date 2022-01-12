import { GeneEntity } from './gene.entity';
import { NodeGenomeType } from './node-genome-type.enum';

export class NodeGeneEntity extends GeneEntity {
  private _x: number;
  private _y: number;
  private readonly _type: NodeGenomeType;

  constructor(innovationNumber: number, type: NodeGenomeType) {
    super(innovationNumber);
    this._type = type;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get type(): NodeGenomeType {
    return this._type;
  }
}
