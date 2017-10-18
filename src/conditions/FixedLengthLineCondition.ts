import { LineCondition } from 'conditions/LineCondition';

import { Line } from 'common/Line';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';

import { configuration } from 'configuration';

export class FixedLengthLineCondition extends LineCondition {
  private readonly fixedLength: number;
  private readonly fixedLengthSquared: number;

  constructor(line: Line, polygon: Polygon, length: number) {
    super(line, polygon);

    this.fixedLength = length;
    this.fixedLengthSquared = Math.pow(length, 2);
  }

  public isMet(): boolean {
    const lengthSquared = Point.getDistanceBetweenSquared(this.line.p1, this.line.p2);

    return Math.abs(lengthSquared - this.fixedLengthSquared) < configuration.epsilon;
  }

  public fix(lockedPoint: Point) {
    const freePoint = this.line.p1 === lockedPoint ? this.line.p2 : this.line.p1;

    const lengthBeforeFix = Point.getDistanceBetween(lockedPoint, freePoint);
    const ratio = this.fixedLength / lengthBeforeFix;

    const xDelta = freePoint.x - lockedPoint.x;
    const yDelta = freePoint.y - lockedPoint.y;

    freePoint.moveTo(lockedPoint.x + xDelta * ratio, lockedPoint.y + yDelta * ratio);
  }

  public duplicateForNewLine(line: Line, polygon: Polygon) {
    return new FixedLengthLineCondition(line, polygon, this.fixedLength);
  }

  public getLabel() {
    return this.fixedLength.toFixed(1);
  }

  public verifyCanBeApplied() {
    return;
  }
}
