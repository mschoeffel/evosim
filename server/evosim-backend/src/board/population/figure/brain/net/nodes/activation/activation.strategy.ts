export abstract class ActivationStrategy {
  private readonly _name: string;

  protected constructor(name: string) {
    this._name = name;
  }

  /**
   * Activation function of a neuron
   * @param n Input number to calculate from
   */
  public abstract evaluate(n: number): number;

  get name(): string {
    return this._name;
  }
}
