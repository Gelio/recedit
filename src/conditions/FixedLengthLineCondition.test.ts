import { FixedLengthLineCondition } from 'conditions/FixedLengthLineCondition';

import { Line } from 'common/Line';
import { LineProperties } from 'common/LineProperties';
import { Path } from 'common/Path';
import { Point } from 'common/Point';

describe('FixedLengthLineCondition', () => {
  let path: Path;

  beforeEach(() => {
    path = new Path([], LineProperties.getDefault());
  });

  it('should instantiate without errors', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(1, 5);
    const line = new Line(p1, p2);
    path.vertices.push(p1, p2);

    expect(new FixedLengthLineCondition(line, path, 3)).toBeDefined();
  });

  describe('itMet', () => {
    it('should return true when the condition is met', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(1, 5);
      const line = new Line(p1, p2);
      path.vertices.push(p1, p2);

      const condition = new FixedLengthLineCondition(line, path, 3);

      expect(condition.isMet()).toBe(true);
    });

    it('should return false when the condition is not met', () => {
      const p1 = new Point(1, 2);
      const p2 = new Point(1, 8);
      const line = new Line(p1, p2);
      path.vertices.push(p1, p2);

      const condition = new FixedLengthLineCondition(line, path, 3);

      expect(condition.isMet()).toBe(false);
    });
  });
});
