import { LineProperties } from 'common/LineProperties';
import { Point } from 'common/Point';

export class Polygon {
  private vertices: Point[];
  private lineProperties: LineProperties;

  constructor(vertices: Point[], lineProperties: LineProperties) {
    if (vertices.length < 3) {
      throw new Error('Polygon must have at least 3 vertices');
    }

    this.vertices = vertices;
    this.lineProperties = lineProperties;
  }

  public *getVerticesIterator() {
    const verticesCount = this.vertices.length;
    for (let i = 0; i < verticesCount; i += 1) {
      yield this.vertices[i];
    }
  }

  public getStartingPoint() {
    return this.vertices[0];
  }

  public getLineProperties() {
    return this.lineProperties;
  }
}
