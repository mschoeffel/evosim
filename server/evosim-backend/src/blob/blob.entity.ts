import { BrainEntity } from './brain/brain.entity';
import { v4 as uuid } from 'uuid';
import { BlobDto } from './blob.dto';
import { Utils } from '../utils/utils';
import { BlobSenses } from './blob-senses.entity';
import { MapEntity } from '../map/map.entity';

export class BlobEntity {
  private readonly _id: string;
  private readonly _generation: number;
  private readonly _population: number;
  private readonly _map: MapEntity;
  private readonly _initTick: number;
  private readonly _algorithm: string;
  private readonly _activation: string;
  private _brain: BrainEntity;
  private _positionX: number;
  private _positionY: number;
  private _energy: number;
  private _direction: number;
  private _ticksAlive: number;
  private _alive: boolean;

  private readonly INIT_ENERGY = 40;
  private readonly EYE_DISTANCE = 1;
  private readonly SIZE = 2;
  private readonly MOVE_ENERGY_MULTIPLIER = 1;
  private readonly ROTATE_ENERGY_MULTIPIER = 0.1;
  private readonly MAX_ENERGY = 100;
  private readonly MAX_MOVE = 3;
  private readonly MAX_EAT = 5;
  private readonly MAX_ROTATE = 30;

  constructor(
    map: MapEntity,
    population: number,
    brain: BrainEntity,
    initTick: number,
    generation: number,
    algorithm: string,
    activation: string,
  ) {
    this._id = uuid();
    this._population = population;
    this._brain = brain;
    this._generation = generation;
    this._energy = this.INIT_ENERGY;
    this._map = map;
    let x = Math.random() * (map.width - 1);
    let y = Math.random() * (map.width - 1);
    let tile = map.getTileAt(x, y);
    while (tile.energy < 0) {
      x = Math.random() * (map.width - 1);
      y = Math.random() * (map.width - 1);
      tile = map.getTileAt(x, y);
    }
    this._positionX = x;
    this._positionY = y;
    this._direction = Math.random() * 360;
    this._initTick = initTick;
    this._ticksAlive = 0;
    this._algorithm = algorithm;
    this._activation = activation;
    this._alive = true;
  }

  public act(): void {
    const senses = new BlobSenses();
    senses.currentEnergy = this.energy;
    senses.energyOfCurrentTile = this.map.getTileAt(
      this.positionX,
      this.positionY,
    ).energy;
    const eyeTile = this.map.getTileAt(
      this.positionX + Utils.sinDegree(this.direction) * this.EYE_DISTANCE,
      this.positionY - Utils.cosDegree(this.direction) * this.EYE_DISTANCE,
    );
    if (eyeTile === undefined) {
      senses.energyOfTileAhead = 0;
    } else {
      senses.energyOfTileAhead = eyeTile.energy;
    }
    const actions = this.brain.useBrain(senses);
    this.eat(actions.eatAmount);
    this.move(actions.moveAmount);
    this.rotate(actions.rotateAmount);
  }

  private eat(amount: number): void {
    if (amount > 0.0) {
      if (amount > this.MAX_EAT) {
        amount = this.MAX_EAT;
      }
      if (this.energy + amount > this.MAX_ENERGY) {
        amount = this.MAX_ENERGY - this.energy;
      }
      const tile = this.map.getTileAt(this.positionX, this.positionY);
      if (tile !== undefined && tile.energy > 0) {
        const possibleEnergy = tile.energy;
        if (possibleEnergy < amount) {
          amount = possibleEnergy;
        }
        tile.energy -= amount;
        this.energy += amount;
      }
    }
  }

  private rotate(amount: number): void {
    if (amount > this.MAX_ROTATE) {
      amount = this.MAX_ROTATE;
    } else if (amount < -this.MAX_ROTATE) {
      amount = -this.MAX_ROTATE;
    }
    let newRotation = (this.direction += amount);
    while (newRotation >= 360) {
      newRotation -= 360;
    }
    while (newRotation < 0) {
      newRotation += 360;
    }

    this.energy -= Math.abs(amount) * this.ROTATE_ENERGY_MULTIPIER;
    this.direction = newRotation;
  }

  public move(amount: number): void {
    if (amount > this.MAX_MOVE) {
      amount = this.MAX_MOVE;
    } else if (amount < -this.MAX_MOVE) {
      amount = -this.MAX_MOVE;
    }

    this.positionX += amount * Utils.sinDegree(this.direction);
    if (this.positionX < 0) {
      this.positionX = 0;
    } else if (this.positionX >= this.map.width) {
      this.positionX = this.map.width - 0.001;
    }
    this.positionY -= amount * Utils.cosDegree(this.direction);
    if (this.positionY < 0) {
      this.positionY = 0;
    } else if (this.positionY >= this.map.height) {
      this.positionY = this.map.height - 0.001;
    }
    this.energy -= Math.abs(amount) * this.MOVE_ENERGY_MULTIPLIER;
  }

  public score(): number {
    return this.ticksAlive;
  }

  public toDto(): BlobDto {
    const dto = new BlobDto();
    dto.id = this.id;
    dto.x = this.positionX;
    dto.y = this.positionY;
    dto.direction = this.direction;
    dto.eyeX =
      this.positionX + Utils.sinDegree(this.direction) * this.EYE_DISTANCE;
    dto.eyeY =
      this.positionY - Utils.cosDegree(this.direction) * this.EYE_DISTANCE;
    dto.size = this.SIZE;
    dto.energy = this.energy;
    dto.brain = this.brain.toDto();
    dto.population = this.population;
    dto.generation = this.generation;
    dto.initTick = this.initTick;
    dto.ticksAlive = this.ticksAlive;
    dto.algorithm = this.algorithm;
    dto.activation = this.activation;
    dto.alive = this.alive;
    return dto;
  }

  public addTickAlive(): void {
    this.ticksAlive++;
  }

  get id(): string {
    return this._id;
  }

  get generation(): number {
    return this._generation;
  }

  get population(): number {
    return this._population;
  }

  get map(): MapEntity {
    return this._map;
  }

  get initTick(): number {
    return this._initTick;
  }

  get algorithm(): string {
    return this._algorithm;
  }

  get activation(): string {
    return this._activation;
  }

  get brain(): BrainEntity {
    return this._brain;
  }

  set brain(value: BrainEntity) {
    this._brain = value;
  }

  get positionX(): number {
    return this._positionX;
  }

  set positionX(value: number) {
    this._positionX = value;
  }

  get positionY(): number {
    return this._positionY;
  }

  set positionY(value: number) {
    this._positionY = value;
  }

  get energy(): number {
    return this._energy;
  }

  set energy(value: number) {
    this._energy = value;
  }

  get direction(): number {
    return this._direction;
  }

  set direction(value: number) {
    this._direction = value;
  }

  get ticksAlive(): number {
    return this._ticksAlive;
  }

  set ticksAlive(value: number) {
    this._ticksAlive = value;
  }

  get alive(): boolean {
    return this._alive;
  }

  set alive(value: boolean) {
    this._alive = value;
  }
}
