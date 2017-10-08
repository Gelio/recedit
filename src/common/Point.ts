export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static add(p1: Point, p2: Point): Point {
    return new Point(p1.x + p2.x, p1.y + p2.y);
  }

  public static subtract(p1: Point, p2: Point): Point {
    return new Point(p1.x - p2.x, p1.y - p2.y);
  }
}
