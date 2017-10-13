import { LineCondition } from 'conditions/LineCondition';

export class VerticalLineCondition extends LineCondition {
  public isMet(): boolean {
    return this.line.p1.x === this.line.p2.x;
  }

  public fix() {
    if (!this.path.lockedVertices.has(this.line.p1)) {
      this.line.p1.x = this.line.p2.x;
    } else if (!this.path.lockedVertices.has(this.line.p2)) {
      this.line.p2.x = this.line.p1.x;
    }
  }
}
