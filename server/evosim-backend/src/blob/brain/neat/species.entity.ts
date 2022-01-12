import { ClientEntity } from './client.entity';
import { GenomeEntity } from './genome/genome.entity';
import { NeatConfig } from './neat.config';

//Multiple per population
export class SpeciesEntity {
  private _clients: Array<ClientEntity>;
  private _representative: ClientEntity;
  private _score: number;

  constructor(representative: ClientEntity) {
    this._representative = representative;
    this._clients = [];
  }

  /**
   * Adds client to species if distance is fitting. If distance is too big false is returned.
   * @param client client to add
   */
  public put(client: ClientEntity): boolean {
    if (client.distance(this._representative) < NeatConfig.CP) {
      this.forcePut(client);
      return true;
    }
    return false;
  }

  /**
   * Adds client to species.
   * @param client client to add
   */
  public forcePut(client: ClientEntity): void {
    client.species = this;
    this.clients.push(client);
  }

  /**
   * Removes species of all the clients
   */
  public goExtinct(): void {
    //Remove species of all the clients
    for (const c of this.clients) {
      c.species = null;
    }
  }

  /**
   * Evaluates average score of species
   */
  public evaluateScore(): void {
    //Sum up the score of all the clients of this species
    let v = 0;
    for (const c of this.clients) {
      v += c.score();
    }

    //Calculate average score of all the clients of this species and set the result to the species score
    this._score = v / this.clients.length;
  }

  /**
   * Resets species.
   */
  public reset(): void {
    //Set a new representative of this species randomly from all the clients of this species
    this._representative = this.clients.at(
      Math.random() * (this.clients.length - 1),
    );

    //Removes the species of all the clients of this species and clears the client array of this species
    for (const c of this.clients) {
      c.species = null;
    }
    this.clients = [];

    //Add representative to the clients of this species and add species to representative. Reset score.
    this.clients.push(this._representative);
    this._representative.species = this;
    this._score = 0;
  }

  /**
   * Kills a certain percentage of the species clients.
   * @param percentage percentage to kill
   */
  public kill(percentage: number): void {
    //Sorting clients of species from worst to best depending on their score
    this.clients.sort((a, b) => {
      return a.score() - b.score();
    });
    //Calculate amount of clients to kill from percentage
    const amount = Math.floor(percentage * this.clients.length);
    //Kill worst 'amount' clients
    for (let i = 0; i < amount; i++) {
      this.clients[i].species = null;
      this.clients.splice(0, 1);
    }
  }

  /**
   * Breeds a new Crossover out of two of the clients of this species.
   */
  public breed(): GenomeEntity {
    //Get two random clients of this species
    const c1 = this.clients.at(Math.random() * (this.clients.length - 1));
    const c2 = this.clients.at(Math.random() * (this.clients.length - 1));

    //Generate and return crossover of these clients
    if (c1.score > c2.score) {
      return GenomeEntity.crossover(c1.genome, c2.genome);
    } else {
      return GenomeEntity.crossover(c2.genome, c1.genome);
    }
  }

  /**
   * Returns number of clients of this species
   */
  public size(): number {
    return this.clients.length;
  }

  get clients(): Array<ClientEntity> {
    return this._clients;
  }

  set clients(value: Array<ClientEntity>) {
    this._clients = value;
  }

  get representative(): ClientEntity {
    return this._representative;
  }

  set representative(value: ClientEntity) {
    this._representative = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }
}
