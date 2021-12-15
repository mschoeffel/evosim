import { ServerParsableInterface } from '~/models/serverparsable.interface';
import { EdgeClientDto } from '~/models/dto/edge.client.dto';
import { EdgeRenderDto } from '~/models/dto/edge.render.dto';

export class EdgeClient implements ServerParsableInterface<EdgeClientDto> {
  constructor() {
    this._id = '';
    this._from = '';
    this._to = '';
    this._title = '';
    this._width = 0;
    this._label = '';
  }

  private _id: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _from: string;

  get from(): string {
    return this._from;
  }

  set from(value: string) {
    this._from = value;
  }

  private _to: string;

  get to(): string {
    return this._to;
  }

  set to(value: string) {
    this._to = value;
  }

  private _title: string;

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  private _width: number;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  private _label: string;

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  parseFromDto(obj: EdgeClientDto): void {
    this.id = obj._id;
    this.from = obj._from;
    this.to = obj._to;
    this.title = obj._title;
    this.width = obj._width;
    this.label = obj._label;
  }

  toRenderDto(): EdgeRenderDto {
    return new EdgeRenderDto(
      this.id,
      this.from,
      this.to,
      this.title,
      this.width,
      this.label,
    );
  }
}
