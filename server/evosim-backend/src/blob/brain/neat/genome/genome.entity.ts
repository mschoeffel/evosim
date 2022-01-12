import { NodeGeneEntity } from './node-gene.entity';
import { ConnectionGeneEntity } from './connection-gene.entity';
import { MultiLayerNetEntity } from '../../net/multi-layer-net.entity';
import { NodeGenomeType } from './node-genome-type.enum';
import { MultiLayerNetFactory } from '../../net/multi-layer-net.factory';
import { BlobActions } from '../../../blob-actions.entity';
import { BlobSenses } from '../../../blob-senses.entity';
import { HiddenNodeEntity } from '../../net/nodes/hidden-node.entity';
import { InputNodeEntity } from '../../net/nodes/input-node.entity';
import { OutputNodeEntity } from '../../net/nodes/output-node.entity';
import { PopulationNeatEntity } from '../../../../population/population-neat.entity';
import { NeatConfig } from '../neat.config';

export class GenomeEntity {
  private readonly _connections: Array<ConnectionGeneEntity>;
  private readonly _nodes: Array<NodeGeneEntity>;
  private readonly _neatPopulation: PopulationNeatEntity;

  constructor(neatPopulation: PopulationNeatEntity) {
    this._connections = [];
    this._nodes = [];
    this._neatPopulation = neatPopulation;
  }

  /**
   * Calculates the distance between the current and given genome
   * @param genomeToCompareTo genome to compare to
   */
  public distance(genomeToCompareTo: GenomeEntity): number {
    let g1: GenomeEntity = this;
    let g2: GenomeEntity = genomeToCompareTo;

    //Swap if this doesn't have the highest innovation number
    let highestInnovationNumberGenomeThis = 0;
    if (g1.connections.length !== 0) {
      highestInnovationNumberGenomeThis = this.connections.at(
        this.connections.length - 1,
      ).innovationNumber;
    }

    let highestInnovationNumberGenomeToCompareTo = 0;
    if (g2.connections.length !== 0) {
      highestInnovationNumberGenomeToCompareTo =
        genomeToCompareTo.connections.at(
          genomeToCompareTo.connections.length - 1,
        ).innovationNumber;
    }

    if (
      highestInnovationNumberGenomeThis <
      highestInnovationNumberGenomeToCompareTo
    ) {
      g1 = genomeToCompareTo;
      g2 = this;
    }

    let indexG1 = 0;
    let indexG2 = 0;
    let countDisjoint = 0;
    let weightDifference = 0;
    let similarGenes = 0;

    while (indexG1 < g1.connections.length && indexG2 < g2.connections.length) {
      const connectionGeneG1 = g1.connections.at(indexG1);
      const connectionGeneG2 = g2.connections.at(indexG2);
      const innovationNumberConnectionGeneG1 =
        connectionGeneG1.innovationNumber;
      const innovationNumberConnectionGeneG2 =
        connectionGeneG2.innovationNumber;

      if (
        innovationNumberConnectionGeneG1 === innovationNumberConnectionGeneG2
      ) {
        //Similar Gene
        weightDifference += Math.abs(
          connectionGeneG1.weight - connectionGeneG2.weight,
        );
        similarGenes++;
        indexG1++;
        indexG2++;
      } else if (
        innovationNumberConnectionGeneG1 > innovationNumberConnectionGeneG2
      ) {
        //Disjoint gene of GenomeToCompareTo
        countDisjoint++;
        indexG2++;
      } else {
        //Disjoint gene of This
        countDisjoint++;
        indexG1++;
      }
    }
    if (similarGenes !== 0) {
      weightDifference /= similarGenes;
    }
    const countExcess = g1.connections.length - indexG1;

    let N = Math.max(g1.connections.length, g2.connections.length);
    if (N < 20) {
      N = 1;
    }

    return (
      (NeatConfig.C1 * countDisjoint) / N +
      (NeatConfig.C2 * countExcess) / N +
      NeatConfig.C3 * weightDifference
    );
  }

  public mutate(): void {
    if (NeatConfig.PROBABILITY_MUTATE_LINK > Math.random()) {
      this.mutateLink();
    }
    if (NeatConfig.PROBABILITY_MUTATE_NODE > Math.random()) {
      this.mutateNode();
    }
    if (NeatConfig.PROBABILITY_MUTATE_WEIGHT_SHIFT > Math.random()) {
      this.mutateWeightShift();
    }
    if (NeatConfig.PROBABILITY_MUTATE_WEIGHT_RANDOM > Math.random()) {
      this.mutateWeightRandom();
    }
    if (NeatConfig.PROBABILITY_MUTATE_TOGGLE_LINK > Math.random()) {
      this.mutateLinkToggle();
    }
  }

  /**
   * Mutates a new connection between two random nodes
   */
  public mutateLink(): void {
    for (let i = 0; i < 100; i++) {
      const a = this.getRandomNode();
      const b = this.getRandomNode();

      if (a.x === b.x) {
        continue;
      }

      let connection;
      if (a.x < b.x) {
        connection = new ConnectionGeneEntity(a, b);
      } else {
        connection = new ConnectionGeneEntity(b, a);
      }

      if (this.connectionExists(connection)) {
        continue;
      }

      connection = this.neatPopulation.getConnection(
        connection.source,
        connection.destination,
      );
      connection.weight =
        (Math.random() * 2 - 1) * NeatConfig.WEIGHT_RANDOM_STRENGTH;
      this.connections.push(connection);
      return;
    }
  }

