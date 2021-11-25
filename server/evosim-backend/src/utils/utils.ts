export class Utils {
  public static roundToTwoDigits(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  public static sinDegree(num: number): number {
    return Math.sin(this.toRadians(num));
  }

  public static cosDegree(num: number): number {
    return Math.cos(this.toRadians(num));
  }

  public static randomBetweenInclusive(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private static toRadians(angle) {
    return angle * (Math.PI / 180);
  }
}
