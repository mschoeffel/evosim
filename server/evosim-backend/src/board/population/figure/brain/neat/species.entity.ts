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
    if (client.distance(this.representative) < NeatConfig.CP) {
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
    this.score = v / this.clients.length;
  }

  /**
   * Resets species. Wählt den Repräsentanten als bestes überlebendes Individuum
   */
  public reset(): void {
    // Wähle den besten Client als neuen Repräsentanten
    if (this.clients.length > 0) {
      this.representative = this.getElite();
    }
    // Entferne die Spezies-Zuordnung von allen Clients und leere die Liste
    for (const c of this.clients) {
      c.species = null;
    }
    this.clients = [];
    // Füge den Repräsentanten wieder hinzu und setze die Spezies
    if (this.representative) {
      this.clients.push(this.representative);
      this.representative.species = this;
    }
    this.score = 0;
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
      this.clients[0].species = null;
      this.clients.splice(0, 1);
    }
  }

  /**
   * Gibt das beste Individuum der Spezies zurück
   */
  public getElite(): ClientEntity {
    return this.clients.reduce(
      (best, curr) => (curr.score() > best.score() ? curr : best),
      this.clients[0],
    );
  }

  /**
   * Gibt einen Client proportional zur geteilten Fitness zurück (Roulette-Auswahl)
   */
  public selectParent(): ClientEntity {
    const totalFitness = this.clients.reduce((sum, c) => sum + c.sharedFitness, 0);
    let r = Math.random() * totalFitness;
    for (const c of this.clients) {
      r -= c.sharedFitness;
      if (r <= 0) return c;
    }
    return this.clients[0];
  }

  /**
   * Züchtet ein neues Genom aus zwei Eltern, bevorzugt die besten
   */
  public breed(): GenomeEntity {
    const parent1 = this.selectParent();
    const parent2 = this.selectParent();
    // Parent mit höherer Fitness als erster Parameter
    if (parent1.score() >= parent2.score()) {
      return GenomeEntity.crossover(parent1.genome, parent2.genome);
    } else {
      return GenomeEntity.crossover(parent2.genome, parent1.genome);
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
