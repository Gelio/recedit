import { Line } from 'common/Line';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { LineCondition } from 'conditions/LineCondition';

export enum FixingDirection {
  Normal,
  Reverse
}

export class ConditionFixer {
  public direction: FixingDirection;

  private readonly polygon: Polygon;
  private readonly startingPoint: Point;
  private readonly additionalLineConditions: LineCondition[];

  private _fixSuccessful?: boolean;

  constructor(
    polygon: Polygon,
    startingPoint: Point,
    additionalLineConditions: LineCondition[] = [],
    direction: FixingDirection = FixingDirection.Normal
  ) {
    this.polygon = polygon;
    this.startingPoint = startingPoint;
    this.additionalLineConditions = additionalLineConditions;
    this.direction = direction;
  }

  public get fixSuccessful(): boolean {
    if (this._fixSuccessful === undefined) {
      throw new Error('tryFix needs to be called first');
    }

    return this._fixSuccessful;
  }

  public tryFix() {
    if (this._fixSuccessful !== undefined) {
      throw new Error('ConditionFixer needs to be reset before fixing again');
    }

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

  public reset() {
    this._fixSuccessful = undefined;
  }

  private getNextPointIndex(currentPointIndex: number) {
    if (this.direction === FixingDirection.Reverse) {
      return this.polygon.getPreviousPointIndex(currentPointIndex);
    }

    return this.polygon.getNextPointIndex(currentPointIndex);
  }
}
