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
}
