export class NodeClientDto {
  _id: string;
  _x: number;
  _y: number;
  _label: string;
  _shape: string;

  constructor() {
    this._id = '';
    this._x = 0;
    this._y = 0;
    this._label = '';
    this._shape = 'circle';
  }
}