  /**
   * Mutates a random node in the middle of a connection an adds two new connections
   */
  public mutateNode(): void {
    const connection = this.getRandomConnection();
    if (connection !== null) {
      const from = connection.source;
      const to = connection.destination;
      const replaceIndex = this.neatPopulation.getReplaceIndex(from, to);
      let middle;
      if (replaceIndex === 0 || replaceIndex === undefined) {
        middle = this.neatPopulation.getNewNode(NodeGenomeType.HIDDEN);
        middle.x = (from.x + to.x) / 2;
        middle.y = (from.y + to.y) / 2;
        this.neatPopulation.setReplaceIndex(from, to, middle.innovationNumber);
      } else {
        middle = this.neatPopulation.getNodeByInnovationNumber(replaceIndex);
      }

      const con1 = this.neatPopulation.getConnection(from, middle);
      const con2 = this.neatPopulation.getConnection(middle, to);

      con1.weight = 1;
      con2.weight = connection.weight;
      con2.enabled = connection.enabled;

      this.removeConnection(connection);
      this.connections.push(con1);
      this.connections.push(con2);
      this.nodes.push(middle);
    }
  }

  /**
   * Mutates the weight of a link and shifts it randomly
   */
  public mutateWeightShift(): void {
    const c = this.getRandomConnection();
    if (c !== null) {
      c.weight += (Math.random() * 2 - 1) * NeatConfig.WEIGHT_SHIFT_STRENGTH;
    }
  }

  /**
   * Mutates the weight of a link and sets it randomly
   */
  public mutateWeightRandom(): void {
    const c = this.getRandomConnection();
    if (c !== null) {
      c.weight = (Math.random() * 2 - 1) * NeatConfig.WEIGHT_RANDOM_STRENGTH;
    }
  }

  /**
   * Mutates the enabled state of a link
   */
  public mutateLinkToggle(): void {
    const c = this.getRandomConnection();
    if (c !== null) {
      c.enabled = !c.enabled;
    }
  }

  /**
   * Creates a new Genome
   * G1 should have the higher score
   * * take all genes of g1
   * * if there is a genome that is also in g2 choose randomly 50/50
   * * do not take disjoint genes of g2
   * * take excess genes of g1 if they exist
   * @param g1
   * @param g2
   */
  public static crossover(g1: GenomeEntity, g2: GenomeEntity): GenomeEntity {
    const neat = g1.neatPopulation;
    const genome = neat.emptyGenome();

    let indexG1 = 0;
    let indexG2 = 0;

    //Add Similar and Disjoint Genes
    while (indexG1 < g1.connections.length && indexG2 < g2.connections.length) {
      const connectionGeneG1 = g1.connections.at(indexG1);
      const connectionGeneG2 = g2.connections.at(indexG2);
      const innovationNumberConnectionGeneG1 =
        connectionGeneG1.innovationNumber;
      const innovationNumberConnectionGeneG2 =
        connectionGeneG2.innovationNumber;

      if (
        innovationNumberConnectionGeneG1 === innovationNumberConnectionGeneG2
      ) {
        //Similar Gene
        if (Math.random() > 0.5) {
          genome.connections.push(
            PopulationNeatEntity.copyConnection(connectionGeneG1),
          );
        } else {
          genome.connections.push(
            PopulationNeatEntity.copyConnection(connectionGeneG2),
          );
        }
        indexG1++;
        indexG2++;
      } else if (
        innovationNumberConnectionGeneG1 > innovationNumberConnectionGeneG2
      ) {
        //Disjoint gene of GenomeToCompareTo
        //Multiple, different opinions on the following line:
        //genome.connections.add(Neat.copyConnection(connectionGeneG2));
        indexG2++;
      } else {
        //Disjoint gene of This
        genome.connections.push(
          PopulationNeatEntity.copyConnection(connectionGeneG1),
        );
        indexG1++;
      }
    }

    //Add Excess Genes
    while (indexG1 < g1.connections.length) {
      const connectionGeneG1 = g1.connections.at(indexG1);
      genome.connections.push(
        PopulationNeatEntity.copyConnection(connectionGeneG1),
      );
      indexG1++;
    }

    //Copy Nodes
    for (const c of genome.connections) {
      if (!genome.nodeExists(c.source)) {
        genome.nodes.push(c.source);
      }
      if (!genome.nodeExists(c.destination)) {
        genome.nodes.push(c.destination);
      }
    }

    return genome;
  }

  /**
   * Removes the connection from the connection pool if it exits within
   * @param connectionToRemove Connection to remove
   */
  private removeConnection(connectionToRemove: ConnectionGeneEntity): void {
    for (let i = 0; i < this.connections.length; i++) {
      const connection = this.connections[i];
      if (GenomeEntity.connectionIsSame(connection, connectionToRemove)) {
        this.connections.splice(i, 1);
      }
    }
  }

