import { Line } from 'common/Line';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';
import { LineCondition } from 'conditions/LineCondition';

export class HorizontalLineCondition extends LineCondition {
  public isMet(): boolean {
    return this.line.p1.y === this.line.p2.y;
  }

  public fix(lockedPoint: Point) {
    if (lockedPoint === this.line.p1) {
      this.alignPointsHorizontally(this.line.p2, this.line.p1);
    } else if (lockedPoint === this.line.p2) {
      this.alignPointsHorizontally(this.line.p1, this.line.p2);
    } else {
      throw new Error('Locked point does not match either point on the line');
    }
  }

  public duplicateForNewLine(line: Line, polygon: Polygon) {
    return new HorizontalLineCondition(line, polygon);
  }

  private alignPointsHorizontally(subject: Point, destination: Point) {
    subject.moveTo(new Point(subject.x, destination.y));
  }
}
