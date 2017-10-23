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
  private _lastLockedVertexIndex?: number;

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

  public get lastLockedVertexIndex(): number {
    if (this._lastLockedVertexIndex === undefined) {
      throw new Error('tryFix needs to be called first');
    }

    return this._lastLockedVertexIndex;
  }

  public tryFix(pointIndexBoundary?: number) {
    if (this._fixSuccessful !== undefined) {
      throw new Error('ConditionFixer needs to be reset before fixing again');
    }

    const points = this.polygon.getVertices();
    const lineConditions = [...this.polygon.getLineConditions(), ...this.additionalLineConditions];
    const startingPointIndex = this.polygon.findPointIndex(this.startingPoint);
    let lockedPointIndex = startingPointIndex;
    let currentPointIndex = this.getNextPointIndex(lockedPointIndex);

    if (!pointIndexBoundary) {
      pointIndexBoundary = startingPointIndex;
    }

    do {
      const currentLine = new Line(points[lockedPointIndex], points[currentPointIndex]);
      const currentLineConditions = lineConditions.filter(lineCondition =>
        lineCondition.line.equals(currentLine)
      );

      const unmetLineConditions = currentLineConditions
        .filter(lineCondition => !lineCondition.isMet());

      if (unmetLineConditions.length === 0) {
        this._fixSuccessful = true;
        this._lastLockedVertexIndex = lockedPointIndex;

        return;
      }

      unmetLineConditions
        .forEach(lineCondition => lineCondition.fix(points[lockedPointIndex]));

      lockedPointIndex = currentPointIndex;
      currentPointIndex = this.getNextPointIndex(currentPointIndex);
    } while (lockedPointIndex !== pointIndexBoundary);

    this._fixSuccessful = false;
  }

  public reset() {
    this._fixSuccessful = undefined;
    this._lastLockedVertexIndex = undefined;
  }

  private getNextPointIndex(currentPointIndex: number) {
    if (this.direction === FixingDirection.Reverse) {
      return this.polygon.getPreviousPointIndex(currentPointIndex);
    }

    return this.polygon.getNextPointIndex(currentPointIndex);
  }
}
