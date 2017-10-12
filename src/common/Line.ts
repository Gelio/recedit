import { Point } from 'common/Point';

export class Line {
  public p1: Point;
  public p2: Point;

  constructor(p1: Point, p2: Point) {
    if (p1.equals(p2)) {
      throw new Error('Cannot create line between points at the same coordinates');
    }

    this.p1 = p1;
    this.p2 = p2;
  }

  public distanceToPoint(p: Point) {
    const p1 = this.p1;
    const p2 = this.p2;

    const yDelta = p2.y - p1.y;
    const xDelta = p2.x - p1.x;

    return Math.abs(yDelta * p.x - xDelta * p.y + p2.x * p1.y - p2.y * p1.x) / Point.getDistanceBetween(p1, p2);
  }
}
