export class NodeDto {
  private _id: string;
  private _x: number;
  private _y: number;
  private _label: string;
  private _shape: string;

  constructor() {
    this._shape = 'circle';
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
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

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get shape(): string {
    return this._shape;
  }

  set shape(value: string) {
    this._shape = value;
  }
}
