export class EdgeClientDto {
  _id: string;
  _from: string;
  _to: string;
  _title: string;
  _width: number;
  _label: string;
  _enabled: boolean;

  constructor() {
    this._id = '';
    this._from = '';
    this._to = '';
    this._title = '';
    this._width = 0;
    this._label = '';
    this._enabled = true;
  }
}