  /**
   * Checks if the given connection already exists within the connection pool
   * @param connectionToLookFor Connection to look for
   * @return Boolean if the given connection already exists within the connection pool
   */
  private connectionExists(connectionToLookFor: ConnectionGeneEntity): boolean {
    for (const connection of this.connections) {
      if (GenomeEntity.connectionIsSame(connection, connectionToLookFor)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if two connections are the same depending on their source and destination node innovation numbers.
   * @param connection1 Connection One
   * @param connection2 Connection Two
   * @return Boolean if the two given connections are the same
   */
  private static connectionIsSame(
    connection1: ConnectionGeneEntity,
    connection2: ConnectionGeneEntity,
  ): boolean {
    return (
      connection1.source.innovationNumber ===
        connection2.source.innovationNumber &&
      connection1.destination.innovationNumber ===
        connection2.destination.innovationNumber
    );
  }

  /**
   * Returns a random Connection of the connection pool
   */
  private getRandomConnection(): ConnectionGeneEntity | null {
    if (this.connections.length > 0) {
      return this.connections[
        Math.round(Math.random() * (this.connections.length - 1))
      ];
    }
    return null;
  }

  /**
   * Returns a random Node of the node pool
   */
  private getRandomNode(): NodeGeneEntity | null {
    if (this.nodes.length > 0) {
      return this.nodes[Math.round(Math.random() * (this.nodes.length - 1))];
    }
    return null;
  }

  private nodeExists(nodeToLookFor: NodeGeneEntity): boolean {
    for (const node of this.nodes) {
      if (GenomeEntity.nodeIsSame(node, nodeToLookFor)) {
        return true;
      }
    }
    return false;
  }

  private static nodeIsSame(
    node1: NodeGeneEntity,
    node2: NodeGeneEntity,
  ): boolean {
    return node1.innovationNumber === node2.innovationNumber;
  }

  private inputNodes(): Array<NodeGeneEntity> {
    const inputNodes = [];
    for (const node of this.nodes) {
      if (node.type === NodeGenomeType.INPUT) {
        inputNodes.push(node);
      }
    }
    return inputNodes;
  }

  private ouputNodes(): Array<NodeGeneEntity> {
    const inputNodes = [];
    for (const node of this.nodes) {
      if (node.type === NodeGenomeType.OUTPUT) {
        inputNodes.push(node);
      }
    }
    return inputNodes;
  }

  private hiddenNodes(): Array<NodeGeneEntity> {
    const inputNodes = [];
    for (const node of this.nodes) {
      if (node.type === NodeGenomeType.HIDDEN) {
        inputNodes.push(node);
      }
    }
    return inputNodes;
  }

  public toMultilayerNet(): MultiLayerNetEntity {
    const net = MultiLayerNetFactory.newEmptyMultiLayerNet(
      this.neatPopulation.activationStrategy,
    );
    net.initializeInput(BlobSenses.count());
    net.initializeOutput(BlobActions.count());
    const nodeMap = new Map<
      number,
      InputNodeEntity | OutputNodeEntity | HiddenNodeEntity
    >();

    for (let i = 0; i < BlobSenses.count(); i++) {
      nodeMap.set(this.inputNodes()[i].innovationNumber, net.inputNodes[i]);
    }

    for (let i = 0; i < BlobActions.count(); i++) {
      nodeMap.set(this.ouputNodes()[i].innovationNumber, net.outputNodes[i]);
    }

    const hiddenNodes = this.hiddenNodes();
    if (hiddenNodes.length > 1) {
      hiddenNodes.sort((n1, n2) => {
        return n1.x - n2.x;
      });
    }

    let layer = 0;
    if (hiddenNodes.length > 0) {
      let x = hiddenNodes[0].x;
      net.addNewHiddenLayer();
      for (const node of hiddenNodes) {
        if (x !== node.x) {
          x = node.x;
          layer++;
          net.addNewHiddenLayer();
        }
        const n = net.addNewHiddenNodeToLayer(layer);
        nodeMap.set(node.innovationNumber, n);
      }
    }

    for (const connection of this.connections) {
      const nodeFrom = nodeMap.get(connection.source.innovationNumber);
      const nodeTo = nodeMap.get(connection.destination.innovationNumber);
      if (nodeFrom !== undefined && nodeTo !== undefined) {
        if (
          (nodeFrom instanceof InputNodeEntity ||
            nodeFrom instanceof HiddenNodeEntity) &&
          (nodeTo instanceof OutputNodeEntity ||
            nodeTo instanceof HiddenNodeEntity)
        ) {
          const con = net.addConnectionBetweenTwoNodes(nodeFrom, nodeTo);
          con.enabled = connection.enabled;
          con.weight = connection.weight;
        }
      }
    }
    return net;
  }

  get connections(): Array<ConnectionGeneEntity> {
    return this._connections;
  }

  get nodes(): Array<NodeGeneEntity> {
    return this._nodes;
  }

  get neatPopulation(): PopulationNeatEntity {
    return this._neatPopulation;
  }
}
