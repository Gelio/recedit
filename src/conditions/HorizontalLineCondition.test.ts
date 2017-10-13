import { HorizontalLineCondition } from 'conditions/HorizontalLineCondition';

import { Line } from 'common/Line';
import { LineProperties } from 'common/LineProperties';
import { Point } from 'common/Point';
import { Polygon } from 'common/Polygon';

describe('HorizontalLineCondition', () => {
  let polygon: Polygon;

  beforeEach(() => {
    polygon = new Polygon([], LineProperties.getDefault());
  });

  it('should instantiate without errors', () => {
    const p1 = new Point(1, 2);
    const p2 = new Point(1, 5);
    const line = new Line(p1, p2);
    polygon.addVertex(p1);
    polygon.addVertex(p2);

    expect(new HorizontalLineCondition(line, polygon)).toBeDefined();
  });

  describe('itMet', () => {
    it('should return true when the condition is met', () => {
      const p1 = new Point(0, 2);
      const p2 = new Point(5, 2);
      const line = new Line(p1, p2);
      polygon.addVertex(p1);
      polygon.addVertex(p2);

      const condition = new HorizontalLineCondition(line, polygon);

      expect(condition.isMet()).toBe(true);
    });

    it('should return false when the condition is not met', () => {
      const p1 = new Point(0, 2);
      const p2 = new Point(5, 8);
      const line = new Line(p1, p2);
      polygon.addVertex(p1);
      polygon.addVertex(p2);

      const condition = new HorizontalLineCondition(line, polygon);

      expect(condition.isMet()).toBe(false);
    });
  });
});
