import { v4 as uuid } from 'uuid';

export abstract class Tile {
  private readonly _id: string;
  private readonly _x: number;
  private readonly _y: number;
  protected readonly _name: string;
  protected readonly _short: string;
  protected _energy: number;

  protected constructor(x: number, y: number, name: string, short: string) {
    this._id = uuid();
    this._x = x;
    this._y = y;
    this._name = name;
    this._short = short;
  }

  get energy(): number {
    return this._energy;
  }

  set energy(value: number) {
    this._energy = value;
  }

  get name(): string {
    return this._name;
  }

  get short(): string {
    return this._short;
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
}
