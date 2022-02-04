import { v4 as uuid } from 'uuid';
import { TileType } from './tile-type.enum';

export abstract class TileEntity {
  private readonly _id: string;
  private readonly _x: number;
  private readonly _y: number;
  private readonly _type: TileType;
  protected _energy: number;

  protected constructor(x: number, y: number, type: TileType) {
    this._id = uuid();
    this._x = x;
    this._y = y;
    this._type = type;
  }

  get energy(): number {
    return this._energy;
  }

  set energy(value: number) {
    this._energy = value;
  }

  get id(): string {
    return this._id;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get type(): TileType {
    return this._type;
  }
}
