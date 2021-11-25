import {ServerParsableInterface} from "~/models/serverparsable.interface";
import {NodeClientDto} from "~/models/dto/node.client.dto";
import {NodeRenderDto} from "~/models/dto/node.render.dto";

export class NodeClient implements ServerParsableInterface<NodeClientDto> {
  constructor() {
    this._id = "";
    this._x = 0;
    this._y = 0;
    this._label = "";
    this._shape = "circle";
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _x: number;

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  private _y: number;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  private _label: string;

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  private _shape: string;

  get shape(): string {
    return this._shape;
  }

  set shape(value: string) {
    this._shape = value;
  }

  parseFromDto(obj: NodeClientDto): void {
    this.id = obj._id;
    this.x = obj._x;
    this.y = obj._y;
    this.label = obj._label;
    this.shape = obj._shape;
  }

  toRenderDto(): NodeRenderDto {
    return new NodeRenderDto(this.id, this.x, this.y, this.label, this.shape);
  }
}
