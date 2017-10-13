import { HitTestResult } from 'common/HitTestResult';
import { Line } from 'common/Line';
import { LineProperties } from 'common/LineProperties';
import { Path } from 'common/Path';
import { Point } from 'common/Point';

import { Condition } from 'conditions/Condition';

function createMockCondition(isMet: boolean): Condition {
  return {
    isMet: () => isMet,
    fix: () => isMet = true
  };
}

describe('Path', () => {
  let path: Path;

  beforeEach(() => {
    path = new Path([], LineProperties.getDefault());
  });

  describe('getVerticesIterator', () => {
    it('should work correctly when no vertices are added', () => {
      const iterator = path.getVerticesIterator();

      expect(iterator.next().done).toBe(true);
    });

    it('should iterate over all vertices', () => {
      const points = [new Point(1, 2), new Point(3, 4), new Point(5, 6)];
      path.vertices.push(...points);

      const iteratedPoints: Point[] = [];

      for (const point of path.getVerticesIterator()) {
        iteratedPoints.push(point);
      }

      expect(iteratedPoints).toHaveLength(points.length);
    });

    it('should include first point twice when path is closed', () => {
      const points = [new Point(1, 2), new Point(3, 4), new Point(5, 6)];
      path.vertices.push(...points);
      path.closed = true;

      const iteratedPoints: Point[] = [];

      for (const point of path.getVerticesIterator()) {
        iteratedPoints.push(point);
      }

      expect(iteratedPoints).toHaveLength(points.length + 1);
    });
  });

  describe('getLineIterator', () => {
    it('should work correctly when no vertices are added', () => {
      const iterator = path.getLineIterator();

      expect(iterator.next().done).toBe(true);
    });

    it('should iterate over all edges', () => {
      const points = [new Point(1, 2), new Point(3, 4), new Point(5, 6)];
      path.vertices.push(...points);

      const iteratedLines: Line[] = [];

      for (const line of path.getLineIterator()) {
        iteratedLines.push(line);
      }

      expect(iteratedLines).toHaveLength(points.length - 1);
    });

    it('should include extra edge when path is closed', () => {
      const points = [new Point(1, 2), new Point(3, 4), new Point(5, 6)];
      path.vertices.push(...points);
      path.closed = true;

      const iteratedLines: Line[] = [];

      for (const line of path.getLineIterator()) {
        iteratedLines.push(line);
      }

      expect(iteratedLines).toHaveLength(points.length);
    });
  });

  describe('hitTest', () => {
    beforeEach(() => {
      const points = [new Point(0, 0), new Point(50, 0), new Point(50, 50)];
      path.vertices.push(...points);
    });

    it('should return null when point was far away', () => {
      const point = new Point(-100, -100);

      expect(path.hitTest(point)).toBe(null);
    });

    it('should return null when point was near but path was not closed', () => {
      const point = new Point(25, 25);

      expect(path.hitTest(point)).toBe(null);
    });

    it('should return correct result when point was near and path was closed', () => {
      const point = new Point(25, 25);
      path.closed = true;

      let result = path.hitTest(point);
      expect(result).toBeDefined();
      result = <HitTestResult>result;

      const expectedLine = new Line(new Point(0, 0), new Point(50, 50));

      expect(result.line.equals(expectedLine)).toBe(true);
    });

    it('should return correct result when point was on line', () => {
      const point = new Point(25, 0);

      let result = path.hitTest(point);
      expect(result).toBeDefined();
      result = <HitTestResult>result;

      const expectedLine = new Line(new Point(0, 0), new Point(50, 0));

      expect(result.line.equals(expectedLine)).toBe(true);
    });

    it('should return correct result when point was on near line', () => {
      const point = new Point(25, 5);

      let result = path.hitTest(point);
      expect(result).toBeDefined();
      result = <HitTestResult>result;

      const expectedLine = new Line(new Point(0, 0), new Point(50, 0));

      expect(result.line.equals(expectedLine)).toBe(true);
    });
  });

  describe('areConditionsMet', () => {
    it('should return true when there are no conditions', () => {
      expect(path.areConditionsMet()).toBe(true);
    });

    it('should return true when all conditions are met', () => {
      path.conditions.push(createMockCondition(true), createMockCondition(true), createMockCondition(true));

      expect(path.areConditionsMet()).toBe(true);
    });

    it('should return false when a condition is not met', () => {
      path.conditions.push(createMockCondition(true), createMockCondition(false));

      expect(path.areConditionsMet()).toBe(false);
    });
  });
});
