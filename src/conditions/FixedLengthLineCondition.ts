import { LineCondition } from 'conditions/LineCondition';

import { Line } from 'common/Line';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';

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

    return lengthSquared === this.fixedLengthSquared;
  }
}
