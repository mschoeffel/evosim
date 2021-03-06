import { PopulationEntity } from './population.entity';
import { OptimizationStrategy } from './figure/brain/net/optimization/optimization.strategy';
import { ActivationStrategy } from './figure/brain/net/nodes/activation/activation.strategy';
import { MapEntity } from '../map/map.entity';
import { GamestateEntity } from '../gamestate.entity';
import { FigureEntity } from './figure/figure.entity';
import { BrainEntity } from './figure/brain/brain.entity';
import { ConnectionGeneEntity } from './figure/brain/neat/genome/connection-gene.entity';
import { NodeGeneEntity } from './figure/brain/neat/genome/node-gene.entity';
import { ClientEntity } from './figure/brain/neat/client.entity';
import { SpeciesEntity } from './figure/brain/neat/species.entity';
import { FigureSenses } from './figure/figure-senses.entity';
import { FigureActions } from './figure/figure-actions.entity';
import { NodeGenomeType } from './figure/brain/neat/genome/node-genome-type.enum';
import { GenomeEntity } from './figure/brain/neat/genome/genome.entity';
import { RandomSelector } from '../../utils/random-selector';
import { NeatConfig } from './figure/brain/neat/neat.config';
import { GenerationDumpService } from '../../dump/generation-dump.service';

export class PopulationNeatEntity extends PopulationEntity {
  private readonly _allConnectionGenes: Array<ConnectionGeneEntity>;
  private readonly _allNodeGenes: Array<NodeGeneEntity>;
  private readonly _clients: Array<ClientEntity>;
  private readonly _species: Array<SpeciesEntity>;

  private readonly _inputSize: number;
  private readonly _outputSize: number;
  private readonly _maxClients: number;

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
    super(
      index,
      optimizationStrategy,
      activationStrategy,
      netSchema,
      size,
      map,
      gamestate,
      generationDumpService,
    );

    this._inputSize = FigureSenses.count();
    this._outputSize = FigureActions.count();
    this._maxClients = size;
    this._allConnectionGenes = [];
    this._allNodeGenes = [];
    this._clients = [];
    this._species = [];

    //Generate input nodes
    for (let i = 0; i < this._inputSize; i++) {
      const n = this.getNewNode(NodeGenomeType.INPUT);
      n.x = 0.1;
      n.y = i * 100;
    }

    //Generate output nodes
    for (let i = 0; i < this._outputSize; i++) {
      const n = this.getNewNode(NodeGenomeType.OUTPUT);
      n.x = 0.9;
      n.y = i * 100;
    }

