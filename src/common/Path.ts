import { HitTestResult } from 'common/HitTestResult';
import { Line } from 'common/Line';
import { LineProperties } from 'common/LineProperties';
import { Point } from 'common/Point';
import { configuration } from 'configuration';

export class Path {
  public closed: boolean = false;
  public lineProperties: LineProperties;
  protected readonly vertices: Point[];

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
      if (line.distanceToPoint(point) <= configuration.hitTolerance) {
        return new HitTestResult(line, this);
      }
    }

    return null;
  }

  public getVertex(index: number): Point {
    return this.vertices[index];
  }

  public getVertices(): Point[] {
    return this.vertices;
  }

  public addVertex(point: Point) {
    this.vertices.push(point);
  }

  public removeVertex(point: Point) {
    const index = this.findPointIndex(point);

    if (index !== -1) {
      this.vertices.splice(index, 1);
    }
  }

  public insertVertex(point: Point, index: number) {
    this.vertices.splice(index, 0, point);
  }

  public movePoint(point: Point, newPosition: Point) {
    const index = this.findPointIndex(point);

    if (index !== -1) {
      this.vertices.splice(index, 1, newPosition);
    }
  }

  public clone(): Path {
    const vertices = this.getVertices();
    const lineProperties = this.lineProperties.clone();

    return new Path(vertices, lineProperties);
  }

  private findPointIndex(point: Point) {
    return this.vertices.findIndex(otherPoint => otherPoint.equals(point));
  }
}
