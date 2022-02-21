import { FigureEntity } from './population/figure/figure.entity';
import { GamestateEntity } from './gamestate.entity';
import { MapEntity } from './map/map.entity';
import { BoardConfig } from './board.config';
import { PopulationEntity } from './population/population.entity';
import { MapConfig } from './map/map.config';
import { PopulationNeatEntity } from './population/population-neat.entity';
import { PopulationTypeEnum } from './population/population-type.enum';
import { GenerationDumpService } from '../dump/generation-dump.service';

export class BoardEntity {
  private readonly _map: MapEntity;
  private readonly _gamestate: GamestateEntity;
  private readonly _populations: Array<PopulationEntity>;

  constructor(generationDumpService: GenerationDumpService) {
    this._map = MapConfig.MAP;
    this._gamestate = new GamestateEntity(
      BoardConfig.POPULATIONS_DATA.length,
      BoardConfig.FIGURES_PER_POPULATION,
    );

    this._populations = [];
    for (
      let populationIndex = 0;
      populationIndex < BoardConfig.POPULATIONS_DATA.length;
      populationIndex++
    ) {
      const populationData = BoardConfig.POPULATIONS_DATA.at(populationIndex);
      let population;
      switch (populationData.type) {
        case PopulationTypeEnum.SIMPLE:
          population = new PopulationEntity(
            populationIndex,
            populationData.optimization,
            populationData.activationFunction,
            populationData.netSchema,
            BoardConfig.FIGURES_PER_POPULATION,
            this._map,
            this._gamestate,
            generationDumpService,
          );
          break;
        case PopulationTypeEnum.NEAT:
          population = new PopulationNeatEntity(
            populationIndex,
            populationData.optimization,
            populationData.activationFunction,
            populationData.netSchema,
            BoardConfig.FIGURES_PER_POPULATION,
            this._map,
            this._gamestate,
            generationDumpService,
          );
          break;
      }
      this._populations.push(population);
    }
  }

  public runOneTick(): void {
    this.gamestate.addTick();
    this.map.regenerate();
    for (const population of this.populations) {
      population.tick();
    }
  }

  public stop(): void {
    for (const population of this.populations) {
      population.stop();
    }
  }

  public figures(): Array<FigureEntity> {
    const figures = [];
    for (const population of this.populations) {
      for (const figure of population.figures) {
        figures.push(figure);
      }
    }
    return figures;
  }

  get populations(): Array<PopulationEntity> {
    return this._populations;
  }

  get map(): MapEntity {
    return this._map;
  }

  get gamestate(): GamestateEntity {
    return this._gamestate;
  }
}
