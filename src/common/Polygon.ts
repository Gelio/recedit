import { Line } from 'common/Line';
import { LineProperties } from 'common/LineProperties';
import { Path } from 'common/Path';
import { Point } from 'common/Point';
import { configuration } from 'configuration';

import { LineCondition } from 'conditions/LineCondition';

export class Polygon extends Path {
  private lineConditions: LineCondition[];

  constructor(path: Path);
  constructor(vertices: Point[], lineProperties: LineProperties);

  constructor(pathOrVertices: Path | Point[], lineProperties?: LineProperties) {
    let vertices: Point[];

    if (pathOrVertices instanceof Path) {
      const path = pathOrVertices;
      vertices = path.getVertices();
      lineProperties = path.lineProperties;
    } else {
      vertices = pathOrVertices;
      lineProperties = <LineProperties>lineProperties;
    }

    Polygon.ensureVerticesLength(vertices);
    super(vertices, lineProperties);
    this.closed = true;
    this.lineConditions = [];
  }

  private static ensureVerticesLength(vertices: Point[]) {
    if (vertices.length >= configuration.minPolygonPoints) {
      return;
    }

    throw new Error(`Polygon must have at least ${configuration.minPolygonPoints} vertices`);
  }

  public clone(): Polygon {
    const polygon = new Polygon(super.clone());

    this.lineConditions.forEach(lineCondition => {
      const p1Index = this.findPointIndex(lineCondition.line.p1);
      const p2Index = this.findPointIndex(lineCondition.line.p2);

      const newLineCondition = lineCondition.duplicateForNewLine(
        new Line(polygon.vertices[p1Index], polygon.vertices[p2Index]),
        polygon
      );
      polygon.lineConditions.push(newLineCondition);
    });

    return polygon;
  }

  public insertVertex(point: Point, index: number) {
    const previousPointIndex = this.getPreviousPointIndex(index);

    const previousLine = new Line(this.getVertex(previousPointIndex), this.getVertex(index));
    const matchingConditions = this.lineConditions.filter(lineCondition =>
      lineCondition.line.equals(previousLine)
    );

    if (matchingConditions.length > 0) {
      throw new Error(
        `Cannot insert a point because of an existing condition (${matchingConditions[0].constructor
          .name})`
      );
    }

    super.insertVertex(point, index);
  }

  public getNextPointIndex(index: number) {
    return (index + 1) % this.getVerticesCount();
  }

  public getNextPoint(point: Point) {
    const index = this.vertices.indexOf(point);
    const nextPointIndex = this.getNextPointIndex(index);

    return this.getVertex(nextPointIndex);
  }

  public getPreviousPointIndex(index: number) {
    let previousPointIndex = index - 1;
    if (previousPointIndex < 0) {
      previousPointIndex = this.getVerticesCount() - 1;
    }

    return previousPointIndex;
  }

  public getPreviousPoint(point: Point) {
    const index = this.vertices.indexOf(point);
    const previousPointIndex = this.getPreviousPointIndex(index);

    return this.getVertex(previousPointIndex);
  }

  public removeVertex(point: Point) {
    if (this.getVerticesCount() === configuration.minPolygonPoints) {
      throw new Error('Cannot delete vertex');
    }

    super.removeVertex(point);

    const lineConditionsToRemove = this.lineConditions.filter(
      lineCondition => lineCondition.line.p1 === point || lineCondition.line.p2 === point
    );
    lineConditionsToRemove.forEach(lineCondition => this.removeLineCondition(lineCondition));
  }

  public addLineCondition(lineCondition: LineCondition) {
    if (lineCondition.polygon !== this) {
      throw new Error('Line condition bound to wrong polygon');
    }

    const p1Index = this.findPointIndex(lineCondition.line.p1);
    const p2Index = this.findPointIndex(lineCondition.line.p2);
    if (p1Index === -1 || p2Index === -2) {
      throw new Error('Line condition bound to wrong line');
    }

    if (!lineCondition.isMet()) {
      throw new Error('Line condition is not met');
    }

    this.lineConditions.push(lineCondition);
  }

  public removeLineCondition(lineCondition: LineCondition) {
    const index = this.lineConditions.indexOf(lineCondition);

    if (index === -1) {
      throw new Error('Line condition not found');
    }

    this.lineConditions.splice(index, 1);
  }

  public getLineConditions() {
    return [...this.lineConditions];
  }
}
