import { Condition } from 'conditions/Condition';

import { Line } from 'common/Line';
import { Path } from 'common/Path';

export class LineCondition implements Condition {
  protected readonly line: Line;
  protected readonly path: Path;

  constructor(line: Line, path: Path) {
    this.line = line;
    this.path = path;
  }

  public isMet(): boolean {
    throw new Error('LineCondition not implemented');
  }
}
