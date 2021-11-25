import {BrainClientDto} from "~/models/dto/brain.client.dto";

export class BlobClientDto {

  _id: string;
  _x: number;
  _y: number;
  _direction: number;
  _eyeX: number;
  _eyeY: number;
  _size: number;
  _energy: number;
  _brain: BrainClientDto;
  _population: number;
  _generation: number;

  constructor() {
    this._id = "";
    this._x = 0;
    this._y = 0;
    this._direction = 0;
    this._eyeX = 0;
    this._eyeY = 0;
    this._size = 0;
    this._energy = 0;
    this._brain = new BrainClientDto();
    this._population = 0;
    this._generation = 0;
  }
}
