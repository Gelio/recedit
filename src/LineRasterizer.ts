import { Point } from 'common/Point';

export class LineRasterizer {
  public rasterizeLine(startPoint: Point, endPoint: Point, thickness: number) {
    const rasterizedLine: Point[] = [];

    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const incrementE = 2 * dy;
    const incrementNE = 2 * (dy - dx);

    let d = 2 * dy - dx;
    let x = startPoint.x;
    let y = startPoint.y;
    for (const point of this.getThickPoint(new Point(x, y), thickness)) {
      rasterizedLine.push(point);
    }

    while (x < endPoint.x) {
      if (d < 0) {
        d += incrementE;
      } else {
        d += incrementNE;
        y += 1;
      }
      x += 1;

      for (const point of this.getThickPoint(new Point(x, y), thickness)) {
        rasterizedLine.push(point);
      }
    }

    return rasterizedLine;
  }

  private *getThickPoint(point: Point, thickness: number) {
    let dy = 1;

    yield point;

    for (
      let currentThickness = 1;
      currentThickness < thickness;
      currentThickness += 1
    ) {
      yield new Point(point.x, point.y + dy);
      dy = -dy;

      if (dy > 0) {
        dy += 1;
      }
    }
  }
}
