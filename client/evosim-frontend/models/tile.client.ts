import {ServerParsableInterface} from "~/models/serverparsable.interface";
import {TileClientDto} from "~/models/dto/tile.client.dto";

export class TileClient implements ServerParsableInterface<TileClientDto> {
  constructor() {
    this._energy = 0;
    this._type = "";
    this._id = "";
  }

  private _energy: number;

  get energy(): number {
    return this._energy;
  }

  set energy(value: number) {
    this._energy = value;
  }

  private _type: string;

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  public parseFromDto(obj: TileClientDto): void {
    this.id = obj._id;
    this.energy = obj._energy
    this.type = obj._type;
  }
}
