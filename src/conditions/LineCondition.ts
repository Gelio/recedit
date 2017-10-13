import { Line } from 'common/Line';
import { Polygon } from 'common/Polygon';

export class LineCondition {
  public readonly line: Line;
  public readonly polygon: Polygon;

  constructor(line: Line, polygon: Polygon) {
    this.line = line;
    this.polygon = polygon;
  }

  public isMet(): boolean {
    throw new Error('LineCondition.isMet not implemented');
  }

  public fix() {
    throw new Error('LineCondition.fix not implemented');
  }
}
