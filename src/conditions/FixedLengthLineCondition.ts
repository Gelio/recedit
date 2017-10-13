import { LineCondition } from 'conditions/LineCondition';

import { Line } from 'common/Line';
import { Path } from 'common/Path';
import { Point } from 'common/Point';

export class FixedLengthLineCondition extends LineCondition {
  private readonly fixedLengthSquared: number;

  constructor(line: Line, path: Path, length: number) {
    super(line, path);

    this.fixedLengthSquared = Math.pow(length, 2);
  }

  public isMet(): boolean {
    const lengthSquared = Point.getDistanceBetweenSquared(this.line.p1, this.line.p2);

    return lengthSquared === this.fixedLengthSquared;
  }
}
