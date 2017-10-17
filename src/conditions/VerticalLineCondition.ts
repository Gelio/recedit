import { Line } from 'common/Line';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { LineCondition } from 'conditions/LineCondition';

export class VerticalLineCondition extends LineCondition {
  public isMet(): boolean {
    return this.line.p1.x === this.line.p2.x;
  }

  public fix(lockedPoint: Point) {
    if (lockedPoint === this.line.p1) {
      this.alignPointsVertically(this.line.p2, this.line.p1);
    } else if (lockedPoint === this.line.p2) {
      this.alignPointsVertically(this.line.p1, this.line.p2);
    } else {
      throw new Error('Locked point does not match either point on the line');
    }
  }

  public duplicateForNewLine(line: Line, polygon: Polygon) {
    return new VerticalLineCondition(line, polygon);
  }

  public verifyCanBeApplied() {
    const angle = Point.getAngle(this.line.p1, this.line.p2);

    if (angle < 60 || angle > 330 || (angle > 120 && angle < 180)) {
      throw new Error('Line is not vertical enough');
    }
  }

  private alignPointsVertically(subject: Point, destination: Point) {
    subject.moveTo(new Point(destination.x, subject.y));
  }
}
