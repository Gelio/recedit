import { Octant } from 'common/Octant';

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

  public getOctant(): Octant {
    const x = this.x;
    const y = this.y;
    let octant = Octant.First;

    if (y >= 0) {
      if (x >= 0) {
        // First quarter
        if (y <= x) {
          octant = Octant.First;
        } else {
          octant = Octant.Second;
        }
      } else {
        // Second quarter
        if (y >= -x) {
          octant = Octant.Third;
        } else {
          octant = Octant.Fourth;
        }
      }
    } else {
      if (x <= 0) {
        // Third quarter
        if (y >= x) {
          octant = Octant.Fifth;
        } else {
          octant = Octant.Sixth;
        }
      } else {
        // Fourth quarter
        if (y < -x) {
          octant = Octant.Seventh;
        } else {
          octant = Octant.Eighth;
        }
      }
    }

    return octant;
  }
}
