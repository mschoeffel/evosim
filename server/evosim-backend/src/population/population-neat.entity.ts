import { PopulationEntity } from './population.entity';
import { OptimizationStrategy } from '../blob/brain/net/optimization/optimization.strategy';
import { ActivationStrategy } from '../blob/brain/net/nodes/activation/activation.strategy';
import { MapEntity } from '../map/map.entity';
import { GamestateEntity } from '../board/gamestate.entity';
import { BlobEntity } from '../blob/blob.entity';
import { BoardConfig } from '../board/board.config';
import { BrainEntity } from '../blob/brain/brain.entity';
import { ConnectionGeneEntity } from '../blob/brain/neat/genome/connection-gene.entity';
import { NodeGeneEntity } from '../blob/brain/neat/genome/node-gene.entity';
import { ClientEntity } from '../blob/brain/neat/client.entity';
import { SpeciesEntity } from '../blob/brain/neat/species.entity';
import { BlobSenses } from '../blob/blob-senses.entity';
import { BlobActions } from '../blob/blob-actions.entity';
import { NodeGenomeType } from '../blob/brain/neat/genome/node-genome-type.enum';
import { GenomeEntity } from '../blob/brain/neat/genome/genome.entity';
import { RandomSelector } from '../utils/random-selector';
import { NeatConfig } from '../blob/brain/neat/neat.config';
import { GenerationDumpService } from '../dump/generation-dump.service';

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

    this._inputSize = BlobSenses.count();
    this._outputSize = BlobActions.count();
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
  public evolve(): void {
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
        client.genome = s.breed(); // TODO: s === null
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
      c.creature = new BlobEntity(
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

  override tick() {
    for (const blob of this.blobs) {
      if (blob.alive) {
        blob.addTickAlive();
        blob.act();
        blob.energy -= BoardConfig.TICK_ENERGY_COST;
        this.checkBlob(blob);
      }
    }
    if (!this.stillOneAlive()) {
      if (BoardConfig.GENERATION_DUMP) {
        this.generationDumpService.createDump(this.getGenerationStats());
      }
      this.generation++;
      this.evolve();
    }
  }

  override checkBlob(blob: BlobEntity): void {
    if (Number.isNaN(blob.energy) || blob.energy <= 0) {
      blob.alive = false;
    } else {
      const tile = this.map.getTileAt(blob.positionX, blob.positionY);
      if (tile === undefined || tile.short === 'W') {
        blob.alive = false;
      }
    }
  }

  override removeBlobFromPopulation(blob: BlobEntity) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].creature.id === blob.id) {
        this.clients.splice(i, 1);
      }
    }
  }

  public getBlobs(): Array<BlobEntity> {
    const b = [];
    for (const client of this.clients) {
      b.push(client.creature);
    }
    return b;
  }

  override addNewBlobToPopulation(): void {
    //Do nothing
  }

  override get blobs(): Array<BlobEntity> {
    const b = [];
    for (const client of this.clients) {
      b.push(client.creature);
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
