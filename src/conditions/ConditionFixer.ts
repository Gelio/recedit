import { Line } from 'common/Line';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { LineCondition } from 'conditions/LineCondition';

export class ConditionFixer {
  private readonly polygon: Polygon;
  private readonly startingPoint: Point;
  private readonly additionalLineConditions: LineCondition[];

  private _fixSuccessful?: boolean;

  constructor(polygon: Polygon, startingPoint: Point, additionalLineConditions?: LineCondition[]) {
    this.polygon = polygon;
    this.startingPoint = startingPoint;
    this.additionalLineConditions = additionalLineConditions || [];
  }

  public get fixSuccessful(): boolean {
    if (this._fixSuccessful === undefined) {
      throw new Error('tryFix needs to be called first');
    }

    return this._fixSuccessful;
  }

  public tryFix() {
    const points = this.polygon.getVertices();
    const lineConditions = [...this.polygon.getLineConditions(), ...this.additionalLineConditions];
    const startingPointIndex = this.polygon.findPointIndex(this.startingPoint);
    let lockedPointIndex = startingPointIndex;
    let currentPointIndex = this.getNextPointIndex(lockedPointIndex);

    while (currentPointIndex !== startingPointIndex) {
      const currentLine = new Line(points[lockedPointIndex], points[currentPointIndex]);
      const currentLineConditions = lineConditions.filter(lineCondition =>
        lineCondition.line.equals(currentLine)
      );

      currentLineConditions
        .filter(lineCondition => !lineCondition.isMet())
        .forEach(lineCondition => lineCondition.fix(points[lockedPointIndex]));

      lockedPointIndex = currentPointIndex;
      currentPointIndex = this.getNextPointIndex(currentPointIndex);
    }

    this._fixSuccessful = lineConditions.every(lineCondition => lineCondition.isMet());
  }

  private getNextPointIndex(currentPointIndex: number) {
    return (currentPointIndex + 1) % this.polygon.getVerticesCount();
  }
}
