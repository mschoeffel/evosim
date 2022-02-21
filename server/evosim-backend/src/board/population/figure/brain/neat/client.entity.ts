import { GenomeEntity } from './genome/genome.entity';
import { SpeciesEntity } from './species.entity';
import { FigureEntity } from '../../figure.entity';
import { MapEntity } from '../../../../map/map.entity';
import { BrainEntity } from '../brain.entity';

export class ClientEntity {
  private _genome: GenomeEntity;
  private _species: SpeciesEntity;
  private _figure: FigureEntity;
  private _generation: number;

  constructor(
    genome: GenomeEntity,
    map: MapEntity,
    population: number,
    initTick: number,
    generation: number,
    algorithm: string,
    activation: string,
  ) {
    this._genome = genome;
    this._species = null;
    this._generation = generation;
    this._figure = new FigureEntity(
      map,
      population,
      new BrainEntity(genome.toMultilayerNet()),
      initTick,
      generation,
      algorithm,
      activation,
    );
  }

  public score(): number {
    return this.figure.score();
  }

  /**
   * Calculates the distance between the genome of the current and the given client
   * @param clientToCompareTo
   */
  public distance(clientToCompareTo: ClientEntity): number {
    return this.genome.distance(clientToCompareTo.genome);
  }

  /**
   * Mutates the genome of the current client
   */
  public mutate(): void {
    this.genome.mutate();
  }

  get genome(): GenomeEntity {
    return this._genome;
  }

  set genome(value: GenomeEntity) {
    this._genome = value;
  }

  get species(): SpeciesEntity {
    return this._species;
  }

  set species(value: SpeciesEntity) {
    this._species = value;
  }

  get figure(): FigureEntity {
    return this._figure;
  }

  set figure(value: FigureEntity) {
    this._figure = value;
  }

  get generation(): number {
    return this._generation;
  }

  set generation(value: number) {
    this._generation = value;
  }
}
