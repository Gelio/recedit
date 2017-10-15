import { LineCondition } from 'conditions/LineCondition';

export class HorizontalLineCondition extends LineCondition {
  public isMet(): boolean {
    return this.line.p1.y === this.line.p2.y;
  }
}