    //Generate clients
    for (let i = 0; i < this._maxClients; i++) {
      const c = new ClientEntity(
        this.emptyGenome(),
        this._map,
        this._index,
        0,
        0,
        this._optimizationStrategy.name,
        this._activationStrategy.name,
      );
      this._clients.push(c);
    }
  }

  /**
   * Creates a new empty genome
   */
  public emptyGenome(): GenomeEntity {
    const g = new GenomeEntity(this);

    for (let i = 0; i < this.inputSize + this.outputSize; i++) {
      g.nodes.push(this.getNodeByInnovationNumber(i + 1));
    }

    return g;
  }

  /**
   * Copies a connection
   * @param connection Connection to copy
   */
  public static copyConnection(
    connection: ConnectionGeneEntity,
  ): ConnectionGeneEntity {
    const c = new ConnectionGeneEntity(
      connection.source,
      connection.destination,
    );
    c.innovationNumber = connection.innovationNumber;
    c.enabled = connection.enabled;
    c.weight = connection.weight;
    return c;
  }

  /**
   * Returns a new Connection with the given source and destination node and innovation number if already known, otherwise a new one is generated and connection added to the pool
   * @param nodeSource
   * @param nodeDestination
   */
  public getConnection(
    nodeSource: NodeGeneEntity,
    nodeDestination: NodeGeneEntity,
  ): ConnectionGeneEntity {
    const connectionOfPool = this.getConnectionFromPool(
      nodeSource,
      nodeDestination,
    );
    let connection;
    if (connectionOfPool !== null) {
      connection = new ConnectionGeneEntity(nodeSource, nodeDestination);
      connection.innovationNumber = connectionOfPool.innovationNumber;
    } else {
      connection = new ConnectionGeneEntity(nodeSource, nodeDestination);
      connection.innovationNumber = this.allConnectionGenes.length + 1;
      this.allConnectionGenes.push(connection);
    }
    return connection;
  }

  /**
   * Returns the connection of the pool with the given source and destination node or if non existing null
   * @param nodeSource source node
   * @param nodeDestination destination node
   * @private
   */
  private getConnectionFromPool(
    nodeSource: NodeGeneEntity,
    nodeDestination: NodeGeneEntity,
  ): ConnectionGeneEntity | null {
    for (const connection of this.allConnectionGenes) {
      if (
        connection.source.innovationNumber === nodeSource.innovationNumber &&
        connection.destination.innovationNumber ===
          nodeDestination.innovationNumber
      ) {
        return connection;
      }
    }
    return null;
  }

  public setReplaceIndex(
    nodeSource: NodeGeneEntity,
    nodeDestination: NodeGeneEntity,
    index: number,
  ): void {
    const t = this.allConnectionGenes.find(
      (i) =>
        i.source.innovationNumber === nodeSource.innovationNumber &&
        i.destination.innovationNumber === nodeDestination.innovationNumber,
    );
    if (t !== undefined) {
      t.replacementIndex = index;
    }
  }

  public getReplaceIndex(
    nodeSource: NodeGeneEntity,
    nodeDestination: NodeGeneEntity,
  ): number {
    const t = this.allConnectionGenes.find(
      (i) =>
        i.source.innovationNumber === nodeSource.innovationNumber &&
        i.destination.innovationNumber === nodeDestination.innovationNumber,
    );
    if (t !== undefined) {
      return t.replacementIndex;
    }
    return 0;
  }

  /**
   * Returns the node of the node pool with the given innovation number or a new node that gets a new innovation number and added to the pool
   * @param innovationNumber innovation number
   */
  public getNodeByInnovationNumber(innovationNumber: number): NodeGeneEntity {
    const nodeGene = this.allNodeGenes.find(
      (n) => n.innovationNumber === innovationNumber,
    );
    if (nodeGene !== undefined) {
      return nodeGene;
    } else {
      return this.getNewNode(NodeGenomeType.HIDDEN);
    }
  }

  /**
   * Returns a new node with a new innovation number and adds it to the node pool
   */
  public getNewNode(type: NodeGenomeType): NodeGeneEntity {
    const n = new NodeGeneEntity(this.allNodeGenes.length + 1, type);
    this.allNodeGenes.push(n);
    return n;
  }

  /**
   * Main cycle function
   */
  override evolve(): void {
    this.generateSpecies();
    this.kill();
    this.removeExtinctSpecies();
    this.reproduceClients();
    this.mutate();
  }

  /**
   * Resets all species and assigns all the clients to the species or generates a new if no existing is fitting
   * @private
   */
  private generateSpecies(): void {
    //Reset all Species
    for (const species of this.species) {
      species.reset();
    }

    // Assign clients to species except representatives (they are already set)
    for (const client of this.clients) {
      if (client.species === null) {
        //Search for fitting species
        let foundFittingSpecies = false;
        for (const s of this.species) {
          if (s.put(client)) {
            foundFittingSpecies = true;
            break;
          }
        }
        //If no fitting species is found creating a new one with the client as representative
        if (!foundFittingSpecies) {
          this.species.push(new SpeciesEntity(client));
        }
      }
    }

    //Evaluate score of each species
    for (const species of this.species) {
      species.evaluateScore();
    }
  }

  /**
   * Kills percentage of the worst clients of each species
   * @private
   */
  private kill(): void {
    for (const species of this.species) {
      species.kill(1 - NeatConfig.SURVIVOR_RATE);
    }
  }

  /**
   * Removes species where only one or fewer clients exist
   * @private
   */
  private removeExtinctSpecies(): void {
    //Go through all the remaining species
    for (let i = this.species.length - 1; i >= 0; i--) {
      const species = this.species[i];
      //If the species has 1 or fewer clients
      if (species.size() <= 1) {
        //Remove species from all the clients
        species.goExtinct();
        //Remove species from the species array
        this.species.splice(i, 1);
      }
    }
  }

  /**
   * Gets all Clients without a species and adds them to other random species and breeds a new genome from the species for the client
   * @private
   */
  private reproduceClients(): void {
    //Add all species to a random selector
    const selector = new RandomSelector<SpeciesEntity>();
    for (const species of this.species) {
      selector.add(species, species.score);
    }

    //For each client
    for (const client of this.clients) {
      //If the client has no species
      if (client.species === null) {
        //Select a random species for the client
        const s = selector.random();
        //Breed a new Genome for the client from the selected species
        client.genome = s.breed();
        //Force client add to species
        s.forcePut(client);
      }
    }
  }

  /**
   * Mutate each client
   * @private
   */
  private mutate(): void {
    for (const c of this.clients) {
      c.mutate();
      c.figure = new FigureEntity(
        this.map,
        this.index,
        new BrainEntity(c.genome.toMultilayerNet()),
        this.gamestate.currentTick,
        this.generation,
        this.optimizationStrategy.name,
        this.activationStrategy.name,
      );
    }
  }

  override removeFigureFromPopulation(figure: FigureEntity) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].figure.id === figure.id) {
        this.clients.splice(i, 1);
      }
    }
  }

  override addNewFigureToPopulation(): void {
    //Do nothing
  }

  override get figures(): Array<FigureEntity> {
    const b = [];
    for (const client of this.clients) {
      b.push(client.figure);
    }
    return b;
  }

  get allConnectionGenes(): Array<ConnectionGeneEntity> {
    return this._allConnectionGenes;
  }

  get allNodeGenes(): Array<NodeGeneEntity> {
    return this._allNodeGenes;
  }

  get clients(): Array<ClientEntity> {
    return this._clients;
  }

  get species(): Array<SpeciesEntity> {
    return this._species;
  }

  get inputSize(): number {
    return this._inputSize;
  }

  get outputSize(): number {
    return this._outputSize;
  }

  get maxClients(): number {
    return this._maxClients;
  }
}
