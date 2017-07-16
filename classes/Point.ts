/**
 * A 2D pair of coordinates.
 */
class Point {
  private _x: number;
  private _y: number;
  /**
   * Creates a pair of coordinates.
   * @param {number} x The value of the first coordinate. It must be positive.
   * @param {number} y The value of the second coordinate. It must be positive.
   */
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}