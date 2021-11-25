import { v4 as uuid } from 'uuid';
import { TileDto } from './tile.dto';

export abstract class Tile {
  private readonly _id: string;
  protected _energy: number;
  protected _name: string;
  protected _short: string;

  protected constructor() {
    this._id = uuid();
  }

  public toDto(): TileDto {
    const dto = new TileDto();
    dto.energy = this.energy;
    dto.type = this.short;
    dto.id = this.id;
    return dto;
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

  set name(value: string) {
    this._name = value;
  }

  get short(): string {
    return this._short;
  }

  set short(value: string) {
    this._short = value;
  }

  get id(): string {
    return this._id;
  }
}
