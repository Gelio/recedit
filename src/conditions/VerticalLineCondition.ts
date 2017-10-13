import { LineCondition } from 'conditions/LineCondition';

export class VerticalLineCondition extends LineCondition {
  public isMet(): boolean {
    return this.line.p1.x === this.line.p2.x;
  }
}
