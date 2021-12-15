export interface ActivationStrategyInterface {
  /**
   * Activation function of a neuron
   * @param n Input number to calculate from
   */
  evaluate(n: number): number;
}
