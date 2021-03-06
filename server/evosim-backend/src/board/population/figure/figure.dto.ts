import { BrainDto } from './brain/brain.dto';

export class FigureDto {
  private _id: string;
  private _x: number;
  private _y: number;
  private _direction: number;
  private _eyeX: number;
  private _eyeY: number;
  private _size: number;
  private _energy: number;
  private _brain: BrainDto;
  private _population: number;
  private _generation: number;
  private _initTick: number;
  private _ticksAlive: number;
  private _algorithm: string;
  private _activation: string;
  private _alive: boolean;

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

  get direction(): number {
    return this._direction;
  }

  set direction(value: number) {
    this._direction = value;
  }

  get eyeX(): number {
    return this._eyeX;
  }

  set eyeX(value: number) {
    this._eyeX = value;
  }

  get eyeY(): number {
    return this._eyeY;
  }

  set eyeY(value: number) {
    this._eyeY = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get energy(): number {
    return this._energy;
  }

  set energy(value: number) {
    this._energy = value;
  }

  get brain(): BrainDto {
    return this._brain;
  }

  set brain(value: BrainDto) {
    this._brain = value;
  }

  get population(): number {
    return this._population;
  }

  set population(value: number) {
    this._population = value;
  }

  get generation(): number {
    return this._generation;
  }

  set generation(value: number) {
    this._generation = value;
  }

  get initTick(): number {
    return this._initTick;
  }

  set initTick(value: number) {
    this._initTick = value;
  }

  get ticksAlive(): number {
    return this._ticksAlive;
  }

  set ticksAlive(value: number) {
    this._ticksAlive = value;
  }

  get algorithm(): string {
    return this._algorithm;
  }

  set algorithm(value: string) {
    this._algorithm = value;
  }

  get activation(): string {
    return this._activation;
  }

  set activation(value: string) {
    this._activation = value;
  }

  get alive(): boolean {
    return this._alive;
  }

  set alive(value: boolean) {
    this._alive = value;
  }
}
