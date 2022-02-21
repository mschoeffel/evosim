import { FigureEntity } from './figure/figure.entity';
import { OptimizationStrategy } from './figure/brain/net/optimization/optimization.strategy';
import { ActivationStrategy } from './figure/brain/net/nodes/activation/activation.strategy';
import { MapEntity } from '../map/map.entity';
import { BrainEntity } from './figure/brain/brain.entity';
import { MultiLayerNetFactory } from './figure/brain/net/multi-layer-net.factory';
import { BoardConfig } from '../board.config';
import { GamestateEntity } from '../gamestate.entity';
import { PopulationStatsEntity } from './population-stats.entity';
import { GenerationDumpService } from '../../dump/generation-dump.service';
import { PopulationGenerationStatsEntity } from './population-generation-stats.entity';
import { TileType } from '../map/tile/tile-type.enum';

export class PopulationEntity {
  protected readonly _index: number;
  protected readonly _figures: Array<FigureEntity>;
  protected readonly _optimizationStrategy: OptimizationStrategy;
  protected readonly _activationStrategy: ActivationStrategy;
  protected readonly _netSchema: Array<number>;
  protected readonly _size: number;
  protected readonly _map: MapEntity;
  protected readonly _gamestate: GamestateEntity;
  private readonly _generationDumpService: GenerationDumpService;
  private _generation: number;
  private _overtime: number;

  constructor(
    index: number,
    optimizationStrategy: OptimizationStrategy,
    activationStrategy: ActivationStrategy,
    netSchema: Array<number>,
    size: number,
    map: MapEntity,
    gamestate: GamestateEntity,
    generationDumpService: GenerationDumpService,
  ) {
    this._index = index;
    this._optimizationStrategy = optimizationStrategy;
    this._activationStrategy = activationStrategy;
    this._netSchema = netSchema;
    this._size = size;
    this._figures = [];
    this._map = map;
    this._gamestate = gamestate;
    this._generation = 0;
    this._generationDumpService = generationDumpService;
    this._overtime = 0;
    for (let i = 0; i < this.size; i++) {
      const brain = new BrainEntity(
        MultiLayerNetFactory.newMultiLayerNet(
          this._netSchema,
          this._activationStrategy,
        ),
      );
      this.addNewFigureToPopulation(
        new FigureEntity(
          this._map,
          this._index,
          brain,
          0,
          0,
          this._optimizationStrategy.name,
          this._activationStrategy.name,
        ),
      );
    }
  }

  protected getGenerationStats(): PopulationGenerationStatsEntity {
    let energySum = 0;
    let energyMax = 0;
    let tickSum = 0;
    let tickMax = 0;
    let figureCount = 0;
    for (const figure of this.figures) {
      energySum += figure.energy;
      tickSum += figure.ticksAlive;
      if (figure.ticksAlive > tickMax) {
        tickMax = figure.ticksAlive;
      }
      if (figure.energy > energyMax) {
        energyMax = figure.energy;
      }
      figureCount++;
    }
    const stats = new PopulationGenerationStatsEntity();
    stats.generation = this.generation;
    stats.avgEnergy = Math.round(energySum / figureCount);
    stats.maxEnergy = energyMax;
    stats.avgLifetime = Math.round(tickSum / figureCount);
    stats.maxLifetime = tickMax;
    stats.population = this.index;
    stats.tick = this.gamestate.currentTick;
    stats.run = this.gamestate.run;
    return stats;
  }

  public getStats(): PopulationStatsEntity {
    let generationSum = 0;
    let energySum = 0;
    let energyMax = 0;
    let tickSum = 0;
    let tickMax = 0;
    let figureCount = 0;
    for (const figure of this.figures) {
      generationSum += figure.generation;
      energySum += figure.energy;
      tickSum += figure.ticksAlive;
      if (figure.ticksAlive > tickMax) {
        tickMax = figure.ticksAlive;
      }
      if (figure.energy > energyMax) {
        energyMax = figure.energy;
      }
      figureCount++;
    }
    const stats = new PopulationStatsEntity();
    stats.avgGeneration = Math.round(generationSum / figureCount);
    stats.avgEnergy = Math.round(energySum / figureCount);
    stats.maxEnergy = energyMax;
    stats.avgLifetime = Math.round(tickSum / figureCount);
    stats.maxLifetime = tickMax;
    return stats;
  }

