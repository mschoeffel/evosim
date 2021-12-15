import { BrainClient } from '~/models/brain.client';
import { ServerParsableInterface } from '~/models/serverparsable.interface';
import { BlobClientDto } from '~/models/dto/blob.client.dto';

export class BlobClient implements ServerParsableInterface<BlobClientDto> {
  constructor() {
    this._id = '';
    this._x = 0;
    this._y = 0;
    this._direction = 0;
    this._eyeX = 0;
    this._eyeY = 0;
    this._size = 0;
    this._energy = 0;
    this._brain = new BrainClient();
    this._population = 0;
    this._generation = 0;
    this._state = 'alive';
    this._initTick = 0;
    this._ticksAlive = 0;
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

  private _direction: number;

  get direction(): number {
    return this._direction;
  }

  set direction(value: number) {
    this._direction = value;
  }

  private _eyeX: number;

  get eyeX(): number {
    return this._eyeX;
  }

  set eyeX(value: number) {
    this._eyeX = value;
  }

  private _eyeY: number;

  get eyeY(): number {
    return this._eyeY;
  }

  set eyeY(value: number) {
    this._eyeY = value;
  }

  private _size: number;

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  private _energy: number;

  get energy(): number {
    return this._energy;
  }

  set energy(value: number) {
    this._energy = value;
  }

  private _brain: BrainClient;

  get brain(): BrainClient {
    return this._brain;
  }

  set brain(value: BrainClient) {
    this._brain = value;
  }

  private _population: number;

  get population(): number {
    return this._population;
  }

  set population(value: number) {
    this._population = value;
  }

  private _generation: number;

  get generation(): number {
    return this._generation;
  }

  set generation(value: number) {
    this._generation = value;
  }

  private _state: string;

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  private _initTick: number;

  get initTick(): number {
    return this._initTick;
  }

  set initTick(value: number) {
    this._initTick = value;
  }

  private _ticksAlive: number;

  get ticksAlive(): number {
    return this._ticksAlive;
  }

  set ticksAlive(value: number) {
    this._ticksAlive = value;
  }

  static parseFromDto(obj: BlobClientDto): BlobClient {
    const o = new BlobClient();
    o.parseFromDto(obj);
    return o;
  }

  parseFromDto(obj: BlobClientDto): void {
    this.id = obj._id;
    this.x = obj._x;
    this.y = obj._y;
    this.direction = obj._direction;
    this.eyeX = obj._eyeX;
    this.eyeY = obj._eyeY;
    this.size = obj._size;
    this.energy = obj._energy;
    this.brain.parseFromDto(obj._brain);
    this.population = obj._population;
    this.generation = obj._generation;
    this.initTick = obj._initTick;
    this.ticksAlive = obj._ticksAlive;
  }
}
