import { HitTestResult } from 'common/HitTestResult';
import { Line } from 'common/Line';
import { LineProperties } from 'common/LineProperties';
import { Point } from 'common/Point';

const HIT_TOLERANCE = 10;

export class Path {
  public closed: boolean = false;
  public vertices: Point[];
  public lineProperties: LineProperties;

  constructor(vertices: Point[], lineProperties: LineProperties) {
    this.vertices = vertices;
    this.lineProperties = lineProperties;
  }

  public *getVerticesIterator() {
    const verticesCount = this.vertices.length;
    for (let i = 0; i < verticesCount; i += 1) {
      yield this.vertices[i];
    }

    if (this.closed && verticesCount > 0) {
      yield this.vertices[0];
    }
  }

  public *getLineIterator() {
    let previousPoint;

    for (const point of this.getVerticesIterator()) {
      if (!previousPoint) {
        previousPoint = point;
        continue;
      }

      yield new Line(previousPoint, point);
      previousPoint = point;
    }
  }

  public getStartingPoint() {
    return this.vertices[0];
  }

  public getVerticesCount() {
    return this.vertices.length;
  }

  public getLineProperties() {
    return this.lineProperties;
  }

  public hitTest(point: Point): HitTestResult | null {
    for (const line of this.getLineIterator()) {
      if (line.distanceToPoint(point) <= HIT_TOLERANCE) {
        return new HitTestResult(line, this);
      }
    }

    return null;
  }
}
