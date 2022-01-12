import { BlobEntity } from '../blob/blob.entity';
import { GamestateEntity } from './gamestate.entity';
import { MapEntity } from '../map/map.entity';
import { BoardConfig } from './board.config';
import { PopulationEntity } from '../population/population.entity';
import { MapConfig } from '../map/map.config';
import { PopulationNeatEntity } from '../population/population-neat.entity';
import { NeatOptimizationStrategy } from '../blob/brain/net/optimization/neat-optimization.strategy';
import { SigmoidActivationStrategy } from '../blob/brain/net/nodes/activation/sigmoid-activation.strategy';
import { PopulationTypeEnum } from '../population/population-type.enum';

export class BoardEntity {
  private readonly _map: MapEntity;
  private readonly _gamestate: GamestateEntity;
  private readonly _populations: Array<PopulationEntity>;

  constructor() {
    this._map = MapConfig.MAP;
    this._gamestate = new GamestateEntity(
      BoardConfig.POPULATIONS_DATA.length,
      BoardConfig.CREATURES_PER_POPULATION,
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
            BoardConfig.CREATURES_PER_POPULATION,
            this._map,
            this._gamestate,
          );
          break;
        case PopulationTypeEnum.NEAT:
          population = new PopulationNeatEntity(
            populationIndex,
            new NeatOptimizationStrategy(),
            new SigmoidActivationStrategy(),
            [],
            BoardConfig.CREATURES_PER_POPULATION,
            this._map,
            this._gamestate,
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

  public blobs(): Array<BlobEntity> {
    const blobs = [];
    for (const population of this.populations) {
      for (const blob of population.blobs) {
        blobs.push(blob);
      }
    }
    return blobs;
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
