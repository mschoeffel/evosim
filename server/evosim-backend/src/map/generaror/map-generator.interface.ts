export interface MapGeneratorStrategy {
  /**
   * Generates a two-dimensional Array containing numbers in the range of inclusive 0 until inclusive 100
   * @param width Width of the Array
   * @param height Height of the Array
   */
  generate(width: number, height: number): Array<Array<number>>;
}