  public addEvolvedNewFigureToPopulation(
    figureDied: FigureEntity,
    fittestFigure: FigureEntity,
  ): FigureEntity {
    const net = this.optimizationStrategy.evolve(
      figureDied,
      fittestFigure,
      this,
    );
    const brain = new BrainEntity(net);

    const figure = new FigureEntity(
      this.map,
      this.index,
      brain,
      this.gamestate.currentTick,
      this.generation,
      this.optimizationStrategy.name,
      this.activationStrategy.name,
    );
    this.addNewFigureToPopulation(figure);
    return figure;
  }

  protected addNewFigureToPopulation(figure: FigureEntity): void {
    this.figures.push(figure);
  }

  public getFittestFigureOfPopulation(): FigureEntity | undefined {
    let score = 0;
    let fittestFigure = null;
    for (const figure of this.figures) {
      if (figure.score() > score) {
        score = figure.score();
        fittestFigure = figure;
      }
    }
    return fittestFigure;
  }

  public tick(): void {
    for (const figure of this.figures) {
      if (figure.alive) {
        figure.addTickAlive();
        figure.act();
        figure.energy -= BoardConfig.TICK_ENERGY_COST;
        this.checkFigure(figure);
      }
    }
    let figuresAlive = this.getFiguresAlive();
    if (figuresAlive.length > 0) {
      if (
        BoardConfig.MAX_LIFETIME > 0 &&
        figuresAlive[0].ticksAlive > BoardConfig.MAX_LIFETIME
      ) {
        for (const figureAlive of figuresAlive) {
          figureAlive.alive = false;
        }
        figuresAlive = [];
      } else {
        if (figuresAlive.length <= BoardConfig.COUNT_FIGURES_OVERTIME) {
          if (this.overtime >= BoardConfig.MAX_OVERTIME) {
            for (const figureAlive of figuresAlive) {
              figureAlive.alive = false;
            }
            figuresAlive = [];
          }
          this.overtime++;
        }
      }
    }
    if (figuresAlive.length <= 0) {
      const stats = this.getGenerationStats();
      this.gamestate.stats.push(stats);
      if (BoardConfig.GENERATION_DUMP) {
        this.generationDumpService.createDump(stats);
      }
      this.generation++;
      this.evolve();
      this.overtime = 0;
    }
  }

  protected evolve(): void {
    const fittestFigure = this.getFittestFigureOfPopulation();
    for (let i = 0; i < this.size; i++) {
      this.addEvolvedNewFigureToPopulation(this.figures[i], fittestFigure);
      this.removeFigureFromPopulation(this.figures[i]);
    }
  }

  public stop(): void {
    const stats = this.getGenerationStats();
    this.gamestate.stats.push(stats);
    if (BoardConfig.GENERATION_DUMP) {
      this.generationDumpService.createDump(stats);
    }
  }

  protected getFiguresAlive(): Array<FigureEntity> {
    const i = [];
    for (const figure of this.figures) {
      if (figure.alive) {
        i.push(figure);
      }
    }
    return i;
  }

  protected checkFigure(figure: FigureEntity): void {
    if (Number.isNaN(figure.energy) || figure.energy <= 0) {
      figure.alive = false;
    } else {
      const tile = this.map.getTileAt(figure.positionX, figure.positionY);
      if (tile === undefined || tile.type === TileType.WATER) {
        figure.alive = false;
      }
    }
  }

  public removeFigureFromPopulation(figure: FigureEntity): void {
    const i = this.figures.findIndex((f) => f.id == figure.id);
    this.figures.splice(i, 1);
  }

  get figures(): Array<FigureEntity> {
    return this._figures;
  }

  get index(): number {
    return this._index;
  }

  get size(): number {
    return this._size;
  }

  get optimizationStrategy(): OptimizationStrategy {
    return this._optimizationStrategy;
  }

  get activationStrategy(): ActivationStrategy {
    return this._activationStrategy;
  }

  get netSchema(): Array<number> {
    return this._netSchema;
  }

  get map(): MapEntity {
    return this._map;
  }

  get gamestate(): GamestateEntity {
    return this._gamestate;
  }

  get generation(): number {
    return this._generation;
  }

  set generation(value: number) {
    this._generation = value;
  }

  get generationDumpService(): GenerationDumpService {
    return this._generationDumpService;
  }

  get overtime(): number {
    return this._overtime;
  }

  set overtime(value: number) {
    this._overtime = value;
  }
}
