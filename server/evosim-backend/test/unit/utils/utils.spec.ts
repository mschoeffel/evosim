import { Utils } from '../../../src/utils/utils';

describe('Utils Functions', () => {
  it.each([
    [1.001, 1.0],
    [1.999, 2.0],
  ])('Rounding (%s) to two digits returns expected (%s)', (num, expected) => {
    expect(Utils.roundToTwoDigits(num)).toEqual(expected);
  });

  it.each([
    [0, 1],
    [45, 0.71],
    [90, 0],
    [135, -0.71],
    [180, -1],
    [125, -0.57],
    [270, 0],
    [315, 0.71],
  ])('Cos of (%s) degree returns expected (%s) degree', (degree, expected) => {
    expect(Utils.roundToTwoDigits(Utils.cosDegree(degree))).toEqual(expected);
  });

  it.each([
    [0, 0],
    [45, 0.71],
    [90, 1],
    [135, 0.71],
    [180, 0],
    [125, 0.82],
    [270, -1],
    [315, -0.71],
  ])('Sin of (%s) degree returns expected (%s) degree', (degree, expected) => {
    expect(Utils.roundToTwoDigits(Utils.sinDegree(degree))).toEqual(expected);
  });
});
